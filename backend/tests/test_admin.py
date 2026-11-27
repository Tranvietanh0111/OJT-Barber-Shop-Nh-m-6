"""Bộ unit/integration test toàn diện cho Admin Module – Phụ trách: Trần Văn Thắng.

Kiểm thử đầy đủ 5 nhóm API Admin và cơ chế phân quyền `require_admin`:
1. Phân quyền Admin (403 Forbidden cho customer/barber, 200/201 cho admin)
2. Quản lý người dùng (/api/v1/admin/users)
3. Quản lý Barber (/api/v1/admin/barbers)
4. Quản lý hóa đơn (/api/v1/admin/invoices)
5. Thống kê doanh thu (/api/v1/admin/revenue, /api/v1/admin/revenue/stats)
6. Quản lý lịch hẹn (/api/v1/admin/appointments)
"""
from copy import deepcopy

import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.routers import (
    admin_appointments,
    admin_barbers,
    admin_invoices,
    admin_users,
)

client = TestClient(app)

ADMIN_HEADERS = {"X-Role": "admin", "Authorization": "Bearer admin-token"}

_ORIG_USERS = deepcopy(admin_users.USERS_DB)
_ORIG_BARBERS = deepcopy(admin_barbers.BARBERS_DB)
_ORIG_INVOICES = deepcopy(admin_invoices.INVOICES_DB)
_ORIG_APPOINTMENTS = deepcopy(admin_appointments.APPOINTMENTS_DB)


@pytest.fixture(autouse=True)
def reset_admin_stores():
    """Khôi phục dữ liệu gốc trước mỗi test case để các test độc lập hoàn toàn."""
    admin_users.USERS_DB[:] = deepcopy(_ORIG_USERS)
    admin_barbers.BARBERS_DB[:] = deepcopy(_ORIG_BARBERS)
    admin_invoices.INVOICES_DB[:] = deepcopy(_ORIG_INVOICES)
    admin_appointments.APPOINTMENTS_DB[:] = deepcopy(_ORIG_APPOINTMENTS)
    yield


# ============================================================================
# 1. PHÂN QUYỀN ADMIN (RBAC)
# ============================================================================

@pytest.mark.parametrize(
    "headers",
    [
        {"X-Role": "customer"},
        {"X-Role": "barber"},
        {"Authorization": "Bearer customer-token"},
        {"Authorization": "Bearer barber-token"},
    ],
)
def test_admin_endpoints_reject_non_admin(headers):
    """Khách hàng hoặc Barber gọi API Admin phải nhận mã 403 Forbidden."""
    for path in (
        "/api/v1/admin/users",
        "/api/v1/admin/barbers",
        "/api/v1/admin/invoices",
        "/api/v1/admin/revenue",
        "/api/v1/admin/appointments",
    ):
        res = client.get(path, headers=headers)
        assert res.status_code == 403


# ============================================================================
# 2. QUẢN LÝ NGƯỜI DÙNG (/api/v1/admin/users)
# ============================================================================

def test_users_list_and_filters():
    res = client.get("/api/v1/admin/users", headers=ADMIN_HEADERS)
    assert res.status_code == 200
    body = res.json()
    assert body["success"] is True
    assert body["data"]["total"] == len(_ORIG_USERS)
    assert body["data"]["summary"]["admins"] >= 1

    filtered = client.get(
        "/api/v1/admin/users",
        params={"role": "customer", "status": "locked"},
        headers=ADMIN_HEADERS,
    )
    assert filtered.status_code == 200
    items = filtered.json()["data"]["items"]
    assert len(items) == 1
    assert items[0]["status"] == "locked"
    assert items[0]["role"] == "customer"


def test_users_crud_lifecycle():
    # Create
    create_res = client.post(
        "/api/v1/admin/users",
        json={
            "full_name": "Nguyễn Minh Khôi",
            "email": "minhkhoi@barberhub.vn",
            "phone": "0909888777",
            "role": "customer",
            "status": "active",
        },
        headers=ADMIN_HEADERS,
    )
    assert create_res.status_code == 201
    created = create_res.json()["data"]
    user_id = created["id"]
    assert created["code"].startswith("USR-")

    # Detail
    detail_res = client.get(f"/api/v1/admin/users/{user_id}", headers=ADMIN_HEADERS)
    assert detail_res.status_code == 200
    assert detail_res.json()["data"]["email"] == "minhkhoi@barberhub.vn"

    # Update
    update_res = client.put(
        f"/api/v1/admin/users/{user_id}",
        json={"full_name": "Nguyễn Minh Khôi Updated", "role": "barber"},
        headers=ADMIN_HEADERS,
    )
    assert update_res.status_code == 200
    assert update_res.json()["data"]["full_name"] == "Nguyễn Minh Khôi Updated"
    assert update_res.json()["data"]["role"] == "barber"

    # Patch role & status
    role_res = client.patch(
        f"/api/v1/admin/users/{user_id}/role",
        json={"role": "customer"},
        headers=ADMIN_HEADERS,
    )
    assert role_res.status_code == 200
    assert role_res.json()["data"]["role"] == "customer"

    lock_res = client.patch(
        f"/api/v1/admin/users/{user_id}/status",
        json={"status": "locked"},
        headers=ADMIN_HEADERS,
    )
    assert lock_res.status_code == 200
    assert lock_res.json()["data"]["status"] == "locked"

    # Delete
    del_res = client.delete(f"/api/v1/admin/users/{user_id}", headers=ADMIN_HEADERS)
    assert del_res.status_code == 200
    assert client.get(f"/api/v1/admin/users/{user_id}", headers=ADMIN_HEADERS).status_code == 404


