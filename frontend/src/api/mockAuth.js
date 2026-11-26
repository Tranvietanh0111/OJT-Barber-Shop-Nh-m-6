/**
 * Sprint 2 - Ngày 9/10: API giả lập (chỉ dùng khi VITE_USE_MOCK=true).
 * Trả về cùng hình dạng dữ liệu với API thật: { access_token, user }.
 *
 * Tài khoản test:
 *  - admin@example.com    / 123456 -> vai trò admin  (chuyển tới /admin)
 *  - barber@example.com   / 123456 -> vai trò barber (chuyển tới /barber)
 *  - customer@example.com / 123456 -> vai trò customer (chuyển tới /)
 *  - Mật khẩu sai           -> INVALID_CREDENTIALS
 *  - error@example.com      -> lỗi máy chủ (đăng nhập, đăng ký, quên mật khẩu)
 *  - exists@example.com     -> đăng ký trùng email
 *  - notfound@example.com   -> quên mật khẩu: email chưa đăng ký
 *  - Kiểm tra email: exists@example.com và 3 tài khoản demo ở trên là "đã đăng ký"
 */

export const DEMO_USERS = {
  "admin@example.com": { password: "123456", full_name: "Quản trị viên", role: "admin" },
  "barber@example.com": { password: "123456", full_name: "Thợ cắt tóc", role: "barber" },
  "customer@example.com": { password: "123456", full_name: "Khách hàng", role: "customer" },
};
export const FAKE_DELAY_MS = 1400;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const norm = (email) => email.trim().toLowerCase();

export function checkCredentials(email, password) {
  return DEMO_USERS[norm(email)]?.password === password;
}

const networkError = () => ({
  code: "NETWORK_ERROR",
  message: "Không thể kết nối đến máy chủ. Vui lòng thử lại sau.",
});

export async function mockLogin(email, password) {
  await wait(FAKE_DELAY_MS);
  if (norm(email) === "error@example.com") throw networkError();
  if (!checkCredentials(email, password)) {
    throw { code: "INVALID_CREDENTIALS", message: "Email hoặc mật khẩu không đúng." };
  }
  const u = DEMO_USERS[norm(email)];
  return {
    access_token: "demo-token",
    user: { email: norm(email), full_name: u.full_name, role: u.role },
  };
}

export async function mockRegister(values) {
  await wait(FAKE_DELAY_MS);
  const email = norm(values.email);
  if (email === "error@example.com") throw networkError();
  if (email === "exists@example.com") {
    throw { code: "EMAIL_EXISTS", message: "Email này đã được đăng ký." };
  }
  return { id: Date.now(), email };
}

const TAKEN_EMAILS = ["exists@example.com", ...Object.keys(DEMO_USERS)];

/** Trả về true nếu email còn dùng được (chưa ai đăng ký) */
export async function mockCheckEmail(email) {
  await wait(500);
  if (norm(email) === "error@example.com") throw networkError();
  return !TAKEN_EMAILS.includes(norm(email));
}

export async function mockForgotPassword(email) {
  await wait(FAKE_DELAY_MS);
  const value = norm(email);
  if (value === "error@example.com") throw networkError();
  if (value === "notfound@example.com") {
    throw { code: "EMAIL_NOT_FOUND", message: "Email này chưa được đăng ký." };
  }
  return { message: "Đã gửi liên kết đặt lại mật khẩu." };
}
