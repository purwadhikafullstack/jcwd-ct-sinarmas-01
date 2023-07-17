import OrderItem from "@/components/OrderItem";
import useOrderList from "@/hooks/queries/admin/useOrderList"
import { Button } from "react-daisyui";
import Error from "../error/Error";

export default function Orders () {
  const { isFetching, isFetchingNextPage, isError, error, hasNextPage, data, fetchNextPage } = useOrderList();
  return (
    <>
      <h1 className="text-center text-3xl font-extrabold mb-6">
        Orders List
      </h1>
      <div className="p-5">
        {isError && <Error message={error} />}
        {!isFetching && !isError && data.pages?.map((group) => {
          return group.rows?.map((value, key) => ( 
            <OrderItem
              key={key}
              username={value.user?.username}
              id={value.id}
              status={value.status}
              proof={value.payment_proof}
              total={value.checkout.total_price}
            />
          ))
        })}
        <Button fullWidth onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} className="mt-5">
          {
            isFetchingNextPage 
            ? "Loading..."
            : hasNextPage
            ? "Load more..."
            : "End"
          }
        </Button>
      </div>
    </>
  )
}