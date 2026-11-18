// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: / (Trang chủ khách hàng BarberHub - Tích hợp đầy đủ Giao diện, Dữ liệu & Phong cách Royal Gold)
import { Link } from "react-router-dom";
import { LineIcon } from "../../components/Header";

export default function HomePage() {
  const featuredServices = [
    {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeType: "blue",
      price: "150.000 đ",
      duration: "30 Phút",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeType: "red",
      price: "250.000 đ",
      duration: "45 Phút",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeType: "blue",
      price: "450.000 đ",
      duration: "90 Phút",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      badgeType: "blue",
      price: "600.000 đ",
      duration: "120 Phút",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeType: "blue",
      price: "100.000 đ",
      duration: "20 Phút",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeType: "blue",
      price: "200.000 đ",
      duration: "30 Phút",
      desc: "Tẩy sạch bã nhờn chân tóc, thanh lọc da đầu bằng muối khoáng sinh học, thông thoáng mát lạnh."
    }
  ];

  const masterBarbers = [
    {
      id: "barber-1",
      name: "Tuấn Master",
      role: "Chuyên gia Fade & Cạo Classic",
      rating: "4.98",
      completedCuts: 142,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-2",
      name: "Minh Barber",
      role: "Thợ Chính Uốn Texture & Sidepart",
      rating: "4.95",
      completedCuts: 128,
      status: "Đang cắt",
      isReady: false,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-3",
      name: "Hoàng Stylist",
      role: "Chuyên Gia Nhuộm & Phối Màu",
      rating: "4.90",
      completedCuts: 95,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-4",
      name: "Dũng Barber",
      role: "Thợ Cắt Phom Cổ Điển",
      rating: "4.92",
      completedCuts: 88,
      status: "Sẵn sàng",
      isReady: true,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80"
    }
  ];

  const bookingSteps = [
    {
      step: "01",
      title: "Chọn Dịch Vụ",
      desc: "Lựa chọn các gói cắt tóc, uốn nhuộm thời trang hoặc spa thư giãn theo nhu cầu.",
      icon: "scissors"
    },
    {
      step: "02",
      title: "Chọn Master Barber",
      desc: "Chỉ định thợ ruột có tay nghề phù hợp với kiểu tóc bạn mong muốn.",
      icon: "scissors"
    },
    {
      step: "03",
      title: "Chọn Khung Giờ",
      desc: "Hệ thống cập nhật thời gian thực, đảm bảo ghế trống sẵn sàng khi bạn tới.",
      icon: "calendar"
    },
    {
      step: "04",
      title: "Tút Tát Đẳng Cấp",
      desc: "Đến đúng giờ, thưởng thức trà bánh miễn phí và đón nhận diện mạo tự tin.",
      icon: "star"
    }
  ];

  const customerReviews = [
    {
      name: "Anh Hoàng Nam",
      tier: "Khách VIP",
      stars: 5,
      comment: "Tuấn Master cắt cực kỳ tỉ mỉ! Hiệu ứng Skin Fade sắc nét, đường cạo viền chuẩn chỉ. Khăn nóng tinh dầu thảo mộc rất thư giãn, xứng đáng 5 sao cho chất lượng dịch vụ BarberHub."
    },
    {
      name: "Lê Minh Đức",
      tier: "Khách Thân Thiết",
      stars: 5,
      comment: "Lần đầu uốn tóc nhưng Minh Barber tư vấn phom cực kỳ chuẩn soái ca. Tóc uốn xong bồng bềnh tự nhiên, không bị khô xơ da đầu. Salon phục vụ trà sen rất ngon!"
    },
    {
      name: "Trần Quốc Bảo",
      tier: "Khách Thân Thiết",
      stars: 5,
      comment: "Tẩy khói ở đây cực kỳ êm ái, hoàn toàn không bị xót rát da đầu như các tiệm khác. Màu lên sáng và bóng mượt, được tặng kèm gói hấp collagen thơm nức."
    }
  ];

  return (
    <div className="cust-home-wrap">
      {/* Self-contained CSS styles for Customer Home Page */}
      <style>{`
        .cust-home-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: var(--text-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* 1. Hero Section */
        .cust-hero {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.85fr);
          align-items: center;
          gap: 32px;
          background: linear-gradient(135deg, var(--color-bg) 0%, var(--color-info-bg) 55%, var(--color-alert-bg) 100%);
          border: 1px solid var(--color-alert-bg);
          border-radius: 28px;
          padding: 48px 36px;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-card);
          margin-bottom: 56px;
        }
        .cust-hero::after {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, var(--color-alert-bg) 0%, transparent 70%);
          pointer-events: none;
          border-radius: 50%;
          z-index: 0;
        }
        .cust-hero-content,
        .cust-hero-media {
          position: relative;
          z-index: 1;
        }
        .cust-hero-media {
          height: 100%;
          min-height: 420px;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
        }
        .cust-hero-media img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 420px;
          object-fit: cover;
        }
        .cust-hero-media::after {
          content: "";
          position: absolute;
          inset: 45% 0 0;
          background: linear-gradient(180deg, transparent, var(--color-navy-overlay));
        }
        .cust-hero-image-caption {
          position: absolute;
          z-index: 1;
          right: 18px;
          bottom: 18px;
          left: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--color-text-on-dark);
          font-size: 13px;
          font-weight: 700;
        }
        .cust-srv-duration svg {
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }
        .cust-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: var(--color-alert-bg);
          border: 1px solid var(--color-accent);
          border-radius: 9999px;
          color: var(--color-navy);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 20px;
        }
        .cust-hero-title {
          font-size: 42px;
          font-weight: 900;
          line-height: 1.18;
          color: var(--color-text);
          margin-bottom: 16px;
          letter-spacing: -0.02em;
        }
        .cust-hero-accent {
          color: var(--color-accent);
        }
        .cust-hero-desc {
          font-size: 15px;
          color: var(--color-text-secondary);
          max-width: 620px;
          line-height: 1.65;
          margin-bottom: 28px;
        }
        .cust-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 36px;
        }
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          background: var(--color-accent);
          color: var(--color-text-on-dark);
          font-weight: 800;
          font-size: 13px;
          border-radius: 14px;
          text-decoration: none;
          box-shadow: var(--shadow-card);
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .cust-btn-primary:hover {
          transform: translateY(-2px);
          filter: brightness(0.94);
          box-shadow: var(--shadow-lg);
        }
        .cust-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          background: var(--bg-surface);
          color: var(--color-navy);
          font-weight: 700;
          font-size: 13px;
          border-radius: 14px;
          border: 1px solid var(--color-sidebar-bg);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cust-btn-secondary:hover {
          background: var(--color-info-bg);
          border-color: var(--color-accent);
          color: var(--color-navy);
        }
        .cust-hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          border-top: 1px solid var(--color-alert-bg);
          padding-top: 24px;
          max-width: 680px;
        }
        .cust-stat-val {
          font-size: 22px;
          font-weight: 900;
          color: var(--color-text);
        }
        .cust-stat-val.gold {
          color: var(--color-gold);
        }
        .cust-stat-lbl {
          font-size: 11px;
          color: var(--color-text-muted);
          margin-top: 4px;
        }

        /* 2. Section Header Common */
        .cust-sec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 28px;
        }
        .cust-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-navy);
          display: block;
          margin-bottom: 4px;
        }
        .cust-sec-title {
          font-size: 26px;
          font-weight: 800;
          color: var(--color-text);
          line-height: 1.25;
        }
        .cust-sec-sub {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-top: 4px;
        }
        .cust-link-more {
          color: var(--color-navy);
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease;
        }
        .cust-link-more:hover {
          gap: 8px;
          color: var(--color-accent);
        }

        /* 3. Services Grid */
        .cust-srv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
          margin-bottom: 64px;
        }
        .cust-srv-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
          box-shadow: var(--shadow-card);
        }
        .cust-srv-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          background: var(--color-bg);
        }
        .cust-srv-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .cust-srv-badge {
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cust-srv-badge.gold {
          background: var(--color-info-bg);
          color: var(--color-navy);
          border: 1px solid var(--color-sidebar-bg);
        }
        .cust-srv-badge.red {
          background: var(--color-alert-bg);
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
        }
        .cust-srv-badge.blue {
          background: var(--color-info-bg);
          color: var(--color-navy);
          border: 1px solid var(--color-sidebar-bg);
        }
        .cust-srv-duration {
          font-size: 11px;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        .cust-srv-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 8px;
        }
        .cust-srv-desc {
          font-size: 13px;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 20px;
        }
        .cust-srv-bot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }
        .cust-srv-price {
          font-size: 20px;
          font-weight: 900;
          color: var(--color-navy);
        }
        .cust-srv-btns {
          display: flex;
          gap: 8px;
        }
        .cust-btn-xs {
          padding: 8px 14px;
          font-size: 11px;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cust-btn-detail {
          background: var(--color-info-bg);
          color: var(--color-navy);
          border: 1px solid var(--color-sidebar-bg);
        }
        .cust-btn-detail:hover {
          background: var(--color-bg);
          color: var(--color-navy);
        }
        .cust-btn-book {
          background: var(--color-navy);
          color: var(--color-text-on-dark);
          font-weight: 800;
          border: none;
        }
        .cust-btn-book:hover {
          background: var(--color-navy-light);
        }

        /* 4. Barbers Grid */
        .cust-barber-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
          margin-bottom: 64px;
        }
        .cust-barber-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-card);
        }
        .cust-barber-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          background: var(--color-bg);
        }
        .cust-barber-avatar-box {
          position: relative;
          width: 96px;
          height: 96px;
          margin: 0 auto 16px;
        }
        .cust-barber-avatar {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          object-fit: cover;
          border: 2px solid var(--color-accent);
        }
        .cust-barber-status {
          position: absolute;
          bottom: -6px;
          right: -6px;
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
        }
        .cust-barber-status.ready {
          background: var(--status-completed-bg);
          color: var(--status-completed-text);
        }
        .cust-barber-status.busy {
          background: var(--color-alert-bg);
          color: var(--color-accent);
        }
        .cust-barber-name {
          font-size: 16px;
          font-weight: 800;
          color: var(--color-text);
        }
        .cust-barber-role {
          font-size: 12px;
          color: var(--color-navy);
          font-weight: 600;
          margin-top: 2px;
          margin-bottom: 8px;
        }
        .cust-barber-meta {
          font-size: 12px;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .cust-barber-meta strong {
          color: var(--color-navy);
        }

        /* 5. Booking Steps */
        .cust-steps-box {
          background: var(--color-bg);
          border: 1px solid var(--border-subtle);
          border-radius: 24px;
          padding: 36px 28px;
          margin-bottom: 64px;
          box-shadow: var(--shadow-card);
        }
        .cust-steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }
        .cust-step-item {
          position: relative;
          padding: 16px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          box-shadow: var(--shadow-card);
        }
        .cust-step-num {
          font-size: 24px;
          font-weight: 900;
          color: var(--color-info-bg);
          line-height: 1;
          margin-bottom: 12px;
        }
        .cust-step-icon {
          color: var(--color-navy);
          line-height: 0;
          margin-bottom: 10px;
        }
        .cust-step-icon svg {
          width: 28px;
          height: 28px;
        }
        .cust-step-title {
          font-size: 15px;
          font-weight: 800;
          color: var(--color-text);
          margin-bottom: 6px;
        }
        .cust-step-desc {
          font-size: 12px;
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        /* 6. Reviews Section */
        .cust-reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
        }
        .cust-review-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          box-shadow: var(--shadow-card);
          transition: all 0.25s ease;
        }
        .cust-review-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          background: var(--color-bg);
        }
        .cust-review-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .cust-review-author {
          font-size: 14px;
          font-weight: 800;
          color: var(--color-text);
        }
        .cust-review-tier {
          font-size: 10px;
          font-weight: 800;
          padding: 2px 8px;
          background: var(--color-info-bg);
          color: var(--color-navy);
          border-radius: 9999px;
          border: 1px solid var(--color-sidebar-bg);
        }
        .cust-review-stars {
          color: var(--color-gold);
          font-size: 13px;
          margin-bottom: 10px;
        }
        .cust-review-text {
          font-size: 13px;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .cust-hero {
            grid-template-columns: 1fr;
          }
          .cust-hero-media,
          .cust-hero-media img {
            min-height: 260px;
          }
          .cust-hero-title {
            font-size: 28px;
          }
          .cust-hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .cust-srv-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* 1. HERO BANNER */}
      <section className="cust-hero">
        <div className="cust-hero-content">
          <div className="cust-hero-badge">
            <span>Hair Salon Suite Dành Riêng Cho Quý Ông</span>
          </div>
          <h1 className="cust-hero-title">
            Tút Lại Phong Độ, <br />
            <span className="cust-hero-accent">Định Hình Đẳng Cấp.</span>
          </h1>
          <p className="cust-hero-desc">
            Hệ thống cắt tóc & chăm sóc râu chuyên nghiệp hàng đầu. Đặt lịch trực tuyến 30 giây để được phục vụ đúng giờ, không xếp hàng chờ đợi cùng đội ngũ Master Barber tay nghề cao.
          </p>

          <div className="cust-hero-actions">
            <Link to="/booking/service" className="cust-btn-primary">
              <LineIcon name="scissors" size={16} />
              <span>Đặt Lịch Cắt Tóc Ngay</span>
            </Link>
            <Link to="/services" className="cust-btn-secondary">
              <span>Khám Phá Bảng Giá</span>
            </Link>
            <Link to="/barbers" className="cust-btn-secondary">
              <span>Đội Ngũ Barber</span>
            </Link>
          </div>

          <div className="cust-hero-stats">
            <div>
              <div className="cust-stat-val gold">4.98 ★</div>
              <div className="cust-stat-lbl">Đánh giá trung bình</div>
            </div>
            <div>
              <div className="cust-stat-val">10.000+</div>
              <div className="cust-stat-lbl">Khách hàng tin chọn</div>
            </div>
            <div>
              <div className="cust-stat-val">4 Ghế VIP</div>
              <div className="cust-stat-lbl">Phục vụ liên tục</div>
            </div>
            <div>
              <div className="cust-stat-val">100%</div>
              <div className="cust-stat-lbl">Tiệt trùng UV chuẩn y tế</div>
            </div>
          </div>
        </div>

        <div className="cust-hero-media">
          <img
            src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&auto=format&fit=crop&q=85"
            alt="Dịch vụ cắt tóc nam tại tiệm barber"
          />
          <div className="cust-hero-image-caption">
            <LineIcon name="scissors" size={18} />
            <span>Kỹ thuật barber chỉn chu, phong cách riêng</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cust-sec-header">
          <div>
            <span className="cust-tag">Dịch Vụ Tiêu Biểu</span>
            <h2 className="cust-sec-title">Bảng Giá Dịch Vụ Barber & Hair Salon</h2>
            <p className="cust-sec-sub">Đầy đủ các gói cắt tạo kiểu, uốn nhuộm thời trang và spa thư giãn chuyên sâu.</p>
          </div>
          <Link to="/services" className="cust-link-more">
            <span>Xem tất cả 6 dịch vụ</span>
            <span>→</span>
          </Link>
        </div>

        <div className="cust-srv-grid">
          {featuredServices.map((s) => (
            <div key={s.id} className="cust-srv-card">
              <div>
                <div className="cust-srv-top">
                  <span className={`cust-srv-badge ${s.badgeType}`}>{s.category}</span>
                  <span className="cust-srv-duration"><LineIcon name="clock" size={14} /> {s.duration}</span>
                </div>
                <h3 className="cust-srv-title">{s.name}</h3>
                <p className="cust-srv-desc">{s.desc}</p>
              </div>

              <div className="cust-srv-bot">
                <div>
                  <span style={{ fontSize: "10px", color: "var(--color-text-muted)", display: "block", textTransform: "uppercase" }}>Giá niêm yết</span>
                  <span className="cust-srv-price">{s.price}</span>
                </div>
                <div className="cust-srv-btns">
                  <Link to={`/services/${s.id}`} className="cust-btn-xs cust-btn-detail">
                    Chi Tiết
                  </Link>
                  <Link to={`/booking/service?service=${encodeURIComponent(s.name)}`} className="cust-btn-xs cust-btn-book">
                    Đặt Ngay
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MASTER BARBERS */}
      <section style={{ marginBottom: "56px" }}>
        <div className="cust-sec-header">
          <div>
            <span className="cust-tag">Đội Ngũ Tay Nghề Cao</span>
            <h2 className="cust-sec-title">Nghệ Nhân Tạo Mẫu Master Barbers</h2>
            <p className="cust-sec-sub">Được đào tạo bài bản chuẩn quốc tế với hơn 5 năm kinh nghiệm thực chiến.</p>
          </div>
          <Link to="/barbers" className="cust-link-more">
            <span>Gặp gỡ toàn bộ Barber</span>
            <span>→</span>
          </Link>
        </div>

        <div className="cust-barber-grid">
          {masterBarbers.map((b) => (
            <div key={b.id} className="cust-barber-card">
              <div>
                <div className="cust-barber-avatar-box">
                  <img src={b.avatar} alt={b.name} className="cust-barber-avatar" />
                  <span className={`cust-barber-status ${b.isReady ? "ready" : "busy"}`}>
                    {b.status}
                  </span>
                </div>
                <h3 className="cust-barber-name">{b.name}</h3>
                <p className="cust-barber-role">{b.role}</p>
                <div className="cust-barber-meta">
                  <span>★ <strong>{b.rating}</strong></span>
                  <span>•</span>
                  <span>{b.completedCuts} lượt cắt</span>
                </div>
              </div>

              <Link
                to={`/booking/barber?barber=${encodeURIComponent(b.name)}`}
                className="cust-btn-xs cust-btn-detail"
                style={{ display: "block", textAlign: "center", marginTop: "12px" }}
              >
                ✂️ Đặt Ghế Với {b.name.split(" ")[0]}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOOKING STEPS */}
      <section className="cust-steps-box">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 32px" }}>
          <span className="cust-tag">Quy Trình Đơn Giản</span>
          <h2 className="cust-sec-title">4 Bước Đặt Lịch Chuẩn Quý Ông</h2>
          <p className="cust-sec-sub">Tiện lợi, nhanh gọn và đảm bảo luôn có ghế phục vụ đúng giờ đã chọn.</p>
        </div>

        <div className="cust-steps-grid">
          {bookingSteps.map((st) => (
            <div key={st.step} className="cust-step-item">
              <div className="cust-step-num">{st.step}</div>
              <div className="cust-step-icon"><LineIcon name={st.icon} /></div>
              <h3 className="cust-step-title">{st.title}</h3>
              <p className="cust-step-desc">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CUSTOMER REVIEWS */}
      <section>
        <div className="cust-sec-header">
          <div>
            <span className="cust-tag">Cảm Nhận Khách Hàng</span>
            <h2 className="cust-sec-title">Trải Nghiệm Thực Tế Tại BarberHub</h2>
            <p className="cust-sec-sub">Hơn 10.000 quý ông đã hài lòng với sự tận tâm và tay nghề của chúng tôi.</p>
          </div>
          <Link to="/reviews" className="cust-link-more">
            <span>Xem thêm đánh giá</span>
            <span>→</span>
          </Link>
        </div>

        <div className="cust-reviews-grid">
          {customerReviews.map((r, i) => (
            <div key={i} className="cust-review-card">
              <div className="cust-review-top">
                <span className="cust-review-author">{r.name}</span>
                <span className="cust-review-tier">{r.tier}</span>
              </div>
              <div className="cust-review-stars">
                {"★".repeat(r.stars)}
              </div>
              <p className="cust-review-text">"{r.comment}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
