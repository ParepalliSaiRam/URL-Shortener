function Loader({ rows = 5 }) {

    return (

        <div className="animate-pulse space-y-4">

            {Array.from({ length: rows }).map((_, index) => (

                <div
                    key={index}
                    className="h-12 bg-gray-200 rounded-lg"
                />

            ))}

        </div>

    );

}

export default Loader;