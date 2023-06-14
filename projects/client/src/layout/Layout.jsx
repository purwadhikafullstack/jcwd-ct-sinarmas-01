import React from "react";
import NavComponents from "@/components/Navbar";
import FooterComponents from "@/components/Footer";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
  return (
    <div className="w-full">
      <NavComponents />
      <div className="text-center p-5 mb-5">
        <Outlet />
      </div>
      <FooterComponents />
    </div>
  );
};

export default Layout;
