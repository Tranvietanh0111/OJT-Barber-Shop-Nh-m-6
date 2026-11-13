// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import AdminLayout, {
  formatVND,
  useLiveClock,
  useAdminToast,
} from "./AdminSidebar";
import { adminUsersApi } from "./adminApi";

const INITIAL_CUSTOMERS = [
  {
    id: "KH-8801",
    name: "Nguyễn Anh Tuấn",
    phone: "0988.412.889",
    email: "tuan.nguyen@gmail.com",
    tier: "VIP Diamond",
    points: 2450,
    visits: 28,
    totalSpent: 14850000,
    lastVisit: "Hôm nay, 15:00",
    favBarber: "Master Hoàng",
    hairNote:
      "Skin Fade sát 0mm hai bên, đỉnh để dài 6cm vuốt Pomade Reuzel Blue, cạo khăn nóng kỹ.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "11/11/2026",
        service: "Combo Đế Vương 7 Bước + Sáp Reuzel",
        barber: "Master Hoàng",
        amount: 770000,
      },
      {
        date: "25/10/2026",
        service: "Combo Đế Vương 7 Bước",
        barber: "Master Hoàng",
        amount: 350000,
      },
      {
        date: "08/10/2026",
        service: "Cắt + Nhuộm Phủ Bạc Thảo Dược",
        barber: "Eric Vũ",
        amount: 480000,
      },
    ],
  },
  {
    id: "KH-8802",
    name: "Phan Mạnh Quỳnh",
    phone: "0909.222.888",
    email: "quynh.pm@music.vn",
    tier: "VIP Diamond",
    points: 1980,
    visits: 22,
    totalSpent: 12300000,
    lastVisit: "Hôm nay, 14:00",
    favBarber: "Master Hoàng",
    hairNote: "Kiểu Side Part 7/3 cổ điển, gội dưỡng sinh thảo dược ấm, không dùng gôm cứng.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "11/11/2026",
        service: "Combo Đế Vương 7 Bước",
        barber: "Master Hoàng",
        amount: 350000,
      },
      {
        date: "20/10/2026",
        service: "Gội Dưỡng Sinh + Lấy Ráy Tai",
        barber: "Thảo Spa",
        amount: 220000,
      },
    ],
  },
  {
    id: "KH-8803",
    name: "Lê Minh Khôi",
    phone: "0903.551.902",
    email: "khoi.leminh@tech.vn",
    tier: "VIP Gold",
    points: 920,
    visits: 14,
    totalSpent: 7650000,
    lastVisit: "Hôm nay, 14:45",
    favBarber: "Eric Vũ",
    hairNote: "Thích uốn Premlock hoặc Layer xoăn sóng Hàn Quốc 3 tháng/lần, da đầu nhạy cảm.",
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "11/11/2026",
        service: "Cắt + Uốn Premlock Hàn Quốc",
        barber: "Eric Vũ",
        amount: 550000,
      },
      {
        date: "15/09/2026",
        service: "Combo Quý Ông + Sáp Kevin Murphy",
        barber: "Eric Vũ",
        amount: 880000,
      },
    ],
  },
  {
    id: "KH-8804",
    name: "Trần Quốc Bảo",
    phone: "0977.123.456",
    email: "baotran.bds@gmail.com",
    tier: "VIP Gold",
    points: 840,
    visits: 16,
    totalSpent: 6420000,
    lastVisit: "02/11/2026",
    favBarber: "Dũng Scissor",
    hairNote: "Cắt kéo thủ công toàn bộ, không đẩy tông đơ cao, thích uống cà phê đen không đường.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "02/11/2026",
        service: "Combo Cắt + Gội Massage",
        barber: "Dũng Scissor",
        amount: 200000,
      },
    ],
  },
  {
    id: "KH-8805",
    name: "Hoàng Gia Bảo",
    phone: "0912.678.334",
    email: "giabao.hoang@outlook.com",
    tier: "VIP Silver",
    points: 510,
    visits: 9,
    totalSpent: 3250000,
    lastVisit: "Hôm nay, 15:10",
    favBarber: "Tuấn Fade",
    hairNote: "Mid Skin Fade + Crop Texture, hay mua thêm xịt tạo phồng Bona Fide.",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "11/11/2026",
        service: "Skin Fade + Cạo Khăn Nóng",
        barber: "Tuấn Fade",
        amount: 180000,
      },
    ],
  },
  {
    id: "KH-8806",
    name: "Ngô Kiến Huy",
    phone: "0918.777.666",
    email: "kienhuy.ngo@gmail.com",
    tier: "VIP Silver",
    points: 460,
    visits: 8,
    totalSpent: 2890000,
    lastVisit: "Hôm nay, 14:15",
    favBarber: "Tuấn Fade",
    hairNote: "Tóc mai hay bị bung chỉa, luôn làm kèm dịch vụ Down Perm ép side Hàn Quốc.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "11/11/2026",
        service: "Cắt Layer + Ép Side Down Perm",
        barber: "Tuấn Fade",
        amount: 270000,
      },
    ],
  },
  {
    id: "KH-8807",
    name: "Đặng Quốc Khánh",
    phone: "0934.889.112",
    email: "khanh.dang@bank.vn",
    tier: "VIP Gold",
    points: 790,
    visits: 12,
    totalSpent: 5400000,
    lastVisit: "28/10/2026",
    favBarber: "Trung Barber",
    hairNote: "Nhuộm phủ bạc thảo dược định kỳ mỗi tháng 1 lần, thích gội nước ấm.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "28/10/2026",
        service: "Nhuộm Phủ Bạc Thảo Dược + Cắt",
        barber: "Trung Barber",
        amount: 400000,
      },
    ],
  },
  {
    id: "KH-8808",
    name: "Vũ Đình Trọng",
    phone: "0965.998.711",
    email: "trong.vd@sport.vn",
    tier: "Member",
    points: 210,
    visits: 4,
    totalSpent: 1120000,
    lastVisit: "05/11/2026",
    favBarber: "Thảo Spa",
    hairNote: "Khách thường đặt lịch Gội dưỡng sinh & Lấy ráy tai Hoàng Gia cuối tuần.",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    status: "active",
    history: [
      {
        date: "05/11/2026",
        service: "Gội Dưỡng Sinh + Lấy Ráy Tai",
        barber: "Thảo Spa",
        amount: 220000,
      },
    ],
  },
];

