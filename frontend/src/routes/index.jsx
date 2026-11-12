// Phụ trách: Trần Việt Anh
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/common/NotFoundPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import HomePage from "../pages/customer/HomePage";
import ServiceListPage from "../pages/customer/ServiceListPage";
import ServiceDetailPage from "../pages/customer/ServiceDetailPage";
import BarberInfoPage from "../pages/customer/BarberInfoPage";
import ProfilePage from "../pages/customer/ProfilePage";
import BookingHistoryPage from "../pages/customer/BookingHistoryPage";
import InvoiceHistoryPage from "../pages/customer/InvoiceHistoryPage";
import ReviewPage from "../pages/customer/ReviewPage";
import SelectServicePage from "../pages/booking/SelectServicePage";
import SelectBarberPage from "../pages/booking/SelectBarberPage";
import SelectSlotPage from "../pages/booking/SelectSlotPage";
import ConfirmBookingPage from "../pages/booking/ConfirmBookingPage";
import BookingResultPage from "../pages/booking/BookingResultPage";
import ScheduleCalendarPage from "../pages/booking/ScheduleCalendarPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserManagement from "../pages/admin/UserManagement";
import BarberManagement from "../pages/admin/BarberManagement";
import ServiceManagement from "../pages/admin/ServiceManagement";
import AppointmentManagement from "../pages/admin/AppointmentManagement";
import InvoiceManagement from "../pages/admin/InvoiceManagement";
import RevenueStats from "../pages/admin/RevenueStats";
import BarberDashboard from "../pages/barber/BarberDashboard";
import BarberAppointments from "../pages/barber/BarberAppointments";
import BarberProfile from "../pages/barber/BarberProfile";
import BarberReviews from "../pages/barber/BarberReviews";
import BarberEarnings from "../pages/barber/BarberEarnings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServiceListPage />} />
        <Route path="/services/:id" element={<ServiceDetailPage />} />
        <Route path="/barbers" element={<BarberInfoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-bookings" element={<BookingHistoryPage />} />
        <Route path="/my-invoices" element={<InvoiceHistoryPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/booking/service" element={<SelectServicePage />} />
        <Route path="/booking/barber" element={<SelectBarberPage />} />
        <Route path="/booking/slot" element={<SelectSlotPage />} />
        <Route path="/booking/confirm" element={<ConfirmBookingPage />} />
        <Route path="/booking/result" element={<BookingResultPage />} />
        <Route path="/schedule" element={<ScheduleCalendarPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/barbers" element={<BarberManagement />} />
        <Route path="/admin/services" element={<ServiceManagement />} />
        <Route path="/admin/appointments" element={<AppointmentManagement />} />
        <Route path="/admin/invoices" element={<InvoiceManagement />} />
        <Route path="/admin/revenue" element={<RevenueStats />} />
        <Route path="/barber" element={<BarberDashboard />} />
        <Route path="/barber/appointments" element={<BarberAppointments />} />
        <Route path="/barber/profile" element={<BarberProfile />} />
        <Route path="/barber/reviews" element={<BarberReviews />} />
        <Route path="/barber/earnings" element={<BarberEarnings />} />
      </Route>
    </Routes>
  );
}
