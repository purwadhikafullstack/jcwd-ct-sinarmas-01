import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Navbar, Drawer } from "react-daisyui";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import AdminMenu from "./components/menu/Admin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [message, setMessage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const settings = {
    networkMode: "always"
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: settings,
      queries: settings
    }
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);

  const toggleDrawer = () => setOpenDrawer(open => !open);
  const closeMenu = () => setOpenDrawer(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Drawer open={openDrawer} onClickOverlay={closeMenu} mobile side={<AdminMenu />}>
        <Navbar className="p-6 bg-base-300">
          <Navbar.Start>
            {/* memberi className="lg:hidden" agar tombol menu tidak muncul di layar besar */}
            <Button color="ghost" onClick={toggleDrawer} className="lg:hidden">
              <FaBars />
            </Button>
            <h1 className="text-xl font-bold">
              {message}
            </h1>
          </Navbar.Start>
        </Navbar>
        <div className="p-5">
          <Outlet />
        </div>
      </Drawer>
    </QueryClientProvider>
  );
}

export default App;
