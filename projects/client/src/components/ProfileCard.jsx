import { Card } from "react-daisyui";
import { getEmail } from "@/api/token";
import LogoutBtn from "./LogoutBtn";

export default function ProfileCard() {
  return (
    <Card className="mx-5 mb-3">
      <Card.Body>
        <Card.Title className="mb-3">
          <b>{getEmail()}</b>
        </Card.Title>
        <div className="flex flex-wrap gap-2">
          <LogoutBtn />
        </div>
      </Card.Body>
    </Card>
  );
}
