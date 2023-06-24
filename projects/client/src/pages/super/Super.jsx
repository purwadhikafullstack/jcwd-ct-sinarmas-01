import { Card, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function Super () {
  const navigate = useNavigate();
  return (
    <Card className="mx-5">
      <Card.Body>
        <Card.Title className="mb-3 text-center"> 
          Superadmin Menu
        </Card.Title>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => navigate("warehouses")} fullWidth>Warehouses Management</Button>
          <Button onClick={() => navigate("users")} fullWidth>Users Management</Button>
        </div>
      </Card.Body>
    </Card>
  )
}