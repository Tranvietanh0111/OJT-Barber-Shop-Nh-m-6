// Phụ trách: Trần Việt Anh – Trang 404 Không tìm thấy (Tone Vàng Đen)
import { Link, useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "70vh",
      padding: "40px 20px",
      textAlign: "center"
    }}>
      <div style={{
        maxWidth: "580px",
        background: "var(--bg-card)",
        border: "1px solid var(--gold-border)",
        borderRadius: "var(--radius-lg)",
        padding: "52px 36px",
        boxShadow: "var(--shadow-card), var(--gold-glow-subtle)",
        position: "relative"
      }}>
        {/* Biểu tượng 404 Barber Vàng Đen */}
        <div style={{
          fontSize: "64px",
          marginBottom: "20px",
          lineHeight: "1",
          filter: "drop-shadow(0 0 16px rgba(245, 158, 11, 0.4))"
        }}>
          ✂️💈
        </div>

        <span className="badge badge-danger" style={{ fontSize: "14px", padding: "6px 18px", marginBottom: "20px" }}>
          LỖI 404 – TRANG KHÔNG TỒN TẠI
        </span>

        <h1 style={{
          fontSize: "32px",
          fontWeight: "900",
          color: "var(--text-primary)",
          marginTop: "16px",
          marginBottom: "14px",
          letterSpacing: "-0.5px"
        }}>
          Đường Dẫn Đã Bị "Cắt Tỉa"!
        </h1>

        <p style={{
          fontSize: "15px",
          color: "var(--text-secondary)",
          lineHeight: "1.7",
          marginBottom: "36px"
        }}>
          Địa chỉ bạn truy cập có thể đã được dọn dẹp hoặc tạm thời không khả dụng trên hệ thống BarberHub.
          Vui lòng kiểm tra lại đường dẫn hoặc chọn các hướng dẫn nhanh bên dưới.
        </p>

        {/* Nút hành động */}
        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary"
          >
            ← Quay Lại
          </button>

          <Link to="/" className="btn btn-primary">
            🏠 Trang Chủ
          </Link>

          <Link to="/booking/service" className="btn btn-outline-gold">
            📅 Đặt Lịch Cắt Tóc
          </Link>
        </div>

        <div style={{
          marginTop: "36px",
          paddingTop: "24px",
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "13px",
          color: "var(--text-muted)"
        }}>
          Cần hỗ trợ? Gọi hotline: <strong style={{ color: "var(--gold-bright)" }}>1900 8888</strong> hoặc truy cập{" "}
          <Link to="/overview" style={{ color: "var(--gold-light)", fontWeight: "700" }}>System Overview</Link>.
        </div>
      </div>
    </div>
  );
}
