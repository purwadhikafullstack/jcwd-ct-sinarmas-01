import { Button } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";

export default function CartBadge() {
	return (
		<Button color="ghost" className="rounded-full">
			<FaShoppingCart />
		</Button>
	);
}
