// Phụ trách: Trần Văn Thắng
// Quản lý người dùng – Đầy đủ Thêm, Sửa, Khóa/Mở khóa, Xóa, Tìm kiếm & Lọc (kết nối /api/v1/admin/users)
import { useCallback, useEffect, useRef, useState } from "react";
import { usersApi } from "./adminApi";
import { AdminAlert, ConfirmDeleteModal } from "./AdminUiHelpers";
import "./admin.css";

const EMPTY_FORM = {
  full_name: "",
  email: "",
  phone: "",
  role: "customer",
  status: "active",
};

const ROLE_LABELS = {
  admin: { text: "Admin", cls: "adm-badge adm-badge-purple" },
  barber: { text: "Barber", cls: "adm-badge adm-badge-blue" },
  customer: { text: "Customer", cls: "adm-badge adm-badge-green" },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [mode, setMode] = useState("api");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Bộ lọc
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Form Thêm / Sửa
  const [editingId, setEditingId] = useState(null);
  const [editingCode, setEditingCode] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  // Thông báo & Xác nhận xóa
  const [notice, setNotice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const nameInputRef = useRef(null);

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await usersApi.list({
        search: search || undefined,
        role: roleFilter || undefined,
        status: statusFilter || undefined,
      });
      setUsers(res.items);
      setMode(res.mode);
    } catch (err) {
      showNotice("error", err.message || "Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  }, [search, roleFilter, statusFilter, showNotice]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleResetForm = () => {
    setEditingId(null);
    setEditingCode("");
    setForm(EMPTY_FORM);
  };

  const handleStartAdd = () => {
    handleResetForm();
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("user-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleStartEdit = (user) => {
    setEditingId(user.id);
    setEditingCode(user.code);
    setForm({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "customer",
      status: user.status || "active",
    });
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("user-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = form.full_name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();

    if (fullName.length < 2) {
      showNotice("error", "Họ và tên phải có ít nhất 2 ký tự.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      showNotice("error", "Địa chỉ email không đúng định dạng.");
      return;
    }
    if (phone.length < 8) {
      showNotice("error", "Số điện thoại phải có ít nhất 8 chữ số.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        const res = await usersApi.update(editingId, {
          full_name: fullName,
          email,
          phone,
          role: form.role,
          status: form.status,
        });
        showNotice("success", res.message);
      } else {
        const res = await usersApi.create({
          full_name: fullName,
          email,
          phone,
          role: form.role,
          status: form.status,
        });
        showNotice("success", res.message);
      }
      handleResetForm();
      await loadUsers();
    } catch (err) {
      showNotice("error", err.message || "Không thể lưu thông tin người dùng.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleLock = async (user) => {
    const nextStatus = user.status === "active" ? "locked" : "active";
    try {
      const res = await usersApi.updateStatus(user.id, nextStatus);
      showNotice("success", res.message);
      if (editingId === user.id) {
        setForm((prev) => ({ ...prev, status: nextStatus }));
      }
      await loadUsers();
    } catch (err) {
      showNotice("error", err.message || "Không thể cập nhật trạng thái.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await usersApi.remove(deleteTarget.id);
      showNotice("success", res.message);
      if (editingId === deleteTarget.id) handleResetForm();
      setDeleteTarget(null);
      await loadUsers();
    } catch (err) {
      showNotice("error", err.message || "Không thể xóa người dùng.");
    } finally {
      setDeleting(false);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setRoleFilter("");
    setStatusFilter("");
  };

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý người dùng</h1>
            <p className="adm-page-subtitle">Tìm kiếm, lọc, thêm mới, chỉnh sửa, khóa/mở khóa và xóa tài khoản</p>
          </div>
          <div className="adm-topbar-actions">
            <span className="adm-mode-badge" title="Nguồn dữ liệu hiện tại">
              <span className={`adm-mode-dot ${mode === "local" ? "local" : ""}`} />
              {mode === "api" ? "API FastAPI" : "Dữ liệu cục bộ"}
            </span>
            <button type="button" className="adm-btn adm-btn-gold" onClick={handleStartAdd}>
              + Thêm người dùng
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
                placeholder="Tìm kiếm theo mã USR, họ tên, email, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="adm-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="">Tất cả vai trò</option>
                <option value="admin">Quản trị viên (Admin)</option>
                <option value="barber">Thợ cắt tóc (Barber)</option>
                <option value="customer">Khách hàng (Customer)</option>
              </select>
              <select className="adm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="locked">Đang tạm khóa</option>
              </select>
              {(search || roleFilter || statusFilter) && (
                <button type="button" className="adm-btn adm-btn-outline" onClick={handleResetFilters}>
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          <div className="adm-grid-2">
            <div className="adm-card">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">Danh sách người dùng ({users.length})</h3>
                  <p className="adm-card-subtitle">Quản lý thông tin, phân quyền và trạng thái hoạt động</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Họ tên & Email</th>
                      <th>SĐT</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Đang tải danh sách người dùng...
                        </td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Không tìm thấy người dùng nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => {
                        const roleInfo = ROLE_LABELS[user.role] || ROLE_LABELS.customer;
                        const isMainAdmin = user.id === 1;
                        return (
                          <tr key={user.id} className={editingId === user.id ? "adm-row-selected" : ""}>
                            <td>
                              <strong>{user.code}</strong>
                            </td>
                            <td>
                              <div className="adm-cell-title">{user.full_name}</div>
                              <div className="adm-cell-sub">{user.email}</div>
                            </td>
                            <td>{user.phone}</td>
                            <td>
                              <span className={roleInfo.cls}>{roleInfo.text}</span>
                            </td>
                            <td>
                              <span className={`adm-badge ${user.status === "active" ? "adm-badge-green" : "adm-badge-red"}`}>
                                {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                              </span>
                            </td>
                            <td>
                              <div className="adm-actions-cell">
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-outline adm-btn-sm"
                                  onClick={() => handleStartEdit(user)}
                                >
                                  Sửa
                                </button>
                                {!isMainAdmin && (
                                  <>
                                    <button
                                      type="button"
                                      className={`adm-btn adm-btn-sm ${
                                        user.status === "active" ? "adm-btn-danger" : "adm-btn-success"
                                      }`}
                                      onClick={() => handleToggleLock(user)}
                                    >
                                      {user.status === "active" ? "Khóa" : "Mở khóa"}
                                    </button>
                                    <button
                                      type="button"
                                      className="adm-btn adm-btn-danger adm-btn-sm"
                                      onClick={() => setDeleteTarget(user)}
                                    >
                                      Xóa
                                    </button>
                                  </>
                                )}
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

            <div className="adm-card" id="user-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">
                    {editingId ? `Chỉnh sửa người dùng` : "Thêm người dùng mới"}
                  </h3>
                  <p className="adm-card-subtitle">
                    {editingId
                      ? `Đang cập nhật hồ sơ mã ${editingCode}`
                      : "Điền thông tin để tạo tài khoản mới trong hệ thống"}
                  </p>
                </div>
                {editingId && <span className="adm-editing-tag">{editingCode}</span>}
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label htmlFor="usr-fullname">Họ và tên *</label>
                  <input
                    id="usr-fullname"
                    ref={nameInputRef}
                    type="text"
                    className="adm-input"
                    placeholder="VD: Nguyễn Văn An"
                    value={form.full_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, full_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label htmlFor="usr-email">Email *</label>
                  <input
                    id="usr-email"
                    type="email"
                    className="adm-input"
                    placeholder="VD: vanan@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label htmlFor="usr-phone">Số điện thoại *</label>
                  <input
                    id="usr-phone"
                    type="text"
                    className="adm-input"
                    placeholder="VD: 0987654321"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="usr-role">Vai trò</label>
                    <select
                      id="usr-role"
                      className="adm-select"
                      value={form.role}
                      onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
                    >
                      <option value="customer">Khách hàng (Customer)</option>
                      <option value="barber">Thợ cắt (Barber)</option>
                      <option value="admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="usr-status">Trạng thái</label>
                    <select
                      id="usr-status"
                      className="adm-select"
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                      disabled={editingId === 1}
                    >
                      <option value="active">Hoạt động</option>
                      <option value="locked">Tạm khóa</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
                  <button type="submit" className="adm-btn adm-btn-gold" disabled={saving}>
                    {saving ? "Đang lưu..." : editingId ? "Cập nhật người dùng" : "Thêm người dùng"}
                  </button>
                  <button type="button" className="adm-btn adm-btn-outline" onClick={handleResetForm} disabled={saving}>
                    {editingId ? "Hủy chỉnh sửa" : "Làm mới form"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Xác nhận xóa người dùng"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa tài khoản "${deleteTarget.full_name}" (${deleteTarget.code})? Thao tác này không thể hoàn tác.`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
