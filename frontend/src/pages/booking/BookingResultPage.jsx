// Đặt lịch hẹn – Bước 5: Thông báo & Phiếu xác nhận đặt lịch thành công
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { formatDateVn, formatVnd } from "../admin/adminApi";
import { getLastBooking } from "./bookingStore";
import "./booking.css";

export default function BookingResultPage() {
  const location = useLocation();
  const booking = location.state?.booking || getLastBooking();
  const [showToast, setShowToast] = useState(Boolean(booking));

  useEffect(() => {
    if (!showToast) return;
    const timer = setTimeout(() => setShowToast(false), 6000);
    return () => clearTimeout(timer);
  }, [showToast]);

  return (
    <div className="bk-page">
      {showToast && booking && (
        <div className="bk-toast-success" role="alert">
          <div className="bk-toast-icon">✓</div>
          <div>
            <strong>Đặt lịch hẹn thành công!</strong>
            <div>
              Mã lịch <strong>#{booking.code}</strong> • {formatDateVn(booking.date)} lúc {booking.time}
            </div>
          </div>
          <button
            type="button"
            className="bk-toast-close"
            onClick={() => setShowToast(false)}
            aria-label="Đóng thông báo"
          >
            ×
          </button>
        </div>
      )}

      <div className="bk-panel bk-result-box">
        {booking ? (
          <>
            <div className="bk-success-banner" role="status">
              ✓ Chúc mừng! Bạn đã hoàn tất thủ tục và đặt lịch hẹn thành công tại BarberHub.
            </div>
            <div className="bk-result-icon">✓</div>
            <h1 className="bk-card-title" style={{ fontSize: 26, margin: 0 }}>
              Đặt lịch hẹn thành công!
            </h1>
            <p className="bk-card-desc" style={{ marginTop: 8 }}>
              Lịch hẹn của bạn đã được ghi nhận vào hệ thống BarberHub. Vui lòng đến trước giờ hẹn 10 phút.
            </p>
            <div className="bk-code-pill">Mã lịch hẹn: #{booking.code}</div>
            <div className="bk-summary-list" style={{ textAlign: "left", marginBottom: 22 }}>
              <div className="bk-summary-row">
                <span>Khách hàng:</span>
                <strong>
                  {booking.customer_name} ({booking.customer_phone})
                </strong>
              </div>
              <div className="bk-summary-row">
                <span>Dịch vụ:</span>
                <strong>{booking.service_name}</strong>
              </div>
              <div className="bk-summary-row">
                <span>Barber thực hiện:</span>
                <strong>{booking.barber_name}</strong>
              </div>
              <div className="bk-summary-row">
                <span>Thời gian hẹn:</span>
                <strong>
                  {formatDateVn(booking.date)} • {booking.time}
                </strong>
              </div>
              <div className="bk-summary-row">
                <span>Trạng thái:</span>
                <strong style={{ color: "#15803d" }}>Đã ghi nhận (Chờ tiệm xác nhận)</strong>
              </div>
              <div className="bk-summary-row" style={{ borderBottom: 0 }}>
                <span>Giá dự kiến:</span>
                <strong style={{ color: "#dc2626" }}>{formatVnd(booking.price)}</strong>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="bk-card-title" style={{ fontSize: 24, margin: 0 }}>
              Chưa có phiếu đặt lịch nào
            </h1>
            <p className="bk-card-desc" style={{ margin: "14px 0 22px" }}>
              Bạn chưa hoàn tất đặt lịch nào gần đây. Hãy chọn dịch vụ để đặt lịch ngay nhé.
            </p>
          </>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
          <Link to="/my-bookings" className="bk-btn bk-btn-primary">
            Xem lịch hẹn của tôi
          </Link>
          <Link to="/booking/service" className="bk-btn bk-btn-outline">
            Đặt thêm lịch mới
          </Link>
          <Link to="/" className="bk-btn bk-btn-outline">
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
