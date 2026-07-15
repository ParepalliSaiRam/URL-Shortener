import StatCard from "../components/StatCard";
import { useDashboard } from "../hooks/useDashboard";

function DashboardPage() {
    const {
        data,
        isLoading,
        error,
    } = useDashboard();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading dashboard.</p>;
    }

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    title="Total URLs"
                    value={data.totalUrls}
                />
                <StatCard
                    title="Total Clicks"
                    value={data.totalClicks}
                />
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Most Clicked URL
                </h2>
                {data.mostClickedUrl ? (
                    <>
                        <p className="font-medium">
                            {data.mostClickedUrl.originalUrl}
                        </p>
                        <p className="text-gray-500 mt-2">
                            Clicks: {data.mostClickedUrl.clicks}
                        </p>
                    </>
                ) : (
                    <p className="text-gray-500">
                        No URLs available.
                    </p>
                )}
            </div>
            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Recent URLs
                </h2>
                {data.recentUrls.length === 0 ? (
                    <p className="text-gray-500">
                        No URLs created yet.
                    </p>
                ) : (
                    <ul className="space-y-2">
                        {data.recentUrls.map((url) => (
                            <li
                                key={url.id}
                                className="border-b pb-2"
                            >
                                {url.originalUrl}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

}

export default DashboardPage;