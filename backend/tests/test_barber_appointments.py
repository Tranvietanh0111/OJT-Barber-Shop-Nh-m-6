"""Bộ unit test kiểm tra toàn diện API Lịch hẹn Barber (Task T06AF14) – Phụ trách: Vũ Quốc Khánh."""
from datetime import datetime, timedelta
import pytest
from fastapi import HTTPException

from app.core.database import Base, SessionLocal, engine
from app.models.appointment import Appointment
from app.models.barber import Barber
from app.models.review import Review
from app.models.role import Role
from app.models.service import Service
from app.models.user import User
from app.schemas.barber import BarberAppointmentStatusUpdate
from app.routers.barber import (
    list_my_barber_appointments,
    update_barber_appointment_status,
)


@pytest.fixture(scope="module")
def db_session():
    """Tạo dữ liệu mẫu kiểm thử lịch hẹn cho Barber 1 và Barber 2."""
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

    # Dọn dẹp dữ liệu cũ
    db.query(Review).delete()
    db.query(Appointment).delete()
    db.query(Barber).delete()
    db.query(Service).delete()
    db.query(User).delete()
    db.commit()

    # Khách hàng
    u1 = User(user_id=101, username="khach1", password_hash="123", full_name="Nguyễn Văn An", phone="0901234567")
    u2 = User(user_id=102, username="khach2", password_hash="123", full_name="Trần Minh Quân", phone="0912345678")
    db.add_all([u1, u2])

    # Thợ Barber 1 & 2
    b1 = Barber(barber_id=1, full_name="Nguyễn Hoàng Long", phone="0911222333", experience=6, status="Sẵn sàng", service_ids="1,2")
    b2 = Barber(barber_id=2, full_name="Trần Văn Tuấn", phone="0922333444", experience=5, status="Đang bận", service_ids="2,3")
    db.add_all([b1, b2])

    # Dịch vụ
    s1 = Service(service_id=1, name="Cắt tóc nam", price=80000, duration=30, is_active=True)
    s2 = Service(service_id=2, name="Combo Cắt + Gội", price=120000, duration=45, is_active=True)
    db.add_all([s1, s2])
    db.commit()

    today = datetime(2026, 11, 25, 9, 0)
    tomorrow = today + timedelta(days=1)

    # 4 lịch hẹn cho Barber 1
    app1 = Appointment(appointment_id=1, customer_id=101, barber_id=1, service_id=1, appointment_date=today, status="pending", total_price=80000)
    app2 = Appointment(appointment_id=2, customer_id=102, barber_id=1, service_id=2, appointment_date=today.replace(hour=10, minute=30), status="confirmed", total_price=120000)
    app3 = Appointment(appointment_id=3, customer_id=101, barber_id=1, service_id=1, appointment_date=today.replace(hour=14, minute=0), status="in_progress", total_price=80000)
    app4 = Appointment(appointment_id=4, customer_id=102, barber_id=1, service_id=1, appointment_date=tomorrow.replace(hour=9, minute=30), status="confirmed", total_price=80000)

    # 1 lịch hẹn của Barber 2 (để test Barber 1 không xem được và không sửa được lịch của Barber 2)
    app_b2 = Appointment(appointment_id=99, customer_id=101, barber_id=2, service_id=1, appointment_date=today, status="pending", total_price=80000)

    db.add_all([app1, app2, app3, app4, app_b2])
    db.commit()

    yield db

    db.close()


def test_barber_view_own_appointments_only(db_session):
    """Barber 1 chỉ xem được lịch hẹn của mình, KHÔNG xem được lịch của Barber 2."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = list_my_barber_appointments(db=db_session, current_user=current_user_b1)

    assert res["total"] == 4
    for item in res["items"]:
        assert item.barber_id == 1
        assert item.appointment_id != 99  # Lịch 99 của Barber 2 tuyệt đối không xuất hiện


def test_barber_filter_appointments_by_date(db_session):
    """Lọc danh sách lịch hẹn theo ngày."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = list_my_barber_appointments(date="2026-11-25", db=db_session, current_user=current_user_b1)
    assert res["total"] == 3
    for item in res["items"]:
        assert item.date == "2026-11-25"


def test_barber_filter_appointments_by_status(db_session):
    """Lọc danh sách lịch hẹn theo trạng thái."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = list_my_barber_appointments(status_filter="confirmed", db=db_session, current_user=current_user_b1)
    assert res["total"] == 2
    for item in res["items"]:
        assert item.status == "confirmed"


def test_barber_mark_confirmed(db_session):
    """Barber 1 đánh dấu xác nhận lịch hẹn (pending -> confirmed)."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="confirmed")
    updated = update_barber_appointment_status(appointment_id=1, payload=payload, db=db_session, current_user=current_user_b1)
    assert updated.status == "confirmed"


def test_barber_mark_in_progress(db_session):
    """Barber 1 đánh dấu bắt đầu phục vụ (confirmed -> in_progress)."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="in_progress")
    updated = update_barber_appointment_status(appointment_id=1, payload=payload, db=db_session, current_user=current_user_b1)
    assert updated.status == "in_progress"


def test_barber_mark_completed(db_session):
    """Barber 1 đánh dấu hoàn thành (in_progress -> completed)."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="completed")
    updated = update_barber_appointment_status(appointment_id=1, payload=payload, db=db_session, current_user=current_user_b1)
    assert updated.status == "completed"


def test_barber_mark_no_show(db_session):
    """Barber 1 đánh dấu khách không đến (no_show)."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="no_show")
    updated = update_barber_appointment_status(appointment_id=2, payload=payload, db=db_session, current_user=current_user_b1)
    assert updated.status == "no_show"


def test_barber_cannot_modify_other_barber_appointment(db_session):
    """RÀNG BUỘC CỐT LÕI: Barber 1 cố tình thao tác trên lịch của Barber 2 bị chặn 403 Forbidden."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="confirmed")
    with pytest.raises(HTTPException) as exc_info:
        update_barber_appointment_status(appointment_id=99, payload=payload, db=db_session, current_user=current_user_b1)
    assert exc_info.value.status_code == 403
    assert "thợ cắt tóc khác" in exc_info.value.detail


def test_barber_cannot_modify_completed_appointment(db_session):
    """Lịch hẹn đã hoàn thành không thể đổi trạng thái tiếp (báo lỗi 400)."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="in_progress")
    with pytest.raises(HTTPException) as exc_info:
        update_barber_appointment_status(appointment_id=1, payload=payload, db=db_session, current_user=current_user_b1)
    assert exc_info.value.status_code == 400
    assert "đã hoàn thành" in exc_info.value.detail


def test_appointment_not_found(db_session):
    """Lịch hẹn không tồn tại trả về 404."""
    current_user_b1 = {"barber_id": 1, "user_id": 2, "role": "barber"}
    payload = BarberAppointmentStatusUpdate(status="confirmed")
    with pytest.raises(HTTPException) as exc_info:
        update_barber_appointment_status(appointment_id=99999, payload=payload, db=db_session, current_user=current_user_b1)
    assert exc_info.value.status_code == 404
