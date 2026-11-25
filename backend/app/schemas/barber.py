"""Pydantic schemas cho `barber` – phụ trách: Vũ Quốc Khánh."""
from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


class BarberServiceSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    service_id: int
    name: str
    price: float
    duration: int


class BarberReviewSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    review_id: int
    customer_name: Optional[str] = "Khách hàng"
    rating: int = Field(..., ge=1, le=5)
    comment: Optional[str] = None
    created_at: Optional[datetime] = None


class BarberPublicOut(BaseModel):
    """Schema thông tin Barber công khai (phục vụ khách hàng xem danh sách & chi tiết)."""
    model_config = ConfigDict(from_attributes=True)

    barber_id: int
    full_name: str
    phone: Optional[str] = None
    experience: int = Field(0, description="Số năm kinh nghiệm")
    status: str = Field("ACTIVE", description="Trạng thái (ACTIVE, Sẵn sàng, Đang bận...)")
    bio: Optional[str] = None
    avatar: Optional[str] = None
    specialties: List[str] = Field(default_factory=list, description="Kỹ năng chuyên môn")
    rating: float = Field(5.0, description="Điểm đánh giá trung bình")
    reviews_count: int = Field(0, description="Số lượt đánh giá")
    completed_cuts: int = Field(0, description="Số lượt cắt hoàn thành")
    services: List[BarberServiceSummary] = Field(default_factory=list, description="Dịch vụ đảm nhận")
    reviews: Optional[List[BarberReviewSummary]] = Field(default=None, description="Đánh giá từ khách hàng")


class BarberListOut(BaseModel):
    """Schema danh sách Barber có phân trang."""
    items: List[BarberPublicOut]
    total: int
    page: int
    limit: int


class BarberProfileOut(BaseModel):
    """Schema hồ sơ cá nhân của Barber (dành cho Barber tự xem)."""
    model_config = ConfigDict(from_attributes=True)

    barber_id: int
    user_id: Optional[int] = None
    full_name: str
    phone: Optional[str] = None
    experience: int
    status: str
    bio: Optional[str] = None
    avatar: Optional[str] = None
    specialties: List[str] = Field(default_factory=list)
    service_ids: List[int] = Field(default_factory=list)
    services: List[BarberServiceSummary] = Field(default_factory=list)
    rating: float = 5.0
    reviews_count: int = 0
    completed_cuts: int = 0


class BarberProfileUpdate(BaseModel):
    """Schema cập nhật hồ sơ cá nhân của Barber."""
    full_name: Optional[str] = Field(None, min_length=2, max_length=100, description="Họ và tên")
    phone: Optional[str] = Field(None, min_length=8, max_length=20, description="Số điện thoại")
    bio: Optional[str] = Field(None, min_length=10, max_length=500, description="Giới thiệu bản thân")
    experience: Optional[int] = Field(None, ge=0, le=50, description="Số năm kinh nghiệm")
    specialties: Optional[List[str]] = Field(None, description="Danh sách kỹ năng chuyên môn")
    service_ids: Optional[List[int]] = Field(None, description="Danh sách ID dịch vụ đảm nhận")
    avatar: Optional[str] = Field(None, description="Đường dẫn ảnh đại diện")
    status: Optional[str] = Field(None, description="Trạng thái làm việc (ACTIVE, busy, off...)")
