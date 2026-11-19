import { useState } from "react";
import "./RegisterForm.css";

/**
 * Sprint 1 - Ngày 5: Form đăng ký có validation phía giao diện (React)
 *
 * Tiêu chí nghiệm thu:
 *  1. Form có: Họ tên, Email, Số điện thoại, Mật khẩu, Xác nhận mật khẩu,
 *     checkbox đồng ý điều khoản, nút Đăng ký.
 *  2. Validation theo từng ô (viền đỏ + thông báo dưới ô):
 *     - Họ tên: bắt buộc, tối thiểu 2 ký tự, chỉ chứa chữ cái và khoảng trắng
 *     - Email: bắt buộc, đúng định dạng
 *     - Số điện thoại: bắt buộc, 10 số, bắt đầu bằng 0 (số Việt Nam)
 *     - Mật khẩu: tối thiểu 8 ký tự, có chữ hoa, chữ thường và số
 *     - Xác nhận mật khẩu: phải trùng với mật khẩu
 *     - Điều khoản: bắt buộc tích chọn
 *  3. Kiểm tra khi rời khỏi ô (blur) và khi bấm Đăng ký.
 *  4. Lỗi biến mất khi dữ liệu hợp lệ; có thanh đánh giá độ mạnh mật khẩu.
 *  5. Đăng ký hợp lệ: hiện banner xanh thành công (chưa gọi API).
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
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setSuccess(false);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    FIELDS.forEach((name) => {
      nextErrors[name] = validateField(name, values[name], values);
    });
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELDS.map((n) => [n, true])));

    const hasError = FIELDS.some((n) => nextErrors[n]);
    if (hasError) {
      setSuccess(false);
      return;
    }
    // TODO: gọi API đăng ký ở các sprint sau
    setSuccess(true);
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  const strength = passwordStrength(values.password);
  const errorCount = FIELDS.filter((n) => errors[n]).length;

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    className: errors[name] ? "input-error" : "",
    "aria-invalid": !!errors[name],
  });

  return (
    <div className="register-page">
      <form className="register-card" onSubmit={handleSubmit} noValidate>
        <h1>Đăng ký</h1>
        <p className="register-subtitle">Tạo tài khoản BarberHub của bạn</p>

        {success && (
          <div className="register-banner success" role="status">
            Đăng ký thành công! Dữ liệu hợp lệ.
          </div>
        )}
        {!success && errorCount > 0 && Object.keys(touched).length === FIELDS.length && (
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
        <span className="field-error">{errors.email}</span>

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
          />
          Tôi đồng ý với điều khoản sử dụng và chính sách bảo mật
        </label>
        <span className="field-error">{errors.agree}</span>

        <button type="submit" className="register-btn">
          Đăng ký
        </button>
      </form>
    </div>
  );
}
