# Quy tắc Git

## Nhánh
- `main`: bản ổn định, chỉ merge khi demo/nghiệm thu (nhóm trưởng merge).
- `develop`: nhánh tích hợp hằng ngày.
- `feature/<module>-<mô-tả-ngắn>`: mỗi task một nhánh, tách từ `develop`.
  Ví dụ: `feature/barber-dashboard-ui`, `feature/auth-login-api`.

## Quy trình
1. `git checkout develop && git pull`
2. `git checkout -b feature/<module>-<mo-ta>`
3. Code, commit nhỏ, thường xuyên.
4. `git push -u origin <nhánh>` rồi mở Pull Request vào `develop`.
5. Nhóm trưởng (hoặc 1 bạn khác) review, sau đó merge. Không push thẳng lên `develop`/`main`.

## Commit message
Dạng `<loại>(<module>): <mô tả>`
- Loại: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
- Module: `auth`, `customer`, `admin`, `booking`, `barber`, `db`, `core`, `ui`
- Ví dụ: `feat(barber): thêm trang Dashboard Barber`

## Lưu ý
- Không commit file `.env` hay mật khẩu. Chỉ commit `.env.example`.
- Chỉ sửa file thuộc phần của mình (xem `docs/MODULE_OWNERS.md`).
- Trước khi tạo PR: chạy được cả backend và frontend, không có lỗi.
