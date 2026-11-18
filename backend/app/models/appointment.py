"""Model `appointment` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric

class Appointment(Base):
    __tablename__ = "appointments"

    appointment_id = Column(Integer, primary_key=True, index=True)

    customer_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    barber_id = Column(Integer, ForeignKey("barbers.barber_id"), nullable=False)
    service_id = Column(Integer, ForeignKey("services.service_id"), nullable=False)

    appointment_date = Column(DateTime, nullable=False)
    status = Column(String(20), default="PENDING")
    total_price = Column(Numeric(10, 2), nullable=False)