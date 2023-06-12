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
          <Route path="/admin" element={<MainAdmin />} />
          <Route path="/admin/users" element={<ManageUser />} />
          <Route path="/admin/warehouses" element={<Warehouses />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
