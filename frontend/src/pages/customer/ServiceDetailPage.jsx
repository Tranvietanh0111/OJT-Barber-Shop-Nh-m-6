// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /services/:id (Chi tiết dịch vụ cắt tóc & quy trình thực hiện - Tích hợp đầy đủ Giao diện, Dữ liệu & Phong cách Royal Gold)
import { useParams, Link } from "react-router-dom";

export default function ServiceDetailPage() {
  const { id } = useParams();

  const servicesData = {
    "srv-1": {
      id: "srv-1",
      name: "Cắt Tóc Nam Chuẩn Barber",
      category: "Cắt Tạo Kiểu",
      badgeType: "gold",
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
      badgeType: "red",
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
      badgeType: "blue",
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
      badgeType: "purple",
      price: "600.000 đ",
      duration: "120 Phút",
      image: "https://images.unsplash.com/photo-1517832606589-7629c3395909?w=800&auto=format&fit=crop&q=80",
      desc: "Biến hóa phong cách thời thượng với những tone màu thịnh hành nhất: Nâu tây ấm áp, Xám khói sang trọng, Xanh rêu cá tính hoặc Bạch kim nổi bật. Công nghệ khóa màu hạt nano bóng mượt.",
      steps: [
        { title: "Bước 1: Đo Đạc Nền Tóc & Thử Da Đầu", desc: "Kiểm tra độ đàn hồi sợi tóc và test dị ứng để lựa chọn nồng độ oxy hóa an toàn nhất." },
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
      badgeType: "emerald",
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
      badgeType: "gold",
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
    <div className="cust-srv-detail-wrap">
      {/* Self-contained CSS styles for Service Detail Page */}
      <style>{`
        .cust-srv-detail-wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 32px 20px 64px;
          color: #f8fafc;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        /* Breadcrumb */
        .cust-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 24px;
        }
        .cust-breadcrumb a {
          color: #94a3b8;
          text-decoration: none;
        }
        .cust-breadcrumb a:hover {
          color: #f59e0b;
        }
        .cust-breadcrumb-active {
          color: #fbbf24;
          font-weight: 700;
        }

        /* Hero Banner */
        .cust-detail-hero {
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 28px;
          padding: 36px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
          margin-bottom: 48px;
          box-shadow: 0 4px 20px -4px rgba(120, 80, 10, 0.08);
        }
        @media (min-width: 992px) {
          .cust-detail-hero {
            grid-template-columns: 440px 1fr;
            align-items: center;
          }
        }
        .cust-detail-img-box {
          position: relative;
          height: 320px;
          border-radius: 20px;
          overflow: hidden;
        }
        .cust-detail-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .cust-detail-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
        }
        .cust-detail-badge.gold {
          background: rgba(245, 158, 11, 0.9);
          color: #ffffff;
        }
        .cust-detail-badge.red {
          background: rgba(239, 68, 68, 0.9);
          color: #ffffff;
        }
        .cust-detail-badge.blue {
          background: rgba(59, 130, 246, 0.9);
          color: #ffffff;
        }
        .cust-detail-badge.purple {
          background: rgba(168, 85, 247, 0.9);
          color: #ffffff;
        }
        .cust-detail-badge.emerald {
          background: rgba(16, 185, 129, 0.9);
          color: #ffffff;
        }
        .cust-detail-duration {
          position: absolute;
          bottom: 14px;
          right: 14px;
          padding: 5px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(4px);
          font-size: 12px;
          font-weight: 700;
          color: #4b5563;
          border: 1px solid #f1e7d0;
        }
        .cust-detail-tag {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #b45309;
          display: block;
          margin-bottom: 6px;
        }
        .cust-detail-title {
          font-size: 32px;
          font-weight: 900;
          color: #1f2937;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .cust-detail-price-row {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cust-detail-price {
          font-size: 32px;
          font-weight: 900;
          color: #b45309;
        }
        .cust-detail-price-sub {
          font-size: 12px;
          color: #6b7280;
        }
        .cust-detail-desc {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .cust-detail-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }
        .cust-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 13px;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(245, 158, 11, 0.3);
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }
        .cust-btn-primary:hover {
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(245, 158, 11, 0.45);
        }
        .cust-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 22px;
          background: #ffffff;
          color: #1f2937;
          font-weight: 700;
          font-size: 13px;
          border-radius: 12px;
          border: 1px solid #e5d6b4;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .cust-btn-secondary:hover {
          background: #fff7e6;
          border-color: #f59e0b;
          color: #b45309;
        }
        .cust-detail-perks {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          border-top: 1px solid #f1e7d0;
          padding-top: 20px;
        }
        .cust-perk-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #6b7280;
          font-weight: 600;
        }
        .cust-perk-icon {
          color: #059669;
          font-size: 14px;
        }

        /* Bottom 2-col content */
        .cust-bottom-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 36px;
        }
        @media (min-width: 992px) {
          .cust-bottom-grid {
            grid-template-columns: 1.35fr 1fr;
          }
        }
        .cust-box {
          background: #ffffff;
          border: 1px solid #f1e7d0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 4px 16px -4px rgba(120, 80, 10, 0.08);
        }
        .cust-box-header {
          border-bottom: 1px solid #f1e7d0;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .cust-box-title {
          font-size: 20px;
          font-weight: 800;
          color: #1f2937;
          margin-top: 4px;
        }
        .cust-box-sub {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        /* Procedure steps */
        .cust-step-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background: #fffdfa;
          border: 1px solid #f1e7d0;
          border-radius: 16px;
          margin-bottom: 12px;
        }
        .cust-step-circle {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #b45309;
          font-size: 14px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .cust-step-name {
          font-size: 14px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 4px;
        }
        .cust-step-text {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.55;
        }

        /* Right column items */
        .cust-benefit-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: #fffdfa;
          border: 1px solid #f1e7d0;
          border-radius: 14px;
          margin-bottom: 10px;
          font-size: 13px;
          color: #4b5563;
        }
        .cust-benefit-icon {
          color: #b45309;
          font-size: 16px;
          flex-shrink: 0;
        }
        .cust-callout-box {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fff7ed 100%);
          border: 1px solid var(--gold-border);
          border-radius: 20px;
          padding: 24px;
          margin-top: 24px;
          box-shadow: 0 4px 16px -4px rgba(180, 83, 9, 0.1);
        }
        .cust-callout-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cust-callout-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(245, 158, 11, 0.2);
          color: #b45309;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .cust-callout-title {
          font-size: 15px;
          font-weight: 800;
          color: #1f2937;
        }
        .cust-callout-sub {
          font-size: 12px;
          color: #6b7280;
        }
        .cust-callout-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
      `}</style>

      {/* BREADCRUMBS */}
      <div className="cust-breadcrumb">
        <Link to="/">Trang Chủ</Link>
        <span>/</span>
        <Link to="/services">Dịch Vụ</Link>
        <span>/</span>
        <span className="cust-breadcrumb-active">{service.name}</span>
      </div>

      {/* HERO DETAIL CARD */}
      <div className="cust-detail-hero">
        <div className="cust-detail-img-box">
          <img src={service.image} alt={service.name} className="cust-detail-img" />
          <span className={`cust-detail-badge ${service.badgeType}`}>
            {service.category}
          </span>
          <span className="cust-detail-duration">⏱️ {service.duration}</span>
        </div>

        <div>
          <span className="cust-detail-tag">Dịch Vụ Đẳng Cấp BarberHub</span>
          <h1 className="cust-detail-title">{service.name}</h1>

          <div className="cust-detail-price-row">
            <span className="cust-detail-price">{service.price}</span>
            <span className="cust-detail-price-sub">(Giá niêm yết trọn gói, đã bao gồm gội & đồ uống)</span>
          </div>

          <p className="cust-detail-desc">{service.desc}</p>

          <div className="cust-detail-actions">
            <Link to={`/booking/service?service=${encodeURIComponent(service.name)}`} className="cust-btn-primary">
              <span>✂️</span>
              <span>Đặt Lịch Dịch Vụ Này</span>
            </Link>
            <Link to="/services" className="cust-btn-secondary">
              <span>← Xem Tất Cả Dịch Vụ</span>
            </Link>
          </div>

          <div className="cust-detail-perks">
            <div className="cust-perk-item">
              <span className="cust-perk-icon">✓</span>
              <span>Bảo hành 7 ngày</span>
            </div>
            <div className="cust-perk-item">
              <span className="cust-perk-icon">✓</span>
              <span>Tiệt trùng UV 100%</span>
            </div>
            <div className="cust-perk-item">
              <span className="cust-perk-icon">✓</span>
              <span>Đồ uống miễn phí</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM PROCEDURE & BENEFITS */}
      <div className="cust-bottom-grid">
        {/* 5-Step Procedure */}
        <div className="cust-box">
          <div className="cust-box-header">
            <span className="cust-detail-tag">Quy Trình Chuẩn Salon</span>
            <h2 className="cust-box-title">5 Bước Thực Hiện Tỉ Mỉ</h2>
            <p className="cust-box-sub">Mỗi công đoạn được thực hiện chuẩn chỉ bởi các Master Barber giàu kinh nghiệm.</p>
          </div>

          <div>
            {service.steps.map((st, idx) => (
              <div key={idx} className="cust-step-row">
                <div className="cust-step-circle">{idx + 1}</div>
                <div>
                  <h4 className="cust-step-name">{st.title}</h4>
                  <p className="cust-step-text">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Quick Contact */}
        <div>
          <div className="cust-box">
            <div className="cust-box-header">
              <span className="cust-detail-tag">Đặc Quyền Dịch Vụ</span>
              <h3 className="cust-box-title">Cam Kết Trải Nghiệm Khách Hàng</h3>
            </div>

            <div>
              {service.benefits.map((b, idx) => (
                <div key={idx} className="cust-benefit-item">
                  <span className="cust-benefit-icon">★</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>

            {/* Quick Contact Box */}
            <div className="cust-callout-box">
              <div className="cust-callout-top">
                <div className="cust-callout-icon">📞</div>
                <div>
                  <h4 className="cust-callout-title">Cần Tư Vấn Thêm?</h4>
                  <p className="cust-callout-sub">Hotline salon: 0904.123.888 (8:30 - 21:30)</p>
                </div>
              </div>
              <div className="cust-callout-btns">
                <Link to="/barbers" className="cust-btn-secondary" style={{ textAlign: "center", justifyContent: "center" }}>
                  Đội Ngũ Barber
                </Link>
                <Link to={`/booking/service?service=${encodeURIComponent(service.name)}`} className="cust-btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
                  Đặt Chỗ Ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
