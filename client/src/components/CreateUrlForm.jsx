import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createShortUrl } from "../api/urlApi";

function CreateUrlForm() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [createdUrl, setCreatedUrl] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createShortUrl,

    onSuccess: (data) => {
      toast.success("Short URL created!");

      setCreatedUrl(data);

      setTimeout(() => {
        setCreatedUrl(null);
      }, 5000);

      setOriginalUrl("");

      queryClient.invalidateQueries({
        queryKey: ["urls"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["dashboard"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    },
  });

  function copyShortUrl() {
    navigator.clipboard.writeText(createdUrl.shortUrl);

    toast.success("Copied!");
  }

  function handleSubmit(e) {
    e.preventDefault();

    mutation.mutate(originalUrl.trim());
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex gap-3"
      >
        <input
          type="url"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 border rounded-lg p-3"
          required
        />

        <button
          className="bg-blue-600 text-white px-6 rounded-lg"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      {createdUrl && (
        <div className="mt-6 border rounded-xl p-4 bg-green-50">
          <p className="font-semibold mb-2">
            Short URL Created
          </p>

          <div className="flex items-center justify-between gap-3">
            <a
              href={createdUrl.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {createdUrl.shortUrl}
            </a>

            <button
              type="button"
              onClick={copyShortUrl}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateUrlForm;