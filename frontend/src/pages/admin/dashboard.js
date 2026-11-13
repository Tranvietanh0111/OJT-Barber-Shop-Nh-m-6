/**
 * THE GENTLEMAN BARBER - ADMIN DASHBOARD & BARBER MANAGEMENT LOGIC
 * Dynamic charts, chair status, live booking management, full barber management (CRUD + status).
 */

// --- INITIAL STATE & SAMPLE DATA ---
const BarberState = {
  stats: {
    todayRevenue: 8850000,
    revenueGrowth: "+18.2%",
    totalBookings: 48,
    completedBookings: 32,
    waitingBookings: 8,
    servingBookings: 4,
    cancelledBookings: 4,
    activeChairs: 6,
    totalChairs: 8,
    productSales: 2140000,
    csatScore: 4.95
  },

  barbers: [
    {
      id: 1,
      fullName: "Nguyễn Văn Hoàng",
      nickname: "Hoàng Barber (Master)",
      level: "Master Barber",
      phone: "0908 123 789",
      email: "hoang.barber@gentleman.vn",
      experience: "8 năm KN",
      skills: ["Skin Fade", "Classic Pompadour", "Cạo Khăn Nóng", "Tạo Kiểu Slickback"],
      commissionRate: 40,
      shift: "Ca sáng (08:30 - 16:30)",
      defaultChair: "Ghế 01 (VIP)",
      cuts: 11,
      revenue: 2680000,
      rating: 5.0,
      reviewsCount: 142,
      status: "busy",
      currentCustomer: "Trần Tuấn Anh (Combo Đế Vương)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      fullName: "Lê Minh Tuấn",
      nickname: "Tuấn Fade (Senior)",
      level: "Senior Barber",
      phone: "0912 345 678",
      email: "tuan.fade@gentleman.vn",
      experience: "5 năm KN",
      skills: ["Taper Fade", "Uốn Texture", "Uốn Con Sâu", "Tỉa Râu Phong Cách"],
      commissionRate: 35,
      shift: "Ca chiều (13:30 - 21:30)",
      defaultChair: "Ghế 02",
      cuts: 9,
      revenue: 2150000,
      rating: 4.9,
      reviewsCount: 98,
      status: "busy",
      currentCustomer: "Lê Minh Khang (Uốn Texture)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      fullName: "Vũ Quốc Eric",
      nickname: "Eric Vũ (Senior)",
      level: "Senior Barber",
      phone: "0987 654 321",
      email: "eric.vu@gentleman.vn",
      experience: "4 năm KN",
      skills: ["Mullet Hiện Đại", "Sidepart 7/3", "Cắt Kéo Scissor", "Nhuộm Tẩy"],
      commissionRate: 35,
      shift: "Ca sáng (08:30 - 16:30)",
      defaultChair: "Ghế 03",
      cuts: 7,
      revenue: 1540000,
      rating: 4.9,
      reviewsCount: 86,
      status: "available",
      currentCustomer: "--",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 4,
      fullName: "Đỗ Tiến Dũng",
      nickname: "Dũng Scissor",
      level: "Senior Barber",
      phone: "0933 112 233",
      email: "dung.scissor@gentleman.vn",
      experience: "3 năm KN",
      skills: ["Classic Cut", "Cạo Mặt Bọt Mịn", "Pompadour", "Uốn Phồng Rủ"],
      commissionRate: 32,
      shift: "Full ca (09:00 - 20:00)",
      defaultChair: "Ghế 05",
      cuts: 6,
      revenue: 1220000,
      rating: 4.8,
      reviewsCount: 64,
      status: "busy",
      currentCustomer: "Nguyễn Văn Nam (Pompadour)",
      avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 5,
      fullName: "Phạm Thành Trung",
      nickname: "Trung Barber",
      level: "Junior Barber",
      phone: "0944 556 677",
      email: "trung.barber@gentleman.vn",
      experience: "3 năm KN",
      skills: ["Cắt Fade Chuẩn", "Tạo Kiểu Hè", "Xả Sấy Phồng", "Cạo Râu"],
      commissionRate: 30,
      shift: "Ca chiều (14:00 - 21:30)",
      defaultChair: "Ghế 06",
      cuts: 5,
      revenue: 980000,
      rating: 4.8,
      reviewsCount: 52,
      status: "available",
      currentCustomer: "--",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 6,
      fullName: "Trần Phương Thảo",
      nickname: "Thảo Spa & Shampoo",
      level: "KTV Spa & Gội",
      phone: "0977 889 900",
      email: "thao.spa@gentleman.vn",
      experience: "4 năm KN",
      skills: ["Gội Dưỡng Sinh", "Massage Cổ Vai Gáy", "Đắp Mặt Nạ Thảo Dược", "Bấm Huyệt"],
      commissionRate: 35,
      shift: "Full ca (09:30 - 20:30)",
      defaultChair: "Ghế 04 (Gội)",
      cuts: 8,
      revenue: 1140000,
      rating: 5.0,
      reviewsCount: 110,
      status: "busy",
      currentCustomer: "Đặng Quốc Bảo (Gội Dưỡng Sinh)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 7,
      fullName: "Vũ Đức Huy",
      nickname: "Huy Barber",
      level: "Junior Barber",
      phone: "0966 223 344",
      email: "huy.barber@gentleman.vn",
      experience: "2 năm KN",
      skills: ["Cắt Tỉa Cơ Bản", "Fade Học Sinh", "Sấy Kiểu", "Gội Xả"],
      commissionRate: 30,
      shift: "Nghỉ ca hôm nay",
      defaultChair: "Ghế 07",
      cuts: 0,
      revenue: 0,
      rating: 4.7,
      reviewsCount: 34,
      status: "off",
      currentCustomer: "--",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
    },
    {
      id: 8,
      fullName: "Trần Gia Bảo",
      nickname: "Bảo Color Stylist",
      level: "Senior Barber",
      phone: "0918 776 655",
      email: "bao.color@gentleman.vn",
      experience: "4 năm KN",
      skills: ["Nhuộm Màu Khói", "Nhuộm Highlight", "Uốn Xoăn Hàn Quốc", "Phục Hồi Keratin"],
      commissionRate: 35,
      shift: "Ca sáng (08:30 - 16:30)",
      defaultChair: "Ghế 08",
      cuts: 4,
      revenue: 1480000,
      rating: 4.9,
      reviewsCount: 75,
      status: "break",
      currentCustomer: "--",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
    }
  ],

  chairs: [
    { id: 1, code: "GHẾ 01 (VIP)", barber: "Hoàng Barber (Master)", customer: "Trần Tuấn Anh", service: "Combo Đế Vương 7 bước", status: "busy", remainingMin: 12, price: 280000, icon: "fa-chair" },
    { id: 2, code: "GHẾ 02", barber: "Tuấn Fade (Senior)", customer: "Lê Minh Khang", service: "Uốn Texture + Cắt Fade", status: "busy", remainingMin: 28, price: 450000, icon: "fa-chair" },
    { id: 3, code: "GHẾ 03", barber: "Eric Vũ (Senior)", customer: "--", service: "Sẵn sàng đón khách", status: "available", remainingMin: 0, price: 0, icon: "fa-check-circle" },
    { id: 4, code: "GHẾ 04 (Gội)", barber: "Thảo Spa & Shampoo", customer: "Đặng Quốc Bảo", service: "Gội Dưỡng Sinh Thảo Mộc", status: "busy", remainingMin: 18, price: 190000, icon: "fa-shower" },
    { id: 5, code: "GHẾ 05", barber: "Dũng Scissor", customer: "Nguyễn Văn Nam", service: "Cắt Classic Pompadour", status: "busy", remainingMin: 8, price: 150000, icon: "fa-chair" },
    { id: 6, code: "GHẾ 06", barber: "Trung Barber", customer: "--", service: "Sẵn sàng đón khách", status: "available", remainingMin: 0, price: 0, icon: "fa-check-circle" },
    { id: 7, code: "GHẾ 07", barber: "Hoàng Barber (Master)", customer: "Vũ Đình Trọng", service: "Khách hẹn lúc 16:00", status: "reserved", remainingMin: 20, price: 280000, icon: "fa-clock" },
    { id: 8, code: "GHẾ 08", barber: "Vệ sinh/Khử trùng", customer: "--", service: "Đang khử khuẩn UV đồ nghề", status: "maintenance", remainingMin: 0, price: 0, icon: "fa-shield-virus" }
  ],

  appointments: [
    { id: "BK-1085", customer: "Trần Tuấn Anh", phone: "0908 123 456", isVip: true, service: "Combo Đế Vương 7 bước", barber: "Hoàng Barber (Master)", time: "15:15 - 16:00", chair: "Ghế 01", price: 280000, status: "serving" },
    { id: "BK-1084", customer: "Lê Minh Khang", phone: "0912 345 678", isVip: true, service: "Uốn Texture + Cắt Fade", barber: "Tuấn Fade (Senior)", time: "15:00 - 16:15", chair: "Ghế 02", price: 450000, status: "serving" },
    { id: "BK-1083", customer: "Đặng Quốc Bảo", phone: "0987 654 321", isVip: false, service: "Gội Dưỡng Sinh Thảo Mộc", barber: "Thảo Spa & Shampoo", time: "15:30 - 16:15", chair: "Ghế 04", price: 190000, status: "serving" },
    { id: "BK-1082", customer: "Nguyễn Văn Nam", phone: "0933 222 111", isVip: false, service: "Cắt Classic Pompadour", barber: "Dũng Scissor", time: "15:30 - 16:05", chair: "Ghế 05", price: 150000, status: "serving" },
    { id: "BK-1081", customer: "Vũ Đình Trọng", phone: "0944 888 999", isVip: true, service: "Combo Cắt Cạo Tạo Kiểu VIP", barber: "Hoàng Barber (Master)", time: "16:00 - 16:45", chair: "Ghế 01", price: 320000, status: "waiting" },
    { id: "BK-1080", customer: "Phạm Hoàng Sơn", phone: "0977 112 233", isVip: false, service: "Nhuộm Nâu Khói Thời Trang", barber: "Eric Vũ (Senior)", time: "16:15 - 17:30", chair: "Ghế 03", price: 550000, status: "waiting" },
    { id: "BK-1079", customer: "Bùi Tiến Đạt", phone: "0966 334 455", isVip: false, service: "Cắt Tóc Taper Fade + Xả", barber: "Trung Barber", time: "16:30 - 17:15", chair: "Ghế 06", price: 160000, status: "waiting" },
    { id: "BK-1078", customer: "Lý Gia Hưng", phone: "0909 555 777", isVip: true, service: "Combo Hoàng Gia Cạo Râu Nóng", barber: "Tuấn Fade (Senior)", time: "14:00 - 14:50", chair: "Ghế 02", price: 350000, status: "done" },
    { id: "BK-1077", customer: "Đỗ Thành Chung", phone: "0918 223 344", isVip: false, service: "Cắt Tóc Nam Chuẩn Barber", barber: "Hoàng Barber (Master)", time: "14:15 - 15:00", chair: "Ghế 01", price: 150000, status: "done" },
    { id: "BK-1076", customer: "Mai Văn Quyết", phone: "0982 778 899", isVip: false, service: "Uốn Con Sâu Xù Hot Trend", barber: "Dũng Scissor", time: "13:30 - 15:00", chair: "Ghế 05", price: 420000, status: "done" },
    { id: "BK-1075", customer: "Ngô Nhật Linh", phone: "0938 119 922", isVip: false, service: "Cắt tóc + Gội massage", barber: "Trung Barber", time: "13:45 - 14:30", chair: "Ghế 06", price: 180000, status: "done" },
    { id: "BK-1074", customer: "Cao Quốc Khánh", phone: "0915 667 788", isVip: false, service: "Cắt tóc Fade ngắn hè", barber: "Eric Vũ (Senior)", time: "14:30 - 15:10", chair: "Ghế 03", price: 150000, status: "cancelled" }
  ],

  inventoryAlerts: [
    { name: "Sáp vuốt Reuzel Blue Pomade (113g)", stock: 2, minStock: 10, status: "danger" },
    { name: "Sáp vuốt Suavecito Matte Pomade", stock: 3, minStock: 8, status: "danger" },
    { name: "Gôm xịt Butterfly Shadow (600ml)", stock: 4, minStock: 12, status: "warning" },
    { name: "Dầu dưỡng râu Proraso Wood & Spice", stock: 3, minStock: 6, status: "warning" },
    { name: "Hộp lưỡi dao Feather Hi-Stainless", stock: 12, minStock: 25, status: "warning" }
  ]
};

