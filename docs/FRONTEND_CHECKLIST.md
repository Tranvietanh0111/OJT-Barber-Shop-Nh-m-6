# CHECKLIST NGHIỆM THU FRONTEND SPRINT 2
> **Người thực hiện: Trần Việt Anh – Nhóm trưởng**  
> **Thời gian đánh giá: Ngày 10 – Kết thúc Sprint 2**  
> **Dự án: BarberHub – Hệ thống quản lý Barber Shop**

---

## 1. Mục tiêu Sprint 2
- Hoàn thiện giao diện người dùng (Frontend) cho toàn bộ 5 phân hệ bằng dữ liệu mẫu (Mock data).
- Đảm bảo luồng điều hướng (Router Navigation) giữa các màn hình hoạt động trơn tru.
- Đồng bộ hệ thống bố cục (MainLayout, AdminLayout, BarberLayout, AuthLayout) và responsive trên đa thiết bị.
- Xử lý các trạng thái giao diện: Trống (EmptyState), Đang tải (Loading), Lỗi hệ thống (ErrorState, ErrorBoundary, 404 Page).
- Chuẩn hóa quy ước API Endpoint để bàn giao sang Sprint 3 (Tích hợp Backend & Database).

---

## 2. Bảng kiểm tra chất lượng theo từng Phân hệ

### 2.1. Phân hệ Nền tảng & Điều hướng (Trần Việt Anh)
| STT | Hạng mục kiểm tra | Tiêu chí đánh giá | Trạng thái |
|:---:|---|---|:---:|
| 1 | **Header & Navigation** | Hiển thị logo BarberHub, menu chính, nút chuyển nhanh role portal, responsive mobile menu |  Đạt |
| 2 | **Footer** | Hiển thị thông tin thương hiệu, giờ phục vụ, hotline, địa chỉ, bản quyền 2026 |  Đạt |
| 3 | **Layouts phân tầng** | MainLayout (Customer), AdminLayout (Sidebar/Topbar), BarberLayout (Sidebar/Topbar), AuthLayout |  Đạt |
| 4 | **Trang lỗi 404** | Minh họa chuẩn phong cách barbershop, thông điệp rõ ràng, nút quay lại trang chủ và đặt lịch |  Đạt |
| 5 | **Trạng thái lỗi & Tải** | ErrorBoundary chống crash trắng màn hình, ErrorState, EmptyState, LoadingSpinner chuẩn |  Đạt |
| 6 | **Dashboard Tổng quan** | Trang `/overview` hiển thị 5 thẻ KPI mẫu, bảng lịch hẹn, biểu đồ dịch vụ, phím tắt 7 module |  Đạt |
| 7 | **Hệ thống CSS Design System** | Palette màu Barber Amber Gold/Dark Navy, button variants, badge status, card responsive |  Đạt |

---

### 2.2. Phân hệ Khách hàng – Customer Module (Lương Trọng Đạt)
| STT | Tuyến đường (Route) | Tiêu chí hiển thị & Điều hướng | Trạng thái Sprint 2 |
|:---:|---|---|:---:|
| 1 | `/` (HomePage) | Banner chào mừng, nút kêu gọi đặt lịch, dịch vụ tiêu biểu |  Đã gắn vào Router |
| 2 | `/services` | Danh sách gói cắt tóc, cạo râu, giá cả hiển thị dạng thẻ |  Đã gắn vào Router |
| 3 | `/services/:id` | Xem chi tiết gói dịch vụ, mô tả, thời gian thực hiện |  Đã gắn vào Router |
| 4 | `/barbers` | Thông tin đội ngũ thợ, thâm niên tay nghề, hình ảnh |  Đã gắn vào Router |
| 5 | `/profile` | Thông tin tài khoản khách hàng, form cập nhật |  Đã gắn vào Router |
| 6 | `/my-bookings` | Lịch sử các lần đặt cắt tóc, trạng thái lịch |  Đã gắn vào Router |
| 7 | `/my-invoices` | Lịch sử chi tiêu và hóa đơn thanh toán |  Đã gắn vào Router |
| 8 | `/reviews` | Danh sách phản hồi và form chấm điểm dịch vụ |  Đã gắn vào Router |

---

