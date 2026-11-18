"""Model `schedule` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401

from sqlalchemy import Column, Integer, Time, Boolean, ForeignKey, Date

class Schedule(Base):
    __tablename__ = "schedules"

    schedule_id = Column(Integer, primary_key=True, index=True)

    barber_id = Column(Integer, ForeignKey("barbers.barber_id"), nullable=False)

    work_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)

    is_available = Column(Boolean, default=True)