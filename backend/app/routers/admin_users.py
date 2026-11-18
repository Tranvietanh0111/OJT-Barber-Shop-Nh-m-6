"""1. API Quản lý người dùng (User Management CRUD API) – Phụ trách: Trần Văn Thắng."""
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

try:
    from app.core.config import settings
    SECRET_KEY = getattr(settings, "SECRET_KEY", "change-me")
    ALGORITHM = getattr(settings, "ALGORITHM", "HS256")
except Exception:  # pragma: no cover
    SECRET_KEY = "change-me"
    ALGORITHM = "HS256"

from app.utils.response import error, success

router = APIRouter(tags=["Admin - 1. Quản lý người dùng"])
bearer_scheme = HTTPBearer(auto_error=False)

VALID_ROLES = {"admin", "barber", "customer"}
VALID_USER_STATUSES = {"active", "locked"}


# ============================================================================
# KIỂM TRA PHÂN QUYỀN ADMIN (DÙNG CHUNG CHO CÁC MODULE ADMIN)
# ============================================================================

def require_admin(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
    x_role: Optional[str] = Header(default=None, alias="X-Role", description="Vai trò người gọi: admin | barber | customer"),
) -> Dict[str, Any]:
    """Kiểm tra quyền Admin qua Header `X-Role` hoặc `Authorization: Bearer <token>`."""
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
                payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
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
# SCHEMAS DỮ LIỆU NGƯỜI DÙNG
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


# ============================================================================
# DỮ LIỆU NGƯỜI DÙNG MẪU
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


# ============================================================================
# CÁC ENDPOINT QUẢN LÝ NGƯỜI DÙNG (/api/v1/admin/users)
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
        if existing["phone"].strip() == payload.phone.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error("PHONE_ALREADY_EXISTS", "Số điện thoại này đã được đăng ký."),
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
def update_user_status(user_id: int, payload: UserStatusPatchRequest, current_admin: Dict[str, Any] = Depends(require_admin)):
    """Khóa hoặc mở khóa tài khoản người dùng."""
    st = payload.status.strip().lower()
    if st not in VALID_USER_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_STATUS", "Trạng thái chỉ chấp nhận 'active' hoặc 'locked'."),
        )
    if user_id == current_admin.get("id") and st == "locked":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("CANNOT_LOCK_SELF", "Không thể tự khóa tài khoản Admin đang đăng nhập."),
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
def delete_user(user_id: int, current_admin: Dict[str, Any] = Depends(require_admin)):
    """Xóa tài khoản người dùng."""
    if user_id == current_admin.get("id"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("CANNOT_DELETE_SELF", "Không thể xóa tài khoản Admin đang đăng nhập."),
        )
    for idx, user in enumerate(USERS_DB):
        if user["id"] == user_id:
            deleted = USERS_DB.pop(idx)
            return success(data=deleted, message="Xóa người dùng thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("USER_NOT_FOUND", f"Không tìm thấy người dùng có ID={user_id}"),
    )
