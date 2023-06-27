import { Card } from "react-daisyui";
import cropText from "@/libs/cropText";

export default function Item(props) {
	const { img, imgAlt, itemName, desc } = props;
	return (
		<Card className="w-full">
			<Card.Image src={img} alt={imgAlt} />
			<Card.Body>
				<Card.Title className="font-bold">
					{itemName}
				</Card.Title>
				<div>
					{cropText(desc)}
				</div>
			</Card.Body>
		</Card>
	)
}