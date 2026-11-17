// Dữ liệu mẫu cho trang tổng quan Barber (Sprint 2)
export const barberDashboardMock = {
    todayAppointments: [
        { id: 1, time: "09:00", customer: "Nguyễn Văn An", service: "Cắt tóc nam", status: "confirmed" },
        { id: 2, time: "10:30", customer: "Trần Minh Quân", service: "Cắt + gội", status: "confirmed" },
        { id: 3, time: "14:00", customer: "Lê Hoàng Nam", service: "Uốn tóc", status: "pending" },
    ],
    weeklyCustomers: 24,
    averageRating: 4.7,
    upcomingAppointments: [
        { id: 4, date: "18/11/2026", time: "09:30", customer: "Phạm Đức Huy", service: "Cắt tóc nam" },
        { id: 5, date: "18/11/2026", time: "15:00", customer: "Vũ Tuấn Kiệt", service: "Nhuộm tóc" },
        { id: 6, date: "19/11/2026", time: "10:00", customer: "Đỗ Gia Bảo", service: "Cắt + cạo mặt" },
    ],
};