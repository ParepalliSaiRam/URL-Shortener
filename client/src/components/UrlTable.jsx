import { Copy, Check, Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";

function UrlTable({ urls, onDelete }) {
    const [copiedId, setCopiedId] = useState(null);

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

            <div className="text-center py-10">

                <h2 className="text-xl font-semibold">

                    No URLs yet

                </h2>

                <p className="text-gray-500">

                    Create your first short URL.

                </p>

            </div>

        );

    }

    return (

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

                    const shortUrl =
                        `http://localhost:3000/${url.shortCode}`;

                    return (

                        <tr
                            key={url.id}
                            className="border-t"
                        >

                            <td className="p-3 max-w-sm truncate">

                                {url.originalUrl}

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

                                {url.clicks}

                            </td>

                            <td className="text-center">

                                {new Date(
                                    url.createdAt
                                ).toLocaleDateString()}

                            </td>

                            <td>

                                <div className="flex justify-center gap-3">

                                    <button
                                        onClick={() =>
                                            copyToClipboard(url.id, shortUrl)
                                        }
                                    >

                                        {copiedId === url.id ? (
                                            <Check size={18} />
                                        ) : (
                                            <Copy size={18} />
                                        )}

                                    </button>

                                    <button
                                        onClick={() => {
                                            const confirmed = window.confirm(
                                                "Are you sure you want to delete this URL?"
                                            );
                                            if (confirmed) {
                                                onDelete(url.id);
                                            }
                                        }}
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

    );

}

export default UrlTable;