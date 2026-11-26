// Lưu nháp quy trình đặt lịch của người vãng lai (không cần đăng nhập)
// Đồng bộ danh sách dịch vụ, Barber và lịch hẹn với phân hệ Admin (adminApi.js)
const DRAFT_KEY = "barberhub_guest_booking_draft_v1";
const LAST_BOOKING_KEY = "barberhub_guest_last_booking_v1";

const DEFAULT_DRAFT = {
  service_id: null,
  service_name: "",
  service_category: "",
  service_duration: 45,
  price: 0,
  barber_id: null,
  barber_name: "",
  barber_specialty: "",
  date: "",
  time: "",
  customer_name: "",
  customer_phone: "",
  notes: "",
};

export function getTodayIso() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getBookingDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return { ...DEFAULT_DRAFT, date: getTodayIso() };
    return { ...DEFAULT_DRAFT, date: getTodayIso(), ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_DRAFT, date: getTodayIso() };
  }
}

export function saveBookingDraft(patch) {
  const next = { ...getBookingDraft(), ...patch };
  try {
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function clearBookingDraft() {
  try {
    sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}

export function saveLastBooking(booking) {
  try {
    sessionStorage.setItem(LAST_BOOKING_KEY, JSON.stringify(booking));
  } catch {
    // ignore
  }
}

export function getLastBooking() {
  try {
    const raw = sessionStorage.getItem(LAST_BOOKING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const TIME_SLOTS = [
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];
