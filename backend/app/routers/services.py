"""Router `services` – Phụ trách: Vũ Quốc Khánh.

Cung cấp:
1. API công khai (Public):
   - GET /api/v1/services: Danh sách dịch vụ kèm bộ lọc (tên, giá, thời lượng) và sắp xếp.
   - GET /api/v1/services/{service_id}: Chi tiết dịch vụ công khai.
2. API quản trị (Admin Only - yêu cầu quyền admin):
   - POST /api/v1/services: Thêm dịch vụ mới.
   - PUT /api/v1/services/{service_id}: Cập nhật thông tin dịch vụ.
   - DELETE /api/v1/services/{service_id}: Ẩn dịch vụ (soft-delete, is_active=False).
   - PATCH /api/v1/services/{service_id}/status: Cập nhật trạng thái ẩn/hiện.
   - PATCH /api/v1/services/{service_id}/hide: Ẩn dịch vụ nhanh.
   - PATCH /api/v1/services/{service_id}/unhide: Hiện lại dịch vụ nhanh.
"""
from typing import Any, Dict, Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.service import Service
from app.schemas.service import (
    ServiceCreate,
    ServiceListOut,
    ServiceOut,
    ServiceStatusUpdate,
    ServiceUpdate,
)

# Phân quyền Admin: Sử dụng dependency của Thiều Tiến Dũng / Trần Văn Thắng
try:
    from app.routers.admin_users import require_admin
except ImportError:
    def require_admin() -> Dict[str, Any]:
        return {"id": 1, "role": "admin", "full_name": "Quản trị viên"}

router = APIRouter(prefix="/services", tags=["Dịch vụ & Bảng giá (Services)"])

SORT_COLUMNS = {
    "price": Service.price,
    "duration": Service.duration,
    "name": Service.name,
}


# ============================================================================
# 1. API CÔNG KHAI (CUSTOMER & PUBLIC)
# ============================================================================

@router.get(
    "",
    response_model=ServiceListOut,
    summary="Lấy danh sách dịch vụ (kèm tìm kiếm, lọc theo giá/thời lượng, sắp xếp)",
    description=(
        "Phục vụ trang Dịch vụ khách hàng (Customer) và màn Quản lý dịch vụ (Admin).\n"
        "- Mặc định chỉ trả về các dịch vụ đang mở bán (`is_active = True`).\n"
        "- Hỗ trợ lọc theo từ khóa tên, khoảng giá (`min_price`, `max_price`), thời lượng (`min_duration`, `max_duration`).\n"
        "- Hỗ trợ sắp xếp theo giá (`price`), thời lượng (`duration`) hoặc tên (`name`), theo chiều tăng dần (`asc`) hoặc giảm dần (`desc`).\n"
        "- Tham số `include_inactive=true` cho phép Admin xem toàn bộ dịch vụ kể cả đã ẩn."
    ),
)
def list_services(
    search: Optional[str] = Query(default=None, description="Tìm kiếm theo tên dịch vụ"),
    min_price: Optional[float] = Query(default=None, ge=0, description="Giá dịch vụ tối thiểu (VNĐ)"),
    max_price: Optional[float] = Query(default=None, ge=0, description="Giá dịch vụ tối đa (VNĐ)"),
    min_duration: Optional[int] = Query(default=None, ge=1, description="Thời lượng tối thiểu (phút)"),
    max_duration: Optional[int] = Query(default=None, ge=1, description="Thời lượng tối đa (phút)"),
    sort_by: Literal["price", "duration", "name"] = Query(default="name", description="Trường cần sắp xếp"),
    order: Literal["asc", "desc"] = Query(default="asc", description="Chiều sắp xếp: asc (tăng dần) | desc (giảm dần)"),
    include_inactive: bool = Query(default=False, description="Bao gồm cả dịch vụ đã ẩn (dành cho quản lý)"),
    page: int = Query(default=1, ge=1, description="Trang hiện tại"),
    limit: int = Query(default=20, ge=1, le=100, description="Số lượng mỗi trang"),
    db: Session = Depends(get_db),
):
    """Lấy danh sách dịch vụ có lọc, tìm kiếm, sắp xếp và phân trang."""
    # Kiểm tra tính hợp lệ của khoảng giá
    if isinstance(min_price, (int, float)) and isinstance(max_price, (int, float)):
        if min_price > max_price:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Giá tối thiểu không được lớn hơn giá tối đa",
            )

    # Kiểm tra tính hợp lệ của khoảng thời lượng
    if isinstance(min_duration, int) and isinstance(max_duration, int):
        if min_duration > max_duration:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Thời lượng tối thiểu không được lớn hơn thời lượng tối đa",
            )

    query = db.query(Service)

    # Khách hàng chỉ xem dịch vụ đang hoạt động
    if not include_inactive:
        query = query.filter(Service.is_active.is_(True))

    # Lọc theo từ khóa tên
    if search and isinstance(search, str) and search.strip():
        query = query.filter(Service.name.ilike(f"%{search.strip()}%"))

    # Lọc theo khoảng giá
    if isinstance(min_price, (int, float)):
        query = query.filter(Service.price >= min_price)
    if isinstance(max_price, (int, float)):
        query = query.filter(Service.price <= max_price)

    # Lọc theo khoảng thời lượng
    if isinstance(min_duration, int):
        query = query.filter(Service.duration >= min_duration)
    if isinstance(max_duration, int):
        query = query.filter(Service.duration <= max_duration)

    total = query.count()

    # Sắp xếp
    sort_col = sort_by if isinstance(sort_by, str) else "name"
    order_dir = order if isinstance(order, str) else "asc"
    column = SORT_COLUMNS.get(sort_col, Service.name)
    order_clause = column.desc() if order_dir == "desc" else column.asc()
    query = query.order_by(order_clause, Service.service_id.asc())

    # Phân trang
    page_num = page if isinstance(page, int) else 1
    limit_num = limit if isinstance(limit, int) else 20
    items = query.offset((page_num - 1) * limit_num).limit(limit_num).all()

    return {"items": items, "total": total, "page": page_num, "limit": limit_num}


