import useStockRequests from "@/hooks/queries/common/useStockRequests";
import RequestItem from "@/components/RequestItem";
import Loading from "@/components/Loading";
import Error from "../error/Error";
import { Button } from "react-daisyui";

export default function StockMutations() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isError,
    error,
  } = useStockRequests();
  return (
    <div className="p-4">
      <div className="text-center text-3xl font-extrabold mb-5">
        Stock Mutations
      </div>
      {isFetching && <Loading />}
      {isError && <Error message={error} />}
      {data &&
        data.pages?.map((group) =>
          group.rows?.map((val, key) => (
            <RequestItem key={key} mutation={val} />
          ))
        )}
      <Button
        type="button"
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        fullWidth
      >
        {hasNextPage ? "Load More" : isFetchingNextPage ? "Loading..." : "End"}
      </Button>
    </div>
  );
}
