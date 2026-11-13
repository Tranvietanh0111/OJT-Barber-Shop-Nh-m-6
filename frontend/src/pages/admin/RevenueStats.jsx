// Phụ trách: Trần Văn Thắng
import React, { useState, useEffect, useRef } from "react";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";

const PERIOD_REPORTS = {
  today: {
    net: 8850000,
    service: 6710000,
    retail: 2140000,
    profit: 3950000,
    trendLabels: ["09:00", "11:00", "13:00", "15:00", "17:00", "19:00", "21:00"],
    trendService: [850, 1420, 980, 1650, 2100, 1850, 920],
    trendRetail: [200, 420, 150, 680, 490, 200, 0],
  },
  week: {
    net: 46800000,
    service: 37900000,
    retail: 8900000,
    profit: 20400000,
    trendLabels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
    trendService: [4200, 4600, 5100, 4900, 6200, 8800, 9400],
    trendRetail: [850, 920, 1100, 980, 1450, 2100, 2400],
  },
  month: {
    net: 128450000,
    service: 102760000,
    retail: 25690000,
    profit: 54280000,
    trendLabels: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
    trendService: [23500, 25800, 24900, 28560],
    trendRetail: [5400, 6200, 6890, 7200],
  },
  year: {
    net: 1420000000,
    service: 1150000000,
    retail: 270000000,
    profit: 612000000,
    trendLabels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11"],
    trendService: [95000, 112000, 88000, 92000, 98000, 105000, 108000, 102000, 110000, 118000, 128450],
    trendRetail: [21000, 28000, 19000, 22000, 24000, 25000, 26000, 23000, 25000, 27000, 25690],
  },
};

const INVOICES_DATA = [
  {
    id: "INV-8829",
    time: "15:18 • 11/11",
    customer: "Anh Tuấn Nguyễn",
    barber: "Master Hoàng",
    items: "Combo Đế Vương 7 Bước + 1x Sáp Reuzel Blue",
    method: "VietQR Techcombank",
    amount: 770000,
  },
  {
    id: "INV-8828",
    time: "14:52 • 11/11",
    customer: "Lê Minh Khôi",
    barber: "Eric Vũ",
    items: "Cắt + Uốn Premlock Hàn Quốc + 1x Kevin Murphy",
    method: "Thẻ tín dụng Visa",
    amount: 1230000,
  },
  {
    id: "INV-8827",
    time: "14:30 • 11/11",
    customer: "Hoàng Gia Bảo",
    barber: "Tuấn Fade",
    items: "Skin Fade + Cạo Khăn Nóng",
    method: "Tiền mặt tại quầy",
    amount: 180000,
  },
  {
    id: "INV-8826",
    time: "14:05 • 11/11",
    customer: "Phan Mạnh Quỳnh",
    barber: "Master Hoàng",
    items: "Combo Đế Vương 7 Bước",
    method: "VietQR Techcombank",
    amount: 350000,
  },
  {
    id: "INV-8825",
    time: "13:40 • 11/11",
    customer: "Ngô Kiến Huy",
    barber: "Thảo Spa",
    items: "Gội Dưỡng Sinh Trung Hoa + Lấy Ráy Tai Hoàng Gia",
    method: "Ví MoMo",
    amount: 320000,
  },
  {
    id: "INV-8824",
    time: "13:10 • 11/11",
    customer: "Đặng Quốc Khánh",
    barber: "Dũng Scissor",
    items: "Cắt + Nhuộm Phủ Bạc Thảo Dược",
    method: "VietQR Techcombank",
    amount: 320000,
  },
  {
    id: "INV-8823",
    time: "12:25 • 11/11",
    customer: "Trần Quốc Bảo",
    barber: "Trung Barber",
    items: "Combo Cắt Gội 10 Bước + Tinh dầu râu Proraso",
    method: "Tiền mặt tại quầy",
    amount: 530000,
  },
];

