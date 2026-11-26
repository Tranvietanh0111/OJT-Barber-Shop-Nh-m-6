import client from "./client";

export const authApi = {
  login: (credentials) => client.post("/auth/login", credentials),
  register: (payload) => client.post("/auth/register", payload),
  forgotPassword: (email) => client.post("/auth/forgot-password", { email }),
};

export const serviceApi = {
  list: (params) => client.get("/services", { params }),
  detail: (id) => client.get(`/services/${id}`),
};

export const appointmentApi = {
  list: (params) => client.get("/appointments", { params }),
  detail: (id) => client.get(`/appointments/${id}`),
  create: (payload) => client.post("/appointments", payload),
  updateStatus: (id, status) => client.patch(`/appointments/${id}/status`, { status }),
};

export const barberApi = {
  list: (params) => client.get("/barbers", { params }),
  appointments: (params) => client.get("/barber/appointments", { params }),
};
