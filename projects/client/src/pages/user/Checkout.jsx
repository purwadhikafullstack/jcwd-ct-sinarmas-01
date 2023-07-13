import CartItem from "@/components/CartItem";
import LoaderText from "@/components/LoaderText";
import Loading from "@/components/Loading";
import useCalcFees from "@/hooks/mutations/user/useCalcFees";
import useAddresses from "@/hooks/queries/user/useAddresses";
import useCheckouts from "@/hooks/queries/user/useCheckouts";
import formatRp from "@/libs/formatRp";
import formToObj from "@/libs/formToObj";
import { Button, Card, Select, Table } from "react-daisyui";
import Swal from "sweetalert2";
import Error from "../error/Error";
import { useState } from "react";
import useCreateOrder from "@/hooks/mutations/user/useCreateOrder";

export default function Checkout () {
	const query = useCheckouts();
	const { data, isLoading, isError, error } = query;
	const { Option } = Select;
	const calc = useCalcFees();
	const [addressId, setAddressId] = useState(0);
	const [courier, setCourier] = useState("");
	const check = useCreateOrder();

	const onSubmit = (e) => {
		if (isLoading){
			return;
		}
		e.preventDefault();
		const form = new FormData(e.target);
		form.append("checkout_id", data.id);
		const obj = formToObj(form);
		setAddressId(obj.address_id);
		setCourier(obj.courier);
		if (!obj.address_id || !obj.courier) return Swal.fire("", "Fill your data", "warning");
		calc.mutate(obj);
	}
	const addresses = useAddresses();

	const confirmPayment = (id) => {
		Swal.fire({
			title: "Payment",
			input: "file",
			text: "Upload your payment proof to bank account 9876512345",
			inputAttributes: {
				"accept": ".jpg, .png, .jpeg, .webp",
				"aria-label": "Upload your payment proof to bank account 9876512345"
			},
			preConfirm: (value) => {
				const form = new FormData();
				form.append("payment", value);
				form.append("checkout_id", id);
				return formToObj(form);
			}
		}).then (res => {
			if (!res.isConfirmed) return;
			if (!res.value?.payment || !res.value?.checkout_id) return Swal.fire("You have to upload your proof");		
			check.mutate(res.value);
		})
	}
	return (
		<Card>
			<Card.Body>
				<Card.Title>
					<div className="text-3xl font-extrabold">
						Checkout
					</div>
				</Card.Title>
				<form onSubmit={onSubmit} className="mb-4">
					<div className="mb-3 text-left">
						<label htmlFor="address" className="text-left">Address : </label>
						<Select className="w-full" id="address" name="address_id" defaultValue="">
							<Option value="" disabled>
								-- Select your address --
							</Option>
							{addresses.data && addresses.data?.rows?.map((val, key) => {
								return <Option key={key} value={val.address.id}>{val.address?.address_name}</Option>
							})}
						</Select>
					</div>
					<div className="mb-3 text-left">
						<label htmlFor="courier" className="text-left">Delivery Service : </label>
						<Select className="w-full" id="courier" name="courier" defaultValue="">
							<Option value="" disabled>-- Select Shipping Service --</Option>
							<Option value="jne">JNE</Option>
							<Option value="tiki">TIKI</Option>
							<Option value="pos">POS</Option>
						</Select>
					</div>
					<Button disabled={calc.isLoading} className="my-5" color="primary" fullWidth>
						{!calc.isLoading ? <>Check Fees</> : <LoaderText />}
					</Button>
				</form>
				<div className="overflow-y-auto">
					{isLoading && <Loading />}
					{isError && <Error message={error.message} />}
					{!isLoading && !isError && data.checkout_items.map((val, key) => {
						return (
							<CartItem
								key={key}
								image={val.product.product_image}
								name={val.product.product_name}
								price={val.price / val.qty}
								amount={val.qty}
								productId={val.product.id}
								weight={val.weight}
								hideActions
							/>	
						)
					})}
				</div>
			</Card.Body>
			<Card.Actions className="p-5 flex justify-between gap-3 w-full">
				<div className="overflow-x-auto w-full">
					<Table width="100%">
						<Table.Head>
							<span />
							<span />
							<span />
						</Table.Head>
						<Table.Body>
							<Table.Row>
								<span />
								<span>
									Items Price
								</span>
								<span>
									<b>{!isLoading && formatRp(data.total_price - data.shipping_price)}</b>
								</span>
							</Table.Row>
							<Table.Row>
								<span />
								<span>
									Shipping Fee
								</span>
								<span>
									<b>{!isLoading && formatRp(data.shipping_price)}</b>
								</span>
							</Table.Row>
							<Table.Row>
								<span />
								<span />
								<span>
									<b>{!isLoading && formatRp(data.total_price)}</b>
								</span>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
				<Button 
					fullWidth 
					color="primary" 
					disabled={!addressId || !courier} 
					onClick={() => !isLoading && confirmPayment(data.id)}
				>
					Create Order
				</Button>
			</Card.Actions>
		</Card>	
	)
}