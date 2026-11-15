// Phụ trách: Trần Việt Anh – Layout tổng thể dùng chung (Task Ngày 6)
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header dùng chung */}
      <Header />

      {/* Vùng nội dung chính render các route con */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Footer dùng chung */}
      <Footer />
    </div>
  );
}
