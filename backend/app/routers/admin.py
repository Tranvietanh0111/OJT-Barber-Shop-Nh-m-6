"""Router `admin` – phụ trách: Trần Văn Thắng.

Cung cấp hệ thống API Quản trị Salon (Admin Module):
1. Quản lý Người dùng (Khách hàng Hội viên CRM & Tài khoản Nhân sự / Phân quyền)
2. Quản lý Đội ngũ Barber (Hồ sơ thợ, Trạng thái ca trực, Phân ghế, Hoa hồng & Bảng lương)
3. Quản lý Tổng quan Salon, Lịch hẹn, Ghế cắt, Dịch vụ, Tồn kho, Hóa đơn POS & Cấu hình
"""
from datetime import datetime
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, HTTPException, Query, status
from pydantic import BaseModel, Field

router = APIRouter(prefix="/admin", tags=["admin"])


def api_success(data: Any = None, message: str = "Thành công", **extra: Any) -> Dict[str, Any]:
    """Chuẩn hóa dữ liệu trả về theo docs/API_CONVENTIONS.md đồng thời giữ tương thích ngược."""
    res: Dict[str, Any] = {
        "success": True,
        "message": message,
        "data": data,
    }
    res.update(extra)
    return res


def api_error(code: str, message: str, status_code: int = 400) -> HTTPException:
    """Chuẩn hóa lỗi trả về theo docs/API_CONVENTIONS.md."""
    return HTTPException(
        status_code=status_code,
        detail={
            "success": False,
            "error": {
                "code": code,
                "message": message,
            },
            "message": message,
        },
    )


# ===========================================================================
# 1. CƠ SỞ DỮ LIỆU TRÊN BỘ NHỚ (IN-MEMORY STORE CHO MODULE ADMIN)
# ===========================================================================

