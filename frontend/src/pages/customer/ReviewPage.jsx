// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /reviews (Đánh giá dịch vụ & Cảm nhận khách hàng thực tế - Phong cách Red, White, Blue & Tailwind CSS)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ReviewPage() {
  const [ratingFilter, setRatingFilter] = useState("all");
  const [userRating, setUserRating] = useState(5);
  const [selectedService, setSelectedService] = useState("Combo Cắt + Gội + Massage Đăng Quang");
  const [selectedBarber, setSelectedBarber] = useState("Tuấn Master");
  const [commentText, setCommentText] = useState("");
  const [toastMessage, setToastMessage] = useState(null);

  const [reviewsList, setReviewsList] = useState([
    {
      id: "rev-1",
      author: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierClass: "bg-red-50 text-red-600 border-red-200",
      date: "16/11/2026",
      stars: 5,
      service: "Cắt Fade Barber + Cạo Râu Khăn Nóng",
      barber: "Tuấn Master",
      comment: "Tuấn Master cắt cực kỳ tỉ mỉ! Hiệu ứng Skin Fade sắc nét, đường cạo viền chuẩn chỉ. Khăn nóng tinh dầu thảo mộc rất thư giãn, xứng đáng 5 sao cho chất lượng dịch vụ BarberHub.",
      verified: true
    },
    {
      id: "rev-2",
      author: "Lê Minh Đức",
      tier: "Khách Thân Thiết",
      tierClass: "bg-blue-50 text-blue-700 border-blue-200",
      date: "10/11/2026",
      stars: 5,
      service: "Uốn Xoăn Hàn Quốc Fly Texture",
      barber: "Minh Barber",
      comment: "Lần đầu uốn tóc nhưng Minh Barber tư vấn phom cực kỳ chuẩn soái ca. Tóc uốn xong bồng bềnh tự nhiên, không bị khô xơ da đầu. Salon phục vụ trà sen rất ngon!",
      verified: true
    },
    {
      id: "rev-3",
      author: "Trần Quốc Bảo",
      tier: "Khách Thân Thiết",
      tierClass: "bg-blue-50 text-blue-700 border-blue-200",
      date: "05/11/2026",
      stars: 5,
      service: "Nhuộm Màu / Tẩy Tóc Cao Cấp",
      barber: "Hoàng Stylist",
      comment: "Tẩy khói ở đây cực kỳ êm ái, hoàn toàn không bị xót rát da đầu như các tiệm khác. Màu lên sáng và bóng mượt, được tặng kèm gói hấp collagen thơm nức.",
      verified: true
    },
    {
      id: "rev-4",
      author: "Phạm Văn Cường",
      tier: "Khách Mới",
      tierClass: "bg-slate-100 text-slate-600 border-slate-200",
      date: "28/10/2026",
      stars: 4,
      service: "Cắt Undercut Nam Chuẩn Barber",
      barber: "Dũng Barber",
      comment: "Dáng tóc cổ điển chuẩn form, thợ cắt nhiệt tình vui vẻ. Điểm trừ duy nhất là cuối tuần đông khách nên phải chờ thêm 5 phút dù đã đặt lịch trước.",
      verified: true
    }
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      alert("Vui lòng nhập cảm nhận trải nghiệm của bạn!");
      return;
    }

    const newRev = {
      id: "rev-" + Date.now(),
      author: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierClass: "bg-red-50 text-red-600 border-red-200",
      date: "Vừa xong",
      stars: userRating,
      service: selectedService,
      barber: selectedBarber,
      comment: commentText.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setCommentText("");
    showToast("Cảm ơn bạn đã gửi đánh giá trải nghiệm tại BarberHub!");
  };

  const filteredReviews = reviewsList.filter((r) => {
    if (ratingFilter === "all") return true;
    return r.stars === parseInt(ratingFilter, 10);
  });

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Accent Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border-l-4 border-red-500 animate-bounce">
            <i className="ph-bold ph-check-circle text-emerald-400 text-base"></i>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Cảm Nhận Thực Tế</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Đánh Giá & Trải Nghiệm Khách Hàng</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Lắng nghe ý kiến đóng góp chân thực từ những quý ông đã đồng hành cùng BarberHub.</p>
          </div>
          <Link
            to="/booking/service"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-lg shadow-blue-600/25 transition flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <i className="ph-bold ph-calendar-plus text-base"></i>
            <span>Đặt Lịch Trải Nghiệm</span>
          </Link>
        </div>

        {/* Summary Stats Hero Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Score Big (Col 4) */}
            <div className="md:col-span-4 text-center md:border-r border-slate-200 md:pr-8">
              <div className="text-5xl sm:text-6xl font-black text-red-600 leading-none mb-2">4.9</div>
              <div className="text-red-500 text-xl tracking-wide mb-1">★★★★★</div>
              <div className="text-xs text-slate-500 font-medium">248 đánh giá xác thực từ quý ông</div>
            </div>

            {/* Rating Bars (Col 8) */}
            <div className="md:col-span-8 space-y-2 text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-10 text-slate-600 font-bold">5 sao</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-red-500 rounded-full" style={{ width: "88%" }}></div>
                </div>
                <span className="w-10 text-right text-slate-500 font-bold">88%</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-10 text-slate-600 font-bold">4 sao</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }}></div>
                </div>
                <span className="w-10 text-right text-slate-500 font-bold">10%</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-10 text-slate-600 font-bold">3 sao</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: "2%" }}></div>
                </div>
                <span className="w-10 text-right text-slate-500 font-bold">2%</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-10 text-slate-600 font-bold">2 sao</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <span className="w-10 text-right text-slate-500 font-bold">0%</span>
              </div>

              <div className="flex items-center space-x-3">
                <span className="w-10 text-slate-600 font-bold">1 sao</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <span className="w-10 text-right text-slate-500 font-bold">0%</span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Two Column: Form (Left) & Reviews (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Review Form (Col 5) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-lg">Gửi Đánh Giá Của Bạn</h3>
              <p className="text-xs text-slate-500 mt-0.5">Chia sẻ cảm nhận sau khi hoàn thành dịch vụ tại salon.</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Dịch vụ đã sử dụng</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                >
                  <option value="Combo Cắt + Gội + Massage Đăng Quang">Combo Cắt + Gội + Massage Đăng Quang</option>
                  <option value="Cắt Tóc Nam Chuẩn Barber">Cắt Tóc Nam Chuẩn Barber</option>
                  <option value="Uốn Xoăn Hàn Quốc / Fly / Texture">Uốn Xoăn Hàn Quốc / Fly / Texture</option>
                  <option value="Nhuộm Màu / Tẩy Tóc Cao Cấp">Nhuộm Màu / Tẩy Tóc Cao Cấp</option>
                  <option value="Cạo Râu & Mặt Khăn Nóng Classic">Cạo Râu & Mặt Khăn Nóng Classic</option>
                  <option value="Tẩy Tế Bào Chết & Trị Gàu Da Đầu">Tẩy Tế Bào Chết & Trị Gàu Da Đầu</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Master Barber thực hiện</label>
                <select
                  value={selectedBarber}
                  onChange={(e) => setSelectedBarber(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                >
                  <option value="Tuấn Master">Tuấn Master (Fade & Cạo Classic)</option>
                  <option value="Minh Barber">Minh Barber (Uốn Texture & Sidepart)</option>
                  <option value="Hoàng Stylist">Hoàng Stylist (Nhuộm & Phối Màu)</option>
                  <option value="Dũng Barber">Dũng Barber (Phom Cổ Điển)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Chấm điểm chất lượng</label>
                <div className="flex items-center space-x-2 text-2xl cursor-pointer">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <span
                      key={st}
                      onClick={() => setUserRating(st)}
                      className={`transition transform hover:scale-110 ${st <= userRating ? "text-red-500" : "text-slate-300"}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-2">({userRating}/5 sao)</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cảm nhận chi tiết</label>
                <textarea
                  placeholder="Độ êm ái khi cắt, độ bền của phom tóc, thái độ phục vụ..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl shadow-md shadow-red-600/25 transition flex items-center justify-center space-x-1.5"
              >
                <span>⭐</span>
                <span>Gửi Đánh Giá Ngay</span>
              </button>
            </form>
          </div>

          {/* Reviews List & Filters (Col 7) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setRatingFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  ratingFilter === "all"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                Tất Cả ({reviewsList.length})
              </button>
              <button
                onClick={() => setRatingFilter("5")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  ratingFilter === "5"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                5 Sao
              </button>
              <button
                onClick={() => setRatingFilter("4")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  ratingFilter === "4"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                4 Sao
              </button>
              <button
                onClick={() => setRatingFilter("3")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  ratingFilter === "3"
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                3 Sao
              </button>
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredReviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm hover:border-blue-300 transition"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <h4 className="font-bold text-slate-900 text-sm">{r.author}</h4>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${r.tierClass}`}>
                        {r.tier}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{r.date}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-red-500 font-bold">{"★".repeat(r.stars)}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-bold text-blue-600">{r.service}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-700 font-semibold">{r.barber}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    "{r.comment}"
                  </p>

                  {r.verified && (
                    <div className="pt-2 border-t border-slate-100 flex items-center text-[11px] text-blue-600 font-semibold">
                      <i className="ph-bold ph-seal-check mr-1 text-sm text-blue-600"></i>
                      <span>Đã xác thực sử dụng dịch vụ tại salon</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
