// Phụ trách: Trần Văn Thắng
// Task 8 (Sprint 2): Xây dựng giao diện quản lý Barber – Danh sách, thêm/sửa và trạng thái Barber (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function BarberManagement() {
  return (
    <div className="adm-shell">
      

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý Barber</h1>
            <p className="adm-page-subtitle">Danh sách, thêm/sửa và trạng thái Barber</p>
          </div>
          <div className="adm-topbar-actions">
            <a href="#barber-form" className="adm-btn adm-btn-gold">+ Thêm Barber mới</a>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-toolbar">
            <div className="adm-filters">
              <input type="text" className="adm-input adm-search-input" placeholder="🔍 Tìm theo tên Barber, chuyên môn, SĐT..." />
              <select className="adm-select">
                <option value="">Tất cả trạng thái Barber</option>
                <option value="available">Sẵn sàng đón khách</option>
                <option value="busy">Đang phục vụ khách</option>
                <option value="off">Nghỉ ca / Nghỉ phép</option>
              </select>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách Barber</h3>
                  <p className="adm-card-subtitle">Thông tin chuyên môn, ca làm việc và trạng thái hiện tại</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên Barber & Chuyên môn</th>
                      <th>Kinh nghiệm</th>
                      <th>Ca làm việc</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>BB-01</strong></td>
                      <td>
                        <div className="adm-cell-title">Nguyễn Hoàng Nam</div>
                        <div className="adm-cell-sub">Skin Fade & Pompadour cổ điển</div>
                      </td>
                      <td>7 năm (⭐ 4.9)</td>
                      <td>08:30 - 17:30</td>
                      <td><span className="adm-badge adm-badge-green">Sẵn sàng</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-primary adm-btn-sm">Đổi TT</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>BB-02</strong></td>
                      <td>
                        <div className="adm-cell-title">Lê Minh Tuấn</div>
                        <div className="adm-cell-sub">Uốn Layer & Nhuộm Hàn Quốc</div>
                      </td>
                      <td>5 năm (⭐ 4.8)</td>
                      <td>09:00 - 19:00</td>
                      <td><span className="adm-badge adm-badge-blue">Đang bận</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-primary adm-btn-sm">Đổi TT</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>BB-03</strong></td>
                      <td>
                        <div className="adm-cell-title">Phạm Quốc Bảo</div>
                        <div className="adm-cell-sub">Taper Fade & Cạo khăn nóng</div>
                      </td>
                      <td>4 năm (⭐ 4.7)</td>
                      <td>12:00 - 21:00</td>
                      <td><span className="adm-badge adm-badge-yellow">Nghỉ phép</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-primary adm-btn-sm">Đổi TT</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card" id="barber-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Form Thêm / Sửa Barber</h3>
                  <p className="adm-card-subtitle">Cập nhật hồ sơ và trạng thái hoạt động của Barber</p>
                </div>
              </div>
              <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label>Họ và tên Barber *</label>
                  <input type="text" className="adm-input" defaultValue="Nguyễn Hoàng Nam" />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Số điện thoại *</label>
                    <input type="text" className="adm-input" defaultValue="0912345678" />
                  </div>
                  <div className="adm-form-group">
                    <label>Số năm kinh nghiệm</label>
                    <input type="number" className="adm-input" defaultValue="7" />
                  </div>
                </div>
                <div className="adm-form-group">
                  <label>Chuyên môn chính *</label>
                  <input type="text" className="adm-input" defaultValue="Skin Fade & Pompadour cổ điển" />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Ca làm việc</label>
                    <input type="text" className="adm-input" defaultValue="08:30 - 17:30" />
                  </div>
                  <div className="adm-form-group">
                    <label>Trạng thái Barber</label>
                    <select className="adm-select" defaultValue="available">
                      <option value="available">Sẵn sàng đón khách</option>
                      <option value="busy">Đang phục vụ khách</option>
                      <option value="off">Nghỉ ca / Nghỉ phép</option>
                      <option value="inactive">Ngừng hoạt động</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button type="button" className="adm-btn adm-btn-gold">Lưu thông tin Barber</button>
                  <button type="reset" className="adm-btn adm-btn-outline">Hủy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
