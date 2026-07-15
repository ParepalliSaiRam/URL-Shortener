import { useLocation } from "react-router-dom";

function Header() {

    const location = useLocation();

    const pageInfo = {
        "/dashboard": {
            title: "Dashboard",
            subtitle: "Overview of your URL statistics",
        },
        "/urls": {
            title: "My URLs",
            subtitle: "Create and manage your shortened URLs",
        },
        "/analytics": {
            title: "Analytics",
            subtitle: "Track clicks and URL performance",
        },
    };

    const current =
        pageInfo[location.pathname] || {
            title: "URL Shortener",
            subtitle: "",
        };

    return (
    <header className="bg-white border-b px-8 py-5">
    {/* <header className="sticky top-0 z-10 bg-white border-b px-8 py-5"> */}

        <h1 className="text-3xl font-bold">

            {current.title}

        </h1>

        <p className="text-gray-500 mt-1">

            {current.subtitle}

        </p>

    </header>

);

}

export default Header;