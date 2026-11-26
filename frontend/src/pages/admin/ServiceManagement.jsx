// Phụ trách: Trần Văn Thắng
// Quản lý dịch vụ – Đầy đủ Thêm, Sửa, Ẩn/Hiện, Xóa, Tìm kiếm & Lọc
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatVnd, servicesApi } from "./adminApi";
import { AdminAlert, ConfirmDeleteModal } from "./AdminUiHelpers";
import "./admin.css";

const CATEGORIES = ["Cắt & Tạo kiểu", "Combo VIP", "Uốn & Nhuộm", "Chăm sóc Râu & Da"];

const EMPTY_FORM = {
  name: "",
  category: "Combo VIP",
  duration: 45,
  price: 120000,
  status: "visible",
  description: "",
};

export default function ServiceManagement() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
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

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await servicesApi.list();
      setServices(res.items);
    } catch (err) {
      showNotice("error", err.message || "Không thể tải danh sách dịch vụ.");
    } finally {
      setLoading(false);
    }
  }, [showNotice]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const filteredServices = useMemo(() => {
    return services.filter((svc) => {
      if (search.trim()) {
        const kw = search.trim().toLowerCase();
        const hit =
          svc.name.toLowerCase().includes(kw) ||
          svc.code.toLowerCase().includes(kw) ||
          svc.category.toLowerCase().includes(kw);
        if (!hit) return false;
      }
      if (categoryFilter && svc.category !== categoryFilter) return false;
      if (statusFilter && svc.status !== statusFilter) return false;
      return true;
    });
  }, [services, search, categoryFilter, statusFilter]);

  const handleResetForm = () => {
    setEditingId(null);
    setEditingCode("");
    setForm(EMPTY_FORM);
  };

  const handleStartAdd = () => {
    handleResetForm();
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleStartEdit = (svc) => {
    setEditingId(svc.id);
    setEditingCode(svc.code);
    setForm({
      name: svc.name || "",
      category: svc.category || CATEGORIES[0],
      duration: svc.duration ?? 45,
      price: svc.price ?? 0,
      status: svc.status || "visible",
      description: svc.description || "",
    });
    setTimeout(() => {
      nameInputRef.current?.focus();
      document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      showNotice("error", "Tên dịch vụ phải có ít nhất 2 ký tự.");
      return;
    }
    if (Number(form.duration) <= 0) {
      showNotice("error", "Thời lượng dịch vụ phải lớn hơn 0 phút.");
      return;
    }
    if (Number(form.price) < 0) {
      showNotice("error", "Giá dịch vụ không hợp lệ.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        category: form.category,
        duration: Number(form.duration),
        price: Number(form.price),
        status: form.status,
        description: form.description.trim(),
      };
      const res = editingId
        ? await servicesApi.update(editingId, payload)
        : await servicesApi.create(payload);
      showNotice("success", res.message);
      handleResetForm();
      await loadServices();
    } catch (err) {
      showNotice("error", err.message || "Không thể lưu dịch vụ.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleVisible = async (svc) => {
    try {
      const res = await servicesApi.toggleStatus(svc.id);
      showNotice("success", res.message);
      if (editingId === svc.id) {
        setForm((prev) => ({ ...prev, status: res.item.status }));
      }
      await loadServices();
    } catch (err) {
      showNotice("error", err.message || "Không thể cập nhật trạng thái dịch vụ.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await servicesApi.remove(deleteTarget.id);
      showNotice("success", res.message);
      if (editingId === deleteTarget.id) handleResetForm();
      setDeleteTarget(null);
      await loadServices();
    } catch (err) {
      showNotice("error", err.message || "Không thể xóa dịch vụ.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý dịch vụ</h1>
            <p className="adm-page-subtitle">Danh sách dịch vụ, bảng giá, thêm/sửa, ẩn/hiện và xóa dịch vụ</p>
          </div>
          <div className="adm-topbar-actions">
            <button type="button" className="adm-btn adm-btn-gold" onClick={handleStartAdd}>
              + Thêm dịch vụ
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
                placeholder="Tìm theo mã SV, tên dịch vụ, danh mục..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="adm-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">Tất cả danh mục</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <select className="adm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="visible">Đang hiển thị</option>
                <option value="hidden">Đang ẩn</option>
              </select>
              {(search || categoryFilter || statusFilter) && (
                <button
                  type="button"
                  className="adm-btn adm-btn-outline"
                  onClick={() => {
                    setSearch("");
                    setCategoryFilter("");
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
                  <h3 className="adm-card-title">Danh sách dịch vụ ({filteredServices.length})</h3>
                  <p className="adm-card-subtitle">Quản lý bảng giá, thời lượng và trạng thái hiển thị</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Tên dịch vụ</th>
                      <th>Thời lượng</th>
                      <th>Giá tiền</th>
                      <th>Trạng thái</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Đang tải danh sách dịch vụ...
                        </td>
                      </tr>
                    ) : filteredServices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="adm-empty">
                          Không có dịch vụ nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      filteredServices.map((svc) => {
                        const isHidden = svc.status === "hidden";
                        return (
                          <tr
                            key={svc.id}
                            style={isHidden ? { opacity: 0.72 } : undefined}
                            className={editingId === svc.id ? "adm-row-selected" : ""}
                          >
                            <td>
                              <strong>{svc.code}</strong>
                            </td>
                            <td>
                              <div className="adm-cell-title">{svc.name}</div>
                              <div className="adm-cell-sub">{svc.category}</div>
                            </td>
                            <td>{svc.duration} phút</td>
                            <td>
                              <strong>{formatVnd(svc.price)}</strong>
                            </td>
                            <td>
                              <span className={`adm-badge ${isHidden ? "adm-badge-gray" : "adm-badge-green"}`}>
                                {isHidden ? "Đang ẩn" : "Hiển thị"}
                              </span>
                            </td>
                            <td>
                              <div className="adm-actions-cell">
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-outline adm-btn-sm"
                                  onClick={() => handleStartEdit(svc)}
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  className={`adm-btn adm-btn-sm ${isHidden ? "adm-btn-success" : "adm-btn-danger"}`}
                                  onClick={() => handleToggleVisible(svc)}
                                >
                                  {isHidden ? "Hiện" : "Ẩn"}
                                </button>
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-danger adm-btn-sm"
                                  onClick={() => setDeleteTarget(svc)}
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

            <div className="adm-card" id="service-form">
              <div className="adm-card-header">
                <div>
                  <h3 className="adm-card-title">{editingId ? "Cập nhật dịch vụ" : "Thêm dịch vụ mới"}</h3>
                  <p className="adm-card-subtitle">
                    {editingId
                      ? `Đang chỉnh sửa dịch vụ mã ${editingCode}`
                      : "Thiết lập thông tin bảng giá, thời lượng và trạng thái hiển thị"}
                  </p>
                </div>
                {editingId && <span className="adm-editing-tag">{editingCode}</span>}
              </div>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div className="adm-form-group">
                  <label htmlFor="svc-name">Tên dịch vụ *</label>
                  <input
                    id="svc-name"
                    ref={nameInputRef}
                    type="text"
                    className="adm-input"
                    placeholder="VD: Combo Đế Vương 7 Bước"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="svc-cat">Danh mục</label>
                    <select
                      id="svc-cat"
                      className="adm-select"
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="svc-duration">Thời lượng (phút) *</label>
                    <input
                      id="svc-duration"
                      type="number"
                      min={5}
                      step={5}
                      className="adm-input"
                      value={form.duration}
                      onChange={(e) => setForm((prev) => ({ ...prev, duration: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="adm-form-row">
                  <div className="adm-form-group">
                    <label htmlFor="svc-price">Giá dịch vụ (VNĐ) *</label>
                    <input
                      id="svc-price"
                      type="number"
                      min={0}
                      step={10000}
                      className="adm-input"
                      value={form.price}
                      onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label htmlFor="svc-status">Trạng thái hiển thị</label>
                    <select
                      id="svc-status"
                      className="adm-select"
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="visible">Hiển thị trên web</option>
                      <option value="hidden">Tạm ẩn dịch vụ</option>
                    </select>
                  </div>
                </div>
                <div className="adm-form-group">
                  <label htmlFor="svc-desc">Mô tả dịch vụ</label>
                  <textarea
                    id="svc-desc"
                    rows={3}
                    className="adm-textarea"
                    placeholder="Mô tả chi tiết các bước thực hiện..."
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button type="submit" className="adm-btn adm-btn-gold" disabled={saving}>
                    {saving ? "Đang lưu..." : editingId ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
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
        title="Xác nhận xóa dịch vụ"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa dịch vụ "${deleteTarget.name}" (${deleteTarget.code})?`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
