import { useQuery } from "@tanstack/react-query";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

import { getDashboard } from "../api/urlApi";

function DashboardPage() {

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading dashboard.</p>;
    }

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-gray-100 min-h-screen">

                <Header />

                <main className="p-8">

                    <div className="grid grid-cols-2 gap-6">

                        <StatCard
                            title="Total URLs"
                            value={data.totalUrls}
                        />

                        <StatCard
                            title="Total Clicks"
                            value={data.totalClicks}
                        />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default DashboardPage;