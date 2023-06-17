import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainAdmin from './pages/super/Main';
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/error/Error404";
import Swal from "@/components/Swal";
import { lazy } from "react";
import Suspensed from "./components/Suspensed";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/common/Register"));
const Login = lazy(() => import("./pages/common/Login"));
const ManageUser = lazy(() => import("./pages/super/ManageUser"));
const ManageWarehouses = lazy(() => import("./pages/super/Warehouses"));

function App() {
  const settings = {
    networkMode: "always",
  };
  const mutateConfig = {
    ...settings,
    onError: (err) => {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || err.message,
        icon: "error"
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: data.message || "Action Success",
        icon: "success"
      });
    }
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: mutateConfig,
      queries: settings,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Suspensed><Home /></Suspensed>} />
          <Route path="register" element={<Suspensed><Register/></Suspensed>} />
          <Route path="login" element={<Suspensed><Login /></Suspensed>} />
        </Route>
        <Route path="/super" element={<Layout />}>
          <Route index element={<MainAdmin />} />
          <Route path="users" element={<Suspensed><ManageUser /></Suspensed>} />
          <Route path="warehouses" element={<Suspensed><ManageWarehouses /></Suspensed>} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
