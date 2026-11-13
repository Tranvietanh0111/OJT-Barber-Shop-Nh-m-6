// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import { formatVND, useLiveClock, useAdminToast } from "./AdminSidebar";

const CATEGORY_MAP = {
  pomade: { label: "Sáp & Pomade", class: "cat-pomade" },
  beard: { label: "Chăm sóc Râu", class: "cat-beard" },
  shampoo: { label: "Gội & Dưỡng Tóc", class: "cat-shampoo" },
  consumable: { label: "Vật tư tiêu hao", class: "cat-consumable" },
};

const INITIAL_PRODUCTS = [
  {
    sku: "SKU-PM01",
    name: "Reuzel Blue Pomade Strong Hold (113g)",
    brand: "Reuzel Holland",
    category: "pomade",
    unit: "Hộp thiếc",
    costPrice: 280000,
    sellPrice: 420000,
    stock: 3,
    minStock: 10,
    soldMonth: 38,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-PM02",
    name: "Reuzel Extreme Hold Matte Pomade (Heo Xám)",
    brand: "Reuzel Holland",
    category: "pomade",
    unit: "Hộp thiếc",
    costPrice: 290000,
    sellPrice: 430000,
    stock: 22,
    minStock: 8,
    soldMonth: 31,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-PM03",
    name: "Uppercut Deluxe Pomade Chính Hãng (100g)",
    brand: "Uppercut Australia",
    category: "pomade",
    unit: "Hộp",
    costPrice: 310000,
    sellPrice: 460000,
    stock: 16,
    minStock: 8,
    soldMonth: 25,
    image:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-PM04",
    name: "Kevin Murphy Rough Rider Clay (100g)",
    brand: "Kevin Murphy",
    category: "pomade",
    unit: "Hộp",
    costPrice: 480000,
    sellPrice: 680000,
    stock: 9,
    minStock: 5,
    soldMonth: 19,
    image:
      "https://images.unsplash.com/photo-1608248597359-0e6d526a6828?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-PM05",
    name: "By Vilain Gold Digger Extreme Wax",
    brand: "By Vilain Denmark",
    category: "pomade",
    unit: "Hộp",
    costPrice: 340000,
    sellPrice: 490000,
    stock: 14,
    minStock: 6,
    soldMonth: 22,
    image:
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-PM06",
    name: "Xịt Phồng Tóc Reuzel Grooming Tonic (350ml)",
    brand: "Reuzel Holland",
    category: "pomade",
    unit: "Chai",
    costPrice: 295000,
    sellPrice: 450000,
    stock: 11,
    minStock: 6,
    soldMonth: 17,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-BD01",
    name: "Tinh Dầu Dưỡng Râu Proraso Wood & Spice (30ml)",
    brand: "Proraso Italy",
    category: "beard",
    unit: "Lọ thủy tinh",
    costPrice: 240000,
    sellPrice: 380000,
    stock: 12,
    minStock: 5,
    soldMonth: 14,
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-BD02",
    name: "Bọt Cạo Râu Proraso Refreshing Khuynh Diệp",
    brand: "Proraso Italy",
    category: "beard",
    unit: "Chai 300ml",
    costPrice: 150000,
    sellPrice: 240000,
    stock: 18,
    minStock: 8,
    soldMonth: 12,
    image:
      "https://images.unsplash.com/photo-1585232351009-aa87416fca90?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-SH01",
    name: "Dầu Gội Thảo Dược Ngăn Rụng Tóc Davines Energizing",
    brand: "Davines Italy",
    category: "shampoo",
    unit: "Chai 250ml",
    costPrice: 320000,
    sellPrice: 480000,
    stock: 15,
    minStock: 6,
    soldMonth: 21,
    image:
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-SH02",
    name: "Tinh Dầu Dưỡng Tóc Moroccanoil Treatment (100ml)",
    brand: "Moroccanoil",
    category: "shampoo",
    unit: "Chai",
    costPrice: 540000,
    sellPrice: 790000,
    stock: 4,
    minStock: 8,
    soldMonth: 15,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-CS01",
    name: "Lưỡi Dao Cạo Đơn Feather Hi-Stainless Nhật Bản",
    brand: "Feather Japan",
    category: "consumable",
    unit: "Hộp 200 lưỡi",
    costPrice: 210000,
    sellPrice: 0,
    stock: 1,
    minStock: 5,
    soldMonth: 8,
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&auto=format&fit=crop&q=80",
  },
  {
    sku: "SKU-CS02",
    name: "Dung Dịch Khử Trùng Kéo & Tông Đơ Barbicide",
    brand: "Barbicide USA",
    category: "consumable",
    unit: "Can 1.89L",
    costPrice: 420000,
    sellPrice: 0,
    stock: 6,
    minStock: 3,
    soldMonth: 3,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop&q=80",
  },
];

