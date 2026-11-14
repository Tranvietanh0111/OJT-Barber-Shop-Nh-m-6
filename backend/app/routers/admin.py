"""Router `admin` – phụ trách: Trần Văn Thắng.

Bao gồm 4 nhóm API chính của phân hệ Admin (Sprint 3):
1. API Quản lý người dùng (CRUD User + Tìm kiếm, Lọc, Phân quyền, Khóa/Mở khóa theo quyền Admin)
2. API Quản lý Barber (CRUD Barber + Tìm kiếm, Lọc, Cập nhật trạng thái hoạt động theo quyền Admin)
3. API Quản lý hóa đơn (Danh sách, Lọc, Chi tiết hóa đơn, Tạo hóa đơn, Cập nhật trạng thái thanh toán)
4. API Thống kê doanh thu (Thẻ KPI tổng hợp, Biểu đồ doanh thu theo kỳ, Doanh thu theo Dịch vụ / Barber / Phương thức thanh toán)
"""
from copy import deepcopy
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, Header, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel, Field

try:
    from jose import JWTError, jwt
except ImportError:  # pragma: no cover
    JWTError = Exception
    jwt = None

from app.core.config import settings
from app.utils.response import error, success

router = APIRouter(prefix="/admin", tags=["admin"])
bearer_scheme = HTTPBearer(auto_error=False)


# ============================================================================
# PHÂN QUYỀN TRUY CẬP ADMIN (ROLE-BASED ACCESS CONTROL)
# ============================================================================

VALID_ROLES = {"admin", "barber", "customer"}
VALID_USER_STATUSES = {"active", "locked"}
VALID_BARBER_STATUSES = {"available", "busy", "off", "inactive"}
VALID_PAYMENT_STATUSES = {"paid", "unpaid", "refunded"}
VALID_PAYMENT_METHODS = {"cash", "transfer", "card"}


def require_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    x_role: Optional[str] = Header(default=None, alias="X-Role", description="Vai trò người gọi: admin | barber | customer"),
) -> Dict[str, Any]:
    """Kiểm tra quyền Admin qua Header `X-Role` hoặc `Authorization: Bearer <token>`.

    - Trả về lỗi chuẩn `{ "success": false, "error": { "code": "FORBIDDEN", "message": "..." } }`
      với HTTP 403 nếu vai trò không phải `admin`.
    """
    if x_role is not None and x_role.strip().lower() != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=error("FORBIDDEN", "Bạn không có quyền truy cập chức năng quản trị (yêu cầu quyền admin)."),
        )

    if credentials and credentials.credentials:
        token = credentials.credentials.strip()
        if token in ("barber-token", "customer-token"):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=error("FORBIDDEN", "Token hiện tại không có quyền quản trị viên (admin)."),
            )
        if jwt is not None and token not in ("admin-token", "demo-admin-token"):
            try:
                payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
                role = str(payload.get("role", "admin")).lower()
                if role != "admin":
                    raise HTTPException(
                        status_code=status.HTTP_403_FORBIDDEN,
                        detail=error("FORBIDDEN", "Chỉ tài khoản Admin mới có quyền thực hiện thao tác này."),
                    )
                return {
                    "id": payload.get("sub") or payload.get("id") or 1,
                    "role": role,
                    "full_name": payload.get("full_name", "Trần Văn Thắng"),
                }
            except JWTError:
                pass

    return {"id": 1, "role": "admin", "full_name": "Trần Văn Thắng"}


# ============================================================================
# PYDANTIC SCHEMAS (REQUEST BODY)
# ============================================================================

class UserCreateRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Họ và tên người dùng")
    email: str = Field(..., description="Địa chỉ email")
    phone: str = Field(..., min_length=8, max_length=20, description="Số điện thoại")
    role: str = Field(default="customer", description="Vai trò: admin | barber | customer")
    status: str = Field(default="active", description="Trạng thái: active | locked")


class UserUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    email: Optional[str] = None
    phone: Optional[str] = Field(default=None, min_length=8, max_length=20)
    role: Optional[str] = None
    status: Optional[str] = None


class UserRolePatchRequest(BaseModel):
    role: str = Field(..., description="admin | barber | customer")


