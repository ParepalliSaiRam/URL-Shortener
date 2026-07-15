import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Header() {

    const navigate = useNavigate();

    function handleLogout() {

        logout();

        navigate("/login");

    }

    return (

        <header className="flex items-center justify-between bg-white border-b p-4">

            <h1 className="text-2xl font-bold">
                URL Shortener
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
                Logout
            </button>

        </header>

    );

}

export default Header;