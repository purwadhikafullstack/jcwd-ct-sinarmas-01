import NoContent from "@/components/NoContent";
import OrderItem from "@/components/OrderItem";
import useOrderList from "@/hooks/queries/admin/useOrderList"
import { Button, Select } from "react-daisyui";
import Error from "../error/Error";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { useState } from "react";
import Loading from "@/components/Loading";

export default function Orders (props) {
  const [desc, setDesc] = useState("");
  const [filter, setFilter] = useState("");
  const { isFetching, isFetchingNextPage, isError, error, hasNextPage, data, fetchNextPage } = useOrderList(desc, filter);
  const toggleDesc = () => setDesc(des => !des ? "1" : "");

  return (
    <>
      <h1 className="text-center text-3xl font-extrabold mb-6">
        Orders List
      </h1>
      <div className="p-5">
        <div className="flex gap-3 justify-center items-center mb-4">
          <Button onClick={toggleDesc} endIcon={desc ? <FaSortDown /> : <FaSortUp />}>
            Sort
          </Button>
          <Select onChange={(e) => setFilter(e.target.value)}>
            <Select.Option value="">All</Select.Option>
            <Select.Option value="On Delivery">On Delivery</Select.Option>
            <Select.Option value="Pending">Pending</Select.Option>
            <Select.Option value="Rejected">Rejected</Select.Option>
          </Select>
        </div>
        {isError && <Error message={error} />}
        {isFetching && <Loading />}
        {!isFetching && !isError && data.pages?.map((group) => {
          return group.rows?.map((value, key) => ( 
            <OrderItem
              key={key}
              username={value.user?.username}
              id={value.id}
              status={value.status}
              proof={value.payment_proof}
              total={value.checkout?.total_price}
              isCompleted={value.isCompleted}
              showActions={props.showActions}
              checkout={value.checkout}
            />
          ))
        })}
        {!isFetching && !data.pages[0]?.rows?.length && <NoContent />}
        <Button fullWidth onClick={fetchNextPage} disabled={!hasNextPage || isFetchingNextPage} className="mt-5">
          {isFetchingNextPage 
            ? "Loading..."
            : hasNextPage
            ? "Load more..."
            : "End"}
        </Button>
      </div>
    </>
  )
}