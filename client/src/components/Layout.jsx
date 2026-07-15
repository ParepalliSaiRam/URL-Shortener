import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 flex flex-col lg:ml-64">

                <Header />

                <main className="p-6">
                    <Outlet />
                </main>
    
            </div>

        </div>
    );
}

export default Layout;