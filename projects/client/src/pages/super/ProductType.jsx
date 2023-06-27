import Datas from "@/components/Datas";
import { useParams } from "react-router-dom";
import useProductTypeMutations from "@/hooks/mutations/super/useProductTypeMutations";
import Swal from "@/components/Swal";
import useProductTypeQuery from "@/hooks/queries/common/useProductTypeQuery";

const Form = () => {
	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<input placeholder="Enter Storage Amount (GB)" className="swal2-input" name="storage" />
			<input placeholder="Enter Product Color" className="swal2-input" name="color" />
			<input type="number" placeholder="Price (IDR)" className="swal2-input" name="price" />
		</form>
	);
}

const formConf = {
	title: "Product Type",
	html: <Form />,
	showCancelButton: true
};

export default function ProductType () {
	const { productId } = useParams();

	const { useAddMutation, useDeleteMutation, useEditMutation } = useProductTypeMutations();
	const add = useAddMutation(productId);
	const del = useDeleteMutation(productId);
	const edit = useEditMutation(productId);
	const query = useProductTypeQuery(productId);

	const newFn = () => {
		Swal.fire({
			...formConf,
		})
			.then(res => res.isConfirmed);
	}
	const editFn = (id) => {
		Swal.fire({
			...formConf
		})
	}
	const deleteFn = (id) => {
		Swal.fire({
			...formConf
		})
	}
	
	return (
		<Datas 
			caption="Product Type"
			newFn={newFn}
			editFn={editFn}
			deleteFn={deleteFn}
			data={query.data?.rows}
		/>
	)
}