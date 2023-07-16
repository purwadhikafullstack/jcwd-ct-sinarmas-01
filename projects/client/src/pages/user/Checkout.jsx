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

export default function Checkout () {
	const query = useCheckouts();
	const { data, isLoading, isError, error } = query;
	const { Option } = Select;
	const calc = useCalcFees();

	const onSubmit = (e) => {
		if (isLoading){
			return;
		}
		e.preventDefault();
		const form = new FormData(e.target);
		form.append("checkout_id", data.id);
		const obj = formToObj(form);
		if (obj.address_id && obj.courier)
			calc.mutate(obj);
		if (!obj.address_id || !obj.courier)
			Swal.fire("", "Fill your data", "warning");
	}
	const addresses = useAddresses();
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
				<Table width="100%">
					<Table.Head>
						<span />
						<span />
					</Table.Head>
					<Table.Body>
						<Table.Row>
							<span>
								Items Price
							</span>
							<span>
								<b>{!isLoading && formatRp(data.total_price - data.shipping_price)}</b>
							</span>
						</Table.Row>
						<Table.Row>
							<span>
								Shipping Fee @ {!isLoading && data.total_weight} grams
							</span>
							<span>
								<b>{!isLoading && formatRp(data.shipping_price)}</b>
							</span>
						</Table.Row>
						<Table.Row>
							<span />
							<span>
								<b>{!isLoading && formatRp(data.total_price)}</b>
							</span>
						</Table.Row>
					</Table.Body>
				</Table>
			</Card.Actions>
		</Card>	
	)
}