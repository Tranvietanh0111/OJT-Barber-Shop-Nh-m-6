// Phụ trách: Vũ Quốc Khánh – Trang tổng quan Barber (Tích hợp API thật, Sprint 4 - T06AF34)
import { useEffect, useState } from "react";
import client from "../../api/client";
import { LineIcon } from "../../components/Header";
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
      <div style={{ color: "var(--color-navy)", lineHeight: 0 }}>{icon}</div>
      <div style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>{label}</div>
      <div style={{ fontSize: "28px", fontWeight: 800, color: "var(--text-primary)" }}>{value}</div>
    </div>
  );
}

export default function BarberDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(barberDashboardMock);

  useEffect(() => {
    let mounted = true;
    async function loadDashboard() {
      try {
        setLoading(true);
        const res = await client.get("/barber/dashboard");
        if (mounted && res) {
          setDashboardData({
            todayAppointments: res.todayAppointments || [],
            weeklyCustomers: res.weeklyCustomers ?? 24,
            averageRating: res.averageRating ?? 4.9,
            upcomingAppointments: res.upcomingAppointments || [],
          });
        }
      } catch (err) {
        console.warn("Không thể tải API Dashboard, dùng dữ liệu dự phòng:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      mounted = false;
    };
  }, []);

  const { todayAppointments, weeklyCustomers, averageRating, upcomingAppointments } = dashboardData;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>
          Tổng quan công việc
        </h1>
        {loading && (
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            Đang đồng bộ dữ liệu từ máy chủ...
          </span>
        )}
      </div>

      {/* 3 thẻ thống kê */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <StatCard icon={<LineIcon name="calendar" size={24} />} label="Lịch hẹn hôm nay" value={todayAppointments.length} />
        <StatCard icon={<LineIcon name="users" size={24} />} label="Lượt khách trong tuần" value={weeklyCustomers} />
        <StatCard icon={<LineIcon name="star" size={24} />} label="Điểm đánh giá trung bình" value={typeof averageRating === "number" ? averageRating.toFixed(1) : averageRating} />
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
              {todayAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)" }}>
                    Hôm nay chưa có lịch hẹn nào mới.
                  </td>
                </tr>
              ) : (
                todayAppointments.map((a) => (
                  <tr key={a.id}>
                    <td style={td}>{a.time}</td>
                    <td style={td}>{a.customer}</td>
                    <td style={td}>{a.service}</td>
                    <td style={td}>
                      <span className={`badge ${a.status === "confirmed" ? "badge-confirmed" : (a.status === "in_progress" ? "badge-warning" : "badge-pending")}`}>
                        {a.status === "confirmed" ? "Đã xác nhận" : (a.status === "in_progress" ? "Đang phục vụ" : "Chờ xác nhận")}
                      </span>
                    </td>
                  </tr>
                ))
              )}
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
              {upcomingAppointments.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "24px", color: "var(--text-muted)" }}>
                    Không có lịch hẹn sắp tới nào.
                  </td>
                </tr>
              ) : (
                upcomingAppointments.map((a) => (
                  <tr key={a.id}>
                    <td style={td}>{a.date}</td>
                    <td style={td}>{a.time}</td>
                    <td style={td}>{a.customer}</td>
                    <td style={td}>{a.service}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
