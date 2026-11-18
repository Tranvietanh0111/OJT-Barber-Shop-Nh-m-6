import { useEffect, useState } from "react";
import "./LoginForm.css";

/**
 * Sprint 2 - Ngày 6: Form đăng nhập và trạng thái lỗi (React)
 *
 * Tiêu chí nghiệm thu:
 *  1. Form có: Email, Mật khẩu, nút hiện/ẩn mật khẩu, nút Đăng nhập.
 *  2. Lỗi theo từng ô (viền đỏ + thông báo dưới ô):
 *     - Để trống email / mật khẩu
 *     - Email sai định dạng
 *     - Mật khẩu ngắn hơn 6 ký tự
 *  3. Lỗi chung (banner đỏ): sai email hoặc mật khẩu.
 *  4. Khóa tạm 30 giây sau 3 lần đăng nhập sai liên tiếp.
 *  5. Trạng thái thành công (banner xanh) khi đăng nhập đúng.
 *  6. Lỗi biến mất khi người dùng nhập lại.
 *
 * Tài khoản demo: admin@example.com / 123456
 */

const DEMO_USERS = { "admin@example.com": "123456" };
const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 30;
const MIN_PASSWORD_LEN = 6;
const EMAIL_RE = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;

// ---------- Logic (tách riêng để dễ kiểm thử) ----------
export function validateEmail(email) {
  if (!email.trim()) return "Vui lòng nhập email.";
  if (!EMAIL_RE.test(email.trim())) return "Email không đúng định dạng.";
  return "";
}

export function validatePassword(password) {
  if (!password) return "Vui lòng nhập mật khẩu.";
  if (password.length < MIN_PASSWORD_LEN)
    return `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LEN} ký tự.`;
  return "";
}

export function authenticate(email, password) {
  return DEMO_USERS[email.trim().toLowerCase()] === password;
}

// ---------- Component ----------
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [banner, setBanner] = useState({ type: "", text: "" });
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockLeft, setLockLeft] = useState(0);

  const locked = lockLeft > 0;

  // Đếm ngược khi bị khóa
  useEffect(() => {
    if (lockLeft <= 0) return;
    const timer = setTimeout(() => setLockLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [lockLeft]);

  useEffect(() => {
    if (locked) {
      setBanner({
        type: "error",
        text: `Quá nhiều lần thử sai. Thử lại sau ${lockLeft} giây.`,
      });
    } else if (failedAttempts >= MAX_ATTEMPTS) {
      // Hết thời gian khóa: reset
      setFailedAttempts(0);
      setBanner({ type: "", text: "" });
    }
  }, [lockLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    else setPassword(value);
    setErrors((prev) => ({ ...prev, [field]: "" }));
    if (!locked) setBanner({ type: "", text: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locked) return;

    const emailErr = validateEmail(email);
    const passErr = validatePassword(password);
    setErrors({ email: emailErr, password: passErr });

    if (emailErr || passErr) {
      setBanner({
        type: "error",
        text: "Vui lòng kiểm tra lại thông tin đã nhập.",
      });
      return;
    }

    if (authenticate(email, password)) {
      setFailedAttempts(0);
      setBanner({ type: "success", text: "Đăng nhập thành công!" });
      return;
    }

    const attempts = failedAttempts + 1;
    setFailedAttempts(attempts);
    if (attempts >= MAX_ATTEMPTS) {
      setLockLeft(LOCK_SECONDS);
    } else {
      setBanner({
        type: "error",
        text: `Email hoặc mật khẩu không đúng. Bạn còn ${
          MAX_ATTEMPTS - attempts
        } lần thử.`,
      });
    }
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit} noValidate>
        <h1>Đăng nhập</h1>
        <p className="login-subtitle">Chào mừng bạn quay lại</p>

        {banner.text && (
          <div className={`login-banner ${banner.type}`} role="alert">
            {banner.text}
          </div>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="ten@example.com"
          className={errors.email ? "input-error" : ""}
          onChange={(e) => handleChange("email", e.target.value)}
          aria-invalid={!!errors.email}
          disabled={locked}
        />
        <span className="field-error">{errors.email}</span>

        <label htmlFor="password">Mật khẩu</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="••••••"
          className={errors.password ? "input-error" : ""}
          onChange={(e) => handleChange("password", e.target.value)}
          aria-invalid={!!errors.password}
          disabled={locked}
        />
        <span className="field-error">{errors.password}</span>

        <label className="show-password">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Hiện mật khẩu
        </label>

        <button type="submit" className="login-btn" disabled={locked}>
          {locked ? `Thử lại sau ${lockLeft}s` : "Đăng nhập"}
        </button>

        <p className="login-demo">Demo: admin@example.com / 123456</p>
      </form>
    </div>
  );
}
