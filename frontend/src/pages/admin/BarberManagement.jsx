// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";
import { adminBarbersApi } from "./adminApi";

const INITIAL_BARBERS = [
  {
    id: "BB-01",
    name: "Master Hoàng",
    rank: "Master Barber",
    chair: "Ghế VIP 01",
    phone: "0909.888.111",
    exp: "9 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    status: "busy",
    currentClient: "Anh Tuấn Nguyễn (Combo Đế Vương)",
    shift: "Ca Full (08:30 - 20:30)",
    specialties: ["Skin Fade", "Pompadour Cổ Điển", "Điêu Khắc Râu"],
    rating: 5.0,
    reviewsCount: 428,
    todayClients: 11,
    todayRevenue: 3450000,
    monthRevenue: 68500000,
    baseSalary: 12000000,
    commissionRate: 35,
  },
  {
    id: "BB-02",
    name: "Eric Vũ",
    rank: "Creative Stylist",
    chair: "Ghế Styling 03",
    phone: "0912.333.444",
    exp: "6 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    status: "busy",
    currentClient: "Lê Minh Khôi (Uốn Premlock Hàn Quốc)",
    shift: "Ca Full (09:00 - 21:00)",
    specialties: ["Uốn Premlock", "Nhuộm Balayage", "Layer Hàn Quốc"],
    rating: 4.96,
    reviewsCount: 315,
    todayClients: 7,
    todayRevenue: 2680000,
    monthRevenue: 54200000,
    baseSalary: 9500000,
    commissionRate: 30,
  },
  {
    id: "BB-03",
    name: "Tuấn Fade",
    rank: "Senior Stylist",
    chair: "Ghế Fade 02",
    phone: "0988.777.222",
    exp: "5 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    status: "busy",
    currentClient: "Hoàng Gia Bảo (Skin Fade + Cạo khăn nóng)",
    shift: "Ca Sáng - Chiều (08:30 - 18:30)",
    specialties: ["Mid/High Skin Fade", "Mohican", "Crop Texture"],
    rating: 4.92,
    reviewsCount: 289,
    todayClients: 9,
    todayRevenue: 1720000,
    monthRevenue: 46800000,
    baseSalary: 9000000,
    commissionRate: 30,
  },
  {
    id: "BB-04",
    name: "Thảo Spa",
    rank: "Gội Dưỡng Sinh & Spa",
    chair: "Ghế Spa 04",
    phone: "0934.555.666",
    exp: "4 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    status: "available",
    currentClient: "Sẵn sàng đón khách",
    shift: "Ca Full (09:00 - 20:00)",
    specialties: [
      "Gội Dưỡng Sinh Trung Hoa",
      "Lấy Ráy Tai Hoàng Gia",
      "Massage Cổ Vai Gáy",
    ],
    rating: 4.98,
    reviewsCount: 360,
    todayClients: 8,
    todayRevenue: 1440000,
    monthRevenue: 34500000,
    baseSalary: 8000000,
    commissionRate: 25,
  },
  {
    id: "BB-05",
    name: "Dũng Scissor",
    rank: "Senior Stylist",
    chair: "Ghế Classic 05",
    phone: "0977.999.000",
    exp: "7 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&auto=format&fit=crop&q=80",
    status: "available",
    currentClient: "Giữ lịch hẹn 15:30 (Trần Quốc Bảo)",
    shift: "Ca Full (08:30 - 20:30)",
    specialties: ["Cắt Kéo Thủ Công", "Side Part Cổ Điển", "Cạo Mặt Khăn Nóng"],
    rating: 4.9,
    reviewsCount: 240,
    todayClients: 6,
    todayRevenue: 1150000,
    monthRevenue: 41200000,
    baseSalary: 9000000,
    commissionRate: 30,
  },
  {
    id: "BB-06",
    name: "Huy Tattoo Hair",
    rank: "Junior Barber",
    chair: "Ghế Tattoo 06",
    phone: "0966.112.233",
    exp: "3 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80",
    status: "busy",
    currentClient: "Phạm Đức Duy (Undercut + Kẻ Line)",
    shift: "Ca Chiều - Tối (12:00 - 21:30)",
    specialties: ["Hair Tattoo Nghệ Thuật", "Undercut", "Mullet Hiện Đại"],
    rating: 4.86,
    reviewsCount: 152,
    todayClients: 5,
    todayRevenue: 850000,
    monthRevenue: 28900000,
    baseSalary: 7000000,
    commissionRate: 25,
  },
  {
    id: "BB-07",
    name: "Trung Barber",
    rank: "Senior Stylist",
    chair: "Ghế Master 07",
    phone: "0944.888.777",
    exp: "5 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
    status: "break",
    currentClient: "Đang nghỉ ăn trưa / Giải lao (15p)",
    shift: "Ca Full (08:30 - 20:30)",
    specialties: ["Nhuộm Phủ Bạc Thảo Dược", "Quiff Hiện Đại", "Taper Fade"],
    rating: 4.89,
    reviewsCount: 198,
    todayClients: 5,
    todayRevenue: 980000,
    monthRevenue: 38400000,
    baseSalary: 8500000,
    commissionRate: 30,
  },
  {
    id: "BB-08",
    name: "Lan Hương Spa",
    rank: "Gội Dưỡng Sinh & Spa",
    chair: "Giường Gội 08",
    phone: "0918.222.999",
    exp: "3 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    status: "off",
    currentClient: "Nghỉ phép định kỳ Thứ Tư",
    shift: "Nghỉ phép có lương",
    specialties: ["Chăm Sóc Da Mặt Nam", "Lột Mụn Than Hoạt Tính", "Gội Thư Giãn"],
    rating: 4.94,
    reviewsCount: 175,
    todayClients: 0,
    todayRevenue: 0,
    monthRevenue: 29600000,
    baseSalary: 7500000,
    commissionRate: 25,
  },
];

