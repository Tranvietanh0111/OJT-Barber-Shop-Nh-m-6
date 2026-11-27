// Phụ trách: Trần Văn Thắng
// Quản lý lịch hẹn – Đầy đủ Thêm, Sửa, Duyệt/Từ chối/Hoàn thành/Hủy, Xóa, Lọc theo ngày & trạng thái
import { useCallback, useEffect, useMemo, useState } from "react";
import { appointmentsApi, barbersApi, formatDateVn, formatVnd, servicesApi } from "./adminApi";
import { AdminAlert, ConfirmDeleteModal } from "./AdminUiHelpers";
import "./admin.css";

const STATUS_META = {
  pending: { label: "Chờ xác nhận", badge: "adm-badge adm-badge-yellow badge badge-pending" },
  confirmed: { label: "Đã xác nhận", badge: "adm-badge adm-badge-blue badge badge-confirmed" },
  completed: { label: "Hoàn thành", badge: "adm-badge adm-badge-green badge badge-completed" },
  rejected: { label: "Từ chối", badge: "adm-badge adm-badge-red badge badge-cancelled" },
  cancelled: { label: "Đã hủy", badge: "adm-badge adm-badge-red badge badge-cancelled" },
};

const EMPTY_FORM = {
  customer_name: "",
  customer_phone: "",
  barber_name: "Nguyễn Hoàng Nam",
  service_name: "Cắt Tóc Thương Gia",
  date: "2026-11-14",
  time: "09:30",
  price: 120000,
  status: "pending",
  notes: "",
};

