import { Button, Card } from "react-daisyui";
import { removeToken, getEmail } from "@/api/token";
import { useNavigate } from "react-router-dom";

export default function ProfileCard () {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/");
  }
  return (
    <Card className="mx-5 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">
          <b>{getEmail()}</b>
        </Card.Title>
        <div className="flex flex-wrap gap-2">
          <Button onClick={logout} fullWidth>Logout</Button>
        </div>
      </Card.Body>
    </Card>
  )
}