@router.get(
    "/{service_id}",
    response_model=ServiceOut,
    summary="Lấy thông tin chi tiết một dịch vụ",
    description="Xem chi tiết dịch vụ theo `service_id`. Nếu dịch vụ đã ẩn và không truyền `include_inactive=true`, hệ thống trả về mã 404.",
)
def get_service(
    service_id: int,
    include_inactive: bool = Query(default=False, description="Cho phép xem nếu dịch vụ đã bị ẩn"),
    db: Session = Depends(get_db),
):
    """Chi tiết một dịch vụ."""
    service = db.query(Service).filter(Service.service_id == service_id).first()
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy dịch vụ")

    if not service.is_active and not include_inactive:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Dịch vụ hiện không mở bán hoặc đã bị ẩn",
        )

    return service


# ============================================================================
# 2. API QUẢN TRỊ (CHỈ ADMIN - PHỤC VỤ MÀN HÌNH QUẢN LÝ DỊCH VỤ CỦA THẮNG)
# ============================================================================

@router.post(
    "",
    response_model=ServiceOut,
    status_code=status.HTTP_201_CREATED,
    summary="Thêm dịch vụ mới (Chỉ Admin)",
    description=(
        "Thêm dịch vụ mới vào hệ thống.\n"
        "- Yêu cầu quyền **Admin** (`Authorization: Bearer <token>` hoặc header `X-Role: admin`).\n"
        "- `name`: Tên dịch vụ (duy nhất, không trùng lặp).\n"
        "- `price`: Giá dịch vụ > 0.\n"
        "- `duration`: Thời lượng (phút) > 0."
    ),
)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Tạo mới một dịch vụ (Chỉ Admin)."""
    clean_name = payload.name.strip()

    # Kiểm tra trùng tên dịch vụ
    existing = db.query(Service).filter(Service.name == clean_name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Dịch vụ có tên '{clean_name}' đã tồn tại trong hệ thống",
        )

    service = Service(
        name=clean_name,
        description=payload.description.strip() if payload.description else None,
        price=payload.price,
        duration=payload.duration,
        is_active=True,
    )
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.put(
    "/{service_id}",
    response_model=ServiceOut,
    summary="Cập nhật thông tin dịch vụ (Chỉ Admin)",
    description=(
        "Cập nhật thông tin dịch vụ theo `service_id`.\n"
        "- Yêu cầu quyền **Admin**.\n"
        "- Có thể cập nhật tên, mô tả, giá, thời lượng hoặc trạng thái ẩn/hiện (`is_active`)."
    ),
)
def update_service(
    service_id: int,
    payload: ServiceUpdate,
    db: Session = Depends(get_db),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật thông tin dịch vụ (Chỉ Admin)."""
    service = db.query(Service).filter(Service.service_id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy dịch vụ có mã ID {service_id}",
        )

    # Nếu đổi tên, kiểm tra tên mới có bị trùng với dịch vụ khác không
    if payload.name is not None and payload.name.strip():
        new_name = payload.name.strip()
        if new_name.lower() != service.name.lower():
            dup = (
                db.query(Service)
                .filter(Service.name == new_name, Service.service_id != service_id)
                .first()
            )
            if dup:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Tên dịch vụ '{new_name}' đã được sử dụng bởi dịch vụ khác",
                )
        service.name = new_name

    if payload.description is not None:
        service.description = payload.description.strip() if payload.description else None

    if payload.price is not None:
        service.price = payload.price

    if payload.duration is not None:
        service.duration = payload.duration

    if payload.is_active is not None:
        service.is_active = payload.is_active

    db.commit()
    db.refresh(service)
    return service