const INITIAL_STAFF = [
  {
    id: "ACC-01",
    name: "Master Hoàng (Hoàng Văn Nam)",
    username: "admin.hoang",
    email: "hoang.master@royalbarber.vn",
    phone: "0909.888.111",
    role: "Super Admin",
    branch: "Toàn hệ thống (2 Chi nhánh)",
    lastLogin: "Đang trực tuyến (IP: 113.190.xx.xx)",
    twoFA: true,
    status: "active",
    permissions: [
      "Toàn quyền hệ thống",
      "Báo cáo Lãi/Lỗ",
      "Cấu hình POS & VietQR",
      "Phân quyền Nhân sự",
    ],
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "ACC-02",
    name: "Nguyễn Thu Trang",
    username: "manager.trang",
    email: "trang.nguyen@royalbarber.vn",
    phone: "0915.666.888",
    role: "Branch Manager",
    branch: "CN 01: 88 Phố Cổ, Hoàn Kiếm",
    lastLogin: "Hôm nay, 14:50",
    twoFA: true,
    status: "active",
    permissions: [
      "Điều phối lịch hẹn",
      "Quản lý Kho Sáp",
      "Chấm công Barber",
      "Xử lý khiếu nại VIP",
    ],
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "ACC-03",
    name: "Lê Ngọc Ánh",
    username: "cashier.anh",
    email: "anh.le@royalbarber.vn",
    phone: "0982.345.678",
    role: "Cashier",
    branch: "CN 01: 88 Phố Cổ, Hoàn Kiếm",
    lastLogin: "Đang trực tại Quầy POS #01",
    twoFA: false,
    status: "active",
    permissions: [
      "Check-in khách vào ghế",
      "In hóa đơn K80",
      "Thu ngân VietQR",
      "Bán lẻ Sáp tại quầy",
    ],
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "ACC-04",
    name: "Eric Vũ (Vũ Minh Đức)",
    username: "barber.eric",
    email: "eric.vu@royalbarber.vn",
    phone: "0912.333.444",
    role: "Barber",
    branch: "CN 01: 88 Phố Cổ, Hoàn Kiếm",
    lastLogin: "Hôm nay, 13:20 (Mobile App)",
    twoFA: false,
    status: "active",
    permissions: [
      "Xem lịch hẹn cá nhân",
      "Xem hoa hồng trong ngày",
      "Ghi chú công thức tóc khách",
    ],
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
  },
  {
    id: "ACC-05",
    name: "Trần Hải Đăng",
    username: "cashier.dang",
    email: "dang.tran@royalbarber.vn",
    phone: "0944.556.778",
    role: "Cashier",
    branch: "CN 01: 88 Phố Cổ, Hoàn Kiếm",
    lastLogin: "08/11/2026 (Ca tối)",
    twoFA: false,
    status: "locked",
    permissions: ["Tạm khóa do nhân sự nghỉ phép dài hạn"],
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
  },
];

