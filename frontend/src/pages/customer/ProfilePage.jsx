// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /profile (Hồ sơ khách hàng, đặc quyền VIP & quản lý tài khoản)
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const demoAccounts = [
    {
      id: "cli-1",
      name: "Anh Hoàng Nam",
      phone: "0904.123.888",
      email: "hoangnam.barber@gmail.com",
      tier: "VIP",
      cutCount: 12,
      totalSpent: "2.850.000 đ",
      favBarber: "Tuấn Master",
      reviewsSent: 10,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=240&auto=format&fit=crop&q=80",
      birthday: "1992-08-15",
      address: "24 Hàng Bạc, Hoàn Kiếm, Hà Nội"
    },
    {
      id: "cli-2",
      name: "Lê Minh Đức",
      phone: "0978.555.210",
      email: "duc.leminh@gmail.com",
      tier: "Thân Thiết",
      cutCount: 6,
      totalSpent: "1.600.000 đ",
      favBarber: "Minh Barber",
      reviewsSent: 5,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=240&auto=format&fit=crop&q=80",
      birthday: "1996-03-22",
      address: "18 Tràng Tiền, Hoàn Kiếm, Hà Nội"
    },
    {
      id: "cli-3",
      name: "Trần Quốc Bảo",
      phone: "0912.999.341",
      email: "bao.tq@gmail.com",
      tier: "Thân Thiết",
      cutCount: 5,
      totalSpent: "1.750.000 đ",
      favBarber: "Hoàng Stylist",
      reviewsSent: 4,
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=240&auto=format&fit=crop&q=80",
      birthday: "1994-11-09",
      address: "88 Cầu Giấy, Hà Nội"
    },
    {
      id: "cli-4",
      name: "Phạm Văn Cường",
      phone: "0983.111.444",
      email: "cuong.pv@gmail.com",
      tier: "Mới",
      cutCount: 2,
      totalSpent: "400.000 đ",
      favBarber: "Dũng Barber",
      reviewsSent: 1,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&auto=format&fit=crop&q=80",
      birthday: "1999-05-18",
      address: "102 Kim Mã, Ba Đình, Hà Nội"
    }
  ];

  const [currentClient, setCurrentClient] = useState(demoAccounts[0]);
  const [formData, setFormData] = useState({
    name: demoAccounts[0].name,
    phone: demoAccounts[0].phone,
    email: demoAccounts[0].email,
    birthday: demoAccounts[0].birthday,
    address: demoAccounts[0].address
  });

  const [passData, setPassData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: ""
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAccountSwitch = (e) => {
    const selected = demoAccounts.find((c) => c.id === e.target.value);
    if (selected) {
      setCurrentClient(selected);
      setFormData({
        name: selected.name,
        phone: selected.phone,
        email: selected.email,
        birthday: selected.birthday,
        address: selected.address
      });
      showToast(`Đã chuyển sang tài khoản: ${selected.name} (${selected.tier})`);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền họ tên và số điện thoại!");
      return;
    }
    setCurrentClient({
      ...currentClient,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      birthday: formData.birthday,
      address: formData.address
    });
    showToast("Đã lưu thông tin cá nhân thành công!");
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!passData.oldPass || !passData.newPass) {
      alert("Vui lòng nhập mật khẩu hiện tại và mật khẩu mới!");
      return;
    }
    if (passData.newPass.length < 6) {
      alert("Mật khẩu mới phải có tối thiểu 6 ký tự!");
      return;
    }
    if (passData.newPass !== passData.confirmPass) {
      alert("Xác nhận mật khẩu mới không khớp!");
      return;
    }

    setPassData({ oldPass: "", newPass: "", confirmPass: "" });
    showToast("Đã cập nhật mật khẩu thành công!");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-zinc-900 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold">
          <i className="ph-bold ph-check-circle text-base"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Account Switcher Bar (Demo Feature) */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
        <div className="flex items-center space-x-2">
          <i className="ph-bold ph-user-switch text-amber-500 text-lg"></i>
          <span className="text-xs sm:text-sm font-bold text-white">Chuyển tài khoản khách hàng demo:</span>
        </div>
        <select
          value={currentClient.id}
          onChange={handleAccountSwitch}
          className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-amber-400 outline-none"
        >
          {demoAccounts.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.name} ({acc.tier}) - {acc.phone}
            </option>
          ))}
        </select>
      </div>

      {/* Profile Header Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="relative">
            <img
              src={currentClient.avatar}
              alt="Avatar"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-amber-500/30 shadow-lg"
            />
            <button
              onClick={() => alert("Tính năng đổi ảnh đại diện đã sẵn sàng!")}
              className="absolute -bottom-2 -right-2 p-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-xl shadow-md transition"
            >
              <i className="ph-bold ph-camera text-sm"></i>
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">{currentClient.name}</h1>
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Khách {currentClient.tier}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1 flex items-center justify-center sm:justify-start">
                  <i className="ph-bold ph-phone mr-1"></i> {currentClient.phone} • <i className="ph-bold ph-envelope mr-1 ml-2"></i> {currentClient.email}
                </p>
              </div>
              <Link
                to="/booking/service"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs rounded-xl transition shadow-md shadow-amber-500/20 inline-flex items-center space-x-1.5 self-center sm:self-auto"
              >
                <i className="ph-bold ph-scissors"></i>
                <span>Đặt Lịch Cắt Mới</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-800">
          <div className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs text-zinc-400 font-semibold uppercase">Tổng Số Lần Cắt</p>
            <p className="text-2xl font-black text-white mt-1">{currentClient.cutCount} Lần</p>
          </div>
          <div className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs text-zinc-400 font-semibold uppercase">Tổng Chi Tiêu</p>
            <p className="text-2xl font-black text-amber-400 mt-1">{currentClient.totalSpent}</p>
          </div>
          <div className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs text-zinc-400 font-semibold uppercase">Thợ Cắt Ưa Thích</p>
            <p className="text-lg font-bold text-white mt-1 truncate">{currentClient.favBarber}</p>
          </div>
          <div className="p-4 bg-zinc-950/60 border border-zinc-800/80 rounded-2xl">
            <p className="text-xs text-zinc-400 font-semibold uppercase">Đánh Giá Đã Gửi</p>
            <p className="text-2xl font-black text-blue-400 mt-1">{currentClient.reviewsSent} Lượt</p>
          </div>
        </div>
      </div>

      {/* VIP Member Privileges Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 flex items-center justify-center text-xl font-bold shadow-md shadow-amber-500/20">
            <i className="ph-bold ph-crown"></i>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Đặc Quyền Hội Viên VIP BarberHub Club</h3>
            <p className="text-xs text-zinc-400">Bạn đang hưởng những đặc quyền cao cấp nhất dành cho khách hàng thân thiết.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-zinc-950/70 border border-zinc-800 rounded-xl text-xs space-y-1">
            <span className="font-bold text-amber-400 block">✓ Giảm 10% Trọn Đời</span>
            <p className="text-zinc-400 text-[11px]">Tự động áp dụng cho mọi gói dịch vụ cắt, uốn, nhuộm tại salon.</p>
          </div>
          <div className="p-3 bg-zinc-950/70 border border-zinc-800 rounded-xl text-xs space-y-1">
            <span className="font-bold text-amber-400 block">✓ Ưu Tiên Giữ Ghế</span>
            <p className="text-zinc-400 text-[11px]">Luôn được ưu tiên sắp xếp ghế và thợ ruột trong các khung giờ cao điểm.</p>
          </div>
          <div className="p-3 bg-zinc-950/70 border border-zinc-800 rounded-xl text-xs space-y-1">
            <span className="font-bold text-amber-400 block">✓ Đồ Uống & Spa Free</span>
            <p className="text-zinc-400 text-[11px]">Miễn phí đồ uống cao cấp và tặng thêm 10 phút massage cổ vai gáy thảo mộc.</p>
          </div>
        </div>
      </div>

      {/* Edit Profile & Password Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Edit Personal Info (Col 2) */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center">
              <i className="ph-bold ph-user-gear mr-2 text-amber-500"></i> Chỉnh Sửa Thông Tin Cá Nhân
            </h2>
            <span className="text-xs text-zinc-500">Dùng để đặt lịch & nhận SMS</span>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-white focus:border-amber-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Số Điện Thoại</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-white focus:border-amber-500 outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Email Liên Hệ</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-white focus:border-amber-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Địa Chỉ Thường Trú</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-bold text-white focus:border-amber-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition"
              >
                Lưu Thông Tin Cá Nhân
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Card (Col 1) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center">
            <i className="ph-bold ph-lock mr-2 text-amber-500"></i> Đổi Mật Khẩu
          </h2>
          <form onSubmit={handlePasswordChange} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Mật khẩu hiện tại</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passData.oldPass}
                onChange={(e) => setPassData({ ...passData, oldPass: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-amber-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Mật khẩu mới</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passData.newPass}
                onChange={(e) => setPassData({ ...passData, newPass: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-amber-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Xác nhận mật khẩu</label>
              <input
                type="password"
                placeholder="••••••••"
                value={passData.confirmPass}
                onChange={(e) => setPassData({ ...passData, confirmPass: e.target.value })}
                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white focus:border-amber-500 outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-amber-400 font-bold text-xs rounded-xl transition"
            >
              Cập Nhật Mật Khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
