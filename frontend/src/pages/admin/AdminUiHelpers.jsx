// Phụ trách: Trần Văn Thắng
// Component thông báo (Alert) và hộp thoại xác nhận xóa (ConfirmModal) dùng chung cho các trang Admin
export function AdminAlert({ notice, onClose }) {
  if (!notice?.text) return null;
  return (
    <div className={`adm-alert adm-alert-${notice.type || "info"}`} role="status">
      <span>{notice.text}</span>
      {onClose && (
        <button type="button" className="adm-alert-close" onClick={onClose} aria-label="Đóng thông báo">
          ×
        </button>
      )}
    </div>
  );
}

export function ConfirmDeleteModal({ open, title, message, loading, onCancel, onConfirm }) {
  if (!open) return null;
  return (
    <div className="adm-modal-backdrop" onClick={loading ? undefined : onCancel}>
      <div className="adm-modal adm-modal-sm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="adm-modal-header">
          <h3 className="adm-card-title">{title || "Xác nhận xóa"}</h3>
          <button type="button" className="adm-modal-close" onClick={onCancel} disabled={loading} aria-label="Đóng">
            ×
          </button>
        </div>
        <p className="adm-modal-body">{message}</p>
        <div className="adm-modal-footer">
          <button type="button" className="adm-btn adm-btn-outline adm-btn-sm" onClick={onCancel} disabled={loading}>
            Hủy bỏ
          </button>
          <button type="button" className="adm-btn adm-btn-danger-solid adm-btn-sm" onClick={onConfirm} disabled={loading}>
            {loading ? "Đang xóa..." : "Xác nhận xóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
