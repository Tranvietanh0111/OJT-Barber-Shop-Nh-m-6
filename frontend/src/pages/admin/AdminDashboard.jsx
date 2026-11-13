// Phụ trách: Trần Văn Thắng
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";
import StationManagement from "./StationManagement";
import InventoryManagement from "./InventoryManagement";
import SystemSettings from "./SystemSettings";

const INITIAL_STATIONS = [
  {
    id: "01",
    name: "Ghế VIP 01",
    barber: "Master Hoàng",
    rank: "Master Barber",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Anh Tuấn Nguyễn",
    service: "Combo Đế Vương 7 Bước",
    timeLeft: "18 phút",
    progress: 70,
  },
  {
    id: "02",
    name: "Ghế Fade 02",
    barber: "Tuấn Fade",
    rank: "Senior Stylist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Hoàng Gia Bảo",
    service: "Skin Fade + Cạo mặt khăn nóng",
    timeLeft: "12 phút",
    progress: 80,
  },
  {
    id: "03",
    name: "Ghế Styling 03",
    barber: "Eric Vũ",
    rank: "Creative Stylist",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Lê Minh Khôi",
    service: "Cắt + Uốn Premlock Hàn Quốc",
    timeLeft: "35 phút",
    progress: 45,
  },
  {
    id: "04",
    name: "Ghế Spa 04",
    barber: "Thảo Spa",
    rank: "Chuyên viên Gội & Ráy tai",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    status: "available",
    customer: "Sẵn sàng đón khách",
    service: "Gội dưỡng sinh / Ear Spa",
    timeLeft: "Trống",
    progress: 0,
  },
  {
    id: "05",
    name: "Ghế Classic 05",
    barber: "Dũng Scissor",
    rank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    status: "reserved",
    customer: "Trần Quốc Bảo (15:30)",
    service: "Giữ chỗ: Combo Cắt + Gội",
    timeLeft: "Sắp tới",
    progress: 0,
  },
  {
    id: "06",
    name: "Ghế Tattoo 06",
    barber: "Huy Tattoo Hair",
    rank: "Junior Barber",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Phạm Đức Duy",
    service: "Cắt Undercut + Kẻ Line nghệ thuật",
    timeLeft: "22 phút",
    progress: 60,
  },
  {
    id: "07",
    name: "Ghế Master 07",
    barber: "Trung Barber",
    rank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    status: "available",
    customer: "Sẵn sàng đón khách",
    service: "Đã khử trùng tia UV",
    timeLeft: "Trống",
    progress: 0,
  },
  {
    id: "08",
    name: "Giường Gội 08",
    barber: "Lan Hương",
    rank: "Chuyên viên Spa",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    status: "cleaning",
    customer: "Đang vệ sinh khử trùng",
    service: "Thay khăn & Khử khuẩn dụng cụ",
    timeLeft: "3 phút",
    progress: 90,
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: "BK-9021",
    customer: "Nguyễn Anh Tuấn",
    phone: "0988.412.889",
    tag: "VIP Diamond",
    service: "Combo Đế Vương 7 Bước",
    barber: "Master Hoàng",
    chair: "Ghế 01",
    time: "15:00",
    date: "Hôm nay",
    price: 350000,
    status: "in-progress",
  },
  {
    id: "BK-9022",
    customer: "Hoàng Gia Bảo",
    phone: "0912.678.334",
    tag: "Khách quen",
    service: "Skin Fade + Cạo khăn nóng",
    barber: "Tuấn Fade",
    chair: "Ghế 02",
    time: "15:10",
    date: "Hôm nay",
    price: 180000,
    status: "in-progress",
  },
  {
    id: "BK-9023",
    customer: "Lê Minh Khôi",
    phone: "0903.551.902",
    tag: "Member",
    service: "Cắt + Uốn Premlock Hàn Quốc",
    barber: "Eric Vũ",
    chair: "Ghế 03",
    time: "14:45",
    date: "Hôm nay",
    price: 550000,
    status: "in-progress",
  },
  {
    id: "BK-9024",
    customer: "Trần Quốc Bảo",
    phone: "0977.123.456",
    tag: "VIP Gold",
    service: "Combo Cắt + Gội Massage",
    barber: "Dũng Scissor",
    chair: "Ghế 05",
    time: "15:30",
    date: "Hôm nay",
    price: 150000,
    status: "waiting",
  },
  {
    id: "BK-9025",
    customer: "Đặng Quốc Khánh",
    phone: "0934.889.112",
    tag: "Khách mới",
    service: "Cắt + Nhuộm Phủ Bạc Thảo Dược",
    barber: "Trung Barber",
    chair: "Ghế 07",
    time: "16:00",
    date: "Hôm nay",
    price: 320000,
    status: "waiting",
  },
  {
    id: "BK-9026",
    customer: "Vũ Đình Trọng",
    phone: "0965.998.711",
    tag: "Khách quen",
    service: "Gội Dưỡng Sinh + Lấy Ráy Tai",
    barber: "Thảo Spa",
    chair: "Ghế 04",
    time: "16:15",
    date: "Hôm nay",
    price: 180000,
    status: "waiting",
  },
  {
    id: "BK-9018",
    customer: "Phan Mạnh Quỳnh",
    phone: "0909.222.888",
    tag: "VIP Diamond",
    service: "Combo Đế Vương + Sáp Reuzel",
    barber: "Master Hoàng",
    chair: "Ghế 01",
    time: "14:00",
    date: "Hôm nay",
    price: 730000,
    status: "completed",
  },
  {
    id: "BK-9019",
    customer: "Ngô Kiến Huy",
    phone: "0918.777.666",
    tag: "Member",
    service: "Cắt tạo kiểu Layer Hàn Quốc",
    barber: "Tuấn Fade",
    chair: "Ghế 02",
    time: "14:15",
    date: "Hôm nay",
    price: 100000,
    status: "completed",
  },
  {
    id: "BK-9020",
    customer: "Trịnh Thăng Bình",
    phone: "0944.111.000",
    tag: "Walk-in",
    service: "Combo Cắt Gội 10 Bước",
    barber: "Dũng Scissor",
    chair: "Ghế 05",
    time: "13:30",
    date: "Hôm nay",
    price: 150000,
    status: "cancelled",
  },
];

