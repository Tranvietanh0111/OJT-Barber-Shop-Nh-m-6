"""4. API Thống kê doanh thu (Revenue Statistics API) – Phụ trách: Trần Văn Thắng."""
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, Query

from app.routers.admin_barbers import BARBERS_DB
from app.routers.admin_users import require_admin
from app.utils.response import success

router = APIRouter(tags=["Admin - 4. Thống kê doanh thu"])

REVENUE_CHARTS: Dict[str, List[Dict[str, Any]]] = {
    "7d": [
        {"label": "08/11", "revenue": 3250000, "orders": 16},
        {"label": "09/11", "revenue": 4100000, "orders": 20},
        {"label": "10/11", "revenue": 3680000, "orders": 18},
        {"label": "11/11", "revenue": 4520000, "orders": 22},
        {"label": "12/11", "revenue": 4890000, "orders": 24},
        {"label": "13/11", "revenue": 5950000, "orders": 28},
        {"label": "14/11", "revenue": 6420000, "orders": 31},
    ],
    "month": [
        {"label": "Tuần 1", "revenue": 22400000, "orders": 108},
        {"label": "Tuần 2", "revenue": 25800000, "orders": 124},
        {"label": "Tuần 3", "revenue": 24900000, "orders": 119},
        {"label": "Tuần 4", "revenue": 29300000, "orders": 141},
    ],
    "quarter": [
        {"label": "Tháng 09", "revenue": 86500000, "orders": 415},
        {"label": "Tháng 10", "revenue": 94200000, "orders": 452},
        {"label": "Tháng 11", "revenue": 102400000, "orders": 492},
    ],
    "year": [
        {"label": "Quý 1", "revenue": 245000000, "orders": 1180},
        {"label": "Quý 2", "revenue": 268000000, "orders": 1290},
        {"label": "Quý 3", "revenue": 289000000, "orders": 1395},
        {"label": "Quý 4", "revenue": 312000000, "orders": 1510},
    ],
}


def _calculate_revenue_payload(period: str = "month") -> Dict[str, Any]:
    period_key = period.lower() if period.lower() in REVENUE_CHARTS else "month"
    chart_data = REVENUE_CHARTS[period_key]
    total_revenue = sum(item["revenue"] for item in chart_data)
    total_orders = sum(item["orders"] for item in chart_data)
    average_order_value = round(total_revenue / total_orders) if total_orders else 0

    by_service = [
        {"category": "Combo VIP Đế Vương", "revenue": round(total_revenue * 0.36), "percent": 36},
        {"category": "Uốn & Nhuộm Thời Trang", "revenue": round(total_revenue * 0.34), "percent": 34},
        {"category": "Cắt & Tạo kiểu Thương Gia", "revenue": round(total_revenue * 0.21), "percent": 21},
        {"category": "Chăm sóc Râu & Da mặt", "revenue": round(total_revenue * 0.09), "percent": 9},
    ]

    by_barber = [
        {
            "barber_id": b["id"],
            "code": b["code"],
            "full_name": b["full_name"],
            "completed_orders": b["completed_orders"],
            "revenue": b["monthly_revenue"],
            "commission_rate": b["commission_rate"],
            "commission_amount": round(b["monthly_revenue"] * b["commission_rate"] / 100),
        }
        for b in BARBERS_DB
    ]

    by_payment_method = [
        {"method": "transfer", "label": "Chuyển khoản VietQR", "percent": 54, "revenue": round(total_revenue * 0.54)},
        {"method": "cash", "label": "Tiền mặt", "percent": 31, "revenue": round(total_revenue * 0.31)},
        {"method": "card", "label": "Thẻ ngân hàng / POS", "percent": 15, "revenue": round(total_revenue * 0.15)},
    ]

    return {
        "period": period_key,
        "kpis": {
            "total_revenue": total_revenue,
            "total_invoices": total_orders,
            "average_order_value": average_order_value,
            "growth_rate": 14.8,
            "estimated_profit": round(total_revenue * 0.42),
        },
        "chart_data": chart_data,
        "by_service": by_service,
        "by_barber": by_barber,
        "by_payment_method": by_payment_method,
    }


@router.get("/revenue")
def get_revenue_statistics(
    period: str = Query(default="month", description="Kỳ báo cáo: 7d | month | quarter | year"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """API thống kê doanh thu (Thẻ KPI, biểu đồ theo kỳ, theo dịch vụ, theo Barber và phương thức thanh toán)."""
    return success(
        data=_calculate_revenue_payload(period),
        message="Lấy thống kê doanh thu thành công",
    )


@router.get("/revenue/stats")
def get_revenue_statistics_alias(
    period: str = Query(default="month", description="Kỳ báo cáo: 7d | month | quarter | year"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Endpoint alias cho thống kê doanh thu chi tiết."""
    return success(
        data=_calculate_revenue_payload(period),
        message="Lấy thống kê doanh thu thành công",
    )
