// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";

const INITIAL_INVOICES = [
  {
    id: "INV-8830",
    time: "15:22 • 11/11/2026",
    customer: "Nguyễn Anh Tuấn",
    phone: "0988.412.889",
    tier: "VIP Diamond",
    barber: "Master Hoàng",
    chair: "Ghế VIP 01",
    items: "Combo Đế Vương 7 Bước + 1x Sáp Reuzel Blue Pomade",
    subtotal: 770000,
    discount: 77000,
    amount: 693000,
    method: "VietQR Techcombank",
    status: "paid",
  },
  {
    id: "INV-8829",
    time: "14:55 • 11/11/2026",
    customer: "Lê Minh Khôi",
    phone: "0903.551.902",
    tier: "VIP Gold",
    barber: "Eric Vũ",
    chair: "Ghế Styling 03",
    items: "Cắt + Uốn Premlock Hàn Quốc + 1x Kevin Murphy Rough Rider",
    subtotal: 1230000,
    discount: 0,
    amount: 1230000,
    method: "Thẻ tín dụng Visa",
    status: "paid",
  },
  {
    id: "INV-8828",
    time: "14:30 • 11/11/2026",
    customer: "Hoàng Gia Bảo",
    phone: "0912.678.334",
    tier: "VIP Silver",
    barber: "Tuấn Fade",
    chair: "Ghế Fade 02",
    items: "Skin Fade + Cạo Khăn Nóng",
    subtotal: 180000,
    discount: 0,
    amount: 180000,
    method: "Tiền mặt tại quầy",
    status: "paid",
  },
  {
    id: "INV-8827",
    time: "14:05 • 11/11/2026",
    customer: "Phan Mạnh Quỳnh",
    phone: "0909.222.888",
    tier: "VIP Diamond",
    barber: "Master Hoàng",
    chair: "Ghế VIP 01",
    items: "Combo Đế Vương 7 Bước",
    subtotal: 350000,
    discount: 0,
    amount: 350000,
    method: "VietQR Techcombank",
    status: "paid",
  },
  {
    id: "INV-8826",
    time: "13:40 • 11/11/2026",
    customer: "Ngô Kiến Huy",
    phone: "0918.777.666",
    tier: "Member",
    barber: "Thảo Spa",
    chair: "Ghế Spa 04",
    items: "Gội Dưỡng Sinh Trung Hoa + Lấy Ráy Tai Hoàng Gia",
    subtotal: 320000,
    discount: 0,
    amount: 320000,
    method: "Ví MoMo",
    status: "paid",
  },
  {
    id: "INV-8825",
    time: "13:10 • 11/11/2026",
    customer: "Đặng Quốc Khánh",
    phone: "0934.889.112",
    tier: "VIP Gold",
    barber: "Dũng Scissor",
    chair: "Ghế Classic 05",
    items: "Cắt + Nhuộm Phủ Bạc Thảo Dược",
    subtotal: 320000,
    discount: 0,
    amount: 320000,
    method: "VietQR Techcombank",
    status: "paid",
  },
  {
    id: "INV-8824",
    time: "12:25 • 11/11/2026",
    customer: "Trần Quốc Bảo",
    phone: "0977.123.456",
    tier: "VIP Gold",
    barber: "Trung Barber",
    chair: "Ghế Master 07",
    items: "Combo Cắt Gội 10 Bước + Tinh dầu râu Proraso",
    subtotal: 530000,
    discount: 0,
    amount: 530000,
    method: "Tiền mặt tại quầy",
    status: "pending",
  },
];