const INITIAL_LOGS = [
  {
    time: "15:05",
    type: "out",
    title: "Bán lẻ: 1x Reuzel Blue Pomade",
    note: "Khách Anh Tuấn Nguyễn • Master Hoàng (+420.000₫)",
  },
  {
    time: "14:20",
    type: "out",
    title: "Bán lẻ: 1x Kevin Murphy Rough Rider",
    note: "Khách Lê Minh Khôi • Eric Vũ (+680.000₫)",
  },
  {
    time: "11:45",
    type: "in",
    title: "Nhập kho: +20 hộp Uppercut Deluxe",
    note: "NCC: Công ty TNHH Phân Phối Reuzel VN",
  },
  {
    time: "10:15",
    type: "out",
    title: "Xuất nội bộ: 2 lọ Tinh dầu dưỡng râu Proraso",
    note: "Cấp cho Ghế #01 & Ghế #02",
  },
];

export default function InventoryManagement({
  onToggleSidebar,
  externalShowToast,
}) {
  const { timeStr, dateStr } = useLiveClock();
  const { showToast: internalShowToast } = useAdminToast();
  const showToast = externalShowToast || internalShowToast;

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [stockLogs, setStockLogs] = useState(INITIAL_LOGS);
  const [currentCat, setCurrentCat] = useState("all");
  const [stockStatus, setStockStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [todayRetailRevenue, setTodayRetailRevenue] = useState(2140000);

  // Add/Edit Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingSku, setEditingSku] = useState("");
  const [prodName, setProdName] = useState("");
  const [prodBrand, setProdBrand] = useState("");
  const [prodCategory, setProdCategory] = useState("pomade");
  const [prodCost, setProdCost] = useState(280000);
  const [prodPrice, setProdPrice] = useState(420000);
  const [prodStock, setProdStock] = useState(20);
  const [prodMinStock, setProdMinStock] = useState(8);
  const [prodUnit, setProdUnit] = useState("Hộp thiếc");
  const [prodImage, setProdImage] = useState("");

  // Restock Modal
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [restockSku, setRestockSku] = useState("SKU-PM01");
  const [restockQty, setRestockQty] = useState(20);
  const [restockCost, setRestockCost] = useState(280000);
  const [restockSupplier, setRestockSupplier] = useState(
    "Công ty TNHH Phân Phối Reuzel Việt Nam"
  );

  // Sell/Export Modal
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [sellSku, setSellSku] = useState("SKU-PM01");
  const [sellType, setSellType] = useState("retail");
  const [sellQty, setSellQty] = useState(1);
  const [sellBarber, setSellBarber] = useState("Master Hoàng");
  const [sellNote, setSellNote] = useState("");

  // Computed KPIs
  const totalValue = products.reduce(
    (acc, p) => acc + p.stock * p.costPrice,
    0
  );
  const lowItems = products.filter((p) => p.stock <= p.minStock);

  const filteredProducts = products.filter((p) => {
    const matchCat = currentCat === "all" || p.category === currentCat;
    const matchStatus =
      stockStatus === "all" ||
      (stockStatus === "low" && p.stock > 0 && p.stock <= p.minStock) ||
      (stockStatus === "out" && p.stock === 0) ||
      (stockStatus === "good" && p.stock > p.minStock);
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  const openProductModal = (sku = null) => {
    if (sku) {
      const p = products.find((x) => x.sku === sku);
      if (!p) return;
      setEditingSku(p.sku);
      setProdName(p.name);
      setProdBrand(p.brand);
      setProdCategory(p.category);
      setProdCost(p.costPrice);
      setProdPrice(p.sellPrice);
      setProdStock(p.stock);
      setProdMinStock(p.minStock);
      setProdUnit(p.unit);
      setProdImage(p.image);
    } else {
      setEditingSku("");
      setProdName("");
      setProdBrand("");
      setProdCategory("pomade");
      setProdCost(280000);
      setProdPrice(420000);
      setProdStock(20);
      setProdMinStock(8);
      setProdUnit("Hộp thiếc");
      setProdImage("");
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const imgUrl =
      prodImage.trim() ||
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&auto=format&fit=crop&q=80";

    if (editingSku) {
      setProducts((prev) =>
        prev.map((p) =>
          p.sku === editingSku
            ? {
                ...p,
                name: prodName.trim(),
                brand: prodBrand.trim(),
                category: prodCategory,
                costPrice: Number(prodCost),
                sellPrice: Number(prodPrice),
                stock: Number(prodStock),
                minStock: Number(prodMinStock),
                unit: prodUnit.trim(),
                image: imgUrl,
              }
            : p
        )
      );
      showToast("Đã cập nhật sản phẩm!", `Mã ${editingSku} - ${prodName}`);
    } else {
      const newSku = `SKU-PM${Math.floor(10 + Math.random() * 89)}`;
      setProducts((prev) => [
        {
          sku: newSku,
          name: prodName.trim(),
          brand: prodBrand.trim(),
          category: prodCategory,
          unit: prodUnit.trim(),
          costPrice: Number(prodCost),
          sellPrice: Number(prodPrice),
          stock: Number(prodStock),
          minStock: Number(prodMinStock),
          soldMonth: 1,
          image: imgUrl,
        },
        ...prev,
      ]);
      showToast("Thêm sản phẩm mới!", `Đã thêm "${prodName}" vào danh mục kho`);
    }
    setProductModalOpen(false);
  };

  const openRestockModal = (sku = null) => {
    const targetSku = sku || products[0]?.sku || "";
    const p = products.find((x) => x.sku === targetSku);
    setRestockSku(targetSku);
    setRestockQty(20);
    setRestockCost(p ? p.costPrice : 250000);
    setRestockModalOpen(true);
  };

  const handleRestockSubmit = (e) => {
    e.preventDefault();
    const p = products.find((x) => x.sku === restockSku);
    if (!p) return;
    const qty = Number(restockQty);
    const cost = Number(restockCost);
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setProducts((prev) =>
      prev.map((item) =>
        item.sku === restockSku
          ? { ...item, stock: item.stock + qty, costPrice: cost }
          : item
      )
    );
    setStockLogs((prev) => [
      {
        time,
        type: "in",
        title: `Nhập kho: +${qty} ${p.unit} ${p.name}`,
        note: `NCC: ${restockSupplier}`,
      },
      ...prev,
    ]);
    setRestockModalOpen(false);
    showToast(
      "Nhập kho thành công!",
      `Đã cộng thêm +${qty} ${p.unit} cho "${p.name}"`
    );
  };

  const quickRestock = (sku, qty) => {
    const p = products.find((x) => x.sku === sku);
    if (!p) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setProducts((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, stock: item.stock + qty } : item
      )
    );
    setStockLogs((prev) => [
      {
        time,
        type: "in",
        title: `Nhập khẩn cấp: +${qty} ${p.unit} ${p.name}`,
        note: "Nhập nhanh từ cảnh báo tồn kho",
      },
      ...prev,
    ]);
    showToast(
      "Đã nhập hàng bổ sung!",
      `${p.name} hiện có ${p.stock + qty} ${p.unit} trong kho`
    );
  };

  const restockAllLowItems = () => {
    if (lowItems.length === 0) {
      showToast(
        "Kho hàng ổn định",
        "Không có mặt hàng nào dưới định mức an toàn!"
      );
      return;
    }
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setProducts((prev) =>
      prev.map((item) =>
        item.stock <= item.minStock ? { ...item, stock: item.stock + 20 } : item
      )
    );
    setStockLogs((prev) => [
      {
        time,
        type: "in",
        title: `Nhập đồng loạt ${lowItems.length} mã hàng sắp hết (+20 đơn vị/mã)`,
        note: "Đơn đặt hàng tự động PO-202611",
      },
      ...prev,
    ]);
    showToast(
      "Đã nhập bổ sung toàn bộ!",
      `Đã cộng +20 đơn vị cho ${lowItems.length} mặt hàng sắp hết`
    );
  };

  const openSellModal = (sku = null) => {
    const targetSku = sku || products[0]?.sku || "";
    setSellSku(targetSku);
    setSellQty(1);
    setSellNote("");
    setSellModalOpen(true);
  };

  const handleSellSubmit = (e) => {
    e.preventDefault();
    const p = products.find((x) => x.sku === sellSku);
    if (!p) return;
    const qty = Number(sellQty);
    if (p.stock < qty) {
      showToast(
        "Không đủ tồn kho!",
        `Trong kho chỉ còn ${p.stock} ${p.unit}`,
        "error"
      );
      return;
    }

    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setProducts((prev) =>
      prev.map((item) =>
        item.sku === sellSku
          ? {
              ...item,
              stock: item.stock - qty,
              soldMonth:
                sellType === "retail" ? item.soldMonth + qty : item.soldMonth,
            }
          : item
      )
    );

    if (sellType === "retail") {
      const revenue = qty * p.sellPrice;
      setTodayRetailRevenue((prev) => prev + revenue);
      setStockLogs((prev) => [
        {
          time,
          type: "out",
          title: `Bán lẻ: ${qty}x ${p.name}`,
          note: `${sellNote || "Khách tại quầy"} • ${sellBarber} (+${formatVND(
            revenue
          )})`,
        },
        ...prev,
      ]);
      showToast(
        "Đã tạo đơn bán lẻ!",
        `Thu ${formatVND(revenue)} • Trừ ${qty} ${p.unit} khỏi kho`
      );
    } else {
      setStockLogs((prev) => [
        {
          time,
          type: "out",
          title: `Xuất nội bộ: ${qty}x ${p.name}`,
          note: `Cấp cho ${sellBarber} ${sellNote ? "• " + sellNote : ""}`,
        },
        ...prev,
      ]);
      showToast(
        "Đã xuất kho nội bộ!",
        `Cấp ${qty} ${p.unit} "${p.name}" cho ${sellBarber}`,
        "warning"
      );
    }

    setSellModalOpen(false);
  };

  return (
    <>
      {/* TOP HEADER BAR */}
      <header className="h-20 bg-barber-surface/90 backdrop-blur-md border-b border-barber-border px-6 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Kho Sáp Pomade, Mỹ Phẩm &amp; Vật Tư Salon
              </h2>
              <span className="bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {lowItems.length} mã cần nhập gấp
              </span>
            </div>
            <p className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5">
              <i className="fa-regular fa-clock text-amber-400"></i>
              <span>{dateStr}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-amber-400 font-semibold font-mono">
                {timeStr}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => openSellModal()}
            className="hidden sm:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Xuất Kho / Bán Lẻ</span>
          </button>

          <button
            onClick={() => openRestockModal()}
            className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-sky-400 border border-sky-500/30 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all"
          >
            <i className="fa-solid fa-truck-ramp-box"></i>
            <span>Nhập Hàng Vào Kho</span>
          </button>

          <button
            onClick={() => openProductModal()}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Thêm Sản Phẩm Mới</span>
          </button>
        </div>
      </header>

      {/* SCROLLABLE BODY */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
        {/* TOP KPI SUMMARY CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Tổng Giá Trị Vốn Tồn Kho
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <i className="fa-solid fa-vault"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">
                {formatVND(totalValue)}
              </h3>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Biên lợi nhuận bán lẻ TB:{" "}
              <span className="text-emerald-400 font-semibold">+38.5%</span>
            </p>
          </div>

          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Quy Mô Danh Mục Kho
              </span>
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                <i className="fa-solid fa-boxes-stacked"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-white">
                {products.length} Mã hàng SKU
              </h3>
              <span className="text-xs text-sky-400 font-semibold">
                4 Nhóm hàng
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              100% Chính hãng (Reuzel, Kevin Murphy, Proraso)
            </p>
          </div>

          <div className="bg-barber-card border border-rose-500/30 rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                Cảnh Báo Sắp Hết Hàng
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-rose-400">
                {lowItems.length} Mặt hàng
              </h3>
              <span className="text-xs text-rose-300 font-semibold">
                Dưới định mức an toàn
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-2">
              Cần nhập gấp: Reuzel Blue, Lưỡi dao Feather...
            </p>
          </div>

          <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Doanh Số Mỹ Phẩm Hôm Nay
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-emerald-400">
                {formatVND(todayRetailRevenue)}
              </h3>
              <span className="text-xs text-emerald-400 font-semibold">
                +14 lọ đã bán
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-2">
              Chiếm 24.1% tổng doanh thu salon hôm nay
            </p>
          </div>
        </section>

        {/* FILTER & CATEGORY TABS BAR */}
        <section className="bg-barber-card border border-barber-border rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "all", label: "Tất cả (12)" },
              { key: "pomade", label: "Sáp & Pomade (6)" },
              { key: "beard", label: "Dầu Râu & Cạo (2)" },
              { key: "shampoo", label: "Gội & Dưỡng Tóc (2)" },
              { key: "consumable", label: "Vật Tư Tiêu Hao (2)" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => setCurrentCat(cat.key)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentCat === cat.key
                    ? "bg-amber-500 text-black font-bold border-amber-500"
                    : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm tên sáp, thương hiệu, SKU..."
                className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="all">Tất cả mức tồn kho</option>
              <option value="low">Sắp hết hàng (Cần nhập gấp)</option>
              <option value="good">Đủ hàng trong kho</option>
              <option value="out">Đã hết hàng (0)</option>
            </select>
          </div>
        </section>

        {/* MAIN CONTENT: INVENTORY TABLE + RIGHT WIDGETS */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left 2 Columns: Product Table */}
          <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-white text-base">
                  Danh Sách Mặt Hàng &amp; Định Mức Tồn Kho
                </h3>
                <p className="text-xs text-zinc-400">
                  Theo dõi giá vốn, giá bán lẻ, biên lợi nhuận và số lượng thực
                  tế trên kệ
                </p>
              </div>
              <span className="text-xs text-zinc-400">
                Hiển thị:{" "}
                <strong className="text-amber-400">
                  {filteredProducts.length}
                </strong>{" "}
                sản phẩm
              </span>
            </div>

            <div className="overflow-x-auto custom-scroll">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-400 bg-zinc-900/60">
                    <th className="py-3.5 px-4 font-semibold">
                      Sản phẩm / SKU
                    </th>
                    <th className="py-3.5 px-3 font-semibold">Danh mục</th>
                    <th className="py-3.5 px-3 font-semibold">
                      Giá vốn → Giá bán
                    </th>
                    <th className="py-3.5 px-3 font-semibold">
                      Tồn kho thực tế
                    </th>
                    <th className="py-3.5 px-3 font-semibold text-center">
                      Đã bán/tháng
                    </th>
                    <th className="py-3.5 px-4 font-semibold text-right">
                      Thao tác nhanh
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/70 text-xs">
                  {filteredProducts.map((p) => {
                    const cat = CATEGORY_MAP[p.category] || CATEGORY_MAP.pomade;
                    const isLow = p.stock <= p.minStock;
                    const stockPercent = Math.min(
                      100,
                      Math.round((p.stock / (p.minStock * 2.5)) * 100)
                    );
                    const margin =
                      p.sellPrice > 0
                        ? Math.round(
                            ((p.sellPrice - p.costPrice) / p.sellPrice) * 100
                          )
                        : 0;

                    return (
                      <tr
                        key={p.sku}
                        className="hover:bg-zinc-900/60 transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-11 h-11 rounded-xl object-cover border border-zinc-700 shrink-0"
                            />
                            <div>
                              <p className="font-bold text-white text-xs">
                                {p.name}
                              </p>
                              <p className="text-[11px] text-zinc-400">
                                <span className="font-mono text-amber-400">
                                  {p.sku}
                                </span>{" "}
                                • {p.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3">
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase ${cat.class}`}
                          >
                            {cat.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <p className="text-zinc-400 text-[11px]">
                            Vốn:{" "}
                            <span className="text-zinc-200 font-semibold">
                              {formatVND(p.costPrice)}
                            </span>
                          </p>
                          {p.sellPrice > 0 ? (
                            <p className="text-amber-400 font-bold text-xs mt-0.5">
                              Bán: {formatVND(p.sellPrice)}{" "}
                              <span className="text-[10px] text-emerald-400 font-normal">
                                (+{margin}%)
                              </span>
                            </p>
                          ) : (
                            <p className="text-zinc-500 text-[11px] mt-0.5 italic">
                              Dùng nội bộ salon
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-3 min-w-[140px]">
                          <div className="flex items-center justify-between mb-1">
                            <span
                              className={`font-bold ${
                                isLow ? "text-rose-400" : "text-emerald-400"
                              }`}
                            >
                              {p.stock} {p.unit}
                            </span>
                            <span className="text-[10px] text-zinc-500">
                              Min: {p.minStock}
                            </span>
                          </div>
                          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`${
                                isLow ? "bg-rose-500" : "bg-emerald-400"
                              } h-full rounded-full`}
                              style={{ width: `${stockPercent}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span className="font-bold text-white">
                            {p.soldMonth}
                          </span>
                          <span className="block text-[10px] text-zinc-500">
                            {p.unit}/tháng
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openRestockModal(p.sku)}
                              title="Nhập thêm hàng"
                              className="px-2.5 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500 hover:text-black text-sky-400 border border-sky-500/30 font-semibold text-[11px] transition-all"
                            >
                              +Nhập
                            </button>
                            <button
                              onClick={() => openSellModal(p.sku)}
                              title="Xuất kho / Bán lẻ"
                              className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 hover:text-black text-emerald-400 border border-emerald-500/30 font-semibold text-[11px] transition-all"
                            >
                              Xuất
                            </button>
                            <button
                              onClick={() => openProductModal(p.sku)}
                              title="Chỉnh sửa"
                              className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center"
                            >
                              <i className="fa-solid fa-pen text-[10px]"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Urgent Restock + Stock Movement Logs */}
          <div className="space-y-6">
            {/* Urgent Low Stock Reorder Box */}
            <div className="bg-barber-card border border-rose-500/30 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <i className="fa-solid fa-fire-flame-curved text-rose-400"></i>
                    Đề Xuất Nhập Hàng Gấp
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Các mặt hàng chạm ngưỡng cảnh báo đỏ
                  </p>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400">
                  Ưu tiên cao
                </span>
              </div>

              <div className="space-y-3">
                {lowItems.length === 0 ? (
                  <div className="p-4 text-center text-xs text-emerald-400 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    Tất cả mặt hàng trong kho đều đạt ngưỡng an toàn!
                  </div>
                ) : (
                  lowItems.map((p) => (
                    <div
                      key={p.sku}
                      className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between gap-3 low-stock-pulse"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">
                          {p.name}
                        </p>
                        <p className="text-[11px] text-rose-400 font-semibold mt-0.5">
                          Còn {p.stock} {p.unit} (Định mức tối thiểu:{" "}
                          {p.minStock})
                        </p>
                      </div>
                      <button
                        onClick={() => quickRestock(p.sku, 20)}
                        className="shrink-0 px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-black font-bold text-[11px] transition-all"
                      >
                        Nhập +20
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={restockAllLowItems}
                className="mt-4 w-full py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500 hover:text-black text-rose-400 border border-rose-500/30 text-xs font-bold transition-all"
              >
                <i className="fa-solid fa-boxes-packing mr-1.5"></i> Tạo Đơn Đặt
                Hàng Toàn Bộ (+20 hộp/mã)
              </button>
            </div>

            {/* Recent Stock In / Out History */}
            <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white text-base flex items-center gap-2">
                    <i className="fa-solid fa-clock-rotate-left text-amber-400"></i>
                    Nhật Ký Nhập / Xuất Kho Hôm Nay
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Lịch sử bán lẻ cho khách &amp; xuất dùng tại ghế
                  </p>
                </div>
              </div>

              <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scroll pr-1">
                {stockLogs.map((l, idx) => {
                  const isIn = l.type === "in";
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800 flex items-start gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${
                          isIn
                            ? "bg-sky-500/15 text-sky-400"
                            : "bg-emerald-500/15 text-emerald-400"
                        } flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <i
                          className={`fa-solid ${
                            isIn ? "fa-arrow-down-long" : "fa-bag-shopping"
                          } text-xs`}
                        ></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-white truncate">
                            {l.title}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-500">
                            {l.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          {l.note}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL 1: ADD / EDIT PRODUCT */}
      {productModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <i className="fa-solid fa-box-open"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {editingSku
                      ? "Chỉnh Sửa Thông Tin Sản Phẩm"
                      : "Thêm Sản Phẩm Mới Vào Kho"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Khai báo mã SKU, giá nhập, giá bán lẻ và định mức cảnh báo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProductModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tên Sản Phẩm / Mỹ Phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="VD: Sáp Reuzel Pink Pomade Heavy Hold (113g)"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Thương hiệu / Xuất xứ *
                  </label>
                  <input
                    type="text"
                    required
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    placeholder="VD: Reuzel (Hà Lan)"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Danh Mục Kho *
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    required
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="pomade">Sáp &amp; Pomade Tạo Kiểu</option>
                    <option value="beard">Tinh Dầu Râu &amp; Kem Cạo</option>
                    <option value="shampoo">Gội Đầu &amp; Dưỡng Tóc</option>
                    <option value="consumable">
                      Vật Tư Tiêu Hao (Dao cạo, Khăn...)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Giá Vốn Nhập Kho (VNĐ) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="5000"
                    value={prodCost}
                    onChange={(e) => setProdCost(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Giá Bán Lẻ Niêm Yết (VNĐ) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="5000"
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Lượng Tồn Đầu *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Mức Cảnh Báo Tối Thiểu
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={prodMinStock}
                    onChange={(e) => setProdMinStock(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Đơn Vị Tính
                  </label>
                  <input
                    type="text"
                    required
                    value={prodUnit}
                    onChange={(e) => setProdUnit(e.target.value)}
                    placeholder="Hộp / Chai / Lọ"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Ảnh Sản Phẩm (URL)
                </label>
                <input
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20"
                >
                  <i className="fa-solid fa-floppy-disk mr-1.5"></i> Lưu Sản
                  Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RESTOCK (NHẬP KHO) */}
      {restockModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <i className="fa-solid fa-truck-ramp-box"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Phiếu Nhập Hàng Bổ Sung
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Cộng thêm tồn kho và lưu nhật ký nhập hàng
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRestockModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleRestockSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Chọn Sản Phẩm Nhập Kho *
                </label>
                <select
                  value={restockSku}
                  onChange={(e) => {
                    const s = e.target.value;
                    setRestockSku(s);
                    const p = products.find((x) => x.sku === s);
                    if (p) setRestockCost(p.costPrice);
                  }}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {products.map((p) => (
                    <option key={p.sku} value={p.sku}>
                      {p.sku} - {p.name} (Tồn: {p.stock} {p.unit})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Lượng Nhập Thêm *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={restockQty}
                    onChange={(e) => setRestockQty(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Đơn Giá Nhập (VNĐ)
                  </label>
                  <input
                    type="number"
                    required
                    min="10000"
                    step="5000"
                    value={restockCost}
                    onChange={(e) => setRestockCost(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Nhà Phân Phối / Ghi Chú Lô Hàng
                </label>
                <input
                  type="text"
                  value={restockSupplier}
                  onChange={(e) => setRestockSupplier(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRestockModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs"
                >
                  <i className="fa-solid fa-check mr-1"></i> Xác Nhận Nhập Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: SELL / EXPORT STOCK (XUẤT KHO / BÁN LẺ) */}
      {sellModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <i className="fa-solid fa-cart-shopping"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    Xuất Kho Bán Lẻ / Cấp Cho Ghế Cắt
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Trừ tồn kho trực tiếp và cộng doanh số bán lẻ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSellModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <form onSubmit={handleSellSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Chọn Sản Phẩm Xuất Kho *
                </label>
                <select
                  value={sellSku}
                  onChange={(e) => setSellSku(e.target.value)}
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                >
                  {products.map((p) => (
                    <option key={p.sku} value={p.sku}>
                      {p.name} - {formatVND(p.sellPrice)} (Còn {p.stock})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Hình Thức Xuất *
                  </label>
                  <select
                    value={sellType}
                    onChange={(e) => setSellType(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="retail">
                      Bán lẻ cho khách (Cộng doanh thu)
                    </option>
                    <option value="internal">
                      Xuất nội bộ cho Thợ / Ghế cắt
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Lượng Xuất *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={sellQty}
                    onChange={(e) => setSellQty(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Barber Tư Vấn / Nhận Hàng
                  </label>
                  <select
                    value={sellBarber}
                    onChange={(e) => setSellBarber(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Master Hoàng">
                      Master Hoàng (Hoa hồng 10%)
                    </option>
                    <option value="Tuấn Fade">Tuấn Fade (Hoa hồng 10%)</option>
                    <option value="Eric Vũ">Eric Vũ (Hoa hồng 10%)</option>
                    <option value="Dũng Scissor">
                      Dũng Scissor (Hoa hồng 10%)
                    </option>
                    <option value="Quầy Thu Ngân">
                      Khách mua trực tiếp tại Quầy
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tên Khách Hàng
                  </label>
                  <input
                    type="text"
                    value={sellNote}
                    onChange={(e) => setSellNote(e.target.value)}
                    placeholder="VD: Anh Tuấn VIP"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSellModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs"
                >
                  <i className="fa-solid fa-check mr-1"></i> Xác Nhận Xuất Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