// =============================================================================
// CROSS-PAGE SHARED STORAGE SYNC (index.html <-> barbers, appointments, stations, users, reports)
// =============================================================================
const STORAGE_KEYS = {
  BARBERS: 'gb_sync_barbers_v1',
  APPOINTMENTS: 'gb_sync_appointments_v1',
  CHAIRS: 'gb_sync_chairs_v1',
  STATS: 'gb_sync_stats_v1',
  CUSTOMERS: 'gb_sync_customers_v1',
  STAFF: 'gb_sync_staff_v1',
  INVOICES: 'gb_sync_invoices_v1',
  QUEUE: 'gb_sync_queue_v1'
};

const ADMIN_API_BASE = (window.BARBER_API_BASE || 'http://localhost:8000/api/v1/admin');

async function callAdminApi(endpoint, method = 'GET', payload = null) {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    if (payload && method !== 'GET') {
      opts.body = JSON.stringify(payload);
    }
    const res = await fetch(`${ADMIN_API_BASE}${endpoint}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

function normalizeBarberRecord(b, idx = 0) {
  const id = typeof b.id === 'number' ? b.id : (parseInt(String(b.id).replace(/\D/g, ''), 10) || (idx + 1));
  const fullName = b.fullName || b.name || 'Thợ Barber';
  const nickname = b.nickname || b.name || fullName;
  let level = b.level || 'Senior Barber';
  let rank = b.rank || 'senior';
  let rankLabel = b.rankLabel || 'Senior Barber';

  if (level === 'Master Barber' || rank === 'master') {
    level = 'Master Barber';
    rank = 'master';
    rankLabel = 'Master Barber (Trưởng Thợ)';
  } else if (level === 'Junior Barber' || rank === 'junior') {
    level = 'Junior Barber';
    rank = 'junior';
    rankLabel = 'Junior Barber';
  } else if (level.includes('Spa') || rank === 'spa') {
    level = 'KTV Spa & Gội';
    rank = 'spa';
    rankLabel = 'KTV Dưỡng Sinh & Spa';
  } else {
    level = 'Senior Barber';
    rank = 'senior';
    rankLabel = 'Senior Barber';
  }

  const expNum = typeof b.experience === 'number'
    ? b.experience
    : (parseInt(String(b.experience || b.expYears || '4').replace(/\D/g, ''), 10) || 4);
  const expText = typeof b.experience === 'string' && b.experience.includes('năm')
    ? b.experience
    : `${expNum} năm KN`;

  const defaultChair = b.defaultChair || b.chair || 'Ghế 03';
  const cuts = typeof b.cuts === 'number' ? b.cuts : (typeof b.todayCuts === 'number' ? b.todayCuts : 0);
  const revenue = typeof b.revenue === 'number' ? b.revenue : (typeof b.todayRevenue === 'number' ? b.todayRevenue : 0);
  const rating = typeof b.rating === 'number' ? b.rating : (typeof b.csat === 'number' ? b.csat : 5.0);
  const reviewsCount = typeof b.reviewsCount === 'number' ? b.reviewsCount : (typeof b.votes === 'number' ? b.votes : 1);
  const commissionRate = typeof b.commissionRate === 'number' ? b.commissionRate : 35;
  const skills = Array.isArray(b.skills) && b.skills.length > 0 ? b.skills : ['Skin Fade', 'Cắt Tóc Nam', 'Tạo Kiểu'];
  const avatar = b.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
  const status = b.status || 'available';

  return {
    ...b,
    id,
    fullName,
    nickname,
    level,
    rank,
    rankLabel,
    phone: b.phone || '0908 123 456',
    email: b.email || `${nickname.toLowerCase().replace(/[^a-z0-9]/g, '') || 'barber'}@gentleman.vn`,
    expYears: expNum,
    experience: expText,
    skills,
    commissionRate,
    shift: b.shift || 'Full ca (08:30 - 21:30)',
    defaultChair,
    chair: defaultChair,
    cuts,
    todayCuts: cuts,
    revenue,
    todayRevenue: revenue,
    rating,
    csat: rating,
    reviewsCount,
    votes: reviewsCount,
    retentionRate: b.retentionRate || 90,
    status,
    currentCustomer: b.currentCustomer || '--',
    avatar,
    bio: b.bio || `Nghệ nhân tóc với ${expNum} năm kinh nghiệm phục vụ tại The Gentleman Barber.`,
    portfolioImages: Array.isArray(b.portfolioImages) ? b.portfolioImages : []
  };
}

function normalizeAppointmentRecord(a) {
  const timeStr = a.time || '16:00 - 16:45';
  const hourPart = timeStr.split(':')[0] ? timeStr.split(':')[0].trim().padStart(2, '0') + ':00' : '16:00';
  return {
    ...a,
    id: a.id || `BK-${Math.floor(1086 + Math.random() * 900)}`,
    customer: a.customer || 'Khách hàng',
    phone: a.phone || '0900 000 000',
    isVip: Boolean(a.isVip),
    service: a.service || 'Combo Đế Vương 7 bước',
    barber: a.barber || 'Hoàng Barber (Master)',
    time: timeStr,
    slotHour: a.slotHour || hourPart,
    chair: a.chair || 'Ghế 01',
    price: Number(a.price) || 180000,
    status: a.status || 'waiting',
    notes: a.notes || ''
  };
}

function loadSharedState() {
  try {
    const savedBarbers = localStorage.getItem(STORAGE_KEYS.BARBERS);
    if (savedBarbers) {
      const parsed = JSON.parse(savedBarbers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        BarberState.barbers = parsed.map((b, i) => normalizeBarberRecord(b, i));
      }
    } else {
      BarberState.barbers = BarberState.barbers.map((b, i) => normalizeBarberRecord(b, i));
      localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(BarberState.barbers));
    }

    const savedAppointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (savedAppointments) {
      const parsed = JSON.parse(savedAppointments);
      if (Array.isArray(parsed) && parsed.length > 0) {
        BarberState.appointments = parsed.map(normalizeAppointmentRecord);
      }
    } else {
      BarberState.appointments = BarberState.appointments.map(normalizeAppointmentRecord);
      localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(BarberState.appointments));
    }

    const savedChairs = localStorage.getItem(STORAGE_KEYS.CHAIRS);
    if (savedChairs) {
      const parsed = JSON.parse(savedChairs);
      if (Array.isArray(parsed) && parsed.length > 0) {
        BarberState.chairs = parsed;
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.CHAIRS, JSON.stringify(BarberState.chairs));
    }

    const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      if (parsed && typeof parsed === 'object') {
        BarberState.stats = { ...BarberState.stats, ...parsed };
      }
    } else {
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(BarberState.stats));
    }
  } catch (err) {
    console.warn('Error loading shared state from localStorage:', err);
  }
}

function saveSharedState() {
  try {
    BarberState.barbers = BarberState.barbers.map((b, i) => normalizeBarberRecord(b, i));
    BarberState.appointments = BarberState.appointments.map(normalizeAppointmentRecord);

    localStorage.setItem(STORAGE_KEYS.BARBERS, JSON.stringify(BarberState.barbers));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(BarberState.appointments));
    localStorage.setItem(STORAGE_KEYS.CHAIRS, JSON.stringify(BarberState.chairs));
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(BarberState.stats));
    updateDynamicFilterDropdowns();
  } catch (err) {
    console.warn('Error saving shared state to localStorage:', err);
  }
}

function syncCustomerToCRM(booking) {
  try {
    let customers = [];
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (raw) {
      customers = JSON.parse(raw);
    }
    if (!Array.isArray(customers)) customers = [];

    const existing = customers.find(
      c => c.phone === booking.phone || c.name.toLowerCase() === booking.customer.toLowerCase()
    );
    if (existing) {
      existing.lastVisit = `Hôm nay, ${booking.time.split(' - ')[0]}`;
      existing.visitsCount = (existing.visitsCount || 1) + 1;
      existing.favoriteBarber = booking.barber;
      if (booking.isVip) existing.tier = 'Diamond';
      if (booking.notes) existing.hairNote = booking.notes;
    } else {
      customers.unshift({
        id: `KH-${Math.floor(8811 + Math.random() * 180)}`,
        name: booking.customer,
        phone: booking.phone,
        email: `${booking.customer.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '')}@gmail.com`,
        tier: booking.isVip ? 'Diamond' : 'Member',
        points: booking.isVip ? 500 : 100,
        totalSpent: booking.price || 180000,
        visitsCount: 1,
        lastVisit: `Hôm nay, ${booking.time.split(' - ')[0]}`,
        hairNote: booking.notes || `Đặt gói: ${booking.service}`,
        favoriteBarber: booking.barber,
        status: 'active'
      });
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  } catch (err) {
    console.warn('Error syncing customer to CRM:', err);
  }
}

function syncBookingToStationQueue(booking) {
  try {
    let queue = [];
    const raw = localStorage.getItem(STORAGE_KEYS.QUEUE);
    if (raw) queue = JSON.parse(raw);
    if (!Array.isArray(queue)) queue = [];

    queue.unshift({
      id: booking.id.replace('BK-', 'Q-'),
      name: booking.customer,
      phone: booking.phone,
      service: booking.service,
      isVip: booking.isVip,
      waitTime: `Hẹn ${booking.time.split(' - ')[0]}`,
      preferredBarber: booking.barber
    });
    localStorage.setItem(STORAGE_KEYS.QUEUE, JSON.stringify(queue));
  } catch (err) {
    console.warn('Error syncing booking to station queue:', err);
  }
}

function syncCompletedBookingToInvoices(app) {
  try {
    let invoices = [];
    const raw = localStorage.getItem(STORAGE_KEYS.INVOICES);
    if (raw) invoices = JSON.parse(raw);
    if (!Array.isArray(invoices)) invoices = [];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    invoices.unshift({
      id: app.id.replace('BK-', 'INV-'),
      date: dateStr,
      time: timeStr,
      customer: app.customer,
      isVip: app.isVip,
      items: app.service,
      barber: app.barber,
      paymentMethod: 'Chuyển khoản QR',
      paymentIcon: 'fa-qrcode text-amber-400',
      amount: app.price
    });
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  } catch (err) {
    console.warn('Error syncing invoice:', err);
  }
}

function updateDynamicFilterDropdowns() {
  const navBarberBadge = document.getElementById('navBarberBadge');
  if (navBarberBadge) navBarberBadge.textContent = BarberState.barbers.length;

  const navBookingBadge = document.getElementById('navBookingBadge');
  if (navBookingBadge) navBookingBadge.textContent = BarberState.stats.totalBookings || BarberState.appointments.length;

  const barberFilterSelect = document.getElementById('barberFilterSelect');
  if (barberFilterSelect) {
    const prevVal = barberFilterSelect.value || 'all';
    barberFilterSelect.innerHTML = `<option value="all">Tất cả thợ Barber (${BarberState.barbers.length})</option>` +
      BarberState.barbers.map(b => {
        const shortName = b.nickname.split(' (')[0];
        return `<option value="${shortName}">${b.nickname}</option>`;
      }).join('');
    barberFilterSelect.value = prevVal;
  }

  const selectBarber = document.getElementById('modalSelectBarber');
  if (selectBarber) {
    selectBarber.innerHTML = BarberState.barbers.map(b => `<option value="${b.nickname}">${b.nickname} (${b.experience})</option>`).join('');
  }
}

// --- FORMATTERS ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// --- CLOCK & DATE ---
function initRealtimeClock() {
  const clockElement = document.getElementById('liveClock');
  const dateElement = document.getElementById('liveDate');

  const update = () => {
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = days[now.getDay()];
    const dateStr = `${dayName}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    if (clockElement) clockElement.textContent = timeStr;
    if (dateElement) dateElement.textContent = dateStr;
  };

  update();
  setInterval(update, 1000);
}

