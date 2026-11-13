// Phụ trách: Trần Văn Thắng
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./admin.css";

export const formatVND = (amount) =>
  Number(amount || 0).toLocaleString("vi-VN") + " ₫";

export const useLiveClock = () => {
  const [timeStr, setTimeStr] = useState("15:24:38");
  const [dateStr, setDateStr] = useState("Thứ Tư, 11/11/2026");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("vi-VN", { hour12: false }));
      const days = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
      ];
      const dayName = days[now.getDay()];
      const dd = String(now.getDate()).padStart(2, "0");
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const yyyy = now.getFullYear();
      setDateStr(`${dayName}, ${dd}/${mm}/${yyyy}`);
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return { timeStr, dateStr };
};

export const useAdminToast = () => {
  const [toast, setToast] = useState({
    visible: false,
    title: "Thành công",
    message: "Đã cập nhật dữ liệu hệ thống!",
    type: "success",
  });

  const showToast = useCallback((title, message, type = "success") => {
    setToast({ visible: true, title, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  }, []);

  return { toast, showToast };
};

export function AdminToast({ toast }) {
  if (!toast) return null;
  let iconClass = "fa-solid fa-check";
  let bgClass = "bg-emerald-500/20 text-emerald-400";
  if (toast.type === "warning") {
    iconClass = "fa-solid fa-triangle-exclamation";
    bgClass = "bg-amber-500/20 text-amber-400";
  } else if (toast.type === "error") {
    iconClass = "fa-solid fa-xmark";
    bgClass = "bg-rose-500/20 text-rose-400";
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-[60] transform transition-all duration-300 ${
        toast.visible
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-barber-card border border-amber-500/40 rounded-xl p-4 shadow-2xl flex items-center gap-3.5 min-w-[320px]">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bgClass}`}
        >
          <i className={iconClass}></i>
        </div>
        <div className="flex-1">
          <h5 className="text-xs font-bold text-white">{toast.title}</h5>
          <p className="text-[11px] text-zinc-400 mt-0.5">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ activeKey, children, toast }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [barberBadgeCount, setBarberBadgeCount] = useState(8);
  const [bookingBadgeCount, setBookingBadgeCount] = useState(48);
  const location = useLocation();

  useEffect(() => {
    const refreshBadges = () => {
      try {
        const b = JSON.parse(localStorage.getItem("gb_sync_barbers_v1") || "null");
        if (Array.isArray(b) && b.length > 0) setBarberBadgeCount(b.length);
        const a = JSON.parse(localStorage.getItem("gb_sync_appointments_v1") || "null");
        if (Array.isArray(a) && a.length > 0) setBookingBadgeCount(a.length);
      } catch (e) {}
    };
    refreshBadges();
    window.addEventListener("storage", refreshBadges);
    window.addEventListener("gb-admin-sync", refreshBadges);
    return () => {
      window.removeEventListener("storage", refreshBadges);
      window.removeEventListener("gb-admin-sync", refreshBadges);
    };
  }, [location.pathname]);

  const currentKey =
    activeKey ||
    (location.pathname === "/admin/appointments"
      ? "appointments"
      : location.pathname === "/admin/barbers"
      ? "barbers"
      : location.pathname === "/admin/services"
      ? "services"
      : location.pathname === "/admin/users"
      ? "users"
      : location.pathname === "/admin/invoices"
      ? "invoices"
      : location.pathname === "/admin/revenue"
      ? "reports"
      : location.hash === "#stations"
      ? "stations"
      : location.hash === "#inventory"
      ? "inventory"
      : location.hash === "#settings"
      ? "settings"
      : "overview");

  const navItems = [
    {
      section: "Điều Hành Hằng Ngày",
      items: [
        {
          key: "overview",
          label: "Tổng quan Salon",
          to: "/admin",
          icon: "fa-solid fa-chart-pie",
          badge: "Live",
          badgeClass:
            "bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold",
        },
        {
          key: "appointments",
          label: "Lịch đặt hẹn",
          to: "/admin/appointments",
          icon: "fa-regular fa-calendar-check",
          badge: String(bookingBadgeCount),
          badgeClass:
            "bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-semibold",
        },
        {
          key: "stations",
          label: "Sơ đồ ghế cắt",
          to: "/admin#stations",
          icon: "fa-solid fa-chair",
          badge: "6/8 bận",
          badgeClass:
            "bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-semibold",
        },
        {
          key: "barbers",
          label: "Đội ngũ Barber",
          to: "/admin/barbers",
          icon: "fa-solid fa-user-tie",
          badge: String(barberBadgeCount),
          badgeClass: "text-xs text-zinc-500",
        },
        {
          key: "services",
          label: "Bảng giá & Dịch vụ",
          to: "/admin/services",
          icon: "fa-solid fa-spray-can-sparkles",
          badge: "18",
          badgeClass: "text-xs text-zinc-500",
        },
      ],
    },
    {
      section: "Quản Trị & Tài Chính",
      items: [
        {
          key: "users",
          label: "Quản lý Người dùng",
          to: "/admin/users",
          icon: "fa-solid fa-users-gear",
          badge: "CRM",
          badgeClass:
            "bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-bold",
        },
        {
          key: "inventory",
          label: "Kho sáp & Mỹ phẩm",
          to: "/admin#inventory",
          icon: "fa-solid fa-boxes-stacked",
          badge: "! 3",
          badgeClass:
            "bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded-full font-bold",
        },
        {
          key: "invoices",
          label: "Hóa đơn & POS",
          to: "/admin/invoices",
          icon: "fa-solid fa-file-invoice-dollar",
          badge: "POS",
          badgeClass:
            "bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold",
        },
        {
          key: "reports",
          label: "Báo cáo doanh thu",
          to: "/admin/revenue",
          icon: "fa-solid fa-sack-dollar",
        },
        {
          key: "settings",
          label: "Cài đặt hệ thống",
          to: "/admin#settings",
          icon: "fa-solid fa-sliders",
        },
      ],
    },
  ];

  return (
    <div className="bg-barber-dark text-zinc-100 font-sans antialiased selection:bg-amber-500 selection:text-black overflow-hidden h-screen flex w-full fixed inset-0 z-40">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`w-72 bg-barber-surface border-r border-barber-border flex flex-col justify-between shrink-0 z-50 transition-transform duration-300 fixed lg:static inset-y-0 left-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Top Brand Logo */}
        <div>
          <div className="p-6 flex items-center gap-3.5 border-b border-barber-border relative overflow-hidden">
            <div className="w-2 h-full absolute left-0 top-0 barber-pole opacity-90"></div>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-black shadow-lg shadow-amber-500/20 shrink-0">
              <i className="fa-solid fa-scissors text-xl transform -rotate-45"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-lg tracking-wider text-white">
                  ROYAL BARBER
                </h1>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">
                  VIP
                </span>
              </div>
              <p className="text-xs text-zinc-400 tracking-wide">
                Salon &amp; Grooming POS
              </p>
            </div>
          </div>

          {/* Branch Quick Badge */}
          <div className="px-4 pt-4">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 status-dot-pulse"></span>
                <div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Chi nhánh 01 (Flagship)
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    88 Phố Cổ, Hoàn Kiếm, HN
                  </p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-down text-xs text-zinc-500"></i>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-250px)] custom-scroll">
            {navItems.map((group, gIdx) => (
              <React.Fragment key={group.section}>
                <p
                  className={`px-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 ${
                    gIdx > 0 ? "pt-4 pb-1" : "pb-1"
                  }`}
                >
                  {group.section}
                </p>
                {group.items.map((item) => {
                  const isActive = currentKey === item.key;
                  return (
                    <Link
                      key={item.key}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`nav-link flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "active text-amber-400"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <i className={`${item.icon} w-5 text-center`}></i>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className={
                            isActive && item.key !== "inventory"
                              ? "bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold"
                              : item.badgeClass
                          }
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Bottom Admin Profile */}
        <div className="p-4 border-t border-barber-border bg-zinc-950/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Admin Avatar"
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/50"
              />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Master Hoàng
                </h4>
                <p className="text-xs text-amber-400 flex items-center gap-1">
                  <i className="fa-solid fa-crown text-[10px]"></i> Quản lý
                  Trưởng
                </p>
              </div>
            </div>
            <Link
              to="/"
              title="Về trang khách hàng"
              className="w-8 h-8 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors flex items-center justify-center"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </Link>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-barber-dark">
        {typeof children === "function"
          ? children({ toggleSidebar: () => setSidebarOpen((v) => !v) })
          : React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child, {
                    onToggleSidebar: () => setSidebarOpen((v) => !v),
                  })
                : child
            )}
      </div>

      <AdminToast toast={toast} />
    </div>
  );
}

