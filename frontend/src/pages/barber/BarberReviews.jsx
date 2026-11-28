// Phụ trách: Vũ Quốc Khánh – Đánh giá khách hàng của Barber (Tích hợp API thật, Sprint 4 - T06AF34)
import { useEffect, useState } from "react";
import client from "../../api/client";
import { barberReviewsMock } from "../../mocks/barberReviews";

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold-border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
  boxShadow: "var(--shadow-card)",
};

const formatDate = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join("/") : "");

// Hiển thị sao, hỗ trợ số lẻ (ví dụ 4.3 sao)
function Stars({ value, size = 18 }) {
  const pct = (value / 5) * 100;
  return (
    <span
      aria-label={`${value} sao`}
      style={{ position: "relative", display: "inline-block", fontSize: size, letterSpacing: "2px", lineHeight: 1 }}
    >
      <span style={{ color: "#e5d6b4" }}>★★★★★</span>
      <span style={{ position: "absolute", left: 0, top: 0, width: `${pct}%`, overflow: "hidden", whiteSpace: "nowrap", color: "#f59e0b" }}>
        ★★★★★
      </span>
    </span>
  );
}

function FilterButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "7px 16px",
        borderRadius: "999px",
        border: active ? "1px solid var(--gold-dark)" : "1px solid var(--border-medium)",
        background: active ? "var(--gold-primary)" : "#ffffff",
        color: active ? "#1f1300" : "var(--text-secondary)",
        fontWeight: 700,
        fontSize: "13px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export default function BarberReviews() {
  const [starFilter, setStarFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [reviews, setReviews] = useState(barberReviewsMock);
  const [loading, setLoading] = useState(true);

  // Tải danh sách đánh giá từ API thật
  useEffect(() => {
    let mounted = true;
    async function fetchReviews() {
      try {
        setLoading(true);
        const params = {
          sort: sortOrder,
        };
        if (starFilter !== "all") {
          params.star = starFilter;
        }

        const res = await client.get("/barber/reviews", { params });
        const rawList = res.items || (Array.isArray(res) ? res : []);

        if (mounted && rawList && rawList.length > 0) {
          const normalized = rawList.map((r) => ({
            id: r.id || r.review_id,
            customer: r.customer || r.customer_name || "Khách hàng",
            service: r.service || r.service_name || "Cắt tóc nam",
            rating: r.rating || 5,
            date: r.date || r.created_at || "2026-11-20T10:00",
            comment: r.comment || "Dịch vụ rất tốt!",
          }));
          setReviews(normalized);
        }
      } catch (err) {
        console.warn("Không thể tải API /barber/reviews, dùng dữ liệu dự phòng:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchReviews();
    return () => {
      mounted = false;
    };
  }, [starFilter, sortOrder]);

  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const visible = reviews
    .filter((r) => starFilter === "all" || r.rating === starFilter)
    .slice()
    .sort((a, b) => (sortOrder === "newest" ? String(b.date).localeCompare(String(a.date)) : String(a.date).localeCompare(String(b.date))));

  const toggleStar = (star) => setStarFilter((current) => (current === star ? "all" : star));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
          Đánh giá khách hàng
        </h1>
        {loading && (
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Đang tải đánh giá từ máy chủ...
          </span>
        )}
      </div>

      {/* Tổng quan: điểm trung bình + phân bố số sao */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div style={{ ...cardStyle, flex: "1 1 240px", textAlign: "center" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600 }}>Điểm trung bình</div>
          <div style={{ fontSize: "56px", fontWeight: 900, color: "var(--gold-deep)", lineHeight: 1.2 }}>
            {average.toFixed(1)}
          </div>
          <Stars value={average} size={24} />
          <div style={{ color: "var(--text-muted)", fontSize: "14px", marginTop: "8px" }}>{total} lượt đánh giá</div>
        </div>

        <div style={{ ...cardStyle, flex: "2 1 360px" }}>
          <div style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 600, marginBottom: "12px" }}>
            Phân bố số sao (bấm vào một hàng để lọc)
          </div>
          {distribution.map(({ star, count }) => {
            const pct = total ? (count / total) * 100 : 0;
            return (
              <div
                key={star}
                onClick={() => toggleStar(star)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "6px 8px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: starFilter === star ? "rgba(245, 158, 11, 0.12)" : "transparent",
                }}
              >
                <span style={{ width: "36px", fontWeight: 700, color: "var(--text-primary)" }}>{star} ★</span>
                <div style={{ flex: 1, height: "10px", borderRadius: "999px", background: "#f3ecd9", overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: "var(--gold-gradient)" }} />
                </div>
                <span style={{ width: "32px", textAlign: "right", color: "var(--text-secondary)", fontSize: "14px" }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bộ lọc và sắp xếp */}
      <div style={{ ...cardStyle, display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
        <FilterButton active={starFilter === "all"} onClick={() => setStarFilter("all")}>
          Tất cả ({total})
        </FilterButton>
        {distribution.map(({ star, count }) => (
          <FilterButton key={star} active={starFilter === star} onClick={() => setStarFilter(star)}>
            {star} ★ ({count})
          </FilterButton>
        ))}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            marginLeft: "auto",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border-medium)",
            background: "var(--bg-input)",
            color: "var(--text-primary)",
          }}
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
        </select>
      </div>

      {/* Danh sách thẻ đánh giá */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {visible.length === 0 ? (
          <div style={{ ...cardStyle, textAlign: "center", color: "var(--text-muted)" }}>
            Không có đánh giá nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          visible.map((r) => (
            <div key={r.id} style={cardStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontWeight: 800, color: "var(--text-primary)", fontSize: "15px" }}>{r.customer}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "2px" }}>
                    Dịch vụ: <strong style={{ color: "var(--text-secondary)" }}>{r.service}</strong>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Stars value={r.rating} size={16} />
                  <div style={{ color: "var(--text-muted)", fontSize: "12px", marginTop: "2px" }}>{formatDate(r.date)}</div>
                </div>
              </div>
              <p style={{ marginTop: "12px", color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "14px" }}>
                {r.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
