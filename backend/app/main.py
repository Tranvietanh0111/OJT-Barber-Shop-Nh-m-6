from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import auth
from app.routers import customer
from app.routers import admin
from app.routers import appointments
from app.routers import schedules
from app.routers import barber
from app.routers import services

app = FastAPI(title="BarberHub API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in settings.CORS_ORIGINS.split(",")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(customer.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")
app.include_router(appointments.router, prefix="/api/v1")
app.include_router(schedules.router, prefix="/api/v1")
app.include_router(barber.router, prefix="/api/v1")
app.include_router(services.router, prefix="/api/v1")


@app.get("/api/v1/health", tags=["health"])
def health():
    return {"status": "ok"}
