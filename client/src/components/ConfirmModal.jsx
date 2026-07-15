function ConfirmModal({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
}) {

    if (!isOpen) return null;

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

                <h2 className="text-xl font-bold">
                    {title}
                </h2>

                <p className="text-gray-600 mt-3">
                    {message}
                </p>

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-lg border hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default ConfirmModal;