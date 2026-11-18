"""Model `service` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401

from sqlalchemy import Column, Integer, String, Text, Numeric

class Service(Base):
    __tablename__ = "services"

    service_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Numeric(10, 2), nullable=False)
    duration = Column(Integer, nullable=False)