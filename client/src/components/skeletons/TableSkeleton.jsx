function TableSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow p-6 animate-pulse">

            {[...Array(6)].map((_, index) => (

                <div
                    key={index}
                    className="h-12 bg-gray-200 rounded mb-3"
                />

            ))}

        </div>
    );
}

export default TableSkeleton;