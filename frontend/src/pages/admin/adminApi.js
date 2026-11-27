// Phụ trách: Trần Văn Thắng
// Lớp gọi API Admin (tự động gọi FastAPI backend; nếu backend chưa bật sẽ dùng localStorage fallback để Thêm/Sửa/Xóa vẫn hoạt động mượt)
import client from "../../api/client";

const STORAGE_KEYS = {
  users: "barberhub_admin_users_v1",
  barbers: "barberhub_admin_barbers_v1",
  services: "barberhub_admin_services_v1",
  appointments: "barberhub_admin_appointments_v1",
  invoices: "barberhub_admin_invoices_v1",
};

const INITIAL_USERS = [
  {
    id: 1,
    code: "USR-001",
    full_name: "Trần Văn Thắng",
    email: "thang.admin@barberhub.vn",
    phone: "0901234567",
    role: "admin",
    status: "active",
    created_at: "2026-09-01",
  },
  {
    id: 2,
    code: "USR-002",
    full_name: "Nguyễn Hoàng Nam",
    email: "nam.barber@barberhub.vn",
    phone: "0912345678",
    role: "barber",
    status: "active",
    created_at: "2026-09-05",
  },
  {
    id: 3,
    code: "USR-003",
    full_name: "Lê Minh Tuấn",
    email: "tuan.barber@barberhub.vn",
    phone: "0923456789",
    role: "barber",
    status: "active",
    created_at: "2026-09-10",
  },
  {
    id: 4,
    code: "USR-004",
    full_name: "Hoàng Gia Huy",
    email: "giahuy@gmail.com",
    phone: "0987654321",
    role: "customer",
    status: "active",
    created_at: "2026-10-02",
  },
  {
    id: 5,
    code: "USR-005",
    full_name: "Đặng Quang Vinh",
    email: "quangvinh@gmail.com",
    phone: "0978123456",
    role: "customer",
    status: "active",
    created_at: "2026-10-08",
  },
  {
    id: 6,
    code: "USR-006",
    full_name: "Bùi Xuân Trường",
    email: "xuantruong@gmail.com",
    phone: "0945112233",
    role: "customer",
    status: "locked",
    created_at: "2026-10-20",
  },
];

const INITIAL_BARBERS = [
  {
    id: 1,
    code: "BB-01",
    full_name: "Nguyễn Hoàng Nam",
    phone: "0912345678",
    email: "nam.barber@barberhub.vn",
    specialty: "Skin Fade & Pompadour cổ điển",
    experience_years: 7,
    rating: 4.9,
    completed_orders: 148,
    shift: "08:30 - 17:30",
    commission_rate: 40,
    monthly_revenue: 34500000,
    status: "available",
  },
  {
    id: 2,
    code: "BB-02",
    full_name: "Lê Minh Tuấn",
    phone: "0923456789",
    email: "tuan.barber@barberhub.vn",
    specialty: "Uốn Layer & Nhuộm Hàn Quốc",
    experience_years: 5,
    rating: 4.8,
    completed_orders: 132,
    shift: "09:00 - 19:00",
    commission_rate: 38,
    monthly_revenue: 26800000,
    status: "busy",
  },
  {
    id: 3,
    code: "BB-03",
    full_name: "Phạm Quốc Bảo",
    phone: "0934567890",
    email: "bao.barber@barberhub.vn",
    specialty: "Taper Fade & Cạo khăn nóng",
    experience_years: 4,
    rating: 4.7,
    completed_orders: 115,
    shift: "12:00 - 21:00",
    commission_rate: 35,
    monthly_revenue: 22400000,
    status: "off",
  },
  {
    id: 4,
    code: "BB-04",
    full_name: "Trần Đức Anh",
    phone: "0945678901",
    email: "ducanh.barber@barberhub.vn",
    specialty: "Side Part & Mullet Hiện Đại",
    experience_years: 4,
    rating: 4.8,
    completed_orders: 98,
    shift: "08:30 - 17:30",
    commission_rate: 35,
    monthly_revenue: 19800000,
    status: "available",
  },
  {
    id: 5,
    code: "BB-05",
    full_name: "Vũ Hải Đăng",
    phone: "0956789012",
    email: "haidang.barber@barberhub.vn",
    specialty: "Mohican & Uốn Premlock",
    experience_years: 3,
    rating: 4.6,
    completed_orders: 76,
    shift: "12:00 - 21:00",
    commission_rate: 32,
    monthly_revenue: 14500000,
    status: "available",
  },
];

