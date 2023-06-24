import Datas from "@/components/Datas";
import useProductMutations from "@/hooks/mutations/super/useProductMutations";
import Swal from "@/components/Swal";

const Form = () => {
	return (
		<form encType="multipart/form-data">
			<input name="product_name" className="swal2-input" />
			<input name="product_image" className="swal2-file" type="file" />
			<textarea name="desc" className="swal2-textarea"></textarea>
			<select name="category_id"></select>
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

	const newFn = () => {
		Swal.fire({
			...modalConfig,
			preConfirm: () => new FormData(Swal.getPopup().querySelector("form")),
		}).then (res => res.isConfirmed && add.mutate(res.value));
	};
	const editFn = (id) => {
		Swal.fire({
			...modalConfig,
			preConfirm: () => {
				const form = new FormData(Swal.getPopup().querySelector("form"));
				form.append("id", id);
				return form;
			},
			didOpen: () => {
				const p = Swal.getPopup();
				p.querySelector("[name='product_name']");
			}
		}).then (res => {
			res.isConfirmed && edit.mutate(res.value)
		});
	};
	const delFn = (id) => {
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
			delFn={delFn}
		/>
	)
}