// Phụ trách: Trần Việt Anh – Header dùng chung (Chuẩn 1 DÒNG DUY NHẤT, trải rộng cân đối)
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
          <div className="brand-icon">✂️</div>
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
            📊 Tổng quan Portal
          </NavLink>
        </nav>

        {/* Role Portal Shortcuts & User Actions - Bên phải */}
        <div className="header-actions">
          {/* Quick Portal Switcher */}
          <div className="role-switcher" title="Chuyển nhanh góc nhìn phân hệ">
            <Link to="/overview" className="role-btn">Portal</Link>
            <Link to="/barber" className="role-btn">Thợ</Link>
            <Link to="/admin" className="role-btn">Admin</Link>
          </div>

          {/* User state */}
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <span style={{ color: "#f8fafc", fontSize: "14px", fontWeight: "600", whiteSpace: "nowrap" }}>
                👋 {user.full_name || user.email || "Thành viên"}
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
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
