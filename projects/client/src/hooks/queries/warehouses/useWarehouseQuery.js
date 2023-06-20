import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getWarehouses } from "@/api/common";

export default function useWarehouseQuery () {
	const [page, setPage] = useState(1);
	const { data, isError, isLoading } = useQuery({
		queryFn: async () => await getWarehouses(page),
		queryKey: ["warehouses", page]
	});
	const nextPage = () => (page < data.pages) && setPage(page => page + 1);
	const prevPage = () => (page > 1) && setPage(page => page - 1);
	const goToPage = (id) => ((id > 0 && id <= data.pages) && setPage(id));
	const pagesCount = data?.pages;

	return {
		nextPage,
		prevPage,
		goToPage,
		data,
		isError,
		isLoading,
		page,
		pagesCount
	}
}