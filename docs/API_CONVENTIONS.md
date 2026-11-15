# QUY ƯỚC API & CHUẨN KẾT NỐI HỆ THỐNG BARBERHUB
> **Chốt tại Ngày 10 - Sprint 2 | Người phụ trách: Trần Việt Anh (Nhóm trưởng)**

Tài liệu này xác định các quy ước chuẩn về giao tiếp giữa Frontend (ReactJS) và Backend (FastAPI + MySQL) áp dụng thống nhất cho toàn bộ 7 thành viên trong Sprint 3.

---

## 1. Cấu hình Môi trường & Base URL

- **Base URL:** `/api/v1`
- **Địa chỉ máy chủ cục bộ (Local):** `http://localhost:8000/api/v1`
- **Biến môi trường Frontend:** `VITE_API_BASE_URL=http://localhost:8000/api/v1`
- **Header xác thực (Authentication Header):**
  ```http
  Authorization: Bearer <access_token>
  ```
- **Content-Type mặc định:** `application/json`

---

## 2. Cấu trúc Response chuẩn hóa

### 2.1. Phản hồi thành công (HTTP 200, 201)
```json
{
  "success": true,
  "message": "Mô tả kết quả thao tác thành công",
  "data": { ... }
}
```
*(Nếu là danh sách có phân trang)*:
```json
{
  "success": true,
  "message": "Lấy danh sách thành công",
  "data": {
    "items": [ ... ],
    "total": 120,
    "page": 1,
    "limit": 10
  }
}
```

