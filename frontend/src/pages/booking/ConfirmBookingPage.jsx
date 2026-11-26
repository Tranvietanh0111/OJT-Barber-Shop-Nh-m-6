// Đặt lịch hẹn – Bước 4: Nhập thông tin khách vãng lai & Xác nhận đặt lịch
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { appointmentsApi, formatDateVn, formatVnd } from "../admin/adminApi";
import { clearBookingDraft, getBookingDraft, saveLastBooking } from "./bookingStore";
import "./booking.css";

export default function ConfirmBookingPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user || null;
  const [draft] = useState(() => getBookingDraft());
  const submittedRef = useRef(false);

  const [customerName, setCustomerName] = useState(draft.customer_name || user?.full_name || "");
  const [customerPhone, setCustomerPhone] = useState(draft.customer_phone || user?.phone || "");
  const [notes, setNotes] = useState(draft.notes || "");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (submittedRef.current) return;
    if (!draft.service_name || !draft.barber_name || !draft.date || !draft.time) {
      navigate("/booking/service", { replace: true });
    }
  }, [draft.service_name, draft.barber_name, draft.date, draft.time, navigate]);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");

    const name = customerName.trim();
    const phone = customerPhone.trim();
    if (name.length < 2) {
      setError("Vui lòng nhập họ và tên của bạn (ít nhất 2 ký tự).");
      return;
    }
    if (!/^[0-9+\s-]{8,15}$/.test(phone)) {
      setError("Số điện thoại không hợp lệ (cần từ 8–15 chữ số).");
      return;
    }

    setSubmitting(true);
    try {
      const res = await appointmentsApi.create({
        customer_name: name,
        customer_phone: phone,
        barber_name: draft.barber_name,
        service_name: draft.service_name,
        date: draft.date,
        time: draft.time,
        price: draft.price,
        status: "pending",
        notes: notes.trim() || "Khách vãng lai đặt lịch trực tuyến",
      });
      submittedRef.current = true;
      saveLastBooking(res.item);
      clearBookingDraft();
      navigate("/booking/result", {
        replace: true,
        state: { booking: res.item, justBooked: true },
      });
    } catch (err) {
      setError(err.message || "Không thể tạo lịch hẹn, vui lòng thử lại.");
      setSubmitting(false);
    }
  };

  return (
    <div className="bk-page">
      <div className="bk-hero">
        <span className="bk-hero-tag">Hoàn tất đặt lịch • Không cần tạo tài khoản</span>
        <h1 className="bk-hero-title">Bước 4: Xác nhận lịch hẹn</h1>
        <p className="bk-hero-sub">Kiểm tra lại thông tin và để lại SĐT để BarberHub xác nhận giữ ghế cho bạn.</p>
      </div>

      <div className="bk-stepper">
        <Link to="/booking/service" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn dịch vụ
        </Link>
        <Link to="/booking/barber" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn Barber
        </Link>
        <Link to="/booking/slot" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn ngày & giờ
        </Link>
        <div className="bk-step active">
          <span className="bk-step-num">4</span> Xác nhận
        </div>
      </div>

      {error && <div className="bk-alert-error">{error}</div>}

      <div className="bk-two-col">
        <form className="bk-panel" onSubmit={handleConfirm}>
          <h3 className="bk-card-title" style={{ marginTop: 0, marginBottom: 14 }}>
            Thông tin khách đặt lịch
          </h3>

          <div className="bk-form-group">
            <label htmlFor="guest-name">Họ và tên *</label>
            <input
              id="guest-name"
              type="text"
              className="bk-input"
              placeholder="VD: Nguyễn Văn An"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="bk-form-group">
            <label htmlFor="guest-phone">Số điện thoại liên hệ *</label>
            <input
              id="guest-phone"
              type="tel"
              className="bk-input"
              placeholder="VD: 0987654321"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              required
            />
          </div>

          <div className="bk-form-group">
            <label htmlFor="guest-notes">Ghi chú yêu cầu kiểu tóc (không bắt buộc)</label>
            <textarea
              id="guest-notes"
              rows={3}
              className="bk-textarea"
              placeholder="VD: Cắt fade cao, giữ mái dài..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="bk-actions-bar" style={{ marginTop: 18 }}>
            <Link to="/booking/slot" className="bk-btn bk-btn-outline">
              ← Đổi ngày/giờ
            </Link>
            <button type="submit" className="bk-btn bk-btn-primary" disabled={submitting}>
              {submitting ? "Đang đặt lịch..." : "Xác nhận đặt lịch ngay"}
            </button>
          </div>
        </form>

        <div className="bk-panel">
          <h3 className="bk-card-title" style={{ marginTop: 0, marginBottom: 14 }}>
            Phiếu đặt lịch của bạn
          </h3>
          <div className="bk-summary-list">
            <div className="bk-summary-row">
              <span>Dịch vụ:</span>
              <strong>{draft.service_name}</strong>
            </div>
            <div className="bk-summary-row">
              <span>Barber thực hiện:</span>
              <strong>{draft.barber_name}</strong>
            </div>
            <div className="bk-summary-row">
              <span>Ngày & Giờ:</span>
              <strong>
                {formatDateVn(draft.date)} • {draft.time}
              </strong>
            </div>
            <div className="bk-summary-row">
              <span>Thời lượng dự kiến:</span>
              <strong>{draft.service_duration} phút</strong>
            </div>
            <div className="bk-summary-row" style={{ borderBottom: 0 }}>
              <span>Thanh toán tại tiệm:</span>
              <strong style={{ color: "#dc2626", fontSize: 18 }}>{formatVnd(draft.price)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
