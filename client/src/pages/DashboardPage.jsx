import StatCard from "../components/StatCard";
import { useDashboard } from "../hooks/useDashboard";
import Loader from "../components/Loader";
import { formatDate } from "../utils/formatDate";
import DashboardSkeleton from "../components/skeletons/DashboardSkeleton";

function DashboardPage() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load dashboard
        </h2>

        <p className="text-red-500 mt-2">
          Please refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Total URLs" value={data.totalUrls} />
        <StatCard title="Total Clicks" value={data.totalClicks} />
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Most Clicked URL</h2>

          <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
            Top Performer
          </span>
        </div>
        {data.mostClickedUrl ? (
          <>
            <a
              href={data.mostClickedUrl.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline break-all"
            >
              {data.mostClickedUrl.originalUrl}
            </a>
            <p className="text-gray-500 mt-2">
              Clicks: {data.mostClickedUrl.clicks}
            </p>
          </>
        ) : (
          <p className="text-gray-500">No URLs available.</p>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent URLs</h2>
        {data.recentUrls.length === 0 ? (
          <p className="text-gray-500">No URLs created yet.</p>
        ) : (
          <div className="max-h-72 overflow-y-auto pr-2">
            <ul className="space-y-2">
              {data.recentUrls.map((url) => (
                <li key={url.id} className="border-b last:border-b-0 pb-3">
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all font-medium"
                  >
                    {url.originalUrl}
                  </a>

                  <p className="text-gray-500 mt-2 text-sm">
                    Created: {formatDate(url.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
