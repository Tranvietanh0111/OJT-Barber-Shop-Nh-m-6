// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /my-bookings (Quản lý lịch sử cuộc hẹn cắt tóc của khách hàng - Tích hợp đầy đủ Giao diện, Hủy lịch & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BookingHistoryPage() {
  const [filterTab, setFilterTab] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);

  const [bookings, setBookings] = useState([
    {
      id: "bk-101",
      code: "BH-98214",
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      category: "Cắt Tạo Kiểu",
      barber: "Tuấn Master",
      chair: "Ghế Barber VIP 01",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "09:00 AM",
      date: "16/11/2026",
      price: "250.000 đ",
      status: "Xong",
      canCancel: false,
    },
    {
      id: "bk-102",
      code: "BH-98350",
      service: "Combo Cắt Gội Massage Đăng Quang",
      category: "Combo VIP",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "03:30 PM",
      date: "Hôm nay",
      price: "250.000 đ",
      status: "Đang Cắt",
      canCancel: false,
    },
    {
      id: "bk-103",
      code: "BH-98402",
      service: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      barber: "Minh Barber",
      chair: "Ghế 02",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "10:00 AM",
      date: "20/11/2026",
      price: "450.000 đ",
      status: "Đã Đặt",
      canCancel: true,
    },
    {
      id: "bk-104",
      code: "BH-97911",
      service: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      barber: "Dũng Barber",
      chair: "Ghế 04",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "02:00 PM",
      date: "02/11/2026",
      price: "200.000 đ",
      status: "Xong",
      canCancel: false,
    },
    {
      id: "bk-105",
      code: "BH-97500",
      service: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      barber: "Hoàng Stylist",
      chair: "Ghế 03",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "04:00 PM",
      date: "15/10/2026",
      price: "600.000 đ",
      status: "Đã Hủy",
      canCancel: false,
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelBooking = (bookingId, serviceName) => {
    if (window.confirm(`Bạn có chắc muốn hủy lịch hẹn "${serviceName}"?`)) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Đã Hủy", canCancel: false } : b))
      );
      showToast("Đã hủy lịch hẹn thành công!");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "all") return true;
    if (filterTab === "upcoming") return b.status === "Đã Đặt" || b.status === "Đang Cắt";
    if (filterTab === "completed") return b.status === "Xong";
    if (filterTab === "cancelled") return b.status === "Đã Hủy";
    return true;
  });

  return (
    <div className="cust-booking-history-wrap">
      {/* Self-contained CSS styles for Booking History Page */}
      <style>{`
        .cust-booking-history-wrap {
          max-width: 1080px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
        }

        .cust-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          border-bottom: 1px solid #232736;
          padding-bottom: 24px;
          margin-bottom: 32px;
        }
        .cust-header-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #f59e0b;
          display: block;
          margin-bottom: 4px;
        }
        .cust-header-title {
          font-size: 32px;
          font-weight: 900;
          color: #1f2937;
          letter-spacing: -0.02em;
        }
        .cust-header-sub {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        /* Filter Tabs */
        .cust-filter-tabs {
          display: flex;
          background: #ffffff;
          border: 1px solid #e5d6b4;
          border-radius: 14px;
          padding: 4px;
          gap: 4px;
        }
        .cust-tab-btn {
          padding: 8px 16px;
          border-radius: 10px;
          border: none;
          background: transparent;
          color: #6b7280;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cust-tab-btn:hover {
          color: #b45309;
        }
        .cust-tab-btn.active {
          background: #f59e0b;
          color: #ffffff;
          font-weight: 800;
        }

        /* Toast */
        .cust-toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          background: #ffffff;
          border: 1px solid #10b981;
          color: #059669;
          padding: 12px 20px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Booking Cards */
        .cust-bookings-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cust-bk-card {
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
          padding: 24px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px -4px rgba(120, 80, 10, 0.08);
        }
        .cust-bk-card:hover {
          border-color: rgba(245, 158, 11, 0.5);
          box-shadow: 0 10px 24px -4px rgba(120, 80, 10, 0.14);
        }
        .cust-bk-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          border-bottom: 1px solid #f1e7d0;
          padding-bottom: 18px;
          margin-bottom: 18px;
        }
        .cust-bk-main-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cust-bk-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .cust-bk-datetime {
          font-size: 12px;
          font-weight: 800;
          color: #b45309;
        }
        .cust-bk-title {
          font-size: 17px;
          font-weight: 800;
          color: #1f2937;
          margin-top: 2px;
        }
        .cust-bk-status-price {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .cust-badge-status {
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .cust-badge-status.done {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .cust-badge-status.cutting {
          background: rgba(245, 158, 11, 0.15);
          color: #b45309;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .cust-badge-status.booked {
          background: rgba(59, 130, 246, 0.12);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .cust-badge-status.canceled {
          background: rgba(148, 163, 184, 0.12);
          color: #6b7280;
          border: 1px solid rgba(148, 163, 184, 0.25);
        }
        .cust-bk-price {
          font-size: 18px;
          font-weight: 900;
          color: #b45309;
        }

        /* 3-col info row */
        .cust-bk-meta-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }
        @media (max-width: 640px) {
          .cust-bk-meta-grid {
            grid-template-columns: 1fr;
          }
        }
        .cust-bk-meta-item {
          background: #fffdfa;
          border: 1px solid #f1e7d0;
          border-radius: 12px;
          padding: 12px 14px;
        }
        .cust-bk-meta-lbl {
          font-size: 10px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .cust-bk-meta-val {
          font-size: 13px;
          font-weight: 700;
          color: #1f2937;
        }

        /* Card bottom bar */
        .cust-bk-bot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid #f1e7d0;
        }
        .cust-bk-code {
          font-size: 12px;
          color: #6b7280;
        }
        .cust-bk-code strong {
          color: #4b5563;
        }
        .cust-bk-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cust-btn-action {
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .cust-btn-cancel {
          background: rgba(239, 68, 68, 0.12);
          color: #dc2626;
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .cust-btn-cancel:hover {
          background: #ef4444;
          color: #ffffff;
        }
        .cust-btn-dir {
          background: #fff7e6;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .cust-btn-dir:hover {
          background: #fef3c7;
          border-color: #f59e0b;
        }
        .cust-btn-review {
          background: #fff7e6;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .cust-btn-review:hover {
          background: #f59e0b;
          color: #ffffff;
        }
        .cust-btn-rebook {
          background: #f59e0b;
          color: #ffffff;
          font-weight: 800;
        }
        .cust-btn-rebook:hover {
          background: #d97706;
        }

        /* Empty state */
        .cust-empty-box {
          padding: 64px 20px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
        }
        .cust-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .cust-empty-title {
          font-size: 18px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 6px;
        }
        .cust-empty-desc {
          font-size: 13px;
          color: #6b7280;
          max-width: 400px;
          margin: 0 auto 20px;
          line-height: 1.5;
        }
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #08090c;
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
          transition: all 0.2s ease;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-2px);
        }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cust-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="cust-header">
        <div>
          <span className="cust-header-tag">Theo Dõi Cuộc Hẹn</span>
          <h1 className="cust-header-title">Lịch Hẹn Cắt Tóc Của Tôi</h1>
          <p className="cust-header-sub">Quản lý các lịch hẹn sắp tới, theo dõi tiến độ và đánh giá chất lượng phục vụ.</p>
        </div>

        {/* FILTER TABS */}
        <div className="cust-filter-tabs">
          <button
            onClick={() => setFilterTab("all")}
            className={`cust-tab-btn ${filterTab === "all" ? "active" : ""}`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setFilterTab("upcoming")}
            className={`cust-tab-btn ${filterTab === "upcoming" ? "active" : ""}`}
          >
            Sắp Tới
          </button>
          <button
            onClick={() => setFilterTab("completed")}
            className={`cust-tab-btn ${filterTab === "completed" ? "active" : ""}`}
          >
            Hoàn Thành
          </button>
          <button
            onClick={() => setFilterTab("cancelled")}
            className={`cust-tab-btn ${filterTab === "cancelled" ? "active" : ""}`}
          >
            Đã Hủy
          </button>
        </div>
      </div>

      {/* BOOKING LIST CONTAINER */}
      <div className="cust-bookings-list">
        {filteredBookings.length === 0 ? (
          <div className="cust-empty-box">
            <div className="cust-empty-icon">📅</div>
            <h4 className="cust-empty-title">Chưa có lịch hẹn nào!</h4>
            <p className="cust-empty-desc">
              Bạn chưa có lịch hẹn nào trong mục này. Hãy trải nghiệm dịch vụ tóc chuẩn quý ông ngay hôm nay.
            </p>
            <Link to="/booking/service" className="cust-btn-primary">
              <span>✂️</span>
              <span>Đặt Lịch Cắt Ngay</span>
            </Link>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div key={b.id} className="cust-bk-card">
              <div className="cust-bk-top">
                <div className="cust-bk-main-info">
                  <div className="cust-bk-icon-box">✂️</div>
                  <div>
                    <span className="cust-bk-datetime">{b.time} • {b.date}</span>
                    <h3 className="cust-bk-title">{b.service}</h3>
                  </div>
                </div>

                <div className="cust-bk-status-price">
                  {b.status === "Xong" && (
                    <span className="cust-badge-status done">✓ Hoàn Thành</span>
                  )}
                  {b.status === "Đang Cắt" && (
                    <span className="cust-badge-status cutting">⏳ Đang Cắt</span>
                  )}
                  {b.status === "Đã Đặt" && (
                    <span className="cust-badge-status booked">📅 Sắp Tới</span>
                  )}
                  {b.status === "Đã Hủy" && (
                    <span className="cust-badge-status canceled">✕ Đã Hủy</span>
                  )}
                  <span className="cust-bk-price">{b.price}</span>
                </div>
              </div>

              <div className="cust-bk-meta-grid">
                <div className="cust-bk-meta-item">
                  <div className="cust-bk-meta-lbl">Thợ thực hiện</div>
                  <div className="cust-bk-meta-val">{b.barber}</div>
                </div>
                <div className="cust-bk-meta-item">
                  <div className="cust-bk-meta-lbl">Vị trí ghế</div>
                  <div className="cust-bk-meta-val">{b.chair}</div>
                </div>
                <div className="cust-bk-meta-item">
                  <div className="cust-bk-meta-lbl">Chi nhánh</div>
                  <div className="cust-bk-meta-val" style={{ color: "#fbbf24" }}>{b.branch}</div>
                </div>
              </div>

              <div className="cust-bk-bot">
                <span className="cust-bk-code">
                  Mã đặt lịch: <strong>#{b.code}</strong>
                </span>

                <div className="cust-bk-actions">
                  {b.canCancel && (
                    <button
                      onClick={() => handleCancelBooking(b.id, b.service)}
                      className="cust-btn-action cust-btn-cancel"
                    >
                      Hủy Lịch Hẹn
                    </button>
                  )}

                  {(b.status === "Đã Đặt" || b.status === "Đang Cắt") && (
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cust-btn-action cust-btn-dir"
                    >
                      <span>📍</span>
                      <span>Chỉ Đường</span>
                    </a>
                  )}

                  {b.status === "Xong" && (
                    <>
                      <Link to="/my-invoices" className="cust-btn-action cust-btn-dir">
                        <span>🧾</span>
                        <span>Hóa Đơn</span>
                      </Link>
                      <Link to="/reviews" className="cust-btn-action cust-btn-review">
                        <span>⭐</span>
                        <span>Đánh Giá</span>
                      </Link>
                      <Link
                        to={`/booking/service?service=${encodeURIComponent(b.service)}`}
                        className="cust-btn-action cust-btn-rebook"
                      >
                        Đặt Lại Kiểu Này
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
