"""2. API Quản lý Barber (Barber Management CRUD API) – Phụ trách: Trần Văn Thắng."""
from copy import deepcopy
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.routers.admin_users import require_admin
from app.utils.response import error, success

router = APIRouter(tags=["Admin - 2. Quản lý Barber"])

VALID_BARBER_STATUSES = {"available", "busy", "off", "inactive"}


# ============================================================================
# SCHEMAS DỮ LIỆU BARBER
# ============================================================================

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


# ============================================================================
# DỮ LIỆU BARBER MẪU
# ============================================================================

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
        "monthly_revenue": 34500000,
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
        "monthly_revenue": 26800000,
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
        "monthly_revenue": 22400000,
        "status": "off",
    },
    {
        "id": 4,
        "code": "BB-04",
        "full_name": "Trần Đức Anh",
        "phone": "0945678901",
        "email": "ducanh.barber@barberhub.vn",
        "specialty": "Side Part & Mullet Hiện Đại",
        "experience_years": 4,
        "rating": 4.8,
        "completed_orders": 98,
        "shift": "08:30 - 17:30",
        "commission_rate": 35,
        "monthly_revenue": 19800000,
        "status": "available",
    },
    {
        "id": 5,
        "code": "BB-05",
        "full_name": "Vũ Hải Đăng",
        "phone": "0956789012",
        "email": "haidang.barber@barberhub.vn",
        "specialty": "Mohican & Uốn Premlock",
        "experience_years": 3,
        "rating": 4.6,
        "completed_orders": 76,
        "shift": "12:00 - 21:00",
        "commission_rate": 32,
        "monthly_revenue": 14500000,
        "status": "available",
    },
]


# ============================================================================
# CÁC ENDPOINT QUẢN LÝ BARBER (/api/v1/admin/barbers)
# ============================================================================

@router.get("/barbers")
def list_barbers(
    search: Optional[str] = Query(default=None, description="Tìm kiếm theo tên, mã BB, SĐT hoặc chuyên môn"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="available | busy | off | inactive"),
    page: int = Query(default=1, ge=1, description="Trang hiện tại"),
    limit: int = Query(default=20, ge=1, le=100, description="Số bản ghi mỗi trang"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách Barber kèm tìm kiếm, lọc trạng thái và phân trang."""
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

    total = len(items)
    start = (page - 1) * limit
    paginated_items = items[start : start + limit]

    summary = {
        "total_barbers": len(BARBERS_DB),
        "available": len([b for b in BARBERS_DB if b["status"] == "available"]),
        "busy": len([b for b in BARBERS_DB if b["status"] == "busy"]),
        "off": len([b for b in BARBERS_DB if b["status"] == "off"]),
        "inactive": len([b for b in BARBERS_DB if b["status"] == "inactive"]),
    }

    return success(
        data={
            "items": paginated_items,
            "total": total,
            "page": page,
            "limit": limit,
            "summary": summary,
        },
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

    for existing in BARBERS_DB:
        if existing["phone"].strip() == payload.phone.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error("PHONE_ALREADY_EXISTS", "Số điện thoại của Barber đã tồn tại trong hệ thống."),
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
