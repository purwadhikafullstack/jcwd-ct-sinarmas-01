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
          </div>
        </Card.Body>
      </Card>
    </>
  )
}