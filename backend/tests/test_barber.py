"""Bộ unit test kiểm tra toàn diện API Barber (Thợ cắt tóc & Hồ sơ cá nhân) – Phụ trách: Vũ Quốc Khánh."""
import pytest
from datetime import datetime
from fastapi import HTTPException
from sqlalchemy import func

from app.core.database import Base, SessionLocal, engine
from app.models.appointment import Appointment
from app.models.barber import Barber
from app.models.review import Review
from app.models.role import Role
from app.models.service import Service
from app.models.user import User
from app.schemas.barber import BarberProfileUpdate
from app.routers.barber import (
    get_barber_public,
    get_my_barber_profile,
    list_barbers_public,
    require_barber,
    update_my_barber_profile,
)


@pytest.fixture(scope="module")
def db_session():
    """Tạo bảng và dữ liệu mẫu kiểm thử Barber, Service, Review."""
    Base.metadata.create_all(
        bind=engine,
        tables=[
            Role.__table__,
            User.__table__,
            Barber.__table__,
            Service.__table__,
            Appointment.__table__,
            Review.__table__,
        ],
    )
    db = SessionLocal()

    # Dọn dẹp dữ liệu cũ trước khi chạy test module
    db.query(Review).delete()
    db.query(Appointment).delete()
    db.query(Barber).delete()
    db.query(Service).delete()
    db.query(User).delete()
    db.commit()

    # 1. Thêm dịch vụ mẫu
    s1 = Service(service_id=1, name="Cắt tóc nam Classic", description="Cắt phom chuẩn", price=120000, duration=30, is_active=True)
    s2 = Service(service_id=2, name="Combo Đế Vương", description="Cắt + gội + massage", price=250000, duration=60, is_active=True)
    s3 = Service(service_id=3, name="Uốn tóc phồng Hàn Quốc", description="Uốn xoăn thời trang", price=400000, duration=90, is_active=True)
    db.add_all([s1, s2, s3])
    db.commit()

    # 2. Thêm Barber mẫu
    b1 = Barber(
        barber_id=1,
        full_name="Nguyễn Hoàng Long",
        phone="0911222333",
        experience=6,
        status="Sẵn sàng",
        bio="Chuyên gia Skin Fade và Cạo râu cổ điển với 6 năm kinh nghiệm.",
        specialties="Cắt tóc nam, Fade / Undercut, Cạo râu",
        service_ids="1,2",
    )
    b2 = Barber(
        barber_id=2,
        full_name="Trần Văn Tuấn",
        phone="0922333444",
        experience=5,
        status="Đang bận",
        bio="Chuyên gia uốn xoăn và tạo kiểu tóc thời thượng.",
        specialties="Uốn tóc, Nhuộm tóc",
        service_ids="2,3",
    )
    b3 = Barber(
        barber_id=3,
        full_name="Thợ Cũ Đã Nghỉ",
        phone="0933444555",
        experience=2,
        status="INACTIVE",
        bio="Đã nghỉ việc",
        specialties="Cắt tóc nam",
        service_ids="1",
    )
    db.add_all([b1, b2, b3])
    db.commit()

    # 3. Thêm khách hàng và review mẫu cho b1
    u1 = User(user_id=10, username="khach_hang_1", password_hash="123", full_name="Trần Việt Anh", email="anh@barber.vn")
    db.add(u1)
    db.commit()

    app1 = Appointment(appointment_id=101, customer_id=10, barber_id=1, service_id=1, appointment_date=func.now(), status="COMPLETED", total_price=120000)
    db.add(app1)
    db.commit()

    rev1 = Review(review_id=201, customer_id=10, barber_id=1, appointment_id=101, rating=5, comment="Cắt rất tỉ mỉ và ưng ý!")
    db.add(rev1)
    db.commit()

    yield db

    db.close()


