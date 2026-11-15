// Phụ trách: Trần Việt Anh – Dashboard tổng quan cấp ứng dụng (Tone Vàng Đen Luxury)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AppDashboard() {
  const [filterPeriod, setFilterPeriod] = useState("today");

  // Dữ liệu mẫu thống kê cấp ứng dụng
  const stats = [
    {
      title: "Lịch hẹn hôm nay",
      value: "28 lượt",
      change: "+16.8%",
      isPositive: true,
      icon: "📅",
      desc: "So với cùng kỳ tuần trước"
    },
    {
      title: "Doanh thu ước tính",
      value: "5.820.000 đ",
      change: "+12.4%",
      isPositive: true,
      icon: "💰",
      desc: "Doanh thu dịch vụ trong ngày"
    },
    {
      title: "Thợ trực hiện tại",
      value: "7 / 8 Stylist",
      change: "87.5%",
      isPositive: true,
      icon: "💈",
      desc: "Thợ đang sẵn sàng nhận ca"
    },
    {
      title: "Khách hàng thành viên",
      value: "1,248 khách",
      change: "+34 mới",
      isPositive: true,
      icon: "👥",
      desc: "Tổng số tài khoản đã đăng ký"
    },
    {
      title: "Đánh giá chất lượng",
      value: "4.92 / 5.0 ⭐",
      change: "+0.15",
      isPositive: true,
      icon: "🌟",
      desc: "Dựa trên 236 đánh giá"
    }
  ];

  // Dữ liệu lịch hẹn mẫu gần nhất
  const recentBookings = [
    {
      id: "BK-1001",
      customer: "Nguyễn Văn Hùng",
      service: "Cắt Tóc Undercut VIP + Gội Massage",
      barber: "Trần Hải Long",
      time: "09:30 - Hôm nay",
      price: "180.000 đ",
      status: "confirmed",
      statusText: "Đã xác nhận"
    },
    {
      id: "BK-1002",
      customer: "Lê Hoàng Minh",
      service: "Combo Uốn Hàn Quốc + Cắt Tạo Kiểu",
      barber: "Phạm Quốc Tuấn",
      time: "10:15 - Hôm nay",
      price: "350.000 đ",
      status: "pending",
      statusText: "Chờ xác nhận"
    },
    {
      id: "BK-1003",
      customer: "Vũ Đình Trọng",
      service: "Cạo Râu Khăn Nóng & Chăm Sóc Da",
      barber: "Đặng Tiến Đạt",
      time: "11:00 - Hôm nay",
      price: "120.000 đ",
      status: "completed",
      statusText: "Đã hoàn thành"
    },
    {
      id: "BK-1004",
      customer: "Đỗ Mạnh Cường",
      service: "Cắt Tóc Nam Cổ Điển Pompadour",
      barber: "Trần Hải Long",
      time: "14:00 - Hôm nay",
      price: "150.000 đ",
      status: "confirmed",
      statusText: "Đã xác nhận"
    }
  ];

  // Dữ liệu phân bố dịch vụ
  const serviceDistribution = [
    { name: "Cắt tóc tạo kiểu tiêu chuẩn", percent: 45, color: "#f59e0b" },
    { name: "Combo Uốn / Nhuộm thời trang", percent: 25, color: "#fbbf24" },
    { name: "Cạo râu khăn nóng & Massage", percent: 18, color: "#10b981" },
    { name: "Phục hồi tóc & Chăm sóc da đầu", percent: 12, color: "#3b82f6" }
  ];

  // Danh mục module Sprint 2
  const sprintModules = [
    {
      title: "Giao diện Khách hàng (Customer)",
      owner: "Lương Trọng Đạt",
      links: [
        { label: "Trang chủ", to: "/" },
        { label: "Danh sách dịch vụ", to: "/services" },
        { label: "Đội ngũ Barber", to: "/barbers" },
        { label: "Lịch sử đặt lịch", to: "/my-bookings" }
      ]
    },
    {
      title: "Đặt lịch & Lịch biểu (Booking)",
      owner: "Vũ Anh Đức",
      links: [
        { label: "1. Chọn dịch vụ", to: "/booking/service" },
        { label: "2. Chọn Barber", to: "/booking/barber" },
        { label: "3. Chọn khung giờ", to: "/booking/slot" },
        { label: "4. Xác nhận đặt", to: "/booking/confirm" }
      ]
    },
    {
      title: "Giao diện Thợ cắt tóc (Barber)",
      owner: "Vũ Quốc Khánh",
      links: [
        { label: "Bàn làm việc Barber", to: "/barber" },
        { label: "Lịch hẹn thợ", to: "/barber/appointments" },
        { label: "Đánh giá từ khách", to: "/barber/reviews" },
        { label: "Thu nhập cá nhân", to: "/barber/earnings" }
      ]
    },
    {
      title: "Giao diện Quản trị (Admin)",
      owner: "Trần Văn Thắng",
      links: [
        { label: "Admin Dashboard", to: "/admin" },
        { label: "Quản lý Người dùng", to: "/admin/users" },
        { label: "Quản lý Dịch vụ", to: "/admin/services" },
        { label: "Thống kê Doanh thu", to: "/admin/revenue" }
      ]
    },
    {
      title: "Xác thực & Bảo mật (Auth)",
      owner: "Thiều Tiến Dũng",
      links: [
        { label: "Đăng nhập", to: "/login" },
        { label: "Đăng ký thành viên", to: "/register" },
        { label: "Quên mật khẩu", to: "/forgot-password" }
      ]
    },
    {
      title: "Nền tảng & Tích hợp (Foundation)",
      owner: "Trần Việt Anh",
      links: [
        { label: "Trang lỗi 404", to: "/page-not-found-demo" },
        { label: "Điều khoản & Bảo mật", to: "/privacy" },
        { label: "Quy ước API & Checklist", to: "/overview" }
      ]
    }
  ];

  return (
    <div className="container" style={{ paddingBottom: "48px" }}>
      {/* Top Banner Header Vàng Đen */}
      <div style={{
        background: "linear-gradient(135deg, #0e1015 0%, #171b26 50%, #1f1b13 100%)",
        border: "1px solid var(--gold-border)",
        borderRadius: "var(--radius-lg)",
        padding: "40px 36px",
        marginBottom: "36px",
        boxShadow: "var(--shadow-card), var(--gold-glow-subtle)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Vệt sáng trang trí */}
        <div style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span className="badge badge-gold">
                👑 BARBERHUB PORTAL
              </span>
              <span className="badge badge-neutral" style={{ color: "var(--text-secondary)" }}>
                Sprint 2 – Giao diện Mockup Vàng Đen
              </span>
            </div>
            <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#ffffff", marginBottom: "10px", letterSpacing: "-0.5px" }}>
              Bảng Điều Khiển Tổng Quan Cấp Ứng Dụng
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "660px", lineHeight: "1.6" }}>
              Theo dõi và kiểm thử toàn diện các luồng nghiệp vụ của hệ thống chuỗi Barber Shop cao cấp.
              Bộ điều hướng đồng nhất chuẩn phong cách quý ông hiện đại.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/booking/service" className="btn btn-primary">
              ✂️ Đặt Lịch Ngay
            </Link>
            <Link to="/barber" className="btn btn-outline-gold">
              💈 Cổng Thợ Barber
            </Link>
            <Link to="/admin" className="btn btn-secondary">
              🛡️ Quản Trị Admin
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "var(--gold-light)" }}>📊</span> Chỉ Số Vận Hành Cốt Lõi (Dữ liệu mẫu)
        </h2>
        <span style={{ fontSize: "13px", color: "var(--gold-light)", fontWeight: "600" }}>
          ● Hệ thống thời gian thực
        </span>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "18px",
        marginBottom: "40px"
      }}>
        {stats.map((item, idx) => (
          <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)" }}>
                {item.title}
              </span>
              <span style={{
                fontSize: "20px",
                background: "rgba(245, 158, 11, 0.12)",
                padding: "6px",
                borderRadius: "8px",
                border: "1px solid rgba(245, 158, 11, 0.25)"
              }}>
                {item.icon}
              </span>
            </div>

            <div style={{ fontSize: "26px", fontWeight: "900", color: "var(--gold-bright)", marginBottom: "10px", letterSpacing: "-0.5px" }}>
              {item.value}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "12px", paddingTop: "8px", borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{
                color: item.isPositive ? "#34d399" : "#f87171",
                fontWeight: "700",
                background: item.isPositive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                padding: "2px 8px",
                borderRadius: "4px"
              }}>
                {item.change}
              </span>
              <span style={{ color: "var(--text-muted)" }}>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Recent Bookings */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1.7fr 1fr",
        gap: "24px",
        marginBottom: "40px"
      }}>
        {/* Cột trái: Lịch hẹn hôm nay */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>📅</span> Lịch Hẹn Mới Nhất Hôm Nay
            </h3>
            <span className="badge badge-gold">4 lịch gần nhất</span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-medium)", color: "var(--gold-light)", fontSize: "12px", letterSpacing: "0.05em" }}>
                  <th style={{ padding: "12px 10px" }}>MÃ</th>
                  <th style={{ padding: "12px 10px" }}>KHÁCH HÀNG</th>
                  <th style={{ padding: "12px 10px" }}>DỊCH VỤ</th>
                  <th style={{ padding: "12px 10px" }}>BARBER</th>
                  <th style={{ padding: "12px 10px" }}>GIỜ</th>
                  <th style={{ padding: "12px 10px" }}>GIÁ TIỀN</th>
                  <th style={{ padding: "12px 10px" }}>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} style={{ borderBottom: "1px solid var(--border-subtle)", transition: "background 0.2s" }}>
                    <td style={{ padding: "14px 10px", fontWeight: "800", color: "var(--gold-light)" }}>{b.id}</td>
                    <td style={{ padding: "14px 10px", fontWeight: "600", color: "#ffffff" }}>{b.customer}</td>
                    <td style={{ padding: "14px 10px", color: "var(--text-secondary)" }}>{b.service}</td>
                    <td style={{ padding: "14px 10px", color: "var(--text-secondary)" }}>💈 {b.barber}</td>
                    <td style={{ padding: "14px 10px", color: "var(--text-muted)", fontSize: "13px" }}>{b.time}</td>
                    <td style={{ padding: "14px 10px", fontWeight: "800", color: "var(--gold-bright)" }}>{b.price}</td>
                    <td style={{ padding: "14px 10px" }}>
                      <span className={`badge ${
                        b.status === "completed" ? "badge-success" :
                        b.status === "confirmed" ? "badge-info" : "badge-warning"
                      }`}>
                        {b.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cột phải: Tỷ trọng dịch vụ */}
        <div className="card">
          <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <span>✂️</span> Tỷ Trọng Dịch Vụ
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>
            Tỷ lệ lựa chọn các gói dịch vụ nổi bật trong tháng.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {serviceDistribution.map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
                  <span style={{ color: item.color, fontWeight: "800" }}>{item.percent}%</span>
                </div>
                <div style={{ height: "8px", background: "#0a0b0f", borderRadius: "99px", overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
                  <div style={{ width: `${item.percent}%`, height: "100%", background: item.color, borderRadius: "99px", boxShadow: `0 0 10px ${item.color}` }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "28px", padding: "16px", background: "#0b0c10", borderRadius: "var(--radius-md)", border: "1px solid var(--gold-border)" }}>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--gold-bright)", marginBottom: "4px" }}>
              💡 Mẹo quản lý phong cách tiệm
            </div>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
              Khách hàng rất chuộng trải nghiệm kết hợp Cắt tóc + Cạo râu khăn nóng. Hãy tăng cường ưu đãi combo vào các ngày trong tuần.
            </p>
          </div>
        </div>
      </div>

      {/* Điều hướng nhanh các phân hệ Sprint 2 */}
      <h2 style={{ fontSize: "20px", fontWeight: "800", marginBottom: "20px", color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ color: "var(--gold-light)" }}>🚀</span> Điều Hướng Kiểm Thử 7 Phân Hệ Sprint 2
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "20px"
      }}>
        {sprintModules.map((mod, index) => (
          <div key={index} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h4 style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
                {mod.title}
              </h4>
              <div style={{ fontSize: "12px", color: "var(--gold-light)", fontWeight: "700", marginBottom: "16px" }}>
                👤 Phụ trách: {mod.owner}
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                {mod.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.to}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "9px 14px",
                        background: "#0c0e14",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--border-subtle)",
                        fontWeight: "500",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--gold-primary)";
                        e.currentTarget.style.color = "var(--gold-light)";
                        e.currentTarget.style.transform = "translateX(3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--border-subtle)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }}
                    >
                      <span>{link.label}</span>
                      <span style={{ fontSize: "11px", color: "var(--gold-primary)", fontWeight: "700" }}>{link.to} →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
