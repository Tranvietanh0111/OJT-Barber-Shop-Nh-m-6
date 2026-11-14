// Phụ trách: Trần Văn Thắng
import React, { useState } from "react";
import { useLiveClock, useAdminToast } from "./AdminSidebar";

const DEFAULT_SETTINGS = {
  salonName: "ROYAL BARBER CLUB - FLAGSHIP",
  salonSlogan: "Nghệ Thuật Tóc Quý Ông & Grooming Đẳng Cấp",
  salonHotline: "0909.888.999",
  salonEmail: "booking@royalbarber.vn",
  salonAddress: "88 Phố Cổ, Quận Hoàn Kiếm, TP. Hà Nội",
  salonOpenTime: "08:30",
  salonCloseTime: "21:30",
  salonDays: "Mở cửa tất cả các ngày (Thứ 2 - Chủ Nhật)",
  slotDuration: "30",
  holdMinutes: "15",
  uvSterilizeMins: "5",
  autoAssignChair: true,
  zaloReminder: true,
  overtimeAlert: true,
  bankName: "Techcombank (TCB)",
  bankAccount: "1903 8888 9999 88",
  bankOwner: "HOANG VAN NAM - ROYAL BARBER",
  vatPercent: "0",
  vipGoldDiscount: "10",
  vipDiamondDiscount: "15",
  acceptCard: true,
  autoShowQr: true,
  printerIp: "192.168.1.200 : 9100 (USB / LAN)",
  paperSize: "K80 (80mm - Chuẩn POS Salon)",
  receiptHeader: "ROYAL BARBER CLUB",
  receiptWifi: "RoyalBarber_VIP  |  Pass: 88889999",
  receiptFooter: "Cảm ơn Quý khách & Hẹn gặp lại!",
  autoPrintReceipt: true,
};

