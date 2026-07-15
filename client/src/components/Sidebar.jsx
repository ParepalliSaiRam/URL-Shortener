import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Link2,
  BarChart3,
  LogOut,
} from "lucide-react";
import { removeToken } from "../utils/auth";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();
    navigate("/");
  }

  return (
    <aside
      className="w-full lg:w-64 bg-gray-900 text-white
                 lg:fixed lg:left-0 lg:top-0 lg:h-screen
                 flex flex-col"
    >
      <div className="p-6 border-b border-gray-800">
        <Link
          to="/urls"
          className="text-2xl font-bold hover:text-blue-400 transition"
        >
          URL Shortener
        </Link>
      </div>

      <nav className="flex lg:flex-1 lg:flex-col overflow-x-auto lg:overflow-visible p-4 gap-2">
        <Link
          to="/dashboard"
          className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/dashboard"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/urls"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/urls"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          <Link2 size={20} />
          My URLs
        </Link>

        <Link
          to="/analytics"
          className={`flex items-center gap-3 p-3 rounded-lg transition ${
            location.pathname === "/analytics"
              ? "bg-blue-600"
              : "hover:bg-gray-800"
          }`}
        >
          <BarChart3 size={20} />
          Analytics
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;