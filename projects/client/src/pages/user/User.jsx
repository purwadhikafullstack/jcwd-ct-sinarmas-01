import { Button, Card } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import ProfileCard from "@/components/ProfileCard";

export default function User () {
  const navigate = useNavigate();
  return (
    <>
      <ProfileCard />
      <Card>
        <Card.Body>
          <Card.Title>
            User Menu
          </Card.Title>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/explore")} fullWidth>
              Explore Shop
            </Button>
            <Button onClick={() => navigate("address")} fullWidth>
              My Addresses
            </Button>
            <Button onClick={() => navigate("cart/checkout")} fullWidth>
              My Checkout
            </Button>
            <Button onClick={() => navigate("history")} fullWidth>
              Order History
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}