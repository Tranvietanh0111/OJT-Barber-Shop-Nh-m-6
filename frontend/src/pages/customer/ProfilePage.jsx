// Phụ trách: Lương Trọng Đạt - Customer Module
// Route: /profile (Hồ sơ khách hàng, đặc quyền VIP & quản lý tài khoản - Phong cách Red, White, Blue & Tailwind CSS)
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
      tierClass: "bg-red-600 text-white",
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
      tierClass: "bg-blue-600 text-white",
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
      tierClass: "bg-blue-600 text-white",
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
      tierClass: "bg-slate-600 text-white",
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

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setCurrentClient({
      ...currentClient,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      birthday: formData.birthday,
      address: formData.address
    });
    showToast("Cập nhật thông tin tài khoản thành công!");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passData.oldPass || !passData.newPass) {
      alert("Vui lòng nhập đầy đủ mật khẩu cũ và mới!");
      return;
    }
    if (passData.newPass !== passData.confirmPass) {
      alert("Xác nhận mật khẩu mới không trùng khớp!");
      return;
    }
    setPassData({ oldPass: "", newPass: "", confirmPass: "" });
    showToast("Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới.");
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen">
      {/* Barber Pole Accent Header */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-white to-blue-600 shadow-sm"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-bold border-l-4 border-blue-500 animate-bounce">
            <i className="ph-bold ph-check-circle text-emerald-400 text-base"></i>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Title & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-black uppercase text-blue-600 tracking-widest block">Tài Khoản & Đặc Quyền</span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">Hồ Sơ Khách Hàng BarberHub</h1>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-semibold">Tài khoản demo:</span>
            <select
              value={currentClient.id}
              onChange={handleAccountSwitch}
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-blue-700 shadow-sm focus:outline-none focus:border-blue-600"
            >
              {demoAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.tier})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Client Hero Overview Card */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* User Meta (Col 5) */}
            <div className="lg:col-span-5 flex items-center space-x-5">
              <div className="relative">
                <img
                  src={currentClient.avatar}
                  alt={currentClient.name}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-red-500 shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 text-base">👑</span>
              </div>
              <div>
                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${currentClient.tierClass}`}>
                  Hạng: {currentClient.tier}
                </span>
                <h2 className="text-xl font-bold">{currentClient.name}</h2>
                <p className="text-xs text-slate-300 mt-0.5">{currentClient.phone} • {currentClient.email}</p>
              </div>
            </div>

            {/* Stats (Col 7) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Lượt Cắt</span>
                <span className="text-xl font-black text-white mt-1 block">{currentClient.cutCount} lần</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Tổng Chi Tiêu</span>
                <span className="text-xl font-black text-red-400 mt-1 block">{currentClient.totalSpent}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Barber Ruột</span>
                <span className="text-sm font-bold text-blue-200 mt-1 block truncate">{currentClient.favBarber}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 text-center">
                <span className="text-[10px] text-slate-300 uppercase block font-semibold">Đánh Giá</span>
                <span className="text-xl font-black text-white mt-1 block">{currentClient.reviewsSent} phản hồi</span>
              </div>
            </div>

          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Edit Profile & Password (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Info */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-lg">Thông Tin Cá Nhân & Liên Hệ</h3>
                <p className="text-xs text-slate-500 mt-0.5">Cập nhật thông tin để nhân viên salon liên hệ xác nhận lịch hẹn chuẩn xác.</p>
              </div>

              <form onSubmit={handleSaveInfo} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Họ và tên</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Số điện thoại</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Ngày sinh</label>
                    <input
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Địa chỉ thường trú</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/25 transition flex items-center space-x-1.5"
                  >
                    <i className="ph-bold ph-floppy-disk text-sm"></i>
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Form Change Password */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-lg">Đổi Mật Khẩu Đăng Nhập</h3>
                <p className="text-xs text-slate-500 mt-0.5">Bảo vệ tài khoản và lịch sử giao dịch hóa đơn của bạn.</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={passData.oldPass}
                    onChange={(e) => setPassData({ ...passData, oldPass: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passData.newPass}
                      onChange={(e) => setPassData({ ...passData, newPass: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Xác nhận mật khẩu mới</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passData.confirmPass}
                      onChange={(e) => setPassData({ ...passData, confirmPass: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition flex items-center space-x-1.5"
                  >
                    <i className="ph-bold ph-lock-key text-sm"></i>
                    <span>Cập Nhật Mật Khẩu</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: VIP Privileges (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-black uppercase text-red-600 tracking-widest block">Quyền Lợi Khách Hàng</span>
                <h3 className="font-bold text-slate-900 text-lg mt-1">Đặc Quyền Thành Viên BarberHub</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg shrink-0">
                    <i className="ph-bold ph-percent"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Giảm 10% Trọn Đời</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Tự động áp dụng chiết khấu cho mọi hóa đơn dịch vụ cắt, uốn và spa.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
                    <i className="ph-bold ph-armchair"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Ưu Tiên Giữ Ghế Không Chờ</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Được phục vụ ngay khi tới salon mà không cần xếp hàng chờ đợi.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-lg shrink-0">
                    <i className="ph-bold ph-coffee"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Menu Đồ Uống VIP Miễn Phí</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Thưởng thức trà sen Tây Hồ, cà phê Espresso rang xay và đồ ăn nhẹ.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
                    <i className="ph-bold ph-gift"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">Voucher Sinh Nhật 200.000 đ</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">Tặng phiếu trải nghiệm dịch vụ uốn hoặc nhuộm trong tháng sinh nhật.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3">
                <Link
                  to="/my-bookings"
                  className="py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold text-center shadow-md shadow-blue-600/20 transition"
                >
                  Lịch Hẹn Của Tôi
                </Link>
                <Link
                  to="/my-invoices"
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold text-center transition"
                >
                  Xem Hóa Đơn
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
