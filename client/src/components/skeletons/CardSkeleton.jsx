function CardSkeleton() {
    return (
        <div className="bg-white rounded-xl shadow p-6 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>

            <div className="h-10 w-20 bg-gray-200 rounded mt-4"></div>
        </div>
    );
}

export default CardSkeleton;