import Datas from "@/components/Datas";
import useProductMutations from "@/hooks/mutations/super/useProductMutations";
import useProductQuery from "@/hooks/queries/common/useProductQuery";
import Swal from "@/components/Swal";
import formToObj from "@/libs/formToObj";
import { FileInput } from "react-daisyui";

const Form = () => {
	const onSubmit = (e) => e.preventDefault();
	return (
		<form encType="multipart/form-data" onSubmit={onSubmit}>
			<input placeholder="Enter Product Name" name="product_name" className="swal2-input" />
			<div className="my-2">
				Product Image : {" "}
				<FileInput
					placeholder="Drop Product Image Here" 
					name="product_image" 
					className="mt-0"
					id="product_image"
					type="file"
				/>
			</div>
			<textarea name="desc" className="swal2-textarea" placeholder="Enter Description"></textarea>
		</form>
	);
}
const modalConfig = {
	title: "Product",
	html: <Form />,
	showCancelButton: true
};

export default function Products () {
	const { useAddMutation, useEditMutation, useDeleteMutation } = useProductMutations();
	const add = useAddMutation();
	const edit = useEditMutation();
	const del = useDeleteMutation();

	const query = useProductQuery();
	const newFn = () => {
		Swal.fire({
			...modalConfig,
			didOpen: () => Swal.getPopup().querySelector("form").reset() ,
			preConfirm: () => new FormData(Swal.getPopup().querySelector("form")),
		}).then (res => {
			res.isConfirmed && add.mutate(formToObj(res.value))
		});
	};
	const editFn = (id) => {
		Swal.fire({
			...modalConfig,
			preConfirm: () => {
				const form = new FormData(Swal.getPopup().querySelector("form"));
				form.append("id", id);
				return formToObj(form);
			},
			didOpen: () => {
				const p = Swal.getPopup();
				const name = document.getElementById(`${id}-product_name`).textContent;
				const desc = document.getElementById(`${id}-desc`).textContent;
				p.querySelector("[name='product_name']").value = name;
				p.querySelector("[name='desc']").value = desc;
			}
		}).then (res => {
			res.isConfirmed && edit.mutate(res.value)
		});
	};
	const deleteFn = (id) => {
		Swal.fire({
			title: "Confirm Delete",
			showCancelButton: true,
			text: "Do you want to delete this product?"
		}).then (res => res.isConfirmed && del.mutate(id))
	}

	return (
		<Datas 
			newFn={newFn}
			editFn={editFn}
			deleteFn={deleteFn}
			caption="Product"
			columns={[
				["product_name", "Product Name"],
				["desc", "Description"],
				["product_image", "Image"]
			]}
			data={query?.data?.rows}
		/>
	)
}