import { Button, Card } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "@/components/LogoutBtn";

export default function User () {
  const navigate = useNavigate();
  return (
    <>
      <Card className="mx-5">
        <Card.Body>
          <Card.Title>
            User Menu
          </Card.Title>
          <div className="flex flex-wrap gap-3">
            <LogoutBtn />
            <Button onClick={() => navigate("explore")} fullWidth>
              Explore Shop
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}