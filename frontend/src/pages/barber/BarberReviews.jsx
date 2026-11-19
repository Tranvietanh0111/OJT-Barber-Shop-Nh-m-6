// Phụ trách: Vũ Quốc Khánh – Đánh giá khách hàng của Barber (dữ liệu mẫu, Sprint 3)
import { useState } from "react";
import { barberReviewsMock } from "../../mocks/barberReviews";

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold-border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
  boxShadow: "var(--shadow-card)",
};

const formatDate = (iso) => iso.slice(0, 10).split("-").reverse().join("/");

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

  const reviews = barberReviewsMock;
  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const visible = reviews
    .filter((r) => starFilter === "all" || r.rating === starFilter)
    .slice()
    .sort((a, b) => (sortOrder === "newest" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));

  const toggleStar = (star) => setStarFilter((current) => (current === star ? "all" : star));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1000px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>
        Đánh giá khách hàng
      </h1>

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
          <option value="newest">Mới nhất trước</option>
          <option value="oldest">Cũ nhất trước</option>
        </select>
      </div>

      {/* Danh sách nhận xét */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {visible.length === 0 && (
          <div style={{ ...cardStyle, textAlign: "center", color: "var(--text-muted)" }}>
            Chưa có đánh giá nào với mức sao này
          </div>
        )}
        {visible.map((r) => (
          <div key={r.id} style={cardStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    background: "var(--gold-gradient)",
                    color: "#1f1300",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {r.customer.split(" ").pop()[0]}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{r.customer}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                    {r.service} · {formatDate(r.date)}
                  </div>
                </div>
              </div>
              <Stars value={r.rating} />
            </div>
            <p style={{ marginTop: "12px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}