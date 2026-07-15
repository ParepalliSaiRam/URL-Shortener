import { Link2, MousePointerClick } from "lucide-react";

function StatCard({ title, value }) {
        const Icon =
        title === "Total URLs"
            ? Link2
            : MousePointerClick;
    return (

    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-200">

        <div className="flex items-center justify-between">

            <div>

                <p className="text-gray-500 text-sm font-medium">
                    {title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                    {value}
                </h2>

            </div>

            <div className="bg-blue-100 p-3 rounded-full">

                <Icon
                    size={28}
                    className="text-blue-600"
                />

            </div>

        </div>

    </div>

);
}

export default StatCard;