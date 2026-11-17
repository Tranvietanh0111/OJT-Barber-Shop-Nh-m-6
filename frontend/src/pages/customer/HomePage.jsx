// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: / (Trang chủ khách hàng BarberHub)
import { Link } from "react-router-dom";

export default function HomePage() {
  const featuredServices = [
    {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      price: "150.000 đ",
      duration: "30 Phút",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",
      price: "250.000 đ",
      duration: "45 Phút",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      price: "450.000 đ",
      duration: "90 Phút",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      price: "600.000 đ",
      duration: "120 Phút",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      price: "100.000 đ",
      duration: "20 Phút",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      price: "200.000 đ",
      duration: "30 Phút",
      desc: "Tẩy sạch bã nhờn chân tóc, thanh lọc da đầu bằng muối khoáng sinh học, thông thoáng mát lạnh."
    }
  ];

  const masterBarbers = [
    {
      id: "barber-1",
      name: "Tuấn Master",
      role: "Chuyên gia Fade & Cạo Classic",
      rating: "4.98",
      completedCuts: 142,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-zinc-950",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-2",
      name: "Minh Barber",
      role: "Thợ Chính Uốn Texture & Sidepart",
      rating: "4.95",
      completedCuts: 128,
      status: "Đang cắt",
      statusClass: "bg-amber-500 text-zinc-950",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-3",
      name: "Hoàng Stylist",
      role: "Chuyên Gia Nhuộm & Phối Màu",
      rating: "4.90",
      completedCuts: 95,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-zinc-950",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-4",
      name: "Dũng Barber",
      role: "Thợ Cắt Phom Cổ Điển",
      rating: "4.92",
      completedCuts: 88,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-zinc-950",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="space-y-16 py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. HERO BANNER SECTION */}
      <section>
        <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <i className="ph-bold ph-crown text-sm"></i>
              <span>Hair Salon Suite Dành Riêng Cho Quý Ông</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Tút Lại Phong Độ, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                Định Hình Đẳng Cấp.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              Hệ thống cắt tóc & chăm sóc râu chuyên nghiệp hàng đầu. Đặt lịch trực tuyến 30 giây để được phục vụ đúng giờ, không xếp hàng chờ đợi cùng đội ngũ Master Barber tay nghề cao.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/booking/service"
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <i className="ph-bold ph-calendar-check text-lg"></i>
                <span>Đặt Lịch Cắt Tóc Ngay</span>
              </Link>
              <Link
                to="/services"
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-bold text-sm rounded-2xl transition"
              >
                Khám Phá Bảng Giá
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-800/80">
              <div>
                <span className="text-2xl font-black text-white">4.98★</span>
                <p className="text-xs text-zinc-500 mt-0.5">Đánh giá trung bình</p>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-400">10.000+</span>
                <p className="text-xs text-zinc-500 mt-0.5">Khách hàng tin chọn</p>
              </div>
              <div>
                <span className="text-2xl font-black text-white">4 Ghế VIP</span>
                <p className="text-xs text-zinc-500 mt-0.5">Phục vụ liên tục</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES SECTION */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Dịch Vụ Nổi Bật</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Bảng Giá Dịch Vụ Barber & Hair Salon</h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">Đầy đủ các gói cắt tạo kiểu, uốn nhuộm thời trang và spa thư giãn chuyên sâu.</p>
          </div>
          <Link to="/services" className="inline-flex items-center text-xs font-bold text-amber-400 hover:underline">
            Xem tất cả 6 dịch vụ →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((s) => (
            <div
              key={s.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 transition group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${s.badgeClass}`}>
                    {s.category}
                  </span>
                  <span className="text-xs text-zinc-500 flex items-center font-medium">
                    <i className="ph-bold ph-clock mr-1 text-amber-400"></i> {s.duration}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-3 group-hover:text-amber-400 transition">
                  {s.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-medium">Giá niêm yết</span>
                  <span className="text-xl font-black text-amber-400">{s.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/services/${s.id}`}
                    className="px-3 py-2 text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl transition"
                  >
                    Chi Tiết
                  </Link>
                  <Link
                    to={`/booking/service?service=${encodeURIComponent(s.name)}`}
                    className="px-3.5 py-2 text-xs font-black bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl transition shadow-md shadow-amber-500/20 flex items-center space-x-1"
                  >
                    <span>Đặt Ngay</span>
                    <i className="ph-bold ph-arrow-right text-xs"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MASTER BARBERS TEAM */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Đội Ngũ Nghệ Nhân</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">Gặp Gỡ Đội Ngũ Master Barber</h2>
          <p className="text-xs sm:text-sm text-zinc-400">Những người thợ tâm huyết với tay nghề dao kéo điêu luyện sẵn sàng tạo nên diện mạo hoàn hảo cho bạn.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {masterBarbers.map((b) => (
            <div
              key={b.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center hover:border-zinc-700 hover:shadow-xl transition flex flex-col justify-between group"
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
                <p className="text-xs text-zinc-400 mt-1 flex items-center justify-center space-x-1">
                  <span className="text-amber-400">★ {b.rating}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{b.completedCuts} lượt cắt</span>
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-zinc-800/80">
                <Link
                  to={`/booking/barber?barber=${encodeURIComponent(b.name)}`}
                  className="w-full py-2.5 bg-zinc-950 hover:bg-amber-500 hover:text-zinc-950 text-zinc-300 border border-zinc-800 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5"
                >
                  <i className="ph-bold ph-scissors text-amber-400 group-hover:text-zinc-950"></i>
                  <span>Đặt Ghế Với Thợ</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SALON HIGHLIGHTS / PROMISES */}
      <section>
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-lg mx-auto mb-10">
            <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Đặc Quyền Của Bạn</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Cam Kết Trải Nghiệm Đẳng Cấp 5 Sao</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <i className="ph-bold ph-shield-check"></i>
              </div>
              <h4 className="font-bold text-white text-base">Vệ Sinh Tuyệt Đối</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                100% dao lam thay mới trước mặt khách, khăn nóng thảo mộc và dụng cụ khử trùng bằng tia cực tím UV.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <i className="ph-bold ph-medal"></i>
              </div>
              <h4 className="font-bold text-white text-base">Master Barbers</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Đội ngũ thợ chính giàu kinh nghiệm, đào tạo bài bản và luôn cập nhật xu hướng tóc nam quốc tế mới nhất.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <i className="ph-bold ph-arrow-counter-clockwise"></i>
              </div>
              <h4 className="font-bold text-white text-base">Bảo Hành 7 Ngày</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bảo hành nếp tóc và hỗ trợ chỉnh sửa hoàn toàn miễn phí nếu khách hàng chưa thực sự ưng ý với kiểu tóc.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <i className="ph-bold ph-coffee"></i>
              </div>
              <h4 className="font-bold text-white text-base">Đồ Uống & Spa Free</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Trà sen thảo mộc, cà phê hạt rang xay miễn phí cùng dịch vụ massage cổ vai gáy thư giãn giải tỏa mệt mỏi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section>
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-8 sm:p-12 text-center text-zinc-950 relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-zinc-950 text-amber-400 text-xs font-black uppercase tracking-wider">
              Sẵn Sàng Phục Vụ Bạn
            </span>
            <h2 className="text-2xl sm:text-4xl font-black">Đặt Chỗ Trước Để Không Phải Chờ Đợi</h2>
            <p className="text-xs sm:text-sm text-zinc-900 font-medium leading-relaxed">
              Hệ thống sắp lịch tự động giữ chỗ theo đúng giờ hẹn với thợ ruột. Tận hưởng không gian sang trọng và tay nghề đẳng cấp.
            </p>
            <div className="pt-2">
              <Link
                to="/booking/service"
                className="inline-flex items-center space-x-2 px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 text-white font-extrabold text-sm rounded-2xl shadow-xl transition"
              >
                <i className="ph-bold ph-calendar-check text-amber-400 text-base"></i>
                <span>Đặt Lịch Ngay Trong 30 Giây</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
