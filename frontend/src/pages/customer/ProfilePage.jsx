// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /profile (Hồ sơ khách hàng, đặc quyền VIP & quản lý tài khoản - Tích hợp đầy đủ Giao diện, Chuyển tài khoản & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const demoAccounts = [
    {
      id: "cli-1",
      name: "Anh Hoàng Nam",
      phone: "0904.123.888",
      email: "hoangnam.barber@gmail.com",
      tier: "VIP",
      tierColor: "gold",
      cutCount: 12,
      totalSpent: "2.850.000 đ",
      favBarber: "Tuấn Master",
      reviewsSent: 10,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80",
      birthday: "1992-08-15",
      address: "24 Hàng Bạc, Hoàn Kiếm, Hà Nội"
    },
    {
      id: "cli-2",
      name: "Lê Minh Đức",
      phone: "0978.555.210",
      email: "duc.leminh@gmail.com",
      tier: "Thân Thiết",
      tierColor: "blue",
      cutCount: 6,
      totalSpent: "1.600.000 đ",
      favBarber: "Minh Barber",
      reviewsSent: 5,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=240&auto=format&fit=crop&q=80",
      birthday: "1996-03-22",
      address: "18 Tràng Tiền, Hoàn Kiếm, Hà Nội"
    },
    {
      id: "cli-3",
      name: "Trần Quốc Bảo",
      phone: "0912.999.341",
      email: "bao.tq@gmail.com",
      tier: "Thân Thiết",
      tierColor: "blue",
      cutCount: 5,
      totalSpent: "1.750.000 đ",
      favBarber: "Hoàng Stylist",
      reviewsSent: 4,
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&auto=format&fit=crop&q=80",
      birthday: "1994-11-09",
      address: "88 Cầu Giấy, Hà Nội"
    },
    {
      id: "cli-4",
      name: "Phạm Văn Cường",
      phone: "0983.111.444",
      email: "cuong.pv@gmail.com",
      tier: "Mới",
      tierColor: "neutral",
      cutCount: 2,
      totalSpent: "400.000 đ",
      favBarber: "Dũng Barber",
      reviewsSent: 1,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
      birthday: "1999-05-18",
      address: "102 Kim Mã, Ba Đình, Hà Nội"
    }
  ];

  const [currentClient, setCurrentClient] = useState(demoAccounts[0]);
  const [formData, setFormData] = useState({
    name: demoAccounts[0].name,
    phone: demoAccounts[0].phone,
    email: demoAccounts[0].email,
    birthday: demoAccounts[0].birthday,
    address: demoAccounts[0].address
  });

  const [passData, setPassData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: ""
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccountSwitch = (e) => {
    const selected = demoAccounts.find((c) => c.id === e.target.value);
    if (selected) {
      setCurrentClient(selected);
      setFormData({
        name: selected.name,
        phone: selected.phone,
        email: selected.email,
        birthday: selected.birthday,
        address: selected.address
      });
      showToast(`Đã chuyển sang tài khoản: ${selected.name} (${selected.tier})`);
    }
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setCurrentClient({
      ...currentClient,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      birthday: formData.birthday,
      address: formData.address
    });
    showToast("Cập nhật thông tin tài khoản thành công!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passData.oldPass || !passData.newPass) {
      alert("Vui lòng nhập đầy đủ mật khẩu cũ và mới!");
      return;
    }
    if (passData.newPass !== passData.confirmPass) {
      alert("Xác nhận mật khẩu mới không trùng khớp!");
      return;
    }
    setPassData({ oldPass: "", newPass: "", confirmPass: "" });
    showToast("Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới.");
  };

  return (
    <div className="cust-profile-wrap">
      {/* Self-contained CSS styles for Profile Page */}
      <style>{`
        .cust-profile-wrap {
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
        .cust-account-selector {
          background: #141720;
          border: 1px solid #2e3548;
          border-radius: 12px;
          padding: 8px 14px;
          color: #fbbf24;
          font-size: 13px;
          font-weight: 700;
          outline: none;
          cursor: pointer;
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

        /* Hero Profile Card */
        .cust-profile-hero {
          background: linear-gradient(135deg, #141720 0%, #1a1e2b 100%);
          border: 1px solid #232736;
          border-radius: 28px;
          padding: 36px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          margin-bottom: 48px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }
        @media (min-width: 992px) {
          .cust-profile-hero {
            grid-template-columns: 1fr 1fr;
            align-items: center;
          }
        }
        .cust-user-meta-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .cust-user-avatar {
          width: 96px;
          height: 96px;
          border-radius: 24px;
          object-fit: cover;
          border: 3px solid #f59e0b;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
        }
        .cust-user-name {
          font-size: 24px;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 4px;
        }
        .cust-tier-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cust-tier-badge.gold {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(245, 158, 11, 0.4);
        }
        .cust-tier-badge.blue {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.4);
        }
        .cust-tier-badge.neutral {
          background: rgba(148, 163, 184, 0.15);
          color: #cbd5e1;
          border: 1px solid rgba(148, 163, 184, 0.4);
        }

        /* 4 Stats Grid */
        .cust-stats-box {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .cust-stat-card {
          background: #0a0b0f;
          border: 1px solid #1f2433;
          border-radius: 16px;
          padding: 16px;
        }
        .cust-stat-label {
          font-size: 11px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .cust-stat-value {
          font-size: 20px;
          font-weight: 900;
          color: #fbbf24;
        }

        /* Content Sections Grid */
        .cust-profile-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 992px) {
          .cust-profile-grid {
            grid-template-columns: 1.3fr 1fr;
          }
        }
        .cust-card-box {
          background: #141720;
          border: 1px solid #232736;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 36px;
        }
        .cust-card-box-header {
          border-bottom: 1px solid #232736;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .cust-card-box-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
        }

        /* Forms */
        .cust-form-group {
          margin-bottom: 18px;
        }
        .cust-label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .cust-input {
          width: 100%;
          padding: 12px 14px;
          background: #0a0b0f;
          border: 1px solid #232736;
          border-radius: 12px;
          color: #ffffff;
          font-size: 13px;
          outline: none;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }
        .cust-input:focus {
          border-color: #f59e0b;
        }
        .cust-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #08090c;
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

        /* VIP Benefits List */
        .cust-benefit-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: #0a0b0f;
          border: 1px solid #1f2433;
          border-radius: 16px;
          margin-bottom: 12px;
        }
        .cust-benefit-icon {
          font-size: 20px;
          color: #fbbf24;
          flex-shrink: 0;
        }
        .cust-benefit-title {
          font-size: 13px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 2px;
        }
        .cust-benefit-desc {
          font-size: 11px;
          color: #94a3b8;
          line-height: 1.5;
        }
      `}</style>

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cust-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER WITH DEMO ACCOUNT SWITCHER */}
      <div className="cust-header">
        <div>
          <span className="cust-header-tag">Tài Khoản & Đặc Quyền</span>
          <h1 className="cust-header-title">Hồ Sơ Khách Hàng BarberHub</h1>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Chọn tài khoản Demo:</span>
          <select
            value={currentClient.id}
            onChange={handleAccountSwitch}
            className="cust-account-selector"
          >
            {demoAccounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name} ({acc.tier})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* HERO PROFILE CARD */}
      <div className="cust-profile-hero">
        <div className="cust-user-meta-left">
          <img src={currentClient.avatar} alt={currentClient.name} className="cust-user-avatar" />
          <div>
            <div className={`cust-tier-badge ${currentClient.tierColor}`} style={{ marginBottom: "8px" }}>
              <span>👑 Hạng: {currentClient.tier}</span>
            </div>
            <h2 className="cust-user-name">{currentClient.name}</h2>
            <p style={{ fontSize: "13px", color: "#94a3b8" }}>{currentClient.phone} • {currentClient.email}</p>
          </div>
        </div>

        <div className="cust-stats-box">
          <div className="cust-stat-card">
            <div className="cust-stat-label">Số Lần Cắt</div>
            <div className="cust-stat-value">{currentClient.cutCount} lần</div>
          </div>
          <div className="cust-stat-card">
            <div className="cust-stat-label">Tổng Chi Tiêu</div>
            <div className="cust-stat-value">{currentClient.totalSpent}</div>
          </div>
          <div className="cust-stat-card">
            <div className="cust-stat-label">Barber Ruột</div>
            <div className="cust-stat-value" style={{ fontSize: "16px" }}>{currentClient.favBarber}</div>
          </div>
          <div className="cust-stat-card">
            <div className="cust-stat-label">Đánh Giá Gửi Đi</div>
            <div className="cust-stat-value">{currentClient.reviewsSent} phản hồi</div>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN SECTION */}
      <div className="cust-profile-grid">
        {/* Left Column: Form thông tin cá nhân */}
        <div>
          <div className="cust-card-box">
            <div className="cust-card-box-header">
              <h3 className="cust-card-box-title">Thông Tin Cá Nhân & Liên Hệ</h3>
            </div>

            <form onSubmit={handleSaveInfo}>
              <div className="cust-form-row">
                <div className="cust-form-group">
                  <label className="cust-label">Họ và tên</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="cust-input"
                    required
                  />
                </div>
                <div className="cust-form-group">
                  <label className="cust-label">Số điện thoại</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="cust-input"
                    required
                  />
                </div>
              </div>

              <div className="cust-form-row">
                <div className="cust-form-group">
                  <label className="cust-label">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="cust-input"
                    required
                  />
                </div>
                <div className="cust-form-group">
                  <label className="cust-label">Ngày sinh</label>
                  <input
                    type="date"
                    value={formData.birthday}
                    onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    className="cust-input"
                  />
                </div>
              </div>

              <div className="cust-form-group">
                <label className="cust-label">Địa chỉ</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="cust-input"
                />
              </div>

              <div style={{ marginTop: "24px" }}>
                <button type="submit" className="cust-btn-primary">
                  <span>💾</span>
                  <span>Lưu Thay Đổi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Form đổi mật khẩu */}
          <div className="cust-card-box">
            <div className="cust-card-box-header">
              <h3 className="cust-card-box-title">Đổi Mật Khẩu Đăng Nhập</h3>
            </div>

            <form onSubmit={handleChangePassword}>
              <div className="cust-form-group">
                <label className="cust-label">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passData.oldPass}
                  onChange={(e) => setPassData({ ...passData, oldPass: e.target.value })}
                  className="cust-input"
                />
              </div>

              <div className="cust-form-row">
                <div className="cust-form-group">
                  <label className="cust-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passData.newPass}
                    onChange={(e) => setPassData({ ...passData, newPass: e.target.value })}
                    className="cust-input"
                  />
                </div>
                <div className="cust-form-group">
                  <label className="cust-label">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passData.confirmPass}
                    onChange={(e) => setPassData({ ...passData, confirmPass: e.target.value })}
                    className="cust-input"
                  />
                </div>
              </div>

              <div style={{ marginTop: "24px" }}>
                <button type="submit" className="cust-btn-primary">
                  <span>🔒</span>
                  <span>Cập Nhật Mật Khẩu</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Đặc quyền VIP & Lịch sử phím tắt */}
        <div>
          <div className="cust-card-box">
            <div className="cust-card-box-header">
              <h3 className="cust-card-box-title">Đặc Quyền Thành Viên BarberHub</h3>
            </div>

            <div>
              <div className="cust-benefit-row">
                <div className="cust-benefit-icon">💎</div>
                <div>
                  <h4 className="cust-benefit-title">Giảm 10% Trọn Đời</h4>
                  <p className="cust-benefit-desc">Tự động áp dụng chiết khấu cho mọi hóa đơn dịch vụ cắt, uốn và spa.</p>
                </div>
              </div>

              <div className="cust-benefit-row">
                <div className="cust-benefit-icon">⏱️</div>
                <div>
                  <h4 className="cust-benefit-title">Ưu Tiên Giữ Ghế Đúng Giờ</h4>
                  <p className="cust-benefit-desc">Được phục vụ ngay khi tới salon mà không cần chờ đợi dù giờ cao điểm.</p>
                </div>
              </div>

              <div className="cust-benefit-row">
                <div className="cust-benefit-icon">☕</div>
                <div>
                  <h4 className="cust-benefit-title">Menu Đồ Uống VIP Miễn Phí</h4>
                  <p className="cust-benefit-desc">Thưởng thức trà sen Tây Hồ, cà phê Espresso rang xay và đồ ăn nhẹ.</p>
                </div>
              </div>

              <div className="cust-benefit-row">
                <div className="cust-benefit-icon">🎁</div>
                <div>
                  <h4 className="cust-benefit-title">Voucher Sinh Nhật 200.000 đ</h4>
                  <p className="cust-benefit-desc">Tặng phiếu trải nghiệm dịch vụ uốn hoặc nhuộm trong tháng sinh nhật.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #232736", display: "flex", gap: "10px" }}>
              <Link to="/my-bookings" className="cust-btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Lịch Hẹn Của Tôi
              </Link>
              <Link to="/my-invoices" className="cust-btn-primary" style={{ flex: 1, justifyContent: "center", background: "#1b1f2b", color: "#cbd5e1", border: "1px solid #2e3548" }}>
                Xem Hóa Đơn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
