// Phụ trách: Vũ Quốc Khánh – Trang tổng quan Barber (dữ liệu mẫu, Sprint 2)
import { barberDashboardMock } from "../../mocks/barberDashboard";

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold-border)",
  borderRadius: "var(--radius-lg)",
  padding: "20px 24px",
  boxShadow: "var(--shadow-card)",
};

const th = { textAlign: "left", padding: "10px 12px", color: "var(--text-muted)", fontSize: "13px" };
const td = { padding: "12px", borderTop: "1px solid var(--border-subtle)", color: "var(--text-primary)" };

function StatCard({ icon, label, value }) {
  return (
    <div style={{ ...cardStyle, flex: 1, minWidth: "200px" }}>
      <div style={{ fontSize: "24px" }}>{icon}</div>
      <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
    </div>
  );
}

export default function BarberDashboard() {
  const { todayAppointments, weeklyCustomers, averageRating, upcomingAppointments } = barberDashboardMock;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>
        Tổng quan công việc
      </h1>

      {/* 3 thẻ thống kê */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <StatCard icon="📅" label="Lịch hẹn hôm nay" value={todayAppointments.length} />
        <StatCard icon="👥" label="Lượt khách trong tuần" value={weeklyCustomers} />
        <StatCard icon="⭐" label="Điểm đánh giá trung bình" value={averageRating.toFixed(1)} />
      </div>

      {/* Lịch hẹn hôm nay */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
          Lịch hẹn hôm nay
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Giờ</th>
                <th style={th}>Khách hàng</th>
                <th style={th}>Dịch vụ</th>
                <th style={th}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {todayAppointments.map((a) => (
                <tr key={a.id}>
                  <td style={td}>{a.time}</td>
                  <td style={td}>{a.customer}</td>
                  <td style={td}>{a.service}</td>
                  <td style={td}>
                    <span className={`badge ${a.status === "confirmed" ? "badge-success" : "badge-info"}`}>
                      {a.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lịch hẹn sắp tới */}
      <div style={cardStyle}>
        <h2 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>
          Lịch hẹn sắp tới
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={th}>Ngày</th>
                <th style={th}>Giờ</th>
                <th style={th}>Khách hàng</th>
                <th style={th}>Dịch vụ</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.map((a) => (
                <tr key={a.id}>
                  <td style={td}>{a.date}</td>
                  <td style={td}>{a.time}</td>
                  <td style={td}>{a.customer}</td>
                  <td style={td}>{a.service}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}