### 2.2. Phản hồi lỗi (HTTP 400, 401, 403, 404, 422, 500)
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE_NAME",
    "message": "Thông báo lỗi thân thiện dành cho người dùng",
    "details": null
  }
}
```

### 2.3. Mã lỗi chuẩn hóa hệ thống (Error Codes)
| Mã lỗi | HTTP Status | Ý nghĩa |
|---|---|---|
| `UNAUTHORIZED` | 401 | Chưa đăng nhập hoặc token đã hết hạn |
| `FORBIDDEN` | 403 | Không có quyền truy cập tài nguyên |
| `NOT_FOUND` | 404 | Tài nguyên không tồn tại |
| `VALIDATION_ERROR` | 422 | Dữ liệu đầu vào sai định dạng |
| `SLOT_ALREADY_BOOKED` | 400 | Khung giờ đã có khách đặt trước |
| `INVALID_CREDENTIALS` | 401 | Email hoặc mật khẩu không chính xác |
| `EMAIL_ALREADY_EXISTS`| 400 | Email đăng ký đã tồn tại |
| `INTERNAL_SERVER_ERROR`| 500 | Lỗi xử lý máy chủ nội bộ |

---

## 3. Vai trò người dùng (Roles) & Trạng thái (Statuses)

### 3.1. Phân quyền người dùng
- `admin`: Quản trị viên hệ thống (Toàn quyền quản lý)
- `barber`: Thợ cắt tóc / Stylist (Xem ca, xác nhận lịch, xem thu nhập)
- `customer`: Khách hàng (Xem dịch vụ, đặt lịch, xem lịch sử)

### 3.2. Trạng thái lịch hẹn (Appointment Status)
Thống nhất giữa phân hệ Đặt lịch (Đức) và Barber (Khánh):
- `pending`: Khách vừa đặt, đang chờ Barber hoặc hệ thống xác nhận.
- `confirmed`: Barber hoặc Admin đã tiếp nhận và xác nhận lịch hẹn.
- `rejected`: Barber từ chối lịch hẹn (bận đột xuất, quá tải).
- `completed`: Đã hoàn thành buổi cắt tóc và thanh toán.
- `cancelled`: Khách hàng hoặc Admin chủ động hủy lịch.

### 3.3. Trạng thái hóa đơn (Invoice Status)
- `unpaid`: Chưa thanh toán.
- `paid`: Đã thanh toán thành công (tiền mặt / chuyển khoản / cổng thanh toán).
- `refunded`: Đã hoàn tiền cho khách.

---

## 4. Danh mục Endpoints chuẩn theo từng Module

### 4.1. Module Xác thực (`/auth`) – Phụ trách: Thiều Tiến Dũng
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `POST` | `/auth/register` | Đăng ký tài khoản khách hàng mới | Public |
| `POST` | `/auth/login` | Đăng nhập hệ thống, trả về JWT access token | Public |
| `GET` | `/auth/me` | Lấy thông tin tài khoản hiện tại | Bearer Token |
| `POST` | `/auth/forgot-password` | Gửi yêu cầu đặt lại mật khẩu | Public |

### 4.2. Module Khách hàng (`/customer`) – Phụ trách: Lương Trọng Đạt
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `GET` | `/customer/profile` | Lấy thông tin hồ sơ khách hàng | Customer |
| `PUT` | `/customer/profile` | Cập nhật số điện thoại, họ tên, avatar | Customer |
| `GET` | `/customer/bookings` | Danh sách lịch sử đặt lịch của tôi | Customer |
| `GET` | `/customer/invoices` | Danh sách hóa đơn của tôi | Customer |
| `POST` | `/customer/reviews` | Gửi đánh giá cho buổi cắt tóc | Customer |

### 4.3. Module Đặt lịch & Lịch biểu (`/appointments`, `/schedules`) – Phụ trách: Vũ Anh Đức
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `GET` | `/appointments/available-slots` | Lấy danh sách khung giờ trống theo ngày & Barber | Public / Customer |
| `POST` | `/appointments` | Tạo đơn đặt lịch hẹn mới | Customer / Public |
| `PUT` | `/appointments/{id}/cancel` | Hủy lịch hẹn đã đặt | Customer / Admin |
| `GET` | `/schedules` | Lấy lịch làm việc của các Barber | Authenticated |
| `POST` | `/schedules` | Đăng ký / phân ca làm việc | Barber / Admin |

### 4.4. Module Thợ cắt tóc (`/barber`) – Phụ trách: Vũ Quốc Khánh
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `GET` | `/barber/appointments` | Danh sách lịch hẹn được phân công cho Barber | Barber |
| `PATCH` | `/barber/appointments/{id}/status` | Cập nhật trạng thái (`confirmed`, `rejected`, `completed`) | Barber |
| `GET` | `/barber/profile` | Xem hồ sơ và kỹ năng chuyên môn | Barber |
| `PUT` | `/barber/profile` | Cập nhật thông tin giới thiệu | Barber |
| `GET` | `/barber/reviews` | Xem các đánh giá nhận được từ khách hàng | Barber |
| `GET` | `/barber/earnings` | Thống kê thu nhập cá nhân theo ngày/tuần/tháng | Barber |

### 4.5. Module Dịch vụ (`/services`) – Phụ trách: Vũ Quốc Khánh & Trần Văn Thắng
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `GET` | `/services` | Lấy danh sách dịch vụ đang mở bán | Public |
| `GET` | `/services/{id}` | Lấy chi tiết thông tin dịch vụ | Public |

### 4.6. Module Quản trị (`/admin`) – Phụ trách: Trần Văn Thắng
| Phương thức | Endpoint | Mô tả | Quyền |
|---|---|---|---|
| `GET` | `/admin/dashboard` | Số liệu KPI tổng thể của hệ thống | Admin |
| `GET` | `/admin/users` | Danh sách người dùng hệ thống | Admin |
| `PUT` | `/admin/users/{id}` | Cập nhật trạng thái / vai trò người dùng | Admin |
| `GET` | `/admin/barbers` | Quản lý danh sách Barber | Admin |
| `POST` | `/admin/barbers` | Thêm Barber mới | Admin |
| `POST` | `/admin/services` | Thêm dịch vụ mới | Admin |
| `PUT` | `/admin/services/{id}` | Sửa thông tin hoặc ẩn dịch vụ | Admin |
| `GET` | `/admin/appointments` | Quản lý tất cả lịch hẹn toàn hệ thống | Admin |
| `GET` | `/admin/invoices` | Quản lý tất cả hóa đơn | Admin |
| `GET` | `/admin/revenue` | Thống kê doanh thu chi tiết | Admin |
