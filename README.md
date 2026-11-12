    # BarberHub – Hệ thống quản lý Barber Shop

    Dự án nhóm 3 tuần (15 ngày làm việc), 7 thành viên.
    Công nghệ: ReactJS (Vite), FastAPI, MySQL, SQLAlchemy, JWT, bcrypt.

    ## Cấu trúc thư mục

    ```
    barberhub/
    ├── backend/             FastAPI + SQLAlchemy
    │   ├── app/
    │   │   ├── core/        config, database, security, deps
    │   │   ├── models/      SQLAlchemy models
    │   │   ├── schemas/     Pydantic schemas
    │   │   ├── routers/     API theo module
    │   │   ├── services/    nghiệp vụ
    │   │   └── utils/       response/error chung
    │   ├── migrations/      Alembic
    │   └── tests/
    ├── frontend/            React (Vite)
    │   └── src/
    │       ├── api/         API client
    │       ├── components/  component dùng chung
    │       ├── context/     AuthContext...
    │       ├── layouts/     layout dùng chung
    │       ├── pages/       auth, customer, admin, booking, barber, common
    │       ├── routes/      router
    │       └── mocks/       dữ liệu mẫu (Sprint 2)
    ├── docs/                scope, ERD, wireframe, quy ước API
    ├── docker-compose.yml   MySQL dev
    └── CONTRIBUTING.md      quy tắc Git
    ```

    ## Chạy dự án

    **Database**
    ```bash
    docker compose up -d
    ```

    **Backend**
    ```bash
    cd backend
    python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    cp .env.example .env
    uvicorn app.main:app --reload
    ```
    Mở http://localhost:8000/docs để xem Swagger.

    **Frontend**
    ```bash
    cd frontend
    npm install
    cp .env.example .env
    npm run dev
    ```
    Mở http://localhost:5173.

    ## Phân công (mỗi người một phần riêng)

    | Thành viên | Module | Phạm vi |
    |---|---|---|
    | Trần Việt Anh | Nhóm trưởng | Layout, Router, API client, tích hợp, deploy |
| Lương Trọng Đạt | Customer Module | UI và API khách hàng |
| Trần Văn Thắng | Admin Module | UI và API quản trị |
| Thiều Tiến Dũng | Authentication | Đăng ký, đăng nhập, JWT, phân quyền |
| Vũ Anh Đức | Appointment & Schedule | Lịch làm việc và đặt lịch |
| Đỗ Ngọc Dân | Database & Backend Foundation | MySQL, SQLAlchemy, nền tảng FastAPI |
| Vũ Quốc Khánh | Barber Module | UI và API thợ cắt tóc, API dịch vụ |

    Thư mục từng người phụ trách xem `docs/MODULE_OWNERS.md`. Chỉ sửa file trong phần của mình;
    cần sửa phần người khác thì báo họ hoặc tạo Pull Request để họ duyệt.
