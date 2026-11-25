"""Pydantic schemas cho `service` – phụ trách: Vũ Quốc Khánh."""
from decimal import Decimal
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


class ServiceCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Tên dịch vụ")
    description: Optional[str] = Field(None, description="Mô tả chi tiết dịch vụ")
    price: Decimal = Field(..., gt=0, max_digits=10, decimal_places=2, description="Giá dịch vụ (VNĐ)")
    duration: int = Field(..., gt=0, description="Thời lượng thực hiện (phút)")


class ServiceUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100, description="Tên dịch vụ mới")
    description: Optional[str] = Field(None, description="Mô tả chi tiết")
    price: Optional[Decimal] = Field(None, gt=0, max_digits=10, decimal_places=2, description="Giá dịch vụ (VNĐ)")
    duration: Optional[int] = Field(None, gt=0, description="Thời lượng thực hiện (phút)")
    is_active: Optional[bool] = Field(None, description="Trạng thái hiển thị (True: hiển thị, False: ẩn)")


class ServiceStatusUpdate(BaseModel):
    is_active: bool = Field(..., description="Trạng thái hiển thị (True: hiển thị, False: ẩn)")


class ServiceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    service_id: int
    name: str
    description: Optional[str] = None
    price: float
    duration: int
    is_active: bool


class ServiceListOut(BaseModel):
    items: List[ServiceOut]
    total: int
    page: int
    limit: int
