"""5. API Quản lý lịch hẹn (Admin Appointment Management API) – Phụ trách: Trần Văn Thắng."""
from copy import deepcopy
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.routers.admin_users import require_admin
from app.utils.response import error, success

router = APIRouter(tags=["Admin - 5. Quản lý lịch hẹn"])

VALID_APPOINTMENT_STATUSES = {"pending", "confirmed", "completed", "rejected", "cancelled"}


# ============================================================================
# SCHEMAS DỮ LIỆU LỊCH HẸN
# ============================================================================

class AppointmentCreateRequest(BaseModel):
    customer_name: str = Field(..., min_length=2, max_length=100, description="Họ tên khách hàng")
    customer_phone: str = Field(..., min_length=8, max_length=20, description="Số điện thoại khách hàng")
    barber_name: str = Field(..., min_length=2, max_length=100, description="Tên Barber phụ trách")
    service_name: str = Field(..., min_length=2, max_length=150, description="Tên dịch vụ")
    date: str = Field(..., description="Ngày hẹn (YYYY-MM-DD)")
    time: str = Field(..., description="Giờ hẹn (HH:MM)")
    price: int = Field(default=0, ge=0, description="Giá dịch vụ dự kiến (VNĐ)")
    status: str = Field(default="pending", description="pending | confirmed | completed | rejected | cancelled")
    notes: Optional[str] = Field(default="", description="Ghi chú thêm")


class AppointmentUpdateRequest(BaseModel):
    customer_name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    customer_phone: Optional[str] = Field(default=None, min_length=8, max_length=20)
    barber_name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    service_name: Optional[str] = Field(default=None, min_length=2, max_length=150)
    date: Optional[str] = None
    time: Optional[str] = None
    price: Optional[int] = Field(default=None, ge=0)
    status: Optional[str] = None
    notes: Optional[str] = None


class AppointmentStatusPatchRequest(BaseModel):
    status: str = Field(..., description="pending | confirmed | completed | rejected | cancelled")


# ============================================================================
# DỮ LIỆU LỊCH HẸN MẪU
# ============================================================================

APPOINTMENTS_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "code": "BK-2026-101",
        "customer_name": "Hoàng Gia Huy",
        "customer_phone": "0987654321",
        "barber_name": "Nguyễn Hoàng Nam",
        "service_name": "Combo Đế Vương 7 Bước",
        "date": "2026-11-14",
        "time": "09:30",
        "price": 220000,
        "status": "completed",
        "notes": "Khách quen, thích cắt fade cao",
    },
    {
        "id": 2,
        "code": "BK-2026-102",
        "customer_name": "Đặng Quang Vinh",
        "customer_phone": "0978123456",
        "barber_name": "Lê Minh Tuấn",
        "service_name": "Uốn Định Hình Hàn Quốc",
        "date": "2026-11-14",
        "time": "10:30",
        "price": 380000,
        "status": "confirmed",
        "notes": "Đặt trước qua website",
    },
    {
        "id": 3,
        "code": "BK-2026-103",
        "customer_name": "Vũ Đình Khoa",
        "customer_phone": "0965432109",
        "barber_name": "Phạm Quốc Bảo",
        "service_name": "Cắt Tóc Thương Gia",
        "date": "2026-11-14",
        "time": "14:00",
        "price": 120000,
        "status": "pending",
        "notes": "Chờ xác nhận khung giờ chiều",
    },
    {
        "id": 4,
        "code": "BK-2026-104",
        "customer_name": "Ngô Gia Bảo",
        "customer_phone": "0977889900",
        "barber_name": "Trần Đức Anh",
        "service_name": "Cắt Tóc Thương Gia",
        "date": "2026-11-13",
        "time": "18:00",
        "price": 120000,
        "status": "rejected",
        "notes": "Barber trùng lịch bảo trì ghế",
    },
    {
        "id": 5,
        "code": "BK-2026-105",
        "customer_name": "Bùi Xuân Trường",
        "customer_phone": "0945112233",
        "barber_name": "Phạm Quốc Bảo",
        "service_name": "Cạo Râu Khăn Nóng",
        "date": "2026-11-13",
        "time": "16:30",
        "price": 80000,
        "status": "cancelled",
        "notes": "Khách báo bận đột xuất",
    },
]


# ============================================================================
# CÁC ENDPOINT QUẢN LÝ LỊCH HẸN (/api/v1/admin/appointments)
# ============================================================================