### 2.3. Phân hệ Đặt lịch – Booking Module (Vũ Anh Đức)
| STT | Tuyến đường (Route) | Tiêu chí hiển thị & Điều hướng | Trạng thái Sprint 2 |
|:---:|---|---|:---:|
| 1 | `/booking/service` | Bước 1: Khách hàng chọn một hoặc nhiều dịch vụ |  Đã gắn vào Router |
| 2 | `/booking/barber` | Bước 2: Chọn thợ ưng ý hoặc chọn ngẫu nhiên |  Đã gắn vào Router |
| 3 | `/booking/slot` | Bước 3: Lịch ngày và danh sách khung giờ còn trống |  Đã gắn vào Router |
| 4 | `/booking/confirm` | Bước 4: Tóm tắt thông tin đặt lịch, ghi chú |  Đã gắn vào Router |
| 5 | `/booking/result` | Màn hình thông báo đặt lịch thành công kèm mã vé |  Đã gắn vào Router |
| 6 | `/schedule` | Lịch biểu hoạt động của salon |  Đã gắn vào Router |

---

### 2.4. Phân hệ Quản trị – Admin Module (Trần Văn Thắng)
| STT | Tuyến đường (Route) | Tiêu chí hiển thị & Điều hướng | Trạng thái Sprint 2 |
|:---:|---|---|:---:|
| 1 | `/admin` | Dashboard thống kê doanh thu, lịch hẹn trong ngày |  Đã tích hợp AdminLayout |
| 2 | `/admin/users` | Quản lý tài khoản người dùng, phân quyền |  Đã tích hợp AdminLayout |
| 3 | `/admin/barbers` | Danh sách thợ, thêm mới hoặc sửa thông tin |  Đã tích hợp AdminLayout |
| 4 | `/admin/services` | Danh mục bảng giá, bật/tắt dịch vụ |  Đã tích hợp AdminLayout |
| 5 | `/admin/appointments` | Toàn bộ lịch hẹn khách đặt, bộ lọc trạng thái |  Đã tích hợp AdminLayout |
| 6 | `/admin/invoices` | Quản lý thu chi và trạng thái hóa đơn |  Đã tích hợp AdminLayout |
| 7 | `/admin/revenue` | Biểu đồ doanh thu theo thời gian |  Đã tích hợp AdminLayout |

---

### 2.5. Phân hệ Thợ cắt tóc – Barber Module (Vũ Quốc Khánh)
| STT | Tuyến đường (Route) | Tiêu chí hiển thị & Điều hướng | Trạng thái Sprint 2 |
|:---:|---|---|:---:|
| 1 | `/barber` | Dashboard ca làm việc hôm nay, số khách sắp tới |  Đã tích hợp BarberLayout |
| 2 | `/barber/appointments` | Danh sách lịch hẹn được phân công, nút nhận/từ chối/hoàn thành |  Đã tích hợp BarberLayout |
| 3 | `/barber/reviews` | Xem phản hồi và lời khen từ khách hàng |  Đã tích hợp BarberLayout |
| 4 | `/barber/earnings` | Thống kê thu nhập cá nhân theo ngày/tuần |  Đã tích hợp BarberLayout |
| 5 | `/barber/profile` | Xem và cập nhật kỹ năng chuyên môn thợ |  Đã tích hợp BarberLayout |

---

### 2.6. Phân hệ Xác thực – Auth Module (Thiều Tiến Dũng)
| STT | Tuyến đường (Route) | Tiêu chí hiển thị & Điều hướng | Trạng thái Sprint 2 |
|:---:|---|---|:---:|
| 1 | `/login` | Form đăng nhập (Email, Mật khẩu), validation |  Đã tích hợp AuthLayout |
| 2 | `/register` | Form đăng ký thành viên mới |  Đã tích hợp AuthLayout |
| 3 | `/forgot-password` | Form khôi phục mật khẩu qua email |  Đã tích hợp AuthLayout |

---

## 3. Đánh giá Responsive & Đa thiết bị
- **Desktop (>= 1200px):** Layout hiển thị đầy đủ, menu ngang, sidebar cố định.
- **Tablet (768px – 1199px):** Bố cục grid tự co giãn 2 cột, sidebar dashboard thu gọn.
- **Mobile (< 768px):** Hamburger menu kích hoạt, layout xếp chồng 1 cột, chạm vuốt thuận tiện.

---

## 4. Kết luận & Sẵn sàng cho Sprint 3
- Toàn bộ 5 task Sprint 2 của Nhóm trưởng **Trần Việt Anh** (Ngày 6 đến Ngày 10) đã hoàn thành 100% tiêu chí nghiệm thu.
- Mã nguồn build thành công không lỗi cú pháp.
- Đã sẵn sàng chuyển giao kết nối API Backend tại Sprint 3.