def test_users_validation_and_self_protection():
    # Trùng email
    dup_email = client.post(
        "/api/v1/admin/users",
        json={
            "full_name": "Trùng Email",
            "email": "giahuy@gmail.com",
            "phone": "0999000111",
            "role": "customer",
        },
        headers=ADMIN_HEADERS,
    )
    assert dup_email.status_code == 400

    # Trùng SĐT
    dup_phone = client.post(
        "/api/v1/admin/users",
        json={
            "full_name": "Trùng SĐT",
            "email": "unique@gmail.com",
            "phone": "0987654321",
            "role": "customer",
        },
        headers=ADMIN_HEADERS,
    )
    assert dup_phone.status_code == 400

    # Không cho tự khóa hoặc tự xóa Admin đang đăng nhập (ID=1)
    assert (
        client.patch(
            "/api/v1/admin/users/1/status",
            json={"status": "locked"},
            headers=ADMIN_HEADERS,
        ).status_code
        == 400
    )
    assert client.delete("/api/v1/admin/users/1", headers=ADMIN_HEADERS).status_code == 400


# ============================================================================
# 3. QUẢN LÝ BARBER (/api/v1/admin/barbers)
# ============================================================================

def test_barbers_crud_and_validation():
    # List + search
    list_res = client.get("/api/v1/admin/barbers", params={"search": "Nam"}, headers=ADMIN_HEADERS)
    assert list_res.status_code == 200
    assert list_res.json()["data"]["total"] >= 1

    # Create
    create_res = client.post(
        "/api/v1/admin/barbers",
        json={
            "full_name": "Đỗ Tuấn Kiệt",
            "phone": "0966112233",
            "specialty": "Crop & Texture Fade",
            "experience_years": 4,
            "shift": "09:00 - 18:00",
            "commission_rate": 36,
            "status": "available",
        },
        headers=ADMIN_HEADERS,
    )
    assert create_res.status_code == 201
    barber_id = create_res.json()["data"]["id"]

    # Duplicate phone -> 400
    dup_res = client.post(
        "/api/v1/admin/barbers",
        json={
            "full_name": "Barber Trùng SĐT",
            "phone": "0966112233",
            "specialty": "Fade",
        },
        headers=ADMIN_HEADERS,
    )
    assert dup_res.status_code == 400

    # Update
    upd_res = client.put(
        f"/api/v1/admin/barbers/{barber_id}",
        json={"experience_years": 6, "commission_rate": 42},
        headers=ADMIN_HEADERS,
    )
    assert upd_res.status_code == 200
    assert upd_res.json()["data"]["experience_years"] == 6
    assert upd_res.json()["data"]["commission_rate"] == 42

    # Patch status
    st_res = client.patch(
        f"/api/v1/admin/barbers/{barber_id}/status",
        json={"status": "busy"},
        headers=ADMIN_HEADERS,
    )
    assert st_res.status_code == 200
    assert st_res.json()["data"]["status"] == "busy"

    # Delete + verify 404
    assert client.delete(f"/api/v1/admin/barbers/{barber_id}", headers=ADMIN_HEADERS).status_code == 200
    assert client.get(f"/api/v1/admin/barbers/{barber_id}", headers=ADMIN_HEADERS).status_code == 404


# ============================================================================
# 4. QUẢN LÝ HÓA ĐƠN (/api/v1/admin/invoices)
# ============================================================================

