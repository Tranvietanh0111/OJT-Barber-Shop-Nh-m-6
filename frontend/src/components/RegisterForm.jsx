import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import "./AuthStates.css";
import { checkEmail, register } from "../api/authApi";

/**
 * Sprint 1 - Ngày 5: Form đăng ký có validation phía giao diện (React)
 * Sprint 2 - Ngày 9: Các trạng thái loading, lỗi, thành công
 * Sprint 2 - Ngày 10: Sẵn sàng kết nối backend + luồng chuyển trang
 * Sprint 3 - Ngày 11: Kiểm tra email trùng ngay khi rời ô email (GET /auth/check-email):
 *   - Email đã đăng ký -> lỗi đỏ "Email này đã được đăng ký."
 *   - Email còn dùng được -> chữ xanh "✓ Email có thể sử dụng"
 *   - Không gọi được máy chủ -> bỏ qua, vẫn cho bấm Đăng ký (server kiểm tra lại)
 *   - Gọi qua api/authApi.js (VITE_USE_MOCK=true: dữ liệu giả, false: backend thật)
 *   - Thành công: tự chuyển sang /login; link "Đã có tài khoản? Đăng nhập"
 *
 * Tiêu chí nghiệm thu:
 *  1. Form có: Họ tên, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu,
 *     checkbox đồng ý điều khoản, nút Đăng ký.
 *  2. Validation theo từng ô (viền đỏ + thông báo dưới ô), kiểm tra khi blur và khi bấm Đăng ký.
 *  3. Có thanh đánh giá độ mạnh mật khẩu.
 *  4. LOADING: bấm Đăng ký hợp lệ -> nút hiện spinner "Đang đăng ký...",
 *     banner xanh dương "Đang tạo tài khoản...", khóa toàn bộ form (chống bấm nhiều lần).
 *  5. LỖI: email đã tồn tại (banner đỏ + lỗi dưới ô email); lỗi máy chủ (banner đỏ + nút "Thử lại").
 *  6. THÀNH CÔNG: banner xanh lá "Đăng ký thành công!" và form được làm trống.
 *
 * Email test: exists@example.com -> email đã tồn tại; error@example.com -> lỗi máy chủ
 */

const EMAIL_RE = /^[\w.+-]+@[\w-]+\.[\w.-]+$/;
const PHONE_RE = /^0\d{9}$/;
const NAME_RE = /^[\p{L}\s]+$/u;

// ---------- Logic validate (tách riêng để dễ kiểm thử) ----------
export function validateField(name, value, values = {}) {
  switch (name) {
    case "fullName": {
      const v = value.trim();
      if (!v) return "Vui lòng nhập họ và tên.";
      if (v.length < 2) return "Họ và tên phải có ít nhất 2 ký tự.";
      if (!NAME_RE.test(v)) return "Họ và tên chỉ được chứa chữ cái.";
      return "";
    }
    case "email": {
      const v = value.trim();
      if (!v) return "Vui lòng nhập email.";
      if (!EMAIL_RE.test(v)) return "Email không đúng định dạng.";
      return "";
    }
    case "phone": {
      const v = value.trim();
      if (!v) return "Vui lòng nhập số điện thoại.";
      if (!PHONE_RE.test(v))
        return "Số điện thoại gồm 10 số và bắt đầu bằng 0.";
      return "";
    }
    case "password": {
      if (!value) return "Vui lòng nhập mật khẩu.";
      if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
      if (!/[a-z]/.test(value)) return "Mật khẩu phải có chữ thường.";
      if (!/[A-Z]/.test(value)) return "Mật khẩu phải có chữ hoa.";
      if (!/\d/.test(value)) return "Mật khẩu phải có ít nhất 1 chữ số.";
      return "";
    }
    case "confirmPassword": {
      if (!value) return "Vui lòng xác nhận mật khẩu.";
      if (value !== values.password) return "Mật khẩu xác nhận không khớp.";
      return "";
    }
    case "agree":
      return value ? "" : "Bạn cần đồng ý với điều khoản sử dụng.";
    default:
      return "";
  }
}

export function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score; // 0..4
}

const STRENGTH_LABELS = ["", "Yếu", "Trung bình", "Khá", "Mạnh"];
const FIELDS = [
  "fullName",
  "email",
  "phone",
  "password",
  "confirmPassword",
  "agree",
];

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  agree: false,
};

