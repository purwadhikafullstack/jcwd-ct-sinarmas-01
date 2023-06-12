import React from "react";
import NavComponents from "../components/Navbar";
import FooterComponents from "../components/Footer";
import { Outlet } from "react-router-dom";
const Layout = (props) => {
  return (
    <div className="w-full">
      <NavComponents />
      <div className="p-5 mb-5">
        {props.children}
        <Outlet />
      </div>
      <FooterComponents />
    </div>
  );
};

export default Layout;