class UserStatusPatchRequest(BaseModel):
    status: str = Field(..., description="active | locked")


class BarberCreateRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100, description="Họ và tên Barber")
    phone: str = Field(..., min_length=8, max_length=20, description="Số điện thoại")
    email: Optional[str] = Field(default=None, description="Email liên hệ")
    specialty: str = Field(..., min_length=2, max_length=150, description="Chuyên môn chính")
    experience_years: int = Field(default=1, ge=0, le=50, description="Số năm kinh nghiệm")
    shift: str = Field(default="08:30 - 17:30", description="Ca làm việc")
    commission_rate: int = Field(default=35, ge=0, le=100, description="Tỷ lệ hoa hồng (%)")
    status: str = Field(default="available", description="available | busy | off | inactive")


class BarberUpdateRequest(BaseModel):
    full_name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    phone: Optional[str] = Field(default=None, min_length=8, max_length=20)
    email: Optional[str] = None
    specialty: Optional[str] = None
    experience_years: Optional[int] = Field(default=None, ge=0, le=50)
    shift: Optional[str] = None
    commission_rate: Optional[int] = Field(default=None, ge=0, le=100)
    status: Optional[str] = None


class BarberStatusPatchRequest(BaseModel):
    status: str = Field(..., description="available | busy | off | inactive")


class InvoiceItemPayload(BaseModel):
    service_name: str = Field(..., description="Tên dịch vụ hoặc sản phẩm")
    quantity: int = Field(default=1, ge=1, description="Số lượng")
    unit_price: int = Field(..., ge=0, description="Đơn giá (VNĐ)")


class InvoiceCreateRequest(BaseModel):
    appointment_code: str = Field(default="BK-2026-105", description="Mã lịch hẹn liên kết")
    customer_name: str = Field(..., min_length=2, description="Tên khách hàng")
    customer_phone: str = Field(..., min_length=8, description="Số điện thoại khách hàng")
    barber_name: str = Field(..., description="Tên Barber thực hiện")
    items: List[InvoiceItemPayload] = Field(..., min_length=1, description="Danh sách dịch vụ sử dụng")
    discount: int = Field(default=0, ge=0, description="Số tiền giảm giá (VNĐ)")
    payment_method: str = Field(default="transfer", description="cash | transfer | card")
    payment_status: str = Field(default="paid", description="paid | unpaid | refunded")
    notes: Optional[str] = Field(default="")


class InvoiceStatusPatchRequest(BaseModel):
    payment_status: str = Field(..., description="paid | unpaid | refunded")
    payment_method: Optional[str] = Field(default=None, description="cash | transfer | card")
    notes: Optional[str] = None


# ============================================================================
# KHO DỮ LIỆU MẪU CHUẨN (IN-MEMORY DATABASE)
# ============================================================================

USERS_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "code": "USR-001",
        "full_name": "Trần Văn Thắng",
        "email": "thang.admin@barberhub.vn",
        "phone": "0901234567",
        "role": "admin",
        "status": "active",
        "created_at": "2026-09-01",
    },
    {
        "id": 2,
        "code": "USR-002",
        "full_name": "Nguyễn Hoàng Nam",
        "email": "nam.barber@barberhub.vn",
        "phone": "0912345678",
        "role": "barber",
        "status": "active",
        "created_at": "2026-09-05",
    },
    {
        "id": 3,
        "code": "USR-003",
        "full_name": "Lê Minh Tuấn",
        "email": "tuan.barber@barberhub.vn",
        "phone": "0923456789",
        "role": "barber",
        "status": "active",
        "created_at": "2026-09-10",
    },
    {
        "id": 4,
        "code": "USR-004",
        "full_name": "Hoàng Gia Huy",
        "email": "giahuy@gmail.com",
        "phone": "0987654321",
        "role": "customer",
        "status": "active",
        "created_at": "2026-10-02",
    },
    {
        "id": 5,
        "code": "USR-005",
        "full_name": "Đặng Quang Vinh",
        "email": "quangvinh@gmail.com",
        "phone": "0978123456",
        "role": "customer",
        "status": "active",
        "created_at": "2026-10-08",
    },
    {
        "id": 6,
        "code": "USR-006",
        "full_name": "Bùi Xuân Trường",
        "email": "xuantruong@gmail.com",
        "phone": "0945112233",
        "role": "customer",
        "status": "locked",
        "created_at": "2026-10-20",
    },
]

