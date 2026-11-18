// Phụ trách: Vũ Quốc Khánh – Hồ sơ Barber: xem/sửa, có validation (dữ liệu mẫu, Sprint 2)
import { useState } from "react";
import { barberProfileMock, SPECIALTY_OPTIONS, SERVICE_OPTIONS } from "../../mocks/barberProfile";

const MIN_BIO = 20;
const MAX_BIO = 500;
const MAX_SPECIALTIES = 5;

const cardStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--gold-border)",
  borderRadius: "var(--radius-lg)",
  padding: "24px",
  boxShadow: "var(--shadow-card)",
};
const labelStyle = { display: "block", fontWeight: 700, marginBottom: "6px", color: "var(--text-primary)", fontSize: "14px" };
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid var(--border-medium)",
  background: "var(--bg-input)",
  color: "var(--text-primary)",
  fontSize: "14px",
};
const errorStyle = { color: "#dc2626", fontSize: "13px", marginTop: "6px" };
const hintStyle = { color: "var(--text-muted)", fontSize: "12px", marginTop: "6px" };

const formatPrice = (n) => n.toLocaleString("vi-VN") + "đ";

function validate(v) {
  const e = {};
  const name = v.fullName.trim();
  if (!name) e.fullName = "Vui lòng nhập họ tên";
  else if (name.length < 2 || name.length > 50) e.fullName = "Họ tên phải từ 2 đến 50 ký tự";

  const bio = v.bio.trim();
  if (!bio) e.bio = "Vui lòng nhập phần giới thiệu";
  else if (bio.length < MIN_BIO) e.bio = `Giới thiệu cần ít nhất ${MIN_BIO} ký tự`;
  else if (bio.length > MAX_BIO) e.bio = `Giới thiệu tối đa ${MAX_BIO} ký tự`;

  const years = v.yearsExperience.trim();
  if (years === "") e.yearsExperience = "Vui lòng nhập số năm kinh nghiệm";
  else if (!/^\d+$/.test(years) || Number(years) > 50) e.yearsExperience = "Nhập số nguyên từ 0 đến 50";

  if (v.specialties.length === 0) e.specialties = "Chọn ít nhất 1 chuyên môn";
  if (v.services.length === 0) e.services = "Chọn ít nhất 1 dịch vụ đảm nhận";
  return e;
}

function Avatar({ src, name, size = 96 }) {
  const initial = (name.trim().split(/\s+/).pop() || "?")[0].toUpperCase();
  if (src) {
    return (
      <img
        src={src}
        alt="Ảnh đại diện"
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", border: "3px solid var(--gold-primary)" }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--gold-gradient)",
        color: "#1f1300",
        fontWeight: 800,
        fontSize: size / 2.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {initial}
    </div>
  );
}

function Chip({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "6px 14px",
        borderRadius: "999px",
        border: selected ? "1px solid var(--gold-dark)" : "1px solid var(--border-medium)",
        background: selected ? "var(--gold-primary)" : "#ffffff",
        color: selected ? "#1f1300" : "var(--text-secondary)",
        fontWeight: 700,
        fontSize: "13px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function ReadChip({ children }) {
  return (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: "999px",
        background: "var(--warning-bg)",
        border: "1px solid var(--gold-border)",
        color: "#92400e",
        fontWeight: 700,
        fontSize: "13px",
      }}
    >
      {children}
    </span>
  );
}

