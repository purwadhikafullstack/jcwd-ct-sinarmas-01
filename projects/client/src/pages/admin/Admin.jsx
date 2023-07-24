import ProfileCard from "@/components/ProfileCard";
import { Button, Card } from "react-daisyui";
import { useNavigate } from "react-router-dom";

export default function Admin () {
	const navigate = useNavigate();
	return (
		<>
			<ProfileCard />
			<Card>
				<Card.Body>
					<Card.Title>
						Warehouse Admin Menu
					</Card.Title>
					<div className="flex flex-wrap gap-3">
						<Button onClick={() => navigate("orders")} fullWidth>Orders</Button>
						<Button onClick={() => navigate("stocks")} fullWidth>Warehouse Stocks</Button>
						<Button onClick={() => navigate("stocks/request")} fullWidth>Request Stock Mutation</Button>
					</div>
				</Card.Body>
			</Card>
		</>
	)
}