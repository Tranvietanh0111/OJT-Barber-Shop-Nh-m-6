// Phụ trách: Trần Văn Thắng
import React, { useState, useEffect } from "react";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";

const BARBERS_LIST = [
  {
    name: "Master Hoàng",
    chair: "Ghế 01",
    rank: "Master Barber",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Tuấn Fade",
    chair: "Ghế 02",
    rank: "Senior Stylist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Eric Vũ",
    chair: "Ghế 03",
    rank: "Chuyên gia Uốn/Nhuộm",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Thảo Spa",
    chair: "Ghế 04",
    rank: "Gội Dưỡng Sinh & Ear Spa",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Dũng Scissor",
    chair: "Ghế 05",
    rank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80",
  },
  {
    name: "Trung Barber",
    chair: "Ghế 07",
    rank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
  },
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-9015",
    customer: "Phan Mạnh Quỳnh",
    phone: "0909.222.888",
    tag: "VIP Diamond",
    source: "Zalo Mini App",
    service: "Combo Đế Vương 7 Bước",
    barber: "Master Hoàng",
    chair: "Ghế 01",
    time: "14:00",
    duration: "45p",
    price: 350000,
    status: "completed",
    note: "Cạo khăn nóng kỹ, vuốt sáp Reuzel Blue",
  },
  {
    id: "BK-9016",
    customer: "Ngô Kiến Huy",
    phone: "0918.777.666",
    tag: "Member",
    source: "Website",
    service: "Cắt tạo kiểu Layer Hàn Quốc",
    barber: "Tuấn Fade",
    chair: "Ghế 02",
    time: "14:00",
    duration: "30p",
    price: 150000,
    status: "completed",
    note: "Tỉa mỏng phần mái",
  },
  {
    id: "BK-9017",
    customer: "Trịnh Thăng Bình",
    phone: "0944.111.000",
    tag: "Walk-in",
    source: "Walk-in tại quầy",
    service: "Combo Cắt + Gội Massage",
    barber: "Dũng Scissor",
    chair: "Ghế 05",
    time: "14:00",
    duration: "40p",
    price: 150000,
    status: "cancelled",
    note: "Khách bận họp đột xuất",
  },
  {
    id: "BK-9021",
    customer: "Nguyễn Anh Tuấn",
    phone: "0988.412.889",
    tag: "VIP Diamond",
    source: "Hotline VIP",
    service: "Combo Đế Vương 7 Bước",
    barber: "Master Hoàng",
    chair: "Ghế 01",
    time: "15:00",
    duration: "45p",
    price: 350000,
    status: "in-progress",
    note: "Khách quen của Master Hoàng",
  },
  {
    id: "BK-9022",
    customer: "Hoàng Gia Bảo",
    phone: "0912.678.334",
    tag: "Member",
    source: "Zalo Mini App",
    service: "Skin Fade + Cạo Khăn Nóng",
    barber: "Tuấn Fade",
    chair: "Ghế 02",
    time: "15:00",
    duration: "35p",
    price: 180000,
    status: "in-progress",
    note: "Fade sát 0mm hai bên mai",
  },
  {
    id: "BK-9023",
    customer: "Lê Minh Khôi",
    phone: "0903.551.902",
    tag: "VIP Gold",
    source: "Website",
    service: "Cắt + Uốn Premlock Hàn Quốc",
    barber: "Eric Vũ",
    chair: "Ghế 03",
    time: "15:00",
    duration: "90p",
    price: 550000,
    status: "in-progress",
    note: "Uốn xoăn lọn vừa tự nhiên",
  },
  {
    id: "BK-9024",
    customer: "Trần Quốc Bảo",
    phone: "0977.123.456",
    tag: "VIP Gold",
    source: "Zalo Mini App",
    service: "Combo Cắt + Gội Massage",
    barber: "Dũng Scissor",
    chair: "Ghế 05",
    time: "16:00",
    duration: "40p",
    price: 150000,
    status: "waiting",
    note: "Dùng dầu gội thảo dược bạc hà",
  },
  {
    id: "BK-9025",
    customer: "Đặng Quốc Khánh",
    phone: "0934.889.112",
    tag: "Walk-in",
    source: "Hotline VIP",
    service: "Cắt + Nhuộm Thời Trang Cao Cấp",
    barber: "Trung Barber",
    chair: "Ghế 07",
    time: "16:00",
    duration: "75p",
    price: 480000,
    status: "waiting",
    note: "Nhuộm nâu khói trầm không tẩy",
  },
  {
    id: "BK-9026",
    customer: "Vũ Đình Trọng",
    phone: "0965.998.711",
    tag: "Member",
    source: "Website",
    service: "Gội Dưỡng Sinh + Lấy Ráy Tai",
    barber: "Thảo Spa",
    chair: "Ghế 04",
    time: "16:00",
    duration: "45p",
    price: 220000,
    status: "waiting",
    note: "Massage cổ vai gáy chuyên sâu",
  },
  {
    id: "BK-9027",
    customer: "Lê Hoàng Nam",
    phone: "0905.667.889",
    tag: "VIP Diamond",
    source: "Hotline VIP",
    service: "Combo Đế Vương 7 Bước",
    barber: "Master Hoàng",
    chair: "Ghế 01",
    time: "17:00",
    duration: "45p",
    price: 350000,
    status: "waiting",
    note: "Chuẩn bị sẵn trà quế & khăn ấm",
  },
  {
    id: "BK-9028",
    customer: "Phạm Tuấn Hưng",
    phone: "0919.882.114",
    tag: "VIP Gold",
    source: "Zalo Mini App",
    service: "Skin Fade + Kẻ Line Nghệ Thuật",
    barber: "Tuấn Fade",
    chair: "Ghế 02",
    time: "18:00",
    duration: "40p",
    price: 200000,
    status: "waiting",
    note: "Kẻ 2 vạch line bên phải",
  },
  {
    id: "BK-9029",
    customer: "Bùi Anh Tuấn",
    phone: "0981.334.556",
    tag: "Member",
    source: "Website",
    service: "Cắt + Uốn Premlock Hàn Quốc",
    barber: "Eric Vũ",
    chair: "Ghế 03",
    time: "19:00",
    duration: "90p",
    price: 550000,
    status: "waiting",
    note: "Khách đặt cọc trước 100k",
  },
];

