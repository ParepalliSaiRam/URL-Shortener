import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createShortUrl } from "../api/urlApi";

function CreateUrlForm() {

    const [originalUrl, setOriginalUrl] = useState("");

    const queryClient = useQueryClient();

    const mutation = useMutation({

        mutationFn: createShortUrl,

        onSuccess: () => {

            toast.success("Short URL created!");

            setOriginalUrl("");

            queryClient.invalidateQueries({
                queryKey: ["urls"],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

        },

        onError: (error) => {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        },

    });

    function handleSubmit(e) {

        e.preventDefault();

        mutation.mutate(originalUrl);

    }

    return (

        <form
            onSubmit={handleSubmit}
            className="flex gap-3"
        >

            <input
                type="url"
                value={originalUrl}
                onChange={(e) =>
                    setOriginalUrl(e.target.value)
                }
                placeholder="https://example.com"
                className="flex-1 border rounded-lg p-3"
                required
            />

            <button
                className="bg-blue-600 text-white px-6 rounded-lg"
                disabled={mutation.isPending}
            >
                {
                    mutation.isPending
                        ? "Creating..."
                        : "Create"
                }
            </button>

        </form>

    );

}

export default CreateUrlForm;