// --- VIEW NAVIGATION CONTROLLER ---
let currentMainView = 'overview'; // 'overview' or 'barbers'

function switchMainView(viewName, event) {
  if (event) event.preventDefault();
  currentMainView = viewName;

  const viewOverview = document.getElementById('viewOverview');
  const viewBarbers = document.getElementById('viewBarbers');
  const navOverview = document.getElementById('navLinkOverview');
  const navBarbers = document.getElementById('navLinkBarbers');
  const pageHeaderTitle = document.getElementById('pageHeaderTitle');

  // Reset all nav styles
  document.querySelectorAll('#mainSidebar nav a').forEach(a => {
    a.classList.remove('nav-item-active', 'text-white');
    a.classList.add('text-slate-400');
  });

  if (viewName === 'barbers') {
    if (viewOverview) viewOverview.classList.add('hidden');
    if (viewBarbers) viewBarbers.classList.remove('hidden');
    if (navBarbers) {
      navBarbers.classList.add('nav-item-active', 'text-white');
      navBarbers.classList.remove('text-slate-400');
    }
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'Quản Lý Đội Ngũ Barber & Stylist';
    renderBarbersManagementView();
  } else {
    if (viewOverview) viewOverview.classList.remove('hidden');
    if (viewBarbers) viewBarbers.classList.add('hidden');
    if (navOverview) {
      navOverview.classList.add('nav-item-active', 'text-white');
      navOverview.classList.remove('text-slate-400');
    }
    if (pageHeaderTitle) pageHeaderTitle.textContent = 'Bảng Quản Trị Salon Hôm Nay';
    renderChairsGrid();
    renderAppointmentsTable();
    renderBarbersList();
  }
}

// =============================================================================
// BARBER MANAGEMENT MODULE (LIST, ADD/EDIT, STATUS)
// =============================================================================

let barberSearchQuery = '';
let barberLevelFilter = 'all';
let barberStatusFilter = 'all';
let barberSortBy = 'revenue-desc';
let barberDisplayMode = 'grid'; // 'grid' or 'table'
let editingBarberId = null;

