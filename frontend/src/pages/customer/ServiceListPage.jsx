// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /services (Danh sách bảng giá dịch vụ Barber & Salon)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ServiceListPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "Tất Cả (6)" },
    { id: "Cắt Tạo Kiểu", label: "Cắt Tạo Kiểu" },
    { id: "Combo VIP", label: "Combo VIP" },
    { id: "Uốn Tóc Nam", label: "Uốn Tóc Nam" },
    { id: "Nhuộm Thời Trang", label: "Nhuộm Màu" },
    { id: "Cạo Râu Classic", label: "Cạo Râu" },
    { id: "Chăm Sóc Da Đầu", label: "Chăm Sóc Da" },
  ];

  const services = [
    {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeText: "Cắt Tạo Kiểu",
      badgeClass: "bg-amber-500/90 text-zinc-950",
      price: "150.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeText: "Combo VIP",
      badgeClass: "bg-red-500/90 text-white",
      price: "250.000 đ",
      duration: "45 Phút",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeText: "Uốn Tóc Nam",
      badgeClass: "bg-blue-500/90 text-white",
      price: "450.000 đ",
      duration: "90 Phút",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Thời Trang",
      badgeText: "Nhuộm Màu",
      badgeClass: "bg-purple-500/90 text-white",
      price: "600.000 đ",
      duration: "120 Phút",
      image: "https://images.unsplash.com/photo-1517832606589-7629c3395909?w=600&auto=format&fit=crop&q=80",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeText: "Cạo Râu Classic",
      badgeClass: "bg-emerald-500/90 text-white",
      price: "100.000 đ",
      duration: "20 Phút",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeText: "Chăm Sóc Da Đầu",
      badgeClass: "bg-amber-500/90 text-zinc-950",
      price: "200.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1519500570469-6502c314d43f?w=600&auto=format&fit=crop&q=80",
      desc: "Tẩy sạch bã nhờn chân tóc, thanh lọc da đầu bằng muối khoáng sinh học, thông thoáng mát lạnh."
    }
  ];

  const filteredServices = services.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Bảng Giá Dịch Vụ 2026</span>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Dịch Vụ Cắt Tóc & Chăm Sóc Quý Ông</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Cam kết giá niêm yết minh bạch, bảo hành 7 ngày và đồ uống thảo mộc miễn phí.</p>
        </div>
        <Link
          to="/booking/service"
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-1.5 self-start md:self-auto"
        >
          <i className="ph-bold ph-calendar-plus text-base"></i>
          <span>Đặt Lịch Ngay</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5">
        <div className="relative">
          <i className="ph-bold ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm dịch vụ (ví dụ: Fade, Uốn Hàn Quốc, Gội đầu thảo mộc, Cạo râu...)"
            className="w-full pl-11 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-500 focus:border-amber-500 outline-none transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "bg-zinc-950 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full py-16 text-center text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-3xl">
            <i className="ph-bold ph-magnifying-glass text-4xl mb-3 text-zinc-600 block"></i>
            <h4 className="text-base font-bold text-white">Không tìm thấy dịch vụ phù hợp!</h4>
            <p className="text-xs text-zinc-400 mt-1">Vui lòng thử từ khóa tìm kiếm khác hoặc chuyển danh mục.</p>
          </div>
        ) : (
          filteredServices.map((s) => (
            <div
              key={s.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 transition group flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase backdrop-blur-md ${s.badgeClass}`}>
                    {s.badgeText}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold bg-zinc-950/80 text-zinc-200 backdrop-blur-md flex items-center">
                    <i className="ph-bold ph-clock mr-1 text-amber-400"></i> {s.duration}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    {s.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-medium">Giá niêm yết</span>
                  <span className="text-xl font-black text-amber-400">{s.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/services/${s.id}`}
                    className="px-3.5 py-2 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition"
                  >
                    Chi Tiết
                  </Link>
                  <Link
                    to={`/booking/service?service=${encodeURIComponent(s.name)}`}
                    className="px-3.5 py-2 text-xs font-black bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl transition shadow-md shadow-amber-500/20"
                  >
                    Đặt Ngay
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
