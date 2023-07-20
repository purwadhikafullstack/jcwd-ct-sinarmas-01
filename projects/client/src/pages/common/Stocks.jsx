import Loading from "@/components/Loading";
import StockItem from "@/components/StockItem";
import useStock from "@/hooks/queries/admin/useStock"
import { Button } from "react-daisyui";
import Error from "../error/Error";

export default function Stocks (props) {
  const { data, error, fetchNextPage, hasNextPage, isError, isFetching, isFetchingNextPage } = useStock();
  return (
    <div className="p-5">
      <div className="text-center text-3xl font-extrabold mb-6">
        Stocks
      </div>
      {isFetching && <Loading />}
      {isError && <Error error={error} />}
      {data && data.pages?.map((val, key) => (
        <div key={key}>
          {val.rows?.map((item, ind) => (
            <StockItem stock={item} key={ind} />
          ))}
        </div>
      ))}
      <Button
        color="info"
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
        fullWidth
      >
        {hasNextPage
        ? "Load More"
        : isFetchingNextPage
        ? "Loading..."
        : "End"}
      </Button>
    </div>
  )
}