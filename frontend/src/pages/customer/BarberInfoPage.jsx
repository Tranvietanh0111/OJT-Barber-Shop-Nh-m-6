// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /barbers (Thông tin & Đội ngũ Nghệ nhân Cắt Tóc Master Barber)
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
      statusClass: "bg-emerald-500 text-zinc-950",
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
      statusClass: "bg-amber-500 text-zinc-950",
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
      statusClass: "bg-emerald-500 text-zinc-950",
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
      statusClass: "bg-emerald-500 text-zinc-950",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Đội Ngũ Tay Nghề Cao</span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Master Barbers & Nghệ Nhân Tạo Mẫu</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Mỗi người thợ tại BarberHub đều có từ 5 năm kinh nghiệm và chứng chỉ nghề quốc tế.</p>
        </div>
        <Link
          to="/booking/barber"
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-1.5 self-start md:self-auto"
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
              ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
              : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
          }`}
        >
          Tất Cả Thợ ({barbers.length})
        </button>
        <button
          onClick={() => setFilter("fade")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filter === "fade"
              ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
              : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
          }`}
        >
          Chuyên Fade & Classic
        </button>
        <button
          onClick={() => setFilter("perm")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filter === "perm"
              ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
              : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
          }`}
        >
          Chuyên Uốn Tạo Phồng
        </button>
        <button
          onClick={() => setFilter("color")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filter === "color"
              ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
              : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
          }`}
        >
          Chuyên Nhuộm Thời Trang
        </button>
        <button
          onClick={() => setFilter("classic")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            filter === "classic"
              ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
              : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
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
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition flex flex-col justify-between group"
          >
            <div>
              <div className="relative w-28 h-28 mx-auto mb-4">
                <img
                  src={b.avatar}
                  alt={b.name}
                  className="w-full h-full rounded-2xl object-cover ring-2 ring-amber-500/40 group-hover:ring-amber-500 transition"
                />
                <span className={`absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-black ${b.statusClass}`}>
                  {b.status}
                </span>
              </div>

              <h3 className="font-bold text-white text-base">{b.name}</h3>
              <p className="text-xs text-amber-400 font-semibold mt-0.5">{b.role}</p>

              <div className="flex items-center justify-center space-x-1 text-xs text-zinc-400 mt-1">
                <span className="text-amber-400 font-bold">★ {b.rating}</span>
                <span className="text-zinc-600">•</span>
                <span>{b.chairName}</span>
                <span className="text-zinc-600">•</span>
                <span>{b.completedCuts} lượt cắt</span>
              </div>

              <p className="text-xs text-zinc-400 mt-3 text-left leading-relaxed">
                {b.bio}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3 text-left">
                {b.strengths.map((str, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-300"
                  >
                    ✓ {str}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-800">
              <Link
                to={`/booking/barber?barber=${encodeURIComponent(b.name)}`}
                className="w-full py-2.5 bg-zinc-950 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
              >
                <i className="ph-bold ph-scissors text-amber-400 group-hover:text-zinc-950"></i>
                <span>Đặt Ghế Với {b.name.split(" ")[0]}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Standards Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Tiêu Chuẩn Nghệ Nhân</span>
          <h2 className="text-2xl font-black text-white">Tại Sao Khách Hàng Tin Tưởng BarberHub?</h2>
          <p className="text-xs sm:text-sm text-zinc-400">Mỗi đường kéo đều là tâm huyết và sự tận tụy nhằm mang đến diện mạo hoàn hảo nhất cho quý khách.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
              <i className="ph-bold ph-trophy"></i>
            </div>
            <h4 class="font-bold text-white text-base">Kỹ Năng Đỉnh Cao</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              100% thợ chính đều trải qua các kỳ sát hạch tay nghề khắt khe hàng quý và đào tạo xu hướng mới.
            </p>
          </div>

          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
              <i className="ph-bold ph-heart"></i>
            </div>
            <h4 class="font-bold text-white text-base">Tư Vấn Tận Tâm</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Lắng nghe kỹ lưỡng thói quen vuốt tóc, môi trường làm việc để tư vấn kiểu tóc thuận tiện nhất.
            </p>
          </div>

          <div className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
              <i className="ph-bold ph-shield-check"></i>
            </div>
            <h4 class="font-bold text-white text-base">Đảm Bảo Hài Lòng</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Bảo hành 7 ngày miễn phí. Nếu bạn chưa ưng ý bất kỳ chi tiết nào, chúng tôi sẽ chỉnh sửa tận tình.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