export default function UserManagement() {
  const { timeStr, dateStr } = useLiveClock();
  const { toast, showToast } = useAdminToast();

  const [customers, setCustomers] = useState(() => {
    try {
      const raw = localStorage.getItem("gb_sync_customers_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...INITIAL_CUSTOMERS];
          parsed.forEach((sc) => {
            const cleanPhone = String(sc.phone || "").replace(/\D/g, "");
            const idx = merged.findIndex(
              (c) =>
                String(c.phone || "").replace(/\D/g, "") === cleanPhone &&
                cleanPhone.length > 0
            );
            if (idx >= 0) {
              merged[idx] = { ...merged[idx], ...sc };
            } else {
              merged.unshift({
                id: sc.id || `KH-${Math.floor(Math.random() * 900 + 8900)}`,
                name: sc.name || "Khách hàng",
                phone: sc.phone || "0900.000.000",
                email: sc.email || "customer@gentlemanbarber.vn",
                tier: sc.tier || "Member",
                points: sc.points ?? 50,
                visits: sc.visits ?? 1,
                totalSpent: sc.totalSpent ?? 0,
                lastVisit: sc.lastVisit || "Hôm nay",
                favBarber: sc.favBarber || "Master Hoàng",
                hairNote: sc.hairNote || "Khách đặt lịch từ Tổng quan Salon.",
                avatar:
                  sc.avatar ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
                status: "active",
                history: Array.isArray(sc.history) ? sc.history : [],
              });
            }
          });
          return merged;
        }
      }
    } catch {
      /* ignore */
    }
    return INITIAL_CUSTOMERS;
  });
  const [staffAccounts, setStaffAccounts] = useState(() => {
    try {
      const raw = localStorage.getItem("gb_sync_barbers_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...INITIAL_STAFF];
          parsed.forEach((b, idx) => {
            const exists = merged.some(
              (s) =>
                s.name.includes(b.name) ||
                String(b.name || "").includes(s.name.split(" (")[0])
            );
            if (!exists && b.name) {
              const slug = b.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]/g, "");
              merged.push({
                id: `ACC-0${merged.length + 1 + idx}`,
                name: b.name,
                username: `barber.${slug.slice(0, 10) || "staff"}`,
                email:
                  b.email ||
                  `${slug.slice(0, 10) || "barber"}@gentlemanbarber.vn`,
                phone: b.phone || "0909.000.111",
                role: "Barber",
                branch: b.branch || "CN 01: 88 Phố Cổ, Hoàn Kiếm",
                lastLogin: "Hôm nay (Đồng bộ từ Tổng quan Salon)",
                twoFA: false,
                status: b.status === "off" ? "locked" : "active",
                permissions: [
                  "Xem lịch hẹn cá nhân",
                  "Xem hoa hồng trong ngày",
                  "Ghi chú công thức tóc khách",
                ],
                avatar:
                  b.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    b.name
                  )}&background=f59e0b&color=000&bold=true`,
              });
            }
          });
          return merged;
        }
      }
    } catch {
      /* ignore */
    }
    return INITIAL_STAFF;
  });
  const [currentTab, setCurrentTab] = useState("customers");
  const [tierFilter, setTierFilter] = useState("all");
  const [barberFilter, setBarberFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Add/Edit Customer Modal
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState("");
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formTier, setFormTier] = useState("VIP Diamond");
  const [formBarber, setFormBarber] = useState("Master Hoàng");
  const [formPoints, setFormPoints] = useState(200);
  const [formHairNote, setFormHairNote] = useState("");

  // Customer Profile Modal
  const [profileCustomer, setProfileCustomer] = useState(null);

  const filteredCustomers = customers.filter((c) => {
    const matchTier = tierFilter === "all" || c.tier === tierFilter;
    const matchBarber = barberFilter === "all" || c.favBarber === barberFilter;
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.hairNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTier && matchBarber && matchSearch;
  });

  const filteredStaff = staffAccounts.filter((s) => {
    const matchRole = roleFilter === "all" || s.role === roleFilter;
    const matchSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchSearch;
  });

  const getTierBadgeClass = (tier) => {
    if (tier === "VIP Diamond") return "tier-diamond";
    if (tier === "VIP Gold") return "tier-gold";
    if (tier === "VIP Silver") return "tier-silver";
    return "tier-member";
  };

  const getRoleBadgeClass = (role) => {
    if (role === "Super Admin") return "role-admin";
    if (role === "Branch Manager") return "role-manager";
    if (role === "Cashier") return "role-cashier";
    return "role-barber";
  };

  const openUserModal = (id = null) => {
    if (id) {
      const c = customers.find((x) => x.id === id);
      if (!c) return;
      setEditingCustomerId(c.id);
      setFormName(c.name);
      setFormPhone(c.phone);
      setFormEmail(c.email);
      setFormTier(c.tier);
      setFormBarber(c.favBarber);
      setFormPoints(c.points);
      setFormHairNote(c.hairNote);
    } else {
      setEditingCustomerId("");
      setFormName("");
      setFormPhone("");
      setFormEmail("");
      setFormTier("VIP Gold");
      setFormBarber("Master Hoàng");
      setFormPoints(200);
      setFormHairNote("");
    }
    setUserModalOpen(true);
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (editingCustomerId) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editingCustomerId
            ? {
                ...c,
                name: formName.trim(),
                phone: formPhone.trim(),
                email: formEmail.trim() || "vip@royalbarber.vn",
                tier: formTier,
                favBarber: formBarber,
                points: Number(formPoints),
                hairNote:
                  formHairNote.trim() ||
                  "Chưa có ghi chú đặc điểm tóc riêng.",
              }
            : c
        )
      );
      adminUsersApi.updateUser(editingCustomerId, {
        name: formName.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim() || "vip@royalbarber.vn",
        tier: formTier,
        favBarber: formBarber,
        points: Number(formPoints),
        hairNote:
          formHairNote.trim() || "Chưa có ghi chú đặc điểm tóc riêng.",
      });
      showToast(
        "Cập nhật thành công!",
        `Hồ sơ khách hàng ${formName} đã được lưu.`
      );
    } else {
      const newId = "KH-880" + (customers.length + 1);
      setCustomers((prev) => [
        {
          id: newId,
          name: formName.trim(),
          phone: formPhone.trim(),
          email: formEmail.trim() || "member@royalbarber.vn",
          tier: formTier,
          points: Number(formPoints),
          visits: 1,
          totalSpent: 350000,
          lastVisit: "Vừa đăng ký",
          favBarber: formBarber,
          hairNote:
            formHairNote.trim() ||
            "Khách mới đăng ký thẻ Hội viên tại quầy POS.",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          status: "active",
          history: [
            {
              date: "11/11/2026",
              service: "Đăng ký thẻ & Combo Đế Vương",
              barber: formBarber,
              amount: 350000,
            },
          ],
        },
        ...prev,
      ]);
      adminUsersApi.createUser({
        userType: "customer",
        name: formName.trim(),
        phone: formPhone.trim(),
        email: formEmail.trim() || "member@royalbarber.vn",
        tier: formTier,
        points: Number(formPoints),
        favBarber: formBarber,
        hairNote:
          formHairNote.trim() ||
          "Khách mới đăng ký thẻ Hội viên tại quầy POS.",
      });
      showToast(
        "Đã tạo thẻ Hội viên mới!",
        `Chào mừng khách hàng ${formName} (${newId})`
      );
    }
    setUserModalOpen(false);
  };

  const toggleStaffStatus = (id) => {
    const acc = staffAccounts.find((x) => x.id === id);
    if (!acc) return;
    if (acc.role === "Super Admin") {
      showToast(
        "Không thể khóa Super Admin!",
        "Tài khoản Quản trị viên cao nhất luôn phải hoạt động.",
        "warning"
      );
      return;
    }
    const nextStatus = acc.status === "active" ? "locked" : "active";
    setStaffAccounts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );
    adminUsersApi.updateUserStatus(id, nextStatus);
    showToast(
      nextStatus === "active"
        ? "Đã mở khóa tài khoản!"
        : "Đã tạm khóa tài khoản",
      `Tài khoản @${acc.username} hiện đang ${
        nextStatus === "active" ? "hoạt động bình thường" : "bị vô hiệu hóa"
      }`,
      nextStatus === "active" ? "success" : "warning"
    );
  };

  return (
    <AdminLayout activeKey="users" toast={toast}>
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
                    Quản Lý Khách Hàng VIP &amp; Tài Khoản Hệ Thống
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    <i className="fa-solid fa-crown text-[10px]"></i> CRM
                    Loyalty &amp; RBAC
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
                onClick={() =>
                  showToast(
                    "Đã xuất danh sách CRM",
                    "File Khach_Hang_VIP_RoyalBarber_2026.xlsx đã sẵn sàng tải về!"
                  )
                }
                className="hidden md:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors"
              >
                <i className="fa-solid fa-file-export text-emerald-400"></i>
                <span>Xuất Dữ Liệu CRM</span>
              </button>

              <button
                onClick={() => openUserModal()}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
              >
                <i className="fa-solid fa-user-plus"></i>
                <span>Thêm Hội Viên / Tài Khoản</span>
              </button>
            </div>
          </header>

          {/* SCROLLABLE MAIN CONTENT */}
          <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
            {/* 1. CRM & USER KPI SUMMARY CARDS */}
            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tổng Hội Viên Đăng Ký
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                    <i className="fa-solid fa-users"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">1.261 Khách</h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    +84 tháng này
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Đồng bộ số điện thoại trực tiếp với Zalo OA
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Thẻ VIP Diamond &amp; Gold
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                    <i className="fa-solid fa-gem"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    318 Hội viên
                  </h3>
                  <span className="text-xs text-amber-400 font-semibold">
                    Chiếm 64% doanh thu
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Chi tiêu trung bình: 4.850.000 ₫ / năm / khách
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tỷ Lệ Khách Quay Lại
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                    <i className="fa-solid fa-heart-circle-check"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">88.5%</h3>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Chu kỳ 21 ngày/lần
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  Hệ thống tự động gửi voucher khi quá 25 ngày chưa cắt
                </p>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 barber-card-glow transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    Tài Khoản Quản Trị &amp; POS
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                    <i className="fa-solid fa-user-shield"></i>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <h3 className="text-2xl font-bold text-white">
                    {staffAccounts.length} Tài khoản
                  </h3>
                  <span className="text-xs text-purple-400 font-semibold">
                    Phân quyền 4 cấp
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 mt-2">
                  1 Super Admin • 1 Quản lý • 2 Thu ngân • 1 Barber
                </p>
              </div>
            </section>

            {/* 2. TOP TABS SWITCHER & FILTER BAR */}
            <section className="bg-barber-card border border-barber-border rounded-2xl p-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCurrentTab("customers")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      currentTab === "customers"
                        ? "bg-amber-500 text-black font-bold border-amber-500"
                        : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                    }`}
                  >
                    <i className="fa-solid fa-crown"></i> Khách Hàng Hội Viên
                    CRM ({customers.length})
                  </button>
                  <button
                    onClick={() => setCurrentTab("staff")}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                      currentTab === "staff"
                        ? "bg-amber-500 text-black font-bold border-amber-500"
                        : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
                    }`}
                  >
                    <i className="fa-solid fa-user-lock"></i> Tài Khoản Nhân
                    Viên &amp; Phân Quyền ({staffAccounts.length})
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <i className="fa-solid fa-shield-halved text-emerald-400"></i>
                  <span>Bảo mật dữ liệu khách hàng chuẩn mã hóa SSL</span>
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
                      placeholder="Tìm họ tên, SĐT, email, mã KH, kiểu tóc..."
                      className="w-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {currentTab === "customers" ? (
                    <>
                      <select
                        value={tierFilter}
                        onChange={(e) => setTierFilter(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="all">Tất cả hạng thẻ Hội viên</option>
                        <option value="VIP Diamond">
                          VIP Diamond (Giảm 20%)
                        </option>
                        <option value="VIP Gold">VIP Gold (Giảm 15%)</option>
                        <option value="VIP Silver">
                          VIP Silver (Giảm 10%)
                        </option>
                        <option value="Member">Hội viên Mới (Tích điểm)</option>
                      </select>

                      <select
                        value={barberFilter}
                        onChange={(e) => setBarberFilter(e.target.value)}
                        className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                      >
                        <option value="all">Mọi Barber yêu thích</option>
                        <option value="Master Hoàng">
                          Khách quen của Master Hoàng
                        </option>
                        <option value="Eric Vũ">Khách quen của Eric Vũ</option>
                        <option value="Tuấn Fade">
                          Khách quen của Tuấn Fade
                        </option>
                        <option value="Dũng Scissor">
                          Khách quen của Dũng Scissor
                        </option>
                        <option value="Thảo Spa">
                          Khách quen của Thảo Spa
                        </option>
                      </select>
                    </>
                  ) : (
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500"
                    >
                      <option value="all">Tất cả vai trò (Roles)</option>
                      <option value="Super Admin">
                        Super Admin (Chủ Salon)
                      </option>
                      <option value="Branch Manager">Quản Lý Chi Nhánh</option>
                      <option value="Cashier">Lễ Tân &amp; Thu Ngân POS</option>
                      <option value="Barber">Thợ Barber / Stylist</option>
                    </select>
                  )}
                </div>

                <div className="text-xs text-zinc-400">
                  Hiển thị:{" "}
                  <span className="font-bold text-amber-400">
                    {currentTab === "customers"
                      ? filteredCustomers.length
                      : filteredStaff.length}
                  </span>{" "}
                  hồ sơ
                </div>
              </div>
            </section>

            {/* 3A. VIEW 1: VIP CUSTOMERS CRM TABLE */}
            {currentTab === "customers" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Danh Sách Khách Hàng Hội Viên &amp; Ghi Chú Form Tóc Cá
                      Nhân Hóa
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Lưu trữ sở thích kiểu tóc, sáp hay dùng và thợ ruột để
                      phục vụ chuẩn xác ngay khi khách bước vào salon
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3.5 px-3 font-semibold">
                          Khách Hàng / Mã KH
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Hạng Thẻ &amp; Điểm
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Sở Thích Kiểu Tóc &amp; Ghi Chú
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Barber Yêu Thích
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Số Lần Đến
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Tổng Chi Tiêu
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Lần Cuối Ghé
                        </th>
                        <th className="py-3.5 px-3 font-semibold text-right">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredCustomers.map((c) => (
                        <tr
                          key={c.id}
                          className="hover:bg-zinc-900/50 transition-colors"
                        >
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={c.avatar}
                                alt={c.name}
                                className="w-10 h-10 rounded-xl object-cover ring-1 ring-zinc-700"
                              />
                              <div>
                                <div className="font-bold text-white">
                                  {c.name}
                                </div>
                                <div className="text-[11px] text-zinc-400">
                                  {c.phone} •{" "}
                                  <span className="font-mono text-zinc-500">
                                    {c.id}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span
                              className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md inline-block ${getTierBadgeClass(
                                c.tier
                              )}`}
                            >
                              {c.tier}
                            </span>
                            <div className="text-[11px] text-amber-400 font-semibold mt-1">
                              <i className="fa-solid fa-coins text-[10px] mr-1"></i>
                              {c.points.toLocaleString("vi-VN")} điểm
                            </div>
                          </td>
                          <td className="py-3.5 px-3 max-w-xs">
                            <p className="text-zinc-200 line-clamp-2 leading-relaxed">
                              {c.hairNote}
                            </p>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300 font-semibold">
                              <i className="fa-solid fa-scissors text-[10px] mr-1"></i>
                              {c.favBarber}
                            </span>
                          </td>
                          <td className="py-3.5 px-3 font-bold text-white">
                            {c.visits} lần
                          </td>
                          <td className="py-3.5 px-3 font-bold text-emerald-400 text-sm">
                            {formatVND(c.totalSpent)}
                          </td>
                          <td className="py-3.5 px-3 text-zinc-300">
                            {c.lastVisit}
                          </td>
                          <td className="py-3.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setProfileCustomer(c)}
                                title="Xem lịch sử cắt"
                                className="px-2.5 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-black font-semibold transition-colors"
                              >
                                Hồ sơ
                              </button>
                              <button
                                onClick={() => openUserModal(c.id)}
                                title="Chỉnh sửa"
                                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 3B. VIEW 2: STAFF ACCOUNTS & RBAC PERMISSIONS */}
            {currentTab === "staff" && (
              <section className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Quản Lý Tài Khoản Đăng Nhập &amp; Phân Quyền Truy Cập
                      (RBAC)
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Kiểm soát quyền hạn truy cập báo cáo doanh thu, chỉnh sửa
                      bảng giá và xuất kho của từng vị trí nhân sự
                    </p>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scroll">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-[11px] uppercase tracking-wider text-zinc-500">
                        <th className="py-3.5 px-3 font-semibold">
                          Nhân Sự / Username
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Vai Trò (Role)
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Chi Nhánh Quản Lý
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Quyền Hạn Được Cấp
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Đăng Nhập Gần Nhất
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Bảo Mật 2FA
                        </th>
                        <th className="py-3.5 px-3 font-semibold">
                          Trạng Thái
                        </th>
                        <th className="py-3.5 px-3 font-semibold text-right">
                          Thao Tác
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-xs">
                      {filteredStaff.map((s) => {
                        const isActive = s.status === "active";
                        return (
                          <tr
                            key={s.id}
                            className="hover:bg-zinc-900/50 transition-colors"
                          >
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={s.avatar}
                                  alt={s.name}
                                  className="w-10 h-10 rounded-xl object-cover"
                                />
                                <div>
                                  <div className="font-bold text-white">
                                    {s.name}
                                  </div>
                                  <div className="text-[11px] text-amber-400 font-mono">
                                    @{s.username} • {s.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md ${getRoleBadgeClass(
                                  s.role
                                )}`}
                              >
                                {s.role}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-zinc-300 font-medium">
                              {s.branch}
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {s.permissions.map((p) => (
                                  <span
                                    key={p}
                                    className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
                                  >
                                    {p}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-3 text-zinc-300">
                              {s.lastLogin}
                            </td>
                            <td className="py-3.5 px-3">
                              {s.twoFA ? (
                                <span className="text-emerald-400 font-semibold">
                                  <i className="fa-solid fa-shield-check mr-1"></i>
                                  Đã bật OTP
                                </span>
                              ) : (
                                <span className="text-zinc-500">Chưa bật</span>
                              )}
                            </td>
                            <td className="py-3.5 px-3">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                  isActive
                                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                                    : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                                }`}
                              >
                                {isActive ? "Đang hoạt động" : "Đã khóa"}
                              </span>
                            </td>
                            <td className="py-3.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => toggleStaffStatus(s.id)}
                                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-black text-zinc-300 font-semibold transition-colors"
                                >
                                  {isActive ? "Khóa TK" : "Mở khóa"}
                                </button>
                                <button
                                  onClick={() =>
                                    showToast(
                                      "Đã cấp lại mật khẩu",
                                      `Mật khẩu tạm thời đã được gửi tới ${s.email}`
                                    )
                                  }
                                  title="Reset mật khẩu"
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400"
                                >
                                  <i className="fa-solid fa-key"></i>
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

            {/* 4. BOTTOM ROW: LOYALTY TIERS POLICY & BIRTHDAY REMINDERS */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-base flex items-center gap-2">
                      <i className="fa-solid fa-medal text-amber-400"></i>
                      Chính Sách Phân Hạng Thẻ Hội Viên &amp; Tích Điểm Tự Động
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Quy đổi: 10.000 ₫ chi tiêu = 1 Điểm thưởng • Tự động nâng
                      hạng ngay trên POS khi đủ mốc điểm
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-700/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tier-silver">
                        Hạng VIP Silver
                      </span>
                      <h4 className="text-base font-bold text-white mt-3">
                        Từ 300 Điểm
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Tương đương chi tiêu 3.000.000 ₫
                      </p>
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                        <li>
                          <i className="fa-solid fa-check text-emerald-400 mr-1.5"></i>
                          Giảm <strong>10%</strong> gói Combo Cắt Gội
                        </li>
                        <li>
                          <i className="fa-solid fa-check text-emerald-400 mr-1.5"></i>
                          Ưu tiên giữ ghế trước 20 phút
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400">
                      Hiện có: <strong className="text-white">412 khách</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/30 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tier-gold">
                        Hạng VIP Gold
                      </span>
                      <h4 className="text-base font-bold text-amber-400 mt-3">
                        Từ 700 Điểm
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Tương đương chi tiêu 7.000.000 ₫
                      </p>
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                        <li>
                          <i className="fa-solid fa-check text-amber-400 mr-1.5"></i>
                          Giảm <strong>15%</strong> mọi dịch vụ &amp; Hóa chất
                        </li>
                        <li>
                          <i className="fa-solid fa-check text-amber-400 mr-1.5"></i>
                          Tặng 01 lần Gội dưỡng sinh tháng sinh nhật
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-amber-500/20 text-[11px] text-zinc-400">
                      Hiện có:{" "}
                      <strong className="text-amber-300">232 khách</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-400/30 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md tier-diamond">
                        Hạng VIP Diamond
                      </span>
                      <h4 className="text-base font-bold text-sky-300 mt-3">
                        Từ 1.500 Điểm
                      </h4>
                      <p className="text-[11px] text-zinc-400">
                        Tương đương chi tiêu 15.000.000 ₫
                      </p>
                      <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                        <li>
                          <i className="fa-solid fa-check text-sky-400 mr-1.5"></i>
                          Giảm <strong>20%</strong> trọn đời + Phòng VIP riêng
                        </li>
                        <li>
                          <i className="fa-solid fa-check text-sky-400 mr-1.5"></i>
                          Bộ khăn &amp; lược cá nhân khắc tên riêng
                        </li>
                      </ul>
                    </div>
                    <div className="mt-4 pt-3 border-t border-sky-500/20 text-[11px] text-zinc-400">
                      Hiện có:{" "}
                      <strong className="text-sky-300">86 khách</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-barber-card border border-barber-border rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white text-base">
                      Khách VIP Sinh Nhật Tháng 11
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                      Tặng Voucher
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4">
                    Gửi tin nhắn chúc mừng kèm mã giảm 30% qua Zalo OA
                  </p>

                  <div className="space-y-3 text-xs">
                    {[
                      {
                        name: "Anh Tuấn Nguyễn",
                        sub: "Sinh nhật: 14/11 • VIP Diamond",
                      },
                      {
                        name: "Lê Minh Khôi",
                        sub: "Sinh nhật: 18/11 • VIP Gold",
                      },
                      {
                        name: "Trần Quốc Bảo",
                        sub: "Sinh nhật: 22/11 • VIP Gold",
                      },
                    ].map((b) => (
                      <div
                        key={b.name}
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-white">{b.name}</div>
                          <span className="text-[11px] text-amber-400">
                            {b.sub}
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            showToast(
                              "Đã gửi quà sinh nhật",
                              `Đã gửi Voucher VIP giảm 30% qua Zalo của ${b.name}!`
                            )
                          }
                          className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-[11px]"
                        >
                          Gửi Quà
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* MODAL 1: ADD / EDIT CUSTOMER */}
          {userModalOpen && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-barber-border flex items-center justify-between bg-zinc-950/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                      <i className="fa-solid fa-user-plus"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {editingCustomerId
                          ? `Chỉnh Sửa Hội Viên: ${formName}`
                          : "Thêm Hồ Sơ Khách Hàng VIP"}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Lưu thông tin liên hệ, hạng thẻ và ghi chú kiểu tóc
                        quen thuộc
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUserModalOpen(false)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <form onSubmit={handleSaveCustomer} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Họ Tên Khách Hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="VD: Hoàng Trọng Hiếu"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Số Điện Thoại (Zalo) *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="VD: 0909 686 868"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Email Liên Hệ
                      </label>
                      <input
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="hieu.hoang@gmail.com"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Hạng Thẻ Hội Viên *
                      </label>
                      <select
                        value={formTier}
                        onChange={(e) => setFormTier(e.target.value)}
                        required
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="VIP Diamond">
                          VIP Diamond (Giảm 20%)
                        </option>
                        <option value="VIP Gold">VIP Gold (Giảm 15%)</option>
                        <option value="VIP Silver">
                          VIP Silver (Giảm 10%)
                        </option>
                        <option value="Member">Hội viên Mới</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Barber Phục Vụ Yêu Thích
                      </label>
                      <select
                        value={formBarber}
                        onChange={(e) => setFormBarber(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Master Hoàng">Master Hoàng</option>
                        <option value="Eric Vũ">Eric Vũ</option>
                        <option value="Tuấn Fade">Tuấn Fade</option>
                        <option value="Dũng Scissor">Dũng Scissor</option>
                        <option value="Thảo Spa">Thảo Spa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        Điểm Tích Lũy Ban Đầu
                      </label>
                      <input
                        type="number"
                        value={formPoints}
                        onChange={(e) => setFormPoints(e.target.value)}
                        step="50"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Ghi Chú Form Tóc, Chất Tóc &amp; Đồ Uống Yêu Thích *
                    </label>
                    <input
                      type="text"
                      required
                      value={formHairNote}
                      onChange={(e) => setFormHairNote(e.target.value)}
                      placeholder="VD: Cắt Side Part 7/3, gáy taper cao, vuốt sáp mờ Kevin Murphy, thích uống trà quế..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setUserModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition-colors"
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
                    >
                      <i className="fa-solid fa-floppy-disk mr-1.5"></i> Lưu Hồ
                      Sơ Khách Hàng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* MODAL 2: CUSTOMER FULL CRM PROFILE & HAIR HISTORY */}
          {profileCustomer && (
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-barber-card border border-barber-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-barber-border bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={profileCustomer.avatar}
                      alt={profileCustomer.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500"
                    />
                    <div>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${getTierBadgeClass(
                          profileCustomer.tier
                        )}`}
                      >
                        {profileCustomer.tier}
                      </span>
                      <h3 className="text-lg font-bold text-white mt-1">
                        {profileCustomer.name}
                      </h3>
                      <p className="text-xs text-zinc-400">
                        {profileCustomer.phone} • {profileCustomer.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setProfileCustomer(null)}
                    className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                <div className="p-6 space-y-4 text-xs">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block">
                        Tổng lượt ghé
                      </span>
                      <span className="text-base font-bold text-white mt-1 block">
                        {profileCustomer.visits} Lần
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block">
                        Điểm thưởng tích lũy
                      </span>
                      <span className="text-base font-bold text-amber-400 mt-1 block">
                        {profileCustomer.points.toLocaleString("vi-VN")} Điểm
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                      <span className="text-zinc-400 block">
                        Tổng chi tiêu
                      </span>
                      <span className="text-base font-bold text-emerald-400 mt-1 block">
                        {formatVND(profileCustomer.totalSpent)}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <p className="text-[11px] font-bold uppercase text-amber-400 mb-1">
                      <i className="fa-solid fa-scissors mr-1"></i> Công thức
                      kiểu tóc &amp; Ghi chú phục vụ:
                    </p>
                    <p className="text-zinc-200 leading-relaxed">
                      {profileCustomer.hairNote}
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      Barber ruột:{" "}
                      <strong className="text-white">
                        {profileCustomer.favBarber}
                      </strong>
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-white mb-2">
                      Lịch Sử Sử Dụng Dịch Vụ Gần Đây:
                    </p>
                    <div className="space-y-2 max-h-40 overflow-y-auto custom-scroll">
                      {profileCustomer.history.map((h, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between"
                        >
                          <div>
                            <div className="font-semibold text-white">
                              {h.service}
                            </div>
                            <span className="text-[11px] text-zinc-400">
                              {h.date} • Barber: {h.barber}
                            </span>
                          </div>
                          <span className="font-bold text-amber-400">
                            {formatVND(h.amount)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
}
