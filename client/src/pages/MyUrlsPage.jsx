import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UrlTable from "../components/UrlTable";
import { getUserUrls, deleteUrl } from "../api/urlApi";
import CreateUrlForm from "../components/CreateUrlForm";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import TableSkeleton from "../components/skeletons/TableSkeleton";

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
    return <TableSkeleton />;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Create Short URL</h2>

        <CreateUrlForm />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="w-full md:w-2/3">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg p-3 w-full md:w-52"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="clicks">Most Clicked</option>
        </select>
      </div>
      <p className="text-sm text-gray-500 mb-3">
        Showing {data.urls.length} of {data.total} URLs
      </p>
      <UrlTable urls={data.urls} onDelete={(id) => deleteMutation.mutate(id)} />
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export default MyUrlsPage;
