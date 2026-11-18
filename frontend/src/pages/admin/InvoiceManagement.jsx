// Phụ trách: Trần Văn Thắng
// Task 11 (Sprint 3): Xây dựng giao diện quản lý hóa đơn – Danh sách, chi tiết và trạng thái thanh toán (HTML + CSS)
import { Link } from "react-router-dom";
import "./admin.css";

export default function InvoiceManagement() {
  return (
    <div className="adm-shell">
      

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý hóa đơn</h1>
            <p className="adm-page-subtitle">Danh sách, chi tiết và trạng thái thanh toán</p>
          </div>
        </header>

        <div className="adm-content">
          <div className="adm-toolbar">
            <div className="adm-filters">
              <input type="text" className="adm-input adm-search-input" placeholder="🔍 Tìm mã hóa đơn INV, tên khách hàng..." />
              <select className="adm-select">
                <option value="">Tất cả trạng thái thanh toán</option>
                <option value="paid">Đã thanh toán (Paid)</option>
                <option value="unpaid">Chờ thanh toán (Unpaid)</option>
                <option value="refunded">Đã hoàn tiền (Refunded)</option>
              </select>
              <select className="adm-select">
                <option value="">Tất cả phương thức</option>
                <option>Chuyển khoản VietQR</option>
                <option>Tiền mặt</option>
                <option>Thẻ ngân hàng</option>
              </select>
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách hóa đơn</h3>
                  <p className="adm-card-subtitle">Theo dõi các giao dịch và trạng thái thanh toán</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã HĐ</th>
                      <th>Khách hàng</th>
                      <th>Barber</th>
                      <th>Phương thức</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="adm-cell-title">INV-2026-001</div>
                        <div className="adm-cell-sub">14/11/2026 10:25</div>
                      </td>
                      <td>Hoàng Gia Huy</td>
                      <td>Nguyễn Hoàng Nam</td>
                      <td>Chuyển khoản QR</td>
                      <td><strong>250.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-green">Đã thanh toán</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="adm-cell-title">INV-2026-002</div>
                        <div className="adm-cell-sub">14/11/2026 12:10</div>
                      </td>
                      <td>Đặng Quang Vinh</td>
                      <td>Lê Minh Tuấn</td>
                      <td>Thẻ POS</td>
                      <td><strong>450.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-green">Đã thanh toán</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="adm-cell-title">INV-2026-003</div>
                        <div className="adm-cell-sub">14/11/2026 14:45</div>
                      </td>
                      <td>Vũ Đình Khoa</td>
                      <td>Phạm Quốc Bảo</td>
                      <td>Tiền mặt</td>
                      <td><strong>200.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-yellow">Chờ thanh toán</span></td>
                    </tr>
                    <tr>
                      <td>
                        <div className="adm-cell-title">INV-2026-004</div>
                        <div className="adm-cell-sub">12/11/2026 19:05</div>
                      </td>
                      <td>Lương Thế Thành</td>
                      <td>Trịnh Đức Anh</td>
                      <td>Chuyển khoản QR</td>
                      <td><strong>380.000 đ</strong></td>
                      <td><span className="adm-badge adm-badge-red">Đã hoàn tiền</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Chi tiết hóa đơn: #INV-2026-001</h3>
                  <p className="adm-card-subtitle">Mã lịch hẹn: BK-2026-101 • Ngày lập: 14/11/2026 10:25</p>
                </div>
                <span className="adm-badge adm-badge-green">Đã thanh toán</span>
              </div>

              <div className="adm-receipt-info">
                <div><strong>Khách hàng:</strong> Hoàng Gia Huy (0987654321)</div>
                <div><strong>Barber thực hiện:</strong> Nguyễn Hoàng Nam</div>
                <div><strong>Phương thức:</strong> Chuyển khoản VietQR</div>
              </div>

              <table className="adm-table" style={{ marginBottom: 14 }}>
                <thead>
                  <tr>
                    <th>Dịch vụ / Sản phẩm</th>
                    <th>SL</th>
                    <th>Đơn giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Combo Đế Vương 7 Bước</td>
                    <td>1</td>
                    <td>220.000 đ</td>
                    <td><strong>220.000 đ</strong></td>
                  </tr>
                  <tr>
                    <td>Sáp vuốt tóc Volcanic Clay</td>
                    <td>1</td>
                    <td>50.000 đ</td>
                    <td><strong>50.000 đ</strong></td>
                  </tr>
                </tbody>
              </table>

              <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: 12, display: "grid", gap: 6, fontSize: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tạm tính:</span><strong>270.000 đ</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-navy)" }}><span>Giảm giá:</span><strong>-20.000 đ</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
                  <span>Tổng thanh toán:</span><span style={{ color: "#2563eb" }}>250.000 đ</span>
                </div>
              </div>

              <div className="adm-form-group" style={{ marginTop: 16 }}>
                <label>Cập nhật trạng thái thanh toán</label>
                <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                  <button type="button" className="adm-btn adm-btn-gold adm-btn-sm">Đã thanh toán</button>
                  <button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Chờ thanh toán</button>
                  <button type="button" className="adm-btn adm-btn-danger adm-btn-sm">Hoàn tiền</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