export default function InvoiceManagement() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [methodFilter, setMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Create POS Bill Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [custName, setCustName] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custBarber, setCustBarber] = useState("Master Hoàng|Ghế VIP 01");
  const [custService, setCustService] = useState(
    "Combo Đế Vương 7 Bước|350000"
  );
  const [custProduct, setCustProduct] = useState("Không mua kèm|0");
  const [custMethod, setCustMethod] = useState("VietQR Techcombank");

  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);

  const filteredInvoices = invoices.filter((inv) => {
    const matchMethod = methodFilter === "all" || inv.method === methodFilter;
    const matchStatus = statusFilter === "all" || inv.status === statusFilter;
    const matchSearch =
      inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.barber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.items.toLowerCase().includes(searchQuery.toLowerCase());
    return matchMethod && matchStatus && matchSearch;
  });

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const [srvName, srvPrice] = custService.split("|");
    const [prdName, prdPrice] = custProduct.split("|");
    const [barber, chair] = custBarber.split("|");
    const total = Number(srvPrice) + Number(prdPrice);
    const itemsText =
      Number(prdPrice) > 0 ? `${srvName} + 1x ${prdName}` : srvName;
    const newId = "INV-" + Math.floor(8831 + Math.random() * 68);

    const newInv = {
      id: newId,
      time: `${timeStr.slice(0, 5)} • 11/11/2026`,
      customer: custName.trim(),
      phone: custPhone.trim() || "0909.xxx.xxx",
      tier: "VIP Gold",
      barber,
      chair,
      items: itemsText,
      subtotal: total,
      discount: 0,
      amount: total,
      method: custMethod,
      status: "paid",
    };

    setInvoices((prev) => [newInv, ...prev]);
    setCreateModalOpen(false);
    setCustName("");
    setCustPhone("");
    showToast(
      "Xuất hóa đơn POS thành công!",
      `Đã tạo hóa đơn #${newId} (${formatVND(total)})`
    );
  };

  return (
    <AdminLayout activeKey="invoices" toast={toast}>
      {({ toggleSidebar }) => (
        <>
          <header className="h-20 bg-barber-surface/90 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <i className="fa-solid fa-bars text-lg"></i>
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Quản Lý Hóa Đơn &amp; Thu Ngân POS (K80)
                  </h2>
                  <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    VietQR Live
                  </span>
                </div>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <i className="fa-regular fa-clock text-amber-400"></i>
                  <span>{dateStr}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-400 font-semibold font-mono">
                    {timeStr}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/admin#stations"
                className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-chair text-amber-400"></i>
                <span>Sơ đồ ghế cắt</span>
              </Link>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-cash-register"></i>
                <span>Tạo Hóa Đơn Thanh Toán POS</span>
              </button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* KPI CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Thu Hóa Đơn Hôm Nay
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-file-invoice-dollar"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-3">
                  {formatVND(totalRevenue)}
                </h3>
                <p className="text-[11px] text-emerald-400 mt-2 font-semibold">
                  {invoices.length} hóa đơn phát hành trong ca
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Thanh Toán VietQR
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-qrcode"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-sky-400 mt-3">62%</h3>
                <p className="text-[11px] text-zinc-400 mt-2">
                  Tự động gạch nợ Techcombank
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tiền Mặt Tại Két
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-money-bill-wave"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-emerald-400 mt-3">
                  24%
                </h3>
                <p className="text-[11px] text-zinc-400 mt-2">
                  Khớp tồn quỹ đầu ca
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Máy In Nhiệt K80
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-print"></i>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mt-3">Online</h3>
                <p className="text-[11px] text-emerald-400 mt-2 font-semibold">
                  192.168.1.200:9100 • Sẵn sàng
                </p>
              </div>
            </section>

            {/* FILTER BAR */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative w-full sm:w-72">
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm mã INV, tên khách, dịch vụ, thợ..."
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Mọi phương thức thanh toán</option>
                  <option value="VietQR Techcombank">VietQR Techcombank</option>
                  <option value="Tiền mặt tại quầy">Tiền mặt tại quầy</option>
                  <option value="Thẻ tín dụng Visa">Thẻ tín dụng Visa</option>
                  <option value="Ví MoMo">Ví MoMo</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="paid">Đã thanh toán</option>
                  <option value="pending">Chờ thanh toán</option>
                </select>
              </div>
              <span className="text-xs text-zinc-400">
                Hiển thị{" "}
                <strong className="text-amber-400">
                  {filteredInvoices.length}
                </strong>{" "}
                hóa đơn
              </span>
            </section>

            {/* INVOICE TABLE */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="overflow-x-auto custom-scroll">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                      <th className="py-3.5 px-3 font-semibold">
                        Mã HĐ / Thời gian
                      </th>
                      <th className="py-3.5 px-3 font-semibold">Khách Hàng</th>
                      <th className="py-3.5 px-3 font-semibold">
                        Chi Tiết Dịch Vụ &amp; Sản Phẩm
                      </th>
                      <th className="py-3.5 px-3 font-semibold">
                        Barber &amp; Ghế
                      </th>
                      <th className="py-3.5 px-3 font-semibold">Phương Thức</th>
                      <th className="py-3.5 px-3 font-semibold">Thành Tiền</th>
                      <th className="py-3.5 px-3 font-semibold text-right">
                        Thao Tác
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/70 text-xs">
                    {filteredInvoices.map((inv) => (
                      <tr
                        key={inv.id}
                        className="hover:bg-zinc-900/60 transition-colors"
                      >
                        <td className="py-3.5 px-3">
                          <span className="font-mono font-bold text-amber-400 block">
                            #{inv.id}
                          </span>
                          <span className="text-[11px] text-zinc-500">
                            {inv.time}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white">
                            {inv.customer}
                          </div>
                          <span className="text-[11px] text-zinc-400">
                            {inv.phone} • {inv.tier}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-zinc-200 font-medium">
                          {inv.items}
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white">
                            {inv.barber}
                          </div>
                          <span className="text-[11px] text-amber-400">
                            {inv.chair}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700">
                            {inv.method}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-bold text-emerald-400 text-sm">
                          {formatVND(inv.amount)}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-bold transition-colors"
                          >
                            <i className="fa-solid fa-print mr-1"></i> Xem &amp;
                            In Bill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>

          {/* MODAL: CREATE POS INVOICE */}
          {createModalOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-cash-register"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        Tạo Hóa Đơn Thanh Toán POS
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Tính tiền dịch vụ &amp; bán lẻ sáp Pomade tại quầy
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCreateModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <form onSubmit={handleCreateInvoice} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Tên Khách Hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={custName}
                        onChange={(e) => setCustName(e.target.value)}
                        placeholder="VD: Anh Minh Quân"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Số Điện Thoại
                      </label>
                      <input
                        type="tel"
                        value={custPhone}
                        onChange={(e) => setCustPhone(e.target.value)}
                        placeholder="0909 xxx xxx"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Gói Dịch Vụ Đã Thực Hiện *
                      </label>
                      <select
                        value={custService}
                        onChange={(e) => setCustService(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Combo Đế Vương 7 Bước|350000">
                          Combo Đế Vương 7 Bước (350.000₫)
                        </option>
                        <option value="Skin Fade + Cạo Khăn Nóng|180000">
                          Skin Fade + Cạo Khăn Nóng (180.000₫)
                        </option>
                        <option value="Cắt + Uốn Premlock Hàn Quốc|550000">
                          Cắt + Uốn Premlock Hàn Quốc (550.000₫)
                        </option>
                        <option value="Gội Dưỡng Sinh + Lấy Ráy Tai|220000">
                          Gội Dưỡng Sinh + Lấy Ráy Tai (220.000₫)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Mua Kèm Sáp / Mỹ Phẩm
                      </label>
                      <select
                        value={custProduct}
                        onChange={(e) => setCustProduct(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Không mua kèm|0">
                          -- Không mua kèm --
                        </option>
                        <option value="Sáp Reuzel Blue Pomade|420000">
                          Sáp Reuzel Blue Pomade (+420.000₫)
                        </option>
                        <option value="Kevin Murphy Rough Rider|680000">
                          Kevin Murphy Rough Rider (+680.000₫)
                        </option>
                        <option value="Tinh dầu râu Proraso|380000">
                          Tinh dầu râu Proraso (+380.000₫)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Barber Phụ Trách
                      </label>
                      <select
                        value={custBarber}
                        onChange={(e) => setCustBarber(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Master Hoàng|Ghế VIP 01">
                          Master Hoàng (Ghế VIP 01)
                        </option>
                        <option value="Tuấn Fade|Ghế Fade 02">
                          Tuấn Fade (Ghế Fade 02)
                        </option>
                        <option value="Eric Vũ|Ghế Styling 03">
                          Eric Vũ (Ghế Styling 03)
                        </option>
                        <option value="Thảo Spa|Ghế Spa 04">
                          Thảo Spa (Ghế Spa 04)
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Phương Thức Thanh Toán
                      </label>
                      <select
                        value={custMethod}
                        onChange={(e) => setCustMethod(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="VietQR Techcombank">
                          VietQR Techcombank
                        </option>
                        <option value="Tiền mặt tại quầy">
                          Tiền mặt tại quầy
                        </option>
                        <option value="Thẻ tín dụng Visa">
                          Thẻ tín dụng Visa
                        </option>
                        <option value="Ví MoMo">Ví MoMo</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setCreateModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20"
                    >
                      <i className="fa-solid fa-print mr-1.5"></i> Xuất Hóa Đơn
                      &amp; In Bill K80
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL: VIEW & PRINT RECEIPT */}
          {selectedInvoice && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-dashed border-zinc-700 text-center relative">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <h3 className="font-serif font-bold text-lg text-white">
                    ROYAL BARBER POS RECEIPT
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    88 Phố Cổ, Hoàn Kiếm, Hà Nội
                  </p>
                </div>
                <div className="p-5 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Mã hóa đơn:</span>
                    <span className="font-mono font-bold text-amber-400">
                      #{selectedInvoice.id}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Thời gian:</span>
                    <span className="text-white">{selectedInvoice.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Khách hàng:</span>
                    <span className="font-bold text-white">
                      {selectedInvoice.customer} ({selectedInvoice.phone})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Barber thực hiện:</span>
                    <span className="text-amber-400 font-semibold">
                      {selectedInvoice.barber} • {selectedInvoice.chair}
                    </span>
                  </div>
                  <div className="py-3 border-y border-dashed border-zinc-700">
                    <p className="text-zinc-400 mb-1">Chi tiết thanh toán:</p>
                    <p className="font-semibold text-white">
                      {selectedInvoice.items}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="font-bold text-sm text-white">
                      TỔNG CỘNG ({selectedInvoice.method}):
                    </span>
                    <span className="text-lg font-bold text-emerald-400">
                      {formatVND(selectedInvoice.amount)}
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950/60 border-t border-barber-border">
                  <button
                    onClick={() => {
                      setSelectedInvoice(null);
                      showToast(
                        "Đã gửi lệnh in K80",
                        "Hóa đơn nhiệt đang được in tại quầy thu ngân!"
                      );
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                  >
                    <i className="fa-solid fa-print mr-1.5"></i> In Hóa Đơn
                    Nhiệt K80
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
