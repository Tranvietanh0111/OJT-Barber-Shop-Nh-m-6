// Phụ trách: Trần Việt Anh – EmptyState (Tone Vàng Đen)
import { Link } from "react-router-dom";

export default function EmptyState({
  icon = "📂",
  title = "Chưa có dữ liệu",
  description = "Hiện tại chưa có mục nào để hiển thị trong danh sách này.",
  actionText = null,
  actionLink = null,
  onAction = null
}) {
  return (
    <div style={{
      padding: "52px 28px",
      textAlign: "center",
      background: "var(--bg-card)",
      borderRadius: "var(--radius-lg)",
      border: "1px dashed var(--border-medium)",
      margin: "24px 0"
    }}>
      <div style={{ fontSize: "52px", marginBottom: "18px", lineHeight: 1 }}>{icon}</div>
      <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "440px", margin: "0 auto 24px auto", lineHeight: "1.6" }}>
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-sm">
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button onClick={onAction} className="btn btn-primary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
}
