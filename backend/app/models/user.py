"""Model `user` – phụ trách: Đỗ Ngọc Dân. Thiết kế theo ERD trong docs/ERD.md."""
from app.core.database import Base  # noqa: F401

from sqlalchemy import Column, Integer, String, ForeignKey

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(100))
    email = Column(String(100), unique=True)
    phone = Column(String(20))
    role_id = Column(Integer, ForeignKey("roles.role_id"))