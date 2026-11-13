// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import { formatVND, useLiveClock, useAdminToast } from "./AdminSidebar";

const INITIAL_STATIONS = [
  {
    id: "01",
    name: "Ghế VIP 01",
    zone: "Khu Cắt Chính • Tầng 1",
    type: "hair",
    barber: "Master Hoàng",
    barberRank: "Master Barber",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Anh Tuấn Nguyễn",
    customerTag: "VIP Diamond",
    service: "Combo Đế Vương 7 Bước",
    price: 350000,
    startTime: "14:55",
    endTime: "15:40",
    duration: 45,
    progress: 72,
    todayServed: 8,
    todayRevenue: 2450000,
    nextBooking: "16:00 - Anh Khải (0909.222.888)",
  },
  {
    id: "02",
    name: "Ghế Fade 02",
    zone: "Khu Cắt Chính • Tầng 1",
    type: "hair",
    barber: "Tuấn Fade",
    barberRank: "Senior Stylist",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Hoàng Gia Bảo",
    customerTag: "Khách quen",
    service: "Skin Fade + Cạo khăn nóng",
    price: 180000,
    startTime: "15:10",
    endTime: "15:45",
    duration: 35,
    progress: 45,
    todayServed: 7,
    todayRevenue: 1580000,
    nextBooking: "Trống lịch",
  },
  {
    id: "03",
    name: "Ghế Styling 03",
    zone: "Khu Hóa Chất • Tầng 1",
    type: "hair",
    barber: "Eric Vũ",
    barberRank: "Creative Stylist",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Lê Minh Khôi",
    customerTag: "Member",
    service: "Cắt + Uốn Premlock Hàn Quốc",
    price: 550000,
    startTime: "14:20",
    endTime: "15:50",
    duration: 90,
    progress: 85,
    todayServed: 5,
    todayRevenue: 2150000,
    nextBooking: "16:00 - Anh Bách (Uốn tóc)",
  },
  {
    id: "04",
    name: "Giường Spa 04",
    zone: "Phòng Gội Dưỡng Sinh",
    type: "spa",
    barber: "Thảo Spa",
    barberRank: "Gội & Ear Spa",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
    status: "available",
    customer: "Sẵn sàng đón khách",
    customerTag: "",
    service: "Đã thay khăn mới & xông tinh dầu sả chanh",
    price: 0,
    startTime: "--:--",
    endTime: "--:--",
    duration: 0,
    progress: 0,
    todayServed: 6,
    todayRevenue: 1080000,
    nextBooking: "16:30 - Anh Vũ (Ear Spa)",
  },
  {
    id: "05",
    name: "Ghế Classic 05",
    zone: "Khu Cắt Chính • Tầng 1",
    type: "hair",
    barber: "Dũng Scissor",
    barberRank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80",
    status: "reserved",
    customer: "Trần Quốc Bảo",
    customerTag: "VIP Gold",
    service: "Đặt lịch 15:30 • Combo Cắt + Gội",
    price: 150000,
    startTime: "15:30",
    endTime: "16:10",
    duration: 40,
    progress: 0,
    todayServed: 5,
    todayRevenue: 980000,
    nextBooking: "15:30 - Trần Quốc Bảo (Đang tới)",
  },
  {
    id: "06",
    name: "Ghế Tattoo 06",
    zone: "Khu Cắt Chính • Tầng 1",
    type: "hair",
    barber: "Huy Tattoo Hair",
    barberRank: "Junior Barber",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    status: "busy",
    customer: "Phạm Đức Duy",
    customerTag: "Walk-in",
    service: "Cắt Undercut + Kẻ Line nghệ thuật",
    price: 140000,
    startTime: "15:05",
    endTime: "15:40",
    duration: 35,
    progress: 60,
    todayServed: 4,
    todayRevenue: 610000,
    nextBooking: "Trống lịch",
  },
  {
    id: "07",
    name: "Ghế Master 07",
    zone: "Khu Cắt Chính • Tầng 1",
    type: "hair",
    barber: "Trung Barber",
    barberRank: "Senior Barber",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    status: "available",
    customer: "Sẵn sàng đón khách",
    customerTag: "",
    service: "Tông đơ & dao cạo đã khử trùng tia UV",
    price: 0,
    startTime: "--:--",
    endTime: "--:--",
    duration: 0,
    progress: 0,
    todayServed: 5,
    todayRevenue: 890000,
    nextBooking: "Trống lịch",
  },
  {
    id: "08",
    name: "Giường Spa 08",
    zone: "Phòng Gội Dưỡng Sinh",
    type: "spa",
    barber: "Lan Hương Spa",
    barberRank: "Chuyên viên Spa",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    status: "cleaning",
    customer: "Đang khử trùng UV & Thay ga",
    customerTag: "Vệ sinh 5 phút",
    service: "Tự động mở khóa sau khi khử khuẩn xong",
    price: 0,
    startTime: "15:20",
    endTime: "15:25",
    duration: 5,
    progress: 80,
    todayServed: 4,
    todayRevenue: 760000,
    nextBooking: "Trống lịch",
  },
];

