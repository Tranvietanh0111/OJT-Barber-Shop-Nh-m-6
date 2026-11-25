"""Model `barber` – phụ trách: Đỗ Ngọc Dân / Vũ Quốc Khánh. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401
from sqlalchemy import Column, ForeignKey, Integer, String, Text


class Barber(Base):
    __tablename__ = "barbers"

    barber_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), unique=True, nullable=True)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    experience = Column(Integer, default=0)
    status = Column(String(20), default="ACTIVE")
    bio = Column(Text, nullable=True)
    avatar = Column(String(255), nullable=True)
    specialties = Column(String(255), nullable=True)  # Chuỗi JSON hoặc phân tách bởi dấu phẩy
    service_ids = Column(String(255), nullable=True)  # Chuỗi các service_id, ví dụ: "1,2,5"