@router.get("/appointments")
def list_appointments(
    search: Optional[str] = Query(default=None, description="Tìm theo mã lịch, tên khách, SĐT, Barber hoặc dịch vụ"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="Lọc theo trạng thái"),
    barber: Optional[str] = Query(default=None, description="Lọc theo tên Barber"),
    date: Optional[str] = Query(default=None, description="Lọc theo ngày hẹn (YYYY-MM-DD)"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách lịch hẹn kèm bộ lọc và thống kê số lượng theo trạng thái."""
    items = deepcopy(APPOINTMENTS_DB)

    if search:
        kw = search.strip().lower()
        items = [
            a for a in items
            if kw in a["code"].lower()
            or kw in a["customer_name"].lower()
            or kw in a["customer_phone"].lower()
            or kw in a["barber_name"].lower()
            or kw in a["service_name"].lower()
        ]

    if status_filter and status_filter.lower() != "all":
        items = [a for a in items if a["status"] == status_filter.lower()]

    if barber and barber.lower() != "all":
        items = [a for a in items if a["barber_name"].lower() == barber.strip().lower()]

    if date:
        items = [a for a in items if a["date"] == date.strip()]

    summary = {
        "total": len(APPOINTMENTS_DB),
        "pending": len([a for a in APPOINTMENTS_DB if a["status"] == "pending"]),
        "confirmed": len([a for a in APPOINTMENTS_DB if a["status"] == "confirmed"]),
        "completed": len([a for a in APPOINTMENTS_DB if a["status"] == "completed"]),
        "rejected": len([a for a in APPOINTMENTS_DB if a["status"] == "rejected"]),
        "cancelled": len([a for a in APPOINTMENTS_DB if a["status"] == "cancelled"]),
    }

    return success(
        data={"items": items, "total": len(items), "summary": summary},
        message="Lấy danh sách lịch hẹn thành công",
    )


@router.get("/appointments/{appointment_id}")
def get_appointment_detail(appointment_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Lấy chi tiết một lịch hẹn theo ID."""
    for app_item in APPOINTMENTS_DB:
        if app_item["id"] == appointment_id:
            return success(data=app_item, message="Lấy chi tiết lịch hẹn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("APPOINTMENT_NOT_FOUND", f"Không tìm thấy lịch hẹn có ID={appointment_id}"),
    )


@router.post("/appointments", status_code=status.HTTP_201_CREATED)
def create_appointment(payload: AppointmentCreateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Tạo lịch hẹn mới (có kiểm tra trùng khung giờ của Barber)."""
    st = payload.status.strip().lower()
    if st not in VALID_APPOINTMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error(
                "INVALID_STATUS",
                f"Trạng thái lịch hẹn chỉ nhận: {', '.join(sorted(VALID_APPOINTMENT_STATUSES))}",
            ),
        )

    # Kiểm tra trùng khung giờ cùng Barber (trừ lịch đã hủy hoặc từ chối)
    for existing in APPOINTMENTS_DB:
        if (
            existing["barber_name"].strip().lower() == payload.barber_name.strip().lower()
            and existing["date"] == payload.date.strip()
            and existing["time"] == payload.time.strip()
            and existing["status"] not in ("cancelled", "rejected")
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error("SLOT_CONFLICT", "Barber đã có lịch hẹn vào khung giờ này."),
            )

    next_id = max((a["id"] for a in APPOINTMENTS_DB), default=0) + 1
    new_item = {
        "id": next_id,
        "code": f"BK-2026-{100 + next_id}",
        "customer_name": payload.customer_name.strip(),
        "customer_phone": payload.customer_phone.strip(),
        "barber_name": payload.barber_name.strip(),
        "service_name": payload.service_name.strip(),
        "date": payload.date.strip(),
        "time": payload.time.strip(),
        "price": payload.price,
        "status": st,
        "notes": (payload.notes or "").strip(),
    }
    APPOINTMENTS_DB.insert(0, new_item)
    return success(data=new_item, message="Tạo lịch hẹn mới thành công")


@router.put("/appointments/{appointment_id}")
def update_appointment(
    appointment_id: int,
    payload: AppointmentUpdateRequest,
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật thông tin lịch hẹn."""
    for app_item in APPOINTMENTS_DB:
        if app_item["id"] == appointment_id:
            if payload.status is not None:
                st = payload.status.strip().lower()
                if st not in VALID_APPOINTMENT_STATUSES:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_STATUS", "Trạng thái lịch hẹn không hợp lệ."),
                    )
                app_item["status"] = st

            for field in ("customer_name", "customer_phone", "barber_name", "service_name", "date", "time", "price", "notes"):
                val = getattr(payload, field)
                if val is not None:
                    app_item[field] = val.strip() if isinstance(val, str) else val

            return success(data=app_item, message="Cập nhật lịch hẹn thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("APPOINTMENT_NOT_FOUND", f"Không tìm thấy lịch hẹn có ID={appointment_id}"),
    )


@router.patch("/appointments/{appointment_id}/status")
def update_appointment_status(
    appointment_id: int,
    payload: AppointmentStatusPatchRequest,
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật nhanh trạng thái lịch hẹn (Duyệt / Từ chối / Hoàn thành / Hủy)."""
    st = payload.status.strip().lower()
    if st not in VALID_APPOINTMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error(
                "INVALID_STATUS",
                f"Trạng thái lịch hẹn chỉ nhận: {', '.join(sorted(VALID_APPOINTMENT_STATUSES))}",
            ),
        )
    for app_item in APPOINTMENTS_DB:
        if app_item["id"] == appointment_id:
            app_item["status"] = st
            return success(data=app_item, message="Cập nhật trạng thái lịch hẹn thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("APPOINTMENT_NOT_FOUND", f"Không tìm thấy lịch hẹn có ID={appointment_id}"),
    )


@router.delete("/appointments/{appointment_id}")
def delete_appointment(appointment_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xóa lịch hẹn theo ID."""
    for idx, app_item in enumerate(APPOINTMENTS_DB):
        if app_item["id"] == appointment_id:
            deleted = APPOINTMENTS_DB.pop(idx)
            return success(data=deleted, message="Xóa lịch hẹn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("APPOINTMENT_NOT_FOUND", f"Không tìm thấy lịch hẹn có ID={appointment_id}"),
    )
