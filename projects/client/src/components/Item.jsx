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
			<Card.Image 
				src={product_image} 
				alt={"Product Image"}
				className="max-w-full max-h-[400px]"
		  />
			<Card.Body>
				<Card.Title className="font-bold">
					{product_name}
				</Card.Title>
				<div className="mb-1 text-left">
					{cropText(desc, 100)}
					<div>
						<b>Price : </b>
						<span>Rp{price}</span>
					</div>
				</div>
			</Card.Body>
			<Card.Actions className="p-5 flex justify-end flex-wrap gap-3">
				<Button color="info" onClick={() => navigate(`detail/${id}`)}>
					More Info
				</Button>
			</Card.Actions>
		</Card>
	)
}