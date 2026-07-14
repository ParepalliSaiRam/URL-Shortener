import { useState } from "react";

function CreateUrlForm() {

    const [url, setUrl] = useState("");

    return (

        <form className="flex gap-3">

            <input
                className="border rounded-lg p-2 flex-1"
                placeholder="Paste URL..."
                value={url}
                onChange={(e) =>
                    setUrl(e.target.value)
                }
            />

            <button
                className="bg-blue-600 text-white px-5 rounded-lg"
            >
                Create
            </button>

        </form>

    );

}

export default CreateUrlForm;