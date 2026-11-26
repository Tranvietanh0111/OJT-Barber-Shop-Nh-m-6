// Phụ trách: Lương Trọng Đạt - Customer Module (đồng bộ lịch hẹn với bookingStore / appointmentsApi)
// Route: /my-bookings (Người vãng lai có thể xem, đổi giờ hoặc hủy lịch hẹn của mình)
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { appointmentsApi, formatDateVn, formatVnd } from "../admin/adminApi";

const STATUS_MAP = {
  completed: "Xong",
  confirmed: "Đang Cắt",
  pending: "Đã Đặt",
  cancelled: "Đã Hủy",
  rejected: "Đã Hủy",
};

export default function BookingHistoryPage() {
  const [filterTab, setFilterTab] = useState("all");
  const [searchPhone, setSearchPhone] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
  const [bookings, setBookings] = useState([]);

  const loadBookings = useCallback(async () => {
    try {
      const res = await appointmentsApi.list();
      const mapped = (res.items || []).map((app) => ({
        id: app.id,
        code: app.code,
        customer_name: app.customer_name,
        customer_phone: app.customer_phone,
        service: app.service_name,
        barber: app.barber_name,
        chair: "Khu BarberHub VIP",
        branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
        time: app.time,
        date: formatDateVn(app.date),
        rawDate: app.date,
        price: formatVnd(app.price),
        status: STATUS_MAP[app.status] || "Đã Đặt",
        rawStatus: app.status,
        canCancel: app.status === "pending" || app.status === "confirmed",
      }));
      setBookings(mapped);
    } catch {
      setBookings([]);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelBooking = async (bookingId, serviceName) => {
    if (window.confirm(`Bạn có chắc muốn hủy lịch hẹn "${serviceName}"?`)) {
      await appointmentsApi.updateStatus(bookingId, "cancelled");
      await loadBookings();
      showToast("Đã hủy lịch hẹn thành công!");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (searchPhone.trim()) {
      const kw = searchPhone.trim().toLowerCase();
      const hit =
        b.code.toLowerCase().includes(kw) ||
        (b.customer_phone || "").toLowerCase().includes(kw) ||
        (b.customer_name || "").toLowerCase().includes(kw);
      if (!hit) return false;
    }
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
          color: var(--text-primary);
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
          color: #dc2626;
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
          border: 1px solid #d6d3d1;
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
          color: #1d4ed8;
        }
        .cust-tab-btn.active {
          background: #dc2626;
          color: var(--text-primary);
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
          border: 1px solid #e7e5e4;
          border-radius: 24px;
          padding: 24px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.08);
        }
        .cust-bk-card:hover {
          border-color: rgba(220, 38, 38, 0.5);
          box-shadow: 0 10px 24px -4px rgba(15, 23, 42, 0.14);
        }
        .cust-bk-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          border-bottom: 1px solid #e7e5e4;
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
          background: rgba(220, 38, 38, 0.12);
          border: 1px solid rgba(220, 38, 38, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .cust-bk-datetime {
          font-size: 12px;
          font-weight: 800;
          color: #1d4ed8;
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
          background: var(--status-completed-bg);
          color: var(--status-completed-text);
          border: 1px solid var(--status-completed-text);
        }
        .cust-badge-status.cutting {
          background: var(--status-confirmed-bg);
          color: var(--status-confirmed-text);
          border: 1px solid var(--status-confirmed-text);
        }
        .cust-badge-status.booked {
          background: var(--status-pending-bg);
          color: var(--status-pending-text);
          border: 1px solid var(--status-pending-text);
        }
        .cust-badge-status.canceled {
          background: var(--status-cancelled-bg);
          color: var(--status-cancelled-text);
          border: 1px solid var(--status-cancelled-text);
        }
        .cust-bk-price {
          font-size: 18px;
          font-weight: 900;
          color: #1d4ed8;
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
          background: #fffdf7;
          border: 1px solid #e7e5e4;
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
          border-top: 1px solid #e7e5e4;
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
          color: var(--text-primary);
        }
        .cust-btn-dir {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        .cust-btn-dir:hover {
          background: #eff6ff;
          border-color: #dc2626;
        }
        .cust-btn-review {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }
        .cust-btn-review:hover {
          background: #dc2626;
          color: var(--text-primary);
        }
        .cust-btn-rebook {
          background: #dc2626;
          color: var(--text-primary);
          font-weight: 800;
        }
        .cust-btn-rebook:hover {
          background: #b91c1c;
        }

        /* Empty state */
        .cust-empty-box {
          padding: 64px 20px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #e7e5e4;
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
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: #08090c;
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(220, 38, 38, 0.3);
          transition: all 0.2s ease;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
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
          <p className="cust-header-sub">Khách vãng lai có thể đặt lịch hẹn mới, tra cứu theo SĐT/mã lịch hoặc hủy lịch sắp tới.</p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <input
            type="text"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Tra cứu theo SĐT hoặc mã #BK..."
            style={{
              padding: "9px 14px",
              borderRadius: 12,
              border: "1px solid #d6d3d1",
              fontSize: 13,
              minWidth: 220,
              background: "#ffffff",
            }}
          />
          <Link to="/booking/service" className="cust-btn-primary" style={{ color: "#ffffff", padding: "9px 18px" }}>
            <span>+ Đặt lịch hẹn mới</span>
          </Link>
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
                    <span className="cust-badge-status badge-completed done">✓ Hoàn Thành</span>
                  )}
                  {b.status === "Đang Cắt" && (
                    <span className="cust-badge-status badge-confirmed cutting">⏳ Đang Cắt</span>
                  )}
                  {b.status === "Đã Đặt" && (
                    <span className="cust-badge-status badge-pending booked">📅 Sắp Tới</span>
                  )}
                  {b.status === "Đã Hủy" && (
                    <span className="cust-badge-status badge-cancelled canceled">✕ Đã Hủy</span>
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
                  <div className="cust-bk-meta-val" style={{ color: "#ef4444" }}>{b.branch}</div>
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
