import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import 'animate.css';
import Home from "./pages/Home";
import MainAdmin from './pages/admin/Main';
import ManageUser from './pages/admin/ManageUser';
import Warehouses from './pages/admin/Warehouses';
import Layout from "./layout/Layout";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import { Routes, Route } from "react-router-dom";
import Error404 from "./pages/error/Error404";

function App() {
  const settings = {
    networkMode: "always",
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: settings,
      queries: settings,
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/super" element={<Layout />}>
          <Route path="" element={<MainAdmin />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="warehouses" element={<Warehouses />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
