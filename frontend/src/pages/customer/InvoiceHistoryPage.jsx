// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /my-invoices (Lịch sử hóa đơn điện tử & chi tiêu của khách hàng - Tích hợp đầy đủ Giao diện, Xem E-Invoice & Phong cách Royal Gold)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function InvoiceHistoryPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    {
      id: "inv-1",
      code: "INV-98214",
      date: "16/11/2026",
      time: "09:45 AM",
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      subtotal: "250.000 đ",
      discount: "-25.000 đ (10%)",
      total: "225.000 đ",
      paymentMethod: "VietQR (MB Bank)",
      badgeType: "emerald"
    },
    {
      id: "inv-2",
      code: "INV-97911",
      date: "02/11/2026",
      time: "02:40 PM",
      service: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      barber: "Dũng Barber",
      chair: "Ghế 04",
      subtotal: "200.000 đ",
      discount: "-20.000 đ (10%)",
      total: "180.000 đ",
      paymentMethod: "Thẻ Visa",
      badgeType: "blue"
    },
    {
      id: "inv-3",
      code: "INV-96850",
      date: "18/10/2026",
      time: "11:15 AM",
      service: "Combo Cắt + Gội + Massage Đăng Quang",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      subtotal: "250.000 đ",
      discount: "-25.000 đ (10%)",
      total: "225.000 đ",
      paymentMethod: "Tiền mặt",
      badgeType: "neutral"
    },
    {
      id: "inv-4",
      code: "INV-95200",
      date: "01/09/2026",
      time: "05:30 PM",
      service: "Uốn Xoăn Hàn Quốc Fly Texture + Phục Hồi",
      barber: "Minh Barber",
      chair: "Ghế 02",
      subtotal: "550.000 đ",
      discount: "-55.000 đ (10%)",
      total: "495.000 đ",
      paymentMethod: "VietQR (VCB)",
      badgeType: "emerald"
    }
  ];

  return (
    <div className="cust-invoice-wrap">
      {/* Self-contained CSS styles for Invoice History Page */}
      <style>{`
        .cust-invoice-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: var(--text-primary);
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

        /* 3 Metrics Cards */
        .cust-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }
        .cust-metric-card {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.08);
        }
        .cust-metric-lbl {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .cust-metric-val {
          font-size: 28px;
          font-weight: 900;
          color: #1d4ed8;
          margin-bottom: 4px;
        }
        .cust-metric-val.green {
          color: #059669;
        }
        .cust-metric-val.white {
          color: #1f2937;
        }
        .cust-metric-sub {
          font-size: 12px;
          color: #6b7280;
        }

        /* Table Box */
        .cust-table-card {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.08);
        }
        .cust-table-responsive {
          width: 100%;
          overflow-x: auto;
        }
        .cust-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }
        .cust-table th {
          background: #fffdf7;
          padding: 16px 20px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          color: #6b7280;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #e7e5e4;
          white-space: nowrap;
        }
        .cust-table td {
          padding: 16px 20px;
          border-bottom: 1px solid #e7e5e4;
          color: #4b5563;
          vertical-align: middle;
        }
        .cust-table tr:hover td {
          background: #eff6ff;
        }
        .cust-table-code {
          font-weight: 900;
          color: #1d4ed8;
        }
        .cust-table-service {
          font-weight: 700;
          color: #1f2937;
        }
        .cust-table-discount {
          color: #059669;
          font-weight: 700;
        }
        .cust-table-total {
          font-size: 15px;
          font-weight: 900;
          color: #1d4ed8;
        }
        .cust-pay-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 800;
        }
        .cust-pay-badge.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .cust-pay-badge.blue {
          background: rgba(59, 130, 246, 0.12);
          color: #2563eb;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .cust-pay-badge.neutral {
          background: #f3f4f6;
          color: #4b5563;
          border: 1px solid #e5e7eb;
        }
        .cust-btn-view-invoice {
          padding: 7px 14px;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .cust-btn-view-invoice:hover {
          background: #dc2626;
          color: var(--text-primary);
          border-color: #dc2626;
        }

        /* E-Receipt Modal */
        .cust-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(15, 23, 42, 0.25);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .cust-receipt-modal {
          background: #ffffff;
          border: 1px solid #e7e5e4;
          border-radius: 24px;
          width: 100%;
          max-width: 440px;
          padding: 28px;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
          animation: popIn 0.25s ease;
        }
        @keyframes popIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .cust-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e7e5e4;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }
        .cust-modal-title {
          font-size: 16px;
          font-weight: 800;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cust-btn-close {
          background: transparent;
          border: none;
          color: #6b7280;
          font-size: 18px;
          cursor: pointer;
          padding: 4px;
        }
        .cust-btn-close:hover {
          color: #1f2937;
        }
        .cust-receipt-body {
          background: #fffdf7;
          border: 1px solid #e7e5e4;
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .cust-receipt-brand {
          text-align: center;
          border-bottom: 1px solid #e7e5e4;
          padding-bottom: 12px;
          margin-bottom: 16px;
        }
        .cust-receipt-brand h4 {
          font-size: 15px;
          font-weight: 900;
          color: #1f2937;
          letter-spacing: 0.05em;
        }
        .cust-receipt-brand p {
          font-size: 11px;
          color: #6b7280;
          margin-top: 2px;
        }
        .cust-receipt-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .cust-receipt-lbl {
          color: #6b7280;
        }
        .cust-receipt-val {
          color: #1f2937;
          font-weight: 600;
        }
        .cust-receipt-total-row {
          border-top: 1px solid #e7e5e4;
          padding-top: 12px;
          margin-top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .cust-receipt-total-val {
          font-size: 20px;
          font-weight: 900;
          color: #1d4ed8;
        }
        .cust-receipt-stamp {
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 10px;
          color: #059669;
          font-size: 12px;
          font-weight: 800;
          text-align: center;
          padding: 8px;
          margin-top: 14px;
        }
        .cust-modal-actions {
          display: flex;
          gap: 12px;
        }
        }
        .cust-modal-actions button {
          flex: 1;
        }
      `}</style>

      {/* HEADER */}
      <div className="cust-header">
        <div>
          <span className="cust-header-tag">Hóa Đơn Điện Tử</span>
          <h1 className="cust-header-title">Lịch Sử Chi Tiêu & Hóa Đơn</h1>
          <p className="cust-header-sub">Tra cứu chi tiết mọi hóa đơn dịch vụ cắt tóc và quyền lợi giảm giá VIP tại BarberHub.</p>
        </div>
        <Link to="/booking/service" className="cust-btn-primary">
          <span>📅</span>
          <span>Đặt Lịch Cắt Mới</span>
        </Link>
      </div>

      {/* 3 SUMMARY METRICS */}
      <div className="cust-metrics-grid">
        <div className="cust-metric-card">
          <div className="cust-metric-lbl">Tổng Chi Tiêu Năm 2026</div>
          <div className="cust-metric-val">2.850.000 đ</div>
          <p className="cust-metric-sub">12 lượt sử dụng dịch vụ tại salon</p>
        </div>

        <div className="cust-metric-card">
          <div className="cust-metric-lbl">Tiết Kiệm Nhờ VIP</div>
          <div className="cust-metric-val green">315.000 đ</div>
          <p className="cust-metric-sub">Giảm 10% trọn đời mỗi lần sử dụng</p>
        </div>

        <div className="cust-metric-card">
          <div className="cust-metric-lbl">Hạng Khách Hàng</div>
          <div className="cust-metric-val white">👑 Khách VIP</div>
          <p className="cust-metric-sub" style={{ color: "#ef4444" }}>Ưu tiên giữ ghế & miễn phí đồ uống</p>
        </div>
      </div>

      {/* INVOICES TABLE */}
      <div className="cust-table-card">
        <div className="cust-table-responsive">
          <table className="cust-table">
            <thead>
              <tr>
                <th>Mã Hóa Đơn</th>
                <th>Thời Gian</th>
                <th>Dịch Vụ Cắt</th>
                <th>Thợ Cắt</th>
                <th>Tạm Tính</th>
                <th>Ưu Đãi VIP</th>
                <th>Tổng Thanh Toán</th>
                <th>Hình Thức</th>
                <th style={{ textAlign: "right" }}>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="cust-table-code">#{inv.code}</td>
                  <td>
                    <div style={{ fontWeight: "700", color: "var(--text-primary)" }}>{inv.time}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{inv.date}</div>
                  </td>
                  <td className="cust-table-service">{inv.service}</td>
                  <td>
                    <div style={{ fontWeight: "700" }}>{inv.barber}</div>
                    <div style={{ fontSize: "11px", color: "#ef4444" }}>{inv.chair}</div>
                  </td>
                  <td>{inv.subtotal}</td>
                  <td className="cust-table-discount">{inv.discount}</td>
                  <td className="cust-table-total">{inv.total}</td>
                  <td>
                    <span className={`cust-pay-badge ${inv.badgeType}`}>
                      {inv.paymentMethod}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="cust-btn-view-invoice"
                    >
                      Chi Tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ELECTRONIC INVOICE MODAL */}
      {selectedInvoice && (
        <div className="cust-modal-backdrop" onClick={() => setSelectedInvoice(null)}>
          <div className="cust-receipt-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cust-modal-header">
              <h3 className="cust-modal-title">
                <span>🧾</span>
                <span>Hóa Đơn Điện Tử BarberHub</span>
              </h3>
              <button onClick={() => setSelectedInvoice(null)} className="cust-btn-close">
                ✕
              </button>
            </div>

            <div className="cust-receipt-body">
              <div className="cust-receipt-brand">
                <h4>BARBERHUB SALON SUITE</h4>
                <p>Chi nhánh Hàng Bạc, Hoàn Kiếm, Hà Nội</p>
              </div>

              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Mã hóa đơn:</span>
                <span className="cust-receipt-val" style={{ color: "#ef4444", fontWeight: "900" }}>
                  #{selectedInvoice.code}
                </span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Thời gian:</span>
                <span className="cust-receipt-val">{selectedInvoice.time} - {selectedInvoice.date}</span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Khách hàng:</span>
                <span className="cust-receipt-val">Anh Hoàng Nam (VIP)</span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Thợ cắt:</span>
                <span className="cust-receipt-val">{selectedInvoice.barber} ({selectedInvoice.chair})</span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Dịch vụ:</span>
                <span className="cust-receipt-val">{selectedInvoice.service}</span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Tạm tính:</span>
                <span className="cust-receipt-val">{selectedInvoice.subtotal}</span>
              </div>
              <div className="cust-receipt-row">
                <span className="cust-receipt-lbl">Giảm giá VIP:</span>
                <span className="cust-receipt-val" style={{ color: "#34d399" }}>{selectedInvoice.discount}</span>
              </div>

              <div className="cust-receipt-total-row">
                <span style={{ fontWeight: "800", color: "var(--text-primary)", fontSize: "14px" }}>Tổng Thanh Toán:</span>
                <span className="cust-receipt-total-val">{selectedInvoice.total}</span>
              </div>

              <div className="cust-receipt-stamp">
                ✓ Đã thanh toán thành công qua {selectedInvoice.paymentMethod}
              </div>
            </div>

            <div className="cust-modal-actions">
              <button
                onClick={() => alert("Đang xuất hóa đơn PDF về máy của bạn...")}
                className="cust-btn-primary"
                style={{ background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" }}
              >
                Tải PDF
              </button>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="cust-btn-primary"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