const INITIAL_QUEUE = [
  {
    queueId: "Q-101",
    name: "Đặng Quốc Khánh",
    phone: "0912.445.667",
    service: "Combo Đế Vương 7 Bước",
    price: 350000,
    preferBarber: "Bất kỳ thợ trống",
    waitMins: 8,
    tag: "VIP Gold",
  },
  {
    queueId: "Q-102",
    name: "Vũ Đình Trọng",
    phone: "0988.331.209",
    service: "Skin Fade + Gội Massage",
    price: 150000,
    preferBarber: "Trung Barber",
    waitMins: 5,
    tag: "Walk-in",
  },
  {
    queueId: "Q-103",
    name: "Ngô Kiến Huy",
    phone: "0903.778.912",
    service: "Gội Dưỡng Sinh + Lấy Ráy Tai",
    price: 180000,
    preferBarber: "Thảo Spa",
    waitMins: 3,
    tag: "Member",
  },
  {
    queueId: "Q-104",
    name: "Bùi Anh Tuấn",
    phone: "0977.556.112",
    service: "Cắt tạo kiểu Layer Hàn Quốc",
    price: 120000,
    preferBarber: "Bất kỳ thợ trống",
    waitMins: 1,
    tag: "Walk-in",
  },
];

export default function StationManagement({ onToggleSidebar, externalShowToast }) {
  const { timeStr, dateStr } = useLiveClock();
  const { showToast: internalShowToast } = useAdminToast();
  const showToast = externalShowToast || internalShowToast;

  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [waitingQueue, setWaitingQueue] = useState(INITIAL_QUEUE);
  const [currentView, setCurrentView] = useState("cards");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Assign Modal
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignChairId, setAssignChairId] = useState("04");
  const [assignQueueSelect, setAssignQueueSelect] = useState("");
  const [assignName, setAssignName] = useState("");
  const [assignPhone, setAssignPhone] = useState("");
  const [assignService, setAssignService] = useState("Combo Đế Vương 7 Bước|350000|45");
  const [assignTag, setAssignTag] = useState("Walk-in");

  // Detail Modal
  const [detailStationId, setDetailStationId] = useState(null);
  const [transferTargetId, setTransferTargetId] = useState("");

  // Derived KPIs
  const total = stations.length;
  const busyChairs = stations.filter((s) => s.status === "busy");
  const availChairs = stations.filter((s) => s.status === "available");
  const reservedChairs = stations.filter((s) => s.status === "reserved");
  const cleanChairs = stations.filter((s) => s.status === "cleaning");
  const activeCount = busyChairs.length + reservedChairs.length;
  const occPercent = Math.round((activeCount / total) * 100);
  const liveRevenue = busyChairs.reduce((acc, s) => acc + s.price, 0);

  const filteredStations = stations.filter((s) => {
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    const matchType = typeFilter === "all" || s.type === typeFilter;
    return matchStatus && matchType;
  });

  const maxRev = Math.max(...stations.map((s) => s.todayRevenue), 1);

  const openAssignModal = (chairId = null, queueId = null) => {
    const avail = stations.filter(
      (s) => s.status === "available" || s.status === "reserved"
    );
    let targetId = chairId;
    if (!targetId) {
      targetId = avail.length > 0 ? avail[0].id : stations[0].id;
    }
    setAssignChairId(targetId);

    if (queueId) {
      setAssignQueueSelect(queueId);
      const q = waitingQueue.find((item) => item.queueId === queueId);
      if (q) {
        setAssignName(q.name);
        setAssignPhone(q.phone);
      }
    } else {
      setAssignQueueSelect("");
      setAssignName("");
      setAssignPhone("");
    }
    setAssignModalOpen(true);
  };

  const handleQueueSelectChange = (qId) => {
    setAssignQueueSelect(qId);
    if (!qId) {
      setAssignName("");
      setAssignPhone("");
      return;
    }
    const q = waitingQueue.find((item) => item.queueId === qId);
    if (q) {
      setAssignName(q.name);
      setAssignPhone(q.phone);
    }
  };

  const handleAssignCustomer = (e) => {
    e.preventDefault();
    const [serviceName, priceStr, durationStr] = assignService.split("|");
    const now = new Date();
    const startH = String(now.getHours()).padStart(2, "0");
    const startM = String(now.getMinutes()).padStart(2, "0");
    const endDate = new Date(now.getTime() + Number(durationStr) * 60000);
    const endH = String(endDate.getHours()).padStart(2, "0");
    const endM = String(endDate.getMinutes()).padStart(2, "0");

    setStations((prev) =>
      prev.map((s) =>
        s.id === assignChairId
          ? {
              ...s,
              status: "busy",
              customer: assignName.trim(),
              customerTag: assignTag,
              service: serviceName,
              price: Number(priceStr),
              startTime: `${startH}:${startM}`,
              endTime: `${endH}:${endM}`,
              duration: Number(durationStr),
              progress: 15,
            }
          : s
      )
    );

    if (assignQueueSelect) {
      setWaitingQueue((prev) =>
        prev.filter((q) => q.queueId !== assignQueueSelect)
      );
    }

    const st = stations.find((x) => x.id === assignChairId);
    setAssignModalOpen(false);
    showToast(
      "Đã xếp khách vào ghế!",
      `${assignName} đang được phục vụ tại ${st?.name || assignChairId} (${st?.barber || ""})`
    );
  };

  const completeStation = (chairId) => {
    const s = stations.find((x) => x.id === chairId);
    if (!s) return;
    const oldCustomer = s.customer;
    const oldPrice = s.price;
    setStations((prev) =>
      prev.map((item) =>
        item.id === chairId
          ? {
              ...item,
              todayServed: item.todayServed + 1,
              todayRevenue: item.todayRevenue + item.price,
              status: "available",
              customer: "Sẵn sàng đón khách",
              customerTag: "",
              service: "Đã vệ sinh & khử trùng tia UV",
              price: 0,
              progress: 0,
              startTime: "--:--",
              endTime: "--:--",
            }
          : item
      )
    );
    showToast(
      "Hoàn tất & Xuất Bill!",
      `Đã thanh toán ${formatVND(oldPrice)} cho khách ${oldCustomer} tại ${s.name}`
    );
  };

  const startCleaning = (chairId) => {
    const s = stations.find((x) => x.id === chairId);
    if (!s) return;
    setStations((prev) =>
      prev.map((item) =>
        item.id === chairId
          ? {
              ...item,
              status: "cleaning",
              customer: "Đang khử trùng UV & Thay khăn",
              customerTag: "Vệ sinh 5 phút",
              service: "Khử khuẩn tông đơ, kéo & ghế da bằng tia UV-C",
              price: 0,
              progress: 50,
            }
          : item
      )
    );
    showToast(
      "Đang khử trùng tia UV",
      `${s.name} đã chuyển sang chế độ vệ sinh khử khuẩn`,
      "warning"
    );
  };

  const finishCleaning = (chairId) => {
    const s = stations.find((x) => x.id === chairId);
    if (!s) return;
    setStations((prev) =>
      prev.map((item) =>
        item.id === chairId
          ? {
              ...item,
              status: "available",
              customer: "Sẵn sàng đón khách",
              customerTag: "",
              service: "Tông đơ & dao cạo đã khử trùng tia UV",
              price: 0,
              progress: 0,
            }
          : item
      )
    );
    showToast(
      "Ghế đã sẵn sàng!",
      `${s.name} (${s.barber}) đã hoàn tất khử trùng và sẵn sàng đón khách`
    );
  };

  const checkInReservedChair = (chairId) => {
    const s = stations.find((x) => x.id === chairId);
    if (!s) return;
    setStations((prev) =>
      prev.map((item) =>
        item.id === chairId
          ? {
              ...item,
              status: "busy",
              progress: 20,
              service: s.service.replace("Đặt lịch 15:30 • ", ""),
            }
          : item
      )
    );
    showToast(
      "Khách đã vào ghế!",
      `Khách ${s.customer} đã bắt đầu ca cắt tại ${s.name}`
    );
  };

  const triggerAllCleaning = () => {
    const availCount = availChairs.length;
    setStations((prev) =>
      prev.map((s) =>
        s.status === "available"
          ? {
              ...s,
              status: "cleaning",
              customer: "Đang khử trùng UV đồng loạt",
              customerTag: "Chu kỳ 5 phút",
              service: "Khử khuẩn tia UV-C định kỳ toàn salon",
              progress: 65,
            }
          : s
      )
    );
    showToast(
      "Kích hoạt khử trùng UV",
      `Đã bật chế độ khử khuẩn tia UV cho ${availCount} ghế trống!`,
      "warning"
    );
  };

  const openStationDetail = (chairId) => {
    const availOthers = stations.filter(
      (x) => x.id !== chairId && x.status === "available"
    );
    setTransferTargetId(availOthers[0]?.id || "");
    setDetailStationId(chairId);
  };

  const transferChair = () => {
    const current = stations.find((x) => x.id === detailStationId);
    const target = stations.find((x) => x.id === transferTargetId);
    if (!current || !target) {
      showToast("Không thể chuyển ghế", "Hiện không có ghế trống phù hợp!", "error");
      return;
    }

    setStations((prev) =>
      prev.map((item) => {
        if (item.id === target.id) {
          return {
            ...item,
            status: current.status,
            customer: current.customer,
            customerTag: current.customerTag,
            service: current.service,
            price: current.price,
            startTime: current.startTime,
            endTime: current.endTime,
            duration: current.duration,
            progress: current.progress,
          };
        }
        if (item.id === current.id) {
          return {
            ...item,
            status: "available",
            customer: "Sẵn sàng đón khách",
            customerTag: "",
            service: "Đã chuyển khách sang " + target.name,
            price: 0,
            progress: 0,
            startTime: "--:--",
            endTime: "--:--",
          };
        }
        return item;
      })
    );

    setDetailStationId(null);
    showToast(
      "Chuyển ghế thành công!",
      `Đã chuyển khách ${target.customer || current.customer} từ ${current.name} sang ${target.name}`
    );
  };

  const detailStation = stations.find((s) => s.id === detailStationId);
  const availTransferOptions = stations.filter(
    (x) => x.id !== detailStationId && x.status === "available"
  );

  return (
    <>
      {/* TOP HEADER BAR */}
      <header className="h-20 bg-barber-surface/90 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Sơ Đồ Ghế Cắt &amp; Điều Phối Vị Trí
              </h2>
              <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-dot-pulse"></span>
                Floor Live
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
              <i className="fa-regular fa-clock text-amber-400"></i>
              <span>{dateStr}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-semibold font-mono">
                {timeStr}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerAllCleaning}
            className="hidden sm:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-medium text-xs px-3.5 py-2.5 rounded-xl transition-all"
          >
            <i className="fa-solid fa-spray-can-sparkles text-sky-400"></i>
            <span>Khử trùng UV ghế trống</span>
          </button>

          <button
            onClick={() => openAssignModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <i className="fa-solid fa-user-check"></i>
            <span>Xếp Khách Vào Ghế</span>
          </button>
        </div>
      </header>

      {/* SCROLLABLE BODY */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
        {/* TOP KPI SUMMARY CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Công Suất Phục Vụ
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <i className="fa-solid fa-gauge-high"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">{occPercent}%</h3>
              <span className="text-xs text-amber-400 font-semibold">
                {activeCount}/{total} vị trí hoạt động
              </span>
            </div>
            <div className="mt-2.5 w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${occPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Đang Phục Vụ Trực Tiếp
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <i className="fa-solid fa-scissors"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-amber-400">
                {busyChairs.length} Ghế
              </h3>
              <span className="text-xs text-zinc-400">Đang cắt &amp; uốn</span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Doanh thu ca hiện tại:{" "}
              <span className="text-zinc-200 font-semibold">
                {formatVND(liveRevenue)}
              </span>
            </p>
          </div>

          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Sẵn Sàng Đón Khách
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <i className="fa-solid fa-circle-check"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-emerald-400">
                {availChairs.length} Ghế
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                Vào ghế ngay
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Khách đang chờ tại sảnh:{" "}
              <span className="text-amber-400 font-bold">
                {waitingQueue.length} khách
              </span>
            </p>
          </div>

          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Khử Trùng UV &amp; Đặt Trước
              </span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                <i className="fa-solid fa-shield-virus"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">
                {reservedChairs.length + cleanChairs.length} Ghế
              </h3>
              <span className="text-xs text-sky-400 font-semibold">
                {reservedChairs.length} đặt lịch • {cleanChairs.length} vệ sinh
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Tiêu chuẩn khử khuẩn tia UV-C 5 phút/lượt
            </p>
          </div>
        </section>

        {/* FILTER & VIEW MODE BAR */}
        <section className="bg-barber-card border border-barber-border rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "Tất cả (8)", dot: null },
              { key: "busy", label: "Đang cắt", dot: "bg-amber-400" },
              { key: "available", label: "Ghế trống", dot: "bg-emerald-400" },
              { key: "reserved", label: "Khách đặt trước", dot: "bg-sky-400" },
              { key: "cleaning", label: "Đang vệ sinh UV", dot: "bg-purple-400" },
            ].map((st) => (
              <button
                key={st.key}
                onClick={() => setStatusFilter(st.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  statusFilter === st.key
                    ? "bg-amber-500 text-black font-bold border-amber-500"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                }`}
              >
                {st.dot && (
                  <span className={`w-2 h-2 rounded-full ${st.dot}`}></span>
                )}
                {st.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Mọi phân khu (Ghế cắt &amp; Giường gội)</option>
              <option value="hair">Khu Ghế Cắt Tóc Quý Ông (6 ghế)</option>
              <option value="spa">Khu Gội Dưỡng Sinh &amp; Ráy Tai (2 giường)</option>
            </select>

            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setCurrentView("cards")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                  currentView === "cards"
                    ? "bg-amber-500 text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <i className="fa-solid fa-grip"></i> Thẻ Chi Tiết Ghế
              </button>
              <button
                onClick={() => setCurrentView("floorplan")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                  currentView === "floorplan"
                    ? "bg-amber-500 text-black font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <i className="fa-solid fa-map-location-dot"></i> Sơ Đồ Mặt Bằng
              </button>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT: LEFT (STATIONS) + RIGHT (WAITING QUEUE & EQUIPMENT) */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* VIEW 1: DETAILED STATION CARDS */}
            {currentView === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStations.map((s) => {
                  let cardClass = "chair-busy";
                  let badgeHtml = null;
                  let actionButtons = null;

                  if (s.status === "busy") {
                    cardClass = "chair-busy";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 status-dot-pulse"></span>{" "}
                        Đang cắt
                      </span>
                    );
                    actionButtons = (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                        <button
                          onClick={() => completeStation(s.id)}
                          className="flex-1 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                        >
                          <i className="fa-solid fa-check-double mr-1"></i> Xong
                          &amp; In Bill
                        </button>
                        <button
                          onClick={() => startCleaning(s.id)}
                          title="Chuyển sang vệ sinh UV"
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-purple-500/20 text-zinc-300 hover:text-purple-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-spray-can-sparkles"></i>
                        </button>
                        <button
                          onClick={() => openStationDetail(s.id)}
                          title="Chi tiết & Chuyển ghế"
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    );
                  } else if (s.status === "available") {
                    cardClass = "chair-available";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Ghế trống
                      </span>
                    );
                    actionButtons = (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                        <button
                          onClick={() => openAssignModal(s.id)}
                          className="flex-1 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                        >
                          <i className="fa-solid fa-user-plus mr-1"></i> Xếp
                          khách vào ghế
                        </button>
                        <button
                          onClick={() => startCleaning(s.id)}
                          title="Khử trùng tia UV"
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-purple-500/20 text-zinc-300 hover:text-purple-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-spray-can-sparkles"></i>
                        </button>
                        <button
                          onClick={() => openStationDetail(s.id)}
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    );
                  } else if (s.status === "reserved") {
                    cardClass = "chair-reserved";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        Giữ chỗ 15:30
                      </span>
                    );
                    actionButtons = (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                        <button
                          onClick={() => checkInReservedChair(s.id)}
                          className="flex-1 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500 hover:text-black text-sky-400 border border-sky-500/30 text-xs font-bold transition-all"
                        >
                          <i className="fa-solid fa-chair mr-1"></i> Khách đã
                          tới • Vào ghế
                        </button>
                        <button
                          onClick={() => openStationDetail(s.id)}
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    );
                  } else {
                    cardClass = "chair-cleaning";
                    badgeHtml = (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Khử trùng UV
                      </span>
                    );
                    actionButtons = (
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-zinc-800/80">
                        <button
                          onClick={() => finishCleaning(s.id)}
                          className="flex-1 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500 hover:text-black text-purple-300 border border-purple-500/30 text-xs font-bold transition-all"
                        >
                          <i className="fa-solid fa-bolt mr-1"></i> Hoàn tất khử
                          khuẩn • Mở ghế
                        </button>
                        <button
                          onClick={() => openStationDetail(s.id)}
                          className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-all"
                        >
                          <i className="fa-solid fa-ellipsis"></i>
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={s.id}
                      className={`rounded-2xl p-5 transition-all hover:-translate-y-0.5 flex flex-col justify-between ${cardClass}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-bold text-amber-400 flex items-center justify-center font-mono">
                              #{s.id}
                            </span>
                            <div>
                              <h4 className="text-sm font-bold text-white leading-tight">
                                {s.name}
                              </h4>
                              <p className="text-[10px] text-zinc-400">
                                {s.zone}
                              </p>
                            </div>
                          </div>
                          {badgeHtml}
                        </div>

                        <div className="flex items-center justify-between bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-2.5 mb-3">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={s.avatar}
                              alt={s.barber}
                              className="w-9 h-9 rounded-xl object-cover ring-1 ring-amber-500/40"
                            />
                            <div>
                              <p className="text-xs font-bold text-zinc-100">
                                {s.barber}
                              </p>
                              <p className="text-[10px] text-amber-400">
                                {s.barberRank}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-zinc-500">Hôm nay</p>
                            <p className="text-xs font-bold text-zinc-200">
                              {s.todayServed} khách •{" "}
                              <span className="text-amber-400">
                                {formatVND(s.todayRevenue)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">
                              Khách hàng:
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-white">
                                {s.customer}
                              </span>
                              {s.customerTag && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                  {s.customerTag}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-zinc-400">
                              Gói dịch vụ:
                            </span>
                            <span className="text-xs text-zinc-200 font-medium truncate max-w-[200px]">
                              {s.service}
                            </span>
                          </div>
                          {s.price > 0 && (
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-zinc-400">
                                Giá dịch vụ:
                              </span>
                              <span className="text-xs font-bold text-amber-400">
                                {formatVND(s.price)}
                              </span>
                            </div>
                          )}
                        </div>

                        {s.status === "busy" && (
                          <div className="mt-3 pt-2.5 border-t border-zinc-800/70">
                            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                              <span>
                                Ca cắt: {s.startTime} - {s.endTime} (
                                {s.duration}p)
                              </span>
                              <span className="text-amber-400 font-bold">
                                {s.progress}%
                              </span>
                            </div>
                            <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full"
                                style={{ width: `${s.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        <div className="mt-2.5 flex items-center justify-between text-[11px] text-zinc-500">
                          <span>
                            <i className="fa-regular fa-calendar-check mr-1 text-amber-400"></i>{" "}
                            Ca kế tiếp:
                          </span>
                          <span className="text-zinc-300 font-medium">
                            {s.nextBooking}
                          </span>
                        </div>
                      </div>

                      {actionButtons}
                    </div>
                  );
                })}
              </div>
            )}

            {/* VIEW 2: ARCHITECTURAL SALON FLOOR PLAN */}
            {currentView === "floorplan" && (
              <div className="bg-barber-card border border-barber-border rounded-2xl p-6 floor-blueprint relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-zinc-800">
                  <div>
                    <h4 className="font-bold text-white text-base flex items-center gap-2">
                      <i className="fa-solid fa-compass-drafting text-amber-400"></i>
                      Bản Đồ Kiến Trúc Mặt Bằng Salon (Tầng 1 - Flagship 88 Phố
                      Cổ)
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Nhấp trực tiếp vào từng vị trí ghế trên sơ đồ để thao tác
                      nhận khách hoặc chuyển ghế
                    </p>
                  </div>
                  <span className="text-[11px] font-mono bg-zinc-900 border border-zinc-700 px-3 py-1 rounded-lg text-amber-400">
                    Tỷ lệ 1:50 • 120m²
                  </span>
                </div>

                {/* North Wall: Mirror & Main Haircut Zone */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                      <i className="fa-solid fa-grip-lines"></i> Khu Vực Gương
                      Soi &amp; Ghế Cắt Tóc Quý Ông (Ghế #01 → #06)
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Hệ thống gương đèn LED Vàng Ấm
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {stations
                      .filter((s) => s.type === "hair")
                      .map((s) => {
                        const ringColor =
                          s.status === "busy"
                            ? "border-amber-500/60 bg-amber-500/10"
                            : s.status === "available"
                            ? "border-emerald-500/60 bg-emerald-500/10"
                            : s.status === "reserved"
                            ? "border-sky-500/60 bg-sky-500/10"
                            : "border-purple-500/60 bg-purple-500/10";
                        return (
                          <div
                            key={s.id}
                            onClick={() => openStationDetail(s.id)}
                            className={`cursor-pointer rounded-2xl border-2 ${ringColor} p-3.5 transition-all hover:scale-[1.02] flex flex-col justify-between`}
                          >
                            <div className="w-full h-1.5 bg-gradient-to-r from-zinc-700 via-amber-300/60 to-zinc-700 rounded-full mb-3"></div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white">
                                #{s.id} • {s.name}
                              </span>
                              <i className="fa-solid fa-chair text-amber-400"></i>
                            </div>
                            <div className="flex items-center gap-2 my-2.5">
                              <img
                                src={s.avatar}
                                alt={s.barber}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                              <div className="truncate">
                                <p className="text-xs font-bold text-zinc-100 truncate">
                                  {s.barber}
                                </p>
                                <p className="text-[10px] text-zinc-400 truncate">
                                  {s.customer}
                                </p>
                              </div>
                            </div>
                            <div className="text-[10px] text-amber-300 font-semibold truncate bg-black/40 px-2 py-1 rounded-lg">
                              {s.service}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Bottom Row: VIP Shampoo Spa Room + Reception & Waiting Lounge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-dashed border-zinc-800">
                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                        <i className="fa-solid fa-spa"></i> Phòng Gội Dưỡng Sinh
                        &amp; Ear Spa
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        Cách âm • Tinh dầu sả chanh
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {stations
                        .filter((s) => s.type === "spa")
                        .map((s) => {
                          const ringColor =
                            s.status === "busy"
                              ? "border-amber-500/60 bg-amber-500/10"
                              : s.status === "available"
                              ? "border-emerald-500/60 bg-emerald-500/10"
                              : "border-purple-500/60 bg-purple-500/10";
                          return (
                            <div
                              key={s.id}
                              onClick={() => openStationDetail(s.id)}
                              className={`cursor-pointer rounded-xl border-2 ${ringColor} p-3 transition-all hover:scale-[1.02]`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white">
                                  #{s.id} • {s.name}
                                </span>
                                <i className="fa-solid fa-bed text-emerald-400"></i>
                              </div>
                              <p className="text-xs font-semibold text-zinc-200">
                                {s.barber}
                              </p>
                              <p className="text-[10px] text-zinc-400 truncate mt-0.5">
                                {s.customer}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {/* Reception, Whisky Bar & Waiting Sofa */}
                  <div className="bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                          <i className="fa-solid fa-martini-glass-citrus"></i>{" "}
                          Quầy Thu Ngân POS &amp; Sảnh Sofa Chờ
                        </span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                          Sảnh chính
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">
                        Phục vụ trà quế, cà phê Espresso &amp; trưng bày tủ sáp
                        Pomade chính hãng.
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2.5">
                      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                          <i className="fa-solid fa-couch"></i>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-400">
                            Khách đang ngồi chờ
                          </p>
                          <p className="text-xs font-bold text-white">
                            {waitingQueue.length} Khách
                          </p>
                        </div>
                      </div>
                      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-2.5 flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                          <i className="fa-solid fa-cash-register"></i>
                        </div>
                        <div>
                          <p className="text-[10px] text-zinc-400">
                            Quầy POS Thu Ngân
                          </p>
                          <p className="text-xs font-bold text-emerald-400">
                            Online • 2 Máy in
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: WALK-IN WAITING QUEUE & STATION ANALYTICS */}
          <div className="space-y-6">
            {/* Walk-in Waiting Queue */}
            <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <i className="fa-solid fa-couch text-amber-400"></i>
                    Hàng Chờ Tại Quầy (Walk-in)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Khách đang thưởng trà chờ ghế trống
                  </p>
                </div>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold px-2.5 py-1 rounded-full">
                  {waitingQueue.length} khách
                </span>
              </div>

              <div className="space-y-3">
                {waitingQueue.length === 0 ? (
                  <div className="p-6 text-center text-xs text-zinc-500 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    Sảnh chờ hiện đang trống. Mọi khách đều đã được xếp vào ghế!
                  </div>
                ) : (
                  waitingQueue.map((q) => (
                    <div
                      key={q.queueId}
                      className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400">
                            {q.queueId}
                          </span>
                          <p className="text-xs font-bold text-white truncate">
                            {q.name}
                          </p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-300">
                            {q.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-300 mt-1 truncate">
                          {q.service} •{" "}
                          <span className="text-amber-400 font-semibold">
                            {formatVND(q.price)}
                          </span>
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">
                          Yêu cầu:{" "}
                          <span className="text-zinc-300">{q.preferBarber}</span>{" "}
                          • Chờ {q.waitMins} phút
                        </p>
                      </div>
                      <button
                        onClick={() => openAssignModal(null, q.queueId)}
                        className="shrink-0 px-3 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 text-xs font-bold transition-all"
                      >
                        Vào ghế
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => openAssignModal()}
                className="mt-4 w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 text-xs font-bold border border-zinc-800 transition-colors"
              >
                <i className="fa-solid fa-plus mr-1"></i> Thêm Khách Vãng Lai
                Vào Hàng Chờ
              </button>
            </div>

            {/* Station Revenue & Turnaround Leaderboard */}
            <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <i className="fa-solid fa-ranking-star text-amber-400"></i>
                    Năng Suất Ghế Hôm Nay
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Số lượt phục vụ &amp; doanh thu theo vị trí ghế
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[...stations]
                  .sort((a, b) => b.todayRevenue - a.todayRevenue)
                  .slice(0, 5)
                  .map((s) => {
                    const pct = Math.round((s.todayRevenue / maxRev) * 100);
                    return (
                      <div key={s.id} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-zinc-200">
                            #{s.id} • {s.name}{" "}
                            <span className="text-zinc-500 font-normal">
                              ({s.barber})
                            </span>
                          </span>
                          <span className="font-bold text-amber-400">
                            {formatVND(s.todayRevenue)}{" "}
                            <span className="text-[10px] text-zinc-400 font-normal">
                              ({s.todayServed} ca)
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Equipment & Sterilization Status */}
            <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <i className="fa-solid fa-temperature-arrow-up text-sky-400"></i>
                  Tủ Khử Trùng UV &amp; Khăn Nóng
                </h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                  Đạt chuẩn Y tế
                </span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-zinc-300">Tủ hấp khăn nóng 70°C</span>
                  <span className="text-emerald-400 font-semibold">
                    Sẵn sàng (42 khăn)
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-zinc-300">Tủ tia cực tím UV-C kéo/lược</span>
                  <span className="text-sky-400 font-semibold">
                    Đang bật 100%
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <span className="text-zinc-300">Lưỡi dao cạo đơn Feather</span>
                  <span className="text-amber-400 font-semibold">
                    Thay mới mỗi khách
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL 1: ASSIGN CUSTOMER TO CHAIR */}
      {assignModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <i className="fa-solid fa-chair"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Xếp Khách Vào Ghế Phục Vụ
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Bắt đầu tính giờ ca cắt và cập nhật trạng thái ghế thời gian
                    thực
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssignModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleAssignCustomer} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Chọn Ghế / Giường Trống *
                  </label>
                  <select
                    value={assignChairId}
                    onChange={(e) => setAssignChairId(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    {stations.map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.id} - {s.name} ({s.barber}) [
                        {s.status === "available"
                          ? "Ghế trống"
                          : s.status === "reserved"
                          ? "Đặt trước"
                          : "Đang sử dụng"}
                        ]
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Chọn từ Hàng Chờ (Tùy chọn)
                  </label>
                  <select
                    value={assignQueueSelect}
                    onChange={(e) => handleQueueSelectChange(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="">-- Nhập khách mới trực tiếp --</option>
                    {waitingQueue.map((q) => (
                      <option key={q.queueId} value={q.queueId}>
                        {q.queueId} - {q.name} ({q.service})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tên Khách Hàng *
                  </label>
                  <input
                    type="text"
                    required
                    value={assignName}
                    onChange={(e) => setAssignName(e.target.value)}
                    placeholder="VD: Anh Minh Quân"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Điện Thoại
                  </label>
                  <input
                    type="tel"
                    value={assignPhone}
                    onChange={(e) => setAssignPhone(e.target.value)}
                    placeholder="0909 xxx xxx"
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
                    value={assignService}
                    onChange={(e) => setAssignService(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Combo Đế Vương 7 Bước|350000|45">
                      Combo Đế Vương 7 Bước (350.000₫)
                    </option>
                    <option value="Skin Fade + Cạo khăn nóng|180000|35">
                      Skin Fade + Cạo khăn nóng (180.000₫)
                    </option>
                    <option value="Cắt + Uốn Premlock Hàn Quốc|550000|90">
                      Cắt + Uốn Premlock Hàn Quốc (550.000₫)
                    </option>
                    <option value="Cắt + Nhuộm Phủ Bạc Thảo Dược|320000|60">
                      Cắt + Nhuộm Phủ Bạc Thảo Dược (320.000₫)
                    </option>
                    <option value="Gội Dưỡng Sinh + Lấy Ráy Tai Hoàng Gia|180000|35">
                      Gội Dưỡng Sinh + Lấy Ráy Tai (180.000₫)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Phân Hạng Khách
                  </label>
                  <select
                    value={assignTag}
                    onChange={(e) => setAssignTag(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="VIP Diamond">Khách VIP Diamond</option>
                    <option value="VIP Gold">Khách VIP Gold</option>
                    <option value="Member">Hội viên thân thiết</option>
                    <option value="Walk-in">Khách vãng lai (Walk-in)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  <i className="fa-solid fa-check mr-1.5"></i> Xác Nhận Vào Ghế
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: STATION QUICK CONTROL & CHAIR TRANSFER */}
      {detailStation && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/60">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                  Điều Khiển Vị Trí
                </span>
                <h3 className="font-bold text-white text-lg mt-0.5">
                  #{detailStation.id} • {detailStation.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailStationId(null)}
                className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Thợ phụ trách:</span>
                  <span className="text-white font-bold">
                    {detailStation.barber} ({detailStation.barberRank})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Khách hiện tại:</span>
                  <span className="text-amber-400 font-bold">
                    {detailStation.customer}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Dịch vụ:</span>
                  <span className="text-zinc-200 font-medium">
                    {detailStation.service}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Thời gian ca:</span>
                  <span className="text-zinc-200 font-mono">
                    {detailStation.startTime} → {detailStation.endTime}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800">
                  <span className="text-zinc-400">Doanh số ghế hôm nay:</span>
                  <span className="text-emerald-400 font-bold">
                    {formatVND(detailStation.todayRevenue)} (
                    {detailStation.todayServed} lượt)
                  </span>
                </div>
              </div>

              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-3.5">
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  <i className="fa-solid fa-right-left text-amber-400 mr-1"></i>{" "}
                  Chuyển khách sang ghế trống khác:
                </label>
                <div className="flex gap-2">
                  <select
                    value={transferTargetId}
                    onChange={(e) => setTransferTargetId(e.target.value)}
                    className="flex-1 bg-zinc-950 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {availTransferOptions.length > 0 ? (
                      availTransferOptions.map((o) => (
                        <option key={o.id} value={o.id}>
                          #{o.id} - {o.name} ({o.barber})
                        </option>
                      ))
                    ) : (
                      <option value="">Không có ghế trống</option>
                    )}
                  </select>
                  <button
                    onClick={transferChair}
                    className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 text-xs font-bold transition-all"
                  >
                    Chuyển ghế
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <button
                  onClick={() => {
                    startCleaning(detailStation.id);
                    setDetailStationId(null);
                  }}
                  className="py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500 hover:text-black text-purple-300 border border-purple-500/30 text-xs font-bold transition-all"
                >
                  <i className="fa-solid fa-spray-can-sparkles mr-1"></i> Khử
                  trùng UV
                </button>
                <button
                  onClick={() => {
                    completeStation(detailStation.id);
                    setDetailStationId(null);
                  }}
                  className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all"
                >
                  <i className="fa-solid fa-check-double mr-1"></i> Hoàn tất
                  &amp; Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

