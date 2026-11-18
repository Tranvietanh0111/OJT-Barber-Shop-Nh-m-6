// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /services (Danh sách bảng giá dịch vụ Barber & Salon - Tích hợp đầy đủ Giao diện, Tìm kiếm, Lọc & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ServiceListPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "Tất Cả" },
    { id: "Cắt Tạo Kiểu", label: "Cắt Tạo Kiểu" },
    { id: "Combo VIP", label: "Combo VIP" },
    { id: "Uốn Tóc Nam", label: "Uốn Tóc Nam" },
    { id: "Nhuộm Thời Trang", label: "Nhuộm Màu" },
    { id: "Cạo Râu Classic", label: "Cạo Râu" },
    { id: "Chăm Sóc Da Đầu", label: "Chăm Sóc Da" },
  ];

  const services = [
    {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeType: "gold",
      price: "150.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeType: "red",
      price: "250.000 đ",
      duration: "45 Phút",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeType: "blue",
      price: "450.000 đ",
      duration: "90 Phút",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Thời Trang",
      badgeType: "purple",
      price: "600.000 đ",
      duration: "120 Phút",
      image: "https://images.unsplash.com/photo-1517832606589-7629c3395909?w=600&auto=format&fit=crop&q=80",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeType: "emerald",
      price: "100.000 đ",
      duration: "20 Phút",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeType: "gold",
      price: "200.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1519500570469-6502c314d43f?w=600&auto=format&fit=crop&q=80",
      desc: "Tẩy sạch bã nhờn chân tóc, thanh lọc da đầu bằng muối khoáng sinh học, thông thoáng mát lạnh."
    }
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="cust-srv-list-wrap">
      {/* Self-contained CSS styles for Service List Page */}
      <style>{`
        .cust-srv-list-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: #f8fafc;
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
          color: #f59e0b;
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
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.45);
        }

        /* Filter & Search Bar */
        .cust-filter-search-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 36px;
        }
        @media (min-width: 768px) {
          .cust-filter-search-box {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .cust-search-input-wrap {
          position: relative;
          min-width: 280px;
        }
        .cust-search-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e5d6b4;
          border-radius: 12px;
          padding: 10px 14px 10px 38px;
          color: #1f2937;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .cust-search-input:focus {
          border-color: #f59e0b;
        }
        .cust-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 14px;
        }
        .cust-filter-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .cust-pill-btn {
          padding: 8px 16px;
          background: #ffffff;
          border: 1px solid #e5d6b4;
          border-radius: 9999px;
          color: #4b5563;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cust-pill-btn:hover {
          color: #b45309;
          background: #fff7e6;
          border-color: #f59e0b;
        }
        .cust-pill-btn.active {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #ffffff;
          font-weight: 800;
        }

        /* Grid */
        .cust-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
          margin-bottom: 64px;
        }
        .cust-card {
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px -4px rgba(120, 80, 10, 0.08);
        }
        .cust-card:hover {
          border-color: rgba(245, 158, 11, 0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px -6px rgba(120, 80, 10, 0.16);
          background: #fffdf8;
        }
        .cust-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .cust-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .cust-card:hover .cust-card-img {
          transform: scale(1.05);
        }
        .cust-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cust-card-badge.gold {
          background: rgba(245, 158, 11, 0.9);
          color: #ffffff;
        }
        .cust-card-badge.red {
          background: rgba(239, 68, 68, 0.9);
          color: #ffffff;
        }
        .cust-card-badge.blue {
          background: rgba(59, 130, 246, 0.9);
          color: #ffffff;
        }
        .cust-card-badge.purple {
          background: rgba(168, 85, 247, 0.9);
          color: #ffffff;
        }
        .cust-card-badge.emerald {
          background: rgba(16, 185, 129, 0.9);
          color: #ffffff;
        }
        .cust-card-duration {
          position: absolute;
          bottom: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          font-size: 11px;
          font-weight: 700;
          color: #4b5563;
          border: 1px solid #f1e7d0;
        }
        .cust-card-body {
          padding: 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .cust-card-title {
          font-size: 18px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 8px;
        }
        .cust-card-desc {
          font-size: 13px;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 18px;
        }
        .cust-card-bot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid #f1e7d0;
        }
        .cust-card-price {
          font-size: 20px;
          font-weight: 900;
          color: #b45309;
        }
        .cust-card-actions {
          display: flex;
          gap: 8px;
        }
        .cust-btn-xs {
          padding: 8px 14px;
          font-size: 12px;
          font-weight: 700;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cust-btn-detail {
          background: #fff7e6;
          color: #b45309;
          border: 1px solid #fde68a;
        }
        .cust-btn-detail:hover {
          background: #fef3c7;
          color: #92400e;
        }
        .cust-btn-book {
          background: #f59e0b;
          color: #ffffff;
          font-weight: 800;
          border: none;
        }
        .cust-btn-book:hover {
          background: #d97706;
        }

        /* Standards Grid */
        .cust-standards-box {
          background: #fffdfa;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
          padding: 36px 28px;
          box-shadow: 0 4px 20px -6px rgba(120, 80, 10, 0.08);
        }
        .cust-standards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
        }
        .cust-std-item {
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 8px -2px rgba(120, 80, 10, 0.06);
        }
        .cust-std-icon {
          font-size: 26px;
          margin-bottom: 10px;
        }
        .cust-std-title {
          font-size: 15px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 6px;
        }
        .cust-std-desc {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* Empty State */
        .cust-empty-state {
          padding: 64px 20px;
          text-align: center;
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
          margin-bottom: 48px;
        }
        .cust-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }
        .cust-empty-title {
          font-size: 18px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 6px;
        }
        .cust-empty-desc {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 18px;
        }
      `}</style>

      {/* HEADER */}
      <div className="cust-header">
        <div>
          <span className="cust-header-tag">Bảng Giá Niêm Yết</span>
          <h1 className="cust-header-title">Menu Dịch Vụ Cắt Tóc & Spa Nam Cao Cấp</h1>
          <p className="cust-header-sub">Cam kết không chèo kéo, không phát sinh chi phí. Miễn phí trà sen và tư vấn dáng tóc.</p>
        </div>
        <Link to="/booking/service" className="cust-btn-primary">
          <span>✂️</span>
          <span>Đặt Lịch Giữ Chỗ</span>
        </Link>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="cust-filter-search-box">
        <div className="cust-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cust-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="cust-search-input-wrap">
          <span className="cust-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="cust-search-input"
          />
        </div>
      </div>

      {/* SERVICES GRID OR EMPTY STATE */}
      {filteredServices.length === 0 ? (
        <div className="cust-empty-state">
          <div className="cust-empty-icon">✂️</div>
          <h3 className="cust-empty-title">Không tìm thấy dịch vụ phù hợp!</h3>
          <p className="cust-empty-desc">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để hiển thị toàn bộ dịch vụ.</p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setSearchTerm("");
            }}
            className="cust-btn-primary"
          >
            Xem Tất Cả Dịch Vụ
          </button>
        </div>
      ) : (
        <div className="cust-cards-grid">
          {filteredServices.map((s) => (
            <div key={s.id} className="cust-card">
              <div className="cust-card-img-wrap">
                <img src={s.image} alt={s.name} className="cust-card-img" />
                <span className={`cust-card-badge ${s.badgeType}`}>{s.category}</span>
                <span className="cust-card-duration">⏱️ {s.duration}</span>
              </div>

              <div className="cust-card-body">
                <div>
                  <h3 className="cust-card-title">{s.name}</h3>
                  <p className="cust-card-desc">{s.desc}</p>
                </div>

                <div className="cust-card-bot">
                  <div>
                    <span style={{ fontSize: "10px", color: "#64748b", display: "block", textTransform: "uppercase" }}>Giá trọn gói</span>
                    <span className="cust-card-price">{s.price}</span>
                  </div>
                  <div className="cust-card-actions">
                    <Link to={`/services/${s.id}`} className="cust-btn-xs cust-btn-detail">
                      Xem Chi Tiết
                    </Link>
                    <Link to={`/booking/service?service=${encodeURIComponent(s.name)}`} className="cust-btn-xs cust-btn-book">
                      Đặt Ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* COMMITMENTS / STANDARDS SECTION */}
      <div className="cust-standards-box">
        <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 28px" }}>
          <span className="cust-header-tag">Cam Kết Chất Lượng</span>
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#1f2937" }}>Đặc Quyền Dành Cho Khách Hàng BarberHub</h2>
        </div>

        <div className="cust-standards-grid">
          <div className="cust-std-item">
            <div className="cust-std-icon">🛡️</div>
            <h4 className="cust-std-title">Bảo Hành 7 Ngày</h4>
            <p className="cust-std-desc">Chỉnh sửa phom tóc hoàn toàn miễn phí nếu bạn cảm thấy chưa ưng ý bất kỳ chi tiết nào.</p>
          </div>
          <div className="cust-std-item">
            <div className="cust-std-icon">✨</div>
            <h4 className="cust-std-title">Tiệt Trùng UV 100%</h4>
            <p className="cust-std-desc">Kéo, tông đơ, lược và khăn lau đều được khử trùng bằng tủ cực tím trước khi phục vụ.</p>
          </div>
          <div className="cust-std-item">
            <div className="cust-std-icon">🧴</div>
            <h4 className="cust-std-title">Mỹ Phẩm Cao Cấp</h4>
            <p className="cust-std-desc">Sử dụng 100% sản phẩm hữu cơ nhập khẩu chính hãng từ Mỹ, Ý, Nhật an toàn cho da đầu.</p>
          </div>
          <div className="cust-std-item">
            <div className="cust-std-icon">☕</div>
            <h4 className="cust-std-title">Thức Uống Miễn Phí</h4>
            <p className="cust-std-desc">Trà sen thảo mộc, cà phê rang xay nguyên chất và khăn lạnh phục vụ xuyên suốt trải nghiệm.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