export default function AppointmentManagement() {
  const [appointments, setAppointments] = useState([]);
  const [mode, setMode] = useState("api");
  const [barberOptions, setBarberOptions] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Bộ lọc
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [barberFilter, setBarberFilter] = useState("");
  const [search, setSearch] = useState("");

  // Modal Thêm / Sửa & Xem chi tiết
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [detailItem, setDetailItem] = useState(null);

  const [notice, setNotice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [appRes, bbRes, svcRes] = await Promise.all([
        appointmentsApi.list(),
        barbersApi.list(),
        servicesApi.list(),
      ]);
      setAppointments(appRes.items);
      setMode(appRes.mode);
      setBarberOptions(bbRes.items.map((b) => b.full_name));
      setServiceOptions(svcRes.items);
    } catch (err) {
      showNotice("error", err.message || "Không thể tải danh sách lịch hẹn.");
    } finally {
      setLoading(false);
    }
  }, [showNotice]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const countsByStatus = useMemo(() => {
    const counts = { all: appointments.length, pending: 0, confirmed: 0, completed: 0, rejected: 0, cancelled: 0 };
    for (const a of appointments) {
      if (counts[a.status] !== undefined) counts[a.status] += 1;
    }
    return counts;
  }, [appointments]);

  const allBarberNames = useMemo(() => {
    const set = new Set([...barberOptions, ...appointments.map((a) => a.barber_name)]);
    return Array.from(set).filter(Boolean);
  }, [barberOptions, appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      if (dateFilter && app.date !== dateFilter) return false;
      if (statusFilter && app.status !== statusFilter) return false;
      if (barberFilter && app.barber_name !== barberFilter) return false;
      if (search.trim()) {
        const kw = search.trim().toLowerCase();
        const hit =
          app.code.toLowerCase().includes(kw) ||
          app.customer_name.toLowerCase().includes(kw) ||
          app.customer_phone.toLowerCase().includes(kw) ||
          app.barber_name.toLowerCase().includes(kw) ||
          app.service_name.toLowerCase().includes(kw);
        if (!hit) return false;
      }
      return true;
    });
  }, [appointments, dateFilter, statusFilter, barberFilter, search]);

  const handleOpenAdd = () => {
    const defaultService = serviceOptions[0];
    setEditingItem(null);
    setForm({
      ...EMPTY_FORM,
      barber_name: allBarberNames[0] || EMPTY_FORM.barber_name,
      service_name: defaultService?.name || EMPTY_FORM.service_name,
      price: defaultService?.price ?? EMPTY_FORM.price,
    });
    setFormModalOpen(true);
  };

  const handleOpenEdit = (app) => {
    setEditingItem(app);
    setForm({
      customer_name: app.customer_name || "",
      customer_phone: app.customer_phone || "",
      barber_name: app.barber_name || "",
      service_name: app.service_name || "",
      date: app.date || "2026-11-14",
      time: app.time || "09:30",
      price: app.price ?? 0,
      status: app.status || "pending",
      notes: app.notes || "",
    });
    setFormModalOpen(true);
  };

  const handleServiceChange = (serviceName) => {
    const matched = serviceOptions.find((s) => s.name === serviceName);
    setForm((prev) => ({
      ...prev,
      service_name: serviceName,
      price: matched ? matched.price : prev.price,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.customer_name.trim().length < 2) {
      showNotice("error", "Tên khách hàng phải có ít nhất 2 ký tự.");
      return;
    }
    if (form.customer_phone.trim().length < 8) {
      showNotice("error", "Số điện thoại khách hàng không hợp lệ.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Math.max(0, Number(form.price) || 0),
      };
      const res = editingItem
        ? await appointmentsApi.update(editingItem.id, payload)
        : await appointmentsApi.create(payload);
      showNotice("success", res.message);
      setFormModalOpen(false);
      await loadData();
    } catch (err) {
      showNotice("error", err.message || "Không thể lưu lịch hẹn.");
    } finally {
      setSaving(false);
    }
  };

  const handleQuickStatus = async (app, nextStatus) => {
    try {
      const res = await appointmentsApi.updateStatus(app.id, nextStatus);
      showNotice("success", `${res.message}: ${app.code} → ${STATUS_META[nextStatus]?.label || nextStatus}`);
      if (detailItem?.id === app.id) {
        setDetailItem(res.item);
      }
      await loadData();
    } catch (err) {
      showNotice("error", err.message || "Không thể cập nhật trạng thái lịch hẹn.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await appointmentsApi.remove(deleteTarget.id);
      showNotice("success", res.message);
      if (detailItem?.id === deleteTarget.id) setDetailItem(null);
      setDeleteTarget(null);
      await loadData();
    } catch (err) {
      showNotice("error", err.message || "Không thể xóa lịch hẹn.");
    } finally {
      setDeleting(false);
    }
  };

  const resetFilters = () => {
    setDateFilter("");
    setStatusFilter("");
    setBarberFilter("");
    setSearch("");
  };

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý lịch hẹn</h1>
            <p className="adm-page-subtitle">Tạo lịch, sửa, duyệt/hoàn thành/từ chối, xóa và lọc theo ngày & trạng thái</p>
          </div>
          <div className="adm-topbar-actions">
            <span className="adm-mode-badge" title="Nguồn dữ liệu hiện tại">
              <span className={`adm-mode-dot ${mode === "local" ? "local" : ""}`} />
              {mode === "api" ? "API FastAPI" : "Dữ liệu cục bộ"}
            </span>
            <button type="button" className="adm-btn adm-btn-gold" onClick={handleOpenAdd}>
              + Tạo lịch hẹn mới
            </button>
          </div>
        </header>

        <div className="adm-content">
          <AdminAlert notice={notice} onClose={() => setNotice(null)} />

          <div className="adm-toolbar">
            <div className="adm-filters">
              <input
                type="date"
                className="adm-input"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                title="Lọc theo ngày hẹn"
              />
              <select className="adm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận (pending)</option>
                <option value="confirmed">Đã xác nhận (confirmed)</option>
                <option value="completed">Hoàn thành (completed)</option>
                <option value="rejected">Từ chối (rejected)</option>
                <option value="cancelled">Đã hủy (cancelled)</option>
              </select>
              <select className="adm-select" value={barberFilter} onChange={(e) => setBarberFilter(e.target.value)}>
                <option value="">Tất cả Barber</option>
                {allBarberNames.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="adm-input adm-search-input"
                placeholder="Tìm mã lịch, tên khách, SĐT, dịch vụ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {(dateFilter || statusFilter || barberFilter || search) && (
                <button type="button" className="adm-btn adm-btn-outline" onClick={resetFilters}>
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          <div className="adm-tabs">
            {[
              { key: "", label: `Tất cả (${countsByStatus.all})` },
              { key: "pending", label: `Chờ xác nhận (${countsByStatus.pending})` },
              { key: "confirmed", label: `Đã xác nhận (${countsByStatus.confirmed})` },
              { key: "completed", label: `Hoàn thành (${countsByStatus.completed})` },
              { key: "rejected", label: `Từ chối (${countsByStatus.rejected})` },
              { key: "cancelled", label: `Đã hủy (${countsByStatus.cancelled})` },
            ].map((tab) => (
              <button
                key={tab.key || "all"}
                type="button"
                className={`adm-tab ${statusFilter === tab.key ? "active" : ""}`}
                onClick={() => setStatusFilter(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="adm-card">
            <div className="adm-card-header">
              <div>
                <h3 className="adm-card-title">Bảng danh sách lịch hẹn ({filteredAppointments.length})</h3>
                <p className="adm-card-subtitle">Xử lý nhanh trạng thái hoặc chỉnh sửa/xóa lịch hẹn</p>
              </div>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Mã lịch</th>
                    <th>Khách hàng</th>
                    <th>Barber phụ trách</th>
                    <th>Dịch vụ</th>
                    <th>Ngày & Giờ hẹn</th>
                    <th>Giá tiền</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="adm-empty">
                        Đang tải danh sách lịch hẹn...
                      </td>
                    </tr>
                  ) : filteredAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="adm-empty">
                        Không có lịch hẹn nào phù hợp điều kiện lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredAppointments.map((app) => {
                      const st = STATUS_META[app.status] || STATUS_META.pending;
                      return (
                        <tr key={app.id}>
                          <td>
                            <strong>{app.code}</strong>
                          </td>
                          <td>
                            <div className="adm-cell-title">{app.customer_name}</div>
                            <div className="adm-cell-sub">{app.customer_phone}</div>
                          </td>
                          <td>{app.barber_name}</td>
                          <td>{app.service_name}</td>
                          <td>
                            {formatDateVn(app.date)} • {app.time}
                          </td>
                          <td>
                            <strong>{formatVnd(app.price)}</strong>
                          </td>
                          <td>
                            <span className={st.badge}>{st.label}</span>
                          </td>
                          <td>
                            <div className="adm-actions-cell">
                              {app.status === "pending" && (
                                <>
                                  <button
                                    type="button"
                                    className="adm-btn adm-btn-success adm-btn-sm"
                                    onClick={() => handleQuickStatus(app, "confirmed")}
                                  >
                                    Duyệt
                                  </button>
                                  <button
                                    type="button"
                                    className="adm-btn adm-btn-danger adm-btn-sm"
                                    onClick={() => handleQuickStatus(app, "rejected")}
                                  >
                                    Từ chối
                                  </button>
                                </>
                              )}
                              {app.status === "confirmed" && (
                                <button
                                  type="button"
                                  className="adm-btn adm-btn-gold adm-btn-sm"
                                  onClick={() => handleQuickStatus(app, "completed")}
                                >
                                  Hoàn thành
                                </button>
                              )}
                              <button
                                type="button"
                                className="adm-btn adm-btn-outline adm-btn-sm"
                                onClick={() => setDetailItem(app)}
                              >
                                Chi tiết
                              </button>
                              <button
                                type="button"
                                className="adm-btn adm-btn-outline adm-btn-sm"
                                onClick={() => handleOpenEdit(app)}
                              >
                                Sửa
                              </button>
                              <button
                                type="button"
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => setDeleteTarget(app)}
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
        </div>
      </div>

      {/* Modal Thêm / Sửa lịch hẹn */}
      {formModalOpen && (
        <div className="adm-modal-backdrop" onClick={() => !saving && setFormModalOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="adm-modal-header">
              <div>
                <h3 className="adm-card-title">
                  {editingItem ? `Chỉnh sửa lịch hẹn ${editingItem.code}` : "Tạo lịch hẹn mới"}
                </h3>
                <p className="adm-card-subtitle">Nhập thông tin khách hàng, Barber, dịch vụ và khung giờ hẹn</p>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setFormModalOpen(false)}
                disabled={saving}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Tên khách hàng *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="VD: Hoàng Gia Huy"
                    value={form.customer_name}
                    onChange={(e) => setForm((p) => ({ ...p, customer_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="VD: 0987654321"
                    value={form.customer_phone}
                    onChange={(e) => setForm((p) => ({ ...p, customer_phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Barber phụ trách *</label>
                  <select
                    className="adm-select"
                    value={form.barber_name}
                    onChange={(e) => setForm((p) => ({ ...p, barber_name: e.target.value }))}
                  >
                    {allBarberNames.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Dịch vụ *</label>
                  <select
                    className="adm-select"
                    value={form.service_name}
                    onChange={(e) => handleServiceChange(e.target.value)}
                  >
                    {serviceOptions.map((svc) => (
                      <option key={svc.id} value={svc.name}>
                        {svc.name} ({formatVnd(svc.price)})
                      </option>
                    ))}
                    {!serviceOptions.some((s) => s.name === form.service_name) && form.service_name && (
                      <option value={form.service_name}>{form.service_name}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Ngày hẹn *</label>
                  <input
                    type="date"
                    className="adm-input"
                    value={form.date}
                    onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label>Giờ hẹn *</label>
                  <input
                    type="time"
                    className="adm-input"
                    value={form.time}
                    onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Giá dự kiến (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    className="adm-input"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  />
                </div>
                <div className="adm-form-group">
                  <label>Trạng thái</label>
                  <select
                    className="adm-select"
                    value={form.status}
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  >
                    <option value="pending">Chờ xác nhận</option>
                    <option value="confirmed">Đã xác nhận</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="rejected">Từ chối</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>

              <div className="adm-form-group">
                <label>Ghi chú</label>
                <textarea
                  rows={2}
                  className="adm-textarea"
                  placeholder="Ghi chú yêu cầu của khách..."
                  value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                />
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-outline adm-btn-sm"
                  onClick={() => setFormModalOpen(false)}
                  disabled={saving}
                >
                  Hủy
                </button>
                <button type="submit" className="adm-btn adm-btn-gold adm-btn-sm" disabled={saving}>
                  {saving ? "Đang lưu..." : editingItem ? "Lưu thay đổi" : "Tạo lịch hẹn"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Chi tiết lịch hẹn */}
      {detailItem && (
        <div className="adm-modal-backdrop" onClick={() => setDetailItem(null)}>
          <div className="adm-modal adm-modal-sm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="adm-modal-header">
              <div>
                <h3 className="adm-card-title">Chi tiết lịch hẹn #{detailItem.code}</h3>
                <p className="adm-card-subtitle">
                  {formatDateVn(detailItem.date)} • {detailItem.time}
                </p>
              </div>
              <button type="button" className="adm-modal-close" onClick={() => setDetailItem(null)}>
                ×
              </button>
            </div>

            <div className="adm-receipt-info" style={{ marginBottom: 0 }}>
              <div>
                <strong>Khách hàng:</strong> {detailItem.customer_name} ({detailItem.customer_phone})
              </div>
              <div>
                <strong>Barber phụ trách:</strong> {detailItem.barber_name}
              </div>
              <div>
                <strong>Dịch vụ:</strong> {detailItem.service_name}
              </div>
              <div>
                <strong>Giá tiền:</strong> {formatVnd(detailItem.price)}
              </div>
              <div>
                <strong>Trạng thái:</strong>{" "}
                <span className={(STATUS_META[detailItem.status] || STATUS_META.pending).badge}>
                  {(STATUS_META[detailItem.status] || STATUS_META.pending).label}
                </span>
              </div>
              <div>
                <strong>Ghi chú:</strong> {detailItem.notes || "Không có"}
              </div>
            </div>

            <div className="adm-modal-footer">
              <button
                type="button"
                className="adm-btn adm-btn-outline adm-btn-sm"
                onClick={() => {
                  const target = detailItem;
                  setDetailItem(null);
                  handleOpenEdit(target);
                }}
              >
                Chỉnh sửa
              </button>
              <button type="button" className="adm-btn adm-btn-primary adm-btn-sm" onClick={() => setDetailItem(null)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Xác nhận xóa lịch hẹn"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa lịch hẹn "${deleteTarget.code}" của khách "${deleteTarget.customer_name}"?`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
