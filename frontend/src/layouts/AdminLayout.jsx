// Phụ trách: Trần Việt Anh – Layout quản trị Admin (Fix & Tối ưu an toàn)
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LineIcon } from "../components/Header";

export default function AdminLayout() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user || null;
  const setUser = auth?.setUser;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    if (setUser) setUser(null);
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar Admin */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-icon"><LineIcon name="shield" size={22} /></div>
          <div>
            <div style={{ color: "var(--text-primary)", fontWeight: "800", fontSize: "16px" }}>BarberHub</div>
            <span className="sidebar-role-badge">ADMIN PORTAL</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="chart" /> Tổng quan Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="users" /> Quản lý Người dùng
          </NavLink>
          <NavLink
            to="/admin/barbers"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="scissors" /> Quản lý Barber
          </NavLink>
          <NavLink
            to="/admin/services"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="scissors" /> Quản lý Dịch vụ
          </NavLink>
          <NavLink
            to="/admin/appointments"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="calendar" /> Quản lý Lịch hẹn
          </NavLink>
          <NavLink
            to="/admin/invoices"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="receipt" /> Quản lý Hóa đơn
          </NavLink>
          <NavLink
            to="/admin/revenue"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="chart" /> Thống kê Doanh thu
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="btn btn-secondary btn-sm" style={{ width: "100%", marginBottom: "8px" }}>
            <LineIcon name="home" /> Về trang khách hàng
          </Link>
          <button onClick={handleLogout} className="btn btn-dark btn-sm" style={{ width: "100%" }}>
            <LineIcon name="logout" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {/* Topbar */}
        <header className="dashboard-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
              Hệ thống Quản trị BarberHub
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/overview" className="btn btn-outline-gold btn-sm">
              <LineIcon name="portal" size={16} /> Tổng quan Portal
            </Link>
            <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Quản trị viên: <strong style={{ color: "var(--text-primary)" }}>{user?.full_name || user?.email || "Admin"}</strong>
            </div>
          </div>
        </header>

        {/* Dynamic page content */}
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
