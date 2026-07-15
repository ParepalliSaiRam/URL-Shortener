import { Copy, Check, Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { formatDate } from "../utils/formatDate";
import ConfirmModal from "./ConfirmModal";

function UrlTable({ urls, onDelete }) {
  const [copiedId, setCopiedId] = useState(null);
  const [selectedUrl, setSelectedUrl] = useState(null);

  function copyToClipboard(id, shortUrl) {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  }

  if (urls.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        <h2 className="text-2xl font-semibold">No URLs Yet</h2>

        <p className="text-gray-500 mt-2">
          Create your first short URL using the form above.
        </p>
      </div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Original URL</th>
            <th className="p-3 text-left">Short URL</th>
            <th className="p-3">Clicks</th>
            <th className="p-3">Created</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => {
            const shortUrl = `${import.meta.env.VITE_API_URL}/${url.shortCode}`;
            return (
              <tr key={url.id} className="border-t">
                <td className="p-3 max-w-sm">
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    {url.originalUrl}
                    <ExternalLink size={14} />
                  </a>
                </td>
                <td className="p-3">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    {url.shortCode}
                    <ExternalLink size={16} />
                  </a>
                </td>
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      url.clicks >= 20
                        ? "bg-green-100 text-green-700"
                        : url.clicks >= 5
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {url.clicks}
                  </span>
                </td>
                <td className="text-center">{formatDate(url.createdAt)}</td>
                <td>
                  <div className="flex justify-center gap-3">
                    <button
                      aria-label="Copy short URL"
                      onClick={() => copyToClipboard(url.id, shortUrl)}
                      className="p-2 rounded hover:bg-gray-100 transition"
                    >
                      {copiedId === url.id ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    <button
                      className="p-2 rounded hover:bg-red-100 text-red-600 transition"
                      aria-label="Delete URL"
                      onClick={() => setSelectedUrl(url)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ConfirmModal
        isOpen={selectedUrl !== null}
        title="Delete URL"
        message="Are you sure you want to delete this URL? This action cannot be undone."
        onCancel={() => setSelectedUrl(null)}
        onConfirm={() => {
          onDelete(selectedUrl.id);
          setSelectedUrl(null);
        }}
      />
    </div>
  );
}

export default UrlTable;
