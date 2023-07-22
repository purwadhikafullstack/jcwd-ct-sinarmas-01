import InfScroll from "@/components/InfScroll";
import { getProducts } from "@/api/common";
import { Navigate } from "react-router-dom";
import { getToken } from "@/api/token";

export default function Explore() {
  const token = getToken();
  return (
    <>
      {token ? (
        <InfScroll queryFn={getProducts} queryKey="products" />
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}
