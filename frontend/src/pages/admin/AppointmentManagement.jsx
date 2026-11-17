// Phụ trách: Trần Văn Thắng
// Task 10 (Sprint 2): Xây dựng giao diện quản lý lịch hẹn – Bảng lịch, lọc theo ngày và trạng thái (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function AppointmentManagement() {
  return (
    <div className="adm-shell">
      

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý lịch hẹn</h1>
            <p className="adm-page-subtitle">Bảng lịch, lọc theo ngày và trạng thái</p>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-toolbar">
            <div className="adm-filters">
              <input type="date" className="adm-input" defaultValue="2026-11-14" />
              <select className="adm-select">
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận (pending)</option>
                <option value="confirmed">Đã xác nhận (confirmed)</option>
                <option value="completed">Hoàn thành (completed)</option>
                <option value="rejected">Từ chối (rejected)</option>
                <option value="cancelled">Đã hủy (cancelled)</option>
              </select>
              <select className="adm-select">
                <option value="">Tất cả Barber</option>
                <option>Nguyễn Hoàng Nam</option>
                <option>Lê Minh Tuấn</option>
                <option>Phạm Quốc Bảo</option>
              </select>
              <input type="text" className="adm-input adm-search-input" placeholder="🔍 Tìm mã lịch, tên khách, SĐT..." />
              <button type="button" className="adm-btn adm-btn-gold">Lọc lịch hẹn</button>
            </div>
          </div>

          <div className="adm-tabs">
            <span className="adm-tab active">Tất cả (5)</span>
            <span className="adm-tab">Chờ xác nhận (1)</span>
            <span className="adm-tab">Đã xác nhận (1)</span>
            <span className="adm-tab">Hoàn thành (1)</span>
            <span className="adm-tab">Từ chối (1)</span>
            <span className="adm-tab">Đã hủy (1)</span>
          </div>

          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Bảng danh sách lịch hẹn</h3>
                <p className="adm-card-subtitle">Hiển thị lịch hẹn theo ngày và trạng thái xử lý</p>
              </div>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Mã lịch</th>
                    <th>Khách hàng</th>
                    <th>Barber phụ trách</th>
                    <th>Dịch vụ</th>
                    <th>Ngày & Giờ hẹn</th>
                    <th>Giá tiền</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>BK-2026-101</strong></td>
                    <td>
                      <div className="adm-cell-title">Hoàng Gia Huy</div>
                      <div className="adm-cell-sub">0987654321</div>
                    </td>
                    <td>Nguyễn Hoàng Nam</td>
                    <td>Combo Đế Vương 7 Bước</td>
                    <td>14/11/2026 • 09:30</td>
                    <td><strong>220.000 đ</strong></td>
                    <td><span className="adm-badge adm-badge-green">completed</span></td>
                    <td><button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Chi tiết</button></td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-102</strong></td>
                    <td>
                      <div className="adm-cell-title">Đặng Quang Vinh</div>
                      <div className="adm-cell-sub">0978123456</div>
                    </td>
                    <td>Lê Minh Tuấn</td>
                    <td>Uốn Định Hình Hàn Quốc</td>
                    <td>14/11/2026 • 10:30</td>
                    <td><strong>380.000 đ</strong></td>
                    <td><span className="adm-badge adm-badge-blue">confirmed</span></td>
                    <td><button type="button" className="adm-btn adm-btn-gold adm-btn-sm">Hoàn thành</button></td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-103</strong></td>
                    <td>
                      <div className="adm-cell-title">Vũ Đình Khoa</div>
                      <div className="adm-cell-sub">0965432109</div>
                    </td>
                    <td>Phạm Quốc Bảo</td>
                    <td>Cắt Tóc Thương Gia</td>
                    <td>14/11/2026 • 14:00</td>
                    <td><strong>120.000 đ</strong></td>
                    <td><span className="adm-badge adm-badge-yellow">pending</span></td>
                    <td>
                      <button type="button" className="adm-btn adm-btn-success adm-btn-sm">Duyệt</button>{" "}
                      <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Từ chối</button>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-104</strong></td>
                    <td>
                      <div className="adm-cell-title">Ngô Gia Bảo</div>
                      <div className="adm-cell-sub">0977889900</div>
                    </td>
                    <td>Trịnh Đức Anh</td>
                    <td>Cắt Tóc Thương Gia</td>
                    <td>13/11/2026 • 18:00</td>
                    <td><strong>120.000 đ</strong></td>
                    <td><span className="adm-badge adm-badge-red">rejected</span></td>
                    <td><button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Chi tiết</button></td>
                  </tr>
                  <tr>
                    <td><strong>BK-2026-105</strong></td>
                    <td>
                      <div className="adm-cell-title">Bùi Xuân Trường</div>
                      <div className="adm-cell-sub">0945112233</div>
                    </td>
                    <td>Phạm Quốc Bảo</td>
                    <td>Cạo Râu Khăn Nóng</td>
                    <td>13/11/2026 • 16:30</td>
                    <td><strong>80.000 đ</strong></td>
                    <td><span className="adm-badge adm-badge-gray">cancelled</span></td>
                    <td><button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Chi tiết</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