function renderBarbersManagementView() {
  updateBarberStatsKPIs();

  let filtered = BarberState.barbers.filter(barber => {
    // Level filter
    if (barberLevelFilter !== 'all' && barber.level !== barberLevelFilter) return false;

    // Status filter
    if (barberStatusFilter !== 'all' && barber.status !== barberStatusFilter) return false;

    // Search query (name, phone, skills, nickname)
    if (barberSearchQuery.trim() !== '') {
      const q = barberSearchQuery.toLowerCase();
      const matchName = barber.fullName.toLowerCase().includes(q);
      const matchNick = barber.nickname.toLowerCase().includes(q);
      const matchPhone = barber.phone.includes(q);
      const matchSkill = barber.skills.some(s => s.toLowerCase().includes(q));
      if (!matchName && !matchNick && !matchPhone && !matchSkill) return false;
    }

    return true;
  });

  // Sort
  if (barberSortBy === 'revenue-desc') {
    filtered.sort((a, b) => b.revenue - a.revenue);
  } else if (barberSortBy === 'cuts-desc') {
    filtered.sort((a, b) => b.cuts - a.cuts);
  } else if (barberSortBy === 'rating-desc') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (barberSortBy === 'name-asc') {
    filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  // Render Grid or Table
  const gridContainer = document.getElementById('barberCardsGrid');
  const tableContainer = document.getElementById('barberTableContainer');

  if (barberDisplayMode === 'grid') {
    if (gridContainer) gridContainer.classList.remove('hidden');
    if (tableContainer) tableContainer.classList.add('hidden');
    renderBarbersGrid(filtered);
  } else {
    if (gridContainer) gridContainer.classList.add('hidden');
    if (tableContainer) tableContainer.classList.remove('hidden');
    renderBarbersTable(filtered);
  }
}

function updateBarberStatsKPIs() {
  const totalBarbers = BarberState.barbers.length;
  const busyBarbers = BarberState.barbers.filter(b => b.status === 'busy').length;
  const availableBarbers = BarberState.barbers.filter(b => b.status === 'available').length;
  const breakOrOffBarbers = BarberState.barbers.filter(b => b.status === 'break' || b.status === 'off').length;

  const totalRevenue = BarberState.barbers.reduce((sum, b) => sum + b.revenue, 0);
  const totalCommission = BarberState.barbers.reduce((sum, b) => sum + (b.revenue * (b.commissionRate / 100)), 0);

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('kpiBarberTotal', totalBarbers);
  setEl('kpiBarberBusy', busyBarbers);
  setEl('kpiBarberAvailable', availableBarbers);
  setEl('kpiBarberBreakOff', breakOrOffBarbers);
  setEl('kpiBarberRevenue', formatCurrency(totalRevenue));
  setEl('kpiBarberCommission', formatCurrency(totalCommission));

  const navBadge = document.getElementById('navBarberBadge');
  if (navBadge) navBadge.textContent = totalBarbers;
}

function getLevelBadgeHtml(level) {
  if (level === 'Master Barber') {
    return `<span class="level-badge-master text-[11px] font-black px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"><i class="fas fa-crown text-[10px]"></i> Master</span>`;
  } else if (level === 'Senior Barber') {
    return `<span class="level-badge-senior text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"><i class="fas fa-certificate text-[10px]"></i> Senior</span>`;
  } else if (level === 'Junior Barber') {
    return `<span class="level-badge-junior text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"><i class="fas fa-award text-[10px]"></i> Junior</span>`;
  } else {
    return `<span class="level-badge-spa text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1"><i class="fas fa-spa text-[10px]"></i> KTV Spa</span>`;
  }
}

function getStatusBadgeHtml(status, currentCustomer = '--') {
  if (status === 'busy') {
    return `
      <span class="badge-barber-busy text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow-sm">
        <span class="w-2 h-2 rounded-full bg-amber-400 pulse-amber"></span> Đang cắt tóc
      </span>
    `;
  } else if (status === 'available') {
    return `
      <span class="badge-barber-available text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow-sm">
        <span class="w-2 h-2 rounded-full bg-emerald-400 pulse-emerald"></span> Sẵn sàng đón khách
      </span>
    `;
  } else if (status === 'break') {
    return `
      <span class="badge-barber-break text-[11px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow-sm">
        <span class="w-2 h-2 rounded-full bg-rose-400 pulse-rose"></span> Tạm nghỉ / Ăn trưa
      </span>
    `;
  } else {
    return `
      <span class="badge-barber-off text-[11px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow-sm">
        <span class="w-2 h-2 rounded-full bg-slate-500"></span> Nghỉ ca hôm nay
      </span>
    `;
  }
}

function renderBarbersGrid(barbersList) {
  const container = document.getElementById('barberCardsGrid');
  if (!container) return;

  if (barbersList.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-400">
        <i class="fas fa-user-slash text-4xl mb-3 text-slate-600 block"></i>
        Không tìm thấy thợ Barber nào phù hợp với bộ lọc tìm kiếm.
      </div>
    `;
    return;
  }

  container.innerHTML = barbersList.map(b => {
    const commissionAmount = b.revenue * (b.commissionRate / 100);

    const skillsHtml = b.skills.map(s =>
      `<span class="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60 font-medium">#${s}</span>`
    ).join(' ');

    return `
      <div class="barber-card p-5 relative flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
        <div>
          <!-- Header: Level & Chair -->
          <div class="flex items-center justify-between mb-3">
            ${getLevelBadgeHtml(b.level)}
            <span class="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
              <i class="fas fa-chair mr-1 text-slate-500"></i> ${b.defaultChair}
            </span>
          </div>

          <!-- Profile info -->
          <div class="flex items-start gap-3.5 mb-4">
            <div class="relative shrink-0">
              <img src="${b.avatar}" alt="${b.fullName}" class="w-14 h-14 rounded-2xl object-cover border-2 border-slate-700 shadow-md">
              <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${b.status === 'busy' ? 'bg-amber-400' : (b.status === 'available' ? 'bg-emerald-400' : (b.status === 'break' ? 'bg-rose-400' : 'bg-slate-500'))}"></span>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-extrabold text-white truncate">${b.fullName}</h4>
              <p class="text-xs text-amber-400 font-semibold mb-1">${b.nickname}</p>
              <div class="text-[11px] text-slate-400 flex items-center gap-2">
                <span><i class="fas fa-phone-alt mr-1 text-slate-500"></i>${b.phone}</span>
                <span>&bull;</span>
                <span>${b.experience}</span>
              </div>
            </div>
          </div>

          <!-- Live Status Dropdown Pill -->
          <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 mb-3">
            <div class="flex items-center justify-between mb-1">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trạng thái trực ca</span>
              <div class="relative inline-block text-left">
                <select onchange="quickUpdateBarberStatus(${b.id}, this.value)" class="text-xs font-bold py-1 px-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
                  <option value="available" ${b.status === 'available' ? 'selected' : ''}>🟢 Sẵn sàng</option>
                  <option value="busy" ${b.status === 'busy' ? 'selected' : ''}>🟡 Đang cắt</option>
                  <option value="break" ${b.status === 'break' ? 'selected' : ''}>🔴 Tạm nghỉ</option>
                  <option value="off" ${b.status === 'off' ? 'selected' : ''}>⚫ Nghỉ ca</option>
                </select>
              </div>
            </div>
            <p class="text-[11px] text-slate-300 truncate">
              ${b.status === 'busy' ? `<span class="text-amber-400 font-semibold">Khách:</span> ${b.currentCustomer}` : (b.status === 'available' ? '<span class="text-emerald-400 font-medium">Ghế trống, sẵn sàng tiếp nhận lượt tiếp theo</span>' : (b.status === 'break' ? 'Đang tạm dừng tiếp nhận lượt mới' : 'Hôm nay không có lịch trực ca'))}
            </p>
          </div>

          <!-- Shift & Skills -->
          <div class="mb-3 space-y-1.5">
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>Ca trực:</span>
              <span class="text-white font-medium">${b.shift}</span>
            </div>
            <div class="flex flex-wrap gap-1 pt-1">
              ${skillsHtml}
            </div>
          </div>

          <!-- Performance today -->
          <div class="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-center mb-4">
            <div>
              <p class="text-[10px] text-slate-400 font-semibold uppercase">Lượt cắt</p>
              <p class="text-xs font-black text-white mt-0.5">${b.cuts} lượt</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 font-semibold uppercase">Doanh thu</p>
              <p class="text-xs font-black text-amber-400 mt-0.5">${formatCurrency(b.revenue)}</p>
            </div>
            <div>
              <p class="text-[10px] text-slate-400 font-semibold uppercase">Hoa hồng (${b.commissionRate}%)</p>
              <p class="text-xs font-black text-emerald-400 mt-0.5">${formatCurrency(commissionAmount)}</p>
            </div>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1 text-xs text-amber-400">
            <i class="fas fa-star text-[11px]"></i>
            <span class="font-bold">${b.rating}</span>
            <span class="text-[10px] text-slate-500">(${b.reviewsCount})</span>
          </div>

          <div class="flex items-center gap-1.5">
            <button onclick="openBarberModal(${b.id})" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1">
              <i class="fas fa-user-edit text-amber-400"></i> Sửa
            </button>
            <button onclick="deleteBarber(${b.id})" title="Xóa hoặc ngưng hoạt động" class="p-1.5 rounded-lg bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/60 text-xs transition">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderBarbersTable(barbersList) {
  const tbody = document.getElementById('barberTableBody');
  if (!tbody) return;

  if (barbersList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-slate-400">
          Không tìm thấy thợ Barber nào phù hợp với bộ lọc tìm kiếm.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = barbersList.map(b => {
    const commissionAmount = b.revenue * (b.commissionRate / 100);

    return `
      <tr class="table-row-hover border-b border-slate-800/80">
        <td class="py-3 px-4">
          <div class="flex items-center gap-3">
            <img src="${b.avatar}" alt="${b.fullName}" class="w-10 h-10 rounded-xl object-cover border border-slate-700">
            <div>
              <div class="text-sm font-bold text-white flex items-center gap-1.5">
                ${b.fullName}
                ${getLevelBadgeHtml(b.level)}
              </div>
              <div class="text-xs text-amber-400 font-semibold">${b.nickname} &bull; <span class="text-slate-400 font-normal">${b.phone}</span></div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4 text-xs">
          <span class="font-semibold text-slate-200">${b.defaultChair}</span>
          <p class="text-[11px] text-slate-400">${b.shift}</p>
        </td>
        <td class="py-3 px-4">
          <select onchange="quickUpdateBarberStatus(${b.id}, this.value)" class="text-xs font-bold py-1 px-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer">
            <option value="available" ${b.status === 'available' ? 'selected' : ''}>🟢 Sẵn sàng</option>
            <option value="busy" ${b.status === 'busy' ? 'selected' : ''}>🟡 Đang cắt</option>
            <option value="break" ${b.status === 'break' ? 'selected' : ''}>🔴 Tạm nghỉ</option>
            <option value="off" ${b.status === 'off' ? 'selected' : ''}>⚫ Nghỉ ca</option>
          </select>
        </td>
        <td class="py-3 px-4 text-center">
          <span class="text-xs font-bold text-white">${b.cuts}</span>
        </td>
        <td class="py-3 px-4 text-xs font-extrabold text-amber-400">
          ${formatCurrency(b.revenue)}
        </td>
        <td class="py-3 px-4 text-xs font-semibold text-emerald-400">
          ${formatCurrency(commissionAmount)}
          <span class="text-[10px] text-slate-400 block font-normal">${b.commissionRate}% hoa hồng</span>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openBarberModal(${b.id})" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition">
              <i class="fas fa-edit text-amber-400 mr-1"></i> Sửa
            </button>
            <button onclick="deleteBarber(${b.id})" class="p-1.5 text-slate-400 hover:text-red-400 transition">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleBarberDisplayMode(mode) {
  barberDisplayMode = mode;
  const gridBtn = document.getElementById('barberViewGridBtn');
  const tableBtn = document.getElementById('barberViewTableBtn');

  if (mode === 'grid') {
    if (gridBtn) { gridBtn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40'); gridBtn.classList.remove('text-slate-400'); }
    if (tableBtn) { tableBtn.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40'); tableBtn.classList.add('text-slate-400'); }
  } else {
    if (tableBtn) { tableBtn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40'); tableBtn.classList.remove('text-slate-400'); }
    if (gridBtn) { gridBtn.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40'); gridBtn.classList.add('text-slate-400'); }
  }

  renderBarbersManagementView();
}

function quickUpdateBarberStatus(barberId, newStatus) {
  const barber = BarberState.barbers.find(b => b.id === barberId);
  if (!barber) return;

  barber.status = newStatus;

  // Sync chair status if assigned
  const chairObj = BarberState.chairs.find(c => c.code.toLowerCase().includes(barber.defaultChair.toLowerCase()) || c.barber.includes(barber.nickname.split(' ')[0]));
  if (chairObj) {
    if (newStatus === 'available') {
      chairObj.status = 'available';
      chairObj.service = 'Sẵn sàng đón khách';
      chairObj.customer = '--';
    } else if (newStatus === 'busy') {
      chairObj.status = 'busy';
      chairObj.remainingMin = 30;
      if (chairObj.customer === '--') chairObj.customer = 'Khách tại salon';
    } else if (newStatus === 'off' || newStatus === 'break') {
      chairObj.status = 'maintenance';
      chairObj.service = newStatus === 'break' ? 'Thợ tạm nghỉ 30p' : 'Thợ đã hết ca làm';
    }
  }

  saveSharedState();
  renderBarbersManagementView();
  renderChairsGrid();
  renderBarbersList();

  const statusName = newStatus === 'available' ? 'Sẵn sàng' : (newStatus === 'busy' ? 'Đang cắt tóc' : (newStatus === 'break' ? 'Tạm nghỉ' : 'Nghỉ ca'));
  showToast(`Đã chuyển trạng thái ${barber.nickname} sang: ${statusName}!`, 'info');
}

// --- BARBER MODAL (ADD / EDIT) ---
function openBarberModal(barberId = null) {
  editingBarberId = barberId;
  const modal = document.getElementById('barberModal');
  const modalTitle = document.getElementById('barberModalTitle');
  const modalSubtitle = document.getElementById('barberModalSubtitle');
  if (!modal) return;

  if (barberId) {
    const barber = BarberState.barbers.find(b => b.id === barberId);
    if (!barber) return;

    if (modalTitle) modalTitle.textContent = 'Chỉnh Sửa Hồ Sơ Barber';
    if (modalSubtitle) modalSubtitle.textContent = `Cập nhật thông tin thợ ${barber.fullName} (${barber.nickname})`;

    document.getElementById('barberFormFullName').value = barber.fullName;
    document.getElementById('barberFormNickname').value = barber.nickname;
    document.getElementById('barberFormPhone').value = barber.phone;
    document.getElementById('barberFormEmail').value = barber.email;
    document.getElementById('barberFormLevel').value = barber.level;
    document.getElementById('barberFormExperience').value = barber.experience;
    document.getElementById('barberFormCommission').value = barber.commissionRate;
    document.getElementById('barberFormShift').value = barber.shift;
    document.getElementById('barberFormChair').value = barber.defaultChair;
    document.getElementById('barberFormStatus').value = barber.status;
    document.getElementById('barberFormSkills').value = barber.skills.join(', ');
    document.getElementById('barberFormAvatar').value = barber.avatar;
  } else {
    if (modalTitle) modalTitle.textContent = 'Thêm Thợ Barber Mới';
    if (modalSubtitle) modalSubtitle.textContent = 'Điền thông tin thành viên mới vào hệ thống salon';

    document.getElementById('barberFormFullName').value = '';
    document.getElementById('barberFormNickname').value = '';
    document.getElementById('barberFormPhone').value = '';
    document.getElementById('barberFormEmail').value = '';
    document.getElementById('barberFormLevel').value = 'Senior Barber';
    document.getElementById('barberFormExperience').value = '3 năm KN';
    document.getElementById('barberFormCommission').value = 35;
    document.getElementById('barberFormShift').value = 'Ca sáng (08:30 - 16:30)';
    document.getElementById('barberFormChair').value = 'Ghế 03';
    document.getElementById('barberFormStatus').value = 'available';
    document.getElementById('barberFormSkills').value = 'Skin Fade, Uốn Texture, Cạo Râu';
    document.getElementById('barberFormAvatar').value = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeBarberModal() {
  const modal = document.getElementById('barberModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  editingBarberId = null;
}

function submitBarberForm(event) {
  event.preventDefault();

  const fullName = document.getElementById('barberFormFullName').value.trim();
  const nickname = document.getElementById('barberFormNickname').value.trim();
  const phone = document.getElementById('barberFormPhone').value.trim();
  const email = document.getElementById('barberFormEmail').value.trim();
  const level = document.getElementById('barberFormLevel').value;
  const experience = document.getElementById('barberFormExperience').value.trim();
  const commissionRate = parseInt(document.getElementById('barberFormCommission').value) || 30;
  const shift = document.getElementById('barberFormShift').value;
  const defaultChair = document.getElementById('barberFormChair').value;
  const status = document.getElementById('barberFormStatus').value;
  const skillsInput = document.getElementById('barberFormSkills').value;
  const avatar = document.getElementById('barberFormAvatar').value.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);

  if (!fullName || !phone) {
    showToast('Vui lòng nhập họ tên và số điện thoại thợ!', 'danger');
    return;
  }

  let savedBarber = null;
  if (editingBarberId) {
    // Update existing
    const idx = BarberState.barbers.findIndex(b => b.id === editingBarberId);
    if (idx !== -1) {
      const barber = BarberState.barbers[idx];
      barber.fullName = fullName;
      barber.nickname = nickname || fullName;
      barber.phone = phone;
      barber.email = email || `${(nickname || fullName).toLowerCase().replace(/\s+/g, '')}@gentleman.vn`;
      barber.level = level;
      barber.experience = experience || '2 năm KN';
      barber.commissionRate = commissionRate;
      barber.shift = shift;
      barber.defaultChair = defaultChair;
      barber.status = status;
      barber.skills = skills.length > 0 ? skills : ['Cắt Tóc Nam', 'Fade'];
      barber.avatar = avatar;
      savedBarber = normalizeBarberRecord(barber);
      BarberState.barbers[idx] = savedBarber;

      showToast(`Đã cập nhật hồ sơ thợ ${savedBarber.nickname} và đồng bộ các trang!`, 'success');
    }
  } else {
    // Create new
    const newId = BarberState.barbers.length > 0 ? Math.max(...BarberState.barbers.map(b => b.id)) + 1 : 1;
    const newBarber = normalizeBarberRecord({
      id: newId,
      fullName: fullName,
      nickname: nickname || fullName,
      level: level,
      phone: phone,
      email: email || `barber${newId}@gentleman.vn`,
      experience: experience || '2 năm KN',
      skills: skills.length > 0 ? skills : ['Cắt Tóc Nam', 'Fade'],
      commissionRate: commissionRate,
      shift: shift,
      defaultChair: defaultChair,
      cuts: 0,
      revenue: 0,
      rating: 5.0,
      reviewsCount: 1,
      status: status,
      currentCustomer: '--',
      avatar: avatar
    });

    BarberState.barbers.push(newBarber);
    savedBarber = newBarber;
    showToast(`Đã thêm thợ ${newBarber.nickname} và đồng bộ sang Quản lý Barber, Lịch hẹn, Trạm ghế!`, 'success');
  }

  // Sync assigned chair barber name if chair is selected
  if (savedBarber && savedBarber.defaultChair) {
    const chairMatch = BarberState.chairs.find(c =>
      c.code.toLowerCase().includes(savedBarber.defaultChair.toLowerCase()) ||
      savedBarber.defaultChair.toLowerCase().includes(c.code.split(' ')[0].toLowerCase() + ' ' + (c.code.split(' ')[1] || '').toLowerCase())
    );
    if (chairMatch) {
      chairMatch.barber = `${savedBarber.nickname} (${savedBarber.level.split(' ')[0]})`;
    }
  }

  saveSharedState();
  if (savedBarber) {
    const apiPayload = {
      name: savedBarber.nickname || savedBarber.fullName,
      phone: savedBarber.phone,
      email: savedBarber.email,
      rank: savedBarber.level,
      specialty: (savedBarber.skills || []).join(' & ') || 'Classic Cut & Skin Fade',
      exp: savedBarber.exp || 3,
      chair: savedBarber.defaultChair || savedBarber.chair,
      shift: savedBarber.shift,
      status: savedBarber.status,
      commissionRate: savedBarber.commissionRate,
      skills: savedBarber.skills,
      avatar: savedBarber.avatar
    };
    if (editingBarberId) {
      callAdminApi(`/barbers/${encodeURIComponent(savedBarber.code || savedBarber.id)}`, 'PUT', apiPayload);
    } else {
      callAdminApi('/barbers', 'POST', apiPayload);
    }
  }
  closeBarberModal();
  renderBarbersManagementView();
  renderBarbersList();
  renderChairsGrid();
  updateDynamicFilterDropdowns();
}

function deleteBarber(barberId) {
  const barber = BarberState.barbers.find(b => b.id === barberId);
  if (!barber) return;

  if (confirm(`Bạn có chắc chắn muốn ngưng hoạt động / xóa thợ ${barber.fullName} (${barber.nickname}) khỏi danh sách salon?`)) {
    BarberState.barbers = BarberState.barbers.filter(b => b.id !== barberId);
    saveSharedState();
    callAdminApi(`/barbers/${encodeURIComponent(barber.code || barber.id)}`, 'DELETE');
    showToast(`Đã xóa thợ ${barber.nickname} khỏi hệ thống!`, 'info');
    renderBarbersManagementView();
    renderBarbersList();
    updateDynamicFilterDropdowns();
  }
}

// --- RENDER CHAIRS GRID ---
function renderChairsGrid() {
  const container = document.getElementById('chairsGrid');
  if (!container) return;

  container.innerHTML = BarberState.chairs.map(chair => {
    let statusClass = 'chair-empty';
    let statusLabel = 'Trống - Sẵn sàng';
    let pulseHtml = '';
    let actionBtn = `<button onclick="openBookingModalForChair(${chair.id})" class="mt-2 w-full text-xs font-semibold py-1.5 px-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg transition">Nhận khách ngay</button>`;

    if (chair.status === 'busy') {
      statusClass = 'chair-busy';
      statusLabel = `Đang cắt (${chair.remainingMin}p nữa)`;
      pulseHtml = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5 pulse-amber"></span>`;
      actionBtn = `<button onclick="showChairDetails(${chair.id})" class="mt-2 w-full text-xs font-semibold py-1.5 px-2 bg-slate-700/60 hover:bg-slate-700 text-slate-200 rounded-lg transition">Chi tiết tiến độ</button>`;
    } else if (chair.status === 'available') {
      statusClass = 'chair-active';
      statusLabel = 'Sẵn sàng nhận khách';
      pulseHtml = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 mr-1.5 pulse-emerald"></span>`;
    } else if (chair.status === 'reserved') {
      statusClass = 'chair-empty';
      statusLabel = 'Đã đặt trước';
      pulseHtml = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-sky-400 mr-1.5"></span>`;
      actionBtn = `<button onclick="showChairDetails(${chair.id})" class="mt-2 w-full text-xs font-semibold py-1.5 px-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-lg transition">Xem lịch hẹn</button>`;
    } else if (chair.status === 'maintenance') {
      statusClass = 'chair-cleaning';
      statusLabel = 'Bảo trì / Khử trùng UV';
      pulseHtml = `<span class="inline-block w-2.5 h-2.5 rounded-full bg-slate-400 mr-1.5"></span>`;
      actionBtn = `<button onclick="toggleChairReady(${chair.id})" class="mt-2 w-full text-xs font-semibold py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition">Kích hoạt sẵn sàng</button>`;
    }

    return `
      <div class="barber-card ${statusClass} p-3.5 relative flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-sm tracking-wide text-white flex items-center">
              <i class="fas ${chair.icon} text-amber-400 mr-1.5"></i>
              ${chair.code}
            </span>
            <span class="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-900/60 text-slate-300 flex items-center">
              ${pulseHtml} ${statusLabel}
            </span>
          </div>

          <div class="space-y-1 my-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Thợ trực:</span>
              <span class="font-semibold text-amber-200">${chair.barber}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Khách hàng:</span>
              <span class="font-medium text-white truncate max-w-[130px]">${chair.customer}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-slate-400">Dịch vụ:</span>
              <span class="text-slate-300 text-[11px] truncate max-w-[130px]">${chair.service}</span>
            </div>
          </div>
        </div>

        ${actionBtn}
      </div>
    `;
  }).join('');
}

// --- RENDER APPOINTMENTS TABLE ---
let currentFilter = 'all';
let currentSearch = '';
let currentBarberFilter = 'all';

function renderAppointmentsTable() {
  const tbody = document.getElementById('appointmentsTableBody');
  if (!tbody) return;

  let filtered = BarberState.appointments.filter(item => {
    if (currentFilter !== 'all' && item.status !== currentFilter) return false;
    if (currentBarberFilter !== 'all' && !item.barber.includes(currentBarberFilter)) return false;

    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase();
      const matchCustomer = item.customer.toLowerCase().includes(q);
      const matchPhone = item.phone.includes(q);
      const matchCode = item.id.toLowerCase().includes(q);
      const matchService = item.service.toLowerCase().includes(q);
      if (!matchCustomer && !matchPhone && !matchCode && !matchService) return false;
    }

    return true;
  });

  const countAll = BarberState.appointments.length;
  const countServing = BarberState.appointments.filter(a => a.status === 'serving').length;
  const countWaiting = BarberState.appointments.filter(a => a.status === 'waiting').length;
  const countDone = BarberState.appointments.filter(a => a.status === 'done').length;
  const countCancelled = BarberState.appointments.filter(a => a.status === 'cancelled').length;

  const countAllEl = document.getElementById('countAll');
  const countServingEl = document.getElementById('countServing');
  const countWaitingEl = document.getElementById('countWaiting');
  const countDoneEl = document.getElementById('countDone');
  const countCancelledEl = document.getElementById('countCancelled');

  if (countAllEl) countAllEl.textContent = countAll;
  if (countServingEl) countServingEl.textContent = countServing;
  if (countWaitingEl) countWaitingEl.textContent = countWaiting;
  if (countDoneEl) countDoneEl.textContent = countDone;
  if (countCancelledEl) countCancelledEl.textContent = countCancelled;

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-8 text-slate-400">
          <i class="fas fa-inbox text-3xl mb-2 text-slate-500 block"></i>
          Không tìm thấy lượt hẹn nào phù hợp với bộ lọc.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    let statusBadge = '';
    let actionButtons = '';

    if (item.status === 'serving') {
      statusBadge = `<span class="badge-serving text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><i class="fas fa-scissors fa-spin"></i> Đang phục vụ</span>`;
      actionButtons = `
        <button onclick="finishAppointment('${item.id}')" title="Hoàn thành dịch vụ" class="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-xs font-semibold border border-emerald-500/30 transition">
          <i class="fas fa-check mr-1"></i> Xong
        </button>
        <button onclick="viewInvoice('${item.id}')" title="Xem phiếu" class="p-1.5 text-slate-400 hover:text-amber-400 text-xs transition">
          <i class="fas fa-receipt"></i>
        </button>
      `;
    } else if (item.status === 'waiting') {
      statusBadge = `<span class="badge-waiting text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><i class="far fa-clock"></i> Chờ phục vụ</span>`;
      actionButtons = `
        <button onclick="checkinAppointment('${item.id}')" title="Bắt đầu cắt" class="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 text-xs font-semibold border border-amber-500/30 transition">
          <i class="fas fa-chair mr-1"></i> Vào ghế
        </button>
        <button onclick="cancelAppointment('${item.id}')" title="Hủy lịch" class="p-1.5 text-slate-400 hover:text-red-400 text-xs transition">
          <i class="fas fa-times"></i>
        </button>
      `;
    } else if (item.status === 'done') {
      statusBadge = `<span class="badge-done text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><i class="fas fa-check-circle"></i> Đã hoàn thành</span>`;
      actionButtons = `
        <button onclick="viewInvoice('${item.id}')" title="In / Xem hóa đơn" class="px-2.5 py-1 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition">
          <i class="fas fa-file-invoice-dollar mr-1 text-amber-400"></i> Hóa đơn
        </button>
      `;
    } else if (item.status === 'cancelled') {
      statusBadge = `<span class="badge-cancelled text-xs font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"><i class="fas fa-ban"></i> Đã hủy</span>`;
      actionButtons = `
        <span class="text-xs text-slate-500 italic">Đã hủy hẹn</span>
      `;
    }

    const vipPill = item.isVip
      ? `<span class="ml-1.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">VIP</span>`
      : '';

    return `
      <tr class="table-row-hover border-b border-slate-800/80">
        <td class="py-3 px-4 font-mono text-xs text-amber-400 font-bold">${item.id}</td>
        <td class="py-3 px-4">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-amber-400 mr-2.5 text-xs">
              ${item.customer.charAt(0)}
            </div>
            <div>
              <div class="text-sm font-semibold text-white flex items-center">
                ${item.customer} ${vipPill}
              </div>
              <div class="text-xs text-slate-400">${item.phone}</div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4">
          <div class="text-xs font-medium text-slate-200">${item.service}</div>
          <div class="text-[11px] text-amber-400/90 font-semibold">${formatCurrency(item.price)}</div>
        </td>
        <td class="py-3 px-4">
          <div class="text-xs font-semibold text-white flex items-center">
            <i class="fas fa-user-tie text-amber-400 mr-1.5 text-[10px]"></i> ${item.barber}
          </div>
          <div class="text-[11px] text-slate-400">${item.chair}</div>
        </td>
        <td class="py-3 px-4 text-xs font-medium text-slate-300">
          <i class="far fa-clock text-slate-400 mr-1"></i> ${item.time}
        </td>
        <td class="py-3 px-4">${statusBadge}</td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${actionButtons}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// --- RENDER BARBER LEADERBOARD (OVERVIEW) ---
function renderBarbersList() {
  const container = document.getElementById('barberLeaderboard');
  if (!container) return;

  const sorted = [...BarberState.barbers].sort((a, b) => b.revenue - a.revenue);

  container.innerHTML = sorted.slice(0, 5).map((b, idx) => {
    let rankBadge = `<span class="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center justify-center">${idx + 1}</span>`;
    if (idx === 0) rankBadge = `<span class="w-5 h-5 rounded-full bg-amber-500 text-slate-900 text-xs font-black flex items-center justify-center shadow-lg shadow-amber-500/50"><i class="fas fa-crown text-[10px]"></i></span>`;
    if (idx === 1) rankBadge = `<span class="w-5 h-5 rounded-full bg-slate-300 text-slate-900 text-xs font-black flex items-center justify-center">2</span>`;
    if (idx === 2) rankBadge = `<span class="w-5 h-5 rounded-full bg-amber-700 text-amber-100 text-xs font-black flex items-center justify-center">3</span>`;

    return `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800 transition">
        <div class="flex items-center gap-2.5">
          ${rankBadge}
          <img src="${b.avatar}" alt="${b.fullName}" class="w-9 h-9 rounded-full object-cover border border-amber-500/30">
          <div>
            <h5 class="text-xs font-bold text-white">${b.nickname}</h5>
            <p class="text-[11px] text-slate-400">${b.cuts} lượt cắt &bull; ⭐ ${b.rating}</p>
          </div>
        </div>
        <div class="text-right">
          <div class="text-xs font-extrabold text-amber-400">${formatCurrency(b.revenue)}</div>
          <span class="text-[10px] text-slate-400">${b.experience}</span>
        </div>
      </div>
    `;
  }).join('');
}

// --- RENDER INVENTORY ALERTS ---
function renderInventoryAlerts() {
  const container = document.getElementById('inventoryAlertsList');
  if (!container) return;

  container.innerHTML = BarberState.inventoryAlerts.map(item => {
    const isDanger = item.status === 'danger';
    const badgeColor = isDanger ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return `
      <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
        <div>
          <p class="text-xs font-semibold text-slate-200">${item.name}</p>
          <p class="text-[11px] text-slate-400">Tối thiểu: ${item.minStock} &bull; Cần nhập gấp</p>
        </div>
        <span class="px-2 py-0.5 rounded text-xs font-bold border ${badgeColor}">
          Còn ${item.stock}
        </span>
      </div>
    `;
  }).join('');
}

// --- CHARTS INITIALIZATION (Chart.js) ---
let hourlyChartInstance = null;
let servicePieChartInstance = null;

function initCharts() {
  const hourlyCtx = document.getElementById('hourlyRevenueChart');
  if (hourlyCtx) {
    const gradient = hourlyCtx.getContext('2d').createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(229, 169, 60, 0.45)');
    gradient.addColorStop(1, 'rgba(229, 169, 60, 0.0)');

    hourlyChartInstance = new Chart(hourlyCtx, {
      type: 'line',
      data: {
        labels: ['8h-10h', '10h-12h', '12h-14h', '14h-16h', '16h-18h', '18h-20h', '20h-21h30'],
        datasets: [
          {
            label: 'Doanh thu dịch vụ (VNĐ)',
            data: [750000, 1850000, 1200000, 2450000, 1950000, 2800000, 1100000],
            borderColor: '#e5a93c',
            borderWidth: 3,
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            pointBackgroundColor: '#fcd34d',
            pointBorderColor: '#0b0f17',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: 'Bán lẻ sản phẩm (VNĐ)',
            data: [250000, 480000, 190000, 620000, 350000, 750000, 210000],
            borderColor: '#38bdf8',
            borderWidth: 2,
            borderDash: [4, 4],
            backgroundColor: 'transparent',
            tension: 0.35,
            pointRadius: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans', size: 11 } }
          },
          tooltip: {
            backgroundColor: '#182030',
            titleColor: '#f8fafc',
            bodyColor: '#e5a93c',
            borderColor: '#243046',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(36, 48, 70, 0.4)' },
            ticks: { color: '#64748b', font: { size: 10 } }
          },
          y: {
            grid: { color: 'rgba(36, 48, 70, 0.4)' },
            ticks: {
              color: '#64748b',
              font: { size: 10 },
              callback: value => (value / 1000) + 'k'
            }
          }
        }
      }
    });
  }

  const serviceCtx = document.getElementById('serviceCategoryChart');
  if (serviceCtx) {
    servicePieChartInstance = new Chart(serviceCtx, {
      type: 'doughnut',
      data: {
        labels: ['Cắt tóc & Tạo kiểu', 'Uốn & Nhuộm tóc', 'Gội & Massage thư giãn', 'Cạo râu khăn nóng', 'Bán lẻ sáp & dưỡng'],
        datasets: [{
          data: [42, 28, 14, 8, 8],
          backgroundColor: ['#e5a93c', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6'],
          borderColor: '#121824',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 11 },
              padding: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#182030',
            titleColor: '#f8fafc',
            bodyColor: '#e5a93c',
            borderColor: '#243046',
            borderWidth: 1,
            callbacks: {
              label: function (context) {
                return ` ${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }
    });
  }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const icon = type === 'success' ? 'fa-check-circle text-emerald-400' : (type === 'danger' ? 'fa-exclamation-circle text-red-400' : 'fa-info-circle text-amber-400');

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-slate-200 text-xs transform transition-all duration-300 translate-y-3 opacity-0`;
  toast.innerHTML = `
    <i class="fas ${icon} text-base"></i>
    <div class="flex-1 font-medium">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white ml-2"><i class="fas fa-times"></i></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-3', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-3');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- BOOKING MODAL ACTIONS ---
function openBookingModal(preselectedChairId = null) {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  const selectBarber = document.getElementById('modalSelectBarber');
  if (selectBarber) {
    selectBarber.innerHTML = BarberState.barbers.map(b => `<option value="${b.nickname}">${b.nickname} (${b.experience})</option>`).join('');
  }

  const selectChair = document.getElementById('modalSelectChair');
  if (selectChair) {
    selectChair.innerHTML = BarberState.chairs.map(c => `<option value="${c.code}" ${preselectedChairId === c.id ? 'selected' : ''}>${c.code} - ${c.barber}</option>`).join('');
  }

  document.getElementById('bookingCustomerName').value = '';
  document.getElementById('bookingCustomerPhone').value = '';
  document.getElementById('bookingNotes').value = '';
}

function openBookingModalForChair(chairId) {
  openBookingModal(chairId);
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function submitNewBooking(event) {
  event.preventDefault();
  const name = document.getElementById('bookingCustomerName').value.trim();
  const phone = document.getElementById('bookingCustomerPhone').value.trim();
  const service = document.getElementById('bookingService').value;
  const barber = document.getElementById('modalSelectBarber').value;
  const chair = document.getElementById('modalSelectChair').value;
  const time = document.getElementById('bookingTime').value;
  const isVip = document.getElementById('bookingIsVip').checked;

  if (!name || !phone) {
    showToast('Vui lòng nhập tên và số điện thoại khách hàng!', 'danger');
    return;
  }

  let price = 180000;
  if (service.includes('Đế Vương')) price = 280000;
  if (service.includes('Uốn')) price = 420000;
  if (service.includes('Nhuộm')) price = 500000;
  if (service.includes('Cạo Râu')) price = 120000;

  const newId = `BK-${Math.floor(1086 + Math.random() * 900)}`;

  const newAppointment = normalizeAppointmentRecord({
    id: newId,
    customer: name,
    phone: phone,
    isVip: isVip,
    service: service,
    barber: barber,
    time: time || '16:00 - 16:45',
    chair: chair,
    price: price,
    status: 'waiting',
    notes: document.getElementById('bookingNotes') ? document.getElementById('bookingNotes').value.trim() : 'Đặt lịch từ trang Tổng quan Salon'
  });

  BarberState.appointments.unshift(newAppointment);
  BarberState.stats.totalBookings++;
  BarberState.stats.waitingBookings++;

  // Update chair status to reserved if it was available
  const chairObj = BarberState.chairs.find(c => c.code === chair || c.code.toLowerCase().includes(chair.toLowerCase()));
  if (chairObj && chairObj.status === 'available') {
    chairObj.status = 'reserved';
    chairObj.customer = `${name} (${(time || '16:00').split(' ')[0]})`;
    chairObj.service = service;
  }

  syncCustomerToCRM(newAppointment);
  syncBookingToStationQueue(newAppointment);
  saveSharedState();

  updateStatsHeaders();
  renderChairsGrid();
  renderAppointmentsTable();
  closeBookingModal();
  showToast(`Đặt lịch thành công cho khách ${name} (${newId}) và đồng bộ sang Lịch hẹn, Khách hàng & Trạm ghế!`, 'success');
}

// --- APPOINTMENT STATUS CHANGERS ---
function checkinAppointment(id) {
  const app = BarberState.appointments.find(a => a.id === id);
  if (!app) return;

  app.status = 'serving';
  BarberState.stats.waitingBookings = Math.max(0, BarberState.stats.waitingBookings - 1);
  BarberState.stats.servingBookings++;

  const chairObj = BarberState.chairs.find(c => c.code.toLowerCase().includes(app.chair.toLowerCase()) || c.barber.includes(app.barber.split(' ')[0]));
  if (chairObj) {
    chairObj.status = 'busy';
    chairObj.customer = app.customer;
    chairObj.service = app.service;
    chairObj.remainingMin = 35;
    renderChairsGrid();
  }

  // Update barber status
  const barberObj = BarberState.barbers.find(b => app.barber.includes(b.nickname.split(' ')[0]));
  if (barberObj) {
    barberObj.status = 'busy';
    barberObj.currentCustomer = `${app.customer} (${app.service.split(' ')[0]})`;
    renderBarbersManagementView();
  }

  saveSharedState();
  updateStatsHeaders();
  renderAppointmentsTable();
  showToast(`Đã check-in khách ${app.customer} vào ${app.chair}!`, 'success');
}

function finishAppointment(id) {
  const app = BarberState.appointments.find(a => a.id === id);
  if (!app) return;

  app.status = 'done';
  BarberState.stats.servingBookings = Math.max(0, BarberState.stats.servingBookings - 1);
  BarberState.stats.completedBookings++;
  BarberState.stats.todayRevenue += app.price;

  const chairObj = BarberState.chairs.find(c => c.customer === app.customer || c.code.toLowerCase().includes((app.chair || '').toLowerCase()));
  if (chairObj) {
    chairObj.status = 'available';
    chairObj.customer = '--';
    chairObj.service = 'Sẵn sàng đón khách';
    chairObj.remainingMin = 0;
    renderChairsGrid();
  }

  const barberObj = BarberState.barbers.find(b => app.barber.includes(b.nickname.split(' ')[0]));
  if (barberObj) {
    barberObj.cuts = (barberObj.cuts || 0) + 1;
    barberObj.todayCuts = barberObj.cuts;
    barberObj.revenue = (barberObj.revenue || 0) + app.price;
    barberObj.todayRevenue = barberObj.revenue;
    barberObj.status = 'available';
    barberObj.currentCustomer = '--';
    renderBarbersList();
    renderBarbersManagementView();
  }

  syncCompletedBookingToInvoices(app);
  saveSharedState();
  updateStatsHeaders();
  renderAppointmentsTable();
  showToast(`Đã hoàn tất thanh toán dịch vụ ${formatCurrency(app.price)} và ghi nhận vào Báo cáo!`, 'success');
}

function cancelAppointment(id) {
  const app = BarberState.appointments.find(a => a.id === id);
  if (!app) return;

  if (confirm(`Bạn có chắc chắn muốn hủy lịch hẹn của khách ${app.customer} (${app.id})?`)) {
    app.status = 'cancelled';
    BarberState.stats.cancelledBookings++;
    if (BarberState.stats.waitingBookings > 0) BarberState.stats.waitingBookings--;

    saveSharedState();
    updateStatsHeaders();
    renderAppointmentsTable();
    showToast(`Đã hủy lịch hẹn ${app.id}!`, 'info');
  }
}

function toggleChairReady(chairId) {
  const chair = BarberState.chairs.find(c => c.id === chairId);
  if (!chair) return;

  chair.status = 'available';
  chair.service = 'Sẵn sàng đón khách';
  saveSharedState();
  renderChairsGrid();
  showToast(`${chair.code} đã sẵn sàng tiếp khách!`, 'success');
}

function showChairDetails(chairId) {
  const chair = BarberState.chairs.find(c => c.id === chairId);
  if (!chair) return;

  showToast(`${chair.code}: Đang phục vụ khách ${chair.customer} (${chair.service})`, 'info');
}

function updateStatsHeaders() {
  const revEl = document.getElementById('kpiTodayRevenue');
  const countEl = document.getElementById('kpiTodayCustomers');
  if (revEl) revEl.textContent = formatCurrency(BarberState.stats.todayRevenue);
  if (countEl) countEl.textContent = BarberState.stats.completedBookings + ' / ' + BarberState.stats.totalBookings;
}

// --- INVOICE MODAL ---
function viewInvoice(id) {
  const app = BarberState.appointments.find(a => a.id === id);
  if (!app) return;

  const modal = document.getElementById('invoiceModal');
  const content = document.getElementById('invoiceModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div id="printableInvoice" class="p-6 bg-slate-900 text-slate-100 rounded-2xl border border-slate-700">
      <div class="text-center pb-4 border-b border-slate-700">
        <div class="inline-flex items-center justify-center gap-2 mb-2">
          <i class="fas fa-scissors text-amber-400 text-xl"></i>
          <h3 class="text-xl font-black tracking-wider text-amber-400 vintage-font">THE GENTLEMAN BARBER</h3>
        </div>
        <p class="text-xs text-slate-400">Số 88 Phố Cổ, Hoàn Kiếm, Hà Nội &bull; Hotline: 1900 8888</p>
        <p class="text-[11px] text-slate-500 mt-0.5">PHIẾU THANH TOÁN DỊCH VỤ / RECEIPT</p>
      </div>

      <div class="py-4 space-y-2 text-xs border-b border-slate-700">
        <div class="flex justify-between">
          <span class="text-slate-400">Mã hóa đơn:</span>
          <span class="font-mono font-bold text-amber-300">${app.id}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Thời gian:</span>
          <span>${app.time} (Hôm nay)</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Khách hàng:</span>
          <span class="font-semibold text-white">${app.customer} ${app.isVip ? '<span class="text-amber-400 font-bold">(VIP Diamond)</span>' : ''}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Số điện thoại:</span>
          <span>${app.phone}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Thợ phục vụ:</span>
          <span class="font-semibold text-amber-300">${app.barber}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-slate-400">Vị trí:</span>
          <span>${app.chair}</span>
        </div>
      </div>

      <div class="py-4 border-b border-slate-700">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-slate-400 border-b border-slate-800 pb-2">
              <th class="text-left font-normal pb-2">Dịch vụ</th>
              <th class="text-center font-normal pb-2">SL</th>
              <th class="text-right font-normal pb-2">Đơn giá</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800">
            <tr>
              <td class="py-2.5 font-medium text-white">${app.service}</td>
              <td class="text-center py-2.5 text-slate-400">1</td>
              <td class="text-right py-2.5 text-amber-400 font-semibold">${formatCurrency(app.price)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pt-4 space-y-2 text-xs">
        <div class="flex justify-between text-slate-400">
          <span>Tạm tính:</span>
          <span>${formatCurrency(app.price)}</span>
        </div>
        <div class="flex justify-between text-slate-400">
          <span>Ưu đãi VIP / Giảm giá:</span>
          <span class="text-emerald-400">0 đ</span>
        </div>
        <div class="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-700">
          <span>TỔNG THANH TOÁN:</span>
          <span class="text-amber-400 text-lg">${formatCurrency(app.price)}</span>
        </div>
      </div>

      <div class="mt-6 text-center text-[11px] text-slate-400">
        <p>Cảm ơn quý khách đã tin tưởng trải nghiệm tại The Gentleman Barber!</p>
        <p class="text-[10px] text-slate-500 mt-1">Wifi: GentlemanBarber_Guest &bull; Pass: gentleman6868</p>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeInvoiceModal() {
  const modal = document.getElementById('invoiceModal');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function printCurrentInvoice() {
  window.print();
}

// --- DOM READY INITIALIZATIONS & EVENT BINDINGS ---
document.addEventListener('DOMContentLoaded', () => {
  loadSharedState();
  initRealtimeClock();
  updateDynamicFilterDropdowns();
  renderChairsGrid();
  renderAppointmentsTable();
  renderBarbersList();
  renderInventoryAlerts();
  initCharts();
  updateStatsHeaders();

  // Live sync across tabs when localStorage changes
  window.addEventListener('storage', () => {
    loadSharedState();
    updateDynamicFilterDropdowns();
    renderChairsGrid();
    renderAppointmentsTable();
    renderBarbersList();
    renderBarbersManagementView();
    updateStatsHeaders();
  });

  // Tab filter clicks for appointments
  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab-btn').forEach(b => {
        b.classList.remove('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
        b.classList.add('text-slate-400', 'border-transparent');
      });

      btn.classList.add('bg-amber-500/20', 'text-amber-400', 'border-amber-500/40');
      btn.classList.remove('text-slate-400', 'border-transparent');

      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderAppointmentsTable();
    });
  });

  // Search input live handler for appointments
  const searchInput = document.getElementById('appointmentSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderAppointmentsTable();
    });
  }

  // Barber filter dropdown in appointments
  const barberFilterSelect = document.getElementById('barberFilterSelect');
  if (barberFilterSelect) {
    barberFilterSelect.addEventListener('change', (e) => {
      currentBarberFilter = e.target.value;
      renderAppointmentsTable();
    });
  }

  // Barber management search input
  const barberSearchInput = document.getElementById('barberSearchInput');
  if (barberSearchInput) {
    barberSearchInput.addEventListener('input', (e) => {
      barberSearchQuery = e.target.value;
      renderBarbersManagementView();
    });
  }

  // Barber level filter
  const barberLevelFilterSelect = document.getElementById('barberLevelFilterSelect');
  if (barberLevelFilterSelect) {
    barberLevelFilterSelect.addEventListener('change', (e) => {
      barberLevelFilter = e.target.value;
      renderBarbersManagementView();
    });
  }

  // Barber status filter
  const barberStatusFilterSelect = document.getElementById('barberStatusFilterSelect');
  if (barberStatusFilterSelect) {
    barberStatusFilterSelect.addEventListener('change', (e) => {
      barberStatusFilter = e.target.value;
      renderBarbersManagementView();
    });
  }

  // Barber sort by
  const barberSortSelect = document.getElementById('barberSortSelect');
  if (barberSortSelect) {
    barberSortSelect.addEventListener('change', (e) => {
      barberSortBy = e.target.value;
      renderBarbersManagementView();
    });
  }

  // Mobile sidebar toggle
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('mainSidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
    });
  }

  // Notification dropdown toggle
  const notifBtn = document.getElementById('notifDropdownBtn');
  const notifMenu = document.getElementById('notifDropdownMenu');
  if (notifBtn && notifMenu) {
    notifBtn.addEventListener('click', () => {
      notifMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!notifBtn.contains(e.target) && !notifMenu.contains(e.target)) {
        notifMenu.classList.add('hidden');
      }
    });
  }
});
