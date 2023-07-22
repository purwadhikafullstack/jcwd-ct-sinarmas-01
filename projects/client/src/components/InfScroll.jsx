import Loading from "./Loading";
import { Fragment, useEffect, useState } from "react";
import Item from "./Item";
import { Button, Select } from "react-daisyui";
import Error from "@/pages/error/Error";
import useInfProducts from "@/hooks/queries/common/useInfProducts";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getCategories } from "@/api/common";

export default function InfScroll(props) {
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState({});
  const [sort, setSort] = useState("ASC");
  const toggleSort = () => setSort(s => s === "ASC" ? "DESC" : "ASC");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError
  } = useInfProducts(filter, sort);

  useEffect(() => {
    (async () => {
      const ct = await getCategories(0);
      setCategories(ct);
    })();
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-5 mb-5">
        <Button onClick={toggleSort} endIcon={sort === "ASC" ? <FaChevronUp /> : <FaChevronDown />}>
          Sort
        </Button>
        <div>
          <Select onChange={(e) => setFilter(e.target.value)}>
            <Select.Option value="" key={-1}>All</Select.Option>
            {categories.rows?.map((val, key) => <Select.Option value={val.id} key={key}>{val.category_name}</Select.Option>)}
          </Select>
        </div>
      </div>
      {isFetching && <Loading />}
      {isError && <Error message={error} />}
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
