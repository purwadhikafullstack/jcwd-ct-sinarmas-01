import InfScroll from "@/components/InfScroll";
import { getProducts } from "@/api/common";

export default function Explore () {
  return <InfScroll queryFn={getProducts} />
}