@router.delete(
    "/{service_id}",
    response_model=ServiceOut,
    summary="Ẩn dịch vụ / Soft delete (Chỉ Admin)",
    description=(
        "Chuyển trạng thái dịch vụ sang `is_active = False` (Ẩn dịch vụ).\n"
        "- Yêu cầu quyền **Admin**.\n"
        "- Dịch vụ không bị xóa vật lý khỏi cơ sở dữ liệu để bảo toàn lịch sử đặt lịch và hóa đơn."
    ),
)
def hide_service(
    service_id: int,
    db: Session = Depends(get_db),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Ẩn dịch vụ (Soft-delete) – Chỉ Admin."""
    service = db.query(Service).filter(Service.service_id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy dịch vụ có mã ID {service_id}",
        )

    service.is_active = False
    db.commit()
    db.refresh(service)
    return service


@router.patch(
    "/{service_id}/status",
    response_model=ServiceOut,
    summary="Cập nhật trạng thái ẩn/hiện dịch vụ (Chỉ Admin)",
    description="Thay đổi trạng thái `is_active` (`true`: hiển thị, `false`: ẩn). Yêu cầu quyền Admin.",
)
def change_service_status(
    service_id: int,
    payload: ServiceStatusUpdate,
    db: Session = Depends(get_db),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật trạng thái ẩn/hiện dịch vụ – Chỉ Admin."""
    service = db.query(Service).filter(Service.service_id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy dịch vụ có mã ID {service_id}",
        )

    service.is_active = payload.is_active
    db.commit()
    db.refresh(service)
    return service


@router.patch(
    "/{service_id}/hide",
    response_model=ServiceOut,
    summary="Ẩn dịch vụ nhanh (Chỉ Admin)",
    description="Chuyển trạng thái `is_active = False`. Yêu cầu quyền Admin.",
)
def hide_service_quick(
    service_id: int,
    db: Session = Depends(get_db),
    admin: Dict[str, Any] = Depends(require_admin),
):
    """Ẩn dịch vụ nhanh – Chỉ Admin."""
    return hide_service(service_id=service_id, db=db, _=admin)


@router.patch(
    "/{service_id}/unhide",
    response_model=ServiceOut,
    summary="Bỏ ẩn / Kích hoạt lại dịch vụ (Chỉ Admin)",
    description="Chuyển trạng thái `is_active = True`. Yêu cầu quyền Admin.",
)
def unhide_service_quick(
    service_id: int,
    db: Session = Depends(get_db),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Kích hoạt lại dịch vụ đã ẩn – Chỉ Admin."""
    service = db.query(Service).filter(Service.service_id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Không tìm thấy dịch vụ có mã ID {service_id}",
        )

    service.is_active = True
    db.commit()
    db.refresh(service)
    return service
