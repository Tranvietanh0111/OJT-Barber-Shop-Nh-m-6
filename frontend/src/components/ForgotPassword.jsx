import { useEffect, useState } from "react";
import "./ForgotPassword.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_SECONDS = 60;
const TOAST_DURATION = 4000;

function validateEmail(value) {
  const email = value.trim();
  if (!email) return "Vui lòng nhập email.";
  if (!EMAIL_REGEX.test(email)) return "Email không hợp lệ.";
  return "";
}

/**
 * TODO: thay bằng gọi API backend thật, ví dụ:
 *   const res = await fetch("/api/auth/forgot-password", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ email }),
 *   });
 *   if (!res.ok) throw new Error((await res.json()).message);
 *
 * Đang giả lập:
 *  - notfound@example.com -> email chưa đăng ký
 *  - error@example.com    -> lỗi máy chủ
 */
function requestPasswordReset(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = email.trim().toLowerCase();
      if (value === "error@example.com") {
        reject(new Error("Lỗi máy chủ, vui lòng thử lại sau."));
      } else if (value === "notfound@example.com") {
        reject(new Error("Email này chưa được đăng ký."));
      } else {
        resolve();
      }
    }, 1200);
  });
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [toasts, setToasts] = useState([]);

  // Đếm ngược thời gian cho phép gửi lại
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const removeToast = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const showToast = (message, type = "info") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), TOAST_DURATION);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) setError(validateEmail(value));
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading || cooldown > 0) return;

    const validationError = validateEmail(email);
    setTouched(true);
    setError(validationError);
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
      setCooldown(RESEND_SECONDS);
      showToast(
        "Đã gửi liên kết đặt lại mật khẩu. Vui lòng kiểm tra email.",
        "success"
      );
    } catch (err) {
      showToast(err.message || "Có lỗi xảy ra, vui lòng thử lại.", "error");
    } finally {
      setLoading(false);
    }
  };

  const buttonLabel = loading
    ? "Đang gửi..."
    : cooldown > 0
    ? `Gửi lại sau ${cooldown}s`
    : sent
    ? "Gửi lại liên kết"
    : "Gửi liên kết đặt lại";

  return (
    <main className="fp-page">
      <form className="fp-card" onSubmit={handleSubmit} noValidate>
        <h1 className="fp-title">Quên mật khẩu?</h1>
        <p className="fp-desc">
          Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết để bạn đặt lại mật
          khẩu.
        </p>

        <label className="fp-label" htmlFor="fp-email">
          Email
        </label>
        <input
          id="fp-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="ten@example.com"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={loading}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "fp-email-error" : undefined}
          className={`fp-input ${error ? "fp-input--error" : ""}`}
        />
        {error && (
          <p id="fp-email-error" className="fp-error" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="fp-btn"
          disabled={loading || cooldown > 0}
        >
          {loading && <span className="fp-spinner" aria-hidden="true" />}
          {buttonLabel}
        </button>

        {sent && (
          <p className="fp-hint">
            Không thấy email? Kiểm tra thư mục spam hoặc gửi lại sau khi hết
            thời gian chờ.
          </p>
        )}

        <a className="fp-back" href="/login">
          ← Quay lại đăng nhập
        </a>
      </form>

      {/* Thông báo (toast) */}
      <div className="fp-toasts" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`fp-toast fp-toast--${t.type}`}
            role={t.type === "error" ? "alert" : "status"}
          >
            <span className="fp-toast__icon" aria-hidden="true">
              {t.type === "success" ? "✓" : t.type === "error" ? "!" : "i"}
            </span>
            <span className="fp-toast__msg">{t.message}</span>
            <button
              type="button"
              className="fp-toast__close"
              aria-label="Đóng thông báo"
              onClick={() => removeToast(t.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
