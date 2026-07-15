import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UrlTable from "../components/UrlTable";
import { getUserUrls, deleteUrl } from "../api/urlApi";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Loader from "../components/Loader";

function MyUrlsPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("newest");

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: ["urls", page, search, sort],
        queryFn: () =>
            getUserUrls({
                page,
                limit: 10,
                search,
                sort,
            }),
    });

    const deleteMutation = useMutation({

        mutationFn: deleteUrl,

        onSuccess: () => {

            toast.success("URL deleted.");

            queryClient.invalidateQueries({
                queryKey: ["urls", page, search, sort],
            });

            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });

        },

    });

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <SearchBar
                value={search}
                onChange={setSearch}
            />

            <select
                value={sort}
                onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1);
                }}
                className="border rounded-lg p-2"
            >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="clicks">Most Clicked</option>
            </select>

            <UrlTable
                urls={data?.urls || []}
                onDelete={(id) => deleteMutation.mutate(id)}
            />
        </>
    );
}

export default MyUrlsPage;