// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /my-invoices (Lịch sử hóa đơn điện tử & chi tiêu của khách hàng - Phong cách Red, White, Blue & Tailwind CSS)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function InvoiceHistoryPage() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoices = [
    {
      id: "inv-1",
      code: "INV-98214",
      date: "16/11/2026",
      time: "09:45 AM",
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      subtotal: "250.000 đ",
      discount: "-25.000 đ (10%)",
      total: "225.000 đ",
      paymentMethod: "VietQR (MB Bank)",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      id: "inv-2",
      code: "INV-97911",
      date: "02/11/2026",
      time: "02:40 PM",
      service: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      barber: "Dũng Barber",
      chair: "Ghế 04",
      subtotal: "200.000 đ",
      discount: "-20.000 đ (10%)",
      total: "180.000 đ",
      paymentMethod: "Thẻ Visa",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      id: "inv-3",
      code: "INV-96850",
      date: "18/10/2026",
      time: "11:15 AM",
      service: "Combo Cắt + Gội + Massage Đăng Quang",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      subtotal: "250.000 đ",
      discount: "-25.000 đ (10%)",
      total: "225.000 đ",
      paymentMethod: "Tiền mặt",
      badgeClass: "bg-slate-100 text-slate-700 border-slate-200"
    },
    {
      id: "inv-4",
      code: "INV-95200",
      date: "01/09/2026",
      time: "05:30 PM",
      service: "Uốn Xoăn Hàn Quốc Fly Texture + Phục Hồi",
      barber: "Minh Barber",
      chair: "Ghế 02",
      subtotal: "550.000 đ",
      discount: "-55.000 đ (10%)",
      total: "495.000 đ",
      paymentMethod: "VietQR (VCB)",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200"
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Accent Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Hóa Đơn Điện Tử</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Lịch Sử Chi Tiêu & Hóa Đơn</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Tra cứu chi tiết mọi hóa đơn dịch vụ cắt tóc và quyền lợi giảm giá VIP tại BarberHub.</p>
          </div>
          <Link
            to="/booking/service"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <i className="ph-bold ph-calendar-plus text-base"></i>
            <span>Đặt Lịch Cắt Mới</span>
          </Link>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">Tổng Chi Tiêu Năm 2026</span>
            <div className="text-3xl font-black text-red-600">2.850.000 đ</div>
            <p className="text-xs text-slate-500">12 lượt sử dụng dịch vụ tại salon</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">Tiết Kiệm Nhờ VIP</span>
            <div className="text-3xl font-black text-blue-600">315.000 đ</div>
            <p className="text-xs text-slate-500">Giảm 10% trọn đời mỗi lần sử dụng</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-sm">
            <span className="text-xs text-slate-400 font-extrabold uppercase tracking-wider block">Hạng Khách Hàng</span>
            <div className="text-3xl font-black text-slate-900">👑 Khách VIP</div>
            <p className="text-xs text-red-600 font-semibold">Ưu tiên giữ ghế & miễn phí đồ uống</p>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-600 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="px-5 py-4">Mã Hóa Đơn</th>
                  <th className="px-5 py-4">Thời Gian</th>
                  <th className="px-5 py-4">Dịch Vụ Cắt</th>
                  <th className="px-5 py-4">Thợ Cắt</th>
                  <th className="px-5 py-4">Tạm Tính</th>
                  <th className="px-5 py-4">Ưu Đãi VIP</th>
                  <th className="px-5 py-4">Tổng Thanh Toán</th>
                  <th className="px-5 py-4">Hình Thức</th>
                  <th className="px-5 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition">
                    <td className="px-5 py-4 font-black text-blue-600">#{inv.code}</td>
                    <td className="px-5 py-4 text-slate-700">
                      <span className="font-bold block">{inv.time}</span>
                      <span className="text-[11px] text-slate-400">{inv.date}</span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-900">{inv.service}</td>
                    <td className="px-5 py-4 text-slate-700">
                      <span className="font-bold block">{inv.barber}</span>
                      <span className="text-[11px] text-blue-600">{inv.chair}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-500">{inv.subtotal}</td>
                    <td className="px-5 py-4 text-blue-600 font-bold">{inv.discount}</td>
                    <td className="px-5 py-4 font-black text-red-600 text-sm">{inv.total}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${inv.badgeClass}`}>
                        {inv.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 rounded-xl font-bold transition shadow-sm"
                      >
                        Chi Tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Electronic Invoice Modal */}
        {selectedInvoice && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedInvoice(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                  <i className="ph-bold ph-receipt text-red-600 text-lg"></i>
                  <span>Hóa Đơn Điện Tử BarberHub</span>
                </h3>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-slate-400 hover:text-slate-700 p-1"
                >
                  <i className="ph-bold ph-x text-lg"></i>
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="text-center border-b border-slate-200 pb-2">
                  <h2 className="font-black text-blue-900 text-sm uppercase">BARBERHUB SALON SUITE</h2>
                  <p className="text-[10px] text-slate-500">Chi nhánh Hàng Bạc, Hoàn Kiếm, Hà Nội</p>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mã hóa đơn:</span>
                    <strong className="text-blue-600">#{selectedInvoice.code}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian:</span>
                    <span className="text-slate-700">{selectedInvoice.time} - {selectedInvoice.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khách hàng:</span>
                    <span className="text-slate-900 font-bold">Anh Hoàng Nam (VIP)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thợ cắt:</span>
                    <span className="text-slate-900">{selectedInvoice.barber} ({selectedInvoice.chair})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dịch vụ:</span>
                    <span className="text-slate-900 font-bold">{selectedInvoice.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tạm tính:</span>
                    <span className="text-slate-500">{selectedInvoice.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Giảm giá VIP:</span>
                    <span className="text-blue-600 font-bold">{selectedInvoice.discount}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900">Tổng Thanh Toán:</span>
                  <span className="text-lg font-black text-red-600">{selectedInvoice.total}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-emerald-700 font-bold text-xs">
                  ✓ Đã thanh toán qua {selectedInvoice.paymentMethod}
                </div>
              </div>

              <div className="flex space-x-2 pt-1">
                <button
                  onClick={() => alert("Đang tải hóa đơn PDF về máy...")}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Tải PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
