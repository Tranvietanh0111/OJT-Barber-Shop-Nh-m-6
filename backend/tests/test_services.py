"""Bộ unit test kiểm tra toàn diện API Dịch vụ (Services) – Phụ trách: Vũ Quốc Khánh."""
import pytest
from decimal import Decimal
from fastapi import HTTPException

from app.core.database import Base, SessionLocal, engine
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceStatusUpdate, ServiceUpdate
from app.routers.services import (
    change_service_status,
    create_service,
    get_service,
    hide_service,
    hide_service_quick,
    list_services,
    unhide_service_quick,
    update_service,
)


@pytest.fixture(scope="module")
def db_session():
    """Tạo bảng và dữ liệu mẫu kiểm thử."""
    Base.metadata.create_all(bind=engine, tables=[Service.__table__])
    db = SessionLocal()

    # Dọn dẹp dữ liệu cũ trước khi test
    db.query(Service).delete()
    db.commit()

    sample_services = [
        Service(name="Cắt tóc nam Classic", description="Cắt tóc chuẩn phom", price=100000, duration=30, is_active=True),
        Service(name="Combo Đế Vương", description="Cắt + gội + massage", price=250000, duration=60, is_active=True),
        Service(name="Uốn tóc phồng Hàn Quốc", description="Uốn xoăn thời trang", price=400000, duration=90, is_active=True),
        Service(name="Nhuộm tóc thời trang", description="Nhuộm màu cao cấp", price=500000, duration=120, is_active=True),
        Service(name="Dịch vụ Cũ Đã Ẩn", description="Dịch vụ không còn mở bán", price=80000, duration=20, is_active=False),
    ]
    for s in sample_services:
        db.add(s)
    db.commit()

    yield db

    db.close()


def test_list_services_public(db_session):
    """Khách hàng chỉ xem được các dịch vụ đang mở bán (is_active=True)."""
    res = list_services(
        search=None,
        min_price=None,
        max_price=None,
        min_duration=None,
        max_duration=None,
        sort_by="name",
        order="asc",
        include_inactive=False,
        page=1,
        limit=20,
        db=db_session,
    )
    assert res["total"] == 4
    for item in res["items"]:
        assert item.is_active is True


def test_list_services_filter_price(db_session):
    """Lọc dịch vụ theo khoảng giá."""
    res = list_services(
        search=None,
        min_price=200000,
        max_price=450000,
        min_duration=None,
        max_duration=None,
        sort_by="price",
        order="asc",
        include_inactive=False,
        page=1,
        limit=20,
        db=db_session,
    )
    assert res["total"] == 2
    prices = [item.price for item in res["items"]]
    assert prices == [250000, 400000]


def test_list_services_filter_duration(db_session):
    """Lọc dịch vụ theo thời lượng thực hiện."""
    res = list_services(
        search=None,
        min_price=None,
        max_price=None,
        min_duration=45,
        max_duration=90,
        sort_by="duration",
        order="asc",
        include_inactive=False,
        page=1,
        limit=20,
        db=db_session,
    )
    assert res["total"] == 2
    durations = [item.duration for item in res["items"]]
    assert durations == [60, 90]


def test_list_services_invalid_price_range(db_session):
    """min_price > max_price ném ra lỗi 400 Bad Request."""
    with pytest.raises(HTTPException) as exc_info:
        list_services(min_price=500000, max_price=100000, db=db_session)
    assert exc_info.value.status_code == 400


def test_list_services_invalid_duration_range(db_session):
    """min_duration > max_duration ném ra lỗi 400 Bad Request."""
    with pytest.raises(HTTPException) as exc_info:
        list_services(min_duration=120, max_duration=30, db=db_session)
    assert exc_info.value.status_code == 400


def test_list_services_sort_by_duration_desc(db_session):
    """Sắp xếp dịch vụ theo thời lượng giảm dần."""
    res = list_services(
        search=None,
        min_price=None,
        max_price=None,
        min_duration=None,
        max_duration=None,
        sort_by="duration",
        order="desc",
        include_inactive=False,
        page=1,
        limit=20,
        db=db_session,
    )
    durations = [item.duration for item in res["items"]]
    assert durations == [120, 90, 60, 30]


def test_list_services_search(db_session):
    """Tìm kiếm dịch vụ theo tên."""
    res = list_services(
        search="Đế Vương",
        min_price=None,
        max_price=None,
        min_duration=None,
        max_duration=None,
        sort_by="name",
        order="asc",
        include_inactive=False,
        page=1,
        limit=20,
        db=db_session,
    )
    assert res["total"] == 1
    assert "Đế Vương" in res["items"][0].name


