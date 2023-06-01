import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Navbar, Drawer } from "react-daisyui";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import AdminMenu from "./components/menu/Admin";

function App() {
  const [message, setMessage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      );
      setMessage(data?.message || "");
    })();
  }, []);
  return (
    <Drawer open={openDrawer} mobile side={<AdminMenu />}>
      <Navbar className="p-5 bg-base-300">
        <Navbar.Start>
          <h1 className="text-xl font-bold">
            {message}
          </h1>
        </Navbar.Start>
        <Navbar.End>
          <Button color="ghost">
            <FaBars />
          </Button>
        </Navbar.End>
      </Navbar>
      <div className="p-5">
        <Outlet />
      </div>
    </Drawer>
  );
}

export default App;
