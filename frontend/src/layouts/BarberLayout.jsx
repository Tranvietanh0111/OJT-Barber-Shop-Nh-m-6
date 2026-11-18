// Phụ trách: Trần Việt Anh – Layout dành cho Barber (Fix & Tối ưu an toàn)
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LineIcon } from "../components/Header";

export default function BarberLayout() {
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
      {/* Sidebar Barber */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="brand-icon"><LineIcon name="scissors" size={22} /></div>
          <div>
            <div style={{ color: "var(--text-primary)", fontWeight: "800", fontSize: "16px" }}>BarberHub</div>
            <span className="sidebar-role-badge">BARBER PORTAL</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/barber"
            end
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="portal" /> Bàn làm việc hôm nay
          </NavLink>
          <NavLink
            to="/barber/appointments"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="scissors" /> Lịch cắt & Yêu cầu
          </NavLink>
          <NavLink
            to="/barber/reviews"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="star" /> Đánh giá khách hàng
          </NavLink>
          <NavLink
            to="/barber/earnings"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="wallet" /> Lịch sử & Thu nhập
          </NavLink>
          <NavLink
            to="/barber/profile"
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            <LineIcon name="user" /> Hồ sơ thợ cắt tóc
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
              Cổng công việc dành cho Barber
            </h2>
            <span className="badge badge-success">Đang sẵn sàng nhận khách</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link to="/overview" className="btn btn-outline-gold btn-sm">
              <LineIcon name="portal" size={16} /> Tổng quan Portal
            </Link>
            <div style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
              Thợ: <strong style={{ color: "var(--text-primary)" }}>{user?.full_name || user?.email || "Thợ Barber"}</strong>
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
