// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /reviews (Đánh giá dịch vụ & Cảm nhận khách hàng thực tế - Tích hợp đầy đủ Giao diện, Form gửi phản hồi & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [userRating, setUserRating] = useState(5);
  const [selectedService, setSelectedService] = useState("Combo Cắt + Gội + Massage Đăng Quang");
  const [selectedBarber, setSelectedBarber] = useState("Tuấn Master");
  const [commentText, setCommentText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      author: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierBadge: "gold",
      date: "16/11/2026",
      stars: 5,
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      barber: "Tuấn Master",
      comment: "Tuấn Master cắt cực kỳ tỉ mỉ! Hiệu ứng Skin Fade sắc nét, đường cạo viền chuẩn chỉ. Khăn nóng tinh dầu thảo mộc rất thư giãn, xứng đáng 5 sao cho chất lượng dịch vụ BarberHub.",
      verified: true
    },
    {
      id: "rev-2",
      author: "Lê Minh Đức",
      tier: "Khách Thân Thiết",
      tierBadge: "blue",
      date: "10/11/2026",
      stars: 5,
      service: "Uốn Xoăn Hàn Quốc Fly Texture",
      barber: "Minh Barber",
      comment: "Lần đầu uốn tóc nhưng Minh Barber tư vấn phom cực kỳ chuẩn soái ca. Tóc uốn xong bồng bềnh tự nhiên, không bị khô xơ da đầu. Salon phục vụ trà sen rất ngon!",
      verified: true
    },
    {
      id: "rev-3",
      author: "Trần Quốc Bảo",
      tier: "Khách Thân Thiết",
      tierBadge: "blue",
      date: "05/11/2026",
      stars: 5,
      service: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      barber: "Hoàng Stylist",
      comment: "Tẩy khói ở đây cực kỳ êm ái, hoàn toàn không bị xót rát da đầu như các tiệm khác. Màu lên sáng và bóng mượt, được tặng kèm gói hấp collagen thơm nức.",
      verified: true
    },
    {
      id: "rev-4",
      author: "Phạm Văn Cường",
      tier: "Khách Mới",
      tierBadge: "neutral",
      date: "28/10/2026",
      stars: 4,
      service: "Cắt Undercut Nam Chuẩn Barber",
      barber: "Dũng Barber",
      comment: "Dáng tóc cổ điển chuẩn form, thợ cắt nhiệt tình vui vẻ. Điểm trừ duy nhất là cuối tuần đông khách nên phải chờ thêm 5 phút dù đã đặt lịch trước.",
      verified: true
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Vui lòng nhập cảm nhận trải nghiệm của bạn!");
      return;
    }

    const newRev = {
      id: "rev-" + Date.now(),
      author: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierBadge: "gold",
      date: "Vừa xong",
      stars: userRating,
      service: selectedService,
      barber: selectedBarber,
      comment: commentText.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setCommentText("");
    showToast("Cảm ơn bạn đã gửi đánh giá trải nghiệm tại BarberHub!");
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (ratingFilter === "all") return true;
    return r.stars === parseInt(ratingFilter, 10);
  });

  return (
    <div className="cust-reviews-wrap">
      {/* Self-contained CSS styles for Review Page */}
      <style>{`
        .cust-reviews-wrap {
          max-width: 1240px;
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
          color: #ffffff;
          letter-spacing: -0.02em;
        }
        .cust-header-sub {
          font-size: 14px;
          color: #94a3b8;
          margin-top: 4px;
        }

        /* Toast */
        .cust-toast {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 999;
          background: #141720;
          border: 1px solid #10b981;
          color: #34d399;
          padding: 12px 20px;
          border-radius: 14px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          animation: slideUp 0.3s ease;
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Summary Header Box */
        .cust-summary-hero {
          background: #141720;
          border: 1px solid #232736;
          border-radius: 28px;
          padding: 36px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          margin-bottom: 48px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }
        @media (min-width: 768px) {
          .cust-summary-hero {
            grid-template-columns: 240px 1fr;
            align-items: center;
          }
        }
        .cust-score-box {
          text-align: center;
          border-right: none;
          padding-right: 0;
        }
        @media (min-width: 768px) {
          .cust-score-box {
            border-right: 1px solid #232736;
            padding-right: 36px;
          }
        }
        .cust-score-big {
          font-size: 56px;
          font-weight: 900;
          color: #fbbf24;
          line-height: 1;
          margin-bottom: 8px;
        }
        .cust-score-stars {
          color: #f59e0b;
          font-size: 18px;
          margin-bottom: 6px;
        }
        .cust-score-count {
          font-size: 12px;
          color: #94a3b8;
        }

        /* Progress Bars */
        .cust-bars-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .cust-bar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
        }
        .cust-bar-lbl {
          width: 50px;
          color: #94a3b8;
          font-weight: 700;
        }
        .cust-bar-track {
          flex: 1;
          height: 8px;
          background: #0a0b0f;
          border-radius: 9999px;
          overflow: hidden;
        }
        .cust-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #d97706, #fbbf24);
          border-radius: 9999px;
        }
        .cust-bar-pct {
          width: 36px;
          text-align: right;
          color: #64748b;
          font-weight: 700;
        }

        /* Two Column Main */
        .cust-two-col {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 992px) {
          .cust-two-col {
            grid-template-columns: 420px 1fr;
          }
        }

        /* Review Form Box */
        .cust-form-box {
          background: #141720;
          border: 1px solid #232736;
          border-radius: 24px;
          padding: 28px;
          height: fit-content;
        }
        .cust-form-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .cust-form-sub {
          font-size: 12px;
          color: #94a3b8;
          margin-bottom: 20px;
        }
        .cust-field {
          margin-bottom: 16px;
        }
        .cust-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .cust-select, .cust-textarea {
          width: 100%;
          padding: 12px 14px;
          background: #0a0b0f;
          border: 1px solid #232736;
          border-radius: 12px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
          box-sizing: border-box;
          font-family: inherit;
        }
        .cust-select:focus, .cust-textarea:focus {
          border-color: #f59e0b;
        }
        .cust-textarea {
          resize: vertical;
          min-height: 100px;
        }
        .cust-star-picker {
          display: flex;
          gap: 8px;
          font-size: 24px;
          cursor: pointer;
        }
        .cust-star-opt {
          color: #3f475a;
          transition: color 0.15s ease;
        }
        .cust-star-opt.active {
          color: #fbbf24;
        }
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #08090c;
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
          transition: all 0.2s ease;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-2px);
        }

        /* Filter Pills */
        .cust-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 24px;
        }
        .cust-pill-btn {
          padding: 8px 16px;
          background: #141720;
          border: 1px solid #232736;
          border-radius: 9999px;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cust-pill-btn:hover {
          color: #ffffff;
        }
        .cust-pill-btn.active {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #08090c;
          font-weight: 800;
        }

        /* Review Cards List */
        .cust-reviews-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .cust-rev-card {
          background: #141720;
          border: 1px solid #232736;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.25s ease;
        }
        .cust-rev-card:hover {
          border-color: rgba(245, 158, 11, 0.35);
        }
        .cust-rev-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .cust-rev-author-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .cust-rev-author {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
        }
        .cust-rev-tier-badge {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 9999px;
        }
        .cust-rev-tier-badge.gold {
          background: rgba(245, 158, 11, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .cust-rev-tier-badge.blue {
          background: rgba(59, 130, 246, 0.12);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .cust-rev-tier-badge.neutral {
          background: rgba(148, 163, 184, 0.12);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.3);
        }
        .cust-rev-date {
          font-size: 11px;
          color: #64748b;
        }
        .cust-rev-meta-sub {
          font-size: 12px;
          color: #fbbf24;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cust-rev-comment {
          font-size: 13px;
          color: #cbd5e1;
          line-height: 1.65;
          margin-bottom: 12px;
        }
        .cust-rev-verified {
          font-size: 11px;
          color: #10b981;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
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
          <span className="cust-header-tag">Cảm Nhận Thực Tế</span>
          <h1 className="cust-header-title">Đánh Giá & Trải Nghiệm Khách Hàng</h1>
          <p className="cust-header-sub">Lắng nghe ý kiến đóng góp chân thực từ những quý ông đã đồng hành cùng BarberHub.</p>
        </div>
        <Link to="/booking/service" className="cust-btn-primary" style={{ width: "auto" }}>
          <span>✂️</span>
          <span>Đặt Lịch Trải Nghiệm</span>
        </Link>
      </div>

      {/* SUMMARY STATS HERO */}
      <div className="cust-summary-hero">
        <div className="cust-score-box">
          <div className="cust-score-big">4.9</div>
          <div className="cust-score-stars">★★★★★</div>
          <div className="cust-score-count">248 đánh giá xác thực</div>
        </div>

        <div className="cust-bars-list">
          <div className="cust-bar-row">
            <span className="cust-bar-lbl">5 sao</span>
            <div className="cust-bar-track">
              <div className="cust-bar-fill" style={{ width: "88%" }}></div>
            </div>
            <span className="cust-bar-pct">88%</span>
          </div>

          <div className="cust-bar-row">
            <span className="cust-bar-lbl">4 sao</span>
            <div className="cust-bar-track">
              <div className="cust-bar-fill" style={{ width: "10%" }}></div>
            </div>
            <span className="cust-bar-pct">10%</span>
          </div>

          <div className="cust-bar-row">
            <span className="cust-bar-lbl">3 sao</span>
            <div className="cust-bar-track">
              <div className="cust-bar-fill" style={{ width: "2%" }}></div>
            </div>
            <span className="cust-bar-pct">2%</span>
          </div>

          <div className="cust-bar-row">
            <span className="cust-bar-lbl">2 sao</span>
            <div className="cust-bar-track">
              <div className="cust-bar-fill" style={{ width: "0%" }}></div>
            </div>
            <span className="cust-bar-pct">0%</span>
          </div>

          <div className="cust-bar-row">
            <span className="cust-bar-lbl">1 sao</span>
            <div className="cust-bar-track">
              <div className="cust-bar-fill" style={{ width: "0%" }}></div>
            </div>
            <span className="cust-bar-pct">0%</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO COLUMN LAYOUT */}
      <div className="cust-two-col">
        {/* Left Column: Review Form */}
        <div className="cust-form-box">
          <h3 className="cust-form-title">Gửi Đánh Giá Của Bạn</h3>
          <p className="cust-form-sub">Chia sẻ cảm nhận sau khi hoàn thành dịch vụ tại salon.</p>

          <form onSubmit={handleReviewSubmit}>
            <div className="cust-field">
              <label className="cust-label">Dịch vụ đã sử dụng</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="cust-select"
              >
                <option value="Combo Cắt + Gội + Massage Đăng Quang">Combo Cắt + Gội + Massage Đăng Quang</option>
                <option value="Cắt Tóc Nam Chuẩn Barber">Cắt Tóc Nam Chuẩn Barber</option>
                <option value="Uốn Xoăn Hàn Quốc / Fly / Texture">Uốn Xoăn Hàn Quốc / Fly / Texture</option>
                <option value="Nhuộm Màu / Tẩy Tóc Cao Cấp">Nhuộm Màu / Tẩy Tóc Cao Cấp</option>
                <option value="Cạo Râu & Mặt Khăn Nóng Classic">Cạo Râu & Mặt Khăn Nóng Classic</option>
                <option value="Tẩy Tế Bào Chết & Trị Gàu Da Đầu">Tẩy Tế Bào Chết & Trị Gàu Da Đầu</option>
              </select>
            </div>

            <div className="cust-field">
              <label className="cust-label">Master Barber thực hiện</label>
              <select
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
                className="cust-select"
              >
                <option value="Tuấn Master">Tuấn Master (Fade & Cạo Classic)</option>
                <option value="Minh Barber">Minh Barber (Uốn Texture & Sidepart)</option>
                <option value="Hoàng Stylist">Hoàng Stylist (Nhuộm & Phối Màu)</option>
                <option value="Dũng Barber">Dũng Barber (Phom Cổ Điển)</option>
              </select>
            </div>

            <div className="cust-field">
              <label className="cust-label">Chấm điểm chất lượng</label>
              <div className="cust-star-picker">
                {[1, 2, 3, 4, 5].map((st) => (
                  <span
                    key={st}
                    onClick={() => setUserRating(st)}
                    className={`cust-star-opt ${st <= userRating ? "active" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="cust-field">
              <label className="cust-label">Cảm nhận chi tiết</label>
              <textarea
                placeholder="Độ êm ái khi cắt, độ bền của phom tóc, thái độ phục vụ..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="cust-textarea"
                required
              />
            </div>

            <button type="submit" className="cust-btn-primary">
              <span>⭐</span>
              <span>Gửi Đánh Giá Ngay</span>
            </button>
          </form>
        </div>

        {/* Right Column: Reviews List with Filters */}
        <div>
          <div className="cust-pills-row">
            <button
              onClick={() => setRatingFilter("all")}
              className={`cust-pill-btn ${ratingFilter === "all" ? "active" : ""}`}
            >
              Tất Cả ({reviewsList.length})
            </button>
            <button
              onClick={() => setRatingFilter("5")}
              className={`cust-pill-btn ${ratingFilter === "5" ? "active" : ""}`}
            >
              5 Sao
            </button>
            <button
              onClick={() => setRatingFilter("4")}
              className={`cust-pill-btn ${ratingFilter === "4" ? "active" : ""}`}
            >
              4 Sao
            </button>
            <button
              onClick={() => setRatingFilter("3")}
              className={`cust-pill-btn ${ratingFilter === "3" ? "active" : ""}`}
            >
              3 Sao
            </button>
          </div>

          <div className="cust-reviews-list">
            {filteredReviews.map((r) => (
              <div key={r.id} className="cust-rev-card">
                <div className="cust-rev-top">
                  <div className="cust-rev-author-box">
                    <span className="cust-rev-author">{r.author}</span>
                    <span className={`cust-rev-tier-badge ${r.tierBadge}`}>{r.tier}</span>
                  </div>
                  <span className="cust-rev-date">{r.date}</span>
                </div>

                <div className="cust-rev-meta-sub">
                  <span>{"★".repeat(r.stars)}</span>
                  <span style={{ color: "#64748b" }}>•</span>
                  <span>{r.service}</span>
                  <span style={{ color: "#64748b" }}>•</span>
                  <span style={{ color: "#ffffff" }}>{r.barber}</span>
                </div>

                <p className="cust-rev-comment">"{r.comment}"</p>

                {r.verified && (
                  <div className="cust-rev-verified">
                    <span>✓</span>
                    <span>Đã xác thực sử dụng dịch vụ tại salon</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