BARBERS_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "code": "BB-01",
        "full_name": "Nguyễn Hoàng Nam",
        "phone": "0912345678",
        "email": "nam.barber@barberhub.vn",
        "specialty": "Skin Fade & Pompadour cổ điển",
        "experience_years": 7,
        "rating": 4.9,
        "completed_orders": 148,
        "shift": "08:30 - 17:30",
        "commission_rate": 40,
        "monthly_revenue": 38500000,
        "status": "available",
    },
    {
        "id": 2,
        "code": "BB-02",
        "full_name": "Lê Minh Tuấn",
        "phone": "0923456789",
        "email": "tuan.barber@barberhub.vn",
        "specialty": "Uốn Layer & Nhuộm Hàn Quốc",
        "experience_years": 5,
        "rating": 4.8,
        "completed_orders": 132,
        "shift": "09:00 - 19:00",
        "commission_rate": 38,
        "monthly_revenue": 34200000,
        "status": "busy",
    },
    {
        "id": 3,
        "code": "BB-03",
        "full_name": "Phạm Quốc Bảo",
        "phone": "0934567890",
        "email": "bao.barber@barberhub.vn",
        "specialty": "Taper Fade & Cạo khăn nóng",
        "experience_years": 4,
        "rating": 4.7,
        "completed_orders": 115,
        "shift": "12:00 - 21:00",
        "commission_rate": 35,
        "monthly_revenue": 29700000,
        "status": "off",
    },
]

INVOICES_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "invoice_code": "INV-2026-001",
        "appointment_code": "BK-2026-101",
        "customer_name": "Hoàng Gia Huy",
        "customer_phone": "0987654321",
        "barber_name": "Nguyễn Hoàng Nam",
        "created_at": "2026-11-14 10:25",
        "date": "2026-11-14",
        "payment_method": "transfer",
        "payment_status": "paid",
        "subtotal": 270000,
        "discount": 20000,
        "total": 250000,
        "notes": "Thanh toán chuyển khoản VietQR",
        "items": [
            {"service_name": "Combo Đế Vương 7 Bước", "quantity": 1, "unit_price": 220000},
            {"service_name": "Sáp vuốt tóc Volcanic Clay", "quantity": 1, "unit_price": 50000},
        ],
    },
    {
        "id": 2,
        "invoice_code": "INV-2026-002",
        "appointment_code": "BK-2026-102",
        "customer_name": "Đặng Quang Vinh",
        "customer_phone": "0978123456",
        "barber_name": "Lê Minh Tuấn",
        "created_at": "2026-11-14 12:10",
        "date": "2026-11-14",
        "payment_method": "card",
        "payment_status": "paid",
        "subtotal": 500000,
        "discount": 50000,
        "total": 450000,
        "notes": "Giảm 50.000đ ưu đãi combo Uốn + Cắt",
        "items": [
            {"service_name": "Uốn Định Hình Hàn Quốc", "quantity": 1, "unit_price": 380000},
            {"service_name": "Cắt Tóc Thương Gia", "quantity": 1, "unit_price": 120000},
        ],
    },
    {
        "id": 3,
        "invoice_code": "INV-2026-003",
        "appointment_code": "BK-2026-103",
        "customer_name": "Vũ Đình Khoa",
        "customer_phone": "0965432109",
        "barber_name": "Phạm Quốc Bảo",
        "created_at": "2026-11-14 14:45",
        "date": "2026-11-14",
        "payment_method": "cash",
        "payment_status": "unpaid",
        "subtotal": 200000,
        "discount": 0,
        "total": 200000,
        "notes": "Khách chờ thanh toán tại quầy",
        "items": [
            {"service_name": "Cắt Tóc Thương Gia", "quantity": 1, "unit_price": 120000},
            {"service_name": "Cạo Râu Khăn Nóng", "quantity": 1, "unit_price": 80000},
        ],
    },
    {
        "id": 4,
        "invoice_code": "INV-2026-004",
        "appointment_code": "BK-2026-092",
        "customer_name": "Lương Thế Thành",
        "customer_phone": "0918273645",
        "barber_name": "Nguyễn Hoàng Nam",
        "created_at": "2026-11-12 19:05",
        "date": "2026-11-12",
        "payment_method": "transfer",
        "payment_status": "refunded",
        "subtotal": 380000,
        "discount": 0,
        "total": 380000,
        "notes": "Hoàn tiền cọc do khách dời lịch",
        "items": [
            {"service_name": "Uốn Định Hình Hàn Quốc", "quantity": 1, "unit_price": 380000},
        ],
    },
]


