// Phụ trách: Trần Việt Anh – Footer dùng chung toàn ứng dụng
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="footer-col">
            <div className="brand-logo" style={{ marginBottom: "16px" }}>
              <div className="brand-icon">✂️</div>
              <div>Barber<span>Hub</span></div>
            </div>
            <p>
              Chuỗi tiệm cắt tóc cao cấp mang đến trải nghiệm cắt tỉa, tạo mẫu tóc
              và chăm sóc râu chuyên nghiệp chuẩn phong cách quý ông hiện đại.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
              <span className="badge badge-warning">⭐ Đẳng cấp 5 sao</span>
              <span className="badge badge-info">💈 Thợ chuẩn tay nghề</span>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="footer-col">
            <h4>LIÊN KẾT NHANH</h4>
            <ul className="footer-links">
              <li><Link to="/">Trang chủ</Link></li>
              <li><Link to="/services">Dịch vụ & Bảng giá</Link></li>
              <li><Link to="/barbers">Danh sách Stylist / Barber</Link></li>
              <li><Link to="/booking/service">Đặt lịch trực tuyến</Link></li>
              <li><Link to="/reviews">Đánh giá khách hàng</Link></li>
            </ul>
          </div>

          {/* Cột 3: Thời gian làm việc */}
          <div className="footer-col">
            <h4>GIỜ PHỤC VỤ</h4>
            <p style={{ margin: "4px 0", color: "#cbd5e1" }}>
              <strong>Thứ 2 – Thứ 6:</strong> 08:30 – 21:00
            </p>
            <p style={{ margin: "4px 0", color: "#cbd5e1" }}>
              <strong>Thứ 7 – Chủ Nhật:</strong> 08:00 – 21:30
            </p>
            <p style={{ marginTop: "12px", fontSize: "13px", color: "var(--primary)" }}>
              * Khuyến khích đặt lịch hẹn trước 30 phút để không phải chờ đợi.
            </p>
          </div>

          {/* Cột 4: Thông tin liên hệ */}
          <div className="footer-col">
            <h4>ĐỊA CHỈ & LIÊN HỆ</h4>
            <p>📍 Số 10 Đan Phượng</p>
            <p>📞 Hotline tư vấn: <strong style={{ color: "#ffffff" }}>066771508</strong></p>
            <p>✉️ Email hỗ trợ: support@barberhub.vn</p>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="footer-bottom">
          <div>
            © {currentYear} <strong>BarberHub</strong> – Dự án OJT Barber Shop Nhóm 6. Mọi quyền được bảo lưu.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <Link to="/privacy" style={{ color: "#94a3b8" }}>Chính sách bảo mật</Link>
            <Link to="/terms" style={{ color: "#94a3b8" }}>Điều khoản dịch vụ</Link>
            <Link to="/overview" style={{ color: "var(--primary)", fontWeight: "600" }}>System Overview</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
