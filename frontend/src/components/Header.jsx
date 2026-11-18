// Phụ trách: Trần Việt Anh – Header dùng chung (Chuẩn 1 DÒNG DUY NHẤT, trải rộng cân đối)
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LineIcon({ name, size = 18, className }) {
  const icons = {
    scissors: (
      <>
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="m8.2 8.2 12.3 12.3M14.5 9.5 20.5 3.5M8.2 15.8l4.7-4.7" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 6-7" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 11h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    receipt: (
      <>
        <path d="M4 3h16v18l-3-2-3 2-3-2-3 2-4-2z" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),
    card: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
    qr: (
      <>
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z" />
        <path d="M14 14h3v3h-3zM19 14v2M14 19h2M19 19h2v2" />
      </>
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </>
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6a3 3 0 0 1-3-3V6" />
        <path d="M3 7h17M16 14h4" />
        <circle cx="16" cy="14" r=".5" />
      </>
    ),
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3z" />,
    portal: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M9 10v10" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[name]}
    </svg>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const user = auth?.user || null;
  const setUser = auth?.setUser;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    if (setUser) setUser(null);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo - Bên trái */}
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon"><LineIcon name="scissors" size={22} /></div>
          <div>Barber<span>Hub</span></div>
        </Link>

        {/* Navigation Links - Ở giữa, 1 HÀNG DUY NHẤT KHÔNG XUỐNG DÒNG */}
        <nav className={`nav-menu ${mobileMenuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Dịch vụ
          </NavLink>
          <NavLink
            to="/barbers"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Đội ngũ Barber
          </NavLink>
          <NavLink
            to="/booking/service"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Đặt lịch hẹn
          </NavLink>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            Lịch hẹn của tôi
          </NavLink>
          <NavLink
            to="/overview"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LineIcon name="portal" size={16} /> Tổng quan Portal
          </NavLink>
        </nav>

        {/* User Actions - Bên phải */}
        <div className="header-actions">
          {/* User state */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <span style={{ color: "var(--text-primary)", fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap" }}>
                <LineIcon name="user" size={16} /> {user.full_name || user.email || "Thành viên"}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <Link to="/login" className="btn btn-secondary btn-sm" style={{ whiteSpace: "nowrap" }}>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ whiteSpace: "nowrap" }}>
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            <LineIcon name={mobileMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
