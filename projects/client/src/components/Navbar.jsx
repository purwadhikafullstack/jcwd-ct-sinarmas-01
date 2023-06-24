import {
  Navbar,
  Button
} from "react-daisyui";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import DarkButton from "@/components/DarkButton";
import { getRole, getToken } from "@/api/token";
export default function NavComponents() {
  const navigate = useNavigate();
  const role = getToken() ? getRole().toLowerCase() : "";
  return (
    <Navbar className='bg-base-300 py-3 px-1'>
      <Navbar.Start>
        <Link to="/" className="p-4">
          Multi-warehouse shop
        </Link>
      </Navbar.Start>
      <Navbar.End className="gap-1">
        <DarkButton />
        <Button
          onClick={() => navigate(`/${role || "register"}`)}
          shape="circle"
          color="ghost">
          <FaUserCircle />
        </Button>
      </Navbar.End>
    </Navbar>
  );
}