def test_list_services_include_inactive(db_session):
    """Admin có thể xem toàn bộ dịch vụ kể cả đã ẩn."""
    res = list_services(
        search=None,
        min_price=None,
        max_price=None,
        min_duration=None,
        max_duration=None,
        sort_by="name",
        order="asc",
        include_inactive=True,
        page=1,
        limit=20,
        db=db_session,
    )
    assert res["total"] == 5


def test_get_service_detail_success(db_session):
    """Xem chi tiết dịch vụ đang mở bán thành công."""
    active_service = db_session.query(Service).filter(Service.is_active == True).first()
    res = get_service(service_id=active_service.service_id, include_inactive=False, db=db_session)
    assert res.service_id == active_service.service_id
    assert res.name == active_service.name


def test_get_service_detail_hidden_returns_404(db_session):
    """Xem chi tiết dịch vụ đã ẩn mà không có cờ include_inactive sẽ trả về 404."""
    hidden_service = db_session.query(Service).filter(Service.is_active == False).first()
    with pytest.raises(HTTPException) as exc_info:
        get_service(service_id=hidden_service.service_id, include_inactive=False, db=db_session)
    assert exc_info.value.status_code == 404


def test_get_service_not_found(db_session):
    """Xem chi tiết dịch vụ không tồn tại trả về 404."""
    with pytest.raises(HTTPException) as exc_info:
        get_service(service_id=999999, db=db_session)
    assert exc_info.value.status_code == 404


def test_admin_create_service(db_session):
    """Admin thêm dịch vụ mới thành công."""
    payload = ServiceCreate(
        name="Tẩy tế bào chết da đầu",
        description="Làm sạch gàu và bã nhờn chuyên sâu",
        price=Decimal("150000"),
        duration=35,
    )
    created = create_service(payload=payload, db=db_session, _={"role": "admin"})
    assert created.service_id is not None
    assert created.name == "Tẩy tế bào chết da đầu"
    assert created.price == 150000
    assert created.duration == 35
    assert created.is_active is True


def test_admin_create_duplicate_service_fails(db_session):
    """Thêm dịch vụ trùng tên bị từ chối với mã lỗi 400."""
    payload = ServiceCreate(
        name="Cắt tóc nam Classic",
        description="Trùng tên",
        price=Decimal("120000"),
        duration=30,
    )
    with pytest.raises(HTTPException) as exc_info:
        create_service(payload=payload, db=db_session, _={"role": "admin"})
    assert exc_info.value.status_code == 400
    assert "đã tồn tại" in exc_info.value.detail


def test_admin_update_service(db_session):
    """Admin cập nhật thông tin dịch vụ thành công."""
    service = db_session.query(Service).filter(Service.name == "Cắt tóc nam Classic").first()
    payload = ServiceUpdate(
        name="Cắt tóc nam Classic VIP",
        price=Decimal("130000"),
        duration=40,
    )
    updated = update_service(service_id=service.service_id, payload=payload, db=db_session, _={"role": "admin"})
    assert updated.name == "Cắt tóc nam Classic VIP"
    assert updated.price == 130000
    assert updated.duration == 40


def test_admin_update_duplicate_name_fails(db_session):
    """Cập nhật tên dịch vụ trùng với tên một dịch vụ khác bị 400."""
    service = db_session.query(Service).filter(Service.name == "Cắt tóc nam Classic VIP").first()
    payload = ServiceUpdate(name="Combo Đế Vương")
    with pytest.raises(HTTPException) as exc_info:
        update_service(service_id=service.service_id, payload=payload, db=db_session, _={"role": "admin"})
    assert exc_info.value.status_code == 400
    assert "đã được sử dụng" in exc_info.value.detail


def test_admin_hide_and_unhide_service(db_session):
    """Admin ẩn dịch vụ (soft-delete) và kích hoạt lại thành công."""
    service = db_session.query(Service).filter(Service.is_active == True).first()
    s_id = service.service_id

    # 1. Ẩn dịch vụ
    hidden = hide_service(service_id=s_id, db=db_session, _={"role": "admin"})
    assert hidden.is_active is False

    # Khách hàng tìm lại không thấy trong danh sách công khai
    pub_list = list_services(include_inactive=False, db=db_session)
    assert not any(item.service_id == s_id for item in pub_list["items"])

    # 2. Kích hoạt lại dịch vụ
    restored = unhide_service_quick(service_id=s_id, db=db_session, _={"role": "admin"})
    assert restored.is_active is True

    # Khách hàng lại thấy trong danh sách công khai
    pub_list2 = list_services(include_inactive=False, db=db_session)
    assert any(item.service_id == s_id for item in pub_list2["items"])


def test_admin_change_service_status(db_session):
    """Cập nhật trạng thái qua status PATCH."""
    service = db_session.query(Service).filter(Service.is_active == True).first()
    updated = change_service_status(
        service_id=service.service_id,
        payload=ServiceStatusUpdate(is_active=False),
        db=db_session,
        _={"role": "admin"},
    )
    assert updated.is_active is False