BARBERS_DB: List[Dict[str, Any]] = [
    {
        "id": "BB-01",
        "code": "#BB-01",
        "name": "Master Hoàng",
        "rank": "Master Barber",
        "role": "Master Barber • 8 năm KN",
        "specialty": "Classic Pompadour & Executive Cut",
        "exp": 8,
        "chair": "Ghế VIP 01",
        "chairId": 1,
        "phone": "0909.888.111",
        "email": "hoang.master@gentlemanbarber.vn",
        "shift": "Ca Full (09:00 - 21:00)",
        "status": "busy",
        "rating": 5.0,
        "reviews": 428,
        "todayClients": 11,
        "todayBookings": 9,
        "maxBookings": 10,
        "todayRevenue": 3450000,
        "monthRevenue": 68500000,
        "baseSalary": 12000000,
        "commissionRate": 35,
        "kpiBonus": 2500000,
        "skills": ["Pompadour", "Skin Fade", "Beard Sculpting", "VIP Styling"],
        "bio": "Bậc thầy tạo kiểu cổ điển Châu Âu, 8 năm kinh nghiệm dẫn dắt đội ngũ stylist.",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-02",
        "code": "#BB-02",
        "name": "Tuấn Fade",
        "rank": "Senior Stylist",
        "role": "Senior Barber • 5 năm KN",
        "specialty": "Razor Skin Fade & Tattoo Hair",
        "exp": 5,
        "chair": "Ghế Fade 02",
        "chairId": 2,
        "phone": "0988.777.222",
        "email": "tuan.fade@gentlemanbarber.vn",
        "shift": "Ca Sáng - Chiều (08:30 - 18:30)",
        "status": "busy",
        "rating": 4.9,
        "reviews": 315,
        "todayClients": 9,
        "todayBookings": 8,
        "maxBookings": 10,
        "todayRevenue": 2180000,
        "monthRevenue": 49800000,
        "baseSalary": 9000000,
        "commissionRate": 32,
        "kpiBonus": 1500000,
        "skills": ["Skin Fade", "Crop Texture", "Hair Tattoo", "Hot Towel Shave"],
        "bio": "Chuyên gia kỹ thuật Fade sát da và điêu khắc đường kẻ nghệ thuật.",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-03",
        "code": "#BB-03",
        "name": "Eric Vũ",
        "rank": "Creative Stylist",
        "role": "Color & Perm Master • 6 năm KN",
        "specialty": "Uốn Premlock & Nhuộm Balayage Nam",
        "exp": 6,
        "chair": "Ghế Styling 03",
        "chairId": 3,
        "phone": "0912.333.444",
        "email": "eric.vu@gentlemanbarber.vn",
        "shift": "Ca Full (09:00 - 21:00)",
        "status": "busy",
        "rating": 4.96,
        "reviews": 289,
        "todayClients": 7,
        "todayBookings": 7,
        "maxBookings": 8,
        "todayRevenue": 2680000,
        "monthRevenue": 54200000,
        "baseSalary": 9500000,
        "commissionRate": 30,
        "kpiBonus": 1800000,
        "skills": ["Premlock", "Uốn Con Sâu", "Tẩy Nhuộm Khói", "Korean Layer"],
        "bio": "Chuyên gia hóa chất uốn nhuộm Hàn Quốc và thiết kế form tóc hiện đại.",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-04",
        "code": "#BB-04",
        "name": "Thảo Spa",
        "rank": "Spa Specialist",
        "role": "Chuyên gia Gội Dưỡng Sinh & Ear Spa",
        "specialty": "Gội Dưỡng Sinh Hoàng Gia & Lấy Ráy Tai",
        "exp": 4,
        "chair": "Giường Spa 04",
        "chairId": 4,
        "phone": "0933.444.555",
        "email": "thao.spa@gentlemanbarber.vn",
        "shift": "Ca Hành Chính (09:00 - 19:00)",
        "status": "available",
        "rating": 5.0,
        "reviews": 362,
        "todayClients": 8,
        "todayBookings": 6,
        "maxBookings": 10,
        "todayRevenue": 1760000,
        "monthRevenue": 36400000,
        "baseSalary": 8000000,
        "commissionRate": 28,
        "kpiBonus": 1200000,
        "skills": ["Gội Dưỡng Sinh", "Ấn Huyệt Cổ Vai Gáy", "Ear Spa", "Đắp Mặt Nạ"],
        "bio": "Kỹ thuật viên trưởng bộ phận Spa thư giãn, trị liệu cổ vai gáy và chăm sóc da mặt.",
        "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-05",
        "code": "#BB-05",
        "name": "Dũng Scissor",
        "rank": "Senior Stylist",
        "role": "Senior Stylist • 4.5 năm KN",
        "specialty": "Side Part & Mullet Layer",
        "exp": 5,
        "chair": "Ghế 05",
        "chairId": 5,
        "phone": "0977.555.666",
        "email": "dung.scissor@gentlemanbarber.vn",
        "shift": "Ca Chiều - Tối (12:00 - 21:30)",
        "status": "busy",
        "rating": 4.85,
        "reviews": 198,
        "todayClients": 7,
        "todayBookings": 7,
        "maxBookings": 9,
        "todayRevenue": 1650000,
        "monthRevenue": 39500000,
        "baseSalary": 8500000,
        "commissionRate": 30,
        "kpiBonus": 1000000,
        "skills": ["Side Part", "Mullet", "Mohican", "Scissor Over Comb"],
        "bio": "Tay kéo tỉa layer chuẩn xác, chuyên trị các dòng tóc dày và khó vào nếp.",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-06",
        "code": "#BB-06",
        "name": "Trung Barber",
        "rank": "Senior Stylist",
        "role": "Classic & Beard Specialist • 5 năm KN",
        "specialty": "Slick Back & Nhuộm Phủ Bạc Thảo Dược",
        "exp": 5,
        "chair": "Ghế 07",
        "chairId": 7,
        "phone": "0966.112.233",
        "email": "trung.barber@gentlemanbarber.vn",
        "shift": "Ca Sáng - Chiều (08:30 - 18:00)",
        "status": "busy",
        "rating": 4.92,
        "reviews": 240,
        "todayClients": 6,
        "todayBookings": 6,
        "maxBookings": 9,
        "todayRevenue": 1520000,
        "monthRevenue": 41200000,
        "baseSalary": 8500000,
        "commissionRate": 30,
        "kpiBonus": 1000000,
        "skills": ["Slick Back", "Nhuộm Phủ Bạc", "Cạo Khăn Nóng", "Executive Contour"],
        "bio": "Phong cách lịch lãm, điềm đạm, được nhiều khách hàng doanh nhân trung niên yêu thích.",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-07",
        "code": "#BB-07",
        "name": "Lâm Stylist",
        "rank": "Junior Barber",
        "role": "Young Stylist • 2.5 năm KN",
        "specialty": "Undercut & French Crop",
        "exp": 3,
        "chair": "Ghế 06",
        "chairId": 6,
        "phone": "0944.889.900",
        "email": "lam.stylist@gentlemanbarber.vn",
        "shift": "Ca Chiều - Tối (13:00 - 21:30)",
        "status": "break",
        "rating": 4.78,
        "reviews": 112,
        "todayClients": 5,
        "todayBookings": 5,
        "maxBookings": 8,
        "todayRevenue": 980000,
        "monthRevenue": 26800000,
        "baseSalary": 7000000,
        "commissionRate": 25,
        "kpiBonus": 500000,
        "skills": ["French Crop", "Undercut", "Taper Fade"],
        "bio": "Stylist trẻ năng động, bắt kịp xu hướng tóc GenZ và thể thao.",
        "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    },
    {
        "id": "BB-08",
        "code": "#BB-08",
        "name": "Hải Phong",
        "rank": "Senior Stylist",
        "role": "Senior Barber • 4 năm KN",
        "specialty": "Buzz Cut & High Fade",
        "exp": 4,
        "chair": "Ghế 08",
        "chairId": 8,
        "phone": "0938.765.432",
        "email": "phong.hai@gentlemanbarber.vn",
        "shift": "Nghỉ phép hôm nay",
        "status": "off",
        "rating": 4.82,
        "reviews": 154,
        "todayClients": 0,
        "todayBookings": 0,
        "maxBookings": 8,
        "todayRevenue": 0,
        "monthRevenue": 31500000,
        "baseSalary": 8000000,
        "commissionRate": 28,
        "kpiBonus": 800000,
        "skills": ["Buzz Cut", "High Skin Fade", "Line Up"],
        "bio": "Chuyên trị các kiểu tóc ngắn quân đội sắc nét, gọn gàng.",
        "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    },
]

USERS_DB: List[Dict[str, Any]] = [
    {
        "id": "KH-8801",
        "name": "Nguyễn Anh Tuấn",
        "phone": "0988.412.889",
        "email": "tuan.nguyen@gmail.com",
        "tier": "VIP Diamond",
        "role": "customer",
        "points": 2450,
        "visits": 28,
        "totalSpent": 14850000,
        "lastVisit": "Hôm nay, 15:00",
        "favBarber": "Master Hoàng",
        "hairNote": "Pompadour cổ điển, fade sát 0.5mm hai bên, dùng sáp Reuzel Blue.",
        "status": "active",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "history": [
            {
                "date": "11/11/2026",
                "service": "Combo Đế Vương 7 Bước",
                "barber": "Master Hoàng",
                "amount": 350000,
            },
            {
                "date": "25/10/2026",
                "service": "Combo Đế Vương + Sáp Reuzel",
                "barber": "Master Hoàng",
                "amount": 770000,
            },
        ],
    },
    {
        "id": "KH-8802",
        "name": "Phan Mạnh Quỳnh",
        "phone": "0909.222.888",
        "email": "quynh.pm@music.vn",
        "tier": "VIP Diamond",
        "role": "customer",
        "points": 1980,
        "visits": 22,
        "totalSpent": 12300000,
        "lastVisit": "Hôm nay, 15:20",
        "favBarber": "Master Hoàng",
        "hairNote": "Side Part 7/3 rủ tự nhiên, da đầu nhạy cảm nên gội thảo dược ấm.",
        "status": "active",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        "history": [
            {
                "date": "11/11/2026",
                "service": "Combo Đế Vương 7 Bước",
                "barber": "Master Hoàng",
                "amount": 350000,
            },
        ],
    },
    {
        "id": "KH-8803",
        "name": "Lê Minh Khôi",
        "phone": "0903.551.902",
        "email": "khoi.le@techcorp.vn",
        "tier": "VIP Gold",
        "role": "customer",
        "points": 1120,
        "visits": 15,
        "totalSpent": 8450000,
        "lastVisit": "Hôm nay, 14:55",
        "favBarber": "Eric Vũ",
        "hairNote": "Thích uốn Premlock / Layer Hàn Quốc, hay mua thêm dưỡng tóc Moroccanoil.",
        "status": "active",
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        "history": [
            {
                "date": "11/11/2026",
                "service": "Cắt + Uốn Premlock Hàn Quốc",
                "barber": "Eric Vũ",
                "amount": 550000,
            },
        ],
    },
    {
        "id": "KH-8804",
        "name": "Trần Quốc Bảo",
        "phone": "0977.123.456",
        "email": "bao.tran@gmail.com",
        "tier": "VIP Gold",
        "role": "customer",
        "points": 940,
        "visits": 14,
        "totalSpent": 6120000,
        "lastVisit": "Hôm nay, 15:30",
        "favBarber": "Dũng Scissor",
        "hairNote": "Tóc bung chỉa hai bên mai, cần ép side nhẹ định kỳ 2 tháng/lần.",
        "status": "active",
        "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
        "history": [
            {
                "date": "11/11/2026",
                "service": "Combo Cắt + Gội Massage",
                "barber": "Dũng Scissor",
                "amount": 150000,
            },
        ],
    },
    {
        "id": "KH-8805",
        "name": "Hoàng Gia Bảo",
        "phone": "0912.678.334",
        "email": "giabao.hoang@outlook.com",
        "tier": "VIP Silver",
        "role": "customer",
        "points": 540,
        "visits": 9,
        "totalSpent": 3250000,
        "lastVisit": "Hôm nay, 15:10",
        "favBarber": "Tuấn Fade",
        "hairNote": "Skin Fade cao + kẻ vạch line bên thái dương trái.",
        "status": "active",
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
        "history": [
            {
                "date": "11/11/2026",
                "service": "Skin Fade + Cạo khăn nóng",
                "barber": "Tuấn Fade",
                "amount": 180000,
            },
        ],
    },
]

STAFF_DB: List[Dict[str, Any]] = [
    {
        "id": "ACC-01",
        "name": "Master Hoàng (Hoàng Văn Nam)",
        "username": "admin.hoang",
        "email": "hoang.master@royalbarber.vn",
        "phone": "0909.888.111",
        "role": "Super Admin",
        "systemRole": "admin",
        "branch": "Toàn hệ thống (2 Chi nhánh)",
        "lastLogin": "Đang trực tuyến (IP: 113.190.xx.xx)",
        "twoFA": True,
        "status": "active",
        "permissions": [
            "Toàn quyền hệ thống",
            "Báo cáo Lãi/Lỗ",
            "Cấu hình POS & VietQR",
            "Phân quyền Nhân sự",
        ],
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    },
    {
        "id": "ACC-02",
        "name": "Nguyễn Thu Trang",
        "username": "manager.trang",
        "email": "trang.nguyen@royalbarber.vn",
        "phone": "0915.666.888",
        "role": "Branch Manager",
        "systemRole": "admin",
        "branch": "CN 01: 88 Phố Cổ, Hoàn Kiếm",
        "lastLogin": "Hôm nay, 14:50",
        "twoFA": True,
        "status": "active",
        "permissions": [
            "Điều phối lịch hẹn",
            "Quản lý Kho Sáp",
            "Chấm công Barber",
            "Xử lý khiếu nại VIP",
        ],
        "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
    {
        "id": "ACC-03",
        "name": "Lê Ngọc Ánh",
        "username": "cashier.anh",
        "email": "anh.le@royalbarber.vn",
        "phone": "0982.345.678",
        "role": "Cashier",
        "systemRole": "admin",
        "branch": "CN 01: 88 Phố Cổ, Hoàn Kiếm",
        "lastLogin": "Đang trực tại Quầy POS #01",
        "twoFA": False,
        "status": "active",
        "permissions": [
            "Check-in khách vào ghế",
            "In hóa đơn K80",
            "Thu ngân VietQR",
            "Bán lẻ Sáp tại quầy",
        ],
        "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    },
    {
        "id": "ACC-04",
        "name": "Eric Vũ (Vũ Minh Đức)",
        "username": "barber.eric",
        "email": "eric.vu@royalbarber.vn",
        "phone": "0912.333.444",
        "role": "Barber",
        "systemRole": "barber",
        "branch": "CN 01: 88 Phố Cổ, Hoàn Kiếm",
        "lastLogin": "Hôm nay, 13:20 (Mobile App)",
        "twoFA": False,
        "status": "active",
        "permissions": [
            "Xem lịch hẹn cá nhân",
            "Xem hoa hồng trong ngày",
            "Ghi chú công thức tóc khách",
        ],
        "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    },
    {
        "id": "ACC-05",
        "name": "Trần Hải Đăng",
        "username": "cashier.dang",
        "email": "dang.tran@royalbarber.vn",
        "phone": "0944.556.778",
        "role": "Cashier",
        "systemRole": "admin",
        "branch": "CN 01: 88 Phố Cổ, Hoàn Kiếm",
        "lastLogin": "08/11/2026 (Ca tối)",
        "twoFA": False,
        "status": "locked",
        "permissions": ["Tạm khóa do nhân sự nghỉ phép dài hạn"],
        "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    },
]

STATIONS_DB: List[Dict[str, Any]] = [
    {
        "id": "01",
        "name": "Ghế VIP 01",
        "zone": "Khu Cắt Chính • Tầng 1",
        "type": "hair",
        "barber": "Master Hoàng",
        "barberRank": "Master Barber",
        "status": "busy",
        "customer": "Anh Tuấn Nguyễn",
        "customerTag": "VIP Diamond",
        "service": "Combo Đế Vương 7 Bước",
        "price": 350000,
        "progress": 72,
        "todayServed": 8,
        "todayRevenue": 2450000,
    },
    {
        "id": "02",
        "name": "Ghế Fade 02",
        "zone": "Khu Cắt Chính • Tầng 1",
        "type": "hair",
        "barber": "Tuấn Fade",
        "barberRank": "Senior Stylist",
        "status": "busy",
        "customer": "Hoàng Gia Bảo",
        "customerTag": "Khách quen",
        "service": "Skin Fade + Cạo khăn nóng",
        "price": 180000,
        "progress": 45,
        "todayServed": 7,
        "todayRevenue": 1580000,
    },
    {
        "id": "03",
        "name": "Ghế Styling 03",
        "zone": "Khu Hóa Chất • Tầng 1",
        "type": "hair",
        "barber": "Eric Vũ",
        "barberRank": "Creative Stylist",
        "status": "busy",
        "customer": "Lê Minh Khôi",
        "customerTag": "Member",
        "service": "Cắt + Uốn Premlock Hàn Quốc",
        "price": 550000,
        "progress": 85,
        "todayServed": 5,
        "todayRevenue": 2150000,
    },
    {
        "id": "04",
        "name": "Giường Spa 04",
        "zone": "Phòng Gội Dưỡng Sinh",
        "type": "spa",
        "barber": "Thảo Spa",
        "barberRank": "Gội & Ear Spa",
        "status": "available",
        "customer": "Sẵn sàng đón khách",
        "customerTag": "",
        "service": "Đã thay khăn mới & xông tinh dầu sả chanh",
        "price": 0,
        "progress": 0,
        "todayServed": 6,
        "todayRevenue": 1080000,
    },
]

APPOINTMENTS_DB: List[Dict[str, Any]] = [
    {
        "id": "BK-9021",
        "customer": "Nguyễn Anh Tuấn",
        "phone": "0988.412.889",
        "tag": "VIP Diamond",
        "service": "Combo Đế Vương 7 Bước",
        "barber": "Master Hoàng",
        "chair": "Ghế 01",
        "time": "15:00",
        "date": "Hôm nay",
        "price": 350000,
        "status": "in-progress",
    },
    {
        "id": "BK-9022",
        "customer": "Hoàng Gia Bảo",
        "phone": "0912.678.334",
        "tag": "Khách quen",
        "service": "Skin Fade + Cạo khăn nóng",
        "barber": "Tuấn Fade",
        "chair": "Ghế 02",
        "time": "15:10",
        "date": "Hôm nay",
        "price": 180000,
        "status": "in-progress",
    },
    {
        "id": "BK-9024",
        "customer": "Trần Quốc Bảo",
        "phone": "0977.123.456",
        "tag": "VIP Gold",
        "service": "Combo Cắt + Gội Massage",
        "barber": "Dũng Scissor",
        "chair": "Ghế 05",
        "time": "15:30",
        "date": "Hôm nay",
        "price": 150000,
        "status": "waiting",
    },
]

SERVICES_DB: List[Dict[str, Any]] = [
    {
        "id": "SV-01",
        "name": "Combo Đế Vương 7 Bước",
        "category": "combo",
        "price": 350000,
        "vipPrice": 299000,
        "duration": 45,
        "status": "active",
        "tag": "BEST SELLER",
        "soldMonth": 312,
    },
    {
        "id": "SV-02",
        "name": "Combo Quý Ông 5 Bước Tiêu Chuẩn",
        "category": "combo",
        "price": 200000,
        "vipPrice": 170000,
        "duration": 40,
        "status": "active",
        "tag": "BEST SELLER",
        "soldMonth": 285,
    },
]

INVENTORY_DB: List[Dict[str, Any]] = [
    {
        "sku": "SKU-PM01",
        "name": "Reuzel Blue Pomade Strong Hold (113g)",
        "brand": "Reuzel Holland",
        "category": "pomade",
        "costPrice": 280000,
        "sellPrice": 420000,
        "stock": 3,
        "minStock": 10,
    },
    {
        "sku": "SKU-PM02",
        "name": "Reuzel Extreme Hold Matte Pomade (Heo Xám)",
        "brand": "Reuzel Holland",
        "category": "pomade",
        "costPrice": 290000,
        "sellPrice": 430000,
        "stock": 22,
        "minStock": 8,
    },
]

INVOICES_DB: List[Dict[str, Any]] = [
    {
        "id": "INV-8830",
        "time": "15:22 • 11/11/2026",
        "customer": "Nguyễn Anh Tuấn",
        "barber": "Master Hoàng",
        "items": "Combo Đế Vương 7 Bước + 1x Sáp Reuzel Blue Pomade",
        "amount": 693000,
        "method": "VietQR Techcombank",
        "status": "paid",
    },
    {
        "id": "INV-8829",
        "time": "14:55 • 11/11/2026",
        "customer": "Lê Minh Khôi",
        "barber": "Eric Vũ",
        "items": "Cắt + Uốn Premlock Hàn Quốc + 1x Kevin Murphy",
        "amount": 1230000,
        "method": "Thẻ tín dụng Visa",
        "status": "paid",
    },
]

SETTINGS_DB: Dict[str, Any] = {
    "salonName": "ROYAL BARBER CLUB - FLAGSHIP",
    "salonSlogan": "Nghệ Thuật Tóc Quý Ông & Grooming Đẳng Cấp",
    "salonHotline": "0909.888.999",
    "salonAddress": "88 Phố Cổ, Quận Hoàn Kiếm, TP. Hà Nội",
    "bankName": "Techcombank (TCB)",
    "bankAccount": "1903 8888 9999 88",
    "bankOwner": "HOANG VAN NAM - ROYAL BARBER",
}


# ===========================================================================
# 2. SCHEMAS (PYDANTIC MODELS) CHO QUẢN LÝ NGƯỜI DÙNG & BARBER
# ===========================================================================

class StatusUpdatePayload(BaseModel):
    status: str


class UserCreatePayload(BaseModel):
    """Schema tạo mới Khách hàng CRM hoặc Tài khoản nhân sự."""
    userType: str = Field(default="customer", description="'customer' hoặc 'staff'")
    name: str = Field(..., min_length=2, description="Họ và tên người dùng")
    phone: str = Field(..., min_length=6, description="Số điện thoại liên hệ")
    email: Optional[str] = Field(default="", description="Địa chỉ email")
    # Dành cho Khách hàng Hội viên (CRM)
    tier: Optional[str] = Field(default="Member", description="Hạng hội viên: VIP Diamond, VIP Gold, VIP Silver, Member")
    points: Optional[int] = Field(default=100, ge=0, description="Điểm tích lũy")
    favBarber: Optional[str] = Field(default="Master Hoàng", description="Thợ Barber yêu thích")
    hairNote: Optional[str] = Field(default="", description="Ghi chú form tóc & thói quen phục vụ")
    # Dành cho Nhân sự (Staff Account)
    username: Optional[str] = Field(default=None, description="Tên đăng nhập hệ thống")
    role: Optional[str] = Field(default="customer", description="Vai trò: Super Admin, Branch Manager, Cashier, Barber, customer")
    branch: Optional[str] = Field(default="CN 01: 88 Phố Cổ, Hoàn Kiếm")
    twoFA: Optional[bool] = Field(default=False)
    permissions: Optional[List[str]] = Field(default=None)
    avatar: Optional[str] = Field(default=None)


class UserUpdatePayload(BaseModel):
    """Schema cập nhật thông tin Người dùng (Khách hàng hoặc Nhân sự)."""
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    tier: Optional[str] = None
    points: Optional[int] = None
    visits: Optional[int] = None
    totalSpent: Optional[int] = None
    favBarber: Optional[str] = None
    hairNote: Optional[str] = None
    role: Optional[str] = None
    branch: Optional[str] = None
    twoFA: Optional[bool] = None
    status: Optional[str] = None
    permissions: Optional[List[str]] = None
    avatar: Optional[str] = None


class UserPointsAdjustPayload(BaseModel):
    """Schema cộng/trừ điểm Loyalty cho Khách hàng."""
    pointsDelta: int = Field(..., description="Số điểm cộng thêm (+) hoặc trừ đi (-)")
    spentDelta: Optional[int] = Field(default=0, ge=0, description="Doanh thu phát sinh thêm (VNĐ)")
    reason: Optional[str] = Field(default="Cập nhật điểm tích lũy tại quầy POS")


class BarberCreatePayload(BaseModel):
    """Schema thêm mới Thợ cắt tóc (Barber)."""
    name: str = Field(..., min_length=2, description="Họ tên hoặc nghệ danh Barber")
    phone: str = Field(default="0909.000.111", description="Số điện thoại liên hệ")
    email: Optional[str] = Field(default="", description="Email")
    rank: str = Field(default="Senior Stylist", description="Cấp bậc: Master Barber, Senior Stylist, Creative Stylist, Spa Specialist, Junior Barber")
    role: Optional[str] = Field(default=None, description="Mô tả chức danh")
    specialty: str = Field(default="Classic Cut & Skin Fade", description="Chuyên môn chính")
    exp: int = Field(default=3, ge=0, description="Số năm kinh nghiệm")
    chair: Optional[str] = Field(default=None, description="Ghế phụ trách (VD: Ghế 06)")
    chairId: Optional[int] = Field(default=None, description="Số thứ tự ghế (1-12)")
    shift: str = Field(default="Ca Full (09:00 - 21:00)", description="Ca làm việc")
    status: str = Field(default="available", description="Trạng thái: busy/working, available, break, off")
    baseSalary: int = Field(default=8500000, ge=0, description="Lương cơ bản (VNĐ/tháng)")
    commissionRate: int = Field(default=30, ge=0, le=100, description="% Hoa hồng dịch vụ")
    kpiBonus: int = Field(default=1000000, ge=0, description="Thưởng KPI (VNĐ)")
    skills: Optional[List[str]] = Field(default=None, description="Danh sách kỹ năng")
    bio: Optional[str] = Field(default=None, description="Giới thiệu ngắn")
    avatar: Optional[str] = Field(default=None, description="URL ảnh đại diện")


class BarberUpdatePayload(BaseModel):
    """Schema cập nhật thông tin Hồ sơ Barber."""
    name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    rank: Optional[str] = None
    role: Optional[str] = None
    specialty: Optional[str] = None
    exp: Optional[int] = None
    chair: Optional[str] = None
    chairId: Optional[int] = None
    shift: Optional[str] = None
    status: Optional[str] = None
    rating: Optional[float] = None
    baseSalary: Optional[int] = None
    commissionRate: Optional[int] = None
    kpiBonus: Optional[int] = None
    todayClients: Optional[int] = None
    todayRevenue: Optional[int] = None
    monthRevenue: Optional[int] = None
    skills: Optional[List[str]] = None
    bio: Optional[str] = None
    avatar: Optional[str] = None


class BarberScheduleUpdatePayload(BaseModel):
    """Schema cập nhật ca trực & ghế phụ trách cho Barber."""
    shift: str = Field(..., description="Ca làm việc mới")
    chair: Optional[str] = Field(default=None, description="Ghế cắt được phân công")
    status: Optional[str] = Field(default=None, description="Trạng thái ca trực")


class AppointmentCreatePayload(BaseModel):
    """Schema đặt lịch hẹn mới từ trang Admin."""
    customer: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=6)
    tag: Optional[str] = Field(default="Khách mới")
    service: str = Field(...)
    barber: str = Field(...)
    chair: Optional[str] = Field(default="Ghế 01")
    time: str = Field(...)
    date: Optional[str] = Field(default="Hôm nay")
    price: int = Field(default=200000, ge=0)
    status: Optional[str] = Field(default="waiting")


# ===========================================================================
# 3. API QUẢN LÝ NGƯỜI DÙNG (USERS: KHÁCH HÀNG CRM & TÀI KHOẢN NHÂN SỰ)
# ===========================================================================

def _auto_tier_from_points(points: int) -> str:
    if points >= 1800:
        return "VIP Diamond"
    if points >= 900:
        return "VIP Gold"
    if points >= 400:
        return "VIP Silver"
    return "Member"


def _compute_user_kpis() -> Dict[str, Any]:
    vip_count = sum(1 for u in USERS_DB if "VIP" in str(u.get("tier", "")))
    total_points = sum(int(u.get("points", 0)) for u in USERS_DB)
    total_spent = sum(int(u.get("totalSpent", 0)) for u in USERS_DB)
    active_staff = sum(1 for s in STAFF_DB if s.get("status") == "active")
    return {
        "totalCustomers": len(USERS_DB),
        "vipCustomers": vip_count,
        "totalLoyaltyPoints": total_points,
        "totalCustomerSpent": total_spent,
        "totalStaffAccounts": len(STAFF_DB),
        "activeStaffAccounts": active_staff,
    }


@router.get("/users", summary="Danh sách Người dùng (Khách hàng CRM & Nhân sự)")
def get_users(
    tab: str = Query(default="all", description="'customers', 'staff', hoặc 'all'"),
    tier: Optional[str] = Query(default=None, description="Lọc theo hạng thẻ hội viên"),
    role: Optional[str] = Query(default=None, description="Lọc theo vai trò hệ thống"),
    status_filter: Optional[str] = Query(default=None, alias="status", description="Lọc theo trạng thái active/locked"),
    fav_barber: Optional[str] = Query(default=None, description="Lọc theo thợ Barber yêu thích"),
    search: Optional[str] = Query(default=None, description="Từ khóa tìm kiếm tên, SĐT, email, mã"),
):
    customers = list(USERS_DB)
    staff = list(STAFF_DB)

    if tier and tier != "all":
        customers = [c for c in customers if c.get("tier") == tier]

    if fav_barber and fav_barber != "all":
        customers = [
            c for c in customers
            if fav_barber.lower() in str(c.get("favBarber", "")).lower()
        ]

    if role and role != "all":
        staff = [
            s for s in staff
            if role.lower() in str(s.get("role", "")).lower()
            or role.lower() == str(s.get("systemRole", "")).lower()
        ]

    if status_filter and status_filter != "all":
        customers = [c for c in customers if c.get("status") == status_filter]
        staff = [s for s in staff if s.get("status") == status_filter]

    if search and search.strip():
        q = search.strip().lower()
        customers = [
            c for c in customers
            if q in str(c.get("id", "")).lower()
            or q in str(c.get("name", "")).lower()
            or q in str(c.get("phone", "")).lower()
            or q in str(c.get("email", "")).lower()
            or q in str(c.get("hairNote", "")).lower()
        ]
        staff = [
            s for s in staff
            if q in str(s.get("id", "")).lower()
            or q in str(s.get("name", "")).lower()
            or q in str(s.get("username", "")).lower()
            or q in str(s.get("email", "")).lower()
            or q in str(s.get("phone", "")).lower()
        ]

    items = staff if tab == "staff" else customers
    kpis = _compute_user_kpis()

    return api_success(
        data={
            "items": items,
            "customers": customers,
            "staff": staff,
            "total": len(items),
            "kpis": kpis,
        },
        message="Lấy danh sách người dùng thành công",
        items=items,
        customers=customers,
        staff=staff,
        total=len(items),
        kpis=kpis,
    )


@router.get("/users/{user_id}", summary="Xem chi tiết Hồ sơ Người dùng (Khách hàng hoặc Nhân sự)")
def get_user_detail(user_id: str):
    for cust in USERS_DB:
        if cust["id"].upper() == user_id.upper():
            return api_success(
                data={"userType": "customer", "user": cust},
                message="Lấy thông tin khách hàng thành công",
                user=cust,
            )
    for st in STAFF_DB:
        if st["id"].upper() == user_id.upper() or st.get("username") == user_id:
            return api_success(
                data={"userType": "staff", "user": st},
                message="Lấy thông tin nhân sự thành công",
                user=st,
            )
    raise api_error(
        code="USER_NOT_FOUND",
        message=f"Không tìm thấy người dùng với mã '{user_id}'",
        status_code=status.HTTP_404_NOT_FOUND,
    )


@router.post("/users", status_code=status.HTTP_201_CREATED, summary="Thêm mới Khách hàng CRM hoặc Tài khoản Nhân sự")
def create_user(payload: UserCreatePayload):
    clean_phone = "".join(ch for ch in payload.phone if ch.isdigit())

    # Trường hợp 1: Tạo tài khoản Nhân sự (Staff)
    if payload.userType == "staff" or payload.role in ("Super Admin", "Branch Manager", "Cashier", "Barber", "admin", "barber"):
        for s in STAFF_DB:
            if payload.username and s.get("username") == payload.username:
                raise api_error("DUPLICATE_USERNAME", f"Username '{payload.username}' đã tồn tại trong hệ thống")

        new_id = f"ACC-0{len(STAFF_DB) + 1}"
        slug = "".join(ch for ch in payload.name.lower() if ch.isalnum())[:10] or "staff"
        new_staff: Dict[str, Any] = {
            "id": new_id,
            "name": payload.name.strip(),
            "username": payload.username or f"staff.{slug}",
            "email": payload.email or f"{slug}@royalbarber.vn",
            "phone": payload.phone.strip(),
            "role": payload.role if payload.role != "customer" else "Barber",
            "systemRole": "barber" if payload.role in ("Barber", "barber") else "admin",
            "branch": payload.branch or "CN 01: 88 Phố Cổ, Hoàn Kiếm",
            "lastLogin": "Vừa tạo mới",
            "twoFA": bool(payload.twoFA),
            "status": "active",
            "permissions": payload.permissions or [
                "Xem lịch hẹn cá nhân",
                "Xem hoa hồng trong ngày",
                "Ghi chú công thức tóc khách",
            ],
            "avatar": payload.avatar or f"https://ui-avatars.com/api/?name={payload.name}&background=f59e0b&color=000&bold=true",
        }
        STAFF_DB.insert(0, new_staff)
        return api_success(
            data=new_staff,
            message=f"Đã tạo tài khoản nhân sự '{new_staff['name']}' ({new_id})",
            user=new_staff,
        )

    # Trường hợp 2: Tạo mới Khách hàng Hội viên (CRM)
    for c in USERS_DB:
        existing_phone = "".join(ch for ch in str(c.get("phone", "")) if ch.isdigit())
        if clean_phone and existing_phone == clean_phone:
            raise api_error("DUPLICATE_PHONE", f"Số điện thoại '{payload.phone}' đã được đăng ký cho khách hàng {c['name']} ({c['id']})")

    next_num = 8801 + len(USERS_DB) + 1
    new_cust_id = f"KH-{next_num}"
    pts = payload.points if payload.points is not None else 100
    new_customer: Dict[str, Any] = {
        "id": new_cust_id,
        "name": payload.name.strip(),
        "phone": payload.phone.strip(),
        "email": payload.email or "customer@gentlemanbarber.vn",
        "tier": payload.tier or _auto_tier_from_points(pts),
        "role": "customer",
        "points": pts,
        "visits": 1,
        "totalSpent": 0,
        "lastVisit": "Vừa đăng ký hôm nay",
        "favBarber": payload.favBarber or "Master Hoàng",
        "hairNote": payload.hairNote or "Khách hàng hội viên mới đăng ký.",
        "status": "active",
        "avatar": payload.avatar or f"https://ui-avatars.com/api/?name={payload.name}&background=f59e0b&color=000&bold=true",
        "history": [],
    }
    USERS_DB.insert(0, new_customer)
    return api_success(
        data=new_customer,
        message=f"Đã tạo hồ sơ khách hàng '{new_customer['name']}' ({new_cust_id})",
        user=new_customer,
    )


@router.put("/users/{user_id}", summary="Cập nhật hồ sơ Người dùng (Khách hàng CRM hoặc Nhân sự)")
def update_user(user_id: str, payload: UserUpdatePayload):
    updates = {k: v for k, v in payload.dict(exclude_unset=True).items() if v is not None}

    for cust in USERS_DB:
        if cust["id"].upper() == user_id.upper():
            cust.update(updates)
            return api_success(
                data=cust,
                message=f"Đã cập nhật hồ sơ khách hàng {cust['name']} ({cust['id']})",
                user=cust,
            )

    for st in STAFF_DB:
        if st["id"].upper() == user_id.upper() or st.get("username") == user_id:
            st.update(updates)
            return api_success(
                data=st,
                message=f"Đã cập nhật tài khoản nhân sự {st['name']} ({st['id']})",
                user=st,
            )

    raise api_error(
        code="USER_NOT_FOUND",
        message=f"Không tìm thấy người dùng '{user_id}' để cập nhật",
        status_code=status.HTTP_404_NOT_FOUND,
    )


@router.patch("/users/{user_id}/status", summary="Khóa / Mở khóa tài khoản Người dùng")
def update_user_status(user_id: str, payload: StatusUpdatePayload):
    if payload.status not in ("active", "locked"):
        raise api_error("INVALID_STATUS", "Trạng thái người dùng chỉ nhận 'active' hoặc 'locked'")

    for cust in USERS_DB:
        if cust["id"].upper() == user_id.upper():
            cust["status"] = payload.status
            return api_success(
                data=cust,
                message=f"Đã chuyển trạng thái khách hàng {cust['name']} sang '{payload.status}'",
                user=cust,
            )

    for st in STAFF_DB:
        if st["id"].upper() == user_id.upper() or st.get("username") == user_id:
            st["status"] = payload.status
            return api_success(
                data=st,
                message=f"Đã chuyển trạng thái tài khoản {st['username']} sang '{payload.status}'",
                user=st,
            )

    raise api_error(
        code="USER_NOT_FOUND",
        message=f"Không tìm thấy người dùng '{user_id}'",
        status_code=status.HTTP_404_NOT_FOUND,
    )


@router.patch("/users/{user_id}/points", summary="Cộng / Trừ điểm tích lũy Loyalty & Nâng hạng tự động")
def adjust_user_points(user_id: str, payload: UserPointsAdjustPayload):
    for cust in USERS_DB:
        if cust["id"].upper() == user_id.upper():
            new_points = max(0, int(cust.get("points", 0)) + payload.pointsDelta)
            cust["points"] = new_points
            if payload.spentDelta:
                cust["totalSpent"] = int(cust.get("totalSpent", 0)) + payload.spentDelta
                cust["visits"] = int(cust.get("visits", 0)) + 1
            cust["tier"] = _auto_tier_from_points(new_points)
            return api_success(
                data=cust,
                message=f"Đã cập nhật điểm tích lũy cho {cust['name']}: {new_points} pts ({cust['tier']})",
                user=cust,
            )

    raise api_error(
        code="CUSTOMER_NOT_FOUND",
        message=f"Không tìm thấy hội viên mã '{user_id}'",
        status_code=status.HTTP_404_NOT_FOUND,
    )


@router.delete("/users/{user_id}", summary="Xóa Người dùng khỏi hệ thống")
def delete_user(user_id: str):
    for idx, cust in enumerate(USERS_DB):
        if cust["id"].upper() == user_id.upper():
            removed = USERS_DB.pop(idx)
            return api_success(
                data=removed,
                message=f"Đã xóa hồ sơ khách hàng {removed['name']} ({removed['id']})",
            )

    for idx, st in enumerate(STAFF_DB):
        if st["id"].upper() == user_id.upper() or st.get("username") == user_id:
            removed = STAFF_DB.pop(idx)
            return api_success(
                data=removed,
                message=f"Đã xóa tài khoản nhân sự {removed['name']} ({removed['id']})",
            )

    raise api_error(
        code="USER_NOT_FOUND",
        message=f"Không tìm thấy người dùng '{user_id}' để xóa",
        status_code=status.HTTP_404_NOT_FOUND,
    )


# ===========================================================================
# 4. API QUẢN LÝ ĐỘI NGŨ BARBER (BARBERS: HỒ SƠ, CA TRỰC, HOA HỒNG, BẢNG LƯƠNG)
# ===========================================================================

def _enrich_barber_payroll(barber: Dict[str, Any]) -> Dict[str, Any]:
    """Tính toán tự động hoa hồng và tổng thu nhập tạm tính cho từng Barber."""
    month_rev = int(barber.get("monthRevenue", 0))
    comm_rate = int(barber.get("commissionRate", 30))
    base_sal = int(barber.get("baseSalary", 8000000))
    kpi_bonus = int(barber.get("kpiBonus", 0))
    commission_amount = round(month_rev * comm_rate / 100)
    total_income = base_sal + commission_amount + kpi_bonus
    enriched = dict(barber)
    enriched["commissionAmount"] = commission_amount
    enriched["totalIncome"] = total_income
    return enriched


def _compute_barber_kpis(barbers: List[Dict[str, Any]]) -> Dict[str, Any]:
    total = len(barbers)
    working = sum(1 for b in barbers if b.get("status") in ("busy", "working", "available"))
    busy = sum(1 for b in barbers if b.get("status") in ("busy", "working"))
    available = sum(1 for b in barbers if b.get("status") == "available")
    on_break = sum(1 for b in barbers if b.get("status") == "break")
    off = sum(1 for b in barbers if b.get("status") == "off")
    today_rev = sum(int(b.get("todayRevenue", 0)) for b in barbers)
    month_rev = sum(int(b.get("monthRevenue", 0)) for b in barbers)
    total_comm = sum(
        round(int(b.get("monthRevenue", 0)) * int(b.get("commissionRate", 30)) / 100)
        for b in barbers
    )
    avg_rating = round(
        sum(float(b.get("rating", 5.0)) for b in barbers) / max(1, total), 2
    )
    return {
        "totalBarbers": total,
        "workingOnDuty": working,
        "busyBarbers": busy,
        "availableBarbers": available,
        "breakBarbers": on_break,
        "offBarbers": off,
        "todayRevenue": today_rev,
        "monthRevenue": month_rev,
        "totalCommission": total_comm,
        "avgRating": avg_rating,
    }


def _find_barber_index(barber_id: str) -> int:
    clean_id = barber_id.strip().lstrip("#").upper()
    for idx, b in enumerate(BARBERS_DB):
        b_id = str(b.get("id", "")).lstrip("#").upper()
        b_code = str(b.get("code", "")).lstrip("#").upper()
        if b_id == clean_id or b_code == clean_id or str(b.get("name", "")).lower() == barber_id.strip().lower():
            return idx
    return -1


@router.get("/barbers", summary="Danh sách Đội ngũ Barber, Trạng thái Ca trực & Hoa hồng")
def get_barbers(
    status_filter: Optional[str] = Query(default=None, alias="status", description="Lọc trạng thái: working, busy, available, break, off"),
    rank: Optional[str] = Query(default=None, description="Lọc theo cấp bậc thợ"),
    search: Optional[str] = Query(default=None, description="Tìm kiếm theo tên, SĐT, mã thợ, chuyên môn, ghế"),
):
    results = [_enrich_barber_payroll(b) for b in BARBERS_DB]

    if status_filter and status_filter != "all":
        if status_filter in ("working", "busy"):
            results = [b for b in results if b.get("status") in ("working", "busy")]
        else:
            results = [b for b in results if b.get("status") == status_filter]

    if rank and rank != "all":
        results = [b for b in results if rank.lower() in str(b.get("rank", "")).lower()]

    if search and search.strip():
        q = search.strip().lower()
        results = [
            b for b in results
            if q in str(b.get("id", "")).lower()
            or q in str(b.get("name", "")).lower()
            or q in str(b.get("phone", "")).lower()
            or q in str(b.get("specialty", "")).lower()
            or q in str(b.get("chair", "")).lower()
        ]

    kpis = _compute_barber_kpis(BARBERS_DB)
    return api_success(
        data={
            "items": results,
            "total": len(results),
            "kpis": kpis,
        },
        message="Lấy danh sách đội ngũ Barber thành công",
        items=results,
        total=len(results),
        kpis=kpis,
    )


@router.get("/barbers/{barber_id}", summary="Xem chi tiết Hồ sơ Barber & Lịch hẹn phụ trách")
def get_barber_detail(barber_id: str):
    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber với mã '{barber_id}'",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    barber = _enrich_barber_payroll(BARBERS_DB[idx])
    assigned_appointments = [
        a for a in APPOINTMENTS_DB
        if barber["name"].lower() in str(a.get("barber", "")).lower()
    ]
    return api_success(
        data={
            "barber": barber,
            "appointments": assigned_appointments,
        },
        message="Lấy chi tiết hồ sơ Barber thành công",
        barber=barber,
        appointments=assigned_appointments,
    )


@router.post("/barbers", status_code=status.HTTP_201_CREATED, summary="Thêm mới Thợ cắt tóc (Barber) vào hệ thống")
def create_barber(payload: BarberCreatePayload):
    # Kiểm tra trùng tên Barber
    for b in BARBERS_DB:
        if b["name"].strip().lower() == payload.name.strip().lower():
            raise api_error(
                code="DUPLICATE_BARBER_NAME",
                message=f"Thợ Barber '{payload.name}' đã tồn tại trong danh sách ({b['id']})",
            )

    next_index = len(BARBERS_DB) + 1
    new_id = f"BB-{next_index:02d}"
    chair_id = payload.chairId or next_index
    chair_label = payload.chair or f"Ghế {chair_id:02d}"
    normalized_status = "busy" if payload.status == "working" else payload.status

    new_barber: Dict[str, Any] = {
        "id": new_id,
        "code": f"#{new_id}",
        "name": payload.name.strip(),
        "rank": payload.rank,
        "role": payload.role or f"{payload.rank} • {payload.exp} năm KN",
        "specialty": payload.specialty,
        "exp": payload.exp,
        "chair": chair_label,
        "chairId": chair_id,
        "phone": payload.phone.strip(),
        "email": payload.email or f"{new_id.lower()}@gentlemanbarber.vn",
        "shift": payload.shift,
        "status": normalized_status,
        "rating": 5.0,
        "reviews": 1,
        "todayClients": 0,
        "todayBookings": 0,
        "maxBookings": 10,
        "todayRevenue": 0,
        "monthRevenue": 0,
        "baseSalary": payload.baseSalary,
        "commissionRate": payload.commissionRate,
        "kpiBonus": payload.kpiBonus,
        "skills": payload.skills or [s.strip() for s in payload.specialty.split("&") if s.strip()],
        "bio": payload.bio or f"Chuyên gia {payload.specialty} tại Gentleman Barber.",
        "avatar": payload.avatar or f"https://ui-avatars.com/api/?name={payload.name}&background=f59e0b&color=000&bold=true",
    }

    BARBERS_DB.append(new_barber)

    # Đồng bộ tự động sang danh sách Tài khoản nhân sự (STAFF_DB)
    slug = "".join(ch for ch in payload.name.lower() if ch.isalnum())[:10] or f"bb{next_index}"
    STAFF_DB.append(
        {
            "id": f"ACC-0{len(STAFF_DB) + 1}",
            "name": payload.name.strip(),
            "username": f"barber.{slug}",
            "email": new_barber["email"],
            "phone": new_barber["phone"],
            "role": "Barber",
            "systemRole": "barber",
            "branch": "CN 01: 88 Phố Cổ, Hoàn Kiếm",
            "lastLogin": "Vừa đồng bộ từ Quản lý Barber",
            "twoFA": False,
            "status": "locked" if normalized_status == "off" else "active",
            "permissions": [
                "Xem lịch hẹn cá nhân",
                "Xem hoa hồng trong ngày",
                "Ghi chú công thức tóc khách",
            ],
            "avatar": new_barber["avatar"],
        }
    )

    enriched = _enrich_barber_payroll(new_barber)
    return api_success(
        data=enriched,
        message=f"Đã thêm thợ Barber '{new_barber['name']}' ({new_id}) thành công",
        barber=enriched,
    )


@router.put("/barbers/{barber_id}", summary="Cập nhật Hồ sơ, Cấp bậc & Hoa hồng của Barber")
def update_barber(barber_id: str, payload: BarberUpdatePayload):
    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber '{barber_id}' để cập nhật",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    updates = {k: v for k, v in payload.dict(exclude_unset=True).items() if v is not None}
    if "status" in updates and updates["status"] == "working":
        updates["status"] = "busy"

    BARBERS_DB[idx].update(updates)
    enriched = _enrich_barber_payroll(BARBERS_DB[idx])
    return api_success(
        data=enriched,
        message=f"Đã cập nhật hồ sơ thợ Barber '{enriched['name']}'",
        barber=enriched,
    )


@router.patch("/barbers/{barber_id}/status", summary="Cập nhật nhanh trạng thái ca trực của Barber")
def update_barber_status(barber_id: str, payload: StatusUpdatePayload):
    valid_statuses = ("working", "busy", "available", "break", "off")
    if payload.status not in valid_statuses:
        raise api_error(
            code="INVALID_BARBER_STATUS",
            message=f"Trạng thái '{payload.status}' không hợp lệ. Chỉ chấp nhận: {', '.join(valid_statuses)}",
        )

    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber '{barber_id}'",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    normalized = "busy" if payload.status == "working" else payload.status
    BARBERS_DB[idx]["status"] = normalized

    # Đồng bộ trạng thái ghế cắt tương ứng trong STATIONS_DB
    barber_name = BARBERS_DB[idx]["name"]
    for st in STATIONS_DB:
        if st.get("barber") == barber_name:
            st["status"] = "busy" if normalized == "busy" else "available"

    enriched = _enrich_barber_payroll(BARBERS_DB[idx])
    return api_success(
        data=enriched,
        message=f"Đã đổi trạng thái của {barber_name} sang '{normalized}'",
        barber=enriched,
    )


@router.patch("/barbers/{barber_id}/schedule", summary="Phân công Ca làm việc & Ghế cắt cho Barber")
def update_barber_schedule(barber_id: str, payload: BarberScheduleUpdatePayload):
    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber '{barber_id}'",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    BARBERS_DB[idx]["shift"] = payload.shift
    if payload.chair:
        BARBERS_DB[idx]["chair"] = payload.chair
    if payload.status:
        BARBERS_DB[idx]["status"] = "busy" if payload.status == "working" else payload.status

    enriched = _enrich_barber_payroll(BARBERS_DB[idx])
    return api_success(
        data=enriched,
        message=f"Đã cập nhật lịch trực & ghế cho {enriched['name']}",
        barber=enriched,
    )


@router.get("/barbers/{barber_id}/payroll", summary="Tính phiếu lương & Hoa hồng chi tiết của Barber")
def get_barber_payroll(barber_id: str):
    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber '{barber_id}'",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    enriched = _enrich_barber_payroll(BARBERS_DB[idx])
    payroll_sheet = {
        "barberId": enriched["id"],
        "barberName": enriched["name"],
        "rank": enriched["rank"],
        "month": "11/2026",
        "baseSalary": enriched["baseSalary"],
        "monthRevenue": enriched["monthRevenue"],
        "commissionRate": enriched["commissionRate"],
        "commissionAmount": enriched["commissionAmount"],
        "kpiBonus": enriched.get("kpiBonus", 0),
        "totalIncome": enriched["totalIncome"],
        "generatedAt": datetime.now().isoformat(),
    }
    return api_success(
        data=payroll_sheet,
        message=f"Đã xuất bảng tính lương tháng 11/2026 cho {enriched['name']}",
        payroll=payroll_sheet,
    )


@router.delete("/barbers/{barber_id}", summary="Xóa hồ sơ Barber khỏi hệ thống")
def delete_barber(barber_id: str):
    idx = _find_barber_index(barber_id)
    if idx < 0:
        raise api_error(
            code="BARBER_NOT_FOUND",
            message=f"Không tìm thấy thợ Barber '{barber_id}' để xóa",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    removed = BARBERS_DB.pop(idx)
    return api_success(
        data=removed,
        message=f"Đã xóa hồ sơ thợ Barber '{removed['name']}' ({removed['id']})",
    )


# ===========================================================================
# 5. CÁC API VẬN HÀNH SALON KHÁC (OVERVIEW, APPOINTMENTS, STATIONS, POS...)
# ===========================================================================

@router.get("/overview", summary="Lấy số liệu tổng quan Dashboard Admin")
def get_admin_overview():
    return api_success(
        data={
            "todayRevenue": 8850000,
            "completedAppointments": 32,
            "totalAppointments": max(48, len(APPOINTMENTS_DB)),
            "busyChairs": sum(1 for s in STATIONS_DB if s.get("status") == "busy"),
            "totalChairs": 8,
            "retailRevenue": 2140000,
            "csatScore": 4.95,
            "stations": STATIONS_DB,
            "recentAppointments": APPOINTMENTS_DB,
            "barbers": [_enrich_barber_payroll(b) for b in BARBERS_DB],
        },
        todayRevenue=8850000,
        completedAppointments=32,
        totalAppointments=max(48, len(APPOINTMENTS_DB)),
        busyChairs=sum(1 for s in STATIONS_DB if s.get("status") == "busy"),
        totalChairs=8,
        retailRevenue=2140000,
        csatScore=4.95,
        stations=STATIONS_DB,
        recentAppointments=APPOINTMENTS_DB,
        barbers=[_enrich_barber_payroll(b) for b in BARBERS_DB],
    )


@router.get("/stations", summary="Danh sách ghế cắt & giường gội")
def get_stations():
    return api_success(
        data={"items": STATIONS_DB, "total": len(STATIONS_DB)},
        items=STATIONS_DB,
        total=len(STATIONS_DB),
    )


@router.get("/appointments", summary="Danh sách lịch đặt hẹn Admin")
def get_appointments(status: Optional[str] = None, barber: Optional[str] = None):
    results = list(APPOINTMENTS_DB)
    if status and status != "all":
        results = [a for a in results if a["status"] == status]
    if barber and barber != "all":
        results = [a for a in results if barber.lower() in str(a.get("barber", "")).lower()]
    return api_success(
        data={"items": results, "total": len(results)},
        items=results,
        total=len(results),
    )


@router.post("/appointments", status_code=status.HTTP_201_CREATED, summary="Tạo lịch hẹn mới từ Admin & Đồng bộ CRM")
def create_appointment(payload: AppointmentCreatePayload):
    new_id = f"BK-{9025 + len(APPOINTMENTS_DB)}"
    new_appt: Dict[str, Any] = {
        "id": new_id,
        "customer": payload.customer.strip(),
        "phone": payload.phone.strip(),
        "tag": payload.tag or "Khách mới",
        "service": payload.service,
        "barber": payload.barber,
        "chair": payload.chair or "Ghế 01",
        "time": payload.time,
        "date": payload.date or "Hôm nay",
        "price": payload.price,
        "status": payload.status or "waiting",
    }
    APPOINTMENTS_DB.insert(0, new_appt)

    # Tự động đồng bộ khách đặt lịch sang USERS_DB (CRM)
    clean_phone = "".join(ch for ch in payload.phone if ch.isdigit())
    existing_cust = next(
        (
            c for c in USERS_DB
            if "".join(ch for ch in str(c.get("phone", "")) if ch.isdigit()) == clean_phone
            and clean_phone
        ),
        None,
    )
    if existing_cust:
        existing_cust["visits"] = int(existing_cust.get("visits", 0)) + 1
        existing_cust["lastVisit"] = f"{new_appt['date']}, {new_appt['time']}"
        existing_cust["favBarber"] = payload.barber
    else:
        USERS_DB.insert(
            0,
            {
                "id": f"KH-{8801 + len(USERS_DB) + 1}",
                "name": new_appt["customer"],
                "phone": new_appt["phone"],
                "email": "customer@gentlemanbarber.vn",
                "tier": new_appt["tag"] if "VIP" in str(new_appt["tag"]) else "Member",
                "role": "customer",
                "points": 50,
                "visits": 1,
                "totalSpent": new_appt["price"],
                "lastVisit": f"{new_appt['date']}, {new_appt['time']}",
                "favBarber": new_appt["barber"],
                "hairNote": f"Đặt lịch dịch vụ: {new_appt['service']}",
                "status": "active",
                "avatar": f"https://ui-avatars.com/api/?name={new_appt['customer']}&background=f59e0b&color=000&bold=true",
                "history": [
                    {
                        "date": new_appt["date"],
                        "service": new_appt["service"],
                        "barber": new_appt["barber"],
                        "amount": new_appt["price"],
                    }
                ],
            },
        )

    return api_success(
        data=new_appt,
        message=f"Đã tạo lịch hẹn {new_id} cho khách hàng {new_appt['customer']}",
        appointment=new_appt,
    )


@router.patch("/appointments/{booking_id}/status", summary="Cập nhật trạng thái lịch hẹn")
def update_appointment_status(booking_id: str, payload: StatusUpdatePayload):
    for item in APPOINTMENTS_DB:
        if item["id"] == booking_id:
            item["status"] = payload.status
            return api_success(
                data=item,
                message="Đã cập nhật trạng thái",
                appointment=item,
            )
    raise api_error(
        code="APPOINTMENT_NOT_FOUND",
        message="Không tìm thấy mã lịch hẹn",
        status_code=status.HTTP_404_NOT_FOUND,
    )


@router.get("/services", summary="Danh sách bảng giá dịch vụ & Combo")
def get_services():
    return api_success(
        data={"items": SERVICES_DB, "total": len(SERVICES_DB)},
        items=SERVICES_DB,
        total=len(SERVICES_DB),
    )


@router.get("/inventory", summary="Danh sách tồn kho Sáp & Mỹ phẩm")
def get_inventory():
    return api_success(
        data={"items": INVENTORY_DB, "total": len(INVENTORY_DB)},
        items=INVENTORY_DB,
        total=len(INVENTORY_DB),
    )


@router.get("/invoices", summary="Danh sách hóa đơn POS")
def get_invoices():
    return api_success(
        data={"items": INVOICES_DB, "total": len(INVOICES_DB)},
        items=INVOICES_DB,
        total=len(INVOICES_DB),
    )


@router.get("/revenue", summary="Báo cáo doanh thu & Lãi lỗ P&L")
def get_revenue_stats(period: str = "month"):
    return api_success(
        data={
            "period": period,
            "grossRevenue": 128450000,
            "serviceRevenue": 102760000,
            "retailRevenue": 25690000,
            "netProfit": 54280000,
            "invoices": INVOICES_DB,
        },
        period=period,
        grossRevenue=128450000,
        serviceRevenue=102760000,
        retailRevenue=25690000,
        netProfit=54280000,
        invoices=INVOICES_DB,
    )


@router.get("/settings", summary="Lấy cấu hình hệ thống POS")
def get_settings():
    return api_success(data=SETTINGS_DB, **SETTINGS_DB)


@router.put("/settings", summary="Cập nhật cấu hình hệ thống POS")
def update_settings(payload: Dict[str, Any]):
    SETTINGS_DB.update(payload)
    return api_success(
        data=SETTINGS_DB,
        message="Đã lưu cấu hình thành công",
        settings=SETTINGS_DB,
    )
