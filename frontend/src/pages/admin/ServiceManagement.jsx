// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";

const CATEGORY_MAP = {
  combo: { label: "Cắt & Combo VIP", class: "cat-combo" },
  perm: { label: "Uốn Định Hình", class: "cat-perm" },
  color: { label: "Nhuộm Thời Trang", class: "cat-color" },
  shave: { label: "Cạo Khăn Nóng", class: "cat-shave" },
  spa: { label: "Gội Dưỡng Sinh & Spa", class: "cat-spa" },
};

const INITIAL_SERVICES = [
  {
    id: "SV-01",
    name: "Combo Đế Vương 7 Bước",
    category: "combo",
    price: 350000,
    vipPrice: 299000,
    duration: 45,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 312,
    steps: [
      "Tư vấn form tóc chuẩn gương mặt",
      "Cắt tạo kiểu Skin Fade / Classic",
      "Cạo mặt khăn nóng tinh dầu bạc hà",
      "Gội dưỡng sinh bấm huyệt đầu",
      "Đắp mặt nạ sảng khoái",
      "Lấy ráy tai đèn LED",
      "Sấy tạo kiểu vuốt Sáp Reuzel",
    ],
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-02",
    name: "Combo Quý Ông 5 Bước Tiêu Chuẩn",
    category: "combo",
    price: 200000,
    vipPrice: 170000,
    duration: 40,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 285,
    steps: [
      "Cắt tạo kiểu",
      "Xả tóc sạch sâu",
      "Cạo viền & cạo râu bọt ấm",
      "Massage cổ vai gáy",
      "Vuốt sáp Pomade cao cấp",
    ],
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-03",
    name: "Cắt Tạo Kiểu Master (Chỉ Cắt & Sấy)",
    category: "combo",
    price: 120000,
    vipPrice: 100000,
    duration: 30,
    status: "active",
    tag: "TIẾT KIỆM",
    soldMonth: 240,
    steps: [
      "Cắt kéo & tông đơ chuyên sâu",
      "Xả nhanh không gội",
      "Sấy tạo phồng Pre-styling",
      "Vuốt sáp Kevin Murphy",
    ],
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-04",
    name: "Skin Fade + Kẻ Line Hair Tattoo Nghệ Thuật",
    category: "combo",
    price: 180000,
    vipPrice: 150000,
    duration: 40,
    status: "active",
    tag: "HOT TREND",
    soldMonth: 145,
    steps: [
      "Fade sát 0mm hiệu ứng khói",
      "Khắc họa tiết Hair Tattoo bằng dao cạo đơn",
      "Xả sạch & Vuốt sáp",
    ],
    image:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-05",
    name: "Combo Tổng Thống Luxury (Phòng VIP Riêng)",
    category: "combo",
    price: 650000,
    vipPrice: 550000,
    duration: 75,
    status: "active",
    tag: "VIP ONLY",
    soldMonth: 64,
    steps: [
      "Phục vụ tại phòng VIP riêng",
      "Master Barber trực tiếp cắt",
      "Tẩy tế bào chết da đầu",
      "Chăm sóc da mặt chuyên sâu",
      "Thưởng thức Whisky / Cigar",
    ],
    image:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-06",
    name: "Uốn Premlock / Afro Xoăn Đa Tầng",
    category: "perm",
    price: 550000,
    vipPrice: 480000,
    duration: 90,
    status: "active",
    tag: "HOT TREND",
    soldMonth: 118,
    steps: [
      "Cắt tạo form",
      "Quấn trục Premlock chuyên dụng",
      "Thuốc uốn Olaplex chống xơ rối",
      "Hấp phục hồi Collagen",
    ],
    image:
      "https://images.unsplash.com/photo-1517832607067-4db24a2ae47c?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-07",
    name: "Uốn Layer Phồng Chân Hàn Quốc",
    category: "perm",
    price: 380000,
    vipPrice: 330000,
    duration: 60,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 196,
    steps: [
      "Uốn sóng nhẹ tự nhiên",
      "Ép side gọn hai bên mai",
      "Dưỡng Keratin bóng mượt",
      "Hướng dẫn sấy tại nhà",
    ],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-08",
    name: "Uốn Ruffled / Con Sâu Texture",
    category: "perm",
    price: 450000,
    vipPrice: 390000,
    duration: 75,
    status: "active",
    tag: "HOT TREND",
    soldMonth: 92,
    steps: [
      "Tạo hiệu ứng rối tự nhiên bụi bặm",
      "Giữ nếp 4-5 tháng không cần vuốt sáp cầu kỳ",
    ],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-09",
    name: "Ép Side / Down Perm Chuẩn Trai Hàn",
    category: "perm",
    price: 150000,
    vipPrice: 120000,
    duration: 25,
    status: "active",
    tag: "TIẾT KIỆM",
    soldMonth: 215,
    steps: [
      "Đặc trị tóc bung chỉa hai bên mai",
      "Thuốc ép kem Hàn Quốc lành tính",
      "Ôm sát da đầu tự nhiên",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-10",
    name: "Nhuộm Thời Trang Không Tẩy (Nâu Tây / Lạnh)",
    category: "color",
    price: 350000,
    vipPrice: 300000,
    duration: 60,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 164,
    steps: [
      "Thuốc nhuộm Davines Ý",
      "Không châm chích da đầu",
      "Lên màu chuẩn tự nhiên",
      "Ủ khóa màu",
    ],
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-11",
    name: "Tẩy Tóc & Nhuộm Màu Khói / Bạch Kim",
    category: "color",
    price: 650000,
    vipPrice: 580000,
    duration: 120,
    status: "active",
    tag: "HOT TREND",
    soldMonth: 78,
    steps: [
      "Nâng nền an toàn 2 lần",
      "Pha tinh chất chống rát da đầu",
      "Nhuộm xám khói / xanh đen / bạch kim",
    ],
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-12",
    name: "Nhuộm Phủ Bạc Thảo Dược Hữu Cơ",
    category: "color",
    price: 280000,
    vipPrice: 240000,
    duration: 45,
    status: "active",
    tag: "",
    soldMonth: 132,
    steps: [
      "Chiết xuất nhân sâm & hà thủ ô",
      "Phủ bạc 100% bóng khỏe",
      "Hương thơm thảo mộc dễ chịu",
    ],
    image:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-13",
    name: "Gẩy Light / Highlight Đỉnh Đầu",
    category: "color",
    price: 320000,
    vipPrice: 270000,
    duration: 50,
    status: "paused",
    tag: "",
    soldMonth: 41,
    steps: [
      "Tạo điểm nhấn sợi sáng màu",
      "Tôn cấu trúc tóc Layer / Mohican",
    ],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-14",
    name: "Cạo Mặt Khăn Nóng & Tạo Hình Râu Quý Ông",
    category: "shave",
    price: 100000,
    vipPrice: 80000,
    duration: 25,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 290,
    steps: [
      "Ủ 2 lớp khăn nóng tinh dầu sả chanh",
      "Bọt cạo Proraso Ý",
      "Tỉa form râu quai nón sắc nét",
      "Thoa Aftershave dịu da",
    ],
    image:
      "https://images.unsplash.com/photo-1621607512214-68297480165e?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-15",
    name: "Đắp Mặt Nạ Tinh Chất Vàng & Lột Mụn Cám",
    category: "shave",
    price: 120000,
    vipPrice: 95000,
    duration: 25,
    status: "active",
    tag: "",
    soldMonth: 155,
    steps: [
      "Xông hơi mở lỗ chân lông",
      "Hút bã nhờn & lột mụn đầu đen",
      "Đắp mặt nạ Collagen lạnh se khít",
    ],
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-16",
    name: "Gội Dưỡng Sinh Trung Hoa & Massage Đá Nóng",
    category: "spa",
    price: 220000,
    vipPrice: 180000,
    duration: 45,
    status: "active",
    tag: "BEST SELLER",
    soldMonth: 274,
    steps: [
      "Canh thang thảo dược ấm",
      "Bấm huyệt đả thông kinh lạc đầu",
      "Chườm đá nóng cổ vai gáy",
      "Ngâm chân thảo mộc",
    ],
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-17",
    name: "Lấy Ráy Tai Hoàng Gia Lông Công Thư Giãn",
    category: "spa",
    price: 140000,
    vipPrice: 110000,
    duration: 30,
    status: "active",
    tag: "HOT TREND",
    soldMonth: 210,
    steps: [
      "Dụng cụ khử trùng tia UV riêng biệt",
      "Lông vũ kết hợp âm thoa rung thư giãn",
      "Chườm mắt thảo dược ấm",
    ],
    image:
      "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: "SV-18",
    name: "Tẩy Tế Bào Chết Da Đầu & Trị Gàu Chuyên Sâu",
    category: "spa",
    price: 250000,
    vipPrice: 210000,
    duration: 40,
    status: "active",
    tag: "",
    soldMonth: 88,
    steps: [
      "Soi nang tóc bằng máy vi điểm",
      "Tẩy sạch mảng bám gàu & dầu thừa",
      "Xịt huyết thanh kích thích mọc tóc",
    ],
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300&auto=format&fit=crop&q=80",
  },
];

export default function ServiceManagement() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [services, setServices] = useState(INITIAL_SERVICES);
  const [currentCategory, setCurrentCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentView, setCurrentView] = useState("grid");

  // Add/Edit Service Modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState("");
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("combo");
  const [formPrice, setFormPrice] = useState(200000);
  const [formVipPrice, setFormVipPrice] = useState(170000);
  const [formDuration, setFormDuration] = useState(40);
  const [formTag, setFormTag] = useState("BEST SELLER");
  const [formSteps, setFormSteps] = useState(
    "Tư vấn form tóc, Cắt tạo kiểu, Cạo mặt khăn nóng, Gội massage, Vuốt sáp Pomade"
  );
  const [formImage, setFormImage] = useState("");

  // Print Menu Modal
  const [printMenuOpen, setPrintMenuOpen] = useState(false);

  const activeCount = services.filter((s) => s.status === "active").length;
  const pausedCount = services.length - activeCount;

  const filteredServices = services
    .filter((s) => {
      const matchCat =
        currentCategory === "all" || s.category === currentCategory;
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.steps.join(" ").toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchStatus && matchSearch;
    })
    .sort((a, b) => {
      if (sortFilter === "popular") return b.soldMonth - a.soldMonth;
      if (sortFilter === "price-desc") return b.price - a.price;
      if (sortFilter === "price-asc") return a.price - b.price;
      if (sortFilter === "duration") return a.duration - b.duration;
      return 0;
    });

  const toggleServiceStatus = (id) => {
    const s = services.find((x) => x.id === id);
    if (!s) return;
    const nextStatus = s.status === "active" ? "paused" : "active";
    setServices((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
    showToast(
      nextStatus === "active" ? "Đã mở lại dịch vụ!" : "Đã tạm ngưng dịch vụ",
      `"${s.name}" hiện đang ${
        nextStatus === "active"
          ? "nhận khách bình thường"
          : "tạm ẩn khỏi POS"
      }`,
      nextStatus === "active" ? "success" : "warning"
    );
  };

  const openServiceModal = (id = null) => {
    if (id) {
      const s = services.find((x) => x.id === id);
      if (!s) return;
      setEditingServiceId(s.id);
      setFormName(s.name);
      setFormCategory(s.category);
      setFormPrice(s.price);
      setFormVipPrice(s.vipPrice);
      setFormDuration(s.duration);
      setFormTag(s.tag);
      setFormSteps(s.steps.join(", "));
      setFormImage(s.image);
    } else {
      setEditingServiceId("");
      setFormName("");
      setFormCategory("combo");
      setFormPrice(200000);
      setFormVipPrice(170000);
      setFormDuration(40);
      setFormTag("BEST SELLER");
      setFormSteps(
        "Tư vấn form tóc, Cắt tạo kiểu, Cạo mặt khăn nóng, Gội massage, Vuốt sáp Pomade"
      );
      setFormImage("");
    }
    setServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    const stepsArr = formSteps
      .split(",")
      .map((st) => st.trim())
      .filter(Boolean);
    const imgUrl =
      formImage.trim() ||
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&auto=format&fit=crop&q=80";

    if (editingServiceId) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingServiceId
            ? {
                ...s,
                name: formName.trim(),
                category: formCategory,
                price: Number(formPrice),
                vipPrice: Number(formVipPrice),
                duration: Number(formDuration),
                tag: formTag,
                steps: stepsArr.length ? stepsArr : ["Quy trình chuẩn Salon"],
                image: imgUrl,
              }
            : s
        )
      );
      showToast(
        "Cập nhật dịch vụ thành công!",
        `Đã lưu thay đổi cho "${formName}"`
      );
    } else {
      const newId = "SV-" + String(services.length + 1).padStart(2, "0");
      setServices((prev) => [
        {
          id: newId,
          name: formName.trim(),
          category: formCategory,
          price: Number(formPrice),
          vipPrice: Number(formVipPrice),
          duration: Number(formDuration),
          status: "active",
          tag: formTag,
          soldMonth: 15,
          steps: stepsArr.length ? stepsArr : ["Quy trình chuẩn Salon"],
          image: imgUrl,
        },
        ...prev,
      ]);
      showToast(
        "Thêm gói dịch vụ mới thành công!",
        `"${formName}" đã được niêm yết lên bảng giá POS.`
      );
    }
    setServiceModalOpen(false);
  };

  const deleteService = (id) => {
    const s = services.find((x) => x.id === id);
    if (!s) return;
    setServices((prev) => prev.filter((x) => x.id !== id));
    showToast(
      "Đã xóa dịch vụ",
      `Đã gỡ "${s.name}" khỏi danh mục bảng giá`,
      "warning"
    );
  };

  return (
    <AdminLayout activeKey="services" toast={toast}>
      {({ toggleSidebar }) => (
        <>
          {/* TOP HEADER BAR */}
          <header className="h-20 bg-barber-surface/80 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
              >
                <i className="fa-solid fa-bars text-lg"></i>
              </button>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Bảng Giá Dịch Vụ &amp; Gói Combo VIP
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <i className="fa-solid fa-tags text-[10px]"></i> Niêm yết
                    POS &amp; Web
                  </span>
                </div>
                <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
                  <i className="fa-regular fa-clock text-amber-400"></i>
                  <span>{dateStr}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-amber-400 font-semibold">
                    {timeStr}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setPrintMenuOpen(true)}
                className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-book-open text-amber-400"></i>
                <span>Xem Menu Đặt Bàn</span>
              </button>

              <button
                onClick={() => openServiceModal()}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-plus"></i>
                <span>Thêm Dịch Vụ / Combo</span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. SERVICE ANALYTICS KPI CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Danh Mục Dịch Vụ
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-spray-can-sparkles"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {services.length} Dịch vụ
                  </h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    5 Nhóm chuyên môn
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  {activeCount} đang mở bán • {pausedCount} tạm ngưng
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Gói Bán Chạy Nhất (Best Seller)
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-crown"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-lg font-bold text-amber-400 truncate">
                    Combo Đế Vương 7 Bước
                  </h3>
                </div>
                <p className="text-[11px] text-zinc-400 mt-2">
                  Đã phục vụ:{" "}
                  <strong className="text-white">312 lượt/tháng</strong>{" "}
                  (350.000 ₫)
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Giá Trị Hóa Đơn TB (AOV)
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-receipt"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">285.000 ₫</h3>
                  <span className="text-xs text-sky-400 font-semibold">
                    +16% nhờ Up-sale
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Khách thường ghép Cắt + Uốn hoặc Cắt + Ráy tai
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Thời Gian Phục Vụ Chuẩn
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-stopwatch"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">45 Phút</h3>
                  <span className="text-xs text-purple-400 font-semibold">
                    / lượt Combo
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Tối ưu vòng quay ghế cắt đạt 1.3 khách/giờ
                </p>
              </div>
            </section>

            {/* 2. CATEGORY TABS & SEARCH FILTER BAR */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    { key: "all", label: "Tất cả (18)", icon: "fa-layer-group" },
                    {
                      key: "combo",
                      label: "Cắt & Combo VIP (5)",
                      icon: "fa-scissors",
                    },
                    {
                      key: "perm",
                      label: "Uốn Định Hình (4)",
                      icon: "fa-wand-magic-sparkles",
                    },
                    {
                      key: "color",
                      label: "Nhuộm & Tẩy (4)",
                      icon: "fa-palette",
                    },
                    {
                      key: "shave",
                      label: "Cạo Khăn Nóng & Râu (2)",
                      icon: "fa-Hot-tub-person",
                    },
                    {
                      key: "spa",
                      label: "Gội Dưỡng Sinh & Ear Spa (3)",
                      icon: "fa-spa",
                    },
                  ].map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setCurrentCategory(cat.key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        currentCategory === cat.key
                          ? "bg-amber-500 text-black font-bold border-amber-500"
                          : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                      }`}
                    >
                      <i className={`fa-solid ${cat.icon} mr-1.5`}></i>
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                  <button
                    onClick={() => setCurrentView("grid")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      currentView === "grid"
                        ? "bg-amber-500 text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-grip"></i> Thẻ Dịch Vụ
                  </button>
                  <button
                    onClick={() => setCurrentView("table")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      currentView === "table"
                        ? "bg-amber-500 text-black font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    <i className="fa-solid fa-table-list"></i> Bảng Giá Niêm Yết
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative w-full sm:w-72">
                    <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm tên dịch vụ, bước thực hiện, mã SV..."
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <select
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="popular">Sắp xếp: Được đặt nhiều nhất</option>
                    <option value="price-desc">Giá: Cao xuống Thấp</option>
                    <option value="price-asc">Giá: Thấp lên Cao</option>
                    <option value="duration">Thời lượng thực hiện</option>
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang mở bán trên POS</option>
                    <option value="paused">Tạm ngưng phục vụ</option>
                  </select>
                </div>

                <div className="text-xs text-zinc-400">
                  Hiển thị:{" "}
                  <span className="font-bold text-amber-400">
                    {filteredServices.length}
                  </span>{" "}
                  gói dịch vụ
                </div>
              </div>
            </section>

            {/* 3A. VIEW 1: SERVICE CARDS GRID */}
            {currentView === "grid" && (
              <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredServices.map((s) => {
                  const catInfo =
                    CATEGORY_MAP[s.category] || CATEGORY_MAP.combo;
                  const isActive = s.status === "active";
                  return (
                    <div
                      key={s.id}
                      className={`bg-barber-card border border-barber-border rounded-2xl overflow-hidden flex flex-col justify-between service-card transition-all ${
                        !isActive ? "opacity-60" : ""
                      }`}
                    >
                      <div>
                        <div className="relative h-36 w-full overflow-hidden">
                          <img
                            src={s.image}
                            alt={s.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
                          <div className="absolute top-3 left-3 flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md backdrop-blur-md ${catInfo.class}`}
                            >
                              {catInfo.label}
                            </span>
                            {s.tag && (
                              <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-amber-500 text-black shadow">
                                {s.tag}
                              </span>
                            )}
                          </div>
                          <span className="absolute top-3 right-3 text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-black/70 text-zinc-300 border border-zinc-700">
                            {s.id}
                          </span>
                          <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                            <h3 className="text-base font-bold text-white leading-snug">
                              {s.name}
                            </h3>
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 rounded-xl p-3">
                            <div>
                              <span className="text-[10px] text-zinc-400 block">
                                Giá niêm yết chuẩn
                              </span>
                              <span className="text-lg font-bold text-amber-400">
                                {formatVND(s.price)}
                              </span>
                            </div>
                            <div className="text-right border-l border-zinc-800 pl-3">
                              <span className="text-[10px] text-emerald-400 font-semibold block">
                                Giá Thẻ Hội Viên VIP
                              </span>
                              <span className="text-sm font-bold text-white">
                                {formatVND(s.vipPrice)}
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
                              <span>
                                <i className="fa-solid fa-list-ol text-amber-400 mr-1"></i>{" "}
                                Quy trình ({s.steps.length} bước):
                              </span>
                              <span>
                                <i className="fa-regular fa-clock text-sky-400 mr-1"></i>{" "}
                                {s.duration} phút
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {s.steps.slice(0, 4).map((st, idx) => (
                                <span
                                  key={idx}
                                  className="text-[11px] px-2 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300"
                                >
                                  {st}
                                </span>
                              ))}
                              {s.steps.length > 4 && (
                                <span className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-300 font-semibold">
                                  +{s.steps.length - 4} bước nữa
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-3 bg-zinc-950/60 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleServiceStatus(s.id)}
                            className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${
                              isActive
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                : "bg-zinc-800 text-zinc-400"
                            }`}
                          >
                            <i
                              className={`fa-solid ${
                                isActive ? "fa-toggle-on" : "fa-toggle-off"
                              } mr-1`}
                            ></i>
                            {isActive ? "Đang mở bán" : "Tạm ngưng"}
                          </button>
                          <span className="text-[11px] text-zinc-400">
                            <strong>{s.soldMonth}</strong> lượt/tháng
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openServiceModal(s.id)}
                            className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-200 font-semibold transition-colors"
                          >
                            <i className="fa-solid fa-pen-to-square mr-1"></i>
                            Sửa
                          </button>
                          <button
                            onClick={() => deleteService(s.id)}
                            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            )}

            {/* 3B. VIEW 2: PRICELIST TABLE VIEW */}
            {currentView === "table" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Bảng Giá Niêm Yết Đầy Đủ Các Dịch Vụ
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Quản lý giá thường, giá ưu đãi thẻ VIP, thời gian định mức
                      và lượt phục vụ trong tháng
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3.5 px-3 font-semibold">Mã / Tên</th>
                        <th className="py-3.5 px-3 font-semibold">Phân Nhóm</th>
                        <th className="py-3.5 px-3 font-semibold">Thời Lượng</th>
                        <th className="py-3.5 px-3 font-semibold">
                          Giá Niêm Yết
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Giá Hội Viên VIP
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Lượt Đặt Tháng 11
                        </th>
                        <th className="py-3.5 px-3 font-semibold">Trạng Thái</th>
                        <th className="py-3.5 px-3 font-semibold text-right">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredServices.map((s) => {
                        const catInfo =
                          CATEGORY_MAP[s.category] || CATEGORY_MAP.combo;
                        const isActive = s.status === "active";
                        return (
                          <tr
                            key={s.id}
                            className="hover:bg-zinc-900/50 transition-colors"
                          >
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={s.image}
                                  alt={s.name}
                                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                                />
                                <div>
                                  <div className="font-bold text-white">
                                    {s.name}
                                  </div>
                                  <span className="text-[11px] text-zinc-500 font-mono">
                                    {s.id} • {s.steps.length} bước quy trình
                                  </span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${catInfo.class}`}
                              >
                                {catInfo.label}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 font-semibold text-zinc-300">
                              <i className="fa-regular fa-clock text-sky-400 mr-1"></i>
                              {s.duration} phút
                            </td>
                            <td className="py-3.5 px-3 font-bold text-amber-400 text-sm">
                              {formatVND(s.price)}
                            </td>
                            <td className="py-3.5 px-3 font-bold text-emerald-400">
                              {formatVND(s.vipPrice)}
                            </td>
                            <td className="py-3.5 px-3 text-white font-semibold">
                              {s.soldMonth} lượt
                            </td>
                            <td className="py-3.5 px-3">
                              <button
                                onClick={() => toggleServiceStatus(s.id)}
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                  isActive
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-zinc-800 text-zinc-400"
                                }`}
                              >
                                {isActive ? "Đang mở bán" : "Tạm ngưng"}
                              </button>
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openServiceModal(s.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 font-semibold"
                                >
                                  Sửa giá
                                </button>
                                <button
                                  onClick={() => deleteService(s.id)}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400"
                                >
                                  <i className="fa-solid fa-trash-can"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 4. BOTTOM ROW: ADD-ON SERVICES & HAPPY HOUR VOUCHERS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <i className="fa-solid fa-wand-magic-sparkles text-amber-400"></i>
                      Dịch Vụ Cộng Thêm Nhanh (Add-on Up-sale Tại Ghế)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Barber gợi ý khách làm thêm trong lúc đang cắt để tăng giá
                      trị hóa đơn trung bình
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                    +10% Hoa hồng Thợ
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {[
                    {
                      tag: "ADD-01",
                      price: "+50.000 ₫",
                      title: "Đắp Mặt Nạ Collagen Lạnh",
                      desc: "15 phút • Làm dịu da sau khi cạo khăn nóng",
                    },
                    {
                      tag: "ADD-02",
                      price: "+80.000 ₫",
                      title: "Lột Mụn Than Hoạt Tính",
                      desc: "20 phút • Hút sạch bã nhờn vùng mũi & trán",
                    },
                    {
                      tag: "ADD-03",
                      price: "+120.000 ₫",
                      title: "Ép Side Hàn Quốc (Down Perm)",
                      desc: "20 phút • Ôm sát tóc mai bị bung chỉa",
                    },
                    {
                      tag: "ADD-04",
                      price: "+90.000 ₫",
                      title: "Lấy Ráy Tai Đèn LED",
                      desc: "20 phút • Dụng cụ khử trùng tia UV riêng",
                    },
                    {
                      tag: "ADD-05",
                      price: "+60.000 ₫",
                      title: "Kẻ Line Nghệ Thuật (Hair Tattoo)",
                      desc: "10 phút • Tạo điểm nhấn cá tính",
                    },
                    {
                      tag: "ADD-06",
                      price: "+150.000 ₫",
                      title: "Hấp Dưỡng Phục Hồi Olaplex",
                      desc: "25 phút • Dành cho tóc khô xơ sau uốn/nhuộm",
                    },
                  ].map((add) => (
                    <div
                      key={add.tag}
                      className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">
                          {add.tag}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          {add.price}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        {add.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {add.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Chương Trình Ưu Đãi &amp; Happy Hour
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Tự động trừ tiền khi thanh toán đúng khung giờ
                  </p>

                  <div className="mt-4 space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300">
                          GOLDEN HOUR (10:00 - 13:00)
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          Đang chạy
                        </span>
                      </div>
                      <p className="text-zinc-300">
                        Giảm ngay{" "}
                        <strong className="text-white">-15%</strong> cho mọi gói
                        Uốn &amp; Nhuộm từ Thứ 2 đến Thứ 5.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-400">
                          ĐI NHÓM 3 QUÝ ÔNG
                        </span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          Đang chạy
                        </span>
                      </div>
                      <p className="text-zinc-300">
                        Miễn phí 01 gói{" "}
                        <strong className="text-white">
                          Lấy Ráy Tai Hoàng Gia
                        </strong>{" "}
                        hoặc giảm 100.000₫ tổng bill.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-400">
                          ĐẶC QUYỀN THẺ VIP DIAMOND
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold text-[10px]">
                          Trọn đời
                        </span>
                      </div>
                      <p className="text-zinc-300">
                        Giảm cố định{" "}
                        <strong className="text-white">-20%</strong> dịch vụ +
                        Phục vụ đồ uống Whisky/Cà phê miễn phí.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    showToast(
                      "Đã đồng bộ khuyến mãi",
                      "Các mã ưu đãi Happy Hour đã được cập nhật lên máy POS thu ngân!"
                    )
                  }
                  className="mt-4 w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-amber-500 text-amber-400 hover:text-black font-bold text-xs border border-amber-500/30 transition-all"
                >
                  <i className="fa-solid fa-rotate mr-1.5"></i> Đồng Bộ Bảng Giá
                  Lên Màn Hình Tivi Sảnh
                </button>
              </div>
            </section>
          </main>

          {/* MODAL 1: ADD / EDIT SERVICE */}
          {serviceModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-spray-can-sparkles"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {editingServiceId
                          ? `Chỉnh Sửa: ${formName}`
                          : "Thêm Dịch Vụ / Gói Combo Mới"}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Thiết lập đơn giá, thời lượng và các bước quy trình phục
                        vụ
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setServiceModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <form onSubmit={handleSaveService} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Tên Gói Dịch Vụ / Combo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="VD: Combo Hoàng Gia 9 Bước Luxury"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nhóm Danh Mục *
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="combo">Cắt &amp; Combo VIP</option>
                        <option value="perm">Uốn Định Hình Hàn Quốc</option>
                        <option value="color">Nhuộm &amp; Tẩy Thời Trang</option>
                        <option value="shave">
                          Cạo Khăn Nóng &amp; Chăm Sóc Râu
                        </option>
                        <option value="spa">
                          Gội Dưỡng Sinh &amp; Ear Spa
                        </option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Nhãn Nổi Bật (Badge)
                      </label>
                      <select
                        value={formTag}
                        onChange={(e) => setFormTag(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="BEST SELLER">
                          BEST SELLER (Bán chạy)
                        </option>
                        <option value="VIP ONLY">VIP ONLY (Cao cấp)</option>
                        <option value="HOT TREND">HOT TREND (Xu hướng)</option>
                        <option value="TIẾT KIỆM">TIẾT KIỆM</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Giá Niêm Yết (VNĐ) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formPrice}
                        onChange={(e) => setFormPrice(e.target.value)}
                        step="10000"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Giá Hội Viên VIP (VNĐ)
                      </label>
                      <input
                        type="number"
                        required
                        value={formVipPrice}
                        onChange={(e) => setFormVipPrice(e.target.value)}
                        step="10000"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Thời Lượng (Phút) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formDuration}
                        onChange={(e) => setFormDuration(e.target.value)}
                        step="5"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Các Bước Quy Trình Thực Hiện (cách nhau bằng dấu phẩy) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formSteps}
                      onChange={(e) => setFormSteps(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Link Ảnh Minh Họa Dịch Vụ (Tuỳ chọn)
                    </label>
                    <input
                      type="url"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setServiceModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <i className="fa-solid fa-floppy-disk mr-1.5"></i> Lưu Vào
                      Bảng Giá
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 2: SALON MENU STAND PREVIEW */}
          {printMenuOpen && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-zinc-950 border-2 border-amber-500/50 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-amber-500/30 text-center relative bg-gradient-to-b from-amber-500/10 to-transparent">
                  <button
                    onClick={() => setPrintMenuOpen(false)}
                    className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <p className="text-[11px] uppercase tracking-[0.3em] text-amber-400 font-bold">
                    THE GENTLEMAN GROOMING CLUB
                  </p>
                  <h3 className="font-serif font-bold text-2xl text-white mt-1">
                    ROYAL BARBER MENU
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Bảng Giá Niêm Yết Tiêu Chuẩn • Đã Bao Gồm Đồ Uống &amp; Khăn
                    Nóng
                  </p>
                </div>

                <div className="p-6 max-h-[65vh] overflow-y-auto custom-scroll space-y-4 text-xs">
                  {services
                    .filter((s) => s.status === "active")
                    .map((s) => (
                      <div
                        key={s.id}
                        className="flex items-baseline justify-between border-b border-dashed border-zinc-800 pb-2.5"
                      >
                        <div className="pr-4">
                          <span className="font-bold text-white text-sm">
                            {s.name}
                          </span>
                          <span className="text-[10px] text-amber-400 ml-1">
                            ({s.duration} phút)
                          </span>
                          <p className="text-[11px] text-zinc-400 mt-0.5">
                            {s.steps.join(" • ")}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-bold text-amber-400">
                            {formatVND(s.price)}
                          </span>
                          <span className="block text-[10px] text-emerald-400">
                            VIP: {formatVND(s.vipPrice)}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    <i className="fa-solid fa-qrcode text-amber-400 mr-1.5"></i>{" "}
                    Quét mã QR tại ghế để tích điểm Hội viên VIP
                  </span>
                  <button
                    onClick={() => {
                      setPrintMenuOpen(false);
                      showToast(
                        "Đã xuất bản PDF",
                        "Menu_Bang_Gia_RoyalBarber_A4.pdf đã sẵn sàng in ấn!"
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs"
                  >
                    <i className="fa-solid fa-print mr-1.5"></i> Xuất PDF In
                    Menu Quầy
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
