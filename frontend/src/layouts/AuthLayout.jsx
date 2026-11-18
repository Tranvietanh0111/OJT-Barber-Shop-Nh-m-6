// Phụ trách: Trần Việt Anh – Layout Auth (Tone Vàng Đen)
import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "var(--bg-app)",
      color: "var(--text-primary)"
    }}>
      {/* Top Header */}
      <header style={{
        height: "var(--header-height)",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--border-subtle)",
        background: "rgba(255, 255, 255, 0.95)"
      }}>
        <Link to="/" className="brand-logo">
          <div className="brand-icon">✂️</div>
          <div>Barber<span>Hub</span></div>
        </Link>
        <Link to="/" className="btn btn-secondary btn-sm">
          ← Quay về trang chủ
        </Link>
      </header>

      {/* Main Content Form Vàng Đen */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "480px",
          background: "var(--bg-card)",
          border: "1px solid var(--gold-border)",
          borderRadius: "var(--radius-lg)",
          padding: "40px 36px",
          boxShadow: "var(--shadow-card), var(--gold-glow-subtle)"
        }}>
          <Outlet />
        </div>
      </main>

      {/* Auth Footer */}
      <footer style={{
        textAlign: "center",
        padding: "20px",
        fontSize: "13px",
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border-subtle)"
      }}>
        © {new Date().getFullYear()} BarberHub. Chuẩn mực phong cách quý ông & bảo mật thông tin tuyệt đối.
      </footer>
    </div>
  );
}
