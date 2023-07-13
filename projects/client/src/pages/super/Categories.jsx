import Datas from "@/components/Datas";
import Loading from "@/components/Loading";
import Swal from "@/components/Swal";
import useCategoryMutations from "@/hooks/mutations/super/useCategoryMutations";
import useCategories from "@/hooks/queries/common/useCategories";
import formToObj from "@/libs/formToObj";
import Error from "../error/Error";

const config = { 
	title: "Category", 
	showCancelButton: true,
	inputLabel: "Category Name",
	input: "text",
	inputValidator: (value) => {
		if (!value) return "Category Name can't be empty";
	},
	inputPlaceholder: "Enter Category Name"
};

export default function Categories () {
	const { useAddMutation, useDeleteMutation, useEditMutation } = useCategoryMutations();
	const { data, isLoading, isError, error } = useCategories();

	const add = useAddMutation();
	const edit = useEditMutation();
	const del = useDeleteMutation();

	const newFn = () => {
		Swal.fire ({
			...config,
			inputValue: "",
			preConfirm: (value) => {
				const form = new FormData();
				form.append("category_name", value);
				return formToObj(form);
			}
		}).then (res => {
			res.isConfirmed && add.mutate(res.value);
		})
	}
	const editFn = (id) => {
		const val = document.getElementById(`${id}-category_name`).dataset.value;
		Swal.fire({
			...config,
			inputValue: val,
			preConfirm: (value) => {
				const form = new FormData();
				form.append("id", id);
				form.append("category_name", value);
				return formToObj(form);
			}
		}).then (res => {
			res.isConfirmed && edit.mutate(res.value);
		});
	}
	const deleteFn = (id) => {
		Swal.fire({
			title: "Confirm",
			text: "Delete this Category?",
			icon: "question"
		}).then (res => res.isConfirmed && del.mutate(id));
	}
	return (
		<>
			{!isLoading && !isError && (
				<Datas
					caption="Category"
					data={data.rows}
					columns={[
						["id", "category id", true],
						["category_name", "Name"],	
					]}
					newFn={newFn}
					editFn={editFn}
					deleteFn={deleteFn}
					keys="categories"
				/>	
			)}
			{isLoading && <Loading />}
			{isError && <Error message={error.message} />}
		</>
	)
}