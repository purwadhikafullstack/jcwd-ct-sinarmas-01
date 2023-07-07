import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/error/Error404";
import { lazy } from "react";
import Suspense from "./components/Suspensed";
import Detail from "./pages/user/Detail";
import Home from "./pages/Home";

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
const Explore = lazy(() => import("./pages/user/Explore"));
const MyCart = lazy(() => import("./pages/user/MyCart"));
const Address = lazy(() => import("./pages/user/Address"));

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
          <Route index element={<Home />} />
          <Route path="register" element={<Suspense><Register/></Suspense>} />
          <Route path="login" element={<Suspense><Login /></Suspense>} />
          <Route path="forgot" element={<Suspense><Forgot /></Suspense>} />
          <Route path="account/:mode/:token" element={<Suspense><Reset /></Suspense>} />
        </Route>
        <Route path="/super" element={<Layout role="super" />}>
          <Route index element={<Suspense><Super /></Suspense>} />
          <Route path="users" element={<Suspense><ManageUser /></Suspense>} />
          <Route path="warehouses" element={<Suspense><ManageWarehouses /></Suspense>} />
          <Route path="products" element={<Suspense><ManageProducts /></Suspense>} />
        </Route>
        <Route path="/admin" element={<Layout role="admin" />}>
          <Route index element={<Suspense><Admin /></Suspense>} />
        </Route>
        <Route path="/user" element={<Layout role="user" />}>
          <Route index element={<Suspense><UserPage /></Suspense>} />
          <Route path="cart" element={<Suspense><MyCart /></Suspense>} />
          <Route path="address" element={<Suspense><Address /></Suspense>} />
        </Route>
        <Route path="/explore" element={<Layout />}>
          <Route index element={<Suspense><Explore /></Suspense>}/>
          <Route path="detail/:id" element={<Detail />} /> 
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
