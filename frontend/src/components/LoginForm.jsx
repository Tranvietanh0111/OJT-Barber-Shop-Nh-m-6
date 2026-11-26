import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginForm.css";

/**
 * Sprint 2 - Ngày 6: Form đăng nhập và trạng thái lỗi (React)
 *
 * Tài khoản demo:
 *  - Admin:    admin@example.com / 123456
 *  - Customer: khach@example.com / 123456
 */

const DEMO_USERS = {
  "admin@example.com": {
    password: "123456",
    user: { id: 1, full_name: "Trần Văn Thắng", email: "admin@example.com", phone: "0901234567", role: "admin" },
    token: "demo-admin-token",
  },
  "khach@example.com": {
    password: "123456",
    user: { id: 4, full_name: "Hoàng Gia Huy", email: "khach@example.com", phone: "0987654321", role: "customer" },
    token: "customer-token",
  },
};
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
  const entry = DEMO_USERS[email.trim().toLowerCase()];
  return Boolean(entry && entry.password === password);
}

// ---------- Component ----------
export default function LoginForm() {
  const navigate = useNavigate();
  const auth = useAuth();
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
      const entry = DEMO_USERS[email.trim().toLowerCase()];
      setFailedAttempts(0);
      localStorage.setItem("access_token", entry.token);
      if (auth?.setUser) auth.setUser(entry.user);
      setBanner({ type: "success", text: "Đăng nhập thành công! Đang chuyển hướng..." });
      setTimeout(() => {
        navigate(entry.user.role === "admin" ? "/admin" : "/");
      }, 450);
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

        <p className="login-demo">
          Admin: <strong>admin@example.com</strong> / <strong>123456</strong>
          <br />
          Khách: <strong>khach@example.com</strong> / <strong>123456</strong>
        </p>
      </form>
    </div>
  );
}
