import { Button, Badge } from "react-daisyui";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getId, getRole } from "@/api/token";
import useCart from "@/hooks/queries/common/useCart";

export default function CartBadge() {
	const navigate = useNavigate();
	const userId = getId();
	const role = getRole();
	const hide = (!userId || role !== "user") ? "hidden" : "";
	const query = useCart(userId || 0);
	const { data = {}, isLoading = true, isError = true } = query;
	if (isError) query.remove();
	return (
		<Button
			color="ghost"
			className={`rounded-full ${hide}`}
			onClick={() => navigate("/user/cart")}
			disabled={isLoading || isError}
		>
			<FaShoppingCart />
			<sup>
				<Badge>
					{!isLoading && !isError && data && (data.quantity > 10 ? "10+" : String(data.quantity || 0))}
				</Badge>
			</sup>
		</Button>
	);
}
