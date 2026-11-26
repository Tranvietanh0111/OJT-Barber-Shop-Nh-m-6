// Phụ trách: Trần Văn Thắng
// Task 10 (Sprint 2): Xây dựng giao diện quản lý lịch hẹn – Bảng lịch, lọc theo ngày và trạng thái (HTML + CSS)
import { useMemo, useState } from "react";
import "./admin.css";

export default function AppointmentManagement() {
  const [dateFilter, setDateFilter] = useState("2026-11-14");
  const [statusFilter, setStatusFilter] = useState("");
  const [barberFilter, setBarberFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const appointments = [
    { id: "BK-2026-101", customer: "Hoàng Gia Huy", phone: "0987654321", barber: "Nguyễn Hoàng Nam", service: "Combo Đế Vương 7 Bước", date: "2026-11-14", time: "09:30", displayDate: "14/11/2026", price: "220.000 đ", status: "completed" },
    { id: "BK-2026-102", customer: "Đặng Quang Vinh", phone: "0978123456", barber: "Lê Minh Tuấn", service: "Uốn Định Hình Hàn Quốc", date: "2026-11-14", time: "10:30", displayDate: "14/11/2026", price: "380.000 đ", status: "confirmed" },
    { id: "BK-2026-103", customer: "Vũ Đình Khoa", phone: "0965432109", barber: "Phạm Quốc Bảo", service: "Cắt Tóc Thương Gia", date: "2026-11-14", time: "14:00", displayDate: "14/11/2026", price: "120.000 đ", status: "pending" },
    { id: "BK-2026-104", customer: "Ngô Gia Bảo", phone: "0977889900", barber: "Trịnh Đức Anh", service: "Cắt Tóc Thương Gia", date: "2026-11-13", time: "18:00", displayDate: "13/11/2026", price: "120.000 đ", status: "rejected" },
    { id: "BK-2026-105", customer: "Bùi Xuân Trường", phone: "0945112233", barber: "Phạm Quốc Bảo", service: "Cạo Râu Khăn Nóng", date: "2026-11-13", time: "16:30", displayDate: "13/11/2026", price: "80.000 đ", status: "cancelled" },
  ];

  const filtered = useMemo(() => {
    const keyword = searchFilter.trim().toLowerCase();
    return appointments.filter((item) =>
      (!dateFilter || item.date === dateFilter)
      && (!statusFilter || item.status === statusFilter)
      && (!barberFilter || item.barber === barberFilter)
      && (!keyword || [item.id, item.customer, item.phone].some((value) => value.toLowerCase().includes(keyword)))
    );
  }, [dateFilter, statusFilter, barberFilter, searchFilter]);

  const statusBadge = (status) => {
    const classes = {
      completed: "adm-badge adm-badge-green",
      confirmed: "adm-badge adm-badge-blue",
      pending: "adm-badge adm-badge-yellow",
      rejected: "adm-badge adm-badge-red",
      cancelled: "adm-badge adm-badge-red",
    };
    return <span className={`${classes[status]} badge badge-${status === "pending" ? "pending" : status === "confirmed" ? "confirmed" : status === "completed" ? "completed" : "cancelled"}`}>{status}</span>;
  };

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
              <input type="date" className="adm-input" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} />
              <select className="adm-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận (pending)</option>
                <option value="confirmed">Đã xác nhận (confirmed)</option>
                <option value="completed">Hoàn thành (completed)</option>
                <option value="rejected">Từ chối (rejected)</option>
                <option value="cancelled">Đã hủy (cancelled)</option>
              </select>
              <select className="adm-select" value={barberFilter} onChange={(event) => setBarberFilter(event.target.value)}>
                <option value="">Tất cả Barber</option>
                <option>Nguyễn Hoàng Nam</option>
                <option>Lê Minh Tuấn</option>
                <option>Phạm Quốc Bảo</option>
              </select>
              <input type="text" className="adm-input adm-search-input" value={searchFilter} onChange={(event) => setSearchFilter(event.target.value)} placeholder="Tìm mã lịch, tên khách, SĐT..." />
              <button type="button" className="adm-btn adm-btn-gold" onClick={() => setDateFilter("")}>Bỏ lọc ngày</button>
            </div>
          </div>

          <div className="adm-tabs">
            <button type="button" className={`adm-tab ${statusFilter === "" ? "active" : ""}`} onClick={() => setStatusFilter("")}>Tất cả ({appointments.length})</button>
            {[["pending", "Chờ xác nhận"], ["confirmed", "Đã xác nhận"], ["completed", "Hoàn thành"], ["rejected", "Từ chối"], ["cancelled", "Đã hủy"]].map(([status, label]) => (
              <button key={status} type="button" className={`adm-tab ${statusFilter === status ? "active" : ""}`} onClick={() => setStatusFilter(status)}>
                {label} ({appointments.filter((item) => item.status === status).length})
              </button>
            ))}
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
                  {filtered.length === 0 ? (
                    <tr><td colSpan="8" style={{ textAlign: "center", color: "var(--text-muted)" }}>Không có lịch hẹn phù hợp</td></tr>
                  ) : filtered.map((item) => (
                    <tr key={item.id}>
                      <td><strong>{item.id}</strong></td>
                      <td><div className="adm-cell-title">{item.customer}</div><div className="adm-cell-sub">{item.phone}</div></td>
                      <td>{item.barber}</td>
                      <td>{item.service}</td>
                      <td>{item.displayDate} • {item.time}</td>
                      <td><strong>{item.price}</strong></td>
                      <td>{statusBadge(item.status)}</td>
                      <td><button type="button" className="adm-btn adm-btn-outline adm-btn-sm">Chi tiết</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
