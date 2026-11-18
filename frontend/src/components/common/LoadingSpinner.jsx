// Phụ trách: Trần Việt Anh – LoadingSpinner
export default function LoadingSpinner({ text = "Đang tải dữ liệu...", fullScreen = false }) {
  const content = (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      padding: "48px 24px"
    }}>
      <div
        style={{
          width: "44px",
          height: "44px",
          border: "4px solid rgba(220, 38, 38, 0.15)",
          borderTop: "4px solid var(--gold-primary)",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
          boxShadow: "0 0 15px rgba(37, 99, 235, 0.18)"
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <span style={{ fontSize: "14px", color: "var(--gold-dark)", fontWeight: "600", letterSpacing: "0.02em" }}>
        {text}
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "var(--bg-overlay)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {content}
      </div>
    );
  }

  return content;
}
