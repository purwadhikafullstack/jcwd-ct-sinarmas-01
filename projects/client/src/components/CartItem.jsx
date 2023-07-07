import useCartMutations from "@/hooks/mutations/common/useCartMutations";
import formatRp from "@/libs/formatRp";
import { Button, ButtonGroup } from "react-daisyui";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Swal from "./Swal";

export default function CartItem(props) {
	const { useAddMutation, useDecrease, useDeleteItem } = useCartMutations();
	const { amount, userId, productId, price, name, image } = props;
	const add = useAddMutation();
	const del = useDeleteItem();
	const decrease = useDecrease();
	const obj = {
		user_id: userId,
		product_id: productId,
	};
	const deleteItem = () => {
		Swal.fire({
			title: "Confirm",
			icon: "question",
			showCancelButton: true,
			cancelButtonText: "No",
			confirmButtonText: "Yes",
			text: "Do you want to delete this from cart?",
		}).then((res) => res.isConfirmed && del.mutate(obj));
	};
	const total = amount * price;
	return (
		<div className="flex flex-col p-5 gap-3 mb-4 bg-base-100 border-2 border-base-300 rounded-xl">
			<div className="flex-1 flex flex-wrap gap-3 text-left">
				<div className="flex-1 flex justify-center items-center">
					<img
						className="w-[150px] h-[150px] "
						src={image}
						alt={`${name} Product`}
					/>
				</div>
				<div className="flex flex-col flex-wrap flex-1 justify-center items-center">
					<div className="text-lg">{name}</div>
					<b className="text-xl">{formatRp(total)}</b>
				</div>
			</div>
			<div className="flex flex-0 justify-center items-center">
				<ButtonGroup>
					<Button className="w-auto" color="warning" disabled={amount === 1} onClick={() => decrease.mutate(obj)}>
						<FaMinus />
					</Button>
					<Button>{amount}</Button>
					<Button className="w-auto" color="warning" onClick={() => add.mutate(obj)}>
						<FaPlus />
					</Button>
					<Button className="w-auto" color="error" onClick={deleteItem}>
						<FaTrash />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	);
}
