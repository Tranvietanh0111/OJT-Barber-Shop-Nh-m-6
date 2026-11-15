// Phụ trách: Trần Việt Anh – Điều khoản & Chính sách (Tone Vàng Đen)
import { Link } from "react-router-dom";

export default function TermsPolicyPage() {
  return (
    <div className="container" style={{ padding: "40px 20px", maxWidth: "860px" }}>
      <div className="card" style={{ border: "1px solid var(--gold-border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span className="badge badge-gold">📜 QUY ĐỊNH CHÍNH SÁCH</span>
        </div>

        <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#ffffff", marginBottom: "16px" }}>
          Điều Khoản Dịch Vụ & Bảo Mật BarberHub
        </h1>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "14px" }}>
          Cập nhật: Tháng 11/2026 – Áp dụng cho toàn bộ quý khách hàng và chuyên viên trên toàn chuỗi tiệm tóc BarberHub.
        </p>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "19px", fontWeight: "800", color: "var(--gold-bright)", marginBottom: "10px" }}>
            1. Chính Sách Đặt Lịch Hẹn
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Quý khách vui lòng có mặt trước giờ hẹn từ 5 – 10 phút để nhận tư vấn kiểu tóc kỹ lưỡng nhất. Nếu có thay đổi đột xuất, quý khách có thể hủy hoặc dời lịch trước 30 phút qua mục <strong>Lịch hẹn của tôi</strong> hoặc liên hệ Hotline: <strong style={{ color: "var(--gold-light)" }}>066771508</strong>.
          </p>
        </section>

        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "19px", fontWeight: "800", color: "var(--gold-bright)", marginBottom: "10px" }}>
            2. Cam Kết Chất Lượng & Bảo Hành Kiểu Tóc
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            BarberHub cam kết chỉnh sửa hoặc bảo hành kiểu tóc hoàn toàn miễn phí trong vòng 3 ngày nếu quý khách chưa thực sự hài lòng. 100% sản phẩm sáp vuốt, gôm xịt, thuốc uốn nhuộm và tinh dầu dưỡng đều đạt chuẩn nhập khẩu chính hãng.
          </p>
        </section>

        <section style={{ marginBottom: "32px" }}>
          <h2 style={{ fontSize: "19px", fontWeight: "800", color: "var(--gold-bright)", marginBottom: "10px" }}>
            3. Bảo Mật Thông Tin Khách Hàng
          </h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.7" }}>
            Thông tin số điện thoại và email của quý khách chỉ được sử dụng cho việc nhắc lịch hẹn, tích điểm thành viên hạng Kim Cương và xuất hóa đơn điện tử. Mật khẩu tài khoản được bảo mật đa tầng bằng thuật toán mã hóa hiện đại.
          </p>
        </section>

        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">
            🏠 Về Trang Chủ
          </Link>
          <Link to="/booking/service" className="btn btn-outline-gold">
            📅 Đặt Lịch Cắt Tóc
          </Link>
          <Link to="/overview" className="btn btn-secondary">
            📊 Tổng Quan Hệ Thống
          </Link>
        </div>
      </div>
    </div>
  );
}
