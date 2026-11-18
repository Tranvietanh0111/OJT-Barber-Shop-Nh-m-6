// Dữ liệu mẫu hồ sơ Barber (Sprint 2)
export const SPECIALTY_OPTIONS = [
    "Cắt tóc nam",
    "Fade / Undercut",
    "Uốn tóc",
    "Nhuộm tóc",
    "Cạo râu & tạo kiểu râu",
    "Chăm sóc da đầu",
    "Tạo kiểu tóc cưới",
];

export const SERVICE_OPTIONS = [
    { id: 1, name: "Cắt tóc nam chuẩn Barber", price: 150000 },
    { id: 2, name: "Combo cắt + gội + massage", price: 250000 },
    { id: 3, name: "Uốn xoăn Hàn Quốc", price: 450000 },
    { id: 4, name: "Nhuộm màu / tẩy tóc", price: 500000 },
    { id: 5, name: "Cạo râu classic", price: 80000 },
    { id: 6, name: "Chăm sóc da đầu", price: 200000 },
];

export const barberProfileMock = {
    fullName: "Nguyễn Hoàng Long",
    avatar: null, // null = hiện chữ cái đầu của tên
    bio: "Barber có hơn 6 năm kinh nghiệm, yêu thích các kiểu tóc Fade và Undercut hiện đại. Luôn lắng nghe khách để chọn kiểu phù hợp khuôn mặt.",
    yearsExperience: "6",
    specialties: ["Cắt tóc nam", "Fade / Undercut"],
    services: [1, 2, 5],
};