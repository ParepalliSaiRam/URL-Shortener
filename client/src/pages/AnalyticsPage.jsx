import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/urlApi";
import AnalyticsChart from "../components/AnalyticsChart";
import Loader from "../components/Loader";
import TableSkeleton from "../components/skeletons/TableSkeleton";

function AnalyticsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load analytics
        </h2>

        <p className="text-red-500 mt-2">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-semibold">No Analytics Yet</h2>

        <p className="text-gray-500 mt-2">
          Create and use some short URLs to see analytics here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow">
        <div className="p-6">
          <AnalyticsChart data={data} />
        </div>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Original URL</th>

              <th className="p-4 text-center">Clicks</th>
            </tr>
          </thead>

          <tbody>
            {data.map((url) => (
              <tr key={url.id} className="border-t">
                <td className="p-4">
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {url.originalUrl}
                  </a>
                </td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      url.clicks >= 20
                        ? "bg-green-100 text-green-700"
                        : url.clicks >= 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {url.clicks}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AnalyticsPage;
