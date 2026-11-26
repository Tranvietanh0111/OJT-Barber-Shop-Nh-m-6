/**
 * Sprint 2 - Ngày 10: Lớp API xác thực - các form chỉ gọi file này.
 * Sprint 3 - Ngày 11: nối backend thật (POST /auth/register, GET /auth/check-email).
 *
 * Chuyển giữa dữ liệu giả và backend thật bằng biến môi trường (frontend/.env):
 *   VITE_USE_MOCK=true    -> dùng mockAuth.js (mặc định, chạy được khi chưa có backend)
 *   VITE_USE_MOCK=false   -> gọi backend thật qua api/client.js (VITE_API_BASE_URL)
 *
 * HỢP ĐỒNG API ĐỀ XUẤT cho backend (routers/auth.py, prefix /api/v1):
 *   POST /auth/login            body { email, password }
 *        200 -> { access_token, user: { email, full_name, role } }
 *        401 -> sai email hoặc mật khẩu
 *   POST /auth/register         body { full_name, email, phone, password }
 *        201 -> { id, email }
 *        409 -> email đã tồn tại
 *   GET  /auth/check-email?email=...   200 -> { data: { email, available } }
 *   POST /auth/forgot-password  body { email }
 *        200 -> { message }
 *        404 -> email chưa đăng ký
 * Backend bọc kết quả dạng { success, message, data } và lỗi dạng
 * { success:false, error:{ code, message } } (docs/API_CONVENTIONS.md);
 * lớp này tự bóc lấy `data` nên form không cần biết.
 * `role` là một trong: "admin" | "barber" | "customer".
 *
 * Mọi hàm ném lỗi dạng { code, message } với code chuẩn của form:
 *   INVALID_CREDENTIALS | EMAIL_EXISTS | EMAIL_NOT_FOUND | NETWORK_ERROR | khác
 *   (backend trả EMAIL_ALREADY_EXISTS -> đổi thành EMAIL_EXISTS)
 */
import {
  mockCheckEmail,
  mockForgotPassword,
  mockLogin,
  mockRegister,
} from "./mockAuth";

const USE_MOCK = import.meta.env?.VITE_USE_MOCK !== "false";

// client.js đã chuẩn hóa lỗi thành { code: "HTTP_401", message } -> đổi sang mã của form
function mapError(err, map) {
  const code = map[err?.code] || err?.code || "UNKNOWN_ERROR";
  return { code, message: err?.message || "Đã xảy ra lỗi, vui lòng thử lại." };
}

// client.js trả về nguyên body { success, message, data } -> lấy phần data
const unwrap = (res) => (res && res.data !== undefined ? res.data : res);

async function getClient() {
  const { default: client } = await import("./client"); // chỉ nạp axios khi dùng backend thật
  return client;
}

export async function login(email, password) {
  if (USE_MOCK) return mockLogin(email, password);
  try {
    const client = await getClient();
    return unwrap(
      await client.post("/auth/login", { email: email.trim(), password })
    );
  } catch (err) {
    throw mapError(err, { HTTP_401: "INVALID_CREDENTIALS" });
  }
}

export async function register(values) {
  if (USE_MOCK) return mockRegister(values);
  try {
    const client = await getClient();
    return unwrap(
      await client.post("/auth/register", {
        full_name: values.fullName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      })
    );
  } catch (err) {
    throw mapError(err, {
      EMAIL_ALREADY_EXISTS: "EMAIL_EXISTS",
      HTTP_409: "EMAIL_EXISTS",
    });
  }
}

/** Kiểm tra email còn dùng được không. Trả về true/false; ném lỗi nếu không gọi được. */
export async function checkEmail(email) {
  if (USE_MOCK) return mockCheckEmail(email);
  try {
    const client = await getClient();
    const data = unwrap(
      await client.get("/auth/check-email", { params: { email: email.trim() } })
    );
    return Boolean(data?.available);
  } catch (err) {
    throw mapError(err, {});
  }
}

export async function forgotPassword(email) {
  if (USE_MOCK) return mockForgotPassword(email);
  try {
    const client = await getClient();
    return unwrap(
      await client.post("/auth/forgot-password", { email: email.trim() })
    );
  } catch (err) {
    throw mapError(err, { HTTP_404: "EMAIL_NOT_FOUND" });
  }
}

// ---------- Phiên đăng nhập & điều hướng ----------
/** Lưu token (client.js đọc "access_token" để gắn vào header) */
export function saveToken(token) {
  try {
    localStorage.setItem("access_token", token);
  } catch {
    /* trình duyệt chặn lưu trữ: bỏ qua */
  }
}

/** Trang đích sau khi đăng nhập, theo vai trò (khớp routes/index.jsx) */
export function homePathFor(user) {
  if (user?.role === "admin") return "/admin";
  if (user?.role === "barber") return "/barber";
  return "/";
}
