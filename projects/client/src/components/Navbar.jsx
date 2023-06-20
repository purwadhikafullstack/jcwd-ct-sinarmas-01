import {
  Navbar,
  Button,
  Dropdown,
  Indicator,
  Badge,
} from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import DarkButton from "@/components/DarkButton";
export default function NavComponents() {
  const navigate = useNavigate();
  return (
    <Navbar className='bg-base-300 py-3 px-1'>
      <Navbar.Start>
        <Button
          onClick={() => navigate("/")}
          className='upper-case'
          color='ghost'>
          Multi-Warehouse E-commerce
        </Button>
      </Navbar.Start>
      <Navbar.End className="gap-1">
        <DarkButton />
        <Button
          onClick={() => navigate("/register")}
          shape="circle"
          color="ghost">
          <FaUserCircle />
        </Button>
      </Navbar.End>
    </Navbar>
  );
}
