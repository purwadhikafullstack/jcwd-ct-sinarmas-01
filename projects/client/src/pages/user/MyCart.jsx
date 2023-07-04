import { Card } from "react-daisyui";
import { getId } from "@/api/token";
import useCart from "@/hooks/queries/common/useCart";
import Loading from "@/components/Loading";
import Error from "@/pages/error/Error";
import CartItem from "@/components/CartItem";
import NoContent from "@/components/NoContent";

export default function MyCart () {
	const userId = getId();
	const { data, isLoading, isError } = useCart(userId);

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">
						My Cart
					</Card.Title>
					<div>
						{isLoading && <Loading />}
						{isError && <Error message="Something is wrong" />}
						{(!isLoading && !isError && data) && (
							data?.rows?.map((val, key) => (
								<CartItem 
									key={key} 
									userId={userId} 
									productId={val.product_id} 
									amount={val.qty}
									price={val.product.price}
									name={val.product.product_name}
									image={val.product.product_image}
								/>
							))
						)}
						{data && data.count === 0 && <NoContent />}
					</div>
				</Card.Body>
			</Card>
		</>
	)
}