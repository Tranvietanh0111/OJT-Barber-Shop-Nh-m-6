// Đặt lịch hẹn – Bước 1: Chọn dịch vụ (Người vãng lai có thể đặt không cần đăng nhập)
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { formatVnd, servicesApi } from "../admin/adminApi";
import { getBookingDraft, saveBookingDraft } from "./bookingStore";
import "./booking.css";

export default function SelectServicePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(() => getBookingDraft().service_id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    servicesApi
      .list()
      .then((res) => {
        if (!active) return;
        const visible = (res.items || []).filter((s) => s.status !== "hidden");
        setServices(visible);

        const preselectName = searchParams.get("service");
        if (preselectName) {
          const match = visible.find((s) => s.name.toLowerCase() === preselectName.toLowerCase());
          if (match) {
            setSelectedId(match.id);
            saveBookingDraft({
              service_id: match.id,
              service_name: match.name,
              service_category: match.category,
              service_duration: match.duration,
              price: match.price,
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

  const categories = useMemo(() => {
    const set = new Set(services.map((s) => s.category));
    return ["all", ...Array.from(set)];
  }, [services]);

  const filtered = useMemo(() => {
    if (category === "all") return services;
    return services.filter((s) => s.category === category);
  }, [services, category]);

  const selectedService = services.find((s) => s.id === selectedId) || null;

  const handleSelect = (svc) => {
    setSelectedId(svc.id);
    saveBookingDraft({
      service_id: svc.id,
      service_name: svc.name,
      service_category: svc.category,
      service_duration: svc.duration,
      price: svc.price,
    });
  };

  const handleContinue = () => {
    if (!selectedService) return;
    handleSelect(selectedService);
    navigate("/booking/barber");
  };

  return (
    <div className="bk-page">
      <div className="bk-hero">
        <span className="bk-hero-tag">Đặt lịch nhanh • Không cần đăng nhập</span>
        <h1 className="bk-hero-title">Bước 1: Chọn dịch vụ</h1>
        <p className="bk-hero-sub">Khách vãng lai chọn dịch vụ mong muốn và đặt lịch chỉ trong 1 phút.</p>
      </div>

      <div className="bk-stepper">
        <div className="bk-step active">
          <span className="bk-step-num">1</span> Chọn dịch vụ
        </div>
        <div className="bk-step">
          <span className="bk-step-num">2</span> Chọn Barber
        </div>
        <div className="bk-step">
          <span className="bk-step-num">3</span> Chọn ngày & giờ
        </div>
        <div className="bk-step">
          <span className="bk-step-num">4</span> Xác nhận
        </div>
      </div>

      <div className="bk-filter-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`bk-chip ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat === "all" ? "Tất cả dịch vụ" : cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bk-panel" style={{ textAlign: "center", color: "#64748b" }}>
          Đang tải danh sách dịch vụ...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bk-panel" style={{ textAlign: "center", color: "#64748b" }}>
          Hiện chưa có dịch vụ nào khả dụng.
        </div>
      ) : (
        <div className="bk-grid">
          {filtered.map((svc) => {
            const isSelected = selectedId === svc.id;
            return (
              <div
                key={svc.id}
                className={`bk-card ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(svc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleSelect(svc)}
              >
                <div>
                  <div className="bk-card-top">
                    <span className="bk-cat-badge">{svc.category}</span>
                    {isSelected && <span className="bk-cat-badge bk-status-ready">✓ Đã chọn</span>}
                  </div>
                  <h3 className="bk-card-title">{svc.name}</h3>
                  <p className="bk-card-desc">{svc.description || "Dịch vụ chăm sóc tóc chuẩn quý ông BarberHub."}</p>
                </div>
                <div className="bk-card-foot">
                  <span className="bk-price">{formatVnd(svc.price)}</span>
                  <span className="bk-meta">⏱ {svc.duration} phút</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="bk-actions-bar">
        <Link to="/" className="bk-btn bk-btn-outline">
          ← Về trang chủ
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          {selectedService && (
            <span className="bk-meta">
              Đã chọn: <strong>{selectedService.name}</strong> ({formatVnd(selectedService.price)})
            </span>
          )}
          <button
            type="button"
            className="bk-btn bk-btn-primary"
            disabled={!selectedService}
            onClick={handleContinue}
          >
            Tiếp tục: Chọn Barber →
          </button>
        </div>
      </div>
    </div>
  );
}
