// Đặt lịch hẹn – Bước 3: Chọn ngày & khung giờ trống (Khách vãng lai)
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appointmentsApi, formatDateVn, formatVnd } from "../admin/adminApi";
import { getBookingDraft, getTodayIso, saveBookingDraft, TIME_SLOTS } from "./bookingStore";
import "./booking.css";

export default function SelectSlotPage() {
  const navigate = useNavigate();
  const draft = getBookingDraft();
  const [date, setDate] = useState(draft.date || getTodayIso());
  const [time, setTime] = useState(draft.time || "");
  const [existingApps, setExistingApps] = useState([]);

  useEffect(() => {
    if (!draft.service_name || !draft.barber_name) {
      navigate("/booking/service", { replace: true });
      return;
    }
    appointmentsApi
      .list()
      .then((res) => setExistingApps(res.items || []))
      .catch(() => {});
  }, [draft.service_name, draft.barber_name, navigate]);

  const busySlots = useMemo(() => {
    const set = new Set();
    for (const app of existingApps) {
      if (
        app.barber_name === draft.barber_name &&
        app.date === date &&
        app.status !== "cancelled" &&
        app.status !== "rejected"
      ) {
        set.add(app.time);
      }
    }
    return set;
  }, [existingApps, draft.barber_name, date]);

  const handleDateChange = (nextDate) => {
    setDate(nextDate);
    setTime("");
    saveBookingDraft({ date: nextDate, time: "" });
  };

  const handleSelectTime = (slot) => {
    setTime(slot);
    saveBookingDraft({ date, time: slot });
  };

  const handleContinue = () => {
    if (!date || !time) return;
    saveBookingDraft({ date, time });
    navigate("/booking/confirm");
  };

  return (
    <div className="bk-page">
      <div className="bk-hero">
        <span className="bk-hero-tag">
          {draft.service_name} • {draft.barber_name}
        </span>
        <h1 className="bk-hero-title">Bước 3: Chọn ngày & giờ hẹn</h1>
        <p className="bk-hero-sub">Các khung giờ đã có khách đặt của Barber sẽ tự động được khóa.</p>
      </div>

      <div className="bk-stepper">
        <Link to="/booking/service" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn dịch vụ
        </Link>
        <Link to="/booking/barber" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn Barber
        </Link>
        <div className="bk-step active">
          <span className="bk-step-num">3</span> Chọn ngày & giờ
        </div>
        <div className="bk-step">
          <span className="bk-step-num">4</span> Xác nhận
        </div>
      </div>

      <div className="bk-two-col">
        <div className="bk-panel">
          <div className="bk-form-group">
            <label htmlFor="bk-date">Chọn ngày đến tiệm *</label>
            <input
              id="bk-date"
              type="date"
              className="bk-input"
              min={getTodayIso()}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 18 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "#1e3a5f" }}>
              Chọn khung giờ trống ({TIME_SLOTS.length - busySlots.size} khung còn trống) *
            </label>
            <div className="bk-slots-grid">
              {TIME_SLOTS.map((slot) => {
                const isBusy = busySlots.has(slot);
                const isSelected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={isBusy}
                    className={`bk-slot-btn ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectTime(slot)}
                    title={isBusy ? "Khung giờ này đã có khách đặt" : `Chọn lúc ${slot}`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bk-panel">
          <h3 className="bk-card-title" style={{ marginTop: 0, marginBottom: 14 }}>
            Tóm tắt lựa chọn
          </h3>
          <div className="bk-summary-list">
            <div className="bk-summary-row">
              <span>Dịch vụ:</span>
              <strong>{draft.service_name}</strong>
            </div>
            <div className="bk-summary-row">
              <span>Thời lượng:</span>
              <strong>{draft.service_duration} phút</strong>
            </div>
            <div className="bk-summary-row">
              <span>Barber:</span>
              <strong>{draft.barber_name}</strong>
            </div>
            <div className="bk-summary-row">
              <span>Ngày hẹn:</span>
              <strong>{formatDateVn(date)}</strong>
            </div>
            <div className="bk-summary-row">
              <span>Giờ hẹn:</span>
              <strong>{time || "Chưa chọn"}</strong>
            </div>
            <div className="bk-summary-row" style={{ borderBottom: 0 }}>
              <span>Tổng dự kiến:</span>
              <strong style={{ color: "#dc2626", fontSize: 17 }}>{formatVnd(draft.price)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="bk-actions-bar">
        <Link to="/booking/barber" className="bk-btn bk-btn-outline">
          ← Quay lại chọn Barber
        </Link>
        <button type="button" className="bk-btn bk-btn-primary" disabled={!date || !time} onClick={handleContinue}>
          Tiếp tục: Nhập thông tin & Xác nhận →
        </button>
      </div>
    </div>
  );
}
