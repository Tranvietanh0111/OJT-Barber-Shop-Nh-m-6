// Phụ trách: Trần Việt Anh
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>BarberHub</header>
      <main><Outlet /></main>
      <footer>© BarberHub</footer>
    </div>
  );
}
