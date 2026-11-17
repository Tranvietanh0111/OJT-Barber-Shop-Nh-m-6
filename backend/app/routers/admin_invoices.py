"""3. API Quản lý hóa đơn (Invoice Management API) – Phụ trách: Trần Văn Thắng."""
from copy import deepcopy
from datetime import datetime
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field

from app.routers.admin_users import require_admin
from app.utils.response import error, success

router = APIRouter(tags=["Admin - 3. Quản lý hóa đơn"])

VALID_PAYMENT_STATUSES = {"paid", "unpaid", "refunded"}
VALID_PAYMENT_METHODS = {"cash", "transfer", "card"}


# ============================================================================
# SCHEMAS DỮ LIỆU HÓA ĐƠN
# ============================================================================

class InvoiceItemPayload(BaseModel):
    service_name: str = Field(..., description="Tên dịch vụ hoặc sản phẩm")
    quantity: int = Field(default=1, ge=1, description="Số lượng")
    unit_price: int = Field(..., ge=0, description="Đơn giá (VNĐ)")


class InvoiceCreateRequest(BaseModel):
    appointment_code: str = Field(default="BK-2026-105", description="Mã lịch hẹn liên kết")
    customer_name: str = Field(..., min_length=2, description="Tên khách hàng")
    customer_phone: str = Field(..., min_length=8, description="Số điện thoại khách hàng")
    barber_name: str = Field(..., description="Tên Barber thực hiện")
    items: List[InvoiceItemPayload] = Field(..., min_length=1, description="Danh sách dịch vụ sử dụng")
    discount: int = Field(default=0, ge=0, description="Số tiền giảm giá (VNĐ)")
    payment_method: str = Field(default="transfer", description="cash | transfer | card")
    payment_status: str = Field(default="paid", description="paid | unpaid | refunded")
    notes: Optional[str] = Field(default="")


class InvoiceStatusPatchRequest(BaseModel):
    payment_status: str = Field(..., description="paid | unpaid | refunded")
    payment_method: Optional[str] = Field(default=None, description="cash | transfer | card")
    notes: Optional[str] = None


# ============================================================================
# DỮ LIỆU HÓA ĐƠN MẪU
# ============================================================================

INVOICES_DB: List[Dict[str, Any]] = [
    {
        "id": 1,
        "invoice_code": "INV-2026-001",
        "appointment_code": "BK-2026-101",
        "customer_name": "Hoàng Gia Huy",
        "customer_phone": "0987654321",
        "barber_name": "Nguyễn Hoàng Nam",
        "created_at": "2026-11-14 10:25",
        "date": "2026-11-14",
        "payment_method": "transfer",
        "payment_status": "paid",
        "subtotal": 270000,
        "discount": 20000,
        "total": 250000,
        "notes": "Thanh toán chuyển khoản VietQR",
        "items": [
            {"service_name": "Combo Đế Vương 7 Bước", "quantity": 1, "unit_price": 220000},
            {"service_name": "Sáp vuốt tóc Volcanic Clay", "quantity": 1, "unit_price": 50000},
        ],
    },
    {
        "id": 2,
        "invoice_code": "INV-2026-002",
        "appointment_code": "BK-2026-102",
        "customer_name": "Đặng Quang Vinh",
        "customer_phone": "0978123456",
        "barber_name": "Lê Minh Tuấn",
        "created_at": "2026-11-14 12:10",
        "date": "2026-11-14",
        "payment_method": "card",
        "payment_status": "paid",
        "subtotal": 500000,
        "discount": 50000,
        "total": 450000,
        "notes": "Giảm 50.000đ ưu đãi combo Uốn + Cắt",
        "items": [
            {"service_name": "Uốn Định Hình Hàn Quốc", "quantity": 1, "unit_price": 380000},
            {"service_name": "Cắt Tóc Thương Gia", "quantity": 1, "unit_price": 120000},
        ],
    },
    {
        "id": 3,
        "invoice_code": "INV-2026-003",
        "appointment_code": "BK-2026-103",
        "customer_name": "Vũ Đình Khoa",
        "customer_phone": "0965432109",
        "barber_name": "Phạm Quốc Bảo",
        "created_at": "2026-11-14 14:45",
        "date": "2026-11-14",
        "payment_method": "cash",
        "payment_status": "unpaid",
        "subtotal": 200000,
        "discount": 0,
        "total": 200000,
        "notes": "Khách chờ thanh toán tại quầy",
        "items": [
            {"service_name": "Cắt Tóc Thương Gia", "quantity": 1, "unit_price": 120000},
            {"service_name": "Cạo Râu Khăn Nóng", "quantity": 1, "unit_price": 80000},
        ],
    },
    {
        "id": 4,
        "invoice_code": "INV-2026-004",
        "appointment_code": "BK-2026-092",
        "customer_name": "Lương Thế Thành",
        "customer_phone": "0918273645",
        "barber_name": "Nguyễn Hoàng Nam",
        "created_at": "2026-11-12 19:05",
        "date": "2026-11-12",
        "payment_method": "transfer",
        "payment_status": "refunded",
        "subtotal": 380000,
        "discount": 0,
        "total": 380000,
        "notes": "Hoàn tiền cọc do khách dời lịch",
        "items": [
            {"service_name": "Uốn Định Hình Hàn Quốc", "quantity": 1, "unit_price": 380000},
        ],
    },
]


# ============================================================================
# CÁC ENDPOINT QUẢN LÝ HÓA ĐƠN (/api/v1/admin/invoices)
# ============================================================================

