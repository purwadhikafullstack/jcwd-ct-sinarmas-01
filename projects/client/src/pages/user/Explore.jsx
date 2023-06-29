import InfScroll from "@/components/InfScroll";
import { getProducts } from "@/api/common";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "@/layout/Layout";
import { getToken } from "@/api/token";

export default function Explore () {
  const token = getToken();
  return (
    <>
      <Layout>
        {token ? (
          <>
            <Outlet />
            <InfScroll queryFn={getProducts} />
          </>
        ) : <Navigate to="/" replace />}
      </Layout>
    </>
  )
}