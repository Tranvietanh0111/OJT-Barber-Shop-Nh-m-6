"""Pydantic schemas cho `barber` – phụ trách: Vũ Quốc Khánh."""
from datetime import datetime
from typing import List, Literal, Optional

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


# ============================================================================
# SCHEMAS LỊCH HẸN DÀNH CHO BARBER (TASK T06AF14)
# ============================================================================

class BarberAppointmentOut(BaseModel):
    """Chi tiết một lịch hẹn được phân công cho Barber."""
    model_config = ConfigDict(from_attributes=True)

    appointment_id: int
    barber_id: int
    customer_id: int
    customer_name: str
    customer_phone: Optional[str] = None
    service_id: int
    service_name: str
    service_price: float
    service_duration: int
    appointment_date: datetime
    date: str = Field(..., description="Ngày hẹn (YYYY-MM-DD)")
    time: str = Field(..., description="Giờ hẹn (HH:MM)")
    status: str = Field(..., description="pending | confirmed | in_progress | completed | no_show | cancelled")
    note: Optional[str] = None
    total_price: float


class BarberAppointmentListOut(BaseModel):
    """Danh sách lịch hẹn phân trang của Barber kèm số liệu tổng hợp."""
    items: List[BarberAppointmentOut]
    total: int
    page: int
    limit: int
    pending_count: int = 0
    confirmed_count: int = 0
    in_progress_count: int = 0
    completed_count: int = 0
    no_show_count: int = 0


class BarberAppointmentStatusUpdate(BaseModel):
    """Schema Barber đánh dấu cập nhật trạng thái lịch hẹn."""
    status: Literal["confirmed", "in_progress", "completed", "no_show", "rejected"] = Field(
        ...,
        description=(
            "Trạng thái cập nhật: \n"
            "- confirmed: Barber xác nhận lịch hẹn\n"
            "- in_progress: Bắt đầu phục vụ (đang cắt)\n"
            "- completed: Hoàn thành phục vụ\n"
            "- no_show: Khách không đến\n"
            "- rejected: Barber từ chối lịch"
        ),
    )


# ============================================================================
# SCHEMAS DASHBOARD VÀ REVIEWS DÀNH CHO BARBER (TASK T06AF34)
# ============================================================================

class BarberDashboardAppointment(BaseModel):
    id: int
    time: str
    customer: str
    service: str
    status: str = "confirmed"
    date: Optional[str] = None


class BarberDashboardOut(BaseModel):
    todayAppointments: List[BarberDashboardAppointment] = Field(default_factory=list)
    weeklyCustomers: int = 0
    averageRating: float = 5.0
    upcomingAppointments: List[BarberDashboardAppointment] = Field(default_factory=list)


class BarberReviewItem(BaseModel):
    id: int
    customer: str
    service: str
    rating: int
    date: str
    comment: Optional[str] = None


class BarberReviewStarCount(BaseModel):
    star: int
    count: int


class BarberReviewsOut(BaseModel):
    items: List[BarberReviewItem] = Field(default_factory=list)
    total: int = 0
    average: float = 5.0
    distribution: List[BarberReviewStarCount] = Field(default_factory=list)