// ---------- Component ----------
export default function RegisterForm() {
  const navigate = useNavigate();
  const redirectTimer = useRef(null);
  const checkedEmail = useRef(""); // email đang được kiểm tra, để bỏ kết quả cũ
  const [emailAvailable, setEmailAvailable] = useState(null); // null | true | false
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  // status: "idle" | "loading" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState(null); // { code, message }

  const loading = status === "loading";

  // Dọn timer chuyển trang khi rời khỏi trang
  useEffect(() => () => clearTimeout(redirectTimer.current), []);

  const setFieldError = (name, nextValues) => {
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, nextValues[name], nextValues),
    }));
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    if (name === "email") {
      checkedEmail.current = ""; // bỏ kết quả kiểm tra của email cũ
      setEmailAvailable(null);
    }
    if (!loading) {
      setStatus("idle");
      setServerError(null);
    }

    // Sau khi đã chạm vào ô thì kiểm tra ngay khi gõ để lỗi tự biến mất
    if (touched[name]) setFieldError(name, next);
    // Đổi mật khẩu thì kiểm tra lại ô xác nhận
    if (name === "password" && touched.confirmPassword)
      setFieldError("confirmPassword", next);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFieldError(name, values);

    // Email hợp lệ về định dạng thì hỏi server xem đã có người dùng chưa
    if (name === "email" && !validateField("email", values.email, values)) {
      const emailToCheck = values.email.trim();
      checkedEmail.current = emailToCheck;
      checkEmail(emailToCheck)
        .then((available) => {
          if (checkedEmail.current !== emailToCheck) return; // người dùng đã sửa email
          setEmailAvailable(available);
          if (!available) {
            setErrors((prev) => ({ ...prev, email: "Email này đã được đăng ký." }));
          }
        })
        .catch(() => setEmailAvailable(null)); // lỗi mạng: bỏ qua, server sẽ kiểm tra lại
    }
  };

  const sendRegister = async () => {
    setStatus("loading");
    setServerError(null);
    try {
      await register(values);
      setEmailAvailable(null);
      setStatus("success");
      setValues(initialValues);
      setTouched({});
      setErrors({});
      // Giữ banner thành công ~1,5 giây rồi chuyển sang trang đăng nhập
      redirectTimer.current = setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus("error");
      setServerError({
        code: err.code,
        message: err.message || "Đã xảy ra lỗi, vui lòng thử lại.",
      });
      if (err.code === "EMAIL_EXISTS") {
        setEmailAvailable(false);
        setErrors((prev) => ({ ...prev, email: err.message }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    const nextErrors = {};
    FIELDS.forEach((name) => {
      nextErrors[name] = validateField(name, values[name], values);
    });
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELDS.map((n) => [n, true])));

    const hasError = FIELDS.some((n) => nextErrors[n]);
    if (hasError) {
      setStatus("idle");
      setServerError(null);
      return;
    }
    sendRegister();
  };

  const strength = passwordStrength(values.password);
  const errorCount = FIELDS.filter((n) => errors[n]).length;
  const showValidationBanner =
    status === "idle" &&
    errorCount > 0 &&
    Object.keys(touched).length === FIELDS.length;

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: errors[name] ? "input-error" : "",
    "aria-invalid": !!errors[name],
    disabled: loading,
  });

  return (
    <div className="register-page">
      <form
        className="register-card"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={loading}
      >
        <h1>Đăng ký</h1>
        <p className="register-subtitle">Tạo tài khoản BarberHub của bạn</p>

        {loading && (
          <div className="register-banner loading" role="status">
            <span className="banner-spinner" aria-hidden="true" />
            <span>Đang tạo tài khoản...</span>
          </div>
        )}
        {status === "success" && (
          <div className="register-banner success" role="status">
            Đăng ký thành công! Đang chuyển đến trang đăng nhập...
          </div>
        )}
        {status === "error" && serverError && (
          <div className="register-banner error" role="alert">
            <span>{serverError.message}</span>
            {serverError.code !== "EMAIL_EXISTS" && (
              <button
                type="button"
                className="banner-retry"
                onClick={sendRegister}
              >
                Thử lại
              </button>
            )}
          </div>
        )}
        {showValidationBanner && (
          <div className="register-banner error" role="alert">
            Vui lòng kiểm tra lại {errorCount} thông tin chưa hợp lệ.
          </div>
        )}

        <label htmlFor="fullName">Họ và tên</label>
        <input
          {...inputProps("fullName")}
          type="text"
          placeholder="Nguyễn Văn A"
          autoComplete="name"
        />
        <span className="field-error">{errors.fullName}</span>

        <label htmlFor="email">Email</label>
        <input
          {...inputProps("email")}
          type="email"
          placeholder="ten@example.com"
          autoComplete="email"
        />
        {emailAvailable === true && !errors.email ? (
          <span className="field-ok">✓ Email có thể sử dụng</span>
        ) : (
          <span className="field-error">{errors.email}</span>
        )}

        <label htmlFor="phone">Số điện thoại</label>
        <input
          {...inputProps("phone")}
          type="tel"
          placeholder="0912345678"
          autoComplete="tel"
          inputMode="numeric"
        />
        <span className="field-error">{errors.phone}</span>

        <label htmlFor="password">Mật khẩu</label>
        <input
          {...inputProps("password")}
          type={showPassword ? "text" : "password"}
          placeholder="Ít nhất 8 ký tự"
          autoComplete="new-password"
        />
        {values.password && (
          <div className="strength">
            <div className="strength-bars">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={i <= strength ? `bar on level-${strength}` : "bar"}
                />
              ))}
            </div>
            <span className="strength-label">{STRENGTH_LABELS[strength]}</span>
          </div>
        )}
        <span className="field-error">{errors.password}</span>

        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input
          {...inputProps("confirmPassword")}
          type={showPassword ? "text" : "password"}
          placeholder="Nhập lại mật khẩu"
          autoComplete="new-password"
        />
        <span className="field-error">{errors.confirmPassword}</span>

        <label className="inline-check">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Hiện mật khẩu
        </label>

        <label className="inline-check agree">
          <input
            type="checkbox"
            name="agree"
            checked={values.agree}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.agree}
            disabled={loading}
          />
          <span>
            Tôi đồng ý với <Link to="/terms">điều khoản sử dụng</Link> và{" "}
            <Link to="/privacy">chính sách bảo mật</Link>
          </span>
        </label>
        <span className="field-error">{errors.agree}</span>

        <button
          type="submit"
          className="register-btn btn-loading"
          disabled={loading}
        >
          {loading && <span className="btn-spinner" aria-hidden="true" />}
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>

        <p className="register-links">
          <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
        </p>

        <p className="register-demo">
          Test: exists@example.com = email đã tồn tại · error@example.com = lỗi
          máy chủ
        </p>
      </form>
    </div>
  );
}