const mapBarberToReactModel = (b, idx = 0) => ({
  id: b.id ? String(b.id) : `BB-0${idx + 1}`,
  name: b.name || b.nickname || b.fullName || "Barber",
  fullName: b.fullName || b.name || b.nickname || "Barber",
  nickname: b.nickname || b.name || "Barber",
  rank:
    b.rank === "master"
      ? "Master Barber"
      : b.rank === "senior"
      ? "Senior Stylist"
      : b.rank === "spa"
      ? "Chuyên viên Gội & Spa"
      : b.level || b.rankLabel || b.rank || "Senior Stylist",
  chair: b.defaultChair || b.chair || "Ghế VIP 01",
  phone: b.phone || "0901.000.000",
  exp: b.exp || b.experience || "3 năm KN",
  avatar:
    b.avatar ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  status: b.status || "available",
  currentClient: b.currentClient || b.currentCustomer || "Sẵn sàng đón khách",
  shift: b.shift || "Ca Full (08:30 - 20:30)",
  specialties: Array.isArray(b.specialties)
    ? b.specialties
    : Array.isArray(b.skills)
    ? b.skills
    : ["Skin Fade", "Layer Hàn Quốc"],
  skills: Array.isArray(b.skills)
    ? b.skills
    : Array.isArray(b.specialties)
    ? b.specialties
    : ["Skin Fade", "Layer Hàn Quốc"],
  rating: Number(b.rating ?? b.csat ?? 5.0),
  reviewsCount: Number(b.reviewsCount ?? b.votes ?? 12),
  todayClients: Number(b.todayClients ?? b.cuts ?? b.todayCuts ?? 0),
  todayRevenue: Number(b.todayRevenue ?? b.revenue ?? 0),
  monthRevenue: Number(b.monthRevenue ?? 15500000),
  baseSalary: Number(b.baseSalary ?? 9000000),
  commissionRate: Number(b.commissionRate ?? 35),
});

