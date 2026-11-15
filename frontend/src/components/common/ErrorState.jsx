// Phụ trách: Trần Việt Anh – ErrorState (Tone Vàng Đen)
export default function ErrorState({
  title = "Không thể tải dữ liệu",
  message = "Đã xảy ra lỗi trong quá trình kết nối đến máy chủ. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại sau.",
  onRetry = null,
  code = "ERR_LOAD_FAILED"
}) {
  return (
    <div style={{
      padding: "44px 24px",
      textAlign: "center",
      background: "var(--bg-card)",
      borderRadius: "var(--radius-lg)",
      border: "1px dashed rgba(239, 68, 68, 0.4)",
      margin: "24px 0"
    }}>
      <div style={{ fontSize: "44px", marginBottom: "14px" }}>⚠️</div>
      <div style={{ display: "inline-block", marginBottom: "10px" }}>
        <span className="badge badge-danger">Mã lỗi: {code}</span>
      </div>
      <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", marginBottom: "10px" }}>
        {title}
      </h3>
      <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 24px auto", lineHeight: "1.6" }}>
        {message}
      </p>

      {onRetry && (
        <button onClick={onRetry} className="btn btn-outline-gold btn-sm">
          🔄 Thử Lại
        </button>
      )}
    </div>
  );
}