const INITIAL_SERVICES = [
  {
    id: 1,
    code: "SV-01",
    name: "Cắt Tóc Thương Gia",
    category: "Cắt & Tạo kiểu",
    duration: 45,
    price: 120000,
    status: "visible",
    description: "Tư vấn kiểu tóc phù hợp khuôn mặt, cắt tạo kiểu, gội xả thư giãn và vuốt sáp.",
  },
  {
    id: 2,
    code: "SV-02",
    name: "Combo Đế Vương 7 Bước",
    category: "Combo VIP",
    duration: 60,
    price: 220000,
    status: "visible",
    description: "Cắt tóc, cạo mặt khăn nóng, lột mụn cám, gội massage cổ vai gáy.",
  },
  {
    id: 3,
    code: "SV-03",
    name: "Uốn Định Hình Hàn Quốc",
    category: "Uốn & Nhuộm",
    duration: 90,
    price: 380000,
    status: "visible",
    description: "Uốn tạo phồng tự nhiên giữ nếp 2-3 tháng bằng thuốc uốn cao cấp.",
  },
  {
    id: 4,
    code: "SV-04",
    name: "Tẩy Tóc Bạch Kim Olaplex",
    category: "Uốn & Nhuộm",
    duration: 120,
    price: 550000,
    status: "hidden",
    description: "Tẩy nâng tông kết hợp dưỡng phục hồi Olaplex giảm hư tổn tối đa.",
  },
];

const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    code: "BK-2026-101",
    customer_name: "Hoàng Gia Huy",
    customer_phone: "0987654321",
    barber_name: "Nguyễn Hoàng Nam",
    service_name: "Combo Đế Vương 7 Bước",
    date: "2026-11-14",
    time: "09:30",
    price: 220000,
    status: "completed",
    notes: "Khách quen, thích cắt fade cao",
  },
  {
    id: 2,
    code: "BK-2026-102",
    customer_name: "Đặng Quang Vinh",
    customer_phone: "0978123456",
    barber_name: "Lê Minh Tuấn",
    service_name: "Uốn Định Hình Hàn Quốc",
    date: "2026-11-14",
    time: "10:30",
    price: 380000,
    status: "confirmed",
    notes: "Đặt trước qua website",
  },
  {
    id: 3,
    code: "BK-2026-103",
    customer_name: "Vũ Đình Khoa",
    customer_phone: "0965432109",
    barber_name: "Phạm Quốc Bảo",
    service_name: "Cắt Tóc Thương Gia",
    date: "2026-11-14",
    time: "14:00",
    price: 120000,
    status: "pending",
    notes: "Chờ xác nhận khung giờ chiều",
  },
  {
    id: 4,
    code: "BK-2026-104",
    customer_name: "Ngô Gia Bảo",
    customer_phone: "0977889900",
    barber_name: "Trần Đức Anh",
    service_name: "Cắt Tóc Thương Gia",
    date: "2026-11-13",
    time: "18:00",
    price: 120000,
    status: "rejected",
    notes: "Barber trùng lịch bảo trì ghế",
  },
  {
    id: 5,
    code: "BK-2026-105",
    customer_name: "Bùi Xuân Trường",
    customer_phone: "0945112233",
    barber_name: "Phạm Quốc Bảo",
    service_name: "Cạo Râu Khăn Nóng",
    date: "2026-11-13",
    time: "16:30",
    price: 80000,
    status: "cancelled",
    notes: "Khách báo bận đột xuất",
  },
];

const INITIAL_INVOICES = [
  {
    id: 1,
    invoice_code: "INV-2026-001",
    appointment_code: "BK-2026-101",
    customer_name: "Hoàng Gia Huy",
    customer_phone: "0987654321",
    barber_name: "Nguyễn Hoàng Nam",
    created_at: "2026-11-14 10:25",
    date: "2026-11-14",
    payment_method: "transfer",
    payment_status: "paid",
    subtotal: 270000,
    discount: 20000,
    total: 250000,
    notes: "Thanh toán chuyển khoản VietQR",
    items: [
      { service_name: "Combo Đế Vương 7 Bước", quantity: 1, unit_price: 220000 },
      { service_name: "Sáp vuốt tóc Volcanic Clay", quantity: 1, unit_price: 50000 },
    ],
  },
  {
    id: 2,
    invoice_code: "INV-2026-002",
    appointment_code: "BK-2026-102",
    customer_name: "Đặng Quang Vinh",
    customer_phone: "0978123456",
    barber_name: "Lê Minh Tuấn",
    created_at: "2026-11-14 12:10",
    date: "2026-11-14",
    payment_method: "card",
    payment_status: "paid",
    subtotal: 500000,
    discount: 50000,
    total: 450000,
    notes: "Giảm 50.000đ ưu đãi combo Uốn + Cắt",
    items: [
      { service_name: "Uốn Định Hình Hàn Quốc", quantity: 1, unit_price: 380000 },
      { service_name: "Cắt Tóc Thương Gia", quantity: 1, unit_price: 120000 },
    ],
  },
  {
    id: 3,
    invoice_code: "INV-2026-003",
    appointment_code: "BK-2026-103",
    customer_name: "Vũ Đình Khoa",
    customer_phone: "0965432109",
    barber_name: "Phạm Quốc Bảo",
    created_at: "2026-11-14 14:45",
    date: "2026-11-14",
    payment_method: "cash",
    payment_status: "unpaid",
    subtotal: 200000,
    discount: 0,
    total: 200000,
    notes: "Khách chờ thanh toán tại quầy",
    items: [
      { service_name: "Cắt Tóc Thương Gia", quantity: 1, unit_price: 120000 },
      { service_name: "Cạo Râu Khăn Nóng", quantity: 1, unit_price: 80000 },
    ],
  },
  {
    id: 4,
    invoice_code: "INV-2026-004",
    appointment_code: "BK-2026-092",
    customer_name: "Lương Thế Thành",
    customer_phone: "0918273645",
    barber_name: "Nguyễn Hoàng Nam",
    created_at: "2026-11-12 19:05",
    date: "2026-11-12",
    payment_method: "transfer",
    payment_status: "refunded",
    subtotal: 380000,
    discount: 0,
    total: 380000,
    notes: "Hoàn tiền cọc do khách dời lịch",
    items: [{ service_name: "Uốn Định Hình Hàn Quốc", quantity: 1, unit_price: 380000 }],
  },
];

