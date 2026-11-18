// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /barbers (Thông tin & Đội ngũ Nghệ nhân Cắt Tóc Master Barber - Tích hợp đầy đủ Giao diện, Lọc & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BarberInfoPage() {
  const [filter, setFilter] = useState("all");

  const barbers = [
    {
      id: "barber-1",
      name: "Tuấn Master",
      role: "Chuyên Gia Fade & Cạo Classic",
      specialty: "fade",
      rating: "4.98",
      reviewsCount: 210,
      chairName: "Ghế VIP 01",
      experience: "8 năm kinh nghiệm",
      completedCuts: 142,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Tốt nghiệp Học viện Barber Singapore. Bậc thầy kỹ thuật Skin Fade, Taper Fade và nghệ thuật cạo râu khăn nóng hoàng gia.",
      strengths: ["Skin Fade sắc nét", "Cạo khăn nóng", "Phom doanh nhân"]
    },
    {
      id: "barber-2",
      name: "Minh Barber",
      role: "Thợ Chính Uốn Texture & Sidepart",
      specialty: "perm",
      rating: "4.95",
      reviewsCount: 184,
      chairName: "Ghế 02",
      experience: "6 năm kinh nghiệm",
      completedCuts: 128,
      status: "Đang cắt",
      isReady: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      bio: "Được mệnh danh là 'phù thủy uốn phồng tóc nam'. Chuyên xử lý các loại tóc chỉa, xẹp, mang lại lọn xoăn tự nhiên bồng bềnh.",
      strengths: ["Uốn Fly / Texture", "Ép side nếp tóc", "Sidepart hiện đại"]
    },
    {
      id: "barber-3",
      name: "Hoàng Stylist",
      role: "Chuyên Gia Nhuộm & Phối Màu",
      specialty: "color",
      rating: "4.90",
      reviewsCount: 120,
      chairName: "Ghế 03",
      experience: "5 năm kinh nghiệm",
      completedCuts: 95,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
      bio: "Chuyên sâu về lý thuyết màu sắc và kỹ thuật nâng nền chuẩn châu Âu. Cam kết màu chuẩn tone, không xót rát và tóc suôn mượt.",
      strengths: ["Nhuộm khói & xám", "Tẩy không rát da", "Phục hồi Keratin"]
    },
    {
      id: "barber-4",
      name: "Dũng Barber",
      role: "Thợ Cắt Phom Cổ Điển",
      specialty: "classic",
      rating: "4.92",
      reviewsCount: 110,
      chairName: "Ghế 04",
      experience: "7 năm kinh nghiệm",
      completedCuts: 88,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      bio: "Đam mê nét đẹp cổ điển quý ông thập niên 60s. Khắc họa chính xác các kiểu tóc Pompadour, Slick Back và Ivy League sang trọng.",
      strengths: ["Cắt Pompadour", "Slick Back bóng bẩy", "Viền sắc sảo"]
    }
  ];

  const filteredBarbers = barbers.filter((b) => {
    if (filter === "all") return true;
    return b.specialty === filter;
  });

  return (
    <div className="cust-barber-info-wrap">
      {/* Self-contained CSS styles for Barber Info Page */}
      <style>{`
        .cust-barber-info-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: var(--text-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
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
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: var(--text-primary);
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(220, 38, 38, 0.3);
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(220, 38, 38, 0.45);
        }

        /* Filter Pills */
        .cust-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 36px;
        }
        .cust-pill-btn {
          padding: 8px 18px;
          background: #ffffff;
          border: 1px solid #d6d3d1;
          border-radius: 9999px;
          color: #4b5563;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cust-pill-btn:hover {
          color: #1d4ed8;
          background: #eff6ff;
          border-color: #dc2626;
        }
        .cust-pill-btn.active {
          background: #dc2626;
          border-color: #dc2626;
          color: var(--text-primary);
          font-weight: 800;
        }

        /* Barbers Grid */
        .cust-barbers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
          margin-bottom: 64px;
        }
        .cust-barber-card {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 24px;
          padding: 28px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.08);
        }
        .cust-barber-card:hover {
          border-color: rgba(220, 38, 38, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -6px rgba(15, 23, 42, 0.16);
          background: #fffdf7;
        }
        .cust-avatar-box {
          position: relative;
          width: 104px;
          height: 104px;
          margin: 0 auto 16px;
        }
        .cust-avatar {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          object-fit: cover;
          border: 2px solid rgba(220, 38, 38, 0.4);
        }
        .cust-status-badge {
          position: absolute;
          bottom: -4px;
          right: -4px;
          padding: 3px 10px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
        }
        .cust-status-badge.ready {
          background: #10b981;
          color: var(--text-primary);
        }
        .cust-status-badge.busy {
          background: #dc2626;
          color: var(--text-primary);
        }
        .cust-barber-title {
          font-size: 18px;
          font-weight: 800;
          color: #1f2937;
        }
        .cust-barber-role {
          font-size: 12px;
          color: #1d4ed8;
          font-weight: 600;
          margin-top: 3px;
        }
        .cust-barber-meta {
          font-size: 11px;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 6px;
          margin-bottom: 14px;
        }
        .cust-barber-meta strong {
          color: #1d4ed8;
        }
        .cust-barber-bio {
          font-size: 12px;
          color: #4b5563;
          line-height: 1.6;
          text-align: left;
          background: #fffdf7;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e7e5e4;
          margin-bottom: 14px;
        }
        .cust-strengths-box {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .cust-strength-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 3px 8px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 6px;
          color: #1d4ed8;
        }
        .cust-btn-book-barber {
          width: 100%;
          padding: 11px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 12px;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }
        .cust-btn-book-barber:hover {
          background: #dc2626;
          color: var(--text-primary);
          border-color: #dc2626;
        }

        /* Standards Philosophy Box */
        .cust-standards-box {
          background: #fffdf7;
          border: 1px solid #e7e5e4;
          border-radius: 24px;
          padding: 36px 28px;
          box-shadow: 0 4px 20px -6px rgba(15, 23, 42, 0.08);
        }
        .cust-std-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .cust-std-item {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 2px 8px -2px rgba(15, 23, 42, 0.06);
        }
        .cust-std-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }
        .cust-std-title {
          font-size: 16px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .cust-std-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
        }
      `}</style>

      {/* HEADER */}
      <div className="cust-header">
        <div>
          <span className="cust-header-tag">Đội Ngũ Tay Nghề Cao</span>
          <h1 className="cust-header-title">Master Barbers & Nghệ Nhân Tạo Mẫu</h1>
          <p className="cust-header-sub">Mỗi người thợ tại BarberHub đều có từ 5 năm kinh nghiệm và chứng chỉ nghề quốc tế.</p>
        </div>
        <Link to="/booking/barber" className="cust-btn-primary">
          <span>📅</span>
          <span>Đặt Lịch Thợ Yêu Thích</span>
        </Link>
      </div>

      {/* FILTER PILLS */}
      <div className="cust-filter-pills">
        <button
          onClick={() => setFilter("all")}
          className={`cust-pill-btn ${filter === "all" ? "active" : ""}`}
        >
          Tất Cả Thợ ({barbers.length})
        </button>
        <button
          onClick={() => setFilter("fade")}
          className={`cust-pill-btn ${filter === "fade" ? "active" : ""}`}
        >
          Chuyên Fade & Classic
        </button>
        <button
          onClick={() => setFilter("perm")}
          className={`cust-pill-btn ${filter === "perm" ? "active" : ""}`}
        >
          Chuyên Uốn Tạo Phồng
        </button>
        <button
          onClick={() => setFilter("color")}
          className={`cust-pill-btn ${filter === "color" ? "active" : ""}`}
        >
          Chuyên Nhuộm Thời Trang
        </button>
        <button
          onClick={() => setFilter("classic")}
          className={`cust-pill-btn ${filter === "classic" ? "active" : ""}`}
        >
          Phom Cổ Điển Quý Ông
        </button>
      </div>

      {/* BARBERS GRID */}
      <div className="cust-barbers-grid">
        {filteredBarbers.map((b) => (
          <div key={b.id} className="cust-barber-card">
            <div>
              <div className="cust-avatar-box">
                <img src={b.avatar} alt={b.name} className="cust-avatar" />
                <span className={`cust-status-badge ${b.isReady ? "ready" : "busy"}`}>
                  {b.status}
                </span>
              </div>

              <h3 className="cust-barber-title">{b.name}</h3>
              <p className="cust-barber-role">{b.role}</p>

              <div className="cust-barber-meta">
                <span>★ <strong>{b.rating}</strong></span>
                <span>•</span>
                <span>{b.chairName}</span>
                <span>•</span>
                <span>{b.completedCuts} ca</span>
              </div>

              <p className="cust-barber-bio">{b.bio}</p>

              <div className="cust-strengths-box">
                {b.strengths.map((str, idx) => (
                  <span key={idx} className="cust-strength-tag">
                    ✓ {str}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <Link
                to={`/booking/barber?barber=${encodeURIComponent(b.name)}`}
                className="cust-btn-book-barber"
              >
                <span>✂️</span>
                <span>Đặt Ghế Với {b.name.split(" ")[0]}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* STANDARDS / PHILOSOPHY SECTION */}
      <div className="cust-standards-box">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 32px" }}>
          <span className="cust-header-tag">Tiêu Chuẩn Nghệ Nhân</span>
          <h2 style={{ fontSize: "24px", fontWeight: "900", color: "#1f2937", marginBottom: "6px" }}>
            Tại Sao Khách Hàng Tin Tưởng BarberHub?
          </h2>
          <p style={{ fontSize: "13px", color: "#6b7280" }}>
            Mỗi đường kéo đều là tâm huyết và sự tận tụy nhằm mang đến diện mạo hoàn hảo nhất cho quý khách.
          </p>
        </div>

        <div className="cust-std-grid">
          <div className="cust-std-item">
            <div className="cust-std-icon">🏆</div>
            <h4 className="cust-std-title">Kỹ Năng Đỉnh Cao</h4>
            <p className="cust-std-desc">
              100% thợ chính đều trải qua các kỳ sát hạch tay nghề khắt khe hàng quý và đào tạo xu hướng mới.
            </p>
          </div>

          <div className="cust-std-item">
            <div className="cust-std-icon">❤️</div>
            <h4 className="cust-std-title">Tư Vấn Tận Tâm</h4>
            <p className="cust-std-desc">
              Lắng nghe kỹ lưỡng thói quen vuốt tóc, môi trường làm việc để tư vấn kiểu tóc thuận tiện nhất.
            </p>
          </div>

          <div className="cust-std-item">
            <div className="cust-std-icon">🛡️</div>
            <h4 className="cust-std-title">Đảm Bảo Hài Lòng</h4>
            <p className="cust-std-desc">
              Bảo hành 7 ngày miễn phí. Nếu bạn chưa ưng ý bất kỳ chi tiết nào, chúng tôi sẽ chỉnh sửa tận tình.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