@router.get("/invoices")
def list_invoices(
    search: Optional[str] = Query(default=None, description="Tìm theo mã HĐ, mã lịch hẹn, tên khách hàng, SĐT"),
    payment_status: Optional[str] = Query(default=None, alias="status", description="paid | unpaid | refunded"),
    payment_method: Optional[str] = Query(default=None, description="cash | transfer | card"),
    date: Optional[str] = Query(default=None, description="Lọc theo ngày tạo (YYYY-MM-DD)"),
    _: Dict[str, Any] = Depends(require_admin),
):
    """Lấy danh sách hóa đơn kèm bộ lọc và tổng hợp doanh thu hóa đơn."""
    items = deepcopy(INVOICES_DB)

    if search:
        kw = search.strip().lower()
        items = [
            inv for inv in items
            if kw in inv["invoice_code"].lower()
            or kw in inv["appointment_code"].lower()
            or kw in inv["customer_name"].lower()
            or kw in inv["customer_phone"].lower()
            or kw in inv["barber_name"].lower()
        ]

    if payment_status and payment_status.lower() != "all":
        items = [inv for inv in items if inv["payment_status"] == payment_status.lower()]

    if payment_method and payment_method.lower() != "all":
        items = [inv for inv in items if inv["payment_method"] == payment_method.lower()]

    if date:
        items = [inv for inv in items if inv["date"] == date]

    summary = {
        "total_invoices": len(INVOICES_DB),
        "paid_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "paid"),
        "unpaid_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "unpaid"),
        "refunded_amount": sum(i["total"] for i in INVOICES_DB if i["payment_status"] == "refunded"),
    }

    return success(
        data={"items": items, "total": len(items), "summary": summary},
        message="Lấy danh sách hóa đơn thành công",
    )


@router.get("/invoices/{invoice_id}")
def get_invoice_detail(invoice_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xem chi tiết một hóa đơn (bao gồm danh sách dịch vụ chi tiết)."""
    for inv in INVOICES_DB:
        if inv["id"] == invoice_id:
            return success(data=inv, message="Lấy chi tiết hóa đơn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )


@router.post("/invoices", status_code=status.HTTP_201_CREATED)
def create_invoice(payload: InvoiceCreateRequest, _: Dict[str, Any] = Depends(require_admin)):
    """Tạo hóa đơn thanh toán mới."""
    p_status = payload.payment_status.strip().lower()
    if p_status not in VALID_PAYMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_STATUS", "Trạng thái thanh toán chỉ nhận: paid, unpaid, refunded."),
        )

    p_method = payload.payment_method.strip().lower()
    if p_method not in VALID_PAYMENT_METHODS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_METHOD", "Phương thức thanh toán chỉ nhận: cash, transfer, card."),
        )

    items_data = [item.model_dump() for item in payload.items]
    subtotal = sum(i["quantity"] * i["unit_price"] for i in items_data)
    total = max(0, subtotal - payload.discount)
    next_id = max((inv["id"] for inv in INVOICES_DB), default=0) + 1
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M")

    new_invoice = {
        "id": next_id,
        "invoice_code": f"INV-2026-{next_id:03d}",
        "appointment_code": payload.appointment_code,
        "customer_name": payload.customer_name.strip(),
        "customer_phone": payload.customer_phone.strip(),
        "barber_name": payload.barber_name.strip(),
        "created_at": now_str,
        "date": now_str.split(" ")[0],
        "payment_method": p_method,
        "payment_status": p_status,
        "subtotal": subtotal,
        "discount": payload.discount,
        "total": total,
        "notes": payload.notes or "",
        "items": items_data,
    }
    INVOICES_DB.append(new_invoice)
    return success(data=new_invoice, message="Tạo hóa đơn mới thành công")


@router.patch("/invoices/{invoice_id}/status")
def update_invoice_status(
    invoice_id: int,
    payload: InvoiceStatusPatchRequest,
    _: Dict[str, Any] = Depends(require_admin),
):
    """Cập nhật trạng thái thanh toán của hóa đơn."""
    p_status = payload.payment_status.strip().lower()
    if p_status not in VALID_PAYMENT_STATUSES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error("INVALID_PAYMENT_STATUS", "Trạng thái thanh toán chỉ nhận: paid, unpaid, refunded."),
        )

    for inv in INVOICES_DB:
        if inv["id"] == invoice_id:
            inv["payment_status"] = p_status
            if payload.payment_method:
                method = payload.payment_method.strip().lower()
                if method not in VALID_PAYMENT_METHODS:
                    raise HTTPException(
                        status_code=status.HTTP_400_BAD_REQUEST,
                        detail=error("INVALID_PAYMENT_METHOD", "Phương thức thanh toán không hợp lệ."),
                    )
                inv["payment_method"] = method
            if payload.notes is not None:
                inv["notes"] = payload.notes
            return success(data=inv, message="Cập nhật trạng thái hóa đơn thành công")

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )


@router.delete("/invoices/{invoice_id}")
def delete_invoice(invoice_id: int, _: Dict[str, Any] = Depends(require_admin)):
    """Xóa hóa đơn theo ID."""
    for idx, inv in enumerate(INVOICES_DB):
        if inv["id"] == invoice_id:
            deleted = INVOICES_DB.pop(idx)
            return success(data=deleted, message="Xóa hóa đơn thành công")
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=error("INVOICE_NOT_FOUND", f"Không tìm thấy hóa đơn có ID={invoice_id}"),
    )
