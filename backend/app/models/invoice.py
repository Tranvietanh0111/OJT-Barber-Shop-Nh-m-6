"""Model `invoice` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from sqlalchemy import Column, Integer, Numeric, DateTime, ForeignKey, String, text
from app.core.database import Base

class Invoice(Base):
    __tablename__ = "invoices"

    invoice_id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.appointment_id"), unique=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    payment_method = Column(String(30))
    payment_status = Column(String(20), default="UNPAID")
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))