const TOP_BARBERS = [
  {
    name: "Master Hoàng",
    title: "Master Barber • 9 năm KN",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    clients: 11,
    rating: "5.0",
    revenue: 3450000,
    commission: "35%",
  },
  {
    name: "Eric Vũ",
    title: "Chuyên gia Uốn / Nhuộm",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    clients: 7,
    rating: "4.95",
    revenue: 2680000,
    commission: "30%",
  },
  {
    name: "Tuấn Fade",
    title: "Senior Stylist • Skin Fade",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    clients: 9,
    rating: "4.92",
    revenue: 1720000,
    commission: "30%",
  },
  {
    name: "Thảo Spa",
    title: "Gội Dưỡng Sinh & Ear Spa",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    clients: 8,
    rating: "4.98",
    revenue: 1000000,
    commission: "25%",
  },
];

const INITIAL_INVENTORY = [
  {
    sku: "SP-01",
    name: "Sáp Reuzel Blue Pomade (113g)",
    brand: "Reuzel Holland",
    stock: 3,
    minStock: 10,
    price: 380000,
    status: "low",
  },
  {
    sku: "SP-02",
    name: "Lưỡi dao cạo đơn Feather Nhật",
    brand: "Feather Hi-Stainless",
    stock: 1,
    minStock: 5,
    price: 250000,
    status: "low",
  },
  {
    sku: "SP-03",
    name: "Xịt tạo phồng Pre-styling Bona Fide",
    brand: "Bona Fide USA",
    stock: 4,
    minStock: 8,
    price: 420000,
    status: "low",
  },
  {
    sku: "SP-04",
    name: "Sáp Kevin Murphy Rough Rider",
    brand: "Kevin Murphy",
    stock: 18,
    minStock: 6,
    price: 650000,
    status: "good",
  },
];

const REVIEWS_DATA = [
  {
    customer: "Anh Tuấn Nguyễn",
    barber: "Master Hoàng",
    service: "Combo Đế Vương 7 Bước",
    stars: 5,
    time: "14 phút trước",
    comment:
      "Cắt cực kỳ tỉ mỉ, cạo khăn nóng sảng khoái, không gian mùi gỗ đàn hương rất sang trọng!",
  },
  {
    customer: "Phan Mạnh Quỳnh",
    barber: "Eric Vũ",
    service: "Uốn Premlock Hàn Quốc",
    stars: 5,
    time: "1 giờ trước",
    comment:
      "Tóc vào nếp tự nhiên, thợ tư vấn nhiệt tình đúng form mặt. Sẽ ủng hộ dài lâu.",
  },
];

