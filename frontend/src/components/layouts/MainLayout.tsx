import Navbar from "../common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="app-shell">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-mustard focus:border-2 focus:border-ink focus:px-4 focus:py-3">Skip to content</a>
      <Navbar />
      <main className="page-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
