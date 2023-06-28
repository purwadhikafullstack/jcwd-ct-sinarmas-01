import { Button } from "react-daisyui"
import { removeToken } from "@/api/token";
import { useNavigate } from "react-router-dom";
import Swal from "./Swal";

export default function LogoutBtn() {
  const navigate = useNavigate();
  const logout = () => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then (res => {
      if(res.isConfirmed) {
        removeToken();
        navigate("/");
      }
    })
  }
  return (
    <Button color="error" onClick={logout} fullWidth>Logout</Button>
  )
}