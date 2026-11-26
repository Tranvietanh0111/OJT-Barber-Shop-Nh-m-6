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

  // Chặn người vãng lai / tài khoản không phải Admin truy cập các chức năng Thêm/Sửa/Xóa quản trị
  if (!user || user.role !== "admin") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "var(--color-bg, #FAF6F0)",
        }}
      >
        <div
          style={{
            maxWidth: 500,
            width: "100%",
            background: "#ffffff",
            borderRadius: 18,
            border: "1px solid #dbeafe",
            boxShadow: "0 16px 40px rgba(30, 58, 95, 0.14)",
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 58,
              height: 58,
              margin: "0 auto 14px",
              borderRadius: 16,
              background: "#fee2e2",
              color: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LineIcon name="shield" size={28} />
          </div>
          <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#1e3a5f" }}>
            Yêu cầu quyền Quản trị viên (Admin)
          </h2>
          <p style={{ margin: "0 0 22px", fontSize: 14, color: "#4b5563", lineHeight: 1.6 }}>
            Người vãng lai chỉ được phép <strong>xem thông tin và đặt lịch hẹn</strong>, không có quyền{" "}
            <strong>Thêm / Sửa / Xóa</strong> trong khu vực Quản trị. Vui lòng đăng nhập bằng tài khoản Admin để tiếp tục.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            <Link to="/login" className="btn btn-primary btn-sm">
              Đăng nhập Admin
            </Link>
            <Link to="/booking/service" className="btn btn-secondary btn-sm">
              Đặt lịch hẹn
            </Link>
            <Link to="/" className="btn btn-outline-gold btn-sm">
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