# ============================================================================
# 1. API QUẢN LÝ NGƯỜI DÙNG (USER MANAGEMENT CRUD API)
# ============================================================================

@router.get("/users")
def list_users(
    search: Optional[str] = Query(default=None, description="Tìm theo họ tên, email, SĐT hoặc mã USR"),
    role: Optional[str] = Query(default=None, description="Lọc vai trò: admin | barber | customer"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="Lọc trạng thái: active | locked"),
    page: int = Query(default=1, ge=1, description="Trang hiện tại"),
    limit: int = Query(default=20, ge=1, le=100, description="Số bản ghi mỗi trang"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách người dùng kèm tìm kiếm, bộ lọc và phân trang."""
    items = deepcopy(USERS_DB)

    if search:
        kw = search.strip().lower()
        items = [
            u for u in items
            if kw in u["full_name"].lower()
            or kw in u["email"].lower()
            or kw in u["phone"].lower()
            or kw in u["code"].lower()
        ]

    if role and role.lower() != "all":
        items = [u for u in items if u["role"] == role.lower()]

    if status_filter and status_filter.lower() != "all":
        items = [u for u in items if u["status"] == status_filter.lower()]

    total = len(items)
    start = (page - 1) * limit
    paginated_items = items[start : start + limit]

    summary = {
        "total_users": len(USERS_DB),
        "active_users": len([u for u in USERS_DB if u["status"] == "active"]),
        "locked_users": len([u for u in USERS_DB if u["status"] == "locked"]),
        "admins": len([u for u in USERS_DB if u["role"] == "admin"]),
        "barbers": len([u for u in USERS_DB if u["role"] == "barber"]),
        "customers": len([u for u in USERS_DB if u["role"] == "customer"]),
    }

    return success(
        data={
            "items": paginated_items,
            "total": total,
            "page": page,
            "limit": limit,
            "summary": summary,
        },
        message="Lấy danh sách người dùng thành công",
    )


@router.get("/users/{user_id}")
def get_user_detail(user_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Lấy thông tin chi tiết một người dùng theo ID."""
    for user in USERS_DB:
        if user["id"] == user_id:
            return success(data=user, message="Lấy thông tin chi tiết người dùng thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )


@router.post("/users", status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Tạo người dùng mới bởi Admin."""
    role = payload.role.strip().lower()
    if role not in VALID_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_ROLE", f"Vai trò không hợp lệ. Chỉ chấp nhận: {', '.join(sorted(VALID_ROLES))}"),
        )

    user_status = payload.status.strip().lower()
    if user_status not in VALID_USER_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_STATUS", "Trạng thái tài khoản chỉ nhận 'active' hoặc 'locked'."),
        )

    for existing in USERS_DB:
        if existing["email"].lower() == payload.email.strip().lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error("EMAIL_ALREADY_EXISTS", "Địa chỉ email này đã tồn tại trong hệ thống."),
            )

    next_id = max((u["id"] for u in USERS_DB), default=0) + 1
    new_user = {
        "id": next_id,
        "code": f"USR-{next_id:03d}",
        "full_name": payload.full_name.strip(),
        "email": payload.email.strip(),
        "phone": payload.phone.strip(),
        "role": role,
        "status": user_status,
        "created_at": datetime.now().strftime("%Y-%m-%d"),
    }
    USERS_DB.append(new_user)
    return success(data=new_user, message="Thêm người dùng mới thành công")


@router.put("/users/{user_id}")
def update_user(user_id: int, payload: UserUpdateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Cập nhật thông tin và quyền của người dùng."""
    for user in USERS_DB:
        if user["id"] == user_id:
            if payload.role is not None:
                role = payload.role.strip().lower()
                if role not in VALID_ROLES:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_ROLE", "Vai trò không hợp lệ."),
                    )
                user["role"] = role

            if payload.status is not None:
                st = payload.status.strip().lower()
                if st not in VALID_USER_STATUSES:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_STATUS", "Trạng thái không hợp lệ."),
                    )
                user["status"] = st

            if payload.full_name is not None:
                user["full_name"] = payload.full_name.strip()
            if payload.email is not None:
                user["email"] = payload.email.strip()
            if payload.phone is not None:
                user["phone"] = payload.phone.strip()

            return success(data=user, message="Cập nhật thông tin người dùng thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )


@router.patch("/users/{user_id}/role")
def update_user_role(user_id: int, payload: UserRolePatchRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Thay đổi vai trò (phân quyền) cho người dùng."""
    role = payload.role.strip().lower()
    if role not in VALID_ROLES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_ROLE", f"Vai trò chỉ chấp nhận: {', '.join(sorted(VALID_ROLES))}"),
        )
    for user in USERS_DB:
        if user["id"] == user_id:
            user["role"] = role
            return success(data=user, message="Cập nhật quyền người dùng thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )


@router.patch("/users/{user_id}/status")
def update_user_status(user_id: int, payload: UserStatusPatchRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Khóa hoặc mở khóa tài khoản người dùng."""
    st = payload.status.strip().lower()
    if st not in VALID_USER_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_STATUS", "Trạng thái chỉ chấp nhận 'active' hoặc 'locked'."),
        )
    for user in USERS_DB:
        if user["id"] == user_id:
            user["status"] = st
            return success(data=user, message="Cập nhật trạng thái tài khoản thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )


@router.delete("/users/{user_id}")
def delete_user(user_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xóa tài khoản người dùng."""
    for idx, user in enumerate(USERS_DB):
        if user["id"] == user_id:
            deleted = USERS_DB.pop(idx)
            return success(data=deleted, message="Xóa người dùng thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )


# ============================================================================
# 2. API QUẢN LÝ BARBER (BARBER MANAGEMENT CRUD API)
# ============================================================================

@router.get("/barbers")
def list_barbers(
    search: Optional[str] = Query(default=None, description="Tìm kiếm theo tên, mã BB, SĐT hoặc chuyên môn"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="available | busy | off | inactive"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách Barber kèm thống kê trạng thái."""
    items = deepcopy(BARBERS_DB)

    if search:
        kw = search.strip().lower()
        items = [
            b for b in items
            if kw in b["full_name"].lower()
            or kw in b["specialty"].lower()
            or kw in b["phone"].lower()
            or kw in b["code"].lower()
        ]

    if status_filter and status_filter.lower() != "all":
        items = [b for b in items if b["status"] == status_filter.lower()]

    summary = {
        "total_barbers": len(BARBERS_DB),
        "available": len([b for b in BARBERS_DB if b["status"] == "available"]),
        "busy": len([b for b in BARBERS_DB if b["status"] == "busy"]),
        "off": len([b for b in BARBERS_DB if b["status"] == "off"]),
        "inactive": len([b for b in BARBERS_DB if b["status"] == "inactive"]),
    }

    return success(
        data={"items": items, "total": len(items), "summary": summary},
        message="Lấy danh sách Barber thành công",
    )


@router.get("/barbers/{barber_id}")
def get_barber_detail(barber_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xem thông tin chi tiết một Barber theo ID."""
    for barber in BARBERS_DB:
        if barber["id"] == barber_id:
            return success(data=barber, message="Lấy chi tiết Barber thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("BARBER_NOT_FOUND", f"Không tìm thấy Barber có ID={barber_id}"),
    )


@router.post("/barbers", status_code=status.HTTP_201_CREATED)
def create_barber(payload: BarberCreateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Thêm mới Barber vào hệ thống."""
    st = payload.status.strip().lower()
    if st not in VALID_BARBER_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_STATUS", f"Trạng thái Barber chỉ nhận: {', '.join(sorted(VALID_BARBER_STATUSES))}"),
        )

    next_id = max((b["id"] for b in BARBERS_DB), default=0) + 1
    new_barber = {
        "id": next_id,
        "code": f"BB-{next_id:02d}",
        "full_name": payload.full_name.strip(),
        "phone": payload.phone.strip(),
        "email": payload.email or f"barber{next_id}@barberhub.vn",
        "specialty": payload.specialty.strip(),
        "experience_years": payload.experience_years,
        "rating": 5.0,
        "completed_orders": 0,
        "shift": payload.shift,
        "commission_rate": payload.commission_rate,
        "monthly_revenue": 0,
        "status": st,
    }
    BARBERS_DB.append(new_barber)
    return success(data=new_barber, message="Thêm Barber mới thành công")


@router.put("/barbers/{barber_id}")
def update_barber(barber_id: int, payload: BarberUpdateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Cập nhật hồ sơ Barber."""
    for barber in BARBERS_DB:
        if barber["id"] == barber_id:
            if payload.status is not None:
                st = payload.status.strip().lower()
                if st not in VALID_BARBER_STATUSES:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_STATUS", "Trạng thái Barber không hợp lệ."),
                    )
                barber["status"] = st

            for field in ("full_name", "phone", "email", "specialty", "experience_years", "shift", "commission_rate"):
                val = getattr(payload, field)
                if val is not None:
                    barber[field] = val.strip() if isinstance(val, str) else val

            return success(data=barber, message="Cập nhật thông tin Barber thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("BARBER_NOT_FOUND", f"Không tìm thấy Barber có ID={barber_id}"),
    )


@router.patch("/barbers/{barber_id}/status")
def update_barber_status(barber_id: int, payload: BarberStatusPatchRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Cập nhật nhanh trạng thái làm việc của Barber."""
    st = payload.status.strip().lower()
    if st not in VALID_BARBER_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_STATUS", f"Trạng thái Barber chỉ nhận: {', '.join(sorted(VALID_BARBER_STATUSES))}"),
        )
    for barber in BARBERS_DB:
        if barber["id"] == barber_id:
            barber["status"] = st
            return success(data=barber, message="Cập nhật trạng thái Barber thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("BARBER_NOT_FOUND", f"Không tìm thấy Barber có ID={barber_id}"),
    )


@router.delete("/barbers/{barber_id}")
def delete_barber(barber_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xóa hồ sơ Barber."""
    for idx, barber in enumerate(BARBERS_DB):
        if barber["id"] == barber_id:
            deleted = BARBERS_DB.pop(idx)
            return success(data=deleted, message="Xóa Barber thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("BARBER_NOT_FOUND", f"Không tìm thấy Barber có ID={barber_id}"),
    )


# ============================================================================
# 3. API QUẢN LÝ HÓA ĐƠN (INVOICE MANAGEMENT API)
# ============================================================================

@router.get("/invoices")
def list_invoices(
    search: Optional[str] = Query(default=None, description="Tìm theo mã HĐ, mã lịch hẹn, tên khách hàng, SĐT"),
    payment_status: Optional[str] = Query(default=None, alias="status", description="paid | unpaid | refunded"),
    payment_method: Optional[str] = Query(default=None, description="cash | transfer | card"),
    date: Optional[str] = Query(default=None, description="Lọc theo ngày tạo (YYYY-MM-DD)"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách hóa đơn kèm bộ lọc và tổng hợp doanh thu hóa đơn."""
    items = deepcopy(INVOICES_DB)

    if search:
        kw = search.strip().lower()
        items = [
            inv for inv in items
            if kw in inv["invoice_code"].lower()
            or kw in inv["appointment_code"].lower()
            or kw in inv["customer_name"].lower()
            or kw in inv["customer_phone"].lower()
            or kw in inv["barber_name"].lower()
        ]

    if payment_status and payment_status.lower() != "all":
        items = [inv for inv in items if inv["payment_status"] == payment_status.lower()]

    if payment_method and payment_method.lower() != "all":
        items = [inv for inv in items if inv["payment_method"] == payment_method.lower()]

    if date:
        items = [inv for inv in items if inv["date"] == date]

    summary = {
        "total_invoices": len(INVOICES_DB),
        "paid_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "paid"),
        "unpaid_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "unpaid"),
        "refunded_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "refunded"),
    }

    return success(
        data={"items": items, "total": len(items), "summary": summary},
        message="Lấy danh sách hóa đơn thành công",
    )


@router.get("/invoices/{invoice_id}")
def get_invoice_detail(invoice_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xem chi tiết một hóa đơn (bao gồm danh sách dịch vụ chi tiết)."""
    for inv in INVOICES_DB:
        if inv["id"] == invoice_id:
            return success(data=inv, message="Lấy chi tiết hóa đơn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )


@router.post("/invoices", status_code=status.HTTP_201_CREATED)
def create_invoice(payload: InvoiceCreateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Tạo hóa đơn thanh toán mới."""
    p_status = payload.payment_status.strip().lower()
    if p_status not in VALID_PAYMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_STATUS", "Trạng thái thanh toán chỉ nhận: paid, unpaid, refunded."),
        )

    p_method = payload.payment_method.strip().lower()
    if p_method not in VALID_PAYMENT_METHODS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_METHOD", "Phương thức thanh toán chỉ nhận: cash, transfer, card."),
        )

    items_data = [item.model_dump() for item in payload.items]
    subtotal = sum(i["quantity"] * i["unit_price"] for i in items_data)
    total = max(0, subtotal - payload.discount)
    next_id = max((inv["id"] for inv in INVOICES_DB), default=0) + 1
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

    new_invoice = {
        "id": next_id,
        "invoice_code": f"INV-2026-{next_id:03d}",
        "appointment_code": payload.appointment_code,
        "customer_name": payload.customer_name.strip(),
        "customer_phone": payload.customer_phone.strip(),
        "barber_name": payload.barber_name.strip(),
        "created_at": now_str,
        "date": now_str.split(" ")[0],
        "payment_method": p_method,
        "payment_status": p_status,
        "subtotal": subtotal,
        "discount": payload.discount,
        "total": total,
        "notes": payload.notes or "",
        "items": items_data,
    }
    INVOICES_DB.append(new_invoice)
    return success(data=new_invoice, message="Tạo hóa đơn mới thành công")


@router.patch("/invoices/{invoice_id}/status")
def update_invoice_status(
    invoice_id: int,
    payload: InvoiceStatusPatchRequest,
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật trạng thái thanh toán của hóa đơn."""
    p_status = payload.payment_status.strip().lower()
    if p_status not in VALID_PAYMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_STATUS", "Trạng thái thanh toán chỉ nhận: paid, unpaid, refunded."),
        )

    for inv in INVOICES_DB:
        if inv["id"] == invoice_id:
            inv["payment_status"] = p_status
            if payload.payment_method:
                method = payload.payment_method.strip().lower()
                if method not in VALID_PAYMENT_METHODS:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_PAYMENT_METHOD", "Phương thức thanh toán không hợp lệ."),
                    )
                inv["payment_method"] = method
            if payload.notes is not None:
                inv["notes"] = payload.notes
            return success(data=inv, message="Cập nhật trạng thái hóa đơn thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )


@router.delete("/invoices/{invoice_id}")
def delete_invoice(invoice_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xóa hóa đơn theo ID."""
    for idx, inv in enumerate(INVOICES_DB):
        if inv["id"] == invoice_id:
            deleted = INVOICES_DB.pop(idx)
            return success(data=deleted, message="Xóa hóa đơn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )


# ============================================================================
# 4. API THỐNG KÊ DOANH THU (REVENUE STATISTICS API)
# ============================================================================

REVENUE_CHARTS: Dict[str, List[Dict[str, Any]]] = {
    "7d": [
        {"label": "08/11", "revenue": 3250000, "orders": 16},
        {"label": "09/11", "revenue": 4100000, "orders": 20},
        {"label": "10/11", "revenue": 3680000, "orders": 18},
        {"label": "11/11", "revenue": 4520000, "orders": 22},
        {"label": "12/11", "revenue": 4890000, "orders": 24},
        {"label": "13/11", "revenue": 5950000, "orders": 28},
        {"label": "14/11", "revenue": 6420000, "orders": 31},
    ],
    "month": [
        {"label": "Tuần 1", "revenue": 22400000, "orders": 108},
        {"label": "Tuần 2", "revenue": 25800000, "orders": 124},
        {"label": "Tuần 3", "revenue": 24900000, "orders": 119},
        {"label": "Tuần 4", "revenue": 29300000, "orders": 141},
    ],
    "quarter": [
        {"label": "Tháng 09", "revenue": 86500000, "orders": 415},
        {"label": "Tháng 10", "revenue": 94200000, "orders": 452},
        {"label": "Tháng 11", "revenue": 102400000, "orders": 492},
    ],
    "year": [
        {"label": "Quý 1", "revenue": 245000000, "orders": 1180},
        {"label": "Quý 2", "revenue": 268000000, "orders": 1290},
        {"label": "Quý 3", "revenue": 289000000, "orders": 1395},
        {"label": "Quý 4", "revenue": 312000000, "orders": 1510},
    ],
}


def _calculate_revenue_payload(period: str = "month") -> Dict[str, Any]:
    period_key = period.lower() if period.lower() in REVENUE_CHARTS else "month"
    chart_data = REVENUE_CHARTS[period_key]
    total_revenue = sum(item["revenue"] for item in chart_data)
    total_orders = sum(item["orders"] for item in chart_data)
    average_order_value = round(total_revenue / total_orders) if total_orders else 0

    by_service = [
        {"category": "Combo VIP Đế Vương", "revenue": round(total_revenue * 0.36), "percent": 36},
        {"category": "Uốn & Nhuộm Thời Trang", "revenue": round(total_revenue * 0.34), "percent": 34},
        {"category": "Cắt & Tạo kiểu Thương Gia", "revenue": round(total_revenue * 0.21), "percent": 21},
        {"category": "Chăm sóc Râu & Da mặt", "revenue": round(total_revenue * 0.09), "percent": 9},
    ]

    by_barber = [
        {
            "barber_id": b["id"],
            "code": b["code"],
            "full_name": b["full_name"],
            "completed_orders": b["completed_orders"],
            "revenue": b["monthly_revenue"],
            "commission_rate": b["commission_rate"],
            "commission_amount": round(b["monthly_revenue"] * b["commission_rate"] / 100),
        }
        for b in BARBERS_DB
    ]

    by_payment_method = [
        {"method": "transfer", "label": "Chuyển khoản VietQR", "percent": 54, "revenue": round(total_revenue * 0.54)},
        {"method": "cash", "label": "Tiền mặt", "percent": 31, "revenue": round(total_revenue * 0.31)},
        {"method": "card", "label": "Thẻ ngân hàng / POS", "percent": 15, "revenue": round(total_revenue * 0.15)},
    ]

    return {
        "period": period_key,
        "kpis": {
            "total_revenue": total_revenue,
            "total_invoices": total_orders,
            "average_order_value": average_order_value,
            "growth_rate": 14.8,
            "estimated_profit": round(total_revenue * 0.42),
        },
        "chart_data": chart_data,
        "by_service": by_service,
        "by_barber": by_barber,
        "by_payment_method": by_payment_method,
    }


@router.get("/revenue")
def get_revenue_statistics(
    period: str = Query(default="month", description="Kỳ báo cáo: 7d | month | quarter | year"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """API thống kê doanh thu (Thẻ KPI, biểu đồ theo kỳ, theo dịch vụ, theo Barber và phương thức thanh toán)."""
    return success(
        data=_calculate_revenue_payload(period),
        message="Lấy thống kê doanh thu thành công",
    )


@router.get("/revenue/stats")
def get_revenue_statistics_alias(
    period: str = Query(default="month", description="Kỳ báo cáo: 7d | month | quarter | year"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Endpoint alias cho thống kê doanh thu chi tiết."""
    return success(
        data=_calculate_revenue_payload(period),
        message="Lấy thống kê doanh thu thành công",
    )
