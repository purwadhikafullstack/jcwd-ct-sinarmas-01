import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/error/Error404";
import { lazy } from "react";
import Suspensed from "./components/Suspensed";

const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/common/Register"));
const Login = lazy(() => import("./pages/common/Login"));
const ManageUser = lazy(() => import("./pages/super/ManageUser"));
const ManageWarehouses = lazy(() => import("./pages/super/Warehouses"));
const Forgot = lazy(() => import("./pages/common/Forgot"));
const Reset = lazy(() => import("./pages/common/Reset"));
const Super = lazy(() => import("./pages/super/Super"));
const Admin = lazy(() => import("./pages/admin/Admin"));
const ManageProducts = lazy(() => import("./pages/super/Products"));
const UserPage = lazy(() => import("./pages/user/User"));

function App() {
  const settings = {
    networkMode: "always",
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: settings,
      queries: settings
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout role="" />}>
          <Route index element={<Suspensed><Home /></Suspensed>} />
          <Route path="register" element={<Suspensed><Register/></Suspensed>} />
          <Route path="login" element={<Suspensed><Login /></Suspensed>} />
          <Route path="forgot" element={<Suspensed><Forgot /></Suspensed>} />
          <Route path="account/:mode/:token" element={<Suspensed><Reset /></Suspensed>} />
        </Route>
        <Route path="/super" element={<Layout role="super" />}>
          <Route index element={<Suspensed><Super /></Suspensed>} />
          <Route path="users" element={<Suspensed><ManageUser /></Suspensed>} />
          <Route path="warehouses" element={<Suspensed><ManageWarehouses /></Suspensed>} />
          <Route path="products" element={<Suspensed><ManageProducts /></Suspensed>} />
        </Route>
        <Route path="/admin" element={<Layout role="admin" />}>
          <Route index element={<Suspensed><Admin /></Suspensed>} />
        </Route>
        <Route path="/user" element={<Layout role="user" />}>
          <Route index element={<Suspensed><UserPage /></Suspensed>} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
