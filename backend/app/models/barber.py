"""Model `barber` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401

from sqlalchemy import Column, Integer, String, ForeignKey

class Barber(Base):
    __tablename__ = "barbers"

    barber_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True)
    experience = Column(Integer, default=0)
    status = Column(String(20), default="ACTIVE")