import Loading from "./Loading";
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Item from "./Item";
import { Button } from "react-daisyui";
import Error from "@/pages/error/Error";

export default function InfScroll(props) {
  const { queryFn, queryKey } = props;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryFn: async ({ pageParam = 1 }) => await (queryFn)(pageParam),
    queryKey: [queryKey],
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error message={error.message} />
  ) : (
    <>
      <div className="grid md:grid-cols-2 cols-auto max-w-full gap-3">
        {data && data?.pages?.map((group, i) => (
          <Fragment key={i}>
            {group?.rows?.map((value, key) => (
              <Item key={key} {...value} />
            ))}
          </Fragment>
        ))}
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
      <div className="my-3">
        <Button
          fullWidth
          onClick={fetchNextPage}
          color="info"
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading ..."
            : hasNextPage
            ? "Load more"
            : "End of Data"}
        </Button>
      </div>
    </>
  );
}
