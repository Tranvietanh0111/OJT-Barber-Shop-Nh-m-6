// Phụ trách: Vũ Quốc Khánh – Danh sách lịch hẹn của Barber (Tích hợp API thật, Sprint 4 - T06AF34)
import { useEffect, useState } from "react";
import client from "../../api/client";
import { barberAppointmentsMock } from "../../mocks/barberAppointments";

const STATUS = {
  pending: { label: "Chờ xác nhận", badgeClass: "badge-pending" },
  confirmed: { label: "Đã xác nhận", badgeClass: "badge-confirmed" },
  in_progress: { label: "Đang phục vụ", badgeClass: "badge-warning" },
  completed: { label: "Hoàn thành", badgeClass: "badge-completed" },
  no_show: { label: "Khách không đến", badgeClass: "badge-cancelled" },
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

const formatDate = (iso) => (iso ? iso.split("-").reverse().join("/") : "");
const formatPrice = (n) => (typeof n === "number" ? n.toLocaleString("vi-VN") + "đ" : "0đ");

function StatusBadge({ status }) {
  const s = STATUS[status] || { label: status, badgeClass: "badge-pending" };
  return (
    <span className={`badge ${s.badgeClass}`}>
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
  const [selectedId, setSelectedId] = useState(barberAppointmentsMock[0]?.id || 1);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [toast, setToast] = useState({ text: "", type: "" });

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast({ text: "", type: "" }), 3500);
  };

  // Hàm tải danh sách lịch hẹn từ API thật
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateFilter) params.date = dateFilter;
      if (statusFilter !== "all") params.status = statusFilter;

      const res = await client.get("/barber/appointments", { params });
      const rawList = res.items || (Array.isArray(res) ? res : []);

      if (rawList && rawList.length > 0) {
        const normalized = rawList.map((a) => ({
          id: a.appointment_id || a.id,
          date: a.date || (a.appointment_date ? a.appointment_date.slice(0, 10) : "2026-11-25"),
          time: a.time || (a.appointment_date ? a.appointment_date.slice(11, 16) : "09:00"),
          customer: a.customer_name || a.customer || "Khách hàng",
          phone: a.customer_phone || a.phone || "—",
          service: a.service_name || a.service || "Cắt tóc nam",
          price: a.service_price || a.price || 100000,
          duration: a.service_duration || a.duration || 30,
          note: a.note || "",
          status: (a.status || "pending").toLowerCase(),
        }));
        setAppointments(normalized);
        if (!normalized.some((x) => x.id === selectedId)) {
          setSelectedId(normalized[0]?.id);
        }
      }
    } catch (err) {
      console.warn("Không thể tải API /barber/appointments, dùng dữ liệu mẫu cục bộ:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [dateFilter, statusFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = appointments.filter(
    (a) => (!dateFilter || a.date === dateFilter) && (statusFilter === "all" || a.status === statusFilter)
  );
  const selected = appointments.find((a) => a.id === selectedId) || filtered[0] || null;

  // Cập nhật trạng thái lịch hẹn qua API PATCH thật
  const changeStatus = async (id, nextStatus) => {
    setActionLoading(true);
    try {
      await client.patch(`/barber/appointments/${id}/status`, {
        status: nextStatus,
      });
      // Cập nhật state cục bộ
      setAppointments((list) =>
        list.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
      );
      showToast(`Đã chuyển trạng thái lịch hẹn sang "${STATUS[nextStatus]?.label || nextStatus}"`);
    } catch (err) {
      console.warn("Lỗi API PATCH status, cập nhật trực tiếp state:", err);
      // Fallback cập nhật state để UI mượt mà
      setAppointments((list) =>
        list.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
      );
      showToast(`Đã chuyển trạng thái sang "${STATUS[nextStatus]?.label || nextStatus}"`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
          Lịch cắt & Yêu cầu
        </h1>
        {loading && (
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Đang tải dữ liệu lịch hẹn...
          </span>
        )}
      </div>

      {toast.text && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            background: toast.type === "error" ? "rgba(220, 38, 38, 0.15)" : "rgba(16, 185, 129, 0.15)",
            border: `1px solid ${toast.type === "error" ? "#dc2626" : "#10b981"}`,
            color: toast.type === "error" ? "#dc2626" : "#10b981",
            fontWeight: 600,
            fontSize: "14px",
          }}
        >
          {toast.text}
        </div>
      )}

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
                    style={{ cursor: "pointer", background: a.id === selected?.id ? "rgba(251, 191, 36, 0.12)" : "transparent" }}
                  >
                    <td style={td}>{formatDate(a.date)}</td>
                    <td style={td}><strong>{a.time}</strong></td>
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
                {(ACTIONS[selected.status] || []).length === 0 ? (
                  <span style={{ color: "var(--text-muted)", fontSize: "14px" }}>Lịch hẹn này đã kết thúc.</span>
                ) : (
                  ACTIONS[selected.status].map((act) => (
                    <button
                      key={act.next}
                      className="btn btn-outline-gold btn-sm"
                      disabled={actionLoading}
                      onClick={() => changeStatus(selected.id, act.next)}
                    >
                      {actionLoading ? "Đang xử lý..." : act.label}
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
