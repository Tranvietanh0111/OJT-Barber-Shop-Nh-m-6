// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /reviews (Đánh giá dịch vụ & Cảm nhận khách hàng thực tế)
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
      tierClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
      tierClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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
      tierClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
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
      tierClass: "bg-zinc-800 text-zinc-400 border-zinc-700",
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
      alert("Vui lòng nhập cảm nhận của bạn!");
      return;
    }

    const newRev = {
      id: "rev-" + Date.now(),
      author: "Anh Hoàng Nam",
      tier: "Khách VIP",
      tierClass: "bg-amber-500/10 text-amber-400 border-amber-500/20",
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
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
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Phản Hồi & Đánh Giá</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">Cảm Nhận Từ Quý Khách Hàng</h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">Sự hài lòng và phong độ của phái mạnh là thước đo chất lượng hàng đầu của BarberHub.</p>
        </div>
        <Link
          to="/booking/service"
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition flex items-center space-x-1.5 self-start sm:self-auto"
        >
          <i className="ph-bold ph-calendar-plus text-base"></i>
          <span>Đặt Lịch Cắt Ngay</span>
        </Link>
      </div>

      {/* Rating Summary Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="text-center sm:text-left">
            <div className="text-5xl font-black text-amber-400 leading-none">4.98</div>
            <div className="flex items-center space-x-1 text-amber-400 text-lg mt-2 justify-center sm:justify-start">
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
              <i className="ph-fill ph-star"></i>
            </div>
            <span className="text-xs text-zinc-500 mt-1 block">Dựa trên 850+ đánh giá</span>
          </div>

          <div className="hidden sm:block h-16 w-px bg-zinc-800"></div>

          <div className="space-y-1.5 text-xs text-zinc-400 min-w-[170px]">
            <div className="flex items-center space-x-2">
              <span>5 sao</span>
              <div className="flex-1 h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                <div className="w-[95%] h-full bg-amber-500"></div>
              </div>
              <span className="text-white font-bold">95%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>4 sao</span>
              <div className="flex-1 h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                <div className="w-[4%] h-full bg-amber-500"></div>
              </div>
              <span className="text-white font-bold">4%</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>3 sao</span>
              <div className="flex-1 h-1.5 bg-zinc-950 rounded-full overflow-hidden">
                <div className="w-[1%] h-full bg-amber-500"></div>
              </div>
              <span className="text-white font-bold">1%</span>
            </div>
          </div>
        </div>

        {/* Barber Stars Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
            <span className="text-zinc-400">Tuấn Master:</span> <strong className="text-amber-400">4.98★</strong>
          </div>
          <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
            <span className="text-zinc-400">Minh Barber:</span> <strong className="text-amber-400">4.95★</strong>
          </div>
          <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
            <span className="text-zinc-400">Hoàng Stylist:</span> <strong className="text-amber-400">4.90★</strong>
          </div>
          <div className="p-2.5 bg-zinc-950 rounded-xl border border-zinc-800/80">
            <span className="text-zinc-400">Dũng Barber:</span> <strong className="text-amber-400">4.92★</strong>
          </div>
        </div>
      </div>

      {/* Review Submission Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-zinc-800 pb-4">
          <span className="text-xs font-black uppercase text-amber-500 tracking-widest block">Chia Sẻ Trải Nghiệm</span>
          <h2 className="text-lg font-bold text-white mt-1">Gửi Đánh Giá Dịch Vụ BarberHub</h2>
        </div>

        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Star Select */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">Mức Độ Hài Lòng</label>
              <div className="flex items-center space-x-1.5 text-2xl text-amber-400 py-1 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`${star <= userRating ? "ph-fill text-amber-400" : "ph-regular text-zinc-600"} ph-star`}
                  ></i>
                ))}
                <span className="text-xs font-bold text-amber-400 ml-2">({userRating} sao)</span>
              </div>
            </div>

            {/* Service Select */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">Dịch Vụ Vừa Cắt</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white focus:border-amber-500 outline-none"
              >
                <option value="Combo Cắt + Gội + Massage Đăng Quang">Combo Cắt + Gội + Massage Đăng Quang</option>
                <option value="Cắt Tóc Nam Chuẩn Barber">Cắt Tóc Nam Chuẩn Barber</option>
                <option value="Uốn Xoăn Hàn Quốc / Fly / Texture">Uốn Xoăn Hàn Quốc / Fly / Texture</option>
                <option value="Nhuộm Màu / Tẩy Tóc Cao Cấp">Nhuộm Màu / Tẩy Tóc Cao Cấp</option>
                <option value="Cạo Râu & Mặt Khăn Nóng Classic">Cạo Râu & Mặt Khăn Nóng Classic</option>
                <option value="Tẩy Tế Bào Chết & Trị Gàu Da Đầu">Tẩy Tế Bào Chết & Trị Gàu Da Đầu</option>
              </select>
            </div>

            {/* Barber Select */}
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">Thợ Thực Hiện</label>
              <select
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white focus:border-amber-500 outline-none"
              >
                <option value="Tuấn Master">Tuấn Master (Ghế VIP 01)</option>
                <option value="Minh Barber">Minh Barber (Ghế 02)</option>
                <option value="Hoàng Stylist">Hoàng Stylist (Ghế 03)</option>
                <option value="Dũng Barber">Dũng Barber (Ghế 04)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">Cảm Nhận Chi Tiết Của Bạn</label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Chia sẻ về độ tỉ mỉ của đường kéo, độ phồng nếp tóc, thái độ phục vụ hay không gian salon..."
              className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:border-amber-500 outline-none"
              required
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
            >
              Gửi Đánh Giá Ngay
            </button>
          </div>
        </form>
      </div>

      {/* Reviews Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-base font-bold text-white">Đánh Giá Gần Đây ({filteredReviews.length})</h3>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setRatingFilter(5)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                ratingFilter === 5 ? "bg-amber-500 text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              5 Sao ★
            </button>
            <button
              onClick={() => setRatingFilter(4)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                ratingFilter === 4 ? "bg-amber-500 text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              4 Sao ★
            </button>
            <button
              onClick={() => setRatingFilter("all")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                ratingFilter === "all" ? "bg-amber-500 text-zinc-950" : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              Tất Cả
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{rev.author}</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${rev.tierClass}`}>
                      {rev.tier}
                    </span>
                    {rev.verified && (
                      <span className="text-xs text-emerald-400 font-bold flex items-center">
                        <i className="ph-bold ph-check-circle mr-1"></i> Đã cắt tại Salon
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    {rev.date} • Thợ: <span className="text-amber-400">{rev.barber}</span> • Gói: {rev.service}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-amber-400 text-sm">
                  {[...Array(rev.stars)].map((_, i) => (
                    <i key={i} className="ph-fill ph-star"></i>
                  ))}
                  {[...Array(5 - rev.stars)].map((_, i) => (
                    <i key={i} className="ph-regular ph-star text-zinc-600"></i>
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
