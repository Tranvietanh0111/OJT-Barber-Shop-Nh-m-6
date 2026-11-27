"""Router tổng hợp phân hệ `admin` – Phụ trách: Trần Văn Thắng.

Đã được tách thành 5 file riêng biệt cho từng chức năng để dễ đọc và quản lý:
1. `admin_users.py`        : API Quản lý người dùng (/api/v1/admin/users)
2. `admin_barbers.py`      : API Quản lý Barber (/api/v1/admin/barbers)
3. `admin_invoices.py`     : API Quản lý hóa đơn (/api/v1/admin/invoices)
4. `admin_revenue.py`      : API Thống kê doanh thu (/api/v1/admin/revenue)
5. `admin_appointments.py` : API Quản lý lịch hẹn (/api/v1/admin/appointments)
"""
from fastapi import APIRouter

from app.routers import (
    admin_appointments,
    admin_barbers,
    admin_invoices,
    admin_revenue,
    admin_users,
)

router = APIRouter(prefix="/admin")

router.include_router(admin_users.router)
router.include_router(admin_barbers.router)
router.include_router(admin_invoices.router)
router.include_router(admin_revenue.router)
router.include_router(admin_appointments.router)