const HOURS_SLOTS = [
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function AppointmentManagement() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [barbersList, setBarbersList] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gb_sync_barbers_v1") || "null"
      );
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.map((b) => ({
          name: b.nickname || b.name || b.fullName || "Barber",
          chair:
            b.defaultChair ||
            (b.chair ? b.chair.split(" - ")[0] : "Ghế 03"),
          rank: b.level || b.rankLabel || b.rank || "Senior Barber",
          avatar:
            b.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        }));
      }
    } catch (e) {}
    return BARBERS_LIST;
  });

  const [bookings, setBookings] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("gb_sync_appointments_v1") || "null"
      );
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.map((a) => ({
          id: a.id,
          customer: a.customer,
          phone: a.phone,
          tag: a.tag || (a.isVip ? "VIP Diamond" : "Member"),
          source: a.source || "Website",
          service: a.service,
          barber: a.barber,
          chair: a.chair || "Ghế 01",
          time: (a.time || "16:00").split(" - ")[0],
          duration: a.duration || "45p",
          price: Number(a.price || 180000),
          status:
            a.status === "serving"
              ? "in-progress"
              : a.status === "done"
              ? "completed"
              : a.status || "waiting",
          note: a.note || a.notes || "Đặt lịch tại hệ thống",
        }));
      }
    } catch (e) {}
    return INITIAL_BOOKINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem("gb_sync_appointments_v1", JSON.stringify(bookings));
      window.dispatchEvent(new Event("gb-admin-sync"));
    } catch (e) {}
  }, [bookings]);
  const [currentView, setCurrentView] = useState("timeline");
  const [statusFilter, setStatusFilter] = useState("all");
  const [barberFilter, setBarberFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateDay, setDateDay] = useState("today");

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custService, setCustService] = useState(
    "Combo Đế Vương 7 Bước|350000|45p"
  );
  const [custBarber, setCustBarber] = useState("Master Hoàng|Ghế 01");
  const [custTime, setCustTime] = useState("17:00");
  const [custTag, setCustTag] = useState("VIP Diamond");
  const [custSource, setCustSource] = useState("Zalo Mini App");
  const [custNote, setCustNote] = useState("");

  // Invoice Modal State
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // KPI calculations
  const totalCount = bookings.length;
  const completedCount = bookings.filter(
    (b) => b.status === "completed"
  ).length;
  const inProgressCount = bookings.filter(
    (b) => b.status === "in-progress"
  ).length;
  const waitingCount = bookings.filter((b) => b.status === "waiting").length;
  const vipCount = bookings.filter((b) => b.tag.includes("VIP")).length;
  const totalRev = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.price, 0);

  const filteredBookings = bookings.filter((b) => {
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchBarber =
      barberFilter === "all" ||
      b.barber === barberFilter ||
      String(b.barber || "").includes(barberFilter) ||
      String(barberFilter || "").includes(b.barber);
    const matchSource = sourceFilter === "all" || b.source === sourceFilter;
    const matchSearch =
      b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchBarber && matchSource && matchSearch;
  });

  const handleDateSwitch = (day) => {
    setDateDay(day);
    const label =
      day === "yesterday"
        ? "Hôm qua (10/11)"
        : day === "tomorrow"
        ? "Ngày mai (12/11)"
        : "Hôm nay (11/11)";
    showToast("Đã chuyển ngày xem lịch", `Đang hiển thị lịch hẹn của ${label}`);
  };

  const openModalWithSlot = (barberName, chairName, hourStr) => {
    setCustBarber(`${barberName}|${chairName}`);
    setCustTime(hourStr);
    setBookingModalOpen(true);
  };

  const changeBookingStatus = (id, newStatus) => {
    const item = bookings.find((b) => b.id === id);
    if (!item) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );

    if (newStatus === "in-progress") {
      showToast(
        "Check-in vào ghế thành công!",
        `Khách ${item.customer} đã vào ${item.chair} cùng ${item.barber}`
      );
    } else if (newStatus === "completed") {
      showToast(
        "Hoàn tất dịch vụ!",
        `Đã thu ${formatVND(item.price)} từ khách ${item.customer}`
      );
    } else if (newStatus === "cancelled") {
      showToast(
        "Đã hủy lịch hẹn",
        `Lịch hẹn #${item.id} của khách ${item.customer} đã được hủy`,
        "warning"
      );
    }
  };

  const handleCreateNewBooking = (e) => {
    e.preventDefault();
    const [serviceName, servicePrice, duration] = custService.split("|");
    const [barberName, chairName] = custBarber.split("|");
    const newId = "BK-" + Math.floor(9030 + Math.random() * 69);

    setBookings((prev) => [
      {
        id: newId,
        customer: custName.trim(),
        phone: custPhone.trim(),
        tag: custTag,
        source: custSource,
        service: serviceName,
        barber: barberName,
        chair: chairName,
        time: custTime,
        duration,
        price: Number(servicePrice),
        status: "waiting",
        note: custNote.trim() || "Không có ghi chú",
      },
      ...prev,
    ]);

    setBookingModalOpen(false);
    setCustName("");
    setCustPhone("");
    setCustNote("");
    showToast(
      "Đặt lịch hẹn thành công!",
      `Mã ${newId}: ${custName} lúc ${custTime} với ${barberName}`
    );
  };

  return (
    <AdminLayout activeKey="appointments" toast={toast}>
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
                    Quản Lý &amp; Điều Phối Lịch Đặt Hẹn
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <i className="fa-solid fa-bolt text-[10px]"></i> Đồng bộ
                    Zalo &amp; Web
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
              {/* Date Switcher */}
              <div className="hidden xl:flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 text-xs">
                {[
                  { key: "yesterday", label: "Hôm qua" },
                  { key: "today", label: "Hôm nay (11/11)" },
                  { key: "tomorrow", label: "Ngày mai" },
                ].map((d) => (
                  <button
                    key={d.key}
                    onClick={() => handleDateSwitch(d.key)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      dateDay === d.key
                        ? "bg-amber-500 text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-calendar-plus"></i>
                <span>Tạo Lịch Hẹn Mới</span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. APPOINTMENT KPI CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Lịch Hẹn Hôm Nay
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-regular fa-calendar-check"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {totalCount} Lượt
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    +12% so với hôm qua
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Doanh thu dự kiến:{" "}
                  <span className="text-amber-400 font-bold">
                    {formatVND(totalRev)}
                  </span>
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Đang Phục Vụ &amp; Hoàn Tất
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-scissors"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {completedCount + inProgressCount} / {totalCount}
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">
                    {inProgressCount} ghế đang cắt
                  </span>
                </div>
                <div className="mt-2.5 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{
                      width: `${Math.round(
                        ((completedCount + inProgressCount) /
                          Math.max(1, totalCount)) *
                          100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Khách Chờ Check-in
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-user-clock"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {waitingCount} Khách
                  </h3>
                  <span className="text-xs text-sky-400 font-semibold">
                    Sắp đến trong 2h tới
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Đã gửi tin nhắn Zalo ZNS nhắc lịch tự động
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Khách VIP &amp; Uốn/Nhuộm
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-crown"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {vipCount} Khách VIP
                  </h3>
                  <span className="text-xs text-purple-400 font-semibold">
                    Ưu tiên ghế Master
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Tỷ lệ khách đến đúng giờ đạt{" "}
                  <span className="text-emerald-400 font-semibold">96.4%</span>
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
                    placeholder="Tìm tên khách, SĐT, mã BK..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={barberFilter}
                  onChange={(e) => setBarberFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">
                    Tất cả Barber ({barbersList.length} đang trực)
                  </option>
                  {barbersList.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name} ({b.chair})
                    </option>
                  ))}
                </select>

                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Mọi nguồn đặt lịch</option>
                  <option value="Zalo Mini App">Zalo Mini App</option>
                  <option value="Website">Website Royal Barber</option>
                  <option value="Walk-in tại quầy">Walk-in tại quầy</option>
                  <option value="Hotline VIP">Hotline VIP</option>
                </select>

                <div className="flex flex-wrap items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                  {[
                    { key: "all", label: "Tất cả" },
                    { key: "in-progress", label: "Đang cắt" },
                    { key: "waiting", label: "Chờ đến" },
                    { key: "completed", label: "Hoàn tất" },
                    { key: "cancelled", label: "Đã hủy" },
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
                  onClick={() => setCurrentView("timeline")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                    currentView === "timeline"
                      ? "bg-amber-500 text-black"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-table-columns"></i> Ma Trận Giờ
                  &amp; Thợ
                </button>
                <button
                  onClick={() => setCurrentView("list")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    currentView === "list"
                      ? "bg-amber-500 text-black font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <i className="fa-solid fa-list-check"></i> Danh Sách Chi Tiết
                </button>
              </div>
            </section>

            {/* 3A. VIEW 1: VISUAL TIMELINE SCHEDULE BOARD */}
            {currentView === "timeline" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <i className="fa-solid fa-calendar-day text-amber-400"></i>
                      Bảng Điều Phối Khung Giờ Theo Thợ Barber (14:00 – 20:00)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Nhấp vào ô trống để xếp lịch nhanh cho thợ tại khung giờ
                      đó, hoặc nhấp vào thẻ lịch hẹn để xử lý
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-400"></span>{" "}
                      Đang cắt
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-sm bg-sky-400"></span>{" "}
                      Sắp tới
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400"></span>{" "}
                      Đã xong
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-sm bg-zinc-700"></span>{" "}
                      Còn trống
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll pb-2">
                  <div className="min-w-[980px]">
                    <div className="grid grid-cols-8 gap-2 pb-3 border-b border-zinc-800 text-xs font-bold text-zinc-400">
                      <div className="px-3 py-2 bg-zinc-900/80 rounded-xl flex items-center gap-2 text-white">
                        <i className="fa-solid fa-user-tie text-amber-400"></i>{" "}
                        Barber / Khung Giờ
                      </div>
                      {HOURS_SLOTS.map((h) => (
                        <div
                          key={h}
                          className={`px-3 py-2 text-center rounded-xl ${
                            h === "15:00"
                              ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                              : "bg-zinc-900/60"
                          }`}
                        >
                          {h} {h === "15:00" ? "(Hiện tại)" : ""}
                        </div>
                      ))}
                    </div>

                    <div className="divide-y divide-zinc-800/70 mt-2 space-y-2">
                      {barbersList.filter(
                        (b) => barberFilter === "all" || b.name === barberFilter
                      ).map((barber) => (
                        <div
                          key={barber.name}
                          className="grid grid-cols-8 gap-2 pt-2 items-stretch"
                        >
                          <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2.5">
                            <img
                              src={barber.avatar}
                              alt={barber.name}
                              className="w-10 h-10 rounded-xl object-cover ring-1 ring-amber-500/40 shrink-0"
                            />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">
                                {barber.name}
                              </h4>
                              <p className="text-[10px] text-amber-400 font-medium">
                                {barber.chair}
                              </p>
                              <p className="text-[10px] text-zinc-500 truncate">
                                {barber.rank}
                              </p>
                            </div>
                          </div>

                          {HOURS_SLOTS.map((hour) => {
                            const hourPrefix = hour.split(":")[0];
                            const found = filteredBookings.find(
                              (bk) =>
                                (bk.barber === barber.name ||
                                  String(bk.barber || "").includes(barber.name) ||
                                  String(barber.name || "").includes(bk.barber)) &&
                                (bk.time === hour ||
                                  String(bk.time || "").startsWith(hourPrefix + ":"))
                            );
                            if (found) {
                              const slotClass =
                                found.status === "in-progress"
                                  ? "slot-in-progress"
                                  : found.status === "waiting"
                                  ? "slot-waiting"
                                  : found.status === "completed"
                                  ? "slot-completed"
                                  : "slot-cancelled";
                              const statusLabel =
                                found.status === "in-progress"
                                  ? "Đang cắt"
                                  : found.status === "waiting"
                                  ? "Chờ khách"
                                  : found.status === "completed"
                                  ? "Hoàn tất"
                                  : "Đã hủy";

                              return (
                                <div
                                  key={hour}
                                  onClick={() => setSelectedInvoice(found)}
                                  className={`p-2.5 rounded-xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${slotClass}`}
                                >
                                  <div>
                                    <div className="flex items-center justify-between text-[10px] font-bold">
                                      <span className="text-white truncate">
                                        {found.customer}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-zinc-300 truncate mt-0.5">
                                      {found.service}
                                    </p>
                                  </div>
                                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/10 text-[10px]">
                                    <span className="text-amber-300 font-bold">
                                      {formatVND(found.price)}
                                    </span>
                                    <span className="opacity-80">
                                      {statusLabel}
                                    </span>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <button
                                key={hour}
                                onClick={() =>
                                  openModalWithSlot(
                                    barber.name,
                                    barber.chair,
                                    hour
                                  )
                                }
                                className="p-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all flex flex-col items-center justify-center group min-h-[78px]"
                              >
                                <i className="fa-solid fa-plus text-xs text-zinc-700 group-hover:text-amber-400 transition-colors"></i>
                                <span className="text-[10px] text-zinc-600 group-hover:text-amber-300 mt-1">
                                  Xếp lịch {hour}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* 3B. VIEW 2: FULL APPOINTMENTS TABLE */}
            {currentView === "list" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Danh Sách Chi Tiết Tất Cả Lịch Hẹn
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Quản lý trạng thái Check-in, thanh toán hóa đơn và ghi chú
                      kiểu tóc của khách
                    </p>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Đang hiển thị:{" "}
                    <span className="font-bold text-amber-400">
                      {filteredBookings.length}
                    </span>{" "}
                    lịch hẹn
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3.5 px-3 font-semibold">
                          Mã / Khung Giờ
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Khách Hàng &amp; Phân Hạng
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Gói Dịch Vụ &amp; Ghi Chú
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Thợ Barber / Ghế
                        </th>
                        <th className="py-3.5 px-3 font-semibold">Nguồn Đặt</th>
                        <th className="py-3.5 px-3 font-semibold">Thành Tiền</th>
                        <th className="py-3.5 px-3 font-semibold">Trạng Thái</th>
                        <th className="py-3.5 px-3 font-semibold text-right">
                          Thao Tác Nhanh
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredBookings.map((item) => {
                        let statusBadge = null;
                        let actions = null;

                        if (item.status === "in-progress") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 status-dot-pulse"></span>{" "}
                              Đang phục vụ
                            </span>
                          );
                          actions = (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  changeBookingStatus(item.id, "completed")
                                }
                                className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-colors"
                              >
                                <i className="fa-solid fa-check mr-1"></i>Hoàn
                                tất
                              </button>
                              <button
                                onClick={() => setSelectedInvoice(item)}
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                              >
                                <i className="fa-solid fa-receipt"></i>
                              </button>
                            </div>
                          );
                        } else if (item.status === "waiting") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold">
                              <i className="fa-regular fa-clock text-[10px]"></i>{" "}
                              Chờ khách đến
                            </span>
                          );
                          actions = (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  changeBookingStatus(item.id, "in-progress")
                                }
                                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors"
                              >
                                Check-in ghế
                              </button>
                              <button
                                onClick={() =>
                                  changeBookingStatus(item.id, "cancelled")
                                }
                                title="Hủy lịch"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400"
                              >
                                <i className="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                          );
                        } else if (item.status === "completed") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                              <i className="fa-solid fa-check-double text-[10px]"></i>{" "}
                              Đã thanh toán
                            </span>
                          );
                          actions = (
                            <button
                              onClick={() => setSelectedInvoice(item)}
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium"
                            >
                              <i className="fa-solid fa-print text-amber-400 mr-1"></i>
                              In Bill
                            </button>
                          );
                        } else {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold">
                              Đã hủy
                            </span>
                          );
                          actions = (
                            <button
                              onClick={() =>
                                changeBookingStatus(item.id, "waiting")
                              }
                              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-[11px]"
                            >
                              Khôi phục
                            </button>
                          );
                        }

                        return (
                          <tr
                            key={item.id}
                            className="hover:bg-zinc-900/50 transition-colors"
                          >
                            <td className="py-3.5 px-3">
                              <span className="font-mono font-bold text-amber-400 block">
                                {item.id}
                              </span>
                              <span className="text-[11px] text-zinc-300 font-semibold">
                                {item.time}
                              </span>
                              <span className="text-[10px] text-zinc-500">
                                ({item.duration})
                              </span>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-white">
                                {item.customer}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[11px] text-zinc-400">
                                  {item.phone}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-zinc-800 text-amber-300 rounded border border-zinc-700">
                                  {item.tag}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-semibold text-zinc-100">
                                {item.service}
                              </div>
                              <div className="text-[11px] text-zinc-400 italic mt-0.5">
                                <i className="fa-regular fa-comment-dots text-amber-400/80 mr-1"></i>
                                {item.note}
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-bold text-white">
                                {item.barber}
                              </div>
                              <span className="text-[11px] text-amber-400">
                                {item.chair}
                              </span>
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                                {item.source}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-amber-400">
                              {formatVND(item.price)}
                            </td>
                            <td className="py-3.5 px-3">{statusBadge}</td>
                            <td className="py-3.5 px-3 text-right">{actions}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 4. BOTTOM ROW: WAITING QUEUE & BOOKING CHANNELS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <i className="fa-solid fa-couch text-amber-400"></i>
                      Hàng Đợi Khách Sắp Đến &amp; Khách Ngồi Chờ Tại Sofa
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Lễ tân chuẩn bị nước mời và sắp xếp ghế ngay khi Barber
                      hoàn tất ca trước
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold">
                    Ưu tiên theo giờ hẹn
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {bookings
                    .filter((b) => b.status === "waiting")
                    .slice(0, 4)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500 text-black font-bold text-[11px]">
                              {item.time}
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              {item.customer}
                            </h4>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300">
                            {item.service}
                          </p>
                          <p className="text-[11px] text-zinc-500">
                            Thợ:{" "}
                            <strong className="text-zinc-300">
                              {item.barber}
                            </strong>{" "}
                            ({item.chair}) • {item.source}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            changeBookingStatus(item.id, "in-progress")
                          }
                          className="px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-bold text-xs border border-amber-500/30 transition-all shrink-0"
                        >
                          Mời vào ghế
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Tỷ Trọng Nguồn Đặt Lịch
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Thống kê kênh khách hàng đặt hẹn nhiều nhất
                  </p>

                  <div className="mt-5 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-medium flex items-center gap-2">
                          <i className="fa-solid fa-comment-sms text-sky-400"></i>{" "}
                          Zalo Mini App Official
                        </span>
                        <span className="font-bold text-white">
                          46% (22 lượt)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-sky-400 h-full rounded-full"
                          style={{ width: "46%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-medium flex items-center gap-2">
                          <i className="fa-solid fa-globe text-amber-400"></i>{" "}
                          Website RoyalBarber.vn
                        </span>
                        <span className="font-bold text-white">
                          29% (14 lượt)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-400 h-full rounded-full"
                          style={{ width: "29%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-medium flex items-center gap-2">
                          <i className="fa-solid fa-person-walking text-emerald-400"></i>{" "}
                          Khách Vãng Lai (Walk-in)
                        </span>
                        <span className="font-bold text-white">
                          15% (7 lượt)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-zinc-300 font-medium flex items-center gap-2">
                          <i className="fa-solid fa-phone-volume text-purple-400"></i>{" "}
                          Tổng Đài Hotline VIP
                        </span>
                        <span className="font-bold text-white">
                          10% (5 lượt)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-400 h-full rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
                  <div className="text-xs">
                    <p className="font-bold text-amber-300">
                      Tự động nhắc lịch qua Zalo
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Gửi trước 30 phút giúp giảm 80% tỷ lệ hủy hẹn
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-[11px] font-bold">
                    Đang Bật
                  </span>
                </div>
              </div>
            </section>
          </main>

          {/* MODAL 1: CREATE NEW BOOKING */}
          {bookingModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-calendar-plus"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Tạo Lịch Đặt Hẹn Mới
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Chọn khung giờ, thợ cắt và gói dịch vụ cho khách hàng
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <form
                  onSubmit={handleCreateNewBooking}
                  className="p-6 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Họ Tên Khách Hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="VD: Nguyễn Minh Quân"
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
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="VD: 0909 888 999"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Gói Dịch Vụ *
                      </label>
                      <select
                        value={custService}
                        onChange={(e) => setCustService(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Combo Đế Vương 7 Bước|350000|45p">
                          Combo Đế Vương 7 Bước (350.000₫)
                        </option>
                        <option value="Combo Cắt + Gội Massage|150000|40p">
                          Combo Cắt + Gội Massage (150.000₫)
                        </option>
                        <option value="Skin Fade + Cạo Khăn Nóng|180000|35p">
                          Skin Fade + Cạo Khăn Nóng (180.000₫)
                        </option>
                        <option value="Cắt + Uốn Premlock Hàn Quốc|550000|90p">
                          Cắt + Uốn Premlock Hàn Quốc (550.000₫)
                        </option>
                        <option value="Cắt + Nhuộm Thời Trang Cao Cấp|480000|75p">
                          Cắt + Nhuộm Thời Trang Cao Cấp (480.000₫)
                        </option>
                        <option value="Gội Dưỡng Sinh + Lấy Ráy Tai|220000|45p">
                          Gội Dưỡng Sinh + Lấy Ráy Tai (220.000₫)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Chỉ Định Thợ Barber *
                      </label>
                      <select
                        value={custBarber}
                        onChange={(e) => setCustBarber(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        {barbersList.map((b) => (
                          <option key={b.name} value={`${b.name}|${b.chair}`}>
                            {b.name} ({b.chair})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Khung Giờ Hẹn *
                      </label>
                      <select
                        value={custTime}
                        onChange={(e) => setCustTime(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        {HOURS_SLOTS.map((h) => (
                          <option key={h} value={h}>
                            {h}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Hạng Thẻ Khách
                      </label>
                      <select
                        value={custTag}
                        onChange={(e) => setCustTag(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="VIP Diamond">VIP Diamond</option>
                        <option value="VIP Gold">VIP Gold</option>
                        <option value="Member">Hội viên</option>
                        <option value="Walk-in">Khách vãng lai</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nguồn Đặt Lịch
                      </label>
                      <select
                        value={custSource}
                        onChange={(e) => setCustSource(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Zalo Mini App">Zalo Mini App</option>
                        <option value="Website">Website</option>
                        <option value="Walk-in tại quầy">
                          Walk-in tại quầy
                        </option>
                        <option value="Hotline VIP">Hotline VIP</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Ghi chú kiểu tóc / Yêu cầu riêng của khách
                    </label>
                    <input
                      type="text"
                      value={custNote}
                      onChange={(e) => setCustNote(e.target.value)}
                      placeholder="VD: Cắt Skin Fade sát 0mm, giữ đỉnh dài vuốt Pomade, cạo khăn nóng..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <i className="fa-solid fa-check mr-1.5"></i> Lưu Lịch Hẹn
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 2: QUICK INVOICE / BOOKING DETAIL */}
          {selectedInvoice && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-dashed border-zinc-700 text-center relative">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                    <i className="fa-solid fa-scissors"></i>
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white tracking-wider">
                    ROYAL BARBER CLUB
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Phiếu Xác Nhận Dịch Vụ &amp; Thanh Toán POS
                  </p>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Mã đặt hẹn:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      #{selectedInvoice.id} ({selectedInvoice.time})
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Khách hàng:</span>
                    <span className="text-white font-semibold">
                      {selectedInvoice.customer} • {selectedInvoice.phone}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Barber phụ trách:</span>
                    <span className="text-emerald-400 font-semibold">
                      {selectedInvoice.barber} ({selectedInvoice.chair})
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Nguồn đặt lịch:</span>
                    <span className="text-zinc-200">
                      {selectedInvoice.source}
                    </span>
                  </div>

                  <div className="border-t border-b border-dashed border-zinc-700 py-3 my-2 space-y-2">
                    <div className="flex justify-between font-bold text-zinc-100">
                      <span>{selectedInvoice.service}</span>
                      <span>{formatVND(selectedInvoice.price)}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400 italic">
                      Ghi chú: {selectedInvoice.note}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-white pt-1">
                    <span>TỔNG THANH TOÁN:</span>
                    <span className="text-lg text-amber-400">
                      {formatVND(selectedInvoice.price)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950/60 border-t border-barber-border flex gap-2">
                  <button
                    onClick={() => {
                      changeBookingStatus(selectedInvoice.id, "completed");
                      setSelectedInvoice(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <i className="fa-solid fa-check-double"></i> Hoàn Tất &amp;
                    Thu Tiền
                  </button>
                  <button
                    onClick={() => {
                      setSelectedInvoice(null);
                      showToast(
                        "Đã gửi lệnh in",
                        "Đang in phiếu hóa đơn nhiệt K80 tại quầy thu ngân!"
                      );
                    }}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <i className="fa-solid fa-print"></i> In Bill
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
