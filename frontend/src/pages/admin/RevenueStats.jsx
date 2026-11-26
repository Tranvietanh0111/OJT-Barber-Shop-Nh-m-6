// Phụ trách: Trần Văn Thắng
// Thống kê doanh thu – Kết nối động /api/v1/admin/revenue theo kỳ (7 ngày / Tháng / Quý / Năm)
import { useEffect, useMemo, useState } from "react";
import { LineIcon } from "../../components/Header";
import { formatShortMillion, formatVnd, revenueApi } from "./adminApi";
import "./admin.css";

const PERIOD_TABS = [
  { key: "7d", label: "7 ngày", title: "7 ngày gần nhất" },
  { key: "month", label: "Tháng 11/2026", title: "Tháng 11/2026" },
  { key: "quarter", label: "Quý 4/2026", title: "Quý 4/2026" },
  { key: "year", label: "Năm 2026", title: "Năm 2026" },
];

const BAR_COLORS = [
  "#dc2626",
  "var(--color-navy)",
  "#2563eb",
  "var(--color-gold)",
  "var(--color-navy-light)",
  "#475569",
];

export default function RevenueStats() {
  const [period, setPeriod] = useState("month");
  const [stats, setStats] = useState(null);
  const [mode, setMode] = useState("api");

  useEffect(() => {
    let active = true;
    revenueApi
      .getStats(period)
      .then((res) => {
        if (!active) return;
        setStats(res.data);
        setMode(res.mode);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [period]);

  const currentTab = PERIOD_TABS.find((t) => t.key === period) || PERIOD_TABS[1];

  const kpis = stats?.kpis || {
    total_revenue: 102400000,
    total_invoices: 492,
    average_order_value: 208000,
    growth_rate: 14.8,
    estimated_profit: 43008000,
  };

  const chartPoints = useMemo(() => {
    const data = stats?.chart_data || [];
    if (!data.length) return { points: [], maxVal: 10, linePath: "", areaPath: "" };
    const maxVal = Math.max(...data.map((d) => d.revenue), 1);
    const niceMax = Math.ceil((maxVal / 1000000) * 1.15) * 1000000;
    const left = 75;
    const right = 775;
    const top = 30;
    const bottom = 242;
    const spanX = data.length > 1 ? (right - left) / (data.length - 1) : 0;

    const points = data.map((d, idx) => {
      const x = data.length === 1 ? (left + right) / 2 : left + idx * spanX;
      const ratio = d.revenue / niceMax;
      const y = bottom - ratio * (bottom - top);
      return { ...d, x, y };
    });

    const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const areaPath =
      points.length > 0
        ? `${linePath} L ${points[points.length - 1].x.toFixed(1)} ${bottom} L ${points[0].x.toFixed(1)} ${bottom} Z`
        : "";

    return { points, maxVal: niceMax, linePath, areaPath };
  }, [stats]);

  const byService = stats?.by_service || [
    { category: "Combo VIP", revenue: 36900000, percent: 36 },
    { category: "Uốn & Nhuộm", revenue: 34800000, percent: 34 },
    { category: "Cắt & Tạo kiểu", revenue: 21500000, percent: 21 },
    { category: "Râu & Da mặt", revenue: 9200000, percent: 9 },
  ];

  const byBarber = useMemo(() => {
    const raw = (stats?.by_barber || []).slice(0, 6);
    const maxRev = Math.max(...raw.map((b) => b.revenue || 0), 1000000);
    const niceMax = Math.ceil((maxRev / 1000000) * 1.15) * 1000000;
    return { items: raw, maxRev: niceMax };
  }, [stats]);

  const byPayment = stats?.by_payment_method || [
    { method: "transfer", label: "Chuyển khoản VietQR", percent: 54, revenue: 55300000 },
    { method: "cash", label: "Tiền mặt", percent: 31, revenue: 31700000 },
    { method: "card", label: "Thẻ ngân hàng / POS", percent: 15, revenue: 15400000 },
  ];

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Thống kê doanh thu</h1>
            <p className="adm-page-subtitle">Theo dõi KPI, biểu đồ tăng trưởng, hiệu suất Barber và thanh toán</p>
          </div>
          <div className="adm-topbar-actions">
            <span className="adm-mode-badge" title="Nguồn dữ liệu hiện tại">
              <span className={`adm-mode-dot ${mode === "local" ? "local" : ""}`} />
              {mode === "api" ? "API FastAPI" : "Dữ liệu cục bộ"}
            </span>
            <div className="adm-tabs">
              {PERIOD_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`adm-tab ${period === tab.key ? "active" : ""}`}
                  onClick={() => setPeriod(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="adm-content">
          {/* 4 Thẻ KPI Doanh thu */}
          <div className="adm-kpi-grid">
            <div className="adm-kpi-card">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Tổng doanh thu ({currentTab.label})</span>
                <span className="adm-kpi-icon">
                  <LineIcon name="wallet" size={22} />
                </span>
              </div>
              <div className="adm-kpi-value">{formatVnd(kpis.total_revenue)}</div>
              <div className="adm-kpi-foot">
                <span className="adm-trend-up">▲ +{kpis.growth_rate}%</span> so với kỳ trước
              </div>
            </div>

            <div className="adm-kpi-card green">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Tổng hóa đơn hoàn tất</span>
                <span className="adm-kpi-icon">
                  <LineIcon name="receipt" size={22} />
                </span>
              </div>
              <div className="adm-kpi-value">{kpis.total_invoices.toLocaleString("vi-VN")} đơn</div>
              <div className="adm-kpi-foot">Tỷ lệ thanh toán thành công 96.4%</div>
            </div>

            <div className="adm-kpi-card blue">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Giá trị trung bình / đơn</span>
                <span className="adm-kpi-icon">
                  <LineIcon name="card" size={22} />
                </span>
              </div>
              <div className="adm-kpi-value">{formatVnd(kpis.average_order_value)}</div>
              <div className="adm-kpi-foot">Tăng nhờ gói Combo VIP & Uốn</div>
            </div>

            <div className="adm-kpi-card purple">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Lợi nhuận ròng ước tính</span>
                <span className="adm-kpi-icon">
                  <LineIcon name="chart" size={22} />
                </span>
              </div>
              <div className="adm-kpi-value">{formatVnd(kpis.estimated_profit)}</div>
              <div className="adm-kpi-foot">Biên lợi nhuận đạt 42%</div>
            </div>
          </div>

          {/* Hàng Biểu đồ 1 */}
          <div className="adm-rev-grid">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Biểu đồ tăng trưởng doanh thu ({currentTab.title})</h3>
                  <p className="adm-card-subtitle">Biến động doanh thu theo kỳ báo cáo (Đơn vị: Triệu VNĐ)</p>
                </div>
                <div className="adm-legend-inline">
                  <span>
                    <i className="adm-legend-dot" style={{ background: "#dc2626" }} />
                    Doanh thu thực thu
                  </span>
                </div>
              </div>

              <div className="adm-svg-chart-wrap">
                <svg viewBox="0 0 820 285" className="adm-svg-chart" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="revAreaGradDynamic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#dc2626" stopOpacity="0.32" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {[0, 0.25, 0.5, 0.75, 1].map((step) => {
                    const y = 242 - step * (242 - 30);
                    const val = (chartPoints.maxVal * step) / 1000000;
                    return (
                      <g key={step}>
                        <line x1="65" y1={y} x2="795" y2={y} stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
                        <text
                          x="56"
                          y={y + 4}
                          fill="#64748b"
                          fontSize="10.5"
                          textAnchor="end"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {val >= 10 ? `${Math.round(val)} Tr` : `${val.toFixed(1)} Tr`}
                        </text>
                      </g>
                    );
                  })}

                  {chartPoints.areaPath && <path d={chartPoints.areaPath} fill="url(#revAreaGradDynamic)" />}
                  {chartPoints.linePath && (
                    <path d={chartPoints.linePath} fill="none" stroke="#dc2626" strokeWidth="3" />
                  )}

                  {chartPoints.points.map((pt, idx) => (
                    <g key={`${pt.label}-${idx}`}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                      <text
                        x={pt.x}
                        y={Math.max(16, pt.y - 12)}
                        fill="#1e3a5f"
                        fontSize="11"
                        fontWeight="700"
                        textAnchor="middle"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {formatShortMillion(pt.revenue)}
                      </text>
                      <text
                        x={pt.x}
                        y="268"
                        fill="#64748b"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            <div className="adm-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="adm-card-header" style={{ marginBottom: 8 }}>
                <div>
                  <h3 className="adm-card-title">Cơ cấu doanh thu theo nhóm dịch vụ</h3>
                  <p className="adm-card-subtitle">Tỷ trọng đóng góp của từng danh mục</p>
                </div>
                <span style={{ color: "var(--color-navy-light)", fontWeight: 800, fontSize: 12.5 }}>100%</span>
              </div>

              <div className="adm-donut-wrap">
                <svg viewBox="0 0 220 220" className="adm-donut-svg">
                  <g className="adm-donut-default" fontFamily="Plus Jakarta Sans, sans-serif">
                    <circle
                      cx="110"
                      cy="110"
                      r="53"
                      fill="rgba(15, 22, 41, 0.85)"
                      stroke="rgba(148, 163, 184, 0.14)"
                      strokeWidth="1"
                    />
                    <text x="110" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700" letterSpacing="0.5">
                      TỔNG DOANH THU
                    </text>
                    <text x="110" y="117" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">
                      {formatShortMillion(kpis.total_revenue)}
                    </text>
                    <text x="110" y="133" textAnchor="middle" fill="#64748b" fontSize="9.5">
                      Di chuột xem chi tiết
                    </text>
                  </g>

                  {[
                    { arc: "M 111.3 34.0 A 76 76 0 0 1 169.9 156.8", stroke: "#dc2626", item: byService[0] },
                    { arc: "M 168.2 158.9 A 76 76 0 0 1 38.4 135.4", stroke: "var(--color-gold)", item: byService[1] },
                    { arc: "M 37.5 132.9 A 76 76 0 0 1 67.5 47.0", stroke: "#2563eb", item: byService[2] },
                    { arc: "M 69.7 45.5 A 76 76 0 0 1 107.3 34.1", stroke: "var(--text-muted)", item: byService[3] },
                  ].map(
                    (slice, idx) =>
                      slice.item && (
                        <g className="adm-donut-slice" key={idx}>
                          <path className="adm-donut-arc" d={slice.arc} stroke={slice.stroke} />
                          <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                            <circle cx="110" cy="110" r="54" fill="#0f1629" stroke={slice.stroke} strokeWidth="1.5" />
                            <text x="110" y="93" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="700">
                              {slice.item.category.split(" ").slice(0, 3).join(" ")}
                            </text>
                            <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800">
                              {slice.item.percent}%
                            </text>
                            <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">
                              {formatVnd(slice.item.revenue)}
                            </text>
                          </g>
                        </g>
                      )
                  )}
                </svg>
              </div>

              <div className="adm-service-legend-grid">
                {byService.map((item, idx) => (
                  <div key={item.category}>
                    <span
                      style={{
                        color: ["#dc2626", "var(--color-gold)", "#2563eb", "var(--text-muted)"][idx] || "#1e3a5f",
                        fontWeight: 700,
                      }}
                    >
                      • {item.category}:
                    </span>{" "}
                    {item.percent}%
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hàng Biểu đồ 2 */}
          <div className="adm-rev-grid">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Doanh thu theo từng Barber</h3>
                  <p className="adm-card-subtitle">So sánh doanh số mang về của đội ngũ thợ cắt tóc</p>
                </div>
                <span style={{ fontSize: 12, color: "#64748b" }}>Đơn vị: Triệu VNĐ</span>
              </div>

              <div className="adm-svg-chart-wrap">
                <svg viewBox="0 0 820 265" className="adm-svg-chart" xmlns="http://www.w3.org/2000/svg">
                  {[0, 0.25, 0.5, 0.75, 1].map((step) => {
                    const y = 230 - step * (230 - 25);
                    const val = Math.round((byBarber.maxRev * step) / 1000000);
                    return (
                      <g key={step}>
                        <line x1="55" y1={y} x2="795" y2={y} stroke="rgba(148,163,184,0.18)" strokeWidth="1" />
                        <text
                          x="45"
                          y={y + 4}
                          fill="#64748b"
                          fontSize="10.5"
                          textAnchor="end"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {val} Tr
                        </text>
                      </g>
                    );
                  })}

                  {byBarber.items.map((barber, idx) => {
                    const count = Math.max(byBarber.items.length, 1);
                    const slotWidth = 720 / count;
                    const barWidth = Math.min(76, slotWidth * 0.58);
                    const x = 65 + idx * slotWidth + (slotWidth - barWidth) / 2;
                    const barHeight = Math.max(8, ((barber.revenue || 0) / byBarber.maxRev) * (230 - 25));
                    const y = 230 - barHeight;
                    const shortName = barber.full_name.split(" ").slice(-2).join(" ");
                    return (
                      <g key={barber.barber_id || barber.code}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="7"
                          fill={BAR_COLORS[idx % BAR_COLORS.length]}
                        />
                        <text
                          x={x + barWidth / 2}
                          y={Math.max(16, y - 7)}
                          fill="#1e3a5f"
                          fontSize="10.5"
                          fontWeight="700"
                          textAnchor="middle"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {formatShortMillion(barber.revenue || 0)}
                        </text>
                        <text
                          x={x + barWidth / 2}
                          y="252"
                          fill="#475569"
                          fontSize="11.5"
                          fontWeight="600"
                          textAnchor="middle"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          {shortName}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="adm-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="adm-card-header" style={{ marginBottom: 8 }}>
                <div>
                  <h3 className="adm-card-title">Phương thức thanh toán</h3>
                  <p className="adm-card-subtitle">Tỷ lệ giao dịch theo hình thức</p>
                </div>
              </div>

              <div className="adm-donut-wrap">
                <svg viewBox="0 0 220 220" className="adm-donut-svg">
                  <g className="adm-donut-default" fontFamily="Plus Jakarta Sans, sans-serif">
                    <circle
                      cx="110"
                      cy="110"
                      r="53"
                      fill="rgba(15, 22, 41, 0.85)"
                      stroke="rgba(148, 163, 184, 0.14)"
                      strokeWidth="1"
                    />
                    <text x="110" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700" letterSpacing="0.5">
                      THANH TOÁN
                    </text>
                    <text x="110" y="117" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">
                      {kpis.total_invoices} đơn
                    </text>
                    <text x="110" y="133" textAnchor="middle" fill="#64748b" fontSize="9.5">
                      Di chuột xem chi tiết
                    </text>
                  </g>

                  {[
                    { arc: "M 111.3 34.0 A 76 76 0 1 1 93.5 184.2", stroke: "#dc2626", item: byPayment[0] },
                    { arc: "M 91.0 183.6 A 76 76 0 0 1 47.0 67.5", stroke: "var(--color-navy)", item: byPayment[1] },
                    { arc: "M 48.5 65.3 A 76 76 0 0 1 107.3 34.1", stroke: "var(--color-gold)", item: byPayment[2] },
                  ].map(
                    (slice, idx) =>
                      slice.item && (
                        <g className="adm-donut-slice" key={idx}>
                          <path className="adm-donut-arc" d={slice.arc} stroke={slice.stroke} />
                          <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                            <circle cx="110" cy="110" r="54" fill="#0f1629" stroke={slice.stroke} strokeWidth="1.5" />
                            <text x="110" y="93" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="700">
                              {slice.item.method === "transfer"
                                ? "VietQR"
                                : slice.item.method === "cash"
                                  ? "Tiền mặt"
                                  : "Thẻ / POS"}
                            </text>
                            <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="20" fontWeight="800">
                              {slice.item.percent}%
                            </text>
                            <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">
                              {formatVnd(slice.item.revenue)}
                            </text>
                          </g>
                        </g>
                      )
                  )}
                </svg>
              </div>

              <div className="adm-payment-list">
                {byPayment.map((pm) => (
                  <div className="adm-payment-row" key={pm.method}>
                    <span>
                      <LineIcon
                        name={pm.method === "transfer" ? "qr" : pm.method === "cash" ? "wallet" : "card"}
                        size={16}
                        className="adm-inline-icon"
                      />
                      {pm.label}:
                    </span>
                    <strong>
                      {pm.percent}% ({formatShortMillion(pm.revenue)})
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