const REVENUE_CHARTS = {
  "7d": [
    { label: "08/11", revenue: 3250000, orders: 16 },
    { label: "09/11", revenue: 4100000, orders: 20 },
    { label: "10/11", revenue: 3680000, orders: 18 },
    { label: "11/11", revenue: 4520000, orders: 22 },
    { label: "12/11", revenue: 4890000, orders: 24 },
    { label: "13/11", revenue: 5950000, orders: 28 },
    { label: "14/11", revenue: 6420000, orders: 31 },
  ],
  month: [
    { label: "Tuần 1", revenue: 22400000, orders: 108 },
    { label: "Tuần 2", revenue: 25800000, orders: 124 },
    { label: "Tuần 3", revenue: 24900000, orders: 119 },
    { label: "Tuần 4", revenue: 29300000, orders: 141 },
  ],
  quarter: [
    { label: "Tháng 09", revenue: 86500000, orders: 415 },
    { label: "Tháng 10", revenue: 94200000, orders: 452 },
    { label: "Tháng 11", revenue: 102400000, orders: 492 },
  ],
  year: [
    { label: "Quý 1", revenue: 245000000, orders: 1180 },
    { label: "Quý 2", revenue: 268000000, orders: 1290 },
    { label: "Quý 3", revenue: 289000000, orders: 1395 },
    { label: "Quý 4", revenue: 312000000, orders: 1510 },
  ],
};

function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return structuredClone(fallback);
    }
    return JSON.parse(raw);
  } catch {
    return structuredClone(fallback);
  }
}

function writeStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

function isNetworkError(err) {
  return !err || err.code === "NETWORK_ERROR" || err.code === "UNKNOWN_ERROR";
}

function extractErrorMessage(err, fallback = "Có lỗi xảy ra, vui lòng thử lại.") {
  if (!err) return fallback;
  if (typeof err === "string") return err;
  if (err.detail?.error?.message) return err.detail.error.message;
  if (err.detail?.message) return err.detail.message;
  if (typeof err.detail === "string") return err.detail;
  if (err.message) return err.message;
  return fallback;
}

export function formatVnd(value) {
  const num = Number(value) || 0;
  return `${num.toLocaleString("vi-VN")} đ`;
}

export function formatShortMillion(value) {
  const num = Number(value) || 0;
  return `${(num / 1000000).toFixed(1)} Tr`;
}

