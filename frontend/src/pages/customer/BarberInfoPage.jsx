// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /barbers (Thông tin & Đội ngũ Nghệ nhân Cắt Tóc Master Barber - Phong cách Red, White, Blue & Tailwind CSS)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function BarberInfoPage() {
  const [filter, setFilter] = useState("all");

  const barbers = [
    {
      id: "barber-1",
      name: "Tuấn Master",
      role: "Chuyên Gia Fade & Cạo Classic",
      specialty: "fade",
      rating: "4.98",
      reviewsCount: 210,
      chairName: "Ghế VIP 01",
      experience: "8 năm kinh nghiệm",
      completedCuts: 142,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "Tốt nghiệp Học viện Barber Singapore. Bậc thầy kỹ thuật Skin Fade, Taper Fade và nghệ thuật cạo râu khăn nóng hoàng gia.",
      strengths: ["Skin Fade sắc nét", "Cạo khăn nóng", "Phom doanh nhân"]
    },
    {
      id: "barber-2",
      name: "Minh Barber",
      role: "Thợ Chính Uốn Texture & Sidepart",
      specialty: "perm",
      rating: "4.95",
      reviewsCount: 184,
      chairName: "Ghế 02",
      experience: "6 năm kinh nghiệm",
      completedCuts: 128,
      status: "Đang cắt",
      statusClass: "bg-red-500 text-white",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
      bio: "Được mệnh danh là 'phù thủy uốn phồng tóc nam'. Chuyên xử lý các loại tóc chỉa, xẹp, mang lại lọn xoăn tự nhiên bồng bềnh.",
      strengths: ["Uốn Fly / Texture", "Ép side nếp tóc", "Sidepart hiện đại"]
    },
    {
      id: "barber-3",
      name: "Hoàng Stylist",
      role: "Chuyên Gia Nhuộm & Phối Màu",
      specialty: "color",
      rating: "4.90",
      reviewsCount: 120,
      chairName: "Ghế 03",
      experience: "5 năm kinh nghiệm",
      completedCuts: 95,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80",
      bio: "Chuyên sâu về lý thuyết màu sắc và kỹ thuật nâng nền chuẩn châu Âu. Cam kết màu chuẩn tone, không xót rát và tóc suôn mượt.",
      strengths: ["Nhuộm khói & xám", "Tẩy không rát da", "Phục hồi Keratin"]
    },
    {
      id: "barber-4",
      name: "Dũng Barber",
      role: "Thợ Cắt Phom Cổ Điển",
      specialty: "classic",
      rating: "4.92",
      reviewsCount: 110,
      chairName: "Ghế 04",
      experience: "7 năm kinh nghiệm",
      completedCuts: 88,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      bio: "Đam mê nét đẹp cổ điển quý ông thập niên 60s. Khắc họa chính xác các kiểu tóc Pompadour, Slick Back và Ivy League sang trọng.",
      strengths: ["Cắt Pompadour", "Slick Back bóng bẩy", "Viền sắc sảo"]
    }
  ];

  const filteredBarbers = barbers.filter((b) => {
    if (filter === "all") return true;
    return b.specialty === filter;
  });

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Accent Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Đội Ngũ Tay Nghề Cao</span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">Master Barbers & Nghệ Nhân Tạo Mẫu</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Mỗi người thợ tại BarberHub đều có từ 5 năm kinh nghiệm và chứng chỉ nghề quốc tế.</p>
          </div>
          <Link
            to="/booking/barber"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center space-x-1.5 self-start md:self-auto"
          >
            <i className="ph-bold ph-calendar-plus text-base"></i>
            <span>Đặt Lịch Thợ Yêu Thích</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === "all"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-red-600 border border-slate-200"
            }`}
          >
            Tất Cả Thợ ({barbers.length})
          </button>
          <button
            onClick={() => setFilter("fade")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === "fade"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-red-600 border border-slate-200"
            }`}
          >
            Chuyên Fade & Classic
          </button>
          <button
            onClick={() => setFilter("perm")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === "perm"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-red-600 border border-slate-200"
            }`}
          >
            Chuyên Uốn Tạo Phồng
          </button>
          <button
            onClick={() => setFilter("color")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === "color"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-red-600 border border-slate-200"
            }`}
          >
            Chuyên Nhuộm Thời Trang
          </button>
          <button
            onClick={() => setFilter("classic")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              filter === "classic"
                ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                : "bg-white text-slate-600 hover:bg-slate-100 hover:text-red-600 border border-slate-200"
            }`}
          >
            Phom Cổ Điển Quý Ông
          </button>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBarbers.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 text-center hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-full h-full rounded-2xl object-cover ring-2 ring-blue-600 group-hover:ring-red-500 transition"
                  />
                  <span className={`absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow ${b.statusClass}`}>
                    {b.status}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">{b.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-0.5">{b.role}</p>

                <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 mt-1">
                  <span className="text-red-600 font-bold">★ {b.rating}</span>
                  <span>•</span>
                  <span>{b.chairName}</span>
                  <span>•</span>
                  <span>{b.completedCuts} lượt cắt</span>
                </div>

                <p className="text-xs text-slate-600 mt-3 text-left leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {b.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3 text-left">
                  {b.strengths.map((str, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[10px] font-semibold text-blue-700"
                    >
                      ✓ {str}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  to={`/booking/barber?barber=${encodeURIComponent(b.name)}`}
                  className="w-full py-2.5 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <i className="ph-bold ph-scissors"></i>
                  <span>Đặt Ghế Với {b.name.split(" ")[0]}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Standards Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Tiêu Chuẩn Nghệ Nhân</span>
            <h2 className="text-2xl font-black text-slate-900">Tại Sao Khách Hàng Tin Tưởng BarberHub?</h2>
            <p className="text-xs sm:text-sm text-slate-500">Mỗi đường kéo đều là tâm huyết và sự tận tụy nhằm mang đến diện mạo hoàn hảo nhất cho quý khách.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
                <i className="ph-bold ph-trophy"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Kỹ Năng Đỉnh Cao</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                100% thợ chính đều trải qua các kỳ sát hạch tay nghề khắt khe hàng quý và đào tạo xu hướng mới.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl">
                <i className="ph-bold ph-heart"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Tư Vấn Tận Tâm</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Lắng nghe kỹ lưỡng thói quen vuốt tóc, môi trường làm việc để tư vấn kiểu tóc thuận tiện nhất.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
                <i className="ph-bold ph-shield-check"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-base">Đảm Bảo Hài Lòng</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bảo hành 7 ngày miễn phí. Nếu bạn chưa ưng ý bất kỳ chi tiết nào, chúng tôi sẽ chỉnh sửa tận tình.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
