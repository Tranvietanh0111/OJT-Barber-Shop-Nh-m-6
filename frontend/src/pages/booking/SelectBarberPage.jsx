// Đặt lịch hẹn – Bước 2: Chọn Barber (Khách vãng lai)
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { barbersApi, formatVnd } from "../admin/adminApi";
import { getBookingDraft, saveBookingDraft } from "./bookingStore";
import "./booking.css";

export default function SelectBarberPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [draft] = useState(() => getBookingDraft());
  const [barbers, setBarbers] = useState([]);
  const [selectedName, setSelectedName] = useState(draft.barber_name || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    barbersApi
      .list()
      .then((res) => {
        if (!active) return;
        const working = (res.items || []).filter((b) => b.status === "available" || b.status === "busy");
        setBarbers(working);

        const preselectBarber = searchParams.get("barber");
        if (preselectBarber) {
          const match = working.find((b) => b.full_name.toLowerCase().includes(preselectBarber.toLowerCase()));
          if (match) {
            setSelectedName(match.full_name);
            saveBookingDraft({
              barber_id: match.id,
              barber_name: match.full_name,
              barber_specialty: match.specialty,
            });
          }
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [searchParams]);

  const handleSelectBarber = (barber) => {
    setSelectedName(barber.full_name);
    saveBookingDraft({
      barber_id: barber.id,
      barber_name: barber.full_name,
      barber_specialty: barber.specialty,
    });
  };

  const handleContinue = () => {
    if (!selectedName) return;
    if (!draft.service_name) {
      navigate("/booking/service");
    } else {
      navigate("/booking/slot");
    }
  };

  return (
    <div className="bk-page">
      <div className="bk-hero">
        <span className="bk-hero-tag">
          {draft.service_name ? `Dịch vụ: ${draft.service_name} • ${formatVnd(draft.price)}` : "Đặt lịch nhanh • Không cần đăng nhập"}
        </span>
        <h1 className="bk-hero-title">Bước 2: Chọn Barber</h1>
        <p className="bk-hero-sub">Chọn thợ cắt tóc yêu thích hoặc để tiệm sắp xếp Barber sẵn sàng gần nhất.</p>
      </div>

      <div className="bk-stepper">
        <Link to="/booking/service" className="bk-step done">
          <span className="bk-step-num">✓</span> Chọn dịch vụ
        </Link>
        <div className="bk-step active">
          <span className="bk-step-num">2</span> Chọn Barber
        </div>
        <div className="bk-step">
          <span className="bk-step-num">3</span> Chọn ngày & giờ
        </div>
        <div className="bk-step">
          <span className="bk-step-num">4</span> Xác nhận
        </div>
      </div>

      {loading ? (
        <div className="bk-panel" style={{ textAlign: "center", color: "#64748b" }}>
          Đang tải danh sách Barber...
        </div>
      ) : (
        <div className="bk-grid">
          {barbers.map((barber) => {
            const isSelected = selectedName === barber.full_name;
            const isReady = barber.status === "available";
            return (
              <div
                key={barber.id}
                className={`bk-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelectBarber(barber)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelectBarber(barber)}
              >
                <div>
                  <div className="bk-card-top">
                    <span className={`bk-cat-badge ${isReady ? "bk-status-ready" : "bk-status-busy"}`}>
                      {isReady ? "Sẵn sàng" : "Đang phục vụ"}
                    </span>
                    <span className="bk-meta">⭐ {barber.rating ?? 4.9}</span>
                  </div>
                  <h3 className="bk-card-title">{barber.full_name}</h3>
                  <p className="bk-card-desc">{barber.specialty}</p>
                </div>
                <div className="bk-card-foot">
                  <span className="bk-meta">Kinh nghiệm: {barber.experience_years} năm</span>
                  <span className="bk-meta">Ca: {barber.shift}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bk-actions-bar">
        <Link to="/booking/service" className="bk-btn bk-btn-outline">
          ← Quay lại chọn dịch vụ
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {selectedName && (
            <span className="bk-meta">
              Barber đã chọn: <strong>{selectedName}</strong>
            </span>
          )}
          <button
            type="button"
            className="bk-btn bk-btn-primary"
            disabled={!selectedName}
            onClick={handleContinue}
          >
            {draft.service_name ? "Tiếp tục: Chọn ngày & giờ →" : "Tiếp tục: Chọn dịch vụ →"}
          </button>
        </div>
      </div>
    </div>
  );
}
