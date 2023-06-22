import NavComponents from "@/components/Navbar";
import FooterComponents from "@/components/Footer";
import { Outlet, Navigate } from "react-router-dom";
import { decodeToken } from "@/api/token";

function Layout (props) {
  const { role } = props;
  const token = decodeToken();
  const myrole = !token.role ? "" : token.role.toLowerCase();

  return (
    <div className="w-full">
      <NavComponents />
      <div className="text-center p-5 mb-5">
        {
          !role ? 
            <Outlet /> :
            ((role === myrole) ? <Outlet /> : <Navigate to={`/${myrole}`} replace />)
        }
      </div>
      <FooterComponents />
    </div>
  );
}

export default Layout;
