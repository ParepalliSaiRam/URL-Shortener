import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function AnalyticsChart({ data }) {

    const chartData = data.map((url) => ({
        name:
            url.originalUrl.length > 25
                ? url.originalUrl.substring(0, 25) + "..."
                : url.originalUrl,
        clicks: url.clicks,
    }));

    return (
        <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
                Click Distribution
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <BarChart data={chartData}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="clicks"
                        radius={[5, 5, 0, 0]}
                    />

                </BarChart>
            </ResponsiveContainer>

        </div>
    );
}

export default AnalyticsChart;