export default function AdminDashboard() {
  const location = useLocation();
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  // State for Overview Dashboard
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("gb_sync_appointments_v1") || "null");
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.map((a) => ({
          id: a.id,
          customer: a.customer,
          phone: a.phone,
          tag: a.tag || (a.isVip ? "VIP Diamond" : "Hội viên"),
          service: a.service,
          barber: a.barber,
          chair: a.chair || "Ghế 01",
          time: (a.time || "16:00").split(" - ")[0],
          date: a.date || "Hôm nay",
          price: Number(a.price || 180000),
          status:
            a.status === "serving"
              ? "in-progress"
              : a.status === "done"
              ? "completed"
              : a.status || "waiting",
        }));
      }
    } catch (e) {}
    return INITIAL_APPOINTMENTS;
  });
  const [barbersList, setBarbersList] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("gb_sync_barbers_v1") || "null");
      if (Array.isArray(saved) && saved.length > 0) {
        return saved.map((b) => ({
          id: b.id,
          name: b.nickname || b.fullName || b.name,
          fullName: b.fullName || b.nickname || b.name,
          title: `${b.level || b.rankLabel || "Senior Barber"} • ${b.experience || "3 năm KN"}`,
          avatar:
            b.avatar ||
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
          clients: b.cuts ?? b.todayCuts ?? 0,
          rating: String(b.rating ?? b.csat ?? "5.0"),
          revenue: Number(b.revenue ?? b.todayRevenue ?? 0),
          commission: `${b.commissionRate ?? 35}%`,
          chair: b.defaultChair || (b.chair ? b.chair.split(" - ")[0] : "Ghế 03"),
        }));
      }
    } catch (e) {}
    return TOP_BARBERS.map((b, i) => ({
      ...b,
      id: i + 1,
      fullName: b.name,
      chair: `Ghế 0${i + 1}`,
    }));
  });
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [totalRevenue, setTotalRevenue] = useState(8850000);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [barberFilter, setBarberFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [chartPeriod, setChartPeriod] = useState("today");

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custService, setCustService] = useState(
    "Combo Đế Vương 7 Bước|350000"
  );
  const [custBarber, setCustBarber] = useState("Hoàng Barber (Ghế 01)");
  const [custTime, setCustTime] = useState("16:30");
  const [custTag, setCustTag] = useState("VIP Diamond");
  const [custNote, setCustNote] = useState("");

  // Add Barber Modal State
  const [barberModalOpen, setBarberModalOpen] = useState(false);
  const [newBarberFullName, setNewBarberFullName] = useState("");
  const [newBarberNickname, setNewBarberNickname] = useState("");
  const [newBarberPhone, setNewBarberPhone] = useState("");
  const [newBarberLevel, setNewBarberLevel] = useState("Senior Barber");
  const [newBarberExp, setNewBarberExp] = useState("4 năm KN");
  const [newBarberCommission, setNewBarberCommission] = useState(35);
  const [newBarberChair, setNewBarberChair] = useState("Ghế 03");
  const [newBarberSkills, setNewBarberSkills] = useState(
    "Skin Fade, Uốn Texture, Cạo Khăn Nóng"
  );
  const [newBarberAvatar, setNewBarberAvatar] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  );

  // Invoice Modal State
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Chart Refs
  const revenueCanvasRef = useRef(null);
  const serviceCanvasRef = useRef(null);
  const revenueChartRef = useRef(null);
  const serviceChartRef = useRef(null);

  const hash = location.hash;
  const isOverview =
    !hash ||
    (hash !== "#stations" && hash !== "#inventory" && hash !== "#settings");

  useEffect(() => {
    if (!isOverview) return;
    if (!window.Chart) return;

    if (revenueChartRef.current) {
      revenueChartRef.current.destroy();
    }
    if (serviceChartRef.current) {
      serviceChartRef.current.destroy();
    }

    if (revenueCanvasRef.current) {
      const ctxRev = revenueCanvasRef.current.getContext("2d");
      const gradientGold = ctxRev.createLinearGradient(0, 0, 0, 260);
      gradientGold.addColorStop(0, "rgba(245, 158, 11, 0.38)");
      gradientGold.addColorStop(1, "rgba(245, 158, 11, 0.0)");

      const isWeek = chartPeriod === "week";
      const labels = isWeek
        ? ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"]
        : [
            "08:30",
            "10:00",
            "11:30",
            "13:00",
            "14:30",
            "16:00",
            "17:30",
            "19:00",
            "20:30",
          ];
      const dataValues = isWeek
        ? [6800, 7200, 8850, 7900, 9600, 14200, 15800]
        : [450, 920, 1350, 880, 1680, 1950, 2400, 2100, 1250];

      revenueChartRef.current = new window.Chart(ctxRev, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Doanh thu (Nghìn VNĐ)",
              data: dataValues,
              borderColor: "#f59e0b",
              backgroundColor: gradientGold,
              borderWidth: 2.5,
              pointBackgroundColor: "#fbbf24",
              pointBorderColor: "#09090b",
              pointBorderWidth: 2,
              pointRadius: 4,
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#18181b",
              borderColor: "#3f3f46",
              borderWidth: 1,
              titleColor: "#fbbf24",
              bodyColor: "#f4f4f5",
              callbacks: {
                label: (ctx) =>
                  " Doanh thu: " +
                  (ctx.parsed.y * 1000).toLocaleString("vi-VN") +
                  " ₫",
              },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(39, 39, 42, 0.5)" },
              ticks: { color: "#a1a1aa", font: { size: 11 } },
            },
            y: {
              grid: { color: "rgba(39, 39, 42, 0.5)" },
              ticks: {
                color: "#a1a1aa",
                font: { size: 11 },
                callback: (val) => val + "k",
              },
            },
          },
        },
      });
    }

    if (serviceCanvasRef.current) {
      const ctxSrv = serviceCanvasRef.current.getContext("2d");
      serviceChartRef.current = new window.Chart(ctxSrv, {
        type: "doughnut",
        data: {
          labels: [
            "Combo Đế Vương 7 Bước",
            "Uốn Premlock / Layer",
            "Skin Fade & Cạo Khăn Nóng",
            "Nhuộm & Mỹ Phẩm Sáp",
          ],
          datasets: [
            {
              data: [42, 26, 18, 14],
              backgroundColor: ["#f59e0b", "#10b981", "#38bdf8", "#a855f7"],
              borderColor: "#18181b",
              borderWidth: 3,
              hoverOffset: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "72%",
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    return () => {
      if (revenueChartRef.current) revenueChartRef.current.destroy();
      if (serviceChartRef.current) serviceChartRef.current.destroy();
    };
  }, [isOverview, chartPeriod]);

  // Handlers for Overview Dashboard
  const quickAssignStation = (chairId) => {
    const st = stations.find((s) => s.id === chairId);
    if (!st) return;
    setCustBarber(`${st.barber} (Ghế ${st.id})`);
    setBookingModalOpen(true);
  };

  const finishCleaning = (chairId) => {
    const st = stations.find((s) => s.id === chairId);
    if (!st) return;
    setStations((prev) =>
      prev.map((item) =>
        item.id === chairId
          ? {
              ...item,
              status: "available",
              customer: "Sẵn sàng đón khách",
              service: "Đã khử trùng tia UV",
              timeLeft: "Trống",
              progress: 0,
            }
          : item
      )
    );
    showToast(
      "Ghế đã sẵn sàng",
      `${st.name} (${st.barber}) đã khử trùng xong và sẵn sàng đón khách!`
    );
  };

  const inspectStation = (chairId) => {
    const st = stations.find((s) => s.id === chairId);
    if (!st) return;
    showToast(
      `${st.name} - ${st.barber}`,
      `Khách: ${st.customer} • ${st.service}`
    );
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const item = appointments.find((a) => a.id === bookingId);
    if (!item) return;

    setAppointments((prev) =>
      prev.map((a) => (a.id === bookingId ? { ...a, status: newStatus } : a))
    );

    if (newStatus === "in-progress") {
      showToast(
        "Check-in thành công!",
        `Khách ${item.customer} đã được mời vào ${item.chair} (${item.barber})`
      );
    } else if (newStatus === "completed") {
      setTotalRevenue((prev) => prev + item.price);
      showToast(
        "Hoàn tất & Cộng doanh thu!",
        `Đã thu ${formatVND(item.price)} từ khách ${item.customer}`
      );
    } else if (newStatus === "cancelled") {
      showToast(
        "Đã hủy lịch hẹn",
        `Lịch hẹn ${item.id} của ${item.customer} đã chuyển sang trạng thái hủy`,
        "warning"
      );
    }
  };

  const restockItem = (sku) => {
    const item = inventory.find((p) => p.sku === sku);
    if (!item) return;
    setInventory((prev) =>
      prev.map((p) =>
        p.sku === sku ? { ...p, stock: p.stock + 20, status: "good" } : p
      )
    );
    showToast(
      "Nhập kho thành công!",
      `Đã cộng thêm 20 đơn vị cho "${item.name}"`
    );
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const [serviceName, servicePrice] = custService.split("|");
    const barberName = custBarber.split(" (")[0];
    const chairMatch = custBarber.match(/\((.*?)\)/);
    const chairName = chairMatch ? chairMatch[1] : "Ghế 01";
    const newId = "BK-" + Math.floor(9027 + Math.random() * 70);
    const slotHour = (custTime || "16:00").split(":")[0].padStart(2, "0") + ":00";

    const newAppt = {
      id: newId,
      customer: custName.trim(),
      phone: custPhone.trim(),
      tag: custTag,
      isVip: custTag.includes("VIP"),
      service: serviceName,
      barber: barberName,
      chair: chairName,
      time: custTime,
      slotHour,
      date: "Hôm nay",
      price: Number(servicePrice),
      status: "waiting",
      notes: custNote,
    };

    setAppointments((prev) => {
      const updated = [newAppt, ...prev];
      try {
        const rawExisting = JSON.parse(
          localStorage.getItem("gb_sync_appointments_v1") || "[]"
        );
        const merged = [
          {
            ...newAppt,
            time: `${custTime} - ${custTime.split(":")[0]}:45`,
          },
          ...rawExisting,
        ];
        localStorage.setItem("gb_sync_appointments_v1", JSON.stringify(merged));

        // Sync Customer to CRM
        const rawCust = JSON.parse(
          localStorage.getItem("gb_sync_customers_v1") || "[]"
        );
        const cleanPhone = custPhone.replace(/\s+/g, "");
        if (
          !rawCust.some(
            (c) => (c.phone || "").replace(/\s+/g, "") === cleanPhone
          )
        ) {
          rawCust.unshift({
            id: `CUS-${Math.floor(9000 + Math.random() * 900)}`,
            name: custName.trim(),
            phone: custPhone.trim(),
            email: `${custName
              .trim()
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")}@gmail.com`,
            tier: custTag.includes("VIP") ? "vip" : "silver",
            tierLabel: custTag,
            visits: 1,
            totalSpent: Number(servicePrice),
            points: Math.round(Number(servicePrice) / 1000),
            favBarber: barberName,
            lastVisit: `Hôm nay (${custTime})`,
            notes: custNote || `Đặt lịch ${serviceName} (${newId})`,
          });
          localStorage.setItem("gb_sync_customers_v1", JSON.stringify(rawCust));
        }
        window.dispatchEvent(new Event("gb-admin-sync"));
      } catch (err) {}
      return updated;
    });

    setBookingModalOpen(false);
    setCustName("");
    setCustPhone("");
    setCustNote("");
    showToast(
      "Tạo lịch hẹn & Đồng bộ thành công!",
      `Mã ${newId}: ${custName} hẹn lúc ${custTime} với ${barberName} (đã cập nhật sang trang Lịch hẹn & Khách hàng)`
    );
  };

  const handleCreateBarber = (e) => {
    e.preventDefault();
    const displayNick = newBarberNickname.trim() || newBarberFullName.trim();
    const expNum =
      parseInt(String(newBarberExp).match(/\d+/)?.[0] || "3", 10) || 3;
    const rankKey = newBarberLevel.toLowerCase().includes("master")
      ? "master"
      : newBarberLevel.toLowerCase().includes("junior")
      ? "junior"
      : newBarberLevel.toLowerCase().includes("spa")
      ? "spa"
      : "senior";

    const newBarberRecord = {
      id: Date.now(),
      fullName: newBarberFullName.trim(),
      nickname: displayNick,
      name: displayNick,
      level: newBarberLevel,
      rank: rankKey,
      rankLabel: newBarberLevel,
      expYears: expNum,
      experience: `${expNum} năm KN`,
      title: `${newBarberLevel} • ${expNum} năm KN`,
      phone: newBarberPhone.trim(),
      email: `${displayNick.toLowerCase().replace(/\s+/g, "")}@gentleman.vn`,
      commissionRate: Number(newBarberCommission) || 35,
      commission: `${Number(newBarberCommission) || 35}%`,
      defaultChair: newBarberChair,
      chair: `${newBarberChair} - Standard`,
      status: "available",
      cuts: 0,
      todayCuts: 0,
      clients: 0,
      revenue: 0,
      todayRevenue: 0,
      rating: 5.0,
      csat: 5.0,
      votes: 1,
      reviewsCount: 1,
      retentionRate: 92,
      skills: newBarberSkills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      avatar:
        newBarberAvatar.trim() ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      bio: `Nghệ nhân ${displayNick} với ${expNum} năm kinh nghiệm chuyên sâu tại The Gentleman Barber.`,
      portfolioImages: [],
    };

    setBarbersList((prev) => [newBarberRecord, ...prev]);

    try {
      const existing = JSON.parse(
        localStorage.getItem("gb_sync_barbers_v1") || "[]"
      );
      const updated = [newBarberRecord, ...existing];
      localStorage.setItem("gb_sync_barbers_v1", JSON.stringify(updated));
      window.dispatchEvent(new Event("gb-admin-sync"));
    } catch (err) {}

    setBarberModalOpen(false);
    setNewBarberFullName("");
    setNewBarberNickname("");
    setNewBarberPhone("");
    showToast(
      "Đã thêm Barber & Đồng bộ!",
      `Thợ ${displayNick} đã được cập nhật sang Đội ngũ Barber, Lịch hẹn, Trạm ghế & Nhân sự!`
    );
  };

  const filteredAppointments = appointments.filter((item) => {
    const matchStatus =
      currentFilter === "all" || item.status === currentFilter;
    const matchBarber = barberFilter === "all" || item.barber === barberFilter;
    const matchSearch =
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchBarber && matchSearch;
  });

  if (hash === "#stations") {
    return (
      <AdminLayout activeKey="stations" toast={toast}>
        <StationManagement externalShowToast={showToast} />
      </AdminLayout>
    );
  }

  if (hash === "#inventory") {
    return (
      <AdminLayout activeKey="inventory" toast={toast}>
        <InventoryManagement externalShowToast={showToast} />
      </AdminLayout>
    );
  }

  if (hash === "#settings") {
    return (
      <AdminLayout activeKey="settings" toast={toast}>
        <SystemSettings externalShowToast={showToast} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activeKey="overview" toast={toast}>
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
                <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  Bảng Điều Khiển Trung Tâm
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Đang mở cửa đón khách
                  </span>
                </h2>
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
              <div className="relative hidden md:block w-72">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm tên khách, SĐT, mã lịch hẹn..."
                  className="w-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber-500/60 transition-colors"
                />
              </div>

              <button
                onClick={() => setBarberModalOpen(true)}
                className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/40 font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition-all active:scale-95"
              >
                <i className="fa-solid fa-user-plus"></i>
                <span className="hidden sm:inline">+ Thêm Barber</span>
              </button>

              <button
                onClick={() => setBookingModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Đặt Lịch Mới</span>
              </button>

              <button
                onClick={() =>
                  showToast(
                    "Thông báo hệ thống",
                    "Có 3 khách hẹn mới vừa đặt lịch qua Zalo Mini App!"
                  )
                }
                className="relative w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                <i className="fa-regular fa-bell"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                  4
                </span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE DASHBOARD BODY */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. TOP KPI SUMMARY CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Doanh Thu Hôm Nay
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-coins"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {formatVND(totalRevenue)}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <i className="fa-solid fa-arrow-trend-up"></i> +18.4%
                  </span>
                  <span className="text-zinc-500">Mục tiêu: 10.000.000 ₫</span>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Lượt Khách Hôm Nay
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-user-check"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">32 / 48</h3>
                  <span className="text-xs text-zinc-400">hoàn tất</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-medium">
                    6 đang cắt • 10 chờ
                  </span>
                  <span className="text-zinc-500">Hủy: 2</span>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Công Suất Ghế Cắt
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-chair"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">75%</h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    6/8 Ghế bận
                  </span>
                </div>
                <div className="mt-2 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Bán Lẻ Sáp &amp; Pomade
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-pump-soap"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">2.140.000 ₫</h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-purple-400 font-medium">
                    14 lọ đã bán
                  </span>
                  <span className="text-zinc-500">Reuzel, Kevin Murphy</span>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Đánh Giá Dịch Vụ
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">4.95</h3>
                  <div className="flex text-amber-400 text-xs">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-medium">
                    98% Hài lòng
                  </span>
                  <span className="text-zinc-500">128 đánh giá tuần</span>
                </div>
              </div>
            </section>

            {/* 2. LIVE BARBER STATION MONITOR */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-base font-bold text-white">
                      Sơ Đồ Ghế Cắt &amp; Vị Trí Thời Gian Thực
                    </h3>
                    <span className="text-[11px] bg-amber-500/15 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded-md font-semibold">
                      Tầng 1 &amp; Khu VIP Spa
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Nhấp vào từng ghế để chuyển trạng thái, gán khách mới hoặc
                    thanh toán nhanh
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{" "}
                    Đang phục vụ (4)
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>{" "}
                    Ghế trống (2)
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>{" "}
                    Khách đặt trước (1)
                  </span>
                  <span className="flex items-center gap-1.5 text-zinc-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>{" "}
                    Vệ sinh khử trùng (1)
                  </span>
                  <Link
                    to="/admin#stations"
                    className="text-amber-400 hover:underline font-semibold ml-2"
                  >
                    Mở Sơ Đồ Chi Tiết →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stations.map((s) => {
                  let cardClass = "chair-busy";
                  let badgeHtml = null;
                  let actionBtn = null;

                  if (s.status === "busy") {
                    cardClass = "chair-busy";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        Đang cắt • {s.timeLeft}
                      </span>
                    );
                    actionBtn = (
                      <button
                        onClick={() => inspectStation(s.id)}
                        className="mt-3 w-full py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 hover:text-black text-amber-300 text-xs font-semibold transition-colors"
                      >
                        Chi tiết tiến độ
                      </button>
                    );
                  } else if (s.status === "available") {
                    cardClass = "chair-available";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Ghế Trống
                      </span>
                    );
                    actionBtn = (
                      <button
                        onClick={() => quickAssignStation(s.id)}
                        className="mt-3 w-full py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-300 text-xs font-semibold transition-colors"
                      >
                        + Nhận khách ngay
                      </button>
                    );
                  } else if (s.status === "reserved") {
                    cardClass = "chair-reserved";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        Đặt trước
                      </span>
                    );
                    actionBtn = (
                      <button
                        onClick={() => inspectStation(s.id)}
                        className="mt-3 w-full py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500 hover:text-black text-sky-300 text-xs font-semibold transition-colors"
                      >
                        Xem lịch hẹn
                      </button>
                    );
                  } else {
                    cardClass = "chair-cleaning";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Khử trùng UV
                      </span>
                    );
                    actionBtn = (
                      <button
                        onClick={() => finishCleaning(s.id)}
                        className="mt-3 w-full py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500 hover:text-black text-purple-300 text-xs font-semibold transition-colors"
                      >
                        Kích hoạt sẵn sàng
                      </button>
                    );
                  }

                  return (
                    <div
                      key={s.id}
                      className={`rounded-2xl p-4 transition-all hover:-translate-y-0.5 flex flex-col justify-between ${cardClass}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <i className="fa-solid fa-chair text-amber-400"></i>{" "}
                            {s.name}
                          </span>
                          {badgeHtml}
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={s.avatar}
                            alt={s.barber}
                            className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-700"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-white leading-tight">
                              {s.barber}
                            </h4>
                            <p className="text-[11px] text-zinc-400">
                              {s.rank}
                            </p>
                          </div>
                        </div>
                        <div className="bg-zinc-950/60 rounded-xl p-2.5 border border-zinc-800/80">
                          <p className="text-xs font-semibold text-zinc-200 truncate">
                            <i className="fa-regular fa-user text-amber-400 mr-1"></i>{" "}
                            {s.customer}
                          </p>
                          <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                            {s.service}
                          </p>
                          {s.progress > 0 && (
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-2">
                              <div
                                className="bg-amber-400 h-full rounded-full"
                                style={{ width: `${s.progress}%` }}
                              ></div>
                            </div>
                          )}
                        </div>
                      </div>
                      {actionBtn}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3. CHARTS ROW */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Lưu Lượng Khách &amp; Doanh Thu Theo Giờ Trong Ngày
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Khung giờ vàng cao điểm: 16:30 – 19:30 (Khuyến nghị tăng
                      ca Barber)
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                    <button
                      onClick={() => setChartPeriod("today")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        chartPeriod === "today"
                          ? "bg-amber-500 text-black"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Hôm nay
                    </button>
                    <button
                      onClick={() => setChartPeriod("week")}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        chartPeriod === "week"
                          ? "bg-amber-500 text-black"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      7 Ngày qua
                    </button>
                  </div>
                </div>
                <div className="h-64 w-full">
                  <canvas ref={revenueCanvasRef}></canvas>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Cơ Cấu Dịch Vụ Được Yêu Thích
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Tỷ trọng doanh thu theo nhóm dịch vụ
                  </p>
                </div>
                <div className="h-48 w-full my-2 flex items-center justify-center">
                  <canvas ref={serviceCanvasRef}></canvas>
                </div>
                <div className="space-y-2 text-xs border-t border-zinc-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{" "}
                      Combo Đế Vương 7 Bước
                    </span>
                    <span className="font-bold text-white">42%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>{" "}
                      Uốn Premlock / Layer Hàn
                    </span>
                    <span className="font-bold text-white">26%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>{" "}
                      Skin Fade &amp; Cạo Khăn Nóng
                    </span>
                    <span className="font-bold text-white">18%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>{" "}
                      Nhuộm Màu &amp; Gội Dưỡng Sinh
                    </span>
                    <span className="font-bold text-white">14%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. APPOINTMENTS & RIGHT SIDEBAR */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Quản Lý Lịch Đặt Hẹn Hôm Nay
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Cập nhật tự động từ Website, Zalo Mini App &amp; Khách
                      vãng lai (Walk-in)
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { key: "all", label: "Tất cả" },
                      { key: "in-progress", label: "Đang cắt" },
                      { key: "waiting", label: "Chờ phục vụ" },
                      { key: "completed", label: "Đã xong" },
                      { key: "cancelled", label: "Đã hủy" },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => setCurrentFilter(tab.key)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          currentFilter === tab.key
                            ? "bg-amber-500 text-black font-bold border-amber-500"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter by Barber */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">
                      Lọc theo Barber:
                    </span>
                    <select
                      value={barberFilter}
                      onChange={(e) => setBarberFilter(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-500"
                    >
                      <option value="all">
                        Tất cả thợ cắt ({barbersList.length})
                      </option>
                      {barbersList.map((b) => (
                        <option key={b.id || b.name} value={b.name}>
                          {b.name} ({b.chair || "Salon"})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-xs text-zinc-400">
                    Hiển thị{" "}
                    <span className="font-bold text-amber-400">
                      {filteredAppointments.length}
                    </span>{" "}
                    lịch hẹn
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3 px-3 font-semibold">
                          Mã / Giờ Hẹn
                        </th>
                        <th className="py-3 px-3 font-semibold">Khách Hàng</th>
                        <th className="py-3 px-3 font-semibold">
                          Dịch Vụ Đăng Ký
                        </th>
                        <th className="py-3 px-3 font-semibold">
                          Barber &amp; Ghế
                        </th>
                        <th className="py-3 px-3 font-semibold">Tổng Tiền</th>
                        <th className="py-3 px-3 font-semibold">Trạng Thái</th>
                        <th className="py-3 px-3 font-semibold text-right">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredAppointments.map((item) => {
                        let statusBadge = null;
                        let actionButtons = null;

                        if (item.status === "in-progress") {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 status-dot-pulse"></span>{" "}
                              Đang phục vụ
                            </span>
                          );
                          actionButtons = (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  updateBookingStatus(item.id, "completed")
                                }
                                title="Hoàn tất & Tính tiền"
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 hover:text-black text-emerald-400 font-semibold transition-colors"
                              >
                                <i className="fa-solid fa-check mr-1"></i>Xong
                              </button>
                              <button
                                onClick={() => setSelectedInvoice(item)}
                                title="In hóa đơn"
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
                          actionButtons = (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() =>
                                  updateBookingStatus(item.id, "in-progress")
                                }
                                className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors"
                              >
                                Check-in
                              </button>
                              <button
                                onClick={() =>
                                  updateBookingStatus(item.id, "cancelled")
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
                          actionButtons = (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedInvoice(item)}
                                className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium"
                              >
                                <i className="fa-solid fa-print mr-1 text-amber-400"></i>
                                Hóa đơn
                              </button>
                            </div>
                          );
                        } else {
                          statusBadge = (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 font-semibold">
                              Đã hủy
                            </span>
                          );
                          actionButtons = (
                            <span className="text-zinc-600 text-[11px] italic">
                              Đã đóng
                            </span>
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
                              <span className="text-[11px] text-zinc-400">
                                {item.time} • {item.date}
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
                                <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-amber-300 rounded border border-zinc-700">
                                  {item.tag}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="font-medium text-zinc-200">
                                {item.service}
                              </span>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="font-semibold text-white">
                                {item.barber}
                              </div>
                              <span className="text-[11px] text-zinc-500">
                                {item.chair}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-bold text-amber-400">
                              {formatVND(item.price)}
                            </td>
                            <td className="py-3.5 px-3">{statusBadge}</td>
                            <td className="py-3.5 px-3 text-right">
                              {actionButtons}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column Widgets */}
              <div className="space-y-6">
                {/* Top Barbers */}
                <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Top Doanh Số Thợ Hôm Nay
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Tính lương &amp; hoa hồng trực tiếp
                      </p>
                    </div>
                    <span className="text-xs text-amber-400 font-semibold">
                      Thưởng KPI
                    </span>
                  </div>

                  <div className="space-y-3.5">
                    {barbersList.slice(0, 5).map((b, idx) => (
                      <div
                        key={b.id || b.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 hover:border-amber-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={b.avatar}
                              alt={b.name}
                              className="w-11 h-11 rounded-xl object-cover"
                            />
                            <span className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-amber-500 text-black font-bold text-[10px] flex items-center justify-center shadow">
                              #{idx + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {b.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400">
                              {b.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-[11px]">
                              <span className="text-emerald-400 font-medium">
                                {b.clients} khách
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-amber-400">
                                <i className="fa-solid fa-star text-[10px]"></i>{" "}
                                {b.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-amber-400">
                            {formatVND(b.revenue)}
                          </div>
                          <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                            Hoa hồng: {b.commission}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-base flex items-center gap-2">
                        Kho Sáp &amp; Vật Tư Tiêu Hao
                        <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          3 Sắp hết
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Cảnh báo tự động khi dưới ngưỡng an toàn
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {inventory.map((p) => {
                      const isLow = p.stock <= p.minStock;
                      return (
                        <div
                          key={p.sku}
                          className={`flex items-center justify-between p-3 rounded-xl ${
                            isLow
                              ? "bg-rose-950/20 border border-rose-500/30"
                              : "bg-zinc-900/60 border border-zinc-800"
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-white">
                                {p.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-[11px]">
                              <span className="text-zinc-400">{p.brand}</span>
                              <span className="text-zinc-600">•</span>
                              <span
                                className={
                                  isLow
                                    ? "text-rose-400 font-bold"
                                    : "text-emerald-400 font-semibold"
                                }
                              >
                                Tồn kho: {p.stock} hộp
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => restockItem(p.sku)}
                            className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-amber-400 text-xs font-semibold transition-colors shrink-0"
                          >
                            + Nhập thêm
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-base">
                      Phản Hồi Khách Hàng Vừa Cắt
                    </h3>
                    <span className="text-xs text-emerald-400 font-medium">
                      Trực tiếp từ QR Quầy
                    </span>
                  </div>
                  <div className="space-y-3">
                    {REVIEWS_DATA.map((r, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 text-xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">
                            {r.customer}
                          </span>
                          <span className="text-amber-400">
                            {"★".repeat(r.stars)}
                          </span>
                        </div>
                        <p className="text-zinc-300 italic">"{r.comment}"</p>
                        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
                          <span>
                            Barber:{" "}
                            <strong className="text-zinc-300">
                              {r.barber}
                            </strong>{" "}
                            ({r.service})
                          </span>
                          <span>{r.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* MODAL 1: CREATE NEW BOOKING / WALK-IN */}
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
                        Tạo Lịch Hẹn Mới / Khách Walk-in
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Gán ghế và thợ cắt trực tiếp vào ca làm việc
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

                <form onSubmit={handleCreateBooking} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Tên Khách Hàng *
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
                        Chọn Gói Dịch Vụ *
                      </label>
                      <select
                        value={custService}
                        onChange={(e) => setCustService(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Combo Đế Vương 7 Bước|350000">
                          Combo Đế Vương 7 Bước (350.000₫)
                        </option>
                        <option value="Cắt Tạo Kiểu + Gội Massage|150000">
                          Cắt Tạo Kiểu + Gội Massage (150.000₫)
                        </option>
                        <option value="Skin Fade + Cạo Khăn Nóng|180000">
                          Skin Fade + Cạo Khăn Nóng (180.000₫)
                        </option>
                        <option value="Cắt + Uốn Premlock Hàn Quốc|550000">
                          Cắt + Uốn Premlock Hàn Quốc (550.000₫)
                        </option>
                        <option value="Cắt + Nhuộm Thời Trang Cao Cấp|480000">
                          Cắt + Nhuộm Thời Trang Cao Cấp (480.000₫)
                        </option>
                        <option value="Gội Dưỡng Sinh + Lấy Ráy Tai Hoàng Gia|220000">
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
                        {barbersList.map((b) => {
                          const val = `${b.name} (${b.chair || "Ghế 01"})`;
                          return (
                            <option key={b.id || b.name} value={val}>
                              {val}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Giờ Hẹn *
                      </label>
                      <input
                        type="time"
                        required
                        value={custTime}
                        onChange={(e) => setCustTime(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Phân Hạng Khách
                      </label>
                      <select
                        value={custTag}
                        onChange={(e) => setCustTag(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="VIP Diamond">Khách VIP Diamond</option>
                        <option value="Hội viên">Hội viên Thân thiết</option>
                        <option value="Walk-in">Khách vãng lai (Walk-in)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Ghi chú kiểu tóc / Yêu cầu đặc biệt
                    </label>
                    <input
                      type="text"
                      value={custNote}
                      onChange={(e) => setCustNote(e.target.value)}
                      placeholder="VD: Fade sát hai bên, giữ độ dài mái vuốt Pomade..."
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
                      <i className="fa-solid fa-check mr-1.5"></i> Xác Nhận Đặt
                      Lịch
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 2: QUICK POS INVOICE PREVIEW */}
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
                    88 Phố Cổ, Hoàn Kiếm, Hà Nội • Hotline: 1900 8888
                  </p>
                </div>

                <div className="p-5 space-y-3 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Mã hóa đơn:</span>
                    <span className="font-mono text-white font-semibold">
                      #{selectedInvoice.id}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Khách hàng:</span>
                    <span className="text-white font-semibold">
                      {selectedInvoice.customer} ({selectedInvoice.phone})
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Thợ thực hiện:</span>
                    <span className="text-amber-400 font-semibold">
                      {selectedInvoice.barber} • {selectedInvoice.chair}
                    </span>
                  </div>

                  <div className="border-t border-b border-dashed border-zinc-700 py-3 my-2 space-y-2">
                    <div className="flex justify-between font-medium text-zinc-200">
                      <span>{selectedInvoice.service}</span>
                      <span>{formatVND(selectedInvoice.price)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Khăn lạnh &amp; Trà quế đón khách</span>
                      <span className="text-emerald-400">Miễn phí</span>
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
                      setSelectedInvoice(null);
                      showToast(
                        "Đang in hóa đơn nhiệt",
                        "Đã gửi lệnh in Bill K80 ra máy in quầy thu ngân!"
                      );
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <i className="fa-solid fa-print"></i> In Hóa Đơn &amp; Mở
                    Két Tiền
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL 3: ADD NEW BARBER */}
          {barberModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Thêm Thợ Barber Mới
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Đồng bộ tự động sang Đội ngũ Barber, Lịch hẹn &amp; Sơ
                        đồ ghế
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

                <form onSubmit={handleCreateBarber} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Họ và Tên Đầy Đủ *
                      </label>
                      <input
                        type="text"
                        required
                        value={newBarberFullName}
                        onChange={(e) => setNewBarberFullName(e.target.value)}
                        placeholder="VD: Nguyễn Minh Khôi"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nghệ Danh (Nickname) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newBarberNickname}
                        onChange={(e) => setNewBarberNickname(e.target.value)}
                        placeholder="VD: Khôi Blade"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Số Điện Thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={newBarberPhone}
                        onChange={(e) => setNewBarberPhone(e.target.value)}
                        placeholder="VD: 0905 678 910"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Cấp Bậc Chuyên Môn
                      </label>
                      <select
                        value={newBarberLevel}
                        onChange={(e) => setNewBarberLevel(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Master Barber">Master Barber</option>
                        <option value="Senior Barber">Senior Barber</option>
                        <option value="Junior Barber">Junior Barber</option>
                        <option value="Skinner / Spa">Skinner / Spa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Kinh Nghiệm
                      </label>
                      <input
                        type="text"
                        value={newBarberExp}
                        onChange={(e) => setNewBarberExp(e.target.value)}
                        placeholder="4 năm KN"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Hoa Hồng (%)
                      </label>
                      <input
                        type="number"
                        min="10"
                        max="70"
                        value={newBarberCommission}
                        onChange={(e) => setNewBarberCommission(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Ghế Phụ Trách
                      </label>
                      <select
                        value={newBarberChair}
                        onChange={(e) => setNewBarberChair(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Ghế 01 (VIP)">Ghế 01 (VIP)</option>
                        <option value="Ghế 02">Ghế 02</option>
                        <option value="Ghế 03">Ghế 03</option>
                        <option value="Ghế 04 (Gội)">Ghế 04 (Gội)</option>
                        <option value="Ghế 05">Ghế 05</option>
                        <option value="Ghế 06">Ghế 06</option>
                        <option value="Ghế 07">Ghế 07</option>
                        <option value="Ghế 08 (Gội)">Ghế 08 (Gội)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Kỹ Năng Thế Mạnh (cách nhau dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={newBarberSkills}
                      onChange={(e) => setNewBarberSkills(e.target.value)}
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
        </>
      )}
    </AdminLayout>
  );
}
