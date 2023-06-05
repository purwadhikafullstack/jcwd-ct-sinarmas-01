import React from "react";
import NavComponents from "../components/Navbar";
import FooterComponents from "../components/Footer";
const Layout = (props) => {
  return (
    <>
      <NavComponents />
      {props.children}
      <FooterComponents />
    </>
  );
};

export default Layout;