def test_invoices_crud_and_total_calculation():
    # List + filter
    list_res = client.get("/api/v1/admin/invoices", params={"status": "paid"}, headers=ADMIN_HEADERS)
    assert list_res.status_code == 200
    assert all(i["payment_status"] == "paid" for i in list_res.json()["data"]["items"])

    # Create (tự động tính subtotal = 2*120000 + 1*80000 = 320000; total = 320000 - 20000 = 300000)
    create_res = client.post(
        "/api/v1/admin/invoices",
        json={
            "appointment_code": "BK-2026-200",
            "customer_name": "Trần Minh Đức",
            "customer_phone": "0911223344",
            "barber_name": "Nguyễn Hoàng Nam",
            "items": [
                {"service_name": "Cắt Tóc Thương Gia", "quantity": 2, "unit_price": 120000},
                {"service_name": "Cạo Râu Khăn Nóng", "quantity": 1, "unit_price": 80000},
            ],
            "discount": 20000,
            "payment_method": "transfer",
            "payment_status": "unpaid",
            "notes": "Khách hẹn thanh toán quầy",
        },
        headers=ADMIN_HEADERS,
    )
    assert create_res.status_code == 201
    inv = create_res.json()["data"]
    assert inv["subtotal"] == 320000
    assert inv["total"] == 300000

    # Patch payment status -> paid
    patch_res = client.patch(
        f"/api/v1/admin/invoices/{inv['id']}/status",
        json={"payment_status": "paid", "payment_method": "card", "notes": "Đã quẹt thẻ"},
        headers=ADMIN_HEADERS,
    )
    assert patch_res.status_code == 200
    assert patch_res.json()["data"]["payment_status"] == "paid"
    assert patch_res.json()["data"]["payment_method"] == "card"

    # Delete + verify 404
    assert client.delete(f"/api/v1/admin/invoices/{inv['id']}", headers=ADMIN_HEADERS).status_code == 200
    assert client.get(f"/api/v1/admin/invoices/{inv['id']}", headers=ADMIN_HEADERS).status_code == 404


# ============================================================================
# 5. THỐNG KÊ DOANH THU (/api/v1/admin/revenue)
# ============================================================================

@pytest.mark.parametrize("period", ["7d", "month", "quarter", "year"])
def test_revenue_statistics_all_periods(period):
    res = client.get("/api/v1/admin/revenue", params={"period": period}, headers=ADMIN_HEADERS)
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["period"] == period
    assert data["kpis"]["total_revenue"] > 0
    assert data["kpis"]["total_invoices"] > 0
    assert len(data["chart_data"]) > 0
    assert sum(s["percent"] for s in data["by_service"]) == 100
    assert sum(p["percent"] for p in data["by_payment_method"]) == 100
    assert len(data["by_barber"]) == len(_ORIG_BARBERS)


def test_revenue_stats_alias():
    res = client.get("/api/v1/admin/revenue/stats", params={"period": "month"}, headers=ADMIN_HEADERS)
    assert res.status_code == 200
    assert res.json()["data"]["period"] == "month"


# ============================================================================
# 6. QUẢN LÝ LỊCH HẸN (/api/v1/admin/appointments)
# ============================================================================

def test_appointments_crud_and_conflict():
    # List
    list_res = client.get("/api/v1/admin/appointments", headers=ADMIN_HEADERS)
    assert list_res.status_code == 200
    assert list_res.json()["data"]["total"] == len(_ORIG_APPOINTMENTS)

    # Create
    create_res = client.post(
        "/api/v1/admin/appointments",
        json={
            "customer_name": "Phạm Hoàng Long",
            "customer_phone": "0933445566",
            "barber_name": "Nguyễn Hoàng Nam",
            "service_name": "Combo Đế Vương 7 Bước",
            "date": "2026-11-28",
            "time": "15:00",
            "price": 220000,
            "status": "pending",
        },
        headers=ADMIN_HEADERS,
    )
    assert create_res.status_code == 201
    app_id = create_res.json()["data"]["id"]

    # Trùng khung giờ cùng Barber -> 400
    conflict_res = client.post(
        "/api/v1/admin/appointments",
        json={
            "customer_name": "Khách Trùng Giờ",
            "customer_phone": "0944556677",
            "barber_name": "Nguyễn Hoàng Nam",
            "service_name": "Cắt Tóc Thương Gia",
            "date": "2026-11-28",
            "time": "15:00",
            "price": 120000,
        },
        headers=ADMIN_HEADERS,
    )
    assert conflict_res.status_code == 400

    # Update & Patch status
    upd_res = client.put(
        f"/api/v1/admin/appointments/{app_id}",
        json={"time": "16:00", "notes": "Đổi sang 16h"},
        headers=ADMIN_HEADERS,
    )
    assert upd_res.status_code == 200
    assert upd_res.json()["data"]["time"] == "16:00"

    patch_res = client.patch(
        f"/api/v1/admin/appointments/{app_id}/status",
        json={"status": "confirmed"},
        headers=ADMIN_HEADERS,
    )
    assert patch_res.status_code == 200
    assert patch_res.json()["data"]["status"] == "confirmed"

    # Delete + verify 404
    assert client.delete(f"/api/v1/admin/appointments/{app_id}", headers=ADMIN_HEADERS).status_code == 200
    assert client.get(f"/api/v1/admin/appointments/{app_id}", headers=ADMIN_HEADERS).status_code == 404
