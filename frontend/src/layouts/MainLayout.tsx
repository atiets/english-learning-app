import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return <div>
        <Navbar />
        <main className="p-6">
            <Outlet />
        </main>
    </div>
}
export default MainLayout;