export default function RevenueStats() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [period, setPeriod] = useState("month");
  const [searchInvoice, setSearchInvoice] = useState("");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const mainTrendRef = useRef(null);
  const serviceDoughnutRef = useRef(null);
  const barberBarRef = useRef(null);
  const paymentDoughnutRef = useRef(null);

  const chartInstancesRef = useRef({});

  const currentStats = PERIOD_REPORTS[period] || PERIOD_REPORTS.month;

  useEffect(() => {
    if (!window.Chart) return;

    Object.values(chartInstancesRef.current).forEach((ch) => {
      if (ch) ch.destroy();
    });

    const d = PERIOD_REPORTS[period] || PERIOD_REPORTS.month;

    if (mainTrendRef.current) {
      const ctxTrend = mainTrendRef.current.getContext("2d");
      const gradGold = ctxTrend.createLinearGradient(0, 0, 0, 260);
      gradGold.addColorStop(0, "rgba(245, 158, 11, 0.35)");
      gradGold.addColorStop(1, "rgba(245, 158, 11, 0.0)");

      chartInstancesRef.current.trend = new window.Chart(ctxTrend, {
        type: "line",
        data: {
          labels: d.trendLabels,
          datasets: [
            {
              label: "Doanh thu Dịch vụ (Nghìn ₫)",
              data: d.trendService,
              borderColor: "#f59e0b",
              backgroundColor: gradGold,
              borderWidth: 2.5,
              fill: true,
              tension: 0.38,
            },
            {
              label: "Bán lẻ Sáp & Mỹ phẩm (Nghìn ₫)",
              data: d.trendRetail,
              borderColor: "#38bdf8",
              backgroundColor: "transparent",
              borderDash: [5, 5],
              borderWidth: 2,
              tension: 0.38,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#d4d4d8", font: { size: 11 } } },
          },
          scales: {
            x: {
              grid: { color: "rgba(39,39,42,0.5)" },
              ticks: { color: "#a1a1aa", font: { size: 11 } },
            },
            y: {
              grid: { color: "rgba(39,39,42,0.5)" },
              ticks: {
                color: "#a1a1aa",
                font: { size: 11 },
                callback: (v) => v.toLocaleString("vi-VN") + "k",
              },
            },
          },
        },
      });
    }

    if (serviceDoughnutRef.current) {
      const ctxSrv = serviceDoughnutRef.current.getContext("2d");
      chartInstancesRef.current.srv = new window.Chart(ctxSrv, {
        type: "doughnut",
        data: {
          labels: [
            "Combo Đế Vương",
            "Uốn Premlock/Layer",
            "Bán lẻ Sáp Pomade",
            "Gội Dưỡng Sinh & Spa",
          ],
          datasets: [
            {
              data: [44, 24, 20, 12],
              backgroundColor: ["#f59e0b", "#10b981", "#38bdf8", "#a855f7"],
              borderColor: "#18181b",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "70%",
          plugins: { legend: { display: false } },
        },
      });
    }

    if (barberBarRef.current) {
      const ctxBarber = barberBarRef.current.getContext("2d");
      chartInstancesRef.current.barber = new window.Chart(ctxBarber, {
        type: "bar",
        data: {
          labels: [
            "Master Hoàng",
            "Eric Vũ",
            "Tuấn Fade",
            "Dũng Scissor",
            "Thảo Spa",
            "Trung Barber",
          ],
          datasets: [
            {
              label: "Doanh số (Triệu VNĐ)",
              data: [34.5, 26.8, 21.4, 16.9, 15.2, 13.6],
              backgroundColor: [
                "#f59e0b",
                "#10b981",
                "#38bdf8",
                "#a855f7",
                "#f43f5e",
                "#eab308",
              ],
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#d4d4d8", font: { size: 11 } },
            },
            y: {
              grid: { color: "rgba(39,39,42,0.5)" },
              ticks: {
                color: "#a1a1aa",
                callback: (v) => v + " Tr",
              },
            },
          },
        },
      });
    }

    if (paymentDoughnutRef.current) {
      const ctxPay = paymentDoughnutRef.current.getContext("2d");
      chartInstancesRef.current.pay = new window.Chart(ctxPay, {
        type: "doughnut",
        data: {
          labels: ["Chuyển khoản VietQR", "Tiền mặt", "Thẻ Visa / Ví MoMo"],
          datasets: [
            {
              data: [62, 24, 14],
              backgroundColor: ["#f59e0b", "#10b981", "#38bdf8"],
              borderColor: "#18181b",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "68%",
          plugins: { legend: { display: false } },
        },
      });
    }

    return () => {
      Object.values(chartInstancesRef.current).forEach((ch) => {
        if (ch) ch.destroy();
      });
    };
  }, [period]);

  const filteredInvoices = INVOICES_DATA.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchInvoice.toLowerCase()) ||
      inv.barber.toLowerCase().includes(searchInvoice.toLowerCase())
  );

  const exportAccountingExcel = () => {
    showToast(
      "Xuất báo cáo thành công!",
      "Đã tải xuống file Bao_Cao_Tai_Chinh_RoyalBarber_T11_2026.xlsx"
    );
  };

  return (
    <AdminLayout activeKey="reports" toast={toast}>
      {({ toggleSidebar }) => (
        <>
          {/* TOP HEADER BAR */}
          <header className="h-20 bg-barber-surface/90 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
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
                    Báo Cáo Doanh Thu &amp; Phân Tích Lợi Nhuận (P&amp;L)
                  </h2>
                  <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Tăng trưởng +22.4%
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
              <div className="hidden md:flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                {[
                  { key: "today", label: "Hôm nay" },
                  { key: "week", label: "Tuần này" },
                  { key: "month", label: "Tháng 11/2026" },
                  { key: "year", label: "Năm 2026" },
                ].map((p) => (
                  <button
                    key={p.key}
                    onClick={() => {
                      setPeriod(p.key);
                      showToast(
                        "Đã cập nhật kỳ báo cáo",
                        "Số liệu và biểu đồ đã được đồng bộ theo kỳ đã chọn."
                      );
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      period === p.key
                        ? "bg-amber-500 text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <button
                onClick={exportAccountingExcel}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-file-excel"></i>
                <span>Xuất Báo Cáo Kế Toán</span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE BODY */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. TOP FINANCIAL KPI CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Doanh Thu Thuần
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-sack-dollar"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {formatVND(currentStats.net)}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">
                    <i className="fa-solid fa-arrow-trend-up mr-1"></i>+22.4% so
                    với kỳ trước
                  </span>
                  <span className="text-zinc-500">Đạt 107% KPI</span>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Doanh Thu Dịch Vụ Salon
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-scissors"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-emerald-400">
                    {formatVND(currentStats.service)}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium">
                    Chiếm 80% tổng thu
                  </span>
                  <span className="text-zinc-500">482 lượt khách</span>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Bán Lẻ Sáp &amp; Mỹ Phẩm
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-pump-soap"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-sky-400">
                    {formatVND(currentStats.retail)}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-sky-300 font-medium">
                    Chiếm 20% tổng thu
                  </span>
                  <span className="text-zinc-500">68 lọ Pomade/Dưỡng</span>
                </div>
              </div>

              <div className="bg-barber-card border border-amber-500/40 rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    Lợi Nhuận Ròng (Sau Chi Phí)
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-amber-400">
                    {formatVND(currentStats.profit)}
                  </h3>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">
                    Biên lợi nhuận ròng: 42.2%
                  </span>
                  <span className="text-zinc-500">Đã trừ hoa hồng</span>
                </div>
              </div>
            </section>

            {/* 2. PRIMARY CHARTS ROW */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Biểu Đồ Tăng Trưởng Doanh Thu Dịch Vụ &amp; Bán Lẻ Sáp
                    </h3>
                    <p className="text-xs text-zinc-400">
                      So sánh nguồn thu cắt/uốn/nhuộm tại ghế và doanh số bán lẻ
                      Pomade mang về
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{" "}
                      Dịch vụ cắt/hóa chất
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>{" "}
                      Bán lẻ Sáp/Mỹ phẩm
                    </span>
                  </div>
                </div>
                <div className="h-72 w-full">
                  <canvas ref={mainTrendRef}></canvas>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Cơ Cấu Nguồn Thu Theo Dịch Vụ
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Tỷ trọng đóng góp vào tổng doanh số
                  </p>
                </div>
                <div className="h-48 w-full my-3">
                  <canvas ref={serviceDoughnutRef}></canvas>
                </div>
                <div className="space-y-2 text-xs border-t border-zinc-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>{" "}
                      Combo Đế Vương 7 Bước
                    </span>
                    <span className="font-bold text-white">
                      44% (56.5 Tr)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>{" "}
                      Uốn Premlock &amp; Nhuộm
                    </span>
                    <span className="font-bold text-white">
                      24% (30.8 Tr)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>{" "}
                      Bán lẻ Sáp &amp; Tinh dầu
                    </span>
                    <span className="font-bold text-white">
                      20% (25.7 Tr)
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-zinc-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>{" "}
                      Gội Dưỡng Sinh &amp; Ear Spa
                    </span>
                    <span className="font-bold text-white">
                      12% (15.4 Tr)
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. SECONDARY CHARTS ROW */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Đóng Góp Doanh Số Theo Từng Thợ Barber
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Dữ liệu dùng để quyết toán lương thưởng và hoa hồng cuối
                      kỳ (30% - 35%)
                    </p>
                  </div>
                  <span className="text-xs text-amber-400 font-semibold">
                    Top 1: Master Hoàng (34.500.000 ₫)
                  </span>
                </div>
                <div className="h-60 w-full">
                  <canvas ref={barberBarRef}></canvas>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Phương Thức Thanh Toán POS
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Đối soát két tiền mặt &amp; tài khoản ngân hàng
                  </p>
                </div>
                <div className="h-44 w-full my-2">
                  <canvas ref={paymentDoughnutRef}></canvas>
                </div>
                <div className="space-y-2 text-xs border-t border-zinc-800 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      <i className="fa-solid fa-qrcode text-amber-400 mr-1.5"></i>{" "}
                      Quét mã VietQR Ngân hàng
                    </span>
                    <span className="font-bold text-amber-400">62%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      <i className="fa-solid fa-money-bill-wave text-emerald-400 mr-1.5"></i>{" "}
                      Tiền mặt tại quầy
                    </span>
                    <span className="font-bold text-emerald-400">24%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-zinc-300">
                      <i className="fa-regular fa-credit-card text-sky-400 mr-1.5"></i>{" "}
                      Thẻ tín dụng / Ví MoMo
                    </span>
                    <span className="font-bold text-sky-400">14%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. BOTTOM ROW: POS INVOICE LEDGER + SALON P&L SUMMARY */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base">
                      Sổ Cái Hóa Đơn &amp; Giao Dịch POS Gần Nhất
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Tra cứu chi tiết từng phiếu thu, người thực hiện và phương
                      thức thanh toán
                    </p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                    <input
                      type="text"
                      value={searchInvoice}
                      onChange={(e) => setSearchInvoice(e.target.value)}
                      placeholder="Tìm mã INV, tên khách, thợ..."
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                        <th className="py-3 px-3 font-semibold">
                          Mã HĐ / Thời gian
                        </th>
                        <th className="py-3 px-3 font-semibold">Khách hàng</th>
                        <th className="py-3 px-3 font-semibold">
                          Chi tiết Dịch vụ &amp; Sáp
                        </th>
                        <th className="py-3 px-3 font-semibold">Thợ Barber</th>
                        <th className="py-3 px-3 font-semibold">Thanh toán</th>
                        <th className="py-3 px-3 font-semibold text-right">
                          Tổng thu
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/70 text-xs">
                      {filteredInvoices.map((inv) => (
                        <tr
                          key={inv.id}
                          onClick={() => setSelectedReceipt(inv)}
                          className="hover:bg-zinc-900/60 transition-colors cursor-pointer"
                        >
                          <td className="py-3.5 px-3">
                            <span className="font-mono font-bold text-amber-400 block">
                              #{inv.id}
                            </span>
                            <span className="text-[11px] text-zinc-500">
                              {inv.time}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-white">
                            {inv.customer}
                          </td>
                          <td className="py-3.5 px-3 text-zinc-300">
                            {inv.items}
                          </td>
                          <td className="py-3.5 px-3 text-zinc-200 font-medium">
                            {inv.barber}
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                              {inv.method}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-right font-bold text-emerald-400">
                            {formatVND(inv.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Salon P&L (Profit & Loss Statement) */}
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Báo Cáo Lãi / Lỗ Vận Hành (P&amp;L)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Bảng cân đối thu chi tháng 11/2026
                      </p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400">
                      Chuẩn Kế Toán
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                      <span className="text-zinc-300 font-medium">
                        1. Tổng Doanh Thu Gộp (Gross)
                      </span>
                      <span className="font-bold text-white">
                        128.450.000 ₫
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
                      <div className="flex justify-between text-zinc-400">
                        <span>
                          • Hoa hồng &amp; Lương Barber (32%)
                        </span>
                        <span className="text-rose-400 font-semibold">
                          - 41.100.000 ₫
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>• Giá vốn Sáp Pomade &amp; Vật tư</span>
                        <span className="text-rose-400 font-semibold">
                          - 14.870.000 ₫
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>• Thuê mặt bằng 88 Phố Cổ</span>
                        <span className="text-rose-400 font-semibold">
                          - 12.000.000 ₫
                        </span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>• Điện, Nước, Trà quế &amp; Marketing</span>
                        <span className="text-rose-400 font-semibold">
                          - 6.200.000 ₫
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-emerald-500/15 border border-amber-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                          Lợi Nhuận Ròng Bỏ Túi (EBITDA)
                        </span>
                        <span className="text-lg font-bold text-white">
                          54.280.000 ₫
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black font-bold text-xs">
                        +42.2%
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="mt-4 w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-700 text-xs font-bold transition-all"
                >
                  <i className="fa-solid fa-print mr-1.5"></i> In Phiếu Kết Toán
                  Cuối Ngày (Z-Report)
                </button>
              </div>
            </section>
          </main>

          {/* MODAL: RECEIPT DETAIL */}
          {selectedReceipt && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-dashed border-zinc-700 text-center relative">
                  <button
                    onClick={() => setSelectedReceipt(null)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <h3 className="font-serif font-bold text-lg text-white">
                    ROYAL BARBER POS RECEIPT
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    88 Phố Cổ, Hoàn Kiếm, Hà Nội
                  </p>
                </div>
                <div className="p-5 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Mã hóa đơn:</span>
                    <span className="font-mono font-bold text-amber-400">
                      #{selectedReceipt.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Thời gian:</span>
                    <span className="text-white">{selectedReceipt.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Khách hàng:</span>
                    <span className="font-bold text-white">
                      {selectedReceipt.customer}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Barber thực hiện:</span>
                    <span className="text-amber-400 font-semibold">
                      {selectedReceipt.barber}
                    </span>
                  </div>
                  <div className="py-3 border-y border-dashed border-zinc-700">
                    <p className="text-zinc-400 mb-1">Chi tiết thanh toán:</p>
                    <p className="font-semibold text-white">
                      {selectedReceipt.items}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-sm text-white">
                      TỔNG CỘNG ({selectedReceipt.method}):
                    </span>
                    <span className="text-lg font-bold text-emerald-400">
                      {formatVND(selectedReceipt.amount)}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950/60 border-t border-barber-border">
                  <button
                    onClick={() => {
                      setSelectedReceipt(null);
                      showToast(
                        "Đã in lại hóa đơn",
                        "Bản sao hóa đơn K80 đã được gửi tới máy in nhiệt!"
                      );
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                  >
                    <i className="fa-solid fa-print mr-1.5"></i> In Lại Hóa Đơn
                    K80
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
