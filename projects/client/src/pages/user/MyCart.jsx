import { Button, Card } from "react-daisyui";
import { getId } from "@/api/token";
import useCart from "@/hooks/queries/common/useCart";
import Loading from "@/components/Loading";
import Error from "@/pages/error/Error";
import CartItem from "@/components/CartItem";
import NoContent from "@/components/NoContent";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

export default function MyCart () {
	const userId = getId();
	const navigate = useNavigate();
	const { data, isLoading, isError } = useCart(userId);

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="mb-3 flex">
						<div className="flex-1">
							My Cart
						</div>
						<Button className="flex-0" color="ghost" onClick={() => navigate("/explore")}>
							<FaTimes />
						</Button>
					</Card.Title>
					<div>
						{isLoading && <Loading />}
						{isError && <Error message="Something is wrong" />}
						{(!isLoading && !isError && data) && (
							data?.rows?.map((val, key) => {
								return (	
									<CartItem 
										key={key} 
										userId={userId}
										itemId={val.id} 
										productId={val.product_id} 
										amount={val.qty}
										price={val.product.price}
										name={val.product.product_name}
										image={val.product.product_image}
									/>
								)
							})
						)}
						{data && data.count === 0 && <NoContent />}
					</div>
				</Card.Body>
			</Card>
		</>
	)
}