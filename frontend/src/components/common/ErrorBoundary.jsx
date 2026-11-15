// Phụ trách: Trần Việt Anh – ErrorBoundary (Tone Vàng Đen)
import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          background: "var(--bg-app)"
        }}>
          <div style={{
            maxWidth: "600px",
            background: "var(--bg-card)",
            border: "1px solid rgba(239, 68, 68, 0.4)",
            borderRadius: "var(--radius-lg)",
            padding: "44px 36px",
            textAlign: "center",
            boxShadow: "var(--shadow-card)"
          }}>
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>⚠️</div>
            <span className="badge badge-danger" style={{ marginBottom: "16px", fontSize: "13px" }}>
              ĐÃ XẢY RA SỰ CỐ GIAO DIỆN
            </span>
            <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#ffffff", margin: "16px 0 10px 0" }}>
              Hệ Thống Gặp Sự Cố Bất Ngờ
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6", marginBottom: "26px" }}>
              Một lỗi hiển thị vừa phát sinh trong phiên làm việc. Chúng tôi đã kích hoạt chế độ an toàn để bảo vệ phiên truy cập của bạn.
            </p>

            {this.state.error && (
              <div style={{
                background: "#08090c",
                padding: "14px 16px",
                borderRadius: "8px",
                border: "1px solid #2e1515",
                fontSize: "12px",
                color: "#f87171",
                textAlign: "left",
                fontFamily: "monospace",
                marginBottom: "26px",
                overflowX: "auto"
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
              <button onClick={this.handleReload} className="btn btn-primary">
                🔄 Tải Lại Trang
              </button>
              <button onClick={this.handleGoHome} className="btn btn-secondary">
                🏠 Về Trang Chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