export default function SystemSettings({
  onToggleSidebar,
  externalShowToast,
}) {
  const { timeStr, dateStr } = useLiveClock();
  const { showToast: internalShowToast } = useAdminToast();
  const showToast = externalShowToast || internalShowToast;

  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("royalBarberSettings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const saveAllSettings = () => {
    try {
      localStorage.setItem("royalBarberSettings", JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
    showToast(
      "Đã lưu cấu hình!",
      "Mọi thiết lập hệ thống Royal Barber POS đã được đồng bộ thành công."
    );
  };

  const resetDefaults = () => {
    try {
      localStorage.removeItem("royalBarberSettings");
    } catch {
      // ignore
    }
    setSettings(DEFAULT_SETTINGS);
    showToast(
      "Đã khôi phục mặc định!",
      "Các thông số đã trở về cấu hình tiêu chuẩn của Salon.",
      "warning"
    );
  };

  const testPrintK80 = () => {
    showToast(
      "Đang gửi lệnh in K80...",
      `Đã kết nối máy in ${settings.printerIp} và mở trình in mẫu`
    );
    setTimeout(() => window.print(), 400);
  };

  const downloadBackupJSON = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      system: "Royal Barber POS v3.5",
      branch: settings.salonName,
      hotline: settings.salonHotline,
      address: settings.salonAddress,
      stats: {
        barbers: 8,
        services: 18,
        skus: 12,
        monthlyRevenue: 128450000,
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Royal_Barber_POS_Backup_2026.json";
    a.click();
    URL.revokeObjectURL(url);
    showToast(
      "Đã tải xuống bản sao lưu!",
      "File Royal_Barber_POS_Backup_2026.json đã được lưu về máy."
    );
  };

  const updateMasterPassword = () => {
    if (!newPass || newPass.length < 6) {
      showToast(
        "Mật khẩu quá ngắn!",
        "Vui lòng nhập mật khẩu tối thiểu 6 ký tự.",
        "warning"
      );
      return;
    }
    if (newPass !== confirmPass) {
      showToast(
        "Mật khẩu không khớp!",
        "Xác nhận mật khẩu mới chưa trùng khớp.",
        "warning"
      );
      return;
    }
    setNewPass("");
    setConfirmPass("");
    showToast(
      "Đổi mật khẩu thành công!",
      "Mật khẩu Quản trị viên Master Hoàng đã được cập nhật."
    );
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-amber-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
    </label>
  );

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
                Cài Đặt &amp; Cấu Hình Hệ Thống POS
              </h2>
              <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                v3.5 Flagship
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
            onClick={resetDefaults}
            className="hidden sm:flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-all"
          >
            <i className="fa-solid fa-rotate-left text-zinc-400"></i>
            <span>Khôi phục mặc định</span>
          </button>

          <button
            onClick={saveAllSettings}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95"
          >
            <i className="fa-solid fa-floppy-disk"></i>
            <span>Lưu Tất Cả Cấu Hình</span>
          </button>
        </div>
      </header>

      {/* SCROLLABLE SETTINGS BODY */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll">
        {/* TOP SETTINGS TABS BAR */}
        <section className="bg-barber-card border border-barber-border rounded-2xl p-3 flex flex-wrap items-center gap-2">
          {[
            {
              key: "general",
              label: "1. Thương Hiệu & Salon",
              icon: "fa-solid fa-store",
            },
            {
              key: "booking",
              label: "2. Lịch Hẹn & Ghế Cắt",
              icon: "fa-regular fa-calendar-check",
            },
            {
              key: "payment",
              label: "3. Thanh Toán & VietQR",
              icon: "fa-solid fa-qrcode",
            },
            {
              key: "printer",
              label: "4. Máy In Hóa Đơn K80",
              icon: "fa-solid fa-print",
            },
            {
              key: "security",
              label: "5. Sao Lưu & Bảo Mật",
              icon: "fa-solid fa-shield-halved",
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                activeTab === t.key
                  ? "bg-amber-500 text-black font-bold border-amber-500"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border-zinc-800"
              }`}
            >
              <i className={t.icon}></i> {t.label}
            </button>
          ))}
        </section>

        {/* TAB 1: THƯƠNG HIỆU & THÔNG TIN SALON */}
        {activeTab === "general" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-6 space-y-5">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="font-bold text-white text-base">
                  Thông Tin Thương Hiệu &amp; Chi Nhánh Flagship
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Hiển thị trên website đặt lịch, tin nhắn Zalo xác nhận và đầu
                  hóa đơn POS
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tên Thương Hiệu Salon *
                  </label>
                  <input
                    type="text"
                    value={settings.salonName}
                    onChange={(e) => handleChange("salonName", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Slogan / Khẩu Hiệu
                  </label>
                  <input
                    type="text"
                    value={settings.salonSlogan}
                    onChange={(e) =>
                      handleChange("salonSlogan", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Hotline Đặt Lịch *
                  </label>
                  <input
                    type="tel"
                    value={settings.salonHotline}
                    onChange={(e) =>
                      handleChange("salonHotline", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Email Quản Trị
                  </label>
                  <input
                    type="email"
                    value={settings.salonEmail}
                    onChange={(e) => handleChange("salonEmail", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Địa Chỉ Chi Nhánh Chính *
                  </label>
                  <input
                    type="text"
                    value={settings.salonAddress}
                    onChange={(e) =>
                      handleChange("salonAddress", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-5">
                <h4 className="font-bold text-white text-sm mb-3">
                  Khung Giờ Mở Cửa Đón Khách
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Giờ Mở Cửa Sáng
                    </label>
                    <input
                      type="time"
                      value={settings.salonOpenTime}
                      onChange={(e) =>
                        handleChange("salonOpenTime", e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Giờ Nhận Khách Cuối
                    </label>
                    <input
                      type="time"
                      value={settings.salonCloseTime}
                      onChange={(e) =>
                        handleChange("salonCloseTime", e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Lịch Hoạt Động Tuần
                    </label>
                    <select
                      value={settings.salonDays}
                      onChange={(e) =>
                        handleChange("salonDays", e.target.value)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option>
                        Mở cửa tất cả các ngày (Thứ 2 - Chủ Nhật)
                      </option>
                      <option>Nghỉ chiều Thứ Hai đầu tháng</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Multi-Branch Overview */}
            <div className="space-y-6">
              <div className="bg-barber-card border border-barber-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white text-sm">
                    Danh Sách Chi Nhánh Hệ Thống
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                    2 Cơ sở
                  </span>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/40">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400">
                        CN 01: 88 Phố Cổ, Hoàn Kiếm
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        Đang chọn
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] mt-1">
                      8 Ghế cắt &amp; Spa • 8 Thợ Barber • POS Online
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-200">
                        CN 02: 126 Nguyễn Huệ, Quận 1
                      </span>
                      <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                        Đồng bộ Cloud
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] mt-1">
                      10 Ghế cắt &amp; Spa • 12 Thợ Barber • POS Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: QUY TẮC ĐẶT LỊCH HẸN & ĐIỀU PHỐI GHẾ */}
        {activeTab === "booking" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-zinc-800 pb-3">
                Tham Số Khung Giờ &amp; Giữ Chỗ Đặt Lịch
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Độ chia khung giờ (Slot Interval)
                  </label>
                  <select
                    value={settings.slotDuration}
                    onChange={(e) =>
                      handleChange("slotDuration", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="15">Mỗi 15 phút / khung giờ</option>
                    <option value="30">Mỗi 30 phút / khung giờ (Chuẩn)</option>
                    <option value="45">Mỗi 45 phút / khung giờ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Thời gian giữ ghế tối đa khi khách trễ
                  </label>
                  <select
                    value={settings.holdMinutes}
                    onChange={(e) =>
                      handleChange("holdMinutes", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="10">10 phút (Tự động nhường ghế)</option>
                    <option value="15">15 phút (Tiêu chuẩn VIP)</option>
                    <option value="20">20 phút</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Thời gian khử trùng tia UV giữa 2 khách
                  </label>
                  <select
                    value={settings.uvSterilizeMins}
                    onChange={(e) =>
                      handleChange("uvSterilizeMins", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="5">5 phút vệ sinh &amp; tia UV-C</option>
                    <option value="10">10 phút vệ sinh kỹ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số khách đặt trùng tối đa / khung giờ
                  </label>
                  <input
                    type="number"
                    defaultValue={6}
                    min="1"
                    max="10"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-zinc-800 pb-3">
                Tự Động Hóa Nhắc Lịch &amp; Điều Phối
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div>
                    <p className="font-bold text-white">
                      Tự động gợi ý Barber trống cho khách vãng lai
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Ưu tiên thợ có doanh số thấp hơn trong ca để chia đều lượt
                      khách
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={settings.autoAssignChair}
                    onChange={(v) => handleChange("autoAssignChair", v)}
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div>
                    <p className="font-bold text-white">
                      Gửi tin nhắn Zalo ZNS nhắc lịch trước 30 phút
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Giảm 85% tỷ lệ khách quên lịch hẹn hoặc hủy sát giờ
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={settings.zaloReminder}
                    onChange={(v) => handleChange("zaloReminder", v)}
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800">
                  <div>
                    <p className="font-bold text-white">
                      Bật âm thanh chuông báo khi ca cắt quá giờ dự kiến
                    </p>
                    <p className="text-[11px] text-zinc-400">
                      Nhắc nhở lễ tân sắp xếp ghế cho khách hẹn kế tiếp
                    </p>
                  </div>
                  <ToggleSwitch
                    checked={settings.overtimeAlert}
                    onChange={(v) => handleChange("overtimeAlert", v)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: THANH TOÁN, VIETQR & THUẾ */}
        {activeTab === "payment" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-zinc-800 pb-3">
                Tài Khoản Ngân Hàng Nhận Chuyển Khoản VietQR Động
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ngân Hàng Thụ Hưởng *
                  </label>
                  <select
                    value={settings.bankName}
                    onChange={(e) => handleChange("bankName", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Techcombank (TCB)">
                      Techcombank - Ngân hàng Kỹ Thương
                    </option>
                    <option value="Vietcombank (VCB)">
                      Vietcombank - Ngoại Thương VN
                    </option>
                    <option value="MBBank (MB)">MBBank - Quân Đội</option>
                    <option value="ACB">ACB - Ngân hàng Á Châu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Số Tài Khoản Nhận Tiền *
                  </label>
                  <input
                    type="text"
                    value={settings.bankAccount}
                    onChange={(e) =>
                      handleChange("bankAccount", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tên Chủ Tài Khoản (In Hoa) *
                  </label>
                  <input
                    type="text"
                    value={settings.bankOwner}
                    onChange={(e) => handleChange("bankOwner", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Thuế GTGT (VAT %) trên hóa đơn
                  </label>
                  <select
                    value={settings.vatPercent}
                    onChange={(e) => handleChange("vatPercent", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="0">0% (Giá dịch vụ đã bao gồm thuế)</option>
                    <option value="8">8% VAT</option>
                    <option value="10">10% VAT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ưu đãi giảm giá thẻ VIP Gold (%)
                  </label>
                  <input
                    type="number"
                    value={settings.vipGoldDiscount}
                    onChange={(e) =>
                      handleChange("vipGoldDiscount", e.target.value)
                    }
                    min="0"
                    max="50"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Ưu đãi giảm giá thẻ VIP Diamond (%)
                  </label>
                  <input
                    type="number"
                    value={settings.vipDiamondDiscount}
                    onChange={(e) =>
                      handleChange("vipDiamondDiscount", e.target.value)
                    }
                    min="0"
                    max="50"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* VietQR Live Preview Card */}
            <div className="bg-barber-card border border-amber-500/40 rounded-2xl p-5 flex flex-col items-center justify-between text-center">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-400">
                  Màn Hình Phụ Quầy Thu Ngân
                </span>
                <h4 className="font-bold text-white text-sm mt-2">
                  Mã Quét Thanh Toán VietQR
                </h4>
              </div>

              <div className="my-4 p-4 bg-white rounded-2xl shadow-lg">
                <i className="fa-solid fa-qrcode text-7xl text-zinc-900"></i>
              </div>

              <div className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-3 text-xs space-y-1">
                <p className="text-amber-400 font-bold">{settings.bankName}</p>
                <p className="font-mono font-bold text-white text-sm">
                  {settings.bankAccount}
                </p>
                <p className="text-[11px] text-zinc-400">
                  {settings.bankOwner}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MÁY IN HÓA ĐƠN NHIỆT K80 & MẪU BILL */}
        {activeTab === "printer" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="font-bold text-white text-base">
                    Cấu Hình Máy In Hóa Đơn Nhiệt POS (K80 / K57)
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Tùy chỉnh thông tin hiển thị trên phiếu thanh toán in cho
                    khách hàng
                  </p>
                </div>
                <button
                  onClick={testPrintK80}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all"
                >
                  <i className="fa-solid fa-print mr-1.5"></i> In Thử Bill Mẫu
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Cổng Kết Nối Máy In Nhiệt (LAN / USB)
                  </label>
                  <input
                    type="text"
                    value={settings.printerIp}
                    onChange={(e) => handleChange("printerIp", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm font-mono text-emerald-400 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Khổ Giấy In Nhiệt
                  </label>
                  <select
                    value={settings.paperSize}
                    onChange={(e) => handleChange("paperSize", e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="K80 (80mm - Chuẩn POS Salon)">
                      Khổ K80 (80mm - Tiêu chuẩn khuyên dùng)
                    </option>
                    <option value="K57 (57mm - Máy POS cầm tay)">
                      Khổ K57 (57mm - Nhỏ gọn)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Tiêu Đề Đầu Hóa Đơn
                  </label>
                  <input
                    type="text"
                    value={settings.receiptHeader}
                    onChange={(e) =>
                      handleChange("receiptHeader", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Thông Tin Wifi Miễn Phí Trên Bill
                  </label>
                  <input
                    type="text"
                    value={settings.receiptWifi}
                    onChange={(e) =>
                      handleChange("receiptWifi", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Lời Cảm Ơn Cuối Hóa Đơn
                  </label>
                  <input
                    type="text"
                    value={settings.receiptFooter}
                    onChange={(e) =>
                      handleChange("receiptFooter", e.target.value)
                    }
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Live Thermal K80 Receipt Preview */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-3">
                Xem Trước Hóa Đơn Nhiệt K80
              </span>

              <div className="w-full max-w-[290px] bg-white text-zinc-900 rounded-xl p-4 shadow-xl font-mono text-[11px] space-y-2.5">
                <div className="text-center border-b border-dashed border-zinc-400 pb-2">
                  <p className="font-bold text-sm tracking-wider">
                    {settings.receiptHeader}
                  </p>
                  <p className="text-[10px] text-zinc-600">
                    88 Phố Cổ, Hoàn Kiếm, HN
                  </p>
                  <p className="text-[10px] text-zinc-600">
                    Hotline: 0909.888.999
                  </p>
                </div>

                <div className="space-y-0.5 text-[10px] border-b border-dashed border-zinc-400 pb-2">
                  <div className="flex justify-between">
                    <span>HĐ: #INV-8801</span>
                    <span>11/11/2026 15:20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Khách: Anh Tuấn VIP</span>
                    <span>Thợ: Master Hoàng</span>
                  </div>
                </div>

                <div className="space-y-1 border-b border-dashed border-zinc-400 pb-2">
                  <div className="flex justify-between font-bold">
                    <span>1x Combo Đế Vương 7 bước</span>
                    <span>350.000</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>1x Sáp Reuzel Blue</span>
                    <span>420.000</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-xs pt-1">
                  <span>TỔNG THANH TOÁN:</span>
                  <span>770.000 ₫</span>
                </div>

                <div className="text-center pt-2 border-t border-dashed border-zinc-400 space-y-1 text-[10px] text-zinc-600">
                  <p>Wifi: {settings.receiptWifi}</p>
                  <p className="font-bold text-zinc-900">
                    {settings.receiptFooter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SAO LƯU DỮ LIỆU & BẢO MẬT TÀI KHOẢN */}
        {activeTab === "security" && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-zinc-800 pb-3">
                Sao Lưu Cơ Sở Dữ Liệu Salon (JSON Backup)
              </h3>
              <p className="text-xs text-zinc-400">
                Xuất toàn bộ dữ liệu Lịch đặt hẹn, Danh sách Barber, Bảng giá
                dịch vụ, Tồn kho Sáp và Cấu hình POS ra file dự phòng an toàn.
              </p>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Bản sao lưu tự động gần nhất:</span>
                  <span className="text-emerald-400 font-semibold">
                    Hôm nay, 15:00 (Cloud Sync)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Dung lượng dữ liệu POS:</span>
                  <span className="text-zinc-200 font-mono">1.42 MB</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={downloadBackupJSON}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all"
                >
                  <i className="fa-solid fa-download mr-1.5"></i> Tải File Sao
                  Lưu (.JSON)
                </button>
                <button
                  onClick={() =>
                    showToast(
                      "Đã đồng bộ Cloud!",
                      "Toàn bộ dữ liệu POS đã được sao lưu lên máy chủ Royal Barber."
                    )
                  }
                  className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs transition-all"
                >
                  <i className="fa-solid fa-cloud-arrow-up mr-1.5 text-sky-400"></i>{" "}
                  Đồng Bộ Lên Cloud Ngay
                </button>
              </div>
            </div>

            <div className="bg-barber-card border border-barber-border rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-base border-b border-zinc-800 pb-3">
                Đổi Mật Khẩu Quản Trị Viên Trưởng (Master Hoàng)
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Mật khẩu quản trị mới
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <button
                  onClick={updateMasterPassword}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all"
                >
                  <i className="fa-solid fa-key mr-1.5"></i> Cập Nhật Mật Khẩu
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

