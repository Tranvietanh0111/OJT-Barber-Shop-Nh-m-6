// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: / (Trang chủ khách hàng BarberHub - Phong cách Red, White, Blue & Tailwind CSS)
import { Link } from "react-router-dom";

export default function HomePage() {
  const featuredServices = [
    {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      price: "150.000 đ",
      duration: "30 Phút",
      desc: "Tư vấn phom tóc phù hợp khuôn mặt (Sidepart, Undercut, Fade), sấy tạo kiểu ép hairline sắc nét."
    },
    {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeClass: "bg-red-50 text-red-700 border-red-200",
      price: "250.000 đ",
      duration: "45 Phút",
      desc: "Cắt tóc, rửa mặt thảo mộc, gội đầu dưỡng sinh, massage bấm huyệt cổ vai gáy, sấy vuốt sáp tạo kiểu."
    },
    {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
      price: "450.000 đ",
      duration: "90 Phút",
      desc: "Định hình phom tóc bồng bềnh chuẩn soái ca, sử dụng thuốc uốn collagen không khô rát da đầu."
    },
    {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      badgeClass: "bg-red-50 text-red-600 border-red-200",
      price: "600.000 đ",
      duration: "120 Phút",
      desc: "Tẩy khói, nâu tây, xanh rêu, xám chì... Tặng kèm hấp phục hồi khóa màu siêu mượt."
    },
    {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      price: "100.000 đ",
      duration: "20 Phút",
      desc: "Cạo bằng dao thợ truyền thống, ủ khăn nóng tinh dầu thảo mộc, bôi lotion sau cạo kháng khuẩn."
    },
    {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
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
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-2",
      name: "Minh Barber",
      role: "Thợ Chính Uốn Texture & Sidepart",
      rating: "4.95",
      completedCuts: 128,
      status: "Đang cắt",
      statusClass: "bg-red-500 text-white",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-3",
      name: "Hoàng Stylist",
      role: "Chuyên Gia Nhuộm & Phối Màu",
      rating: "4.90",
      completedCuts: 95,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=240&auto=format&fit=crop&q=80"
    },
    {
      id: "barber-4",
      name: "Dũng Barber",
      role: "Thợ Cắt Phom Cổ Điển",
      rating: "4.92",
      completedCuts: 88,
      status: "Sẵn sàng",
      statusClass: "bg-emerald-500 text-white",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&auto=format&fit=crop&q=80"
    }
  ];

  const bookingSteps = [
    {
      step: "01",
      title: "Chọn Dịch Vụ",
      desc: "Lựa chọn các gói cắt tóc, uốn nhuộm thời trang hoặc spa thư giãn theo nhu cầu.",
      icon: "✂️"
    },
    {
      step: "02",
      title: "Chọn Master Barber",
      desc: "Chỉ định thợ ruột có tay nghề phù hợp với kiểu tóc bạn mong muốn.",
      icon: "💈"
    },
    {
      step: "03",
      title: "Chọn Khung Giờ",
      desc: "Hệ thống cập nhật thời gian thực, đảm bảo ghế trống sẵn sàng khi bạn tới.",
      icon: "🕒"
    },
    {
      step: "04",
      title: "Tút Tát Đẳng Cấp",
      desc: "Đến đúng giờ, thưởng thức trà bánh miễn phí và đón nhận diện mạo tự tin.",
      icon: "👑"
    }
  ];

  const customerReviews = [
    {
      name: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierClass: "bg-red-50 text-red-600 border-red-200",
      stars: 5,
      comment: "Tuấn Master cắt cực kỳ tỉ mỉ! Hiệu ứng Skin Fade sắc nét, đường cạo viền chuẩn chỉ. Khăn nóng tinh dầu thảo mộc rất thư giãn, xứng đáng 5 sao cho chất lượng dịch vụ BarberHub."
    },
    {
      name: "Lê Minh Đức",
      tier: "Khách Thân Thiết",
      tierClass: "bg-blue-50 text-blue-700 border-blue-200",
      stars: 5,
      comment: "Lần đầu uốn tóc nhưng Minh Barber tư vấn phom cực kỳ chuẩn soái ca. Tóc uốn xong bồng bềnh tự nhiên, không bị khô xơ da đầu. Salon phục vụ trà sen rất ngon!"
    },
    {
      name: "Trần Quốc Bảo",
      tier: "Khách Thân Thiết",
      tierClass: "bg-blue-50 text-blue-700 border-blue-200",
      stars: 5,
      comment: "Tẩy khói ở đây cực kỳ êm ái, hoàn toàn không bị xót rát da đầu như các tiệm khác. Màu lên sáng và bóng mượt, được tặng kèm gói hấp collagen thơm nức."
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* 1. HERO BANNER SECTION (Blue, Red, White Theme) */}
        <section>
          <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 border border-blue-700/50 rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl text-white">
            {/* Background Glow Accents */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-500/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-3xl relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black uppercase tracking-wider shadow-inner">
                <span className="text-red-400">💈</span>
                <span>BarberHub</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Tút Lại Phong Độ, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-300">
                  Định Hình Đẳng Cấp.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl">
                Hệ thống cắt tóc & chăm sóc râu chuyên nghiệp chuẩn phong cách quý ông cổ điển. Đặt lịch trực tuyến 30 giây để được phục vụ đúng giờ, không xếp hàng chờ đợi cùng đội ngũ Master Barber hàng đầu.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/booking/service"
                  className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-red-600/30 transition transform hover:-translate-y-0.5 flex items-center space-x-2"
                >
                  <i className="ph-bold ph-scissors text-lg"></i>
                  <span>Đặt Lịch Cắt Tóc Ngay</span>
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 bg-white text-blue-900 hover:bg-blue-50 font-bold text-sm rounded-2xl shadow-lg transition flex items-center space-x-2"
                >
                  <i className="ph-bold ph-list-dashes text-lg text-blue-600"></i>
                  <span>Khám Phá Bảng Giá</span>
                </Link>

                <Link
                  to="/barbers"
                  className="px-6 py-3.5 bg-blue-700/80 hover:bg-blue-600 text-white border border-blue-400/40 font-bold text-sm rounded-2xl transition"
                >
                  Đội Ngũ Barber
                </Link>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/15">
                <div>
                  <span className="text-2xl font-black text-red-400">4.98★</span>
                  <p className="text-xs text-slate-300 mt-0.5">Đánh giá trung bình</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-white">10.000+</span>
                  <p className="text-xs text-slate-300 mt-0.5">Khách hàng tin chọn</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-blue-300">4 Ghế VIP</span>
                  <p className="text-xs text-slate-300 mt-0.5">Phục vụ liên tục</p>
                </div>
                <div>
                  <span className="text-2xl font-black text-red-400">100%</span>
                  <p className="text-xs text-slate-300 mt-0.5">Tiệt trùng UV chuẩn y tế</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FEATURED SERVICES SECTION */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Dịch Vụ Nổi Bật</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Bảng Giá Dịch Vụ Barber & Hair Salon</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Đầy đủ các gói cắt tạo kiểu, uốn nhuộm thời trang và spa thư giãn chuyên sâu.</p>
            </div>
            <Link to="/services" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition">
              <span>Xem tất cả 6 dịch vụ</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((s) => (
              <div
                key={s.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-extrabold uppercase px-3 py-1 rounded-full border ${s.badgeClass}`}>
                      {s.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center">
                      <i className="ph-bold ph-clock mr-1 text-blue-600"></i> {s.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-4 group-hover:text-blue-600 transition">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Giá niêm yết</span>
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
        </section>

        {/* 3. MASTER BARBERS SECTION */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-black uppercase text-blue-600 tracking-widest block">Đội Ngũ Tay Nghề Cao</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Nghệ Nhân Tạo Mẫu Master Barbers</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Được đào tạo bài bản chuẩn quốc tế với hơn 5 năm kinh nghiệm thực chiến.</p>
            </div>
            <Link to="/barbers" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition">
              <span>Gặp gỡ toàn bộ Barber</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {masterBarbers.map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 text-center hover:border-red-400 hover:shadow-xl hover:shadow-red-500/10 transition flex flex-col justify-between group"
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

                  <div className="flex items-center justify-center space-x-1 text-xs text-slate-500 mt-2">
                    <span className="text-red-600 font-bold">★ {b.rating}</span>
                    <span>•</span>
                    <span>{b.completedCuts} lượt cắt</span>
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
        </section>

        {/* 4. 4-STEP BOOKING PROCEDURE */}
        <section className="bg-gradient-to-r from-blue-50 via-white to-red-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Quy Trình Đơn Giản</span>
            <h2 className="text-2xl font-black text-slate-900">4 Bước Đặt Lịch Chuẩn Quý Ông</h2>
            <p className="text-xs sm:text-sm text-slate-500">Tiện lợi, nhanh gọn và đảm bảo luôn có ghế phục vụ đúng giờ đã chọn.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bookingSteps.map((st) => (
              <div key={st.step} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-blue-400 transition space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-blue-600/40">{st.step}</span>
                  <span className="text-2xl">{st.icon}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{st.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CUSTOMER REVIEWS / TESTIMONIALS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-black uppercase text-blue-600 tracking-widest block">Cảm Nhận Khách Hàng</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Trải Nghiệm Thực Tế Tại BarberHub</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Hơn 10.000 quý ông đã hài lòng với sự tận tâm và tay nghề của chúng tôi.</p>
            </div>
            <Link to="/reviews" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition">
              <span>Xem thêm đánh giá</span>
              <span className="ml-1">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customerReviews.map((r, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{r.name}</h4>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${r.tierClass}`}>
                    {r.tier}
                  </span>
                </div>
                <div className="text-red-500 text-sm">
                  {"★".repeat(r.stars)}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "{r.comment}"
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] text-blue-600 font-semibold">
                  <i className="ph-bold ph-check-circle mr-1"></i>
                  <span>Đã trải nghiệm dịch vụ tại salon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
