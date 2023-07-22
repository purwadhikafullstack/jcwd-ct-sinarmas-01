import JournalItem from "@/components/JournalItem";
import useJournals from "@/hooks/queries/super/useJournals";
import { useState } from "react";
import { Button, Select } from "react-daisyui";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Error from "../error/Error";
import Loading from "@/components/Loading";
import NoContent from "@/components/NoContent";

export default function Journals () {
  const [sort, setSort] = useState("ASC");
  const [filter, setFilter] = useState("1");
  const { data, fetchNextPage, isError, isFetching, isFetchingNextPage, hasNextPage, error } = useJournals(sort, filter);

  const toggleSort = () => setSort(sort => sort === "ASC" ? "DESC" : "ASC");
  const changeFilter = (id) => setFilter(id);

  return (
    <div className="p-4">
      <div className="text-center font-extrabold text-3xl mb-5">
        Stock Journals List
      </div>
      <div className="flex justify-center items-center gap-3 mb-5">
        <Button onClick={toggleSort} endIcon={sort === "ASC" ? <FaChevronUp /> : <FaChevronDown />}>
          Sort
        </Button>
        <div>
          Remark Type : {" "}
          <Select onChange={(e) => changeFilter(e.target.value)}>
            <Select.Option value="">All</Select.Option>
            <Select.Option value="1">Stock Warehouse</Select.Option>
            <Select.Option value="2">Checkout</Select.Option>
            <Select.Option value="3">Stock Mutation</Select.Option>
          </Select>
        </div>
      </div>
      {isError && <Error message={error} />}
      {isFetching && <Loading />}
      {data && !data.pages[0]?.rows?.length && <NoContent />}
      {data && data.pages?.map(group => (
        group.rows?.map((val, key) => <JournalItem journal={val} key={key} />)
      ))}
      <Button onClick={fetchNextPage} fullWidth disabled={!hasNextPage || isFetchingNextPage}>
        {
          hasNextPage
          ? "Load More"
          : isFetchingNextPage
          ? "Loading..."
          : "End"
        }
      </Button>
    </div>
  )
}