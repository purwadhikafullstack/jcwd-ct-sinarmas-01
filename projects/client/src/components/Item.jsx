import { Button, Card } from "react-daisyui";
import cropText from "@/libs/cropText";
import formatRp from "@/libs/formatRp";
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
		<Card className="mb-4">
			<Card.Body>
				<div className="flex justify-start flex-wrap gap-6">
					<div className="ml-3 w-[100px] h-[100px]">
						<img src={product_image} alt={product_name + " Image"} className="aspect-square max-w-[100px] max-h-[100px]" />
					</div>
					<div className="text-left">
						<Card.Title className="font-bold text-3xl">
							{product_name} <br />
						</Card.Title>
						<div className="font-extrabold text-lg">
							{formatRp(price)}
						</div>
						<div className="mb-1 text-left text-sm">
							{cropText(desc, 100)}
						</div>
					</div>
				</div>
			</Card.Body>
			<Card.Actions className="p-5 flex justify-end flex-wrap gap-3">
				<Button color="info" onClick={() => navigate(`detail/${id}`)} fullWidth>
					Details
				</Button>
			</Card.Actions>
		</Card>
	)
}