// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /services/:id (Chi tiết dịch vụ cắt tóc & quy trình thực hiện)
import { useParams, Link } from "react-router-dom";

export default function ServiceDetailPage() {
  const { id } = useParams();

  const servicesData = {
    "srv-1": {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeClass: "bg-amber-500/90 text-zinc-950",
      price: "150.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&auto=format&fit=crop&q=80",
      desc: "Tư vấn phom tóc cá nhân hóa phù hợp đường nét khuôn mặt (Sidepart, Undercut, High Fade, Mullet nam tính). Kết hợp kỹ thuật Fade chuẩn quốc tế cùng cạo viền sắc sảo và sấy tạo kiểu giữ nếp.",
      steps: [
        { title: "Bước 1: Tư Vấn Dáng Tóc", desc: "Barber phân tích cấu trúc xương hàm, khuôn mặt và chất tóc để đề xuất kiểu tóc tôn góc cạnh nam tính nhất." },
        { title: "Bước 2: Xả Sạch & Làm Mềm Chân Tóc", desc: "Gội xả nhẹ bằng nước ấm tinh dầu bưởi giúp tóc sạch bụi bẩn và định hình nếp cắt chính xác." },
        { title: "Bước 3: Cắt Tạo Phom & Kỹ Thuật Fade Đỉnh Cao", desc: "Sử dụng tông đơ chuyên dụng của Mỹ tạo hiệu ứng chuyển tiếp mờ dần (Skin Fade / Mid Fade) sắc nét." },
        { title: "Bước 4: Cạo Viền Hairline Sắc Nét", desc: "Thoa bọt mềm và dùng dao lam thợ truyền thống định hình viền trán, mang tai và chân gáy vuông vức." },
        { title: "Bước 5: Sấy Phồng & Vuốt Sáp Cao Cấp", desc: "Sấy theo kỹ thuật phồng tự nhiên và hoàn thiện bằng sáp clay giữ nếp suốt 18 tiếng không bết dính." }
      ],
      benefits: [
        "Bảo hành chỉnh sửa miễn phí trong 7 ngày nếu chưa ưng ý",
        "Miễn phí nước uống trà sen, cà phê rang xay nguyên chất",
        "Bộ dụng cụ kéo & tông đơ được tiệt trùng UV 100% trước khi cắt",
        "Tư vấn cách tự vuốt sáp và chăm sóc tóc tại nhà chuẩn Salon"
      ]
    },
    "srv-2": {
      id: "srv-2",
      name: "Combo Cắt + Gội + Massage Đăng Quang",
      category: "Combo VIP",
      badgeClass: "bg-red-500/90 text-white",
      price: "250.000 đ",
      duration: "45 Phút",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80",
      desc: "Gói dịch vụ được yêu thích nhất tại BarberHub! Kết hợp trọn vẹn giữa cắt tạo phom chuẩn nam thần, gội đầu dưỡng sinh bấm huyệt thư giãn và massage cổ vai gáy thảo mộc giải tỏa mệt mỏi.",
      steps: [
        { title: "Bước 1: Tư Vấn & Cắt Tạo Phom Nam Tính", desc: "Thiết kế phom tóc theo tỷ lệ vàng khuôn mặt, cắt tỉa kết cấu tóc dày mỏng phù hợp khí hậu." },
        { title: "Bước 2: Rửa Mặt & Tẩy Tế Bào Chết Thảo Dược", desc: "Làm sạch bụi bẩn bã nhờn, hút sạch mụn cám vùng mũi bằng gel thảo mộc thiên nhiên dịu mát." },
        { title: "Bước 3: Gội Đầu Dưỡng Sinh & Bấm Huyệt Vùng Đầu", desc: "Sử dụng dầu gội bạc hà hữu cơ, kích thích huyệt bách hội và thái dương xua tan căng thẳng." },
        { title: "Bước 4: Massage Trị Liệu Cổ - Vai - Gáy", desc: "Ấn huyệt chuyên sâu kết hợp chườm khăn nóng thảo dược xoa dịu nhức mỏi do ngồi máy tính nhiều." },
        { title: "Bước 5: Sấy Tạo Kiểu & Xịt Dưỡng Phục Hồi", desc: "Sấy phồng chân tóc với xịt muối biển tạo texture và hoàn thiện với pomade bóng bẩy hoặc sáp mờ matte." }
      ],
      benefits: [
        "Tặng kèm 10 phút massage ấn huyệt chuyên sâu giải tỏa stress",
        "Áp dụng khăn nóng tinh dầu sả chanh thư thái chuẩn Spa",
        "Được ưu tiên chọn phòng gội yên tĩnh riêng biệt",
        "Bảo hành chỉnh form tóc 7 ngày miễn phí"
      ]
    },
    "srv-3": {
      id: "srv-3",
      name: "Uốn Xoăn Hàn Quốc / Fly / Texture",
      category: "Uốn Tóc Nam",
      badgeClass: "bg-blue-500/90 text-white",
      price: "450.000 đ",
      duration: "90 Phút",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80",
      desc: "Dịch vụ kiến tạo độ bồng bềnh tự nhiên, giải quyết triệt để tình trạng tóc xẹp, tóc chỉa khó vào nếp. Ứng dụng thuốc uốn hữu cơ chứa Keratin bảo vệ cấu trúc sợi tóc chắc khỏe.",
      steps: [
        { title: "Bước 1: Kiểm Tra Chất Tóc & Chọn Sóng Uốn", desc: "Barber đánh giá độ khỏe của tóc và tư vấn kiểu uốn: Texture rối lãng tử, Fly bay Hàn Quốc hoặc Layer gợn sóng." },
        { title: "Bước 2: Cắt Tỉa Liên Kết Tạo Tầng Lớp", desc: "Cắt loại bỏ ngọn tóc xơ và tỉa so le tạo khoảng trống giúp lọn xoăn bung phồng tự nhiên." },
        { title: "Bước 3: Lên Trục Cuốn & Vào Thuốc Collagen", desc: "Sử dụng thuốc uốn nhập khẩu không mùi hắc kết hợp bổ sung tinh chất Keratin nuôi dưỡng biểu bì tóc." },
        { title: "Bước 4: Kích Nhiệt & Dập Định Hình Lọn Tóc", desc: "Chiếu sóng hồng ngoại kích hoạt thuốc đều và cố định lọn xoăn đàn hồi bền đẹp." },
        { title: "Bước 5: Xả Khử Mùi & Hướng Dẫn Sấy Tại Nhà", desc: "Hấp ủ dưỡng chất khóa ẩm, sấy tay tạo sóng và hướng dẫn bí quyết giữ lọn xoăn đẹp trên 4 tháng." }
      ],
      benefits: [
        "Bảo hành lọn uốn trong vòng 15 ngày (uốn lại miễn phí nếu nhả sóng)",
        "Thuốc uốn hữu cơ an toàn cho da đầu nhạy cảm, không kích ứng",
        "Tặng 1 lần hấp dưỡng phục hồi chuyên sâu trị giá 150.000 đ",
        "Tặng kẹp tóc và tài liệu hướng dẫn sấy lọn bằng tay"
      ]
    },
    "srv-4": {
      id: "srv-4",
      name: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      category: "Nhuộm Màu",
      badgeClass: "bg-purple-500/90 text-white",
      price: "600.000 đ",
      duration: "120 Phút",
      image: "https://images.unsplash.com/photo-1517832606589-7629c3395909?w=800&auto=format&fit=crop&q=80",
      desc: "Biến hóa phong cách thời thượng với những tone màu thịnh hành nhất: Nâu tây ấm áp, Xám khói sang trọng, Xanh rêu cá tính hoặc Bạch kim nổi bật. Công nghệ khóa màu hạt nano bóng mượt.",
      steps: [
        { title: "Bước 1: Đo Đạt Nền Tóc & Thử Da Đầu", desc: "Kiểm tra độ đàn hồi sợi tóc và test dị ứng để lựa chọn nồng độ oxy hóa an toàn nhất." },
        { title: "Bước 2: Thoa Kem Bảo Vệ Da Đầu Kháng Rát", desc: "Sử dụng tinh chất chuyên dụng tạo màng chắn bảo vệ biểu bì da đầu trước khi nhuộm/tẩy." },
        { title: "Bước 3: Nâng Nền / Tẩy Chuẩn Cấp Độ (Nếu Cần)", desc: "Xử lý sắc tố ẩn giúp tóc đạt tone màu sáng trong trẻo mà không làm đứt gãy sợi tóc." },
        { title: "Bước 4: Nhuộm Phủ Màu Hạt Nano Thông Minh", desc: "Pha chế hạt màu cao cấp giúp màu sắc thẩm thấu đều từ chân đến ngọn, giữ màu bền bỉ." },
        { title: "Bước 5: Hấp Khóa Màu Collagen & Sấy Kiểu", desc: "Đóng kín lớp biểu bì tóc, khóa phân tử màu và sấy phồng kiểu tóc chuẩn fashionista." }
      ],
      benefits: [
        "Bảo hành độ đều màu và giữ màu trong 14 ngày",
        "Tặng gói hấp collagen bóng mượt sau khi nhuộm",
        "Không gây xót rát da đầu nhờ kem lót dưỡng ẩm thảo dược",
        "Giảm 20% khi mua dầu gội tím giữ màu cao cấp"
      ]
    },
    "srv-5": {
      id: "srv-5",
      name: "Cạo Râu & Mặt Khăn Nóng Classic",
      category: "Cạo Râu Classic",
      badgeClass: "bg-emerald-500/90 text-white",
      price: "100.000 đ",
      duration: "20 Phút",
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80",
      desc: "Trải nghiệm nghệ thuật cạo râu truyền thống chuẩn quý ông hoàng gia. Ủ khăn nóng thảo mộc mềm râu, cạo êm ái bằng dao thợ thủ công và dưỡng da kháng khuẩn sau cạo.",
      steps: [
        { title: "Bước 1: Ủ Khăn Nóng Tinh Dầu Thảo Mộc", desc: "Áp khăn ấm tinh dầu bạch đàn giúp lỗ chân lông mở rộng và làm sợi râu mềm mượt." },
        { title: "Bước 2: Đánh Bọt Bằng Chổi Lông Lửng Tự Nhiên", desc: "Xoay bọt cạo mịn màng bồng bềnh, tạo lớp đệm bôi trơn hoàn hảo bảo vệ da mặt." },
        { title: "Bước 3: Cạo Râu Êm Ái Bằng Dao Thợ Cổ Điển", desc: "Đường lưỡi lam đi mượt mà theo chiều râu mọc, cạo sạch nhẵn chân râu mà không gây rát rát." },
        { title: "Bước 4: Khăn Lạnh Se Khít Chân Lông", desc: "Ủ khăn mát ướp nước hoa hồng se khít lỗ chân lông tức thì và làm dịu nhẹ vùng da cạo." },
        { title: "Bước 5: Thoa Lotion Aftershave Kháng Khuẩn", desc: "Cấp ẩm sâu và tạo hương thơm nam tính sang trọng phảng phất suốt ngày dài." }
      ],
      benefits: [
        "Lưỡi dao lam mới 100% thay riêng cho từng khách hàng trước mắt bạn",
        "Tuyệt đối không rát da nhờ 2 lượt khăn ủ nóng lạnh chuyên biệt",
        "Sản phẩm dưỡng Aftershave cao cấp từ Ý",
        "Tặng kèm tỉa gọn lông mày và lông tai chu đáo"
      ]
    },
    "srv-6": {
      id: "srv-6",
      name: "Tẩy Tế Bào Chết & Trị Gàu Da Đầu",
      category: "Chăm Sóc Da Đầu",
      badgeClass: "bg-amber-500/90 text-zinc-950",
      price: "200.000 đ",
      duration: "30 Phút",
      image: "https://images.unsplash.com/photo-1519500570469-6502c314d43f?w=800&auto=format&fit=crop&q=80",
      desc: "Liệu trình detox sinh học thanh lọc nang tóc, loại bỏ 100% bã nhờn, gàu và cặn hóa chất tích tụ lâu ngày. Đem lại cảm giác mát lạnh thông thoáng và kích thích tóc mọc dày dặn.",
      steps: [
        { title: "Bước 1: Soi Da Đầu Vi Điểm", desc: "Dùng camera phóng đại 200 lần soi mật độ nang tóc và lượng dầu thừa bít tắc trên da đầu." },
        { title: "Bước 2: Thoa Muối Biển Khoáng Sinh Học", desc: "Massage hạt muối khoáng siêu mịn nhẹ nhàng lấy đi lớp tế bào sừng chết và mảng bám gàu." },
        { title: "Bước 3: Chiếu Ánh Sáng Xanh Kháng Khuẩn", desc: "Kích hoạt tinh chất tràm trà diệt trừ vi nấm gây gàu ngứa nang tóc." },
        { title: "Bước 4: Xả Sạch & Gội Dầu Bạc Hà Băng Cực", desc: "Đánh bay bã nhờn mang lại cảm giác mát lạnh sảng khoái tức thì." },
        { title: "Bước 5: Xịt Tinh Chất Tonic Kích Nang Tóc", desc: "Nuôi dưỡng chân tóc chắc khỏe, ngăn ngừa rụng tóc và kích mọc tóc tơ mới." }
      ],
      benefits: [
        "Hiệu quả sạch gàu thông thoáng da đầu ngay từ buổi đầu tiên",
        "Kiểm soát dầu thừa kéo dài từ 48 - 72 giờ",
        "Cam kết sử dụng nguyên liệu sinh học không chứa silicon bết nhờn",
        "Miễn phí tái soi kiểm tra da đầu ở các lần ghé tiệm tiếp theo"
      ]
    }
  };

  const service = servicesData[id] || servicesData["srv-2"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-zinc-400">
        <Link to="/" className="hover:text-amber-400 transition">Trang Chủ</Link>
        <span>/</span>
        <Link to="/services" className="hover:text-amber-400 transition">Dịch Vụ</Link>
        <span>/</span>
        <span className="text-amber-400 font-bold">{service.name}</span>
      </div>

      {/* Top Hero Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Service Media (Col 5) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-72 sm:h-80 shadow-lg">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-black uppercase backdrop-blur-md ${service.badgeClass}`}>
              {service.category}
            </span>
            <span className="absolute bottom-4 right-4 px-3 py-1 rounded-xl text-xs font-bold bg-zinc-950/80 text-zinc-200 backdrop-blur-md flex items-center">
              <i className="ph-bold ph-clock mr-1 text-amber-400"></i> {service.duration}
            </span>
          </div>

          {/* Service Info (Col 7) */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Dịch Vụ Đẳng Cấp BarberHub</span>
              <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">
                {service.name}
              </h1>
            </div>

            <div className="flex items-baseline space-x-3">
              <span className="text-3xl sm:text-4xl font-black text-amber-400">{service.price}</span>
              <span className="text-xs text-zinc-400">(Giá niêm yết trọn gói, đã bao gồm gội & đồ uống)</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {service.desc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to={`/booking/service?service=${encodeURIComponent(service.name)}`}
                className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs rounded-xl shadow-xl shadow-amber-500/20 transition flex items-center space-x-2"
              >
                <i className="ph-bold ph-scissors text-base"></i>
                <span>Đặt Lịch Dịch Vụ Này</span>
              </Link>
              <Link
                to="/services"
                className="px-5 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition"
              >
                ← Xem Tất Cả Dịch Vụ
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-zinc-800 text-xs text-zinc-400">
              <div className="flex items-center space-x-1.5">
                <i className="ph-bold ph-check-circle text-emerald-400 text-base"></i>
                <span>Bảo hành 7 ngày</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <i className="ph-bold ph-shield-check text-emerald-400 text-base"></i>
                <span>Tiệt trùng UV 100%</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <i className="ph-bold ph-coffee text-emerald-400 text-base"></i>
                <span>Đồ uống miễn phí</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Content: Steps & Benefits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 5-Step Procedure (Col 7) */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Quy Trình Chuẩn Salon</span>
            <h2 className="text-xl font-black text-white mt-1">5 Bước Thực Hiện Tỉ Mỉ</h2>
            <p className="text-xs text-zinc-400 mt-1">Mỗi công đoạn được thực hiện chuẩn chỉ bởi các Master Barber giàu kinh nghiệm.</p>
          </div>

          <div className="space-y-4">
            {service.steps.map((st, idx) => (
              <div key={idx} className="flex items-start space-x-4 p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{st.title}</h3>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Promises & Contact Box (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Benefits Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="border-b border-zinc-800 pb-3">
              <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Đặc Quyền Dịch Vụ</span>
              <h3 className="text-base font-bold text-white mt-1">Cam Kết Trải Nghiệm Khách Hàng</h3>
            </div>

            <div className="space-y-3">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3 bg-zinc-950 rounded-xl border border-zinc-800/80 text-xs">
                  <i className="ph-bold ph-star text-amber-400 text-base shrink-0"></i>
                  <span className="text-zinc-300 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Contact / Barber Box */}
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl">
                <i className="ph-bold ph-phone-call"></i>
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Cần Tư Vấn Thêm?</h4>
                <p className="text-xs text-zinc-400">Hotline salon: 0904.123.888 (8:30 - 21:30)</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link to="/barbers" className="py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold text-center transition">
                Đội Ngũ Barber
              </Link>
              <Link to={`/booking/service?service=${encodeURIComponent(service.name)}`} className="py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl text-xs font-bold text-center shadow-md shadow-amber-500/20 transition">
                Đặt Chỗ Ngay
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
