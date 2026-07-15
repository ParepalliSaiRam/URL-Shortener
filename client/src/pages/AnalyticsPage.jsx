import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "../api/urlApi";
import AnalyticsChart from "../components/AnalyticsChart";

function AnalyticsPage() {

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["analytics"],
        queryFn: getAnalytics,
    });

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading analytics.</p>;
    }

    return (
        <div>

            <h1 className="text-3xl font-bold mb-6">
                Analytics
            </h1>

            <div className="bg-white rounded-xl shadow">

                <AnalyticsChart data={data} />
                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Original URL
                            </th>

                            <th className="p-4 text-center">
                                Clicks
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {data.map((url) => (

                            <tr
                                key={url.id}
                                className="border-t"
                            >

                                <td className="p-4">
                                    {url.originalUrl}
                                </td>

                                <td className="text-center">
                                    {url.clicks}
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