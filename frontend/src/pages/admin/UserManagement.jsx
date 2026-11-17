// Phụ trách: Trần Văn Thắng
// Task 7 (Sprint 2): Xây dựng giao diện quản lý người dùng – Bảng, tìm kiếm, lọc và form thao tác mẫu (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function UserManagement() {
  return (
    <div className="adm-shell">
      

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý người dùng</h1>
            <p className="adm-page-subtitle">Bảng, tìm kiếm, lọc và form thao tác mẫu</p>
          </div>
          <div className="adm-topbar-actions">
            <a href="#user-form" className="adm-btn adm-btn-gold">+ Thêm người dùng</a>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-toolbar">
            <div className="adm-filters">
              <input type="text" className="adm-input adm-search-input" placeholder="🔍 Tìm kiếm theo họ tên, email, SĐT..." />
              <select className="adm-select">
                <option value="">Tất cả vai trò</option>
                <option value="admin">Quản trị viên (Admin)</option>
                <option value="barber">Thợ cắt tóc (Barber)</option>
                <option value="customer">Khách hàng (Customer)</option>
              </select>
              <select className="adm-select">
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="locked">Đang tạm khóa</option>
              </select>
              <button type="button" className="adm-btn adm-btn-primary">Lọc dữ liệu</button>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách người dùng</h3>
                  <p className="adm-card-subtitle">Hiển thị dữ liệu mẫu tài khoản hệ thống</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Họ tên & Email</th>
                      <th>SĐT</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>USR-001</strong></td>
                      <td>
                        <div className="adm-cell-title">Trần Văn Thắng</div>
                        <div className="adm-cell-sub">thang.admin@barberhub.vn</div>
                      </td>
                      <td>0901234567</td>
                      <td><span className="adm-badge adm-badge-purple">Admin</span></td>
                      <td><span className="adm-badge adm-badge-green">Hoạt động</span></td>
                      <td><button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button></td>
                    </tr>
                    <tr>
                      <td><strong>USR-002</strong></td>
                      <td>
                        <div className="adm-cell-title">Nguyễn Hoàng Nam</div>
                        <div className="adm-cell-sub">nam.barber@barberhub.vn</div>
                      </td>
                      <td>0912345678</td>
                      <td><span className="adm-badge adm-badge-blue">Barber</span></td>
                      <td><span className="adm-badge adm-badge-green">Hoạt động</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Khóa</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>USR-003</strong></td>
                      <td>
                        <div className="adm-cell-title">Hoàng Gia Huy</div>
                        <div className="adm-cell-sub">giahuy@gmail.com</div>
                      </td>
                      <td>0987654321</td>
                      <td><span className="adm-badge adm-badge-green">Customer</span></td>
                      <td><span className="adm-badge adm-badge-green">Hoạt động</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Khóa</button>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>USR-004</strong></td>
                      <td>
                        <div className="adm-cell-title">Bùi Xuân Trường</div>
                        <div className="adm-cell-sub">xuantruong@gmail.com</div>
                      </td>
                      <td>0945112233</td>
                      <td><span className="adm-badge adm-badge-green">Customer</span></td>
                      <td><span className="adm-badge adm-badge-red">Đã khóa</span></td>
                      <td>
                        <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Sửa</button>{" "}
                        <button type="button" className="adm-btn adm-btn-success adm-btn-sm">Mở khóa</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card" id="user-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Form thao tác người dùng (Mẫu)</h3>
                  <p className="adm-card-subtitle">Thêm mới hoặc cập nhật thông tin & quyền người dùng</p>
                </div>
              </div>
              <form style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label>Họ và tên *</label>
                  <input type="text" className="adm-input" defaultValue="Hoàng Gia Huy" />
                </div>
                <div className="adm-form-group">
                  <label>Email *</label>
                  <input type="email" className="adm-input" defaultValue="giahuy@gmail.com" />
                </div>
                <div className="adm-form-group">
                  <label>Số điện thoại *</label>
                  <input type="text" className="adm-input" defaultValue="0987654321" />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label>Vai trò</label>
                    <select className="adm-select" defaultValue="customer">
                      <option value="customer">Khách hàng (Customer)</option>
                      <option value="barber">Thợ cắt (Barber)</option>
                      <option value="admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                  <div className="adm-form-group">
                    <label>Trạng thái</label>
                    <select className="adm-select" defaultValue="active">
                      <option value="active">Hoạt động</option>
                      <option value="locked">Tạm khóa</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button type="button" className="adm-btn adm-btn-gold">Lưu người dùng</button>
                  <button type="reset" className="adm-btn adm-btn-outline">Làm mới form</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
