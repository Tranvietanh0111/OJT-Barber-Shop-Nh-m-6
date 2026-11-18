"""Model `review` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from sqlalchemy import Column, Integer, Text, ForeignKey, DateTime, text
from app.core.database import Base

class Review(Base):
    __tablename__ = "reviews"

    review_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    barber_id = Column(Integer, ForeignKey("barbers.barber_id"), nullable=False)
    appointment_id = Column(Integer, ForeignKey("appointments.appointment_id"), unique=True, nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text)
    created_at = Column(DateTime, server_default=text("CURRENT_TIMESTAMP"))