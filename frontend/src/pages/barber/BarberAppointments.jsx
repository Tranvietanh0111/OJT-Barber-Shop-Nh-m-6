// Phụ trách: Vũ Quốc Khánh – Danh sách lịch hẹn của Barber (dữ liệu mẫu, Sprint 2)
import { useState } from "react";
import { barberAppointmentsMock } from "../../mocks/barberAppointments";

const STATUS = {
  pending: { label: "Chờ xác nhận", color: "#60a5fa" },
  confirmed: { label: "Đã xác nhận", color: "#34d399" },
  in_progress: { label: "Đang phục vụ", color: "#fbbf24" },
  completed: { label: "Hoàn thành", color: "#a3a3a3" },
  no_show: { label: "Khách không đến", color: "#f87171" },
};

// Nút hành động theo từng trạng thái hiện tại
const ACTIONS = {
  pending: [{ label: "✅ Xác nhận", next: "confirmed" }],
  confirmed: [
    { label: "▶️ Bắt đầu phục vụ", next: "in_progress" },
    { label: "🚫 Khách không đến", next: "no_show" },
  ],
  in_progress: [{ label: "🏁 Hoàn thành", next: "completed" }],
  completed: [],
  no_show: [],
};

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold-border)",
  borderRadius: "var(--radius-lg)",
  padding: "20px 24px",
  boxShadow: "var(--shadow-card)",
};
const th = { textAlign: "left", padding: "10px 12px", color: "var(--text-muted)", fontSize: "13px" };
const td = { padding: "12px", borderTop: "1px solid var(--border-subtle)", color: "var(--text-primary)" };
const inputStyle = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid var(--border-subtle)",
  background: "var(--bg-app)",
  color: "var(--text-primary)",
};

const formatDate = (iso) => iso.split("-").reverse().join("/");
const formatPrice = (n) => n.toLocaleString("vi-VN") + "đ";

function StatusBadge({ status }) {
  const s = STATUS[status];
  return (
    <span
      style={{
        color: s.color,
        border: `1px solid ${s.color}`,
        borderRadius: "999px",
        padding: "2px 10px",
        fontSize: "12px",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
}

function DetailRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", padding: "8px 0", borderTop: "1px solid var(--border-subtle)" }}>
      <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>{label}</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}

export default function BarberAppointments() {
  const [appointments, setAppointments] = useState(barberAppointmentsMock);
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(barberAppointmentsMock[0].id);

  const filtered = appointments.filter(
    (a) => (!dateFilter || a.date === dateFilter) && (statusFilter === "all" || a.status === statusFilter)
  );
  const selected = appointments.find((a) => a.id === selectedId);

  const changeStatus = (id, next) => {
    setAppointments((list) => list.map((a) => (a.id === id ? { ...a, status: next } : a)));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>
        Lịch cắt & Yêu cầu
      </h1>

      {/* Bộ lọc */}
      <div style={{ ...cardStyle, display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-secondary)", fontSize: "14px" }}>
          Ngày
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} style={inputStyle} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", color: "var(--text-secondary)", fontSize: "14px" }}>
          Trạng thái
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={inputStyle}>
            <option value="all">Tất cả trạng thái</option>
            {Object.entries(STATUS).map(([key, s]) => (
              <option key={key} value={key}>{s.label}</option>
            ))}
          </select>
        </label>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => { setDateFilter(""); setStatusFilter("all"); }}
        >
          Xóa bộ lọc
        </button>
        <span style={{ color: "var(--text-muted)", fontSize: "14px", marginLeft: "auto" }}>
          {filtered.length} lịch hẹn
        </span>
      </div>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
        {/* Danh sách */}
        <div style={{ ...cardStyle, flex: "2 1 520px", minWidth: 0 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={th}>Ngày</th>
                  <th style={th}>Giờ</th>
                  <th style={th}>Khách hàng</th>
                  <th style={th}>Dịch vụ</th>
                  <th style={th}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td style={{ ...td, textAlign: "center", color: "var(--text-muted)" }} colSpan={5}>
                      Không có lịch hẹn phù hợp
                    </td>
                  </tr>
                )}
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    style={{ cursor: "pointer", background: a.id === selectedId ? "rgba(251, 191, 36, 0.08)" : "transparent" }}
                  >
                    <td style={td}>{formatDate(a.date)}</td>
                    <td style={td}>{a.time}</td>
                    <td style={td}>{a.customer}</td>
                    <td style={td}>{a.service}</td>
                    <td style={td}><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chi tiết + hành động */}
        <div style={{ ...cardStyle, flex: "1 1 300px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
            Chi tiết lịch hẹn
          </h2>
          {!selected ? (
            <p style={{ color: "var(--text-muted)" }}>Chọn một lịch hẹn trong danh sách để xem chi tiết.</p>
          ) : (
            <>
              <DetailRow label="Khách hàng" value={selected.customer} />
              <DetailRow label="Số điện thoại" value={selected.phone} />
              <DetailRow label="Dịch vụ" value={selected.service} />
              <DetailRow label="Thời lượng" value={`${selected.duration} phút`} />
              <DetailRow label="Giá" value={formatPrice(selected.price)} />
              <DetailRow label="Thời gian" value={`${selected.time} - ${formatDate(selected.date)}`} />
              <DetailRow label="Ghi chú" value={selected.note || "—"} />
              <DetailRow label="Trạng thái" value={<StatusBadge status={selected.status} />} />

              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
                {ACTIONS[selected.status].length === 0 ? (
                  <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Lịch hẹn này đã kết thúc.</span>
                ) : (
                  ACTIONS[selected.status].map((act) => (
                    <button
                      key={act.next}
                      className="btn btn-outline-gold btn-sm"
                      onClick={() => changeStatus(selected.id, act.next)}
                    >
                      {act.label}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}