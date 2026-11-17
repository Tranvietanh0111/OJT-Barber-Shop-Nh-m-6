// Phụ trách: Trần Văn Thắng
// Task 9 (Sprint 2): Xây dựng giao diện quản lý dịch vụ – Danh sách, thêm/sửa/ẩn dịch vụ (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function ServiceManagement() {
  return (
    <div className="adm-shell">
      

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý dịch vụ</h1>
            <p className="adm-page-subtitle">Danh sách, thêm/sửa/ẩn dịch vụ</p>
          </div>
          <div className="adm-topbar-actions">
            <a href="#service-form" className="adm-btn adm-btn-gold">+ Thêm dịch vụ</a>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-toolbar">
            <div className="adm-filters">
              <input type="text" className="adm-input adm-search-input" placeholder="🔍 Tìm theo tên dịch vụ..." />
              <select className="adm-select">
                <option value="">Tất cả danh mục</option>
                <option>Cắt & Tạo kiểu</option>
                <option>Combo VIP</option>
                <option>Uốn & Nhuộm</option>
                <option>Chăm sóc Râu & Da</option>
              </select>
              <select className="adm-select">
                <option value="">Tất cả trạng thái</option>
                <option>Đang hiển thị</option>
                <option>Đang ẩn</option>
              </select>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách dịch vụ</h3>
                  <p className="adm-card-subtitle">Quản lý bảng giá, thời lượng và ẩn/hiện dịch vụ</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên dịch vụ</th>
                      <th>Thời lượng</th>
                      <th>Giá tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>SV-01</strong></td>
                      <td>
                        <div className="adm-cell-title">Cắt Tóc Thương Gia</div>
                        <div className="adm-cell-sub">Cắt & Tạo kiểu</div>
                      </td>
                      <td>45 phút</td>
                      <td><strong>120.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-green">Hiển thị</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Ẩn</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>SV-02</strong></td>
                      <td>
                        <div className="adm-cell-title">Combo Đế Vương 7 Bước</div>
                        <div className="adm-cell-sub">Combo VIP</div>
                      </td>
                      <td>60 phút</td>
                      <td><strong>220.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-green">Hiển thị</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Ẩn</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>SV-03</strong></td>
                      <td>
                        <div className="adm-cell-title">Uốn Định Hình Hàn Quốc</div>
                        <div className="adm-cell-sub">Uốn & Nhuộm</div>
                      </td>
                      <td>90 phút</td>
                      <td><strong>380.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-green">Hiển thị</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Ẩn</button>
                      </td>
                    </tr>
                    <tr style={{ opacity: 0.65 }}>
                      <td><strong>SV-04</strong></td>
                      <td>
                        <div className="adm-cell-title">Tẩy Tóc Bạch Kim Olaplex</div>
                        <div className="adm-cell-sub">Uốn & Nhuộm</div>
                      </td>
                      <td>120 phút</td>
                      <td><strong>550.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-gray">Đang ẩn</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-success adm-btn-sm">Hiện</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card" id="service-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Form Thêm / Sửa dịch vụ</h3>
                  <p className="adm-card-subtitle">Thiết lập thông tin và trạng thái ẩn/hiện dịch vụ</p>
                </div>
              </div>
              <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label>Tên dịch vụ *</label>
                  <input type="text" className="adm-input" defaultValue="Combo Đế Vương 7 Bước" />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Danh mục</label>
                    <select className="adm-select">
                      <option>Combo VIP</option>
                      <option>Cắt & Tạo kiểu</option>
                      <option>Uốn & Nhuộm</option>
                      <option>Chăm sóc Râu & Da</option>
                    </select>
                  </div>
                  <div className="adm-form-group">
                    <label>Thời lượng (phút)</label>
                    <input type="number" className="adm-input" defaultValue="60" />
                  </div>
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Giá dịch vụ (VNĐ) *</label>
                    <input type="number" className="adm-input" defaultValue="220000" />
                  </div>
                  <div className="adm-form-group">
                    <label>Trạng thái hiển thị</label>
                    <select className="adm-select">
                      <option value="visible">Hiển thị trên web</option>
                      <option value="hidden">Tạm ẩn dịch vụ</option>
                    </select>
                  </div>
                </div>
                <div className="adm-form-group">
                  <label>Mô tả dịch vụ</label>
                  <textarea rows={3} className="adm-textarea" defaultValue="Cắt tóc, cạo mặt khăn nóng, lột mụn cám, gội massage cổ vai gáy." />
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" className="adm-btn adm-btn-gold">Lưu dịch vụ</button>
                  <button type="reset" className="adm-btn adm-btn-outline">Làm mới</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
