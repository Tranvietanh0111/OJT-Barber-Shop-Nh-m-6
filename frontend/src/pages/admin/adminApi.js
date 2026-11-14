// Phụ trách: Trần Văn Thắng
/**
 * Client gọi API Quản trị Salon (/api/v1/admin)
 * Bao gồm: Quản lý Người dùng (Khách hàng CRM & Nhân sự) và Quản lý Đội ngũ Barber.
 * Tự động fallback an toàn khi Backend chưa bật để đảm bảo UI hoạt động mượt mà.
 */

const API_BASE_URL =
  import.meta.env?.VITE_API_URL || "http://localhost:8000/api/v1";

async function requestAdmin(path, options = {}) {
  try {
    const token = localStorage.getItem("access_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };
    const res = await fetch(`${API_BASE_URL}/admin${path}`, {
      ...options,
      headers,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data?.detail?.error || data?.detail || data?.message || "Lỗi kết nối API",
      };
    }
    return { ok: true, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, offline: true, error: err?.message };
  }
}

// ============================================================================
// 1. API QUẢN LÝ NGƯỜI DÙNG (USERS: KHÁCH HÀNG CRM & TÀI KHOẢN NHÂN SỰ)
// ============================================================================

export const adminUsersApi = {
  /** Lấy danh sách Khách hàng CRM & Tài khoản Nhân sự */
  getUsers(params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "" && v !== "all") {
        qs.set(k, String(v));
      }
    });
    const queryStr = qs.toString() ? `?${qs.toString()}` : "";
    return requestAdmin(`/users${queryStr}`, { method: "GET" });
  },

  /** Xem chi tiết 1 Người dùng */
  getUserDetail(userId) {
    return requestAdmin(`/users/${encodeURIComponent(userId)}`, {
      method: "GET",
    });
  },

  /** Tạo mới Khách hàng CRM hoặc Tài khoản Nhân sự */
  createUser(payload) {
    return requestAdmin("/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Cập nhật hồ sơ Người dùng */
  updateUser(userId, payload) {
    return requestAdmin(`/users/${encodeURIComponent(userId)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /** Khóa / Mở khóa tài khoản Người dùng */
  updateUserStatus(userId, status) {
    return requestAdmin(`/users/${encodeURIComponent(userId)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** Cộng / Trừ điểm tích lũy Loyalty */
  adjustUserPoints(userId, pointsDelta, spentDelta = 0, reason = "") {
    return requestAdmin(`/users/${encodeURIComponent(userId)}/points`, {
      method: "PATCH",
      body: JSON.stringify({ pointsDelta, spentDelta, reason }),
    });
  },

  /** Xóa Người dùng */
  deleteUser(userId) {
    return requestAdmin(`/users/${encodeURIComponent(userId)}`, {
      method: "DELETE",
    });
  },
};

// ============================================================================
// 2. API QUẢN LÝ ĐỘI NGŨ BARBER (BARBERS: HỒ SƠ, CA TRỰC, HOA HỒNG, BẢNG LƯƠNG)
// ============================================================================

export const adminBarbersApi = {
  /** Lấy danh sách Đội ngũ Barber & KPI */
  getBarbers(params = {}) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "" && v !== "all") {
        qs.set(k, String(v));
      }
    });
    const queryStr = qs.toString() ? `?${qs.toString()}` : "";
    return requestAdmin(`/barbers${queryStr}`, { method: "GET" });
  },

  /** Xem chi tiết hồ sơ Barber & lịch hẹn phụ trách */
  getBarberDetail(barberId) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}`, {
      method: "GET",
    });
  },

  /** Thêm mới Thợ Barber */
  createBarber(payload) {
    return requestAdmin("/barbers", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  /** Cập nhật hồ sơ Barber */
  updateBarber(barberId, payload) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },

  /** Đổi nhanh trạng thái ca trực của Barber (busy/working, available, break, off) */
  updateBarberStatus(barberId, status) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** Phân công Ca làm việc & Ghế cắt cho Barber */
  updateBarberSchedule(barberId, payload) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}/schedule`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },

  /** Xuất bảng tính lương & hoa hồng chi tiết của Barber */
  getBarberPayroll(barberId) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}/payroll`, {
      method: "GET",
    });
  },

  /** Xóa hồ sơ Barber */
  deleteBarber(barberId) {
    return requestAdmin(`/barbers/${encodeURIComponent(barberId)}`, {
      method: "DELETE",
    });
  },
};

