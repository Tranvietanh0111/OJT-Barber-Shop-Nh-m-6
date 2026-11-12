"""Phụ trách: Đỗ Ngọc Dân – chuẩn hóa response/error (xem docs/API_CONVENTIONS.md)."""


def success(data=None, message: str = "OK"):
    return {"success": True, "data": data, "message": message}


def error(code: str, message: str):
    return {"success": False, "error": {"code": code, "message": message}}
