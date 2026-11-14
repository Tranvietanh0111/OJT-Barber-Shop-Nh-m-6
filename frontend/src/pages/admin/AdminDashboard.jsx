// Phụ trách: Trần Văn Thắng
// Task 6 (Sprint 2): Xây dựng giao diện Admin Dashboard – Dashboard với số liệu mẫu và bố cục hoàn chỉnh (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function AdminDashboard() {
  return (
    <div className="adm-shell">
      <aside className="adm-sidebar">
        <div className="adm-brand">
          <div className="adm-brand-logo">BH</div>
          <div>
            <h2 className="adm-brand-title">BarberHub</h2>
            <p className="adm-brand-sub">Admin Panel</p>
          </div>
        </div>
        <div className="adm-nav-section">Menu Quản Trị</div>
        <nav className="adm-nav">
          <Link to="/admin" className="adm-nav-link active">
            <span className="adm-nav-left"><span className="adm-nav-icon">📊</span><span>Admin Dashboard</span></span>
          </Link>
          <Link to="/admin/users" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">👥</span><span>Quản lý người dùng</span></span>
          </Link>
          <Link to="/admin/barbers" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">✂️</span><span>Quản lý Barber</span></span>
          </Link>
          <Link to="/admin/services" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">💈</span><span>Quản lý dịch vụ</span></span>
          </Link>
          <Link to="/admin/appointments" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">📅</span><span>Quản lý lịch hẹn</span></span>
          </Link>
          <Link to="/admin/invoices" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">🧾</span><span>Quản lý hóa đơn</span></span>
          </Link>
          <Link to="/admin/revenue" className="adm-nav-link">
            <span className="adm-nav-left"><span className="adm-nav-icon">📈</span><span>Thống kê doanh thu</span></span>
          </Link>
        </nav>
        <div className="adm-sidebar-footer">
          <div>
            <strong>Trần Văn Thắng</strong>
            <span>Phụ trách: Admin</span>
          </div>
          <a href="#logout" className="adm-logout-btn" title="Đăng xuất">
            <i className="fa-solid fa-right-from-bracket" />
          </a>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Admin Dashboard</h1>
            <p className="adm-page-subtitle">Dashboard với số liệu mẫu và bố cục hoàn chỉnh</p>
          </div>
          <div className="adm-topbar-actions">
            <Link to="/admin/appointments" className="adm-btn adm-btn-outline">📅 Xem lịch hẹn</Link>
            <Link to="/admin/revenue" className="adm-btn adm-btn-gold">📈 Thống kê doanh thu</Link>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-kpi-grid">
            <div className="adm-kpi-card">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Doanh thu tháng</span>
                <span className="adm-kpi-icon">💰</span>
              </div>
              <div className="adm-kpi-value">102.400.000 đ</div>
              <div className="adm-kpi-foot"><span className="adm-trend-up">▲ +14.8%</span> so với tháng trước</div>
            </div>

            <div className="adm-kpi-card green">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Lịch hẹn hôm nay</span>
                <span className="adm-kpi-icon">📅</span>
              </div>
              <div className="adm-kpi-value">24 lịch</div>
              <div className="adm-kpi-foot">4 lịch đang chờ xác nhận</div>
            </div>

            <div className="adm-kpi-card blue">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Barber đang làm việc</span>
                <span className="adm-kpi-icon">✂️</span>
              </div>
              <div className="adm-kpi-value">4 / 5 thợ</div>
              <div className="adm-kpi-foot">1 thợ nghỉ phép hôm nay</div>
            </div>

            <div className="adm-kpi-card purple">
              <div className="adm-kpi-top">
                <span className="adm-kpi-label">Tổng người dùng</span>
                <span className="adm-kpi-icon">👥</span>
              </div>
              <div className="adm-kpi-value">342 tài khoản</div>
              <div className="adm-kpi-foot"><span className="adm-trend-up">+28</span> khách hàng mới</div>
            </div>
          </div>

          <div className="adm-rev-grid">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Biểu đồ doanh thu 7 ngày gần nhất (Số liệu mẫu)</h3>
                  <p className="adm-card-subtitle">Đơn vị tính: Triệu VNĐ</p>
                </div>
                <div className="adm-legend-inline">
                  <span><i className="adm-legend-dot" style={{ background: "#f59e0b" }} />Doanh thu ngày</span>
                </div>
              </div>

              <div className="adm-svg-chart-wrap">
                <svg viewBox="0 0 760 250" className="adm-svg-chart" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="dashGoldGradReact" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  <g stroke="rgba(148,163,184,0.12)" strokeWidth="1">
                    <line x1="55" y1="25" x2="725" y2="25" />
                    <line x1="55" y1="62" x2="725" y2="62" />
                    <line x1="55" y1="99" x2="725" y2="99" />
                    <line x1="55" y1="136" x2="725" y2="136" />
                    <line x1="55" y1="173" x2="725" y2="173" />
                    <line x1="55" y1="210" x2="725" y2="210" />
                  </g>

                  <g fill="#94a3b8" fontSize="11" textAnchor="end" fontFamily="Plus Jakarta Sans, sans-serif">
                    <text x="45" y="29">7.5M</text>
                    <text x="45" y="66">6.0M</text>
                    <text x="45" y="103">4.5M</text>
                    <text x="45" y="140">3.0M</text>
                    <text x="45" y="177">1.5M</text>
                    <text x="45" y="214">0M</text>
                  </g>

                  <path
                    d="M 75 131 C 115 125, 145 109, 180 109 C 215 109, 250 119, 285 119 C 320 119, 355 99, 390 99 C 425 99, 460 89, 495 89 C 530 89, 565 64, 600 64 C 635 64, 670 52, 705 52 L 705 210 L 75 210 Z"
                    fill="url(#dashGoldGradReact)"
                  />
                  <path
                    d="M 75 131 C 115 125, 145 109, 180 109 C 215 109, 250 119, 285 119 C 320 119, 355 99, 390 99 C 425 99, 460 89, 495 89 C 530 89, 565 64, 600 64 C 635 64, 670 52, 705 52"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                  />

                  <g fill="#f59e0b" stroke="#0b0f19" strokeWidth="2">
                    <circle cx="75" cy="131" r="4.5" />
                    <circle cx="180" cy="109" r="4.5" />
                    <circle cx="285" cy="119" r="4.5" />
                    <circle cx="390" cy="99" r="4.5" />
                    <circle cx="495" cy="89" r="4.5" />
                    <circle cx="600" cy="64" r="4.5" />
                    <circle cx="705" cy="52" r="5.5" />
                  </g>

                  <g fill="#f5cb78" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
                    <text x="75" y="119">3.2M</text>
                    <text x="180" y="97">4.1M</text>
                    <text x="285" y="107">3.7M</text>
                    <text x="390" y="87">4.5M</text>
                    <text x="495" y="77">4.9M</text>
                    <text x="600" y="52">5.9M</text>
                    <text x="705" y="40">6.4M</text>
                  </g>

                  <g fill="#cbd5e1" fontSize="11.5" fontWeight="600" textAnchor="middle" fontFamily="Plus Jakarta Sans, sans-serif">
                    <text x="75" y="234">T2</text>
                    <text x="180" y="234">T3</text>
                    <text x="285" y="234">T4</text>
                    <text x="390" y="234">T5</text>
                    <text x="495" y="234">T6</text>
                    <text x="600" y="234">T7</text>
                    <text x="705" y="234" fill="#f5cb78">CN</text>
                  </g>
                </svg>
              </div>
            </div>

            <div className="adm-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="adm-card-header" style={{ marginBottom: 6 }}>
                <div>
                  <h3 className="adm-card-title">Dịch vụ được đặt nhiều nhất</h3>
                  <p className="adm-card-subtitle">Thống kê tỷ lệ sử dụng trong tháng</p>
                </div>
                <span style={{ color: "#f5cb78", fontWeight: 800, fontSize: 12.5 }}>573 lượt</span>
              </div>

              <div className="adm-donut-wrap">
                <svg viewBox="0 0 220 220" className="adm-donut-svg">
                  <g className="adm-donut-default" fontFamily="Plus Jakarta Sans, sans-serif">
                    <circle cx="110" cy="110" r="53" fill="rgba(15, 22, 41, 0.85)" stroke="rgba(148, 163, 184, 0.14)" strokeWidth="1" />
                    <text x="110" y="95" textAnchor="middle" fill="#94a3b8" fontSize="9.5" fontWeight="700" letterSpacing="0.5">TỔNG LƯỢT ĐẶT</text>
                    <text x="110" y="117" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="800">573 lượt</text>
                    <text x="110" y="133" textAnchor="middle" fill="#64748b" fontSize="9.5">Di chuột xem chi tiết</text>
                  </g>

                  <g className="adm-donut-slice">
                    <path className="adm-donut-arc" d="M 111.3 34.0 A 76 76 0 0 1 165.6 161.8" stroke="#e5a93c" />
                    <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                      <circle cx="110" cy="110" r="54" fill="#0f1629" stroke="#e5a93c" strokeWidth="1.5" />
                      <text x="110" y="93" textAnchor="middle" fill="#f5cb78" fontSize="10.5" fontWeight="700">Cắt Thương Gia</text>
                      <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800">37.5%</text>
                      <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">215 lượt đặt</text>
                    </g>
                  </g>

                  <g className="adm-donut-slice">
                    <path className="adm-donut-arc" d="M 163.7 163.7 A 76 76 0 0 1 39.3 137.9" stroke="#38bdf8" />
                    <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                      <circle cx="110" cy="110" r="54" fill="#0f1629" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="110" y="93" textAnchor="middle" fill="#38bdf8" fontSize="10.5" fontWeight="700">Combo Đế Vương</text>
                      <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800">32.1%</text>
                      <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">184 lượt đặt</text>
                    </g>
                  </g>

                  <g className="adm-donut-slice">
                    <path className="adm-donut-arc" d="M 38.4 135.4 A 76 76 0 0 1 50.9 62.2" stroke="#a855f7" />
                    <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                      <circle cx="110" cy="110" r="54" fill="#0f1629" stroke="#a855f7" strokeWidth="1.5" />
                      <text x="110" y="93" textAnchor="middle" fill="#c084fc" fontSize="10.5" fontWeight="700">Uốn Hàn Quốc</text>
                      <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800">16.8%</text>
                      <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">96 lượt đặt</text>
                    </g>
                  </g>

                  <g className="adm-donut-slice">
                    <path className="adm-donut-arc" d="M 52.6 60.1 A 76 76 0 0 1 107.3 34.1" stroke="#10b981" />
                    <g className="adm-donut-tooltip" fontFamily="Plus Jakarta Sans, sans-serif">
                      <circle cx="110" cy="110" r="54" fill="#0f1629" stroke="#10b981" strokeWidth="1.5" />
                      <text x="110" y="93" textAnchor="middle" fill="#34d399" fontSize="10.5" fontWeight="700">Nhuộm Cao Cấp</text>
                      <text x="110" y="116" textAnchor="middle" fill="#ffffff" fontSize="19" fontWeight="800">13.6%</text>
                      <text x="110" y="134" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="600">78 lượt đặt</text>
                    </g>
                  </g>
                </svg>
              </div>

              <div className="adm-service-legend-grid">
                <div><span style={{ color: "#f5cb78", fontWeight: 700 }}>• Cắt Thương Gia:</span> 215 lượt</div>
                <div><span style={{ color: "#38bdf8", fontWeight: 700 }}>• Combo Đế Vương:</span> 184 lượt</div>
                <div><span style={{ color: "#c084fc", fontWeight: 700 }}>• Uốn Hàn Quốc:</span> 96 lượt</div>
                <div><span style={{ color: "#34d399", fontWeight: 700 }}>• Nhuộm Cao Cấp:</span> 78 lượt</div>
              </div>
            </div>
          </div>

          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Lịch hẹn mới nhất hôm nay</h3>
                <p className="adm-card-subtitle">Danh sách lịch hẹn mẫu trên Dashboard</p>
              </div>
              <Link to="/admin/appointments" className="adm-btn adm-btn-outline adm-btn-sm">Xem tất cả</Link>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Mã lịch</th>
                    <th>Khách hàng</th>
                    <th>Barber</th>
                    <th>Dịch vụ</th>
                    <th>Giờ hẹn</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>BK-2026-101</strong></td>
                    <td>Hoàng Gia Huy (0987654321)</td>
                    <td>Nguyễn Hoàng Nam</td>
                    <td>Combo Đế Vương 7 Bước</td>
                    <td>09:30 - 14/11/2026</td>
                    <td><span className="adm-badge adm-badge-green">Hoàn thành</span></td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-102</strong></td>
                    <td>Đặng Quang Vinh (0978123456)</td>
                    <td>Lê Minh Tuấn</td>
                    <td>Uốn Định Hình Hàn Quốc</td>
                    <td>10:30 - 14/11/2026</td>
                    <td><span className="adm-badge adm-badge-blue">Đã xác nhận</span></td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-103</strong></td>
                    <td>Vũ Đình Khoa (0965432109)</td>
                    <td>Phạm Quốc Bảo</td>
                    <td>Cắt Tóc Thương Gia</td>
                    <td>14:00 - 14/11/2026</td>
                    <td><span className="adm-badge adm-badge-yellow">Chờ xác nhận</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
