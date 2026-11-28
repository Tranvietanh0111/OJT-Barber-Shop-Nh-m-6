"""Kiểm thử API Barber Dashboard, Reviews và Auth Login (Task T06AF34)."""
import pytest
from datetime import datetime
from app.core.database import Base, SessionLocal, engine
from app.models.appointment import Appointment
from app.models.barber import Barber
from app.models.review import Review
from app.models.role import Role
from app.models.service import Service
from app.models.user import User
from app.routers.barber import get_barber_dashboard, get_barber_reviews
from app.routers.auth import login, LoginRequest


@pytest.fixture(scope="module")
def db_session():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    yield db
    db.close()


def test_barber_dashboard_api(db_session):
    """Barber lấy số liệu KPI Dashboard qua API."""
    user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = get_barber_dashboard(db=db_session, current_user=user)
    assert hasattr(res, "todayAppointments")
    assert hasattr(res, "weeklyCustomers")
    assert hasattr(res, "averageRating")
    assert hasattr(res, "upcomingAppointments")
    assert isinstance(res.weeklyCustomers, int)
    assert isinstance(res.averageRating, (int, float))


def test_barber_reviews_api(db_session):
    """Barber xem danh sách đánh giá từ khách hàng kèm phân bố sao."""
    user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = get_barber_reviews(star=None, sort_order="newest", db=db_session, current_user=user)
    assert res.total >= 0
    assert hasattr(res, "distribution")
    assert len(res.distribution) == 5  # 5, 4, 3, 2, 1 sao


def test_barber_reviews_filter_star(db_session):
    """Lọc đánh giá 5 sao."""
    user = {"barber_id": 1, "user_id": 2, "role": "barber"}
    res = get_barber_reviews(star=5, sort_order="newest", db=db_session, current_user=user)
    for item in res.items:
        assert item.rating == 5


def test_auth_login_barber(db_session):
    """Đăng nhập thành công với vai trò Barber."""
    req = LoginRequest(email="barber@example.com", password="123456")
    res = login(payload=req, db=db_session)
    assert res["access_token"] is not None
    assert res["user"]["role"] == "barber"
    assert res["user"]["barber_id"] == 1