export function formatDateVn(isoDate) {
  if (!isoDate) return "";
  const parts = isoDate.split("-");
  if (parts.length !== 3) return isoDate;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function todayIso() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function nowDateTimeStr() {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  return `${todayIso()} ${hh}:${mm}`;
}

// ============================================================================
// 1. USERS API (/api/v1/admin/users)
// ============================================================================
export const usersApi = {
  async list(params = {}) {
    try {
      const res = await client.get("/admin/users", { params });
      const items = res?.data?.items || [];
      writeStore(STORAGE_KEYS.users, items);
      return { items, mode: "api" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const all = readStore(STORAGE_KEYS.users, INITIAL_USERS);
      let items = [...all];
      if (params.search) {
        const kw = params.search.trim().toLowerCase();
        items = items.filter(
          (u) =>
            u.full_name.toLowerCase().includes(kw) ||
            u.email.toLowerCase().includes(kw) ||
            u.phone.toLowerCase().includes(kw) ||
            u.code.toLowerCase().includes(kw)
        );
      }
      if (params.role) items = items.filter((u) => u.role === params.role);
      if (params.status) items = items.filter((u) => u.status === params.status);
      return { items, mode: "local" };
    }
  },

  async create(payload) {
    try {
      const res = await client.post("/admin/users", payload);
      return { item: res.data, mode: "api", message: res.message || "Thêm người dùng thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.users, INITIAL_USERS);
      const email = payload.email.trim().toLowerCase();
      const phone = payload.phone.trim();
      if (list.some((u) => u.email.toLowerCase() === email)) {
        throw new Error("Địa chỉ email này đã tồn tại trong hệ thống.");
      }
      if (list.some((u) => u.phone.trim() === phone)) {
        throw new Error("Số điện thoại này đã được đăng ký.");
      }
      const nextId = Math.max(0, ...list.map((u) => u.id)) + 1;
      const item = {
        id: nextId,
        code: `USR-${String(nextId).padStart(3, "0")}`,
        full_name: payload.full_name.trim(),
        email: payload.email.trim(),
        phone,
        role: payload.role || "customer",
        status: payload.status || "active",
        created_at: todayIso(),
      };
      list.push(item);
      writeStore(STORAGE_KEYS.users, list);
      return { item, mode: "local", message: "Thêm người dùng mới thành công" };
    }
  },

  async update(id, payload) {
    try {
      const res = await client.put(`/admin/users/${id}`, payload);
      return { item: res.data, mode: "api", message: res.message || "Cập nhật người dùng thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.users, INITIAL_USERS);
      const idx = list.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Không tìm thấy người dùng.");
      const email = payload.email.trim().toLowerCase();
      const phone = payload.phone.trim();
      if (list.some((u) => u.id !== id && u.email.toLowerCase() === email)) {
        throw new Error("Địa chỉ email này đã được dùng bởi tài khoản khác.");
      }
      if (list.some((u) => u.id !== id && u.phone.trim() === phone)) {
        throw new Error("Số điện thoại này đã được dùng bởi tài khoản khác.");
      }
      list[idx] = {
        ...list[idx],
        full_name: payload.full_name.trim(),
        email: payload.email.trim(),
        phone,
        role: payload.role,
        status: payload.status,
      };
      writeStore(STORAGE_KEYS.users, list);
      return { item: list[idx], mode: "local", message: "Cập nhật thông tin người dùng thành công" };
    }
  },

  async updateStatus(id, status) {
    try {
      const res = await client.patch(`/admin/users/${id}/status`, { status });
      return { item: res.data, mode: "api", message: res.message || "Cập nhật trạng thái thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      if (id === 1 && status === "locked") {
        throw new Error("Không thể tự khóa tài khoản Admin đang đăng nhập.");
      }
      const list = readStore(STORAGE_KEYS.users, INITIAL_USERS);
      const idx = list.findIndex((u) => u.id === id);
      if (idx === -1) throw new Error("Không tìm thấy người dùng.");
      list[idx] = { ...list[idx], status };
      writeStore(STORAGE_KEYS.users, list);
      return { item: list[idx], mode: "local", message: status === "locked" ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản" };
    }
  },

  async remove(id) {
    try {
      const res = await client.delete(`/admin/users/${id}`);
      return { item: res.data, mode: "api", message: res.message || "Xóa người dùng thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      if (id === 1) throw new Error("Không thể xóa tài khoản Admin đang đăng nhập.");
      const list = readStore(STORAGE_KEYS.users, INITIAL_USERS);
      const next = list.filter((u) => u.id !== id);
      writeStore(STORAGE_KEYS.users, next);
      return { mode: "local", message: "Đã xóa người dùng thành công" };
    }
  },
};

// ============================================================================
// 2. BARBERS API (/api/v1/admin/barbers)
// ============================================================================
export const barbersApi = {
  async list(params = {}) {
    try {
      const res = await client.get("/admin/barbers", { params });
      const items = res?.data?.items || [];
      writeStore(STORAGE_KEYS.barbers, items);
      return { items, mode: "api" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      let items = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      if (params.search) {
        const kw = params.search.trim().toLowerCase();
        items = items.filter(
          (b) =>
            b.full_name.toLowerCase().includes(kw) ||
            b.specialty.toLowerCase().includes(kw) ||
            b.phone.toLowerCase().includes(kw) ||
            b.code.toLowerCase().includes(kw)
        );
      }
      if (params.status) items = items.filter((b) => b.status === params.status);
      return { items, mode: "local" };
    }
  },

  async create(payload) {
    try {
      const res = await client.post("/admin/barbers", payload);
      return { item: res.data, mode: "api", message: res.message || "Thêm Barber mới thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      const phone = payload.phone.trim();
      if (list.some((b) => b.phone.trim() === phone)) {
        throw new Error("Số điện thoại của Barber đã tồn tại trong hệ thống.");
      }
      const nextId = Math.max(0, ...list.map((b) => b.id)) + 1;
      const item = {
        id: nextId,
        code: `BB-${String(nextId).padStart(2, "0")}`,
        full_name: payload.full_name.trim(),
        phone,
        email: payload.email?.trim() || `barber${nextId}@barberhub.vn`,
        specialty: payload.specialty.trim(),
        experience_years: Number(payload.experience_years) || 1,
        rating: 5.0,
        completed_orders: 0,
        shift: payload.shift.trim() || "08:30 - 17:30",
        commission_rate: Number(payload.commission_rate) || 35,
        monthly_revenue: 0,
        status: payload.status || "available",
      };
      list.push(item);
      writeStore(STORAGE_KEYS.barbers, list);
      return { item, mode: "local", message: "Thêm Barber mới thành công" };
    }
  },

  async update(id, payload) {
    try {
      const res = await client.put(`/admin/barbers/${id}`, payload);
      return { item: res.data, mode: "api", message: res.message || "Cập nhật thông tin Barber thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      const idx = list.findIndex((b) => b.id === id);
      if (idx === -1) throw new Error("Không tìm thấy Barber.");
      const phone = payload.phone.trim();
      if (list.some((b) => b.id !== id && b.phone.trim() === phone)) {
        throw new Error("Số điện thoại này đã thuộc về Barber khác.");
      }
      list[idx] = {
        ...list[idx],
        full_name: payload.full_name.trim(),
        phone,
        email: payload.email?.trim() || list[idx].email,
        specialty: payload.specialty.trim(),
        experience_years: Number(payload.experience_years) || 0,
        shift: payload.shift.trim(),
        commission_rate: Number(payload.commission_rate) || list[idx].commission_rate,
        status: payload.status,
      };
      writeStore(STORAGE_KEYS.barbers, list);
      return { item: list[idx], mode: "local", message: "Cập nhật thông tin Barber thành công" };
    }
  },

  async updateStatus(id, status) {
    try {
      const res = await client.patch(`/admin/barbers/${id}/status`, { status });
      return { item: res.data, mode: "api", message: res.message || "Cập nhật trạng thái Barber thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      const idx = list.findIndex((b) => b.id === id);
      if (idx === -1) throw new Error("Không tìm thấy Barber.");
      list[idx] = { ...list[idx], status };
      writeStore(STORAGE_KEYS.barbers, list);
      return { item: list[idx], mode: "local", message: "Cập nhật trạng thái Barber thành công" };
    }
  },

  async remove(id) {
    try {
      const res = await client.delete(`/admin/barbers/${id}`);
      return { item: res.data, mode: "api", message: res.message || "Xóa Barber thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      writeStore(
        STORAGE_KEYS.barbers,
        list.filter((b) => b.id !== id)
      );
      return { mode: "local", message: "Xóa hồ sơ Barber thành công" };
    }
  },
};

function isFallbackError(err) {
  return (
    !err ||
    err.code === "NETWORK_ERROR" ||
    err.code === "UNKNOWN_ERROR" ||
    err.code === "HTTP_500" ||
    err.code === "HTTP_502" ||
    err.code === "HTTP_503"
  );
}

function inferServiceCategory(name = "") {
  const lower = name.toLowerCase();
  if (lower.includes("combo") || lower.includes("vip")) return "Combo VIP";
  if (lower.includes("uốn") || lower.includes("nhuộm") || lower.includes("tẩy")) return "Uốn & Nhuộm";
  if (lower.includes("râu") || lower.includes("da mặt") || lower.includes("gội")) return "Chăm sóc Râu & Da";
  return "Cắt & Tạo kiểu";
}

function mapServiceFromApi(svc, fallbackCategory) {
  const id = svc.service_id ?? svc.id;
  return {
    id,
    code: svc.code || `SV-${String(id).padStart(2, "0")}`,
    name: svc.name,
    category: fallbackCategory || svc.category || inferServiceCategory(svc.name),
    duration: Number(svc.duration) || 30,
    price: Number(svc.price) || 0,
    status: svc.is_active === false || svc.status === "hidden" ? "hidden" : "visible",
    description: svc.description || "",
  };
}

// ============================================================================
// 3. SERVICES API (/api/v1/services – gọi API thật, fallback localStorage khi chưa bật DB)
// ============================================================================
export const servicesApi = {
  async list(params = {}) {
    try {
      const res = await client.get("/services", {
        params: { include_inactive: true, limit: 100, ...params },
      });
      const rawItems = res?.items || res?.data?.items || [];
      const items = rawItems.map((s) => mapServiceFromApi(s));
      writeStore(STORAGE_KEYS.services, items);
      return { items, mode: "api" };
    } catch (err) {
      if (!isFallbackError(err)) throw new Error(extractErrorMessage(err));
      const items = readStore(STORAGE_KEYS.services, INITIAL_SERVICES);
      return { items, mode: "local" };
    }
  },

  async create(payload) {
    try {
      const res = await client.post(
        "/services",
        {
          name: payload.name.trim(),
          description: payload.description?.trim() || "",
          price: Number(payload.price) || 10000,
          duration: Number(payload.duration) || 30,
        },
        { headers: { "X-Role": "admin" } }
      );
      let item = mapServiceFromApi(res, payload.category);
      if (payload.status === "hidden") {
        const hiddenRes = await client.patch(
          `/services/${item.id}/status`,
          { is_active: false },
          { headers: { "X-Role": "admin" } }
        );
        item = mapServiceFromApi(hiddenRes, payload.category);
      }
      return { item, mode: "api", message: "Thêm dịch vụ mới thành công" };
    } catch (err) {
      if (!isFallbackError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.services, INITIAL_SERVICES);
      const nextId = Math.max(0, ...list.map((s) => s.id)) + 1;
      const item = {
        id: nextId,
        code: `SV-${String(nextId).padStart(2, "0")}`,
        name: payload.name.trim(),
        category: payload.category,
        duration: Number(payload.duration) || 30,
        price: Number(payload.price) || 0,
        status: payload.status || "visible",
        description: payload.description?.trim() || "",
      };
      list.push(item);
      writeStore(STORAGE_KEYS.services, list);
      return { item, mode: "local", message: "Thêm dịch vụ mới thành công" };
    }
  },

  async update(id, payload) {
    try {
      const res = await client.put(
        `/services/${id}`,
        {
          name: payload.name.trim(),
          description: payload.description?.trim() || "",
          price: Number(payload.price) || 10000,
          duration: Number(payload.duration) || 30,
          is_active: payload.status !== "hidden",
        },
        { headers: { "X-Role": "admin" } }
      );
      return {
        item: mapServiceFromApi(res, payload.category),
        mode: "api",
        message: "Cập nhật dịch vụ thành công",
      };
    } catch (err) {
      if (!isFallbackError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.services, INITIAL_SERVICES);
      const idx = list.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error("Không tìm thấy dịch vụ.");
      list[idx] = {
        ...list[idx],
        name: payload.name.trim(),
        category: payload.category,
        duration: Number(payload.duration) || 30,
        price: Number(payload.price) || 0,
        status: payload.status,
        description: payload.description?.trim() || "",
      };
      writeStore(STORAGE_KEYS.services, list);
      return { item: list[idx], mode: "local", message: "Cập nhật dịch vụ thành công" };
    }
  },

  async toggleStatus(id, currentStatus) {
    const nextIsActive = currentStatus === "hidden";
    try {
      const res = await client.patch(
        `/services/${id}/status`,
        { is_active: nextIsActive },
        { headers: { "X-Role": "admin" } }
      );
      const item = mapServiceFromApi(res);
      return {
        item,
        mode: "api",
        message: item.status === "visible" ? "Đã hiển thị dịch vụ trên web" : "Đã tạm ẩn dịch vụ",
      };
    } catch (err) {
      if (!isFallbackError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.services, INITIAL_SERVICES);
      const idx = list.findIndex((s) => s.id === id);
      if (idx === -1) throw new Error("Không tìm thấy dịch vụ.");
      const nextStatus = list[idx].status === "visible" ? "hidden" : "visible";
      list[idx] = { ...list[idx], status: nextStatus };
      writeStore(STORAGE_KEYS.services, list);
      return {
        item: list[idx],
        mode: "local",
        message: nextStatus === "visible" ? "Đã hiển thị dịch vụ trên web" : "Đã tạm ẩn dịch vụ",
      };
    }
  },

  async remove(id) {
    try {
      await client.delete(`/services/${id}`, { headers: { "X-Role": "admin" } });
      return { mode: "api", message: "Đã ẩn/xóa dịch vụ thành công" };
    } catch (err) {
      if (!isFallbackError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.services, INITIAL_SERVICES);
      writeStore(
        STORAGE_KEYS.services,
        list.filter((s) => s.id !== id)
      );
      return { mode: "local", message: "Đã xóa dịch vụ thành công" };
    }
  },
};

// ============================================================================
// 4. APPOINTMENTS API (/api/v1/admin/appointments)
// ============================================================================
export const appointmentsApi = {
  async list(params = {}) {
    try {
      const res = await client.get("/admin/appointments", { params });
      const items = res?.data?.items || [];
      writeStore(STORAGE_KEYS.appointments, items);
      return { items, mode: "api" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const items = readStore(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS);
      return { items, mode: "local" };
    }
  },

  async create(payload) {
    try {
      const res = await client.post("/admin/appointments", payload);
      return { item: res.data, mode: "api", message: res.message || "Tạo lịch hẹn mới thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS);
      const nextId = Math.max(0, ...list.map((a) => a.id)) + 1;
      const item = {
        id: nextId,
        code: `BK-2026-${String(100 + nextId)}`,
        customer_name: payload.customer_name.trim(),
        customer_phone: payload.customer_phone.trim(),
        barber_name: payload.barber_name.trim(),
        service_name: payload.service_name.trim(),
        date: payload.date,
        time: payload.time,
        price: Number(payload.price) || 0,
        status: payload.status || "pending",
        notes: payload.notes?.trim() || "",
      };
      list.unshift(item);
      writeStore(STORAGE_KEYS.appointments, list);
      return { item, mode: "local", message: "Tạo lịch hẹn mới thành công" };
    }
  },

  async update(id, payload) {
    try {
      const res = await client.put(`/admin/appointments/${id}`, payload);
      return { item: res.data, mode: "api", message: res.message || "Cập nhật lịch hẹn thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS);
      const idx = list.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error("Không tìm thấy lịch hẹn.");
      list[idx] = {
        ...list[idx],
        customer_name: payload.customer_name.trim(),
        customer_phone: payload.customer_phone.trim(),
        barber_name: payload.barber_name.trim(),
        service_name: payload.service_name.trim(),
        date: payload.date,
        time: payload.time,
        price: Number(payload.price) || 0,
        status: payload.status,
        notes: payload.notes?.trim() || "",
      };
      writeStore(STORAGE_KEYS.appointments, list);
      return { item: list[idx], mode: "local", message: "Cập nhật lịch hẹn thành công" };
    }
  },

  async updateStatus(id, status) {
    try {
      const res = await client.patch(`/admin/appointments/${id}/status`, { status });
      return { item: res.data, mode: "api", message: res.message || "Đã cập nhật trạng thái lịch hẹn" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS);
      const idx = list.findIndex((a) => a.id === id);
      if (idx === -1) throw new Error("Không tìm thấy lịch hẹn.");
      list[idx] = { ...list[idx], status };
      writeStore(STORAGE_KEYS.appointments, list);
      return { item: list[idx], mode: "local", message: "Đã cập nhật trạng thái lịch hẹn" };
    }
  },

  async remove(id) {
    try {
      const res = await client.delete(`/admin/appointments/${id}`);
      return { item: res.data, mode: "api", message: res.message || "Đã xóa lịch hẹn thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.appointments, INITIAL_APPOINTMENTS);
      writeStore(
        STORAGE_KEYS.appointments,
        list.filter((a) => a.id !== id)
      );
      return { mode: "local", message: "Đã xóa lịch hẹn thành công" };
    }
  },
};

// ============================================================================
// 5. INVOICES API (/api/v1/admin/invoices)
// ============================================================================
export const invoicesApi = {
  async list(params = {}) {
    try {
      const res = await client.get("/admin/invoices", { params });
      const items = res?.data?.items || [];
      writeStore(STORAGE_KEYS.invoices, items);
      return { items, mode: "api" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      let items = readStore(STORAGE_KEYS.invoices, INITIAL_INVOICES);
      if (params.search) {
        const kw = params.search.trim().toLowerCase();
        items = items.filter(
          (inv) =>
            inv.invoice_code.toLowerCase().includes(kw) ||
            inv.appointment_code.toLowerCase().includes(kw) ||
            inv.customer_name.toLowerCase().includes(kw) ||
            inv.customer_phone.toLowerCase().includes(kw) ||
            inv.barber_name.toLowerCase().includes(kw)
        );
      }
      if (params.status) items = items.filter((inv) => inv.payment_status === params.status);
      if (params.payment_method) items = items.filter((inv) => inv.payment_method === params.payment_method);
      return { items, mode: "local" };
    }
  },

  async create(payload) {
    try {
      const res = await client.post("/admin/invoices", payload);
      return { item: res.data, mode: "api", message: res.message || "Tạo hóa đơn mới thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.invoices, INITIAL_INVOICES);
      const nextId = Math.max(0, ...list.map((i) => i.id)) + 1;
      const subtotal = payload.items.reduce((sum, it) => sum + Number(it.quantity) * Number(it.unit_price), 0);
      const discount = Math.max(0, Number(payload.discount) || 0);
      const total = Math.max(0, subtotal - discount);
      const nowStr = nowDateTimeStr();
      const item = {
        id: nextId,
        invoice_code: `INV-2026-${String(nextId).padStart(3, "0")}`,
        appointment_code: payload.appointment_code?.trim() || `BK-2026-${100 + nextId}`,
        customer_name: payload.customer_name.trim(),
        customer_phone: payload.customer_phone.trim(),
        barber_name: payload.barber_name.trim(),
        created_at: nowStr,
        date: nowStr.split(" ")[0],
        payment_method: payload.payment_method || "transfer",
        payment_status: payload.payment_status || "paid",
        subtotal,
        discount,
        total,
        notes: payload.notes?.trim() || "",
        items: payload.items.map((it) => ({
          service_name: it.service_name.trim(),
          quantity: Number(it.quantity) || 1,
          unit_price: Number(it.unit_price) || 0,
        })),
      };
      list.unshift(item);
      writeStore(STORAGE_KEYS.invoices, list);
      return { item, mode: "local", message: "Tạo hóa đơn mới thành công" };
    }
  },

  async updateStatus(id, payload) {
    try {
      const res = await client.patch(`/admin/invoices/${id}/status`, payload);
      return { item: res.data, mode: "api", message: res.message || "Cập nhật trạng thái hóa đơn thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.invoices, INITIAL_INVOICES);
      const idx = list.findIndex((i) => i.id === id);
      if (idx === -1) throw new Error("Không tìm thấy hóa đơn.");
      list[idx] = {
        ...list[idx],
        payment_status: payload.payment_status,
        payment_method: payload.payment_method || list[idx].payment_method,
        notes: payload.notes !== undefined ? payload.notes : list[idx].notes,
      };
      writeStore(STORAGE_KEYS.invoices, list);
      return { item: list[idx], mode: "local", message: "Cập nhật hóa đơn thành công" };
    }
  },

  async remove(id) {
    try {
      const res = await client.delete(`/admin/invoices/${id}`);
      return { item: res.data, mode: "api", message: res.message || "Xóa hóa đơn thành công" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const list = readStore(STORAGE_KEYS.invoices, INITIAL_INVOICES);
      writeStore(
        STORAGE_KEYS.invoices,
        list.filter((i) => i.id !== id)
      );
      return { mode: "local", message: "Đã xóa hóa đơn thành công" };
    }
  },
};

// ============================================================================
// 6. REVENUE API (/api/v1/admin/revenue)
// ============================================================================
export const revenueApi = {
  async getStats(period = "month") {
    try {
      const res = await client.get("/admin/revenue", { params: { period } });
      return { data: res.data, mode: "api" };
    } catch (err) {
      if (!isNetworkError(err)) throw new Error(extractErrorMessage(err));
      const periodKey = REVENUE_CHARTS[period] ? period : "month";
      const chartData = REVENUE_CHARTS[periodKey];
      const totalRevenue = chartData.reduce((s, item) => s + item.revenue, 0);
      const totalOrders = chartData.reduce((s, item) => s + item.orders, 0);
      const barbers = readStore(STORAGE_KEYS.barbers, INITIAL_BARBERS);
      return {
        mode: "local",
        data: {
          period: periodKey,
          kpis: {
            total_revenue: totalRevenue,
            total_invoices: totalOrders,
            average_order_value: totalOrders ? Math.round(totalRevenue / totalOrders) : 0,
            growth_rate: periodKey === "7d" ? 9.4 : periodKey === "quarter" ? 18.2 : periodKey === "year" ? 24.5 : 14.8,
            estimated_profit: Math.round(totalRevenue * 0.42),
          },
          chart_data: chartData,
          by_service: [
            { category: "Combo VIP", revenue: Math.round(totalRevenue * 0.36), percent: 36 },
            { category: "Uốn & Nhuộm", revenue: Math.round(totalRevenue * 0.34), percent: 34 },
            { category: "Cắt & Tạo kiểu", revenue: Math.round(totalRevenue * 0.21), percent: 21 },
            { category: "Râu & Da mặt", revenue: Math.round(totalRevenue * 0.09), percent: 9 },
          ],
          by_barber: barbers.map((b) => ({
            barber_id: b.id,
            code: b.code,
            full_name: b.full_name,
            completed_orders: b.completed_orders,
            revenue: b.monthly_revenue || 0,
            commission_rate: b.commission_rate,
            commission_amount: Math.round(((b.monthly_revenue || 0) * (b.commission_rate || 0)) / 100),
          })),
          by_payment_method: [
            { method: "transfer", label: "Chuyển khoản VietQR", percent: 54, revenue: Math.round(totalRevenue * 0.54) },
            { method: "cash", label: "Tiền mặt", percent: 31, revenue: Math.round(totalRevenue * 0.31) },
            { method: "card", label: "Thẻ ngân hàng / POS", percent: 15, revenue: Math.round(totalRevenue * 0.15) },
          ],
        },
      };
    }
  },
};
