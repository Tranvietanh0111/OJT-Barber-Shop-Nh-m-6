// Phụ trách: Trần Việt Anh – API client dùng chung (Sprint 2 chuẩn bị & Sprint 3 tích hợp)
import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Tự động gán JWT Bearer Token nếu có
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Chuẩn hóa phản hồi và xử lý lỗi tập trung
client.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // Khi token hết hạn hoặc không hợp lệ (401)
      if (error.response.status === 401) {
        localStorage.removeItem("access_token");
        // Có thể redirect nếu cần: window.location.href = "/login";
      }

      // Trả về error object chuẩn hóa
      return Promise.reject(
        error.response.data?.error || {
          code: `HTTP_${error.response.status}`,
          message: error.response.data?.message || "Đã xảy ra lỗi từ phía máy chủ.",
        }
      );
    } else if (error.request) {
      // Không nhận được phản hồi từ máy chủ (mất mạng hoặc server chưa bật)
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại đường truyền mạng.",
      });
    }

    return Promise.reject({
      code: "UNKNOWN_ERROR",
      message: error.message || "Đã xảy ra lỗi không xác định.",
    });
  }
);

export default client;
