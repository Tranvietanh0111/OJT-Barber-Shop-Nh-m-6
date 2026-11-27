# Admin Module – BarberHub

**Phụ trách:** Trần Văn Thắng  
**Phạm vi:** Giao diện quản trị Admin (React + Vite), hệ thống API Admin (FastAPI) và bộ kiểm thử tự động (`pytest`).

---

## 1. Cấu trúc thư mục & File phụ trách

### Frontend (`frontend/src/pages/admin/`)
| File | Chức năng | API kết nối |
|---|---|---|
| `AdminDashboard.jsx` | Tổng quan KPI, biểu đồ doanh thu 7 ngày, lịch hẹn mới nhất | `/api/v1/admin/revenue`, `users`, `barbers`, `appointments` |
| `UserManagement.jsx` | Quản lý người dùng: tìm kiếm, lọc vai trò/trạng thái, Thêm/Sửa/Khóa-Mở khóa/Xóa | `/api/v1/admin/users` |
| `BarberManagement.jsx` | Quản lý Barber: tìm kiếm, lọc trạng thái, Thêm/Sửa/Đổi trạng thái nhanh/Xóa | `/api/v1/admin/barbers` |
| `ServiceManagement.jsx` | Quản lý dịch vụ: tìm kiếm, lọc danh mục, Thêm/Sửa/Ẩn-Hiện/Xóa | `/api/v1/services` |
| `AppointmentManagement.jsx` | Quản lý lịch hẹn: lọc ngày/Barber/trạng thái, Tạo/Sửa/Duyệt-Từ chối-Hoàn thành/Xóa | `/api/v1/admin/appointments` |
| `InvoiceManagement.jsx` | Quản lý hóa đơn: tạo hóa đơn nhiều dịch vụ tự tính tổng, xem chi tiết, đổi trạng thái thanh toán, Xóa | `/api/v1/admin/invoices` |
| `RevenueStats.jsx` | Thống kê doanh thu động theo kỳ (`7d`, `month`, `quarter`, `year`), biểu đồ SVG & phân tích theo Barber/thanh toán | `/api/v1/admin/revenue` |
| `adminApi.js` | Tầng gọi API thật qua `axios` (`src/api/client.js`), có fallback `localStorage` khi backend chưa chạy | Toàn bộ endpoint Admin |
| `AdminUiHelpers.jsx` | Component thông báo (`AdminAlert`) và hộp thoại xác nhận xóa (`ConfirmDeleteModal`) | Dùng chung |
| `admin.css` | Stylesheet đồng bộ thiết kế Barber Pole (Ivory, Navy & Red) | Dùng chung |

### Backend (`backend/app/routers/`)
| File | Mô tả |
|---|---|
| `admin.py` | Router tổng hợp prefix `/api/v1/admin` |
| `admin_users.py` | CRUD người dùng + dependency phân quyền `require_admin` |
| `admin_barbers.py` | CRUD hồ sơ & trạng thái Barber |
| `admin_invoices.py` | CRUD hóa đơn & tính toán tổng tiền |
| `admin_revenue.py` | API thống kê doanh thu theo kỳ |
| `admin_appointments.py` | CRUD lịch hẹn & kiểm tra trùng khung giờ Barber |

### Kiểm thử (`backend/tests/`)
- `backend/tests/test_admin.py` – Bộ test tự động (`pytest` + `TestClient`) kiểm tra phân quyền `403`, CRUD, validate trùng lặp, tính tổng hóa đơn, chống trùng lịch và thống kê 4 kỳ.

---

## 2. Danh sách API Endpoints

Tất cả endpoint Admin đều yêu cầu quyền **Admin** (`Authorization: Bearer <admin-token>` hoặc header `X-Role: admin`). Nếu gửi `X-Role: customer` / `barber` hoặc token không phải Admin, hệ thống trả về **`403 Forbidden`**.

| Nhóm | Method | Endpoint | Mô tả |
|---|---|---|---|
| **Users** | `GET` | `/api/v1/admin/users` | Danh sách + tìm kiếm (`search`), lọc (`role`, `status`), phân trang |
| | `GET` | `/api/v1/admin/users/{id}` | Chi tiết người dùng |
| | `POST` | `/api/v1/admin/users` | Tạo người dùng mới (kiểm tra trùng email & SĐT) |
| | `PUT` | `/api/v1/admin/users/{id}` | Cập nhật thông tin người dùng |
| | `PATCH` | `/api/v1/admin/users/{id}/role` | Đổi vai trò (`admin` / `barber` / `customer`) |
| | `PATCH` | `/api/v1/admin/users/{id}/status` | Khóa / mở khóa (`active` / `locked`) – chặn tự khóa Admin |
| | `DELETE` | `/api/v1/admin/users/{id}` | Xóa người dùng – chặn tự xóa Admin |
| **Barbers** | `GET` | `/api/v1/admin/barbers` | Danh sách + tìm kiếm, lọc trạng thái (`available`/`busy`/`off`/`inactive`) |
| | `GET` | `/api/v1/admin/barbers/{id}` | Chi tiết Barber |
| | `POST` | `/api/v1/admin/barbers` | Thêm Barber mới (kiểm tra trùng SĐT) |
| | `PUT` | `/api/v1/admin/barbers/{id}` | Cập nhật hồ sơ Barber |
| | `PATCH` | `/api/v1/admin/barbers/{id}/status` | Cập nhật trạng thái làm việc nhanh |
| | `DELETE` | `/api/v1/admin/barbers/{id}` | Xóa hồ sơ Barber |
| **Invoices** | `GET` | `/api/v1/admin/invoices` | Danh sách + lọc `status`, `payment_method`, `date` & `summary` |
| | `GET` | `/api/v1/admin/invoices/{id}` | Chi tiết hóa đơn kèm danh sách dịch vụ |
| | `POST` | `/api/v1/admin/invoices` | Tạo hóa đơn mới (tự tính `subtotal` & `total`) |
| | `PATCH` | `/api/v1/admin/invoices/{id}/status` | Cập nhật trạng thái (`paid`/`unpaid`/`refunded`), phương thức & ghi chú |
| | `DELETE` | `/api/v1/admin/invoices/{id}` | Xóa hóa đơn |
| **Revenue** | `GET` | `/api/v1/admin/revenue?period=month` | Thống kê doanh thu (`7d` / `month` / `quarter` / `year`) |
| | `GET` | `/api/v1/admin/revenue/stats` | Endpoint alias trả về thống kê doanh thu chi tiết |
| **Appointments** | `GET` | `/api/v1/admin/appointments` | Danh sách + lọc `search`, `status`, `barber`, `date` & `summary` |
| | `GET` | `/api/v1/admin/appointments/{id}` | Chi tiết lịch hẹn |
| | `POST` | `/api/v1/admin/appointments` | Tạo lịch hẹn mới (chống trùng khung giờ cùng Barber) |
| | `PUT` | `/api/v1/admin/appointments/{id}` | Cập nhật lịch hẹn |
| | `PATCH` | `/api/v1/admin/appointments/{id}/status` | Duyệt / Từ chối / Hoàn thành / Hủy lịch |
| | `DELETE` | `/api/v1/admin/appointments/{id}` | Xóa lịch hẹn |
| **Services** | `GET/POST/PUT/PATCH/DELETE` | `/api/v1/services` | Kết nối API Dịch vụ (phụ trách backend: Vũ Quốc Khánh) |

---

## 3. Hướng dẫn chạy thực tế với API thật

### Bước 1: Chạy Backend (FastAPI)
```powershell
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
- API chạy tại: `http://localhost:8000`
- Tài liệu Swagger UI: `http://localhost:8000/docs`

### Bước 2: Chạy Frontend (React + Vite)
```powershell
cd frontend
npm install
copy .env.example .env
npm run dev
```
- Ứng dụng chạy tại: `http://localhost:5173`
- File `frontend/.env` cần có:
  ```env
  VITE_API_BASE_URL=http://localhost:8000/api/v1
  ```
- Khi kết nối API thật thành công, thanh tiêu đề các trang Admin hiển thị nhãn chấm xanh **`API FastAPI`**.

---

## 4. Hướng dẫn chạy Test

Chạy toàn bộ bộ test Admin API từ thư mục `backend`:
```powershell
cd backend
pytest tests/test_admin.py -v
```

---

## 5. Tài khoản demo & Kịch bản nghiệm thu

- **Tài khoản Admin:** `admin@example.com` / `123456` → đăng nhập tại `/login`, tự chuyển tới `/admin`.
- **Tài khoản Khách hàng:** `customer@example.com` / `123456` → không có quyền vào `/admin`.
- **Khách vãng lai (chưa đăng nhập):**
  - Được phép xem dịch vụ, xem Barber và đặt lịch hẹn 5 bước tại `/booking/service` (hiển thị thông báo đặt lịch thành công + đồng bộ vào Quản lý lịch hẹn).
  - Bị chặn khi truy cập `/admin/*` (không được Thêm/Sửa/Xóa).
- **Nghiệm thu API thật:** Mở DevTools (`F12` → tab **Network** → `Fetch/XHR`), thực hiện Thêm → Sửa → Đổi trạng thái → Xóa trên từng trang Admin và bấm `F5` kiểm tra dữ liệu lưu từ FastAPI.
