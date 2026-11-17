// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /my-bookings (Quản lý lịch sử cuộc hẹn cắt tóc của khách hàng)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BookingHistoryPage() {
  const [filterTab, setFilterTab] = useState("all");
  const [toastMessage, setToastMessage] = useState(null);

  const [bookings, setBookings] = useState([
    {
      id: "bk-101",
      code: "BH-98214",
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      category: "Cắt Tạo Kiểu",
      barber: "Tuấn Master",
      chair: "Ghế Barber VIP 01",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "09:00 AM",
      date: "16/11/2026",
      price: "250.000 đ",
      status: "Xong",
      canCancel: false,
    },
    {
      id: "bk-102",
      code: "BH-98350",
      service: "Combo Cắt Gội Massage Đăng Quang",
      category: "Combo VIP",
      barber: "Tuấn Master",
      chair: "Ghế VIP 01",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "03:30 PM",
      date: "Hôm nay",
      price: "250.000 đ",
      status: "Đang Cắt",
      canCancel: false,
    },
    {
      id: "bk-103",
      code: "BH-98402",
      service: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      barber: "Minh Barber",
      chair: "Ghế 02",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "10:00 AM",
      date: "20/11/2026",
      price: "450.000 đ",
      status: "Đã Đặt",
      canCancel: true,
    },
    {
      id: "bk-104",
      code: "BH-97911",
      service: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      barber: "Dũng Barber",
      chair: "Ghế 04",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "02:00 PM",
      date: "02/11/2026",
      price: "200.000 đ",
      status: "Xong",
      canCancel: false,
    },
    {
      id: "bk-105",
      code: "BH-97500",
      service: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      barber: "Hoàng Stylist",
      chair: "Ghế 03",
      branch: "Hàng Bạc, Hoàn Kiếm, Hà Nội",
      time: "04:00 PM",
      date: "15/10/2026",
      price: "600.000 đ",
      status: "Đã Hủy",
      canCancel: false,
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelBooking = (bookingId, serviceName) => {
    if (window.confirm(`Bạn có chắc muốn hủy lịch hẹn "${serviceName}"?`)) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "Đã Hủy", canCancel: false } : b))
      );
      showToast("Đã hủy lịch hẹn thành công!");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === "all") return true;
    if (filterTab === "upcoming") return b.status === "Đã Đặt" || b.status === "Đang Cắt";
    if (filterTab === "completed") return b.status === "Xong";
    if (filterTab === "cancelled") return b.status === "Đã Hủy";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-zinc-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold">
          <i className="ph-bold ph-check-circle text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-800 pb-5">
        <div>
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Theo Dõi Cuộc Hẹn</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Lịch Hẹn Cắt Tóc Của Tôi</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Quản lý các lịch hẹn sắp tới, theo dõi tiến độ và đánh giá chất lượng phục vụ.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 p-1.5 bg-zinc-900 rounded-2xl border border-zinc-800 shrink-0">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterTab === "all"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setFilterTab("upcoming")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterTab === "upcoming"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Sắp Tới
          </button>
          <button
            onClick={() => setFilterTab("completed")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterTab === "completed"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Hoàn Thành
          </button>
          <button
            onClick={() => setFilterTab("cancelled")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filterTab === "cancelled"
                ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            Đã Hủy
          </button>
        </div>
      </div>

      {/* Booking List Container */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <i className="ph-bold ph-calendar-blank text-5xl mb-3 text-zinc-600 block"></i>
            <h4 className="text-base font-bold text-white">Chưa có lịch hẹn nào!</h4>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">Bạn chưa có lịch hẹn nào trong mục này. Hãy trải nghiệm dịch vụ tóc chuẩn quý ông ngay hôm nay.</p>
            <Link
              to="/booking/service"
              className="inline-block mt-4 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs rounded-xl transition shadow-md shadow-amber-500/20"
            >
              Đặt Lịch Cắt Ngay
            </Link>
          </div>
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-6 hover:border-zinc-700 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 text-xl font-black">
                    <i className="ph-bold ph-scissors"></i>
                  </div>
                  <div>
                    <span className="text-xs font-extrabold text-amber-400 block">{b.time} • {b.date}</span>
                    <h3 className="text-base font-bold text-white mt-0.5">{b.service}</h3>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {b.status === "Xong" && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Hoàn Thành
                    </span>
                  )}
                  {b.status === "Đang Cắt" && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5 animate-pulse"></span>
                      Đang Cắt
                    </span>
                  )}
                  {b.status === "Đã Đặt" && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Sắp Tới
                    </span>
                  )}
                  {b.status === "Đã Hủy" && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-zinc-800 text-zinc-400">
                      Đã Hủy
                    </span>
                  )}
                  <span className="text-base font-black text-amber-400">{b.price}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Thợ thực hiện</span>
                  <span className="font-bold text-white mt-0.5 block">{b.barber}</span>
                </div>
                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Vị trí ghế</span>
                  <span className="font-bold text-white mt-0.5 block">{b.chair}</span>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 bg-zinc-950 rounded-xl border border-zinc-800/80">
                  <span className="text-[10px] text-zinc-500 uppercase block font-semibold">Chi nhánh</span>
                  <span className="font-bold text-amber-400 mt-0.5 block">{b.branch}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-500">Mã đặt lịch: <strong className="text-zinc-400">#{b.code}</strong></span>
                <div className="flex items-center space-x-2">
                  {b.canCancel && (
                    <button
                      onClick={() => handleCancelBooking(b.id, b.service)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 rounded-xl text-xs font-bold transition"
                    >
                      Hủy Lịch Hẹn
                    </button>
                  )}

                  {(b.status === "Đã Đặt" || b.status === "Đang Cắt") && (
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                    >
                      <i className="ph-bold ph-navigation-arrow text-amber-400"></i>
                      <span>Chỉ Đường</span>
                    </a>
                  )}

                  {b.status === "Xong" && (
                    <>
                      <Link
                        to="/my-invoices"
                        className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                      >
                        <i className="ph-bold ph-receipt text-amber-400"></i>
                        <span>Hóa Đơn</span>
                      </Link>
                      <Link
                        to="/reviews"
                        className="px-3.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold transition flex items-center space-x-1"
                      >
                        <span>⭐ Đánh Giá</span>
                      </Link>
                      <Link
                        to={`/booking/service?service=${encodeURIComponent(b.service)}`}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl text-xs font-bold transition"
                      >
                        Đặt Lại Kiểu Này
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
