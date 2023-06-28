import { Button, Card } from "react-daisyui";
import cropText from "@/libs/cropText";
import { useNavigate } from "react-router-dom";

/**
 * @param {{
 * 		img: string,
 * 		imgAlt: string
 * 		desc: string
 * 		itemId: string | number
 * }} props
 */
export default function Item(props) {
	const { product_name, product_image, price, desc, id } = props;
	const navigate = useNavigate();
	return (
		<Card className="w-full mb-4">
			<Card.Image src={product_image} alt={"Product Image"} />
			<Card.Body>
				<Card.Title className="font-bold">
					{product_name}
				</Card.Title>
				<div className="mb-1">
					{cropText(desc)}
				</div>
				<div>
					<b>Price : </b>
					<div>Rp{price}</div>
				</div>
			</Card.Body>
			<Card.Actions className="p-4 flex flex-wrap gap-3">
				<Button color="info" onClick={() => navigate(`detail/${id}`)}>
					More Info
				</Button>
			</Card.Actions>
		</Card>
	)
}