def test_list_barbers_public(db_session):
    """Danh sách Barber công khai chỉ hiển thị các Barber đang hoạt động và có kèm dịch vụ + điểm đánh giá."""
    res = list_barbers_public(db=db_session)
    assert res["total"] == 2  # b1 và b2, bỏ qua b3 (INACTIVE)

    first = res["items"][0]
    assert first.barber_id == 1
    assert first.full_name == "Nguyễn Hoàng Long"
    assert first.rating == 5.0
    assert first.reviews_count == 1
    assert len(first.services) == 2  # Dịch vụ 1 và 2
    assert first.services[0].name == "Cắt tóc nam Classic"


def test_list_barbers_search_by_specialty(db_session):
    """Tìm kiếm thợ theo chuyên môn."""
    res = list_barbers_public(search="Uốn", db=db_session)
    assert res["total"] == 1
    assert res["items"][0].full_name == "Trần Văn Tuấn"


def test_list_barbers_filter_by_service_id(db_session):
    """Lọc thợ đảm nhận dịch vụ số 3 (Uốn tóc)."""
    res = list_barbers_public(service_id=3, db=db_session)
    assert res["total"] == 1
    assert res["items"][0].barber_id == 2


def test_get_barber_public_detail(db_session):
    """Chi tiết Barber công khai kèm đầy đủ dịch vụ và các đánh giá gần nhất."""
    barber = get_barber_public(barber_id=1, db=db_session)
    assert barber.barber_id == 1
    assert barber.full_name == "Nguyễn Hoàng Long"
    assert len(barber.services) == 2
    assert barber.reviews is not None
    assert len(barber.reviews) == 1
    assert barber.reviews[0].comment == "Cắt rất tỉ mỉ và ưng ý!"
    assert barber.reviews[0].customer_name == "Trần Việt Anh"


def test_get_barber_public_not_found(db_session):
    """Tìm ID không tồn tại trả về 404."""
    with pytest.raises(HTTPException) as exc_info:
        get_barber_public(barber_id=99999, db=db_session)
    assert exc_info.value.status_code == 404


def test_get_my_barber_profile(db_session):
    """Barber tự xem hồ sơ của mình thành công."""
    current_user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    profile = get_my_barber_profile(db=db_session, current_user=current_user)
    assert profile.barber_id == 1
    assert profile.full_name == "Nguyễn Hoàng Long"
    assert profile.experience == 6
    assert "Fade / Undercut" in profile.specialties
    assert 1 in profile.service_ids


def test_update_my_barber_profile(db_session):
    """Barber tự cập nhật giới thiệu, kinh nghiệm, chuyên môn và dịch vụ đảm nhận."""
    current_user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberProfileUpdate(
        bio="Hơn 7 năm kinh nghiệm với đam mê cạo khăn nóng quý ông.",
        experience=7,
        specialties=["Cắt tóc nam", "Taper Fade", "Nghệ thuật Cạo khăn nóng"],
        service_ids=[1, 2, 3],
        status="Sẵn sàng phục vụ",
    )
    updated = update_my_barber_profile(payload=payload, db=db_session, current_user=current_user)
    assert updated.experience == 7
    assert "Hơn 7 năm kinh nghiệm" in updated.bio
    assert len(updated.services) == 3
    assert "Taper Fade" in updated.specialties
    assert updated.status == "Sẵn sàng phục vụ"


def test_update_barber_duplicate_phone_fails(db_session):
    """Cập nhật SĐT trùng với Barber khác bị chặn với mã lỗi 400."""
    current_user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberProfileUpdate(phone="0922333444")  # SĐT của b2
    with pytest.raises(HTTPException) as exc_info:
        update_my_barber_profile(payload=payload, db=db_session, current_user=current_user)
    assert exc_info.value.status_code == 400
    assert "đã được sử dụng" in exc_info.value.detail


def test_require_barber_rejects_customer():
    """Khách hàng (customer) cố tình gọi API Barber bị chặn với lỗi 403 Forbidden."""
    with pytest.raises(HTTPException) as exc_info:
        require_barber(x_role="customer")
    assert exc_info.value.status_code == 403
    assert "yêu cầu vai trò Barber" in exc_info.value.detail
