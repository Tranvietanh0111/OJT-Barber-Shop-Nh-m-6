// Phụ trách: Trần Văn Thắng
// Quản lý hóa đơn – Đầy đủ Tạo hóa đơn, Xem chi tiết, Cập nhật trạng thái/ghi chú, Xóa & Lọc (kết nối /api/v1/admin/invoices)
import { useCallback, useEffect, useMemo, useState } from "react";
import { barbersApi, formatVnd, invoicesApi, servicesApi } from "./adminApi";
import { AdminAlert, ConfirmDeleteModal } from "./AdminUiHelpers";
import "./admin.css";

const PAYMENT_STATUS_META = {
  paid: { label: "Đã thanh toán", badge: "adm-badge adm-badge-green" },
  unpaid: { label: "Chờ thanh toán", badge: "adm-badge adm-badge-yellow" },
  refunded: { label: "Đã hoàn tiền", badge: "adm-badge adm-badge-red" },
};

const PAYMENT_METHOD_LABEL = {
  transfer: "Chuyển khoản VietQR",
  cash: "Tiền mặt",
  card: "Thẻ ngân hàng / POS",
};

const EMPTY_CREATE_FORM = {
  appointment_code: "",
  customer_name: "",
  customer_phone: "",
  barber_name: "Nguyễn Hoàng Nam",
  payment_method: "transfer",
  payment_status: "paid",
  discount: 0,
  notes: "",
  items: [{ service_name: "Combo Đế Vương 7 Bước", quantity: 1, unit_price: 220000 }],
};

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState([]);
  const [mode, setMode] = useState("api");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [barberNames, setBarberNames] = useState([]);
  const [serviceList, setServiceList] = useState([]);

  // Bộ lọc
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");

  // Hóa đơn đang chọn xem chi tiết
  const [selectedId, setSelectedId] = useState(null);
  const [editMethod, setEditMethod] = useState("transfer");
  const [editNotes, setEditNotes] = useState("");

  // Modal tạo hóa đơn
  const [createOpen, setCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_CREATE_FORM);

  // Thông báo & Xác nhận xóa
  const [notice, setNotice] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const showNotice = useCallback((type, text) => {
    setNotice({ type, text });
  }, []);

  const loadInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await invoicesApi.list({
        search: search || undefined,
        status: statusFilter || undefined,
        payment_method: methodFilter || undefined,
      });
      setInvoices(res.items);
      setMode(res.mode);
      setSelectedId((prev) => {
        if (prev && res.items.some((i) => i.id === prev)) return prev;
        return res.items[0]?.id ?? null;
      });
    } catch (err) {
      showNotice("error", err.message || "Không thể tải danh sách hóa đơn.");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, methodFilter, showNotice]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  useEffect(() => {
    Promise.all([barbersApi.list(), servicesApi.list()])
      .then(([bbRes, svcRes]) => {
        setBarberNames(bbRes.items.map((b) => b.full_name));
        setServiceList(svcRes.items);
      })
      .catch(() => {});
  }, []);

  const selectedInvoice = useMemo(
    () => invoices.find((inv) => inv.id === selectedId) || invoices[0] || null,
    [invoices, selectedId]
  );

  useEffect(() => {
    if (selectedInvoice) {
      setEditMethod(selectedInvoice.payment_method || "transfer");
      setEditNotes(selectedInvoice.notes || "");
    }
  }, [selectedInvoice]);

  const draftTotals = useMemo(() => {
    const subtotal = createForm.items.reduce(
      (sum, it) => sum + (Number(it.quantity) || 0) * (Number(it.unit_price) || 0),
      0
    );
    const discount = Math.max(0, Number(createForm.discount) || 0);
    return { subtotal, discount, total: Math.max(0, subtotal - discount) };
  }, [createForm.items, createForm.discount]);

  const handleOpenCreate = () => {
    const firstSvc = serviceList[0];
    setCreateForm({
      ...EMPTY_CREATE_FORM,
      barber_name: barberNames[0] || EMPTY_CREATE_FORM.barber_name,
      items: [
        {
          service_name: firstSvc?.name || "Combo Đế Vương 7 Bước",
          quantity: 1,
          unit_price: firstSvc?.price ?? 220000,
        },
      ],
    });
    setCreateOpen(true);
  };

  const handleItemChange = (index, field, value) => {
    setCreateForm((prev) => {
      const nextItems = prev.items.map((it, idx) => {
        if (idx !== index) return it;
        if (field === "service_name") {
          const matched = serviceList.find((s) => s.name === value);
          return {
            ...it,
            service_name: value,
            unit_price: matched ? matched.price : it.unit_price,
          };
        }
        return { ...it, [field]: value };
      });
      return { ...prev, items: nextItems };
    });
  };

  const handleAddItemRow = () => {
    setCreateForm((prev) => ({
      ...prev,
      items: [...prev.items, { service_name: "", quantity: 1, unit_price: 100000 }],
    }));
  };

  const handleRemoveItemRow = (index) => {
    setCreateForm((prev) => {
      if (prev.items.length <= 1) return prev;
      return { ...prev, items: prev.items.filter((_, idx) => idx !== index) };
    });
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    if (createForm.customer_name.trim().length < 2) {
      showNotice("error", "Tên khách hàng phải có ít nhất 2 ký tự.");
      return;
    }
    if (createForm.customer_phone.trim().length < 8) {
      showNotice("error", "Số điện thoại khách hàng phải có ít nhất 8 chữ số.");
      return;
    }
    const validItems = createForm.items
      .filter((it) => it.service_name.trim())
      .map((it) => ({
        service_name: it.service_name.trim(),
        quantity: Math.max(1, Number(it.quantity) || 1),
        unit_price: Math.max(0, Number(it.unit_price) || 0),
      }));

    if (validItems.length === 0) {
      showNotice("error", "Hóa đơn cần ít nhất 1 dịch vụ hoặc sản phẩm.");
      return;
    }

    setSaving(true);
    try {
      const res = await invoicesApi.create({
        appointment_code: createForm.appointment_code.trim() || "BK-2026-NEW",
        customer_name: createForm.customer_name.trim(),
        customer_phone: createForm.customer_phone.trim(),
        barber_name: createForm.barber_name.trim(),
        items: validItems,
        discount: Math.max(0, Number(createForm.discount) || 0),
        payment_method: createForm.payment_method,
        payment_status: createForm.payment_status,
        notes: createForm.notes.trim(),
      });
      showNotice("success", res.message);
      setCreateOpen(false);
      await loadInvoices();
      if (res.item?.id) setSelectedId(res.item.id);
    } catch (err) {
      showNotice("error", err.message || "Không thể tạo hóa đơn mới.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateInvoice = async (paymentStatus) => {
    if (!selectedInvoice) return;
    setSaving(true);
    try {
      const res = await invoicesApi.updateStatus(selectedInvoice.id, {
        payment_status: paymentStatus,
        payment_method: editMethod,
        notes: editNotes.trim(),
      });
      showNotice(
        "success",
        `${res.message} (${selectedInvoice.invoice_code} → ${PAYMENT_STATUS_META[paymentStatus]?.label || paymentStatus})`
      );
      await loadInvoices();
    } catch (err) {
      showNotice("error", err.message || "Không thể cập nhật hóa đơn.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await invoicesApi.remove(deleteTarget.id);
      showNotice("success", res.message);
      setDeleteTarget(null);
      await loadInvoices();
    } catch (err) {
      showNotice("error", err.message || "Không thể xóa hóa đơn.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="adm-shell">
      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1 className="adm-page-title">Quản lý hóa đơn</h1>
            <p className="adm-page-subtitle">Tạo hóa đơn, xem chi tiết, cập nhật thanh toán và xóa hóa đơn</p>
          </div>
          <div className="adm-topbar-actions">
            <span className="adm-mode-badge" title="Nguồn dữ liệu hiện tại">
              <span className={`adm-mode-dot ${mode === "local" ? "local" : ""}`} />
              {mode === "api" ? "API FastAPI" : "Dữ liệu cục bộ"}
            </span>
            <button type="button" className="adm-btn adm-btn-gold" onClick={handleOpenCreate}>
              + Tạo hóa đơn mới
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
                placeholder="Tìm mã hóa đơn INV, mã lịch hẹn, tên khách hàng, SĐT..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select className="adm-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái thanh toán</option>
                <option value="paid">Đã thanh toán (Paid)</option>
                <option value="unpaid">Chờ thanh toán (Unpaid)</option>
                <option value="refunded">Đã hoàn tiền (Refunded)</option>
              </select>
              <select className="adm-select" value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)}>
                <option value="">Tất cả phương thức</option>
                <option value="transfer">Chuyển khoản VietQR</option>
                <option value="cash">Tiền mặt</option>
                <option value="card">Thẻ ngân hàng / POS</option>
              </select>
              {(search || statusFilter || methodFilter) && (
                <button
                  type="button"
                  className="adm-btn adm-btn-outline"
                  onClick={() => {
                    setSearch("");
                    setStatusFilter("");
                    setMethodFilter("");
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
                  <h3 className="adm-card-title">Danh sách hóa đơn ({invoices.length})</h3>
                  <p className="adm-card-subtitle">Nhấn vào một dòng để xem chi tiết & cập nhật trạng thái</p>
                </div>
              </div>
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Mã HĐ</th>
                      <th>Khách hàng</th>
                      <th>Barber</th>
                      <th>Phương thức</th>
                      <th>Tổng tiền</th>
                      <th>Trạng thái</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="adm-empty">
                          Đang tải danh sách hóa đơn...
                        </td>
                      </tr>
                    ) : invoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="adm-empty">
                          Không có hóa đơn nào phù hợp.
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => {
                        const st = PAYMENT_STATUS_META[inv.payment_status] || PAYMENT_STATUS_META.unpaid;
                        const isSelected = selectedInvoice?.id === inv.id;
                        return (
                          <tr
                            key={inv.id}
                            className={`adm-row-clickable ${isSelected ? "adm-row-selected" : ""}`}
                            onClick={() => setSelectedId(inv.id)}
                          >
                            <td>
                              <div className="adm-cell-title">{inv.invoice_code}</div>
                              <div className="adm-cell-sub">{inv.created_at}</div>
                            </td>
                            <td>
                              <div>{inv.customer_name}</div>
                              <div className="adm-cell-sub">{inv.customer_phone}</div>
                            </td>
                            <td>{inv.barber_name}</td>
                            <td>{PAYMENT_METHOD_LABEL[inv.payment_method] || inv.payment_method}</td>
                            <td>
                              <strong>{formatVnd(inv.total)}</strong>
                            </td>
                            <td>
                              <span className={st.badge}>{st.label}</span>
                            </td>
                            <td onClick={(e) => e.stopPropagation()}>
                              <button
                                type="button"
                                className="adm-btn adm-btn-danger adm-btn-sm"
                                onClick={() => setDeleteTarget(inv)}
                              >
                                Xóa
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="adm-card">
              {selectedInvoice ? (
                <>
                  <div className="adm-card-header">
                    <div>
                      <h3 className="adm-card-title">Chi tiết hóa đơn: #{selectedInvoice.invoice_code}</h3>
                      <p className="adm-card-subtitle">
                        Mã lịch hẹn: {selectedInvoice.appointment_code} • Ngày lập: {selectedInvoice.created_at}
                      </p>
                    </div>
                    <span
                      className={
                        (PAYMENT_STATUS_META[selectedInvoice.payment_status] || PAYMENT_STATUS_META.unpaid).badge
                      }
                    >
                      {(PAYMENT_STATUS_META[selectedInvoice.payment_status] || PAYMENT_STATUS_META.unpaid).label}
                    </span>
                  </div>

                  <div className="adm-receipt-info">
                    <div>
                      <strong>Khách hàng:</strong> {selectedInvoice.customer_name} ({selectedInvoice.customer_phone})
                    </div>
                    <div>
                      <strong>Barber thực hiện:</strong> {selectedInvoice.barber_name}
                    </div>
                    <div>
                      <strong>Phương thức:</strong>{" "}
                      {PAYMENT_METHOD_LABEL[selectedInvoice.payment_method] || selectedInvoice.payment_method}
                    </div>
                  </div>

                  <table className="adm-table" style={{ marginBottom: 14 }}>
                    <thead>
                      <tr>
                        <th>Dịch vụ / Sản phẩm</th>
                        <th>SL</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(selectedInvoice.items || []).map((item, idx) => (
                        <tr key={`${selectedInvoice.id}-item-${idx}`}>
                          <td>{item.service_name}</td>
                          <td>{item.quantity}</td>
                          <td>{formatVnd(item.unit_price)}</td>
                          <td>
                            <strong>{formatVnd(item.quantity * item.unit_price)}</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: 12, display: "grid", gap: 6, fontSize: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>Tạm tính:</span>
                      <strong>{formatVnd(selectedInvoice.subtotal)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-navy)" }}>
                      <span>Giảm giá:</span>
                      <strong>-{formatVnd(selectedInvoice.discount)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
                      <span>Tổng thanh toán:</span>
                      <span style={{ color: "#2563eb" }}>{formatVnd(selectedInvoice.total)}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
                    <div className="adm-form-group">
                      <label>Phương thức thanh toán</label>
                      <select
                        className="adm-select"
                        value={editMethod}
                        onChange={(e) => setEditMethod(e.target.value)}
                      >
                        <option value="transfer">Chuyển khoản VietQR</option>
                        <option value="cash">Tiền mặt</option>
                        <option value="card">Thẻ ngân hàng / POS</option>
                      </select>
                    </div>
                    <div className="adm-form-group">
                      <label>Ghi chú hóa đơn</label>
                      <input
                        type="text"
                        className="adm-input"
                        value={editNotes}
                        onChange={(e) => setEditNotes(e.target.value)}
                        placeholder="Nhập ghi chú thanh toán..."
                      />
                    </div>
                    <div className="adm-form-group">
                      <label>Cập nhật trạng thái thanh toán</label>
                      <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                        <button
                          type="button"
                          className="adm-btn adm-btn-gold adm-btn-sm"
                          disabled={saving}
                          onClick={() => handleUpdateInvoice("paid")}
                        >
                          Đã thanh toán
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn-outline adm-btn-sm"
                          disabled={saving}
                          onClick={() => handleUpdateInvoice("unpaid")}
                        >
                          Chờ thanh toán
                        </button>
                        <button
                          type="button"
                          className="adm-btn adm-btn-danger adm-btn-sm"
                          disabled={saving}
                          onClick={() => handleUpdateInvoice("refunded")}
                        >
                          Hoàn tiền
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="adm-empty">Chọn một hóa đơn bên trái hoặc tạo hóa đơn mới để xem chi tiết.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Tạo hóa đơn mới */}
      {createOpen && (
        <div className="adm-modal-backdrop" onClick={() => !saving && setCreateOpen(false)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="adm-modal-header">
              <div>
                <h3 className="adm-card-title">Tạo hóa đơn thanh toán mới</h3>
                <p className="adm-card-subtitle">Hệ thống tự động tính tạm tính và tổng thanh toán</p>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setCreateOpen(false)}
                disabled={saving}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Tên khách hàng *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="VD: Nguyễn Văn Bình"
                    value={createForm.customer_name}
                    onChange={(e) => setCreateForm((p) => ({ ...p, customer_name: e.target.value }))}
                    required
                  />
                </div>
                <div className="adm-form-group">
                  <label>Số điện thoại *</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="VD: 0987654321"
                    value={createForm.customer_phone}
                    onChange={(e) => setCreateForm((p) => ({ ...p, customer_phone: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Barber thực hiện *</label>
                  <select
                    className="adm-select"
                    value={createForm.barber_name}
                    onChange={(e) => setCreateForm((p) => ({ ...p, barber_name: e.target.value }))}
                  >
                    {(barberNames.length ? barberNames : ["Nguyễn Hoàng Nam", "Lê Minh Tuấn", "Phạm Quốc Bảo"]).map(
                      (name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Mã lịch hẹn liên kết</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="VD: BK-2026-106"
                    value={createForm.appointment_code}
                    onChange={(e) => setCreateForm((p) => ({ ...p, appointment_code: e.target.value }))}
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label>Danh sách dịch vụ / sản phẩm *</label>
                  <button type="button" className="adm-btn adm-btn-outline adm-btn-sm" onClick={handleAddItemRow}>
                    + Thêm dòng
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                  {createForm.items.map((it, idx) => (
                    <div key={idx} className="adm-invoice-item-row">
                      <input
                        type="text"
                        list="adm-service-suggestions"
                        className="adm-input"
                        placeholder="Tên dịch vụ / sản phẩm"
                        value={it.service_name}
                        onChange={(e) => handleItemChange(idx, "service_name", e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        min={1}
                        className="adm-input"
                        title="Số lượng"
                        value={it.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                        required
                      />
                      <input
                        type="number"
                        min={0}
                        step={10000}
                        className="adm-input"
                        title="Đơn giá (VNĐ)"
                        value={it.unit_price}
                        onChange={(e) => handleItemChange(idx, "unit_price", e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="adm-btn adm-btn-danger adm-btn-sm"
                        style={{ padding: "8px 0" }}
                        onClick={() => handleRemoveItemRow(idx)}
                        disabled={createForm.items.length <= 1}
                        title="Xóa dòng"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <datalist id="adm-service-suggestions">
                    {serviceList.map((s) => (
                      <option key={s.id} value={s.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Giảm giá (VNĐ)</label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    className="adm-input"
                    value={createForm.discount}
                    onChange={(e) => setCreateForm((p) => ({ ...p, discount: e.target.value }))}
                  />
                </div>
                <div className="adm-form-group">
                  <label>Phương thức thanh toán</label>
                  <select
                    className="adm-select"
                    value={createForm.payment_method}
                    onChange={(e) => setCreateForm((p) => ({ ...p, payment_method: e.target.value }))}
                  >
                    <option value="transfer">Chuyển khoản VietQR</option>
                    <option value="cash">Tiền mặt</option>
                    <option value="card">Thẻ ngân hàng / POS</option>
                  </select>
                </div>
              </div>

              <div className="adm-form-row">
                <div className="adm-form-group">
                  <label>Trạng thái thanh toán</label>
                  <select
                    className="adm-select"
                    value={createForm.payment_status}
                    onChange={(e) => setCreateForm((p) => ({ ...p, payment_status: e.target.value }))}
                  >
                    <option value="paid">Đã thanh toán</option>
                    <option value="unpaid">Chờ thanh toán</option>
                    <option value="refunded">Đã hoàn tiền</option>
                  </select>
                </div>
                <div className="adm-form-group">
                  <label>Ghi chú</label>
                  <input
                    type="text"
                    className="adm-input"
                    placeholder="Ghi chú giao dịch..."
                    value={createForm.notes}
                    onChange={(e) => setCreateForm((p) => ({ ...p, notes: e.target.value }))}
                  />
                </div>
              </div>

              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: "12px 14px",
                  display: "grid",
                  gap: 4,
                  fontSize: 13.5,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Tạm tính:</span>
                  <strong>{formatVnd(draftTotals.subtotal)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Giảm giá:</span>
                  <strong>-{formatVnd(draftTotals.discount)}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 800 }}>
                  <span>Tổng thanh toán:</span>
                  <span style={{ color: "#2563eb" }}>{formatVnd(draftTotals.total)}</span>
                </div>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-outline adm-btn-sm"
                  onClick={() => setCreateOpen(false)}
                  disabled={saving}
                >
                  Hủy
                </button>
                <button type="submit" className="adm-btn adm-btn-gold adm-btn-sm" disabled={saving}>
                  {saving ? "Đang tạo..." : "Lưu hóa đơn"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDeleteModal
        open={Boolean(deleteTarget)}
        title="Xác nhận xóa hóa đơn"
        message={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa hóa đơn "${deleteTarget.invoice_code}" của khách "${deleteTarget.customer_name}"?`
            : ""
        }
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
