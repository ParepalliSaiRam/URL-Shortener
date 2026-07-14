const { data, isLoading } = useQuery({

    queryKey: ["urls"],

    queryFn: () =>
        getUserUrls({
            page: 1,
            limit: 10,
        }),

});