export default function BarberManagement() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [barbers, setBarbers] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gb_sync_barbers_v1") || "null"
      );
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.map(mapBarberToReactModel);
      }
    } catch (e) {}
    return INITIAL_BARBERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("gb_sync_barbers_v1", JSON.stringify(barbers));
      window.dispatchEvent(new Event("gb-admin-sync"));
    } catch (e) {}
  }, [barbers]);
  const [currentView, setCurrentView] = useState("cards");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Add/Edit Barber Modal
  const [barberModalOpen, setBarberModalOpen] = useState(false);
  const [editingBarberId, setEditingBarberId] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formRank, setFormRank] = useState("Master Barber");
  const [formChair, setFormChair] = useState("Ghế VIP 01");
  const [formSalary, setFormSalary] = useState(9000000);
  const [formCommission, setFormCommission] = useState(30);
  const [formExp, setFormExp] = useState("5 năm KN");
  const [formSkills, setFormSkills] = useState(
    "Skin Fade, Classic Pompadour, Cạo khăn nóng"
  );
  const [formAvatar, setFormAvatar] = useState("");

  // Portfolio Modal
  const [portfolioBarber, setPortfolioBarber] = useState(null);

  // KPI calculations
  const totalCount = barbers.length;
  const workingCount = barbers.filter((b) => b.status !== "off").length;
  const busyCount = barbers.filter((b) => b.status === "busy").length;
  const availCount = barbers.filter((b) => b.status === "available").length;
  const totalTodayRev = barbers.reduce((acc, b) => acc + b.todayRevenue, 0);
  const avgRev = workingCount > 0 ? Math.round(totalTodayRev / workingCount) : 0;

  const filteredBarbers = barbers.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchRank = rankFilter === "all" || b.rank === rankFilter;
    const matchSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.chair.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.specialties.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchRank && matchSearch;
  });

  const getRankBadgeClass = (rank) => {
    if (rank === "Master Barber") return "rank-master";
    if (rank === "Senior Stylist") return "rank-senior";
    if (rank === "Creative Stylist") return "rank-creative";
    return "rank-spa";
  };

  const getStatusBadge = (status) => {
    if (status === "busy") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 status-dot-pulse"></span>{" "}
          Đang cắt
        </span>
      );
    }
    if (status === "available") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Sẵn
          sàng
        </span>
      );
    }
    if (status === "break") {
      return (
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
          <i className="fa-solid fa-mug-hot text-[10px]"></i> Giải lao
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
        Nghỉ ca
      </span>
    );
  };

  const rotateStatus = (id) => {
    const order = ["available", "busy", "break", "off"];
    const b = barbers.find((x) => x.id === id);
    if (!b) return;
    const nextStatus = order[(order.indexOf(b.status) + 1) % order.length];
    const currentClient =
      nextStatus === "available"
        ? "Sẵn sàng đón khách"
        : nextStatus === "busy"
        ? "Đang phục vụ khách Walk-in"
        : nextStatus === "break"
        ? "Đang nghỉ giải lao (15p)"
        : "Đã kết thúc ca làm việc";

    setBarbers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: nextStatus, currentClient }
          : item
      )
    );
    adminBarbersApi.updateBarberStatus(id, nextStatus);
    showToast(
      `Đã đổi trạng thái ${b.name}`,
      `Trạng thái hiện tại: ${currentClient}`
    );
  };

  const updateStatusFromSelect = (id, newStatus) => {
    const b = barbers.find((x) => x.id === id);
    if (!b) return;
    const currentClient =
      newStatus === "available"
        ? "Sẵn sàng đón khách"
        : newStatus === "busy"
        ? "Đang phục vụ khách tại ghế"
        : newStatus === "break"
        ? "Nghỉ giải lao 15p"
        : "Nghỉ phép / Hết ca";

    setBarbers((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus, currentClient } : item
      )
    );
    adminBarbersApi.updateBarberStatus(id, newStatus);
    showToast("Cập nhật ca trực", `Đã cập nhật trạng thái của ${b.name}`);
  };

  const openBarberModal = (id = null) => {
    if (id) {
      const b = barbers.find((x) => x.id === id);
      if (!b) return;
      setEditingBarberId(b.id);
      setFormName(b.name);
      setFormPhone(b.phone);
      setFormRank(b.rank);
      setFormChair(b.chair);
      setFormSalary(b.baseSalary);
      setFormCommission(b.commissionRate);
      setFormExp(b.exp);
      setFormSkills(b.specialties.join(", "));
      setFormAvatar(b.avatar);
    } else {
      setEditingBarberId("");
      setFormName("");
      setFormPhone("");
      setFormRank("Senior Stylist");
      setFormChair("Ghế VIP 01");
      setFormSalary(9000000);
      setFormCommission(30);
      setFormExp("4 năm KN");
      setFormSkills("Skin Fade, Classic Pompadour, Cạo khăn nóng");
      setFormAvatar("");
    }
    setBarberModalOpen(true);
  };

  const handleRankSelectChange = (rank) => {
    setFormRank(rank);
    if (rank === "Master Barber") {
      setFormCommission(35);
      setFormSalary(12000000);
    } else if (rank === "Senior Stylist" || rank === "Creative Stylist") {
      setFormCommission(30);
      setFormSalary(9000000);
    } else {
      setFormCommission(25);
      setFormSalary(7500000);
    }
  };

  const handleSaveBarber = (e) => {
    e.preventDefault();
    const skills = formSkills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const avatarUrl =
      formAvatar.trim() ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80";

    if (editingBarberId) {
      setBarbers((prev) =>
        prev.map((b) =>
          b.id === editingBarberId
            ? {
                ...b,
                name: formName.trim(),
                phone: formPhone.trim(),
                rank: formRank,
                chair: formChair,
                baseSalary: Number(formSalary),
                commissionRate: Number(formCommission),
                exp: formExp.trim(),
                specialties: skills.length ? skills : ["Skin Fade", "Undercut"],
                avatar: avatarUrl,
              }
            : b
        )
      );
      adminBarbersApi.updateBarber(editingBarberId, {
        name: formName.trim(),
        phone: formPhone.trim(),
        rank: formRank,
        chair: formChair,
        baseSalary: Number(formSalary),
        commissionRate: Number(formCommission),
        skills: skills.length ? skills : ["Skin Fade", "Undercut"],
        avatar: avatarUrl,
      });
      showToast(
        "Đã cập nhật hồ sơ!",
        `Thông tin của ${formName} đã được lưu thành công.`
      );
    } else {
      const newId = "BB-0" + (barbers.length + 1);
      setBarbers((prev) => [
        {
          id: newId,
          name: formName.trim(),
          rank: formRank,
          chair: formChair,
          phone: formPhone.trim(),
          exp: formExp.trim(),
          avatar: avatarUrl,
          status: "available",
          currentClient: "Sẵn sàng đón khách",
          shift: "Ca Full (08:30 - 20:30)",
          specialties: skills.length
            ? skills
            : ["Skin Fade", "Layer Hàn Quốc"],
          rating: 5.0,
          reviewsCount: 12,
          todayClients: 1,
          todayRevenue: 350000,
          monthRevenue: 15500000,
          baseSalary: Number(formSalary),
          commissionRate: Number(formCommission),
        },
        ...prev,
      ]);
      adminBarbersApi.createBarber({
        name: formName.trim(),
        phone: formPhone.trim(),
        rank: formRank,
        chair: formChair,
        baseSalary: Number(formSalary),
        commissionRate: Number(formCommission),
        skills: skills.length ? skills : ["Skin Fade", "Layer Hàn Quốc"],
        avatar: avatarUrl,
      });
      showToast(
        "Thêm Barber mới thành công!",
        `Đã chào đón ${formName} vào đội ngũ Royal Barber.`
      );
    }
    setBarberModalOpen(false);
  };

  const deleteBarber = (id) => {
    const b = barbers.find((x) => x.id === id);
    if (!b) return;
    setBarbers((prev) => prev.filter((x) => x.id !== id));
    showToast(
      "Đã xóa hồ sơ nhân sự",
      `Đã gỡ ${b.name} khỏi danh sách trực ca`,
      "warning"
    );
  };

  return (
    <AdminLayout activeKey="barbers" toast={toast}>
      {({ toggleSidebar }) => (
        <>
          {/* TOP HEADER BAR */}
          <header className="h-20 bg-barber-surface/80 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <i className="fa-solid fa-bars text-lg"></i>
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Đội Ngũ Stylist &amp; Nghệ Nhân Barber
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <i className="fa-solid fa-award text-[10px]"></i> KPI &amp;
                    Hoa Hồng Tự Động
                  </span>
                </div>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <i className="fa-regular fa-clock text-amber-400"></i>
                  <span>{dateStr}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-400 font-semibold">
                    {timeStr}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  showToast(
                    "Đã xuất bảng lương",
                    "File Bang_Hoa_Hong_Thang_11_RoyalBarber.xlsx đã sẵn sàng tải xuống!"
                  )
                }
                className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-file-excel text-emerald-400"></i>
                <span>Xuất Bảng Lương &amp; Hoa Hồng</span>
              </button>

              <button
                onClick={() => openBarberModal()}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-user-plus"></i>
                <span>Thêm Thợ Barber Mới</span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. TOP KPI CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Nhân Sự Salon
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-user-tie"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {totalCount} Nhân sự
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">
                    2 Master • 4 Senior • 2 Spa
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  100% có chứng chỉ Barber &amp; Tạo mẫu tóc Quốc tế
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Quân Số Ca Trực Hiện Tại
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-user-check"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {workingCount} / {totalCount} Thợ
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    {busyCount} đang cắt • {availCount} rảnh
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  1 thợ nghỉ giải lao • 1 thợ nghỉ phép định kỳ
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Doanh Thu TB / Barber
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-sack-dollar"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {formatVND(avgRev)}
                  </h3>
                  <span className="text-xs text-sky-400 font-semibold">
                    / thợ hôm nay
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Dẫn đầu ca:{" "}
                  <strong className="text-amber-400">
                    Master Hoàng (3.450.000 ₫)
                  </strong>
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Điểm Hài Lòng Tay Nghề
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">4.95 ★</h3>
                  <span className="text-xs text-purple-400 font-semibold">
                    1.420 lượt chấm điểm
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Tỷ lệ khách quay lại chọn đúng thợ cũ:{" "}
                  <span className="text-emerald-400 font-semibold">86%</span>
                </p>
              </div>
            </section>

            {/* 2. FILTER BAR & VIEW SWITCHER */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative w-full sm:w-64">
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm tên Barber, kỹ năng, ghế..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={rankFilter}
                  onChange={(e) => setRankFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Tất cả cấp bậc (Rank)</option>
                  <option value="Master Barber">
                    Master Barber (Hoa hồng 35%)
                  </option>
                  <option value="Senior Stylist">
                    Senior Stylist (Hoa hồng 30%)
                  </option>
                  <option value="Creative Stylist">
                    Creative Stylist - Hóa chất (30%)
                  </option>
                  <option value="Gội Dưỡng Sinh & Spa">
                    Chuyên viên Gội &amp; Ear Spa (25%)
                  </option>
                </select>

                <div className="flex flex-wrap items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                  {[
                    { key: "all", label: "Tất cả" },
                    { key: "busy", label: "Đang phục vụ" },
                    { key: "available", label: "Đang trống" },
                    { key: "break", label: "Nghỉ giải lao" },
                    { key: "off", label: "Nghỉ phép" },
                  ].map((st) => (
                    <button
                      key={st.key}
                      onClick={() => setStatusFilter(st.key)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        statusFilter === st.key
                          ? "bg-amber-500 text-black font-bold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800 self-start lg:self-auto shrink-0">
                <button
                  onClick={() => setCurrentView("cards")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    currentView === "cards"
                      ? "bg-amber-500 text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-id-card-clip"></i> Thẻ Hồ Sơ Barber
                </button>
                <button
                  onClick={() => setCurrentView("table")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    currentView === "table"
                      ? "bg-amber-500 text-black font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-Scale-balanced"></i> Bảng Lương &amp;
                  Hoa Hồng
                </button>
              </div>
            </section>

            {/* 3A. VIEW 1: BARBER PROFILE CARDS GRID */}
            {currentView === "cards" && (
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {filteredBarbers.map((b) => {
                  const commissionToday = Math.round(
                    (b.todayRevenue * b.commissionRate) / 100
                  );
                  return (
                    <div
                      key={b.id}
                      className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between barber-card transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${getRankBadgeClass(
                              b.rank
                            )}`}
                          >
                            {b.rank}
                          </span>
                          {getStatusBadge(b.status)}
                        </div>

                        <div className="flex items-center gap-3.5 mb-4">
                          <div className="relative shrink-0">
                            <img
                              src={b.avatar}
                              alt={b.name}
                              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
                            />
                            <span className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[10px] font-bold text-amber-400">
                              ★ {b.rating.toFixed(2)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-base font-bold text-white truncate">
                              {b.name}
                            </h3>
                            <p className="text-xs text-amber-400 font-semibold">
                              {b.chair} • {b.exp}
                            </p>
                            <p className="text-[11px] text-zinc-400 mt-0.5">
                              <i className="fa-solid fa-phone text-[10px] mr-1"></i>
                              {b.phone}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                            Sở trường kỹ thuật:
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {b.specialties.map((sp) => (
                              <span
                                key={sp}
                                className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                              >
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 mb-4">
                          <div className="flex items-center justify-between text-[11px] text-zinc-400">
                            <span>Ca trực:</span>
                            <span className="text-zinc-200 font-medium">
                              {b.shift}
                            </span>
                          </div>
                          <div className="mt-1.5 text-xs font-semibold text-amber-300 truncate">
                            <i className="fa-solid fa-scissors mr-1.5 text-[10px]"></i>
                            {b.currentClient}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800/80 text-center">
                          <div className="bg-zinc-900/60 rounded-xl p-2">
                            <span className="text-[10px] text-zinc-400 block">
                              Khách hôm nay
                            </span>
                            <span className="text-sm font-bold text-white">
                              {b.todayClients} lượt
                            </span>
                          </div>
                          <div className="bg-zinc-900/60 rounded-xl p-2">
                            <span className="text-[10px] text-zinc-400 block">
                              Doanh số ca
                            </span>
                            <span className="text-xs font-bold text-amber-400">
                              {formatVND(b.todayRevenue)}
                            </span>
                          </div>
                          <div className="bg-zinc-900/60 rounded-xl p-2">
                            <span className="text-[10px] text-zinc-400 block">
                              Hoa hồng ({b.commissionRate}%)
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                              {formatVND(commissionToday)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                        <button
                          onClick={() => setPortfolioBarber(b)}
                          className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 transition-colors"
                        >
                          <i className="fa-regular fa-eye text-amber-400 mr-1"></i>{" "}
                          Chi tiết KPI
                        </button>
                        <button
                          onClick={() => rotateStatus(b.id)}
                          title="Đổi nhanh trạng thái ca trực"
                          className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black text-xs font-bold border border-amber-500/30 transition-colors"
                        >
                          <i className="fa-solid fa-arrows-rotate"></i> Đổi TT
                        </button>
                        <button
                          onClick={() => openBarberModal(b.id)}
                          title="Chỉnh sửa hồ sơ"
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
                        >
                          <i className="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* 3B. VIEW 2: PAYROLL & COMMISSION TABLE */}
            {currentView === "table" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Bảng Tổng Hợp Hiệu Suất, Lương Cứng &amp; Hoa Hồng Tháng
                      11/2026
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Công thức tính: Thực lĩnh = Lương cơ bản + (% Hoa hồng ×
                      Doanh số dịch vụ) + Thưởng đánh giá 5 sao
                    </p>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Đang hiển thị {filteredBarbers.length} nhân sự
                  </span>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3.5 px-3 font-semibold">
                          Barber / Mã NV
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Cấp Bậc &amp; Ghế
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Trạng Thái Hiện Tại
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Khách Hôm Nay
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Doanh Số Tháng 11
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Lương Cứng
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Hoa Hồng (%)
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Tổng Thu Nhập Dự Kiến
                        </th>
                        <th className="py-3.5 px-3 font-semibold text-right">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredBarbers.map((b) => {
                        const commissionAmount = Math.round(
                          (b.monthRevenue * b.commissionRate) / 100
                        );
                        const totalIncome = b.baseSalary + commissionAmount;
                        return (
                          <tr
                            key={b.id}
                            className="hover:bg-zinc-900/50 transition-colors"
                          >
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={b.avatar}
                                  alt={b.name}
                                  className="w-10 h-10 rounded-xl object-cover"
                                />
                                <div>
                                  <div className="font-bold text-white">
                                    {b.name}
                                  </div>
                                  <span className="text-[11px] text-zinc-500 font-mono">
                                    {b.id} • ★ {b.rating.toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getRankBadgeClass(
                                  b.rank
                                )}`}
                              >
                                {b.rank}
                              </span>
                              <div className="text-[11px] text-zinc-400 mt-1">
                                {b.chair}
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              {getStatusBadge(b.status)}
                              <div className="text-[11px] text-zinc-500 mt-0.5 truncate max-w-[180px]">
                                {b.currentClient}
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="font-bold text-white">
                                {b.todayClients} khách
                              </span>
                              <div className="text-[11px] text-amber-400">
                                {formatVND(b.todayRevenue)}
                              </div>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-white">
                              {formatVND(b.monthRevenue)}
                            </td>
                            <td className="py-3.5 px-3 text-zinc-300">
                              {formatVND(b.baseSalary)}
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="text-emerald-400 font-bold">
                                {formatVND(commissionAmount)}
                              </span>
                              <span className="block text-[10px] text-zinc-500">
                                Tỷ lệ: {b.commissionRate}%
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-amber-400 text-sm">
                              {formatVND(totalIncome)}
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openBarberModal(b.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 font-semibold transition-colors"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => deleteBarber(b.id)}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 4. BOTTOM ROW: WEEKLY SHIFT ROSTER & COMMISSION POLICY */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <i className="fa-regular fa-calendar-days text-amber-400"></i>
                      Lịch Phân Ca Trực Tuần Này (Thứ 2 – Chủ Nhật)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Thứ 7 &amp; Chủ Nhật cấm nghỉ phép để đảm bảo 100% ghế hoạt
                      động phục vụ khách cuối tuần
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 font-semibold">
                    Ca Sáng: 08:30-16:30 • Ca Full: 09:00-20:30
                  </span>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-center border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 bg-zinc-900/60">
                        <th className="py-2.5 px-3 text-left font-semibold">
                          Thợ Barber
                        </th>
                        <th className="py-2.5 px-2">T2</th>
                        <th className="py-2.5 px-2">T3</th>
                        <th className="py-2.5 px-2 text-amber-400 font-bold">
                          T4 (Hôm nay)
                        </th>
                        <th className="py-2.5 px-2">T5</th>
                        <th className="py-2.5 px-2">T6</th>
                        <th className="py-2.5 px-2 text-emerald-400">T7</th>
                        <th className="py-2.5 px-2 text-emerald-400">CN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      <tr className="hover:bg-zinc-900/40">
                        <td className="py-3 px-3 text-left font-bold text-white">
                          Master Hoàng
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td className="bg-amber-500/5">
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full VIP
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full VIP
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40">
                        <td className="py-3 px-3 text-left font-bold text-white">
                          Eric Vũ
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
                            Off
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td className="bg-amber-500/5">
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40">
                        <td className="py-3 px-3 text-left font-bold text-white">
                          Tuấn Fade
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-sky-500/15 text-sky-400">
                            Ca Sáng
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td className="bg-amber-500/5">
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                            Ca Sáng
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
                            Off
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40">
                        <td className="py-3 px-3 text-left font-bold text-white">
                          Thảo Spa
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
                            Off
                          </span>
                        </td>
                        <td className="bg-amber-500/5">
                          <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-zinc-900/40">
                        <td className="py-3 px-3 text-left font-bold text-white">
                          Lan Hương Spa
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td className="bg-amber-500/5">
                          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-semibold">
                            Nghỉ phép
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                        <td>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            Full
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Cơ Chế Chia Hoa Hồng &amp; Thưởng
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Áp dụng tự động trên mỗi hóa đơn POS hoàn tất
                  </p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-400 block">
                          Master Barber
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Lương cứng 12.000.000₫
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold">
                        35% Dịch vụ
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-emerald-400 block">
                          Senior / Creative Stylist
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Lương cứng 9.000.000₫
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold">
                        30% Dịch vụ
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sky-400 block">
                          Gội Dưỡng Sinh &amp; Ear Spa
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Lương cứng 7.500.000₫
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 font-bold">
                        25% Dịch vụ
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-purple-400 block">
                          Hoa hồng bán lẻ Sáp / Pomade
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          Tư vấn khách mua sáp tại ghế
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold">
                        +15% Giá bán
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                  <i className="fa-solid fa-trophy mr-1.5"></i>
                  <strong>Thưởng nóng 1.500.000 ₫</strong> cho Barber đạt trên
                  150 khách/tháng và không có đánh giá dưới 4 sao.
                </div>
              </div>
            </section>
          </main>

          {/* MODAL 1: ADD / EDIT BARBER */}
          {barberModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {editingBarberId
                          ? `Chỉnh Sửa Hồ Sơ: ${formName}`
                          : "Thêm Hồ Sơ Barber Mới"}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Thiết lập thông tin cá nhân, vị trí ghế và mức hoa hồng
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBarberModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <form onSubmit={handleSaveBarber} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nghệ Danh / Họ Tên Barber *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="VD: Minh SkinFade"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Số Điện Thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="VD: 0909 123 456"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Cấp Bậc Chuyên Môn (Rank) *
                      </label>
                      <select
                        value={formRank}
                        onChange={(e) => handleRankSelectChange(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Master Barber">
                          Master Barber (35% HH)
                        </option>
                        <option value="Senior Stylist">
                          Senior Stylist (30% HH)
                        </option>
                        <option value="Creative Stylist">
                          Creative Stylist - Uốn/Nhuộm (30% HH)
                        </option>
                        <option value="Gội Dưỡng Sinh & Spa">
                          Gội Dưỡng Sinh &amp; Spa (25% HH)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Vị Trí Ghế Phụ Trách *
                      </label>
                      <select
                        value={formChair}
                        onChange={(e) => setFormChair(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Ghế VIP 01">Ghế VIP 01</option>
                        <option value="Ghế Fade 02">Ghế Fade 02</option>
                        <option value="Ghế Styling 03">Ghế Styling 03</option>
                        <option value="Ghế Spa 04">Ghế Spa 04</option>
                        <option value="Ghế Classic 05">Ghế Classic 05</option>
                        <option value="Ghế Tattoo 06">Ghế Tattoo 06</option>
                        <option value="Ghế Master 07">Ghế Master 07</option>
                        <option value="Giường Gội 08">Giường Gội 08</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Lương Cơ Bản (VNĐ)
                      </label>
                      <input
                        type="number"
                        required
                        value={formSalary}
                        onChange={(e) => setFormSalary(e.target.value)}
                        step="500000"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        % Hoa Hồng Dịch Vụ
                      </label>
                      <input
                        type="number"
                        required
                        value={formCommission}
                        onChange={(e) => setFormCommission(e.target.value)}
                        min="10"
                        max="60"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Số Năm Kinh Nghiệm
                      </label>
                      <input
                        type="text"
                        required
                        value={formExp}
                        onChange={(e) => setFormExp(e.target.value)}
                        placeholder="VD: 5 năm KN"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Kỹ Năng Thế Mạnh (cách nhau bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      required
                      value={formSkills}
                      onChange={(e) => setFormSkills(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Link Ảnh Đại Diện (Tuỳ chọn)
                    </label>
                    <input
                      type="url"
                      value={formAvatar}
                      onChange={(e) => setFormAvatar(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setBarberModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <i className="fa-solid fa-floppy-disk mr-1.5"></i> Lưu Hồ
                      Sơ Barber
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 2: BARBER PORTFOLIO & KPI DETAIL */}
          {portfolioBarber && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                {(() => {
                  const b =
                    barbers.find((x) => x.id === portfolioBarber.id) ||
                    portfolioBarber;
                  const commissionMonth = Math.round(
                    (b.monthRevenue * b.commissionRate) / 100
                  );
                  const totalSalary = b.baseSalary + commissionMonth;
                  return (
                    <>
                      <div className="p-6 border-b border-barber-border bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={b.avatar}
                            alt={b.name}
                            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500"
                          />
                          <div>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getRankBadgeClass(
                                b.rank
                              )}`}
                            >
                              {b.rank}
                            </span>
                            <h3 className="text-lg font-bold text-white mt-1">
                              {b.name}
                            </h3>
                            <p className="text-xs text-zinc-400">
                              {b.chair} • {b.exp} • {b.phone}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setPortfolioBarber(null)}
                          className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <div className="p-6 space-y-4 text-xs">
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                            <span className="text-zinc-400 block">
                              Đánh giá TB
                            </span>
                            <span className="text-base font-bold text-amber-400 mt-1 block">
                              ★ {b.rating.toFixed(2)} ({b.reviewsCount})
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                            <span className="text-zinc-400 block">
                              Doanh số Tháng 11
                            </span>
                            <span className="text-base font-bold text-white mt-1 block">
                              {formatVND(b.monthRevenue)}
                            </span>
                          </div>
                          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                            <span className="text-zinc-400 block">
                              Thực lĩnh tạm tính
                            </span>
                            <span className="text-base font-bold text-emerald-400 mt-1 block">
                              {formatVND(totalSalary)}
                            </span>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-zinc-400">
                              Lương cơ bản cố định:
                            </span>
                            <span className="font-semibold text-white">
                              {formatVND(b.baseSalary)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">
                              Hoa hồng dịch vụ ({b.commissionRate}%):
                            </span>
                            <span className="font-semibold text-emerald-400">
                              +{formatVND(commissionMonth)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-400">
                              Ca làm việc đăng ký:
                            </span>
                            <span className="font-semibold text-amber-300">
                              {b.shift}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-zinc-400">
                            Chuyển trạng thái làm việc:
                          </span>
                          <select
                            value={b.status}
                            onChange={(e) =>
                              updateStatusFromSelect(b.id, e.target.value)
                            }
                            className="bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          >
                            <option value="busy">Đang phục vụ khách</option>
                            <option value="available">
                              Đang rảnh • Sẵn sàng
                            </option>
                            <option value="break">Đang nghỉ giải lao</option>
                            <option value="off">Nghỉ phép / Kết thúc ca</option>
                          </select>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
