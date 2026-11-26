// Phụ trách: Trần Văn Thắng
// Quản lý Barber – Đầy đủ Thêm, Sửa, Đổi trạng thái, Xóa, Tìm kiếm & Lọc (kết nối /api/v1/admin/barbers)
import { useCallback, useEffect, useRef, useState } from "react";
import { barbersApi } from "./adminApi";
import { AdminAlert, ConfirmDeleteModal } from "./AdminUiHelpers";
import "./admin.css";

const EMPTY_FORM = {
  full_name: "",
  phone: "",
  email: "",
  specialty: "",
  experience_years: 1,
  shift: "08:30 - 17:30",
  commission_rate: 35,
  status: "available",
};

const STATUS_META = {
  available: { label: "Sẵn sàng", cls: "adm-badge adm-badge-green", next: "busy" },
  busy: { label: "Đang bận", cls: "adm-badge adm-badge-blue", next: "off" },
  off: { label: "Nghỉ phép", cls: "adm-badge adm-badge-yellow", next: "inactive" },
  inactive: { label: "Ngừng hoạt động", cls: "adm-badge adm-badge-gray", next: "available" },
};

export default function BarberManagement() {
  const [barbers, setBarbers] = useState([]);
  const [mode, setMode] = useState("api");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingCode, setEditingCode] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const [notice, setNotice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const nameInputRef = useRef(null);

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
  }, []);

  const loadBarbers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await barbersApi.list({
        search: search || undefined,
        status: statusFilter || undefined,
      });
      setBarbers(res.items);
      setMode(res.mode);
    } catch (err) {
      showNotice("error", err.message || "Không thể tải danh sách Barber.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, showNotice]);

  useEffect(() => {
    loadBarbers();
  }, [loadBarbers]);

  const handleResetForm = () => {
    setEditingId(null);
    setEditingCode("");
    setForm(EMPTY_FORM);
  };

  const handleStartAdd = () => {
    handleResetForm();
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("barber-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleStartEdit = (barber) => {
    setEditingId(barber.id);
    setEditingCode(barber.code);
    setForm({
      full_name: barber.full_name || "",
      phone: barber.phone || "",
      email: barber.email || "",
      specialty: barber.specialty || "",
      experience_years: barber.experience_years ?? 1,
      shift: barber.shift || "08:30 - 17:30",
      commission_rate: barber.commission_rate ?? 35,
      status: barber.status || "available",
    });
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("barber-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.full_name.trim().length < 2) {
      showNotice("error", "Họ và tên Barber phải có ít nhất 2 ký tự.");
      return;
    }
    if (form.phone.trim().length < 8) {
      showNotice("error", "Số điện thoại phải có ít nhất 8 chữ số.");
      return;
    }
    if (form.specialty.trim().length < 2) {
      showNotice("error", "Vui lòng nhập chuyên môn chính của Barber.");
      return;
    }

    const payload = {
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      specialty: form.specialty.trim(),
      experience_years: Math.max(0, Number(form.experience_years) || 0),
      shift: form.shift.trim() || "08:30 - 17:30",
      commission_rate: Math.min(100, Math.max(0, Number(form.commission_rate) || 35)),
      status: form.status,
    };

    setSaving(true);
    try {
      const res = editingId
        ? await barbersApi.update(editingId, payload)
        : await barbersApi.create(payload);
      showNotice("success", res.message);
      handleResetForm();
      await loadBarbers();
    } catch (err) {
      showNotice("error", err.message || "Không thể lưu thông tin Barber.");
    } finally {
      setSaving(false);
    }
  };

  const handleCycleStatus = async (barber) => {
    const meta = STATUS_META[barber.status] || STATUS_META.available;
    const nextStatus = meta.next;
    try {
      const res = await barbersApi.updateStatus(barber.id, nextStatus);
      showNotice("success", `${res.message} (${STATUS_META[nextStatus].label})`);
      if (editingId === barber.id) {
        setForm((prev) => ({ ...prev, status: nextStatus }));
      }
      await loadBarbers();
    } catch (err) {
      showNotice("error", err.message || "Không thể đổi trạng thái Barber.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await barbersApi.remove(deleteTarget.id);
      showNotice("success", res.message);
      if (editingId === deleteTarget.id) handleResetForm();
      setDeleteTarget(null);
      await loadBarbers();
    } catch (err) {
      showNotice("error", err.message || "Không thể xóa Barber.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý Barber</h1>
            <p className="adm-page-subtitle">Danh sách đội ngũ thợ, thêm mới, chỉnh sửa, đổi trạng thái và xóa hồ sơ</p>
          </div>
          <div className="adm-topbar-actions">
            <span className="adm-mode-badge" title="Nguồn dữ liệu hiện tại">
              <span className={`adm-mode-dot ${mode === "local" ? "local" : ""}`} />
              {mode === "api" ? "API FastAPI" : "Dữ liệu cục bộ"}
            </span>
            <button type="button" className="adm-btn adm-btn-gold" onClick={handleStartAdd}>
              + Thêm Barber mới
            </button>
          </div>
        </header>

        <div className="adm-content">
          <AdminAlert notice={notice} onClose={() => setNotice(null)} />

          <div className="adm-toolbar">
            <div className="adm-filters">
              <input
                type="text"
                className="adm-input adm-search-input"
                placeholder="Tìm theo mã BB, tên Barber, chuyên môn, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="adm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái Barber</option>
                <option value="available">Sẵn sàng đón khách</option>
                <option value="busy">Đang phục vụ khách</option>
                <option value="off">Nghỉ ca / Nghỉ phép</option>
                <option value="inactive">Ngừng hoạt động</option>
              </select>
              {(search || statusFilter) && (
                <button
                  type="button"
                  className="adm-btn adm-btn-outline"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("");
                  }}
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách Barber ({barbers.length})</h3>
                  <p className="adm-card-subtitle">Thông tin chuyên môn, ca làm việc, hoa hồng và trạng thái</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên Barber & Chuyên môn</th>
                      <th>Kinh nghiệm</th>
                      <th>Ca làm việc</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Đang tải danh sách Barber...
                        </td>
                      </tr>
                    ) : barbers.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Không có Barber nào phù hợp bộ lọc.
                        </td>
                      </tr>
                    ) : (
                      barbers.map((barber) => {
                        const statusInfo = STATUS_META[barber.status] || STATUS_META.available;
                        return (
                          <tr key={barber.id} className={editingId === barber.id ? "adm-row-selected" : ""}>
                            <td>
                              <strong>{barber.code}</strong>
                            </td>
                            <td>
                              <div className="adm-cell-title">{barber.full_name}</div>
                              <div className="adm-cell-sub">
                                {barber.specialty} • {barber.phone}
                              </div>
                            </td>
                            <td>
                              {barber.experience_years} năm (⭐ {barber.rating ?? 5.0})
                            </td>
                            <td>
                              <div>{barber.shift}</div>
                              <div className="adm-cell-sub">Hoa hồng {barber.commission_rate ?? 35}%</div>
                            </td>
                            <td>
                              <span className={statusInfo.cls}>{statusInfo.label}</span>
                            </td>
                            <td>
                              <div className="adm-actions-cell">
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-outline adm-btn-sm"
                                  onClick={() => handleStartEdit(barber)}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-primary adm-btn-sm"
                                  onClick={() => handleCycleStatus(barber)}
                                  title="Chuyển nhanh sang trạng thái tiếp theo"
                                >
                                  Đổi TT
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => setDeleteTarget(barber)}
                                >
                                  Xóa
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card" id="barber-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">{editingId ? "Cập nhật hồ sơ Barber" : "Thêm Barber mới"}</h3>
                  <p className="adm-card-subtitle">
                    {editingId
                      ? `Đang chỉnh sửa hồ sơ mã ${editingCode}`
                      : "Nhập thông tin chuyên môn, ca làm việc và trạng thái Barber"}
                  </p>
                </div>
                {editingId && <span className="adm-editing-tag">{editingCode}</span>}
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label htmlFor="bb-name">Họ và tên Barber *</label>
                  <input
                    id="bb-name"
                    ref={nameInputRef}
                    type="text"
                    className="adm-input"
                    placeholder="VD: Nguyễn Hoàng Nam"
                    value={form.full_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="bb-phone">Số điện thoại *</label>
                    <input
                      id="bb-phone"
                      type="text"
                      className="adm-input"
                      placeholder="VD: 0912345678"
                      value={form.phone}
                      onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="bb-email">Email liên hệ</label>
                    <input
                      id="bb-email"
                      type="email"
                      className="adm-input"
                      placeholder="barber@barberhub.vn"
                      value={form.email}
                      onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="adm-form-group">
                  <label htmlFor="bb-specialty">Chuyên môn chính *</label>
                  <input
                    id="bb-specialty"
                    type="text"
                    className="adm-input"
                    placeholder="VD: Skin Fade & Pompadour cổ điển"
                    value={form.specialty}
                    onChange={(e) => setForm((prev) => ({ ...prev, specialty: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="bb-exp">Kinh nghiệm (năm)</label>
                    <input
                      id="bb-exp"
                      type="number"
                      min={0}
                      max={50}
                      className="adm-input"
                      value={form.experience_years}
                      onChange={(e) => setForm((prev) => ({ ...prev, experience_years: e.target.value }))}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="bb-commission">Hoa hồng (%)</label>
                    <input
                      id="bb-commission"
                      type="number"
                      min={0}
                      max={100}
                      className="adm-input"
                      value={form.commission_rate}
                      onChange={(e) => setForm((prev) => ({ ...prev, commission_rate: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="bb-shift">Ca làm việc</label>
                    <input
                      id="bb-shift"
                      type="text"
                      className="adm-input"
                      placeholder="08:30 - 17:30"
                      value={form.shift}
                      onChange={(e) => setForm((prev) => ({ ...prev, shift: e.target.value }))}
                    />
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="bb-status">Trạng thái Barber</label>
                    <select
                      id="bb-status"
                      className="adm-select"
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="available">Sẵn sàng đón khách</option>
                      <option value="busy">Đang phục vụ khách</option>
                      <option value="off">Nghỉ ca / Nghỉ phép</option>
                      <option value="inactive">Ngừng hoạt động</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                  <button type="submit" className="adm-btn adm-btn-gold" disabled={saving}>
                    {saving ? "Đang lưu..." : editingId ? "Cập nhật Barber" : "Thêm Barber mới"}
                  </button>
                  <button type="button" className="adm-btn adm-btn-outline" onClick={handleResetForm} disabled={saving}>
                    {editingId ? "Hủy chỉnh sửa" : "Làm mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Xác nhận xóa Barber"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa hồ sơ Barber "${deleteTarget.full_name}" (${deleteTarget.code})?`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
