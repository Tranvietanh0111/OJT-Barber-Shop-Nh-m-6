// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /services (Danh sách bảng giá dịch vụ Barber & Salon - Phong cách Red, White, Blue & Tailwind CSS)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ServiceListPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "Tất Cả" },
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
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      price: "150.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=80",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeClass: "bg-red-50 text-red-700 border-red-200",
      price: "250.000 đ",
      duration: "45 Phút",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
      price: "450.000 đ",
      duration: "90 Phút",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&auto=format&fit=crop&q=80",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Thời Trang",
      badgeClass: "bg-red-50 text-red-600 border-red-200",
      price: "600.000 đ",
      duration: "120 Phút",
      image: "https://images.unsplash.com/photo-1517832606589-7629c3395909?w=600&auto=format&fit=crop&q=80",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      price: "100.000 đ",
      duration: "20 Phút",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
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
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Accent Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        
        {/* Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Bảng Giá Niêm Yết</span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-1">Menu Dịch Vụ Cắt Tóc & Spa Nam Cao Cấp</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Cam kết không chèo kéo, không phát sinh chi phí. Miễn phí trà sen và tư vấn dáng tóc.</p>
          </div>
          <Link
            to="/booking/service"
            className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-lg shadow-red-600/25 transition flex items-center space-x-1.5 self-start md:self-auto"
          >
            <i className="ph-bold ph-calendar-plus text-base"></i>
            <span>Đặt Lịch Giữ Chỗ Ngay</span>
          </Link>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-blue-600 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <i className="ph-bold ph-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition shadow-sm"
            />
          </div>
        </div>

        {/* Services Grid or Empty State */}
        {filteredServices.length === 0 ? (
          <div className="py-16 text-center bg-white border border-slate-200 rounded-3xl shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-3xl mx-auto">
              <i className="ph-bold ph-scissors"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Không tìm thấy dịch vụ phù hợp!</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Thử tìm kiếm với từ khóa khác hoặc bấm nút bên dưới để xem lại toàn bộ dịch vụ của salon.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-md shadow-blue-600/20"
            >
              Xem Tất Cả Dịch Vụ
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase backdrop-blur-md border ${s.badgeClass}`}>
                      {s.category}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-md flex items-center">
                      <i className="ph-bold ph-clock mr-1 text-red-400"></i> {s.duration}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {s.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Giá trọn gói</span>
                    <span className="text-xl font-black text-red-600">{s.price}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/services/${s.id}`}
                      className="px-3.5 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                    >
                      Chi Tiết
                    </Link>
                    <Link
                      to={`/booking/service?service=${encodeURIComponent(s.name)}`}
                      className="px-4 py-2 text-xs font-black bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/20 transition flex items-center space-x-1"
                    >
                      <span>Đặt Ngay</span>
                      <i className="ph-bold ph-arrow-right text-xs"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STANDARDS / COMMITMENTS SECTION */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-8 shadow-sm">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Cam Kết Chất Lượng</span>
            <h2 className="text-2xl font-black text-slate-900">Đặc Quyền Dành Cho Khách Hàng BarberHub</h2>
            <p className="text-xs sm:text-sm text-slate-500">Mỗi quý ông khi ghé thăm salon đều được bảo đảm quyền lợi tối đa và sự chăm sóc ân cần.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <i className="ph-bold ph-shield-check"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bảo Hành 7 Ngày</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chỉnh sửa phom tóc hoàn toàn miễn phí nếu bạn cảm thấy chưa ưng ý bất kỳ chi tiết nào.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                <i className="ph-bold ph-sparkle"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Tiệt Trùng UV 100%</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kéo, tông đơ, lược và khăn lau đều được khử trùng bằng tủ cực tím trước khi phục vụ.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                <i className="ph-bold ph-drop"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Mỹ Phẩm Cao Cấp</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Sử dụng 100% sản phẩm hữu cơ nhập khẩu chính hãng từ Mỹ, Ý, Nhật an toàn cho da đầu.
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                <i className="ph-bold ph-coffee"></i>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Thức Uống Miễn Phí</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Trà sen thảo mộc, cà phê rang xay nguyên chất và khăn lạnh phục vụ xuyên suốt trải nghiệm.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
