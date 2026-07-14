import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

            <nav className="space-y-4">

                <Link
                    to="/dashboard"
                    className="block hover:text-blue-400"
                >
                    Dashboard
                </Link>

                <Link
                    to="/urls"
                    className="block hover:text-blue-400"
                >
                    My URLs
                </Link>

                <Link
                    to="/analytics"
                    className="block hover:text-blue-400"
                >
                    Analytics
                </Link>

            </nav>

        </aside>
    );
}

export default Sidebar;