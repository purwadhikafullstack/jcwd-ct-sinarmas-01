import { useInView } from "react-intersection-observer";
import Loading from "./Loading";
import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Item from "./Item";
import { Button } from "react-daisyui";
import Error from "@/pages/error/Error";

export default function InfScroll(props) {
  const { inView, ref } = useInView();
  const { queryFn } = props;

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
    queryFn: async ({ pageParam = 1 }) => await queryFn(pageParam),
    queryKey: ["products"],
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  useEffect(() => {
    if (inView) 
      fetchNextPage();
  }, [inView, fetchNextPage]);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error message={error.message} />
  ) : (
    <>
      {data && data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group?.rows?.map((value, key) => (
            <Item key={key} {...value} />
          ))}
        </Fragment>
      ))}
      <div className="my-3">
        <Button
          fullWidth
          onClick={fetchNextPage}
          color="info"
          ref={ref}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading ..."
            : hasNextPage
            ? "Load more"
            : "End of Data"}
        </Button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
}
