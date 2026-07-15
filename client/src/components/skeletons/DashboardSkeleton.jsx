import CardSkeleton from "./CardSkeleton";

function DashboardSkeleton() {
    return (
        <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <CardSkeleton />
                <CardSkeleton />

            </div>

            <div className="bg-white rounded-xl shadow p-6 animate-pulse h-40"></div>

            <div className="bg-white rounded-xl shadow p-6 animate-pulse h-72"></div>

        </div>
    );
}

export default DashboardSkeleton;