export default function BarberProfile() {
  const [profile, setProfile] = useState(barberProfileMock);
  const [draft, setDraft] = useState(barberProfileMock);
  const [editing, setEditing] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [avatarError, setAvatarError] = useState("");
  const [notice, setNotice] = useState("");

  const errors = validate(draft);
  const showError = (field) => (touched[field] || submitted) && errors[field];
  const update = (field, value) => setDraft((d) => ({ ...d, [field]: value }));
  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const startEdit = () => {
    setDraft(profile);
    setTouched({});
    setSubmitted(false);
    setAvatarError("");
    setNotice("");
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setAvatarError("");
  };

  const toggleSpecialty = (item) => {
    touch("specialties");
    setDraft((d) => {
      if (d.specialties.includes(item)) return { ...d, specialties: d.specialties.filter((s) => s !== item) };
      if (d.specialties.length >= MAX_SPECIALTIES) return d;
      return { ...d, specialties: [...d.specialties, item] };
    });
  };

  const toggleService = (id) => {
    touch("services");
    setDraft((d) => ({
      ...d,
      services: d.services.includes(id) ? d.services.filter((s) => s !== id) : [...d.services, id],
    }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      setAvatarError("Chỉ chấp nhận ảnh PNG, JPG hoặc WEBP");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAvatarError("Ảnh tối đa 2MB");
      return;
    }
    setAvatarError("");
    const reader = new FileReader();
    reader.onload = () => update("avatar", reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0) return;
    setProfile({ ...draft, fullName: draft.fullName.trim(), bio: draft.bio.trim(), yearsExperience: draft.yearsExperience.trim() });
    setEditing(false);
    setNotice("✅ Đã lưu hồ sơ (dữ liệu mẫu, chưa gửi lên máy chủ)");
  };

  /* ---------- Chế độ xem ---------- */
  if (!editing) {
    const myServices = SERVICE_OPTIONS.filter((s) => profile.services.includes(s.id));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "900px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>Hồ sơ thợ cắt tóc</h1>
          <button className="btn btn-primary btn-sm" onClick={startEdit}>✏️ Chỉnh sửa hồ sơ</button>
        </div>

        {notice && (
          <div style={{ padding: "12px 16px", borderRadius: "10px", background: "var(--success-bg)", color: "#047857", fontWeight: 600 }}>
            {notice}
          </div>
        )}

        <div style={{ ...cardStyle, display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
          <Avatar src={profile.avatar} name={profile.fullName} />
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>{profile.fullName}</h2>
            <span className="badge badge-warning" style={{ marginTop: "8px" }}>🏅 {profile.yearsExperience} năm kinh nghiệm</span>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>Giới thiệu</h3>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>{profile.bio}</p>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Chuyên môn</h3>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {profile.specialties.map((s) => <ReadChip key={s}>{s}</ReadChip>)}
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>Dịch vụ đảm nhận</h3>
          {myServices.map((s) => (
            <div key={s.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--border-subtle)" }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{s.name}</span>
              <span style={{ color: "var(--gold-deep)", fontWeight: 800 }}>{formatPrice(s.price)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---------- Chế độ sửa ---------- */
  return (
    <form onSubmit={handleSave} noValidate style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "900px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>Chỉnh sửa hồ sơ</h1>

      <div style={{ ...cardStyle, display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center" }}>
        <Avatar src={draft.avatar} name={draft.fullName || "?"} />
        <div>
          <label className="btn btn-outline-gold btn-sm" style={{ cursor: "pointer" }}>
            📷 Chọn ảnh đại diện
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleAvatar} style={{ display: "none" }} />
          </label>
          {draft.avatar && (
            <button type="button" className="btn btn-secondary btn-sm" style={{ marginLeft: "8px" }} onClick={() => update("avatar", null)}>
              Xóa ảnh
            </button>
          )}
          <div style={hintStyle}>PNG, JPG hoặc WEBP, tối đa 2MB</div>
          {avatarError && <div style={errorStyle}>{avatarError}</div>}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Họ và tên *</label>
          <input
            style={inputStyle}
            value={draft.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            onBlur={() => touch("fullName")}
          />
          {showError("fullName") && <div style={errorStyle}>{errors.fullName}</div>}
        </div>

        <div style={{ marginBottom: "18px" }}>
          <label style={labelStyle}>Số năm kinh nghiệm *</label>
          <input
            style={{ ...inputStyle, maxWidth: "180px" }}
            inputMode="numeric"
            value={draft.yearsExperience}
            onChange={(e) => update("yearsExperience", e.target.value)}
            onBlur={() => touch("yearsExperience")}
          />
          {showError("yearsExperience") && <div style={errorStyle}>{errors.yearsExperience}</div>}
        </div>

        <div>
          <label style={labelStyle}>Giới thiệu bản thân *</label>
          <textarea
            rows={5}
            style={{ ...inputStyle, resize: "vertical" }}
            value={draft.bio}
            onChange={(e) => update("bio", e.target.value)}
            onBlur={() => touch("bio")}
          />
          <div style={hintStyle}>{draft.bio.trim().length}/{MAX_BIO} ký tự (tối thiểu {MIN_BIO})</div>
          {showError("bio") && <div style={errorStyle}>{errors.bio}</div>}
        </div>
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>Chuyên môn * (chọn tối đa {MAX_SPECIALTIES})</label>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {SPECIALTY_OPTIONS.map((s) => (
            <Chip key={s} selected={draft.specialties.includes(s)} onClick={() => toggleSpecialty(s)}>{s}</Chip>
          ))}
        </div>
        <div style={hintStyle}>Đã chọn {draft.specialties.length}/{MAX_SPECIALTIES}</div>
        {showError("specialties") && <div style={errorStyle}>{errors.specialties}</div>}
      </div>

      <div style={cardStyle}>
        <label style={labelStyle}>Dịch vụ đảm nhận *</label>
        {SERVICE_OPTIONS.map((s) => (
          <label
            key={s.id}
            style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderTop: "1px solid var(--border-subtle)", cursor: "pointer" }}
          >
            <input type="checkbox" checked={draft.services.includes(s.id)} onChange={() => toggleService(s.id)} />
            <span style={{ flex: 1, color: "var(--text-primary)", fontWeight: 600 }}>{s.name}</span>
            <span style={{ color: "var(--gold-deep)", fontWeight: 800 }}>{formatPrice(s.price)}</span>
          </label>
        ))}
        {showError("services") && <div style={errorStyle}>{errors.services}</div>}
      </div>

      <div style={{ display: "flex", gap: "12px" }}>
        <button type="submit" className="btn btn-primary">💾 Lưu hồ sơ</button>
        <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Hủy</button>
      </div>
    </form>
  );
}