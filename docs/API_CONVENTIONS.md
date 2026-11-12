# Quy ước API (nhóm trưởng chốt ở ngày 10)

- Base URL: `/api/v1`
- Thành công: `{ "success": true, "data": ..., "message": "..." }`
- Lỗi: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Xác thực: header `Authorization: Bearer <access_token>`
- Vai trò: `admin`, `barber`, `customer`
- Trạng thái lịch hẹn (Đức và Khánh thống nhất): `pending`, `confirmed`, `rejected`, `completed`, `cancelled`

| Prefix | Phụ trách |
|---|---|
| `/auth` | Dũng |
| `/customer` | Đạt |
| `/admin` | Thắng |
| `/appointments`, `/schedules` | Đức |
| `/barber`, `/services` | Khánh |
