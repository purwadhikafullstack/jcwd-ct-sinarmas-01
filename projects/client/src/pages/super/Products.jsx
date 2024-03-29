import Datas from "@/components/Datas";
import useProductMutations from "@/hooks/mutations/super/useProductMutations";
import useProductQuery from "@/hooks/queries/common/useProductQuery";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import Swal from "@/components/Swal";
import formToObj from "@/libs/formToObj";
import { FileInput } from "react-daisyui";
import Loading from "@/components/Loading";
import Error from "../error/Error";
import { useEffect, useState } from "react";
import { getCategories } from "@/api/common";

const intlConfig = { locale: "id-ID", currency: "IDR" };
const configInput = { suffix: " gr", groupSeparator: ".", decimalSeparator: "," };

const Form = () => {
  const onSubmit = (e) => e.preventDefault();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    (async () => {
      const ct = await getCategories(0);
      setCategories(ct);
    })();
  }, []);

  return (
    <form encType="multipart/form-data" onSubmit={onSubmit}>
			<label htmlFor="product_name">Product Name :</label>
      <input
        placeholder="Enter Product Name"
        name="product_name"
        className="swal2-input"
				id="product_name"
      />
			<label htmlFor="price">Price :</label>
      <CurrencyInput 
        className="swal2-input" 
        placeholder="Enter Price (Rp)"
        id="priceinput"
        name="price"
        intlConfig={intlConfig}
      />
      <label htmlFor="weight">Weight : </label>
      <CurrencyInput
        className="swal2-input"
        placeholder="Enter Weight (gram)"
        id="weight"
        name="weight"
        {...configInput}
      />
			<label htmlFor="desc">Description :</label>
      <textarea
        name="desc"
        className="swal2-textarea"
        placeholder="Enter Description"
				id="desc"
      />
      <label htmlFor="category_id">Category : </label>
      <select className="swal2-select" name="category_id" id="category_id">
        {categories.rows?.map((val, key) => (
          <option value={val.id} key={key}>{val.category_name}</option>
        ))}
      </select>
			<label htmlFor="product_image">
				Product Image :{" "}
			</label>
			<FileInput
				placeholder="Drop Product Image Here"
				name="product_image"
				className="mt-0"
				id="product_image"
				type="file"
			/>
    </form>
  );
};

export default function Products() {
  const { useAddMutation, useEditMutation, useDeleteMutation } = useProductMutations();
  const add = useAddMutation();
  const edit = useEditMutation();
  const del = useDeleteMutation();
  const { data, isLoading, isError, error } = useProductQuery();
  const modalConfig = {
    title: "Product",
    html: <Form />,
    showCancelButton: true,
  };
  const newFn = () => {
    Swal.fire({
      ...modalConfig,
      didOpen: () => Swal.getPopup().querySelector("form").reset(),
      preConfirm: () => {
        const form = new FormData(Swal.getPopup().querySelector("form"));
        return form;
      },
    }).then((res) => {
      if (res.isConfirmed) {
        add.mutate(formToObj(res.value));
      }
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
        const name = document.getElementById(`${id}-product_name`).dataset.value;
        const desc = document.getElementById(`${id}-desc`).dataset.value;
        const price = document.getElementById(`${id}-price`).dataset.value;
        const weight = document.getElementById(`${id}-weight`).dataset.value;
        const category = document.getElementById(`${id}-category.id`).dataset.value;
        p.querySelector("[name='product_name']").value = name;
        p.querySelector("[name='desc']").value = desc;
        p.querySelector("#category_id").value = category;
        p.querySelector("#priceinput").value = formatValue({ value: price, intlConfig });
        p.querySelector("#weight").value = formatValue({ value: weight, ...configInput });
      },
    }).then((res) => {
      if (res.isConfirmed) {
        edit.mutate(res.value);
      }
    });
  };
  const deleteFn = (id) => {
    Swal.fire({
      title: "Confirm Delete",
      showCancelButton: true,
      text: "Do you want to delete this product?",
    }).then((res) => res.isConfirmed && del.mutate(id));
  };

  return (
    <>
      {isLoading && <Loading />}
      {isError && <Error message={error.message} />}
      {!isLoading && !isError && (
        <Datas
          newFn={newFn}
          editFn={editFn}
          deleteFn={deleteFn}
          caption="Product"
          columns={[
            ["id", "Product ID", true],
            ["product_name", "Product Name"],
            ["desc", "Description"],
            ["price", "Price (IDR)"],
            ["weight", "Weight (grams)"],
            ["category.category_name", "Category"],
            ["category.id", "category", true]
          ]}
          keys={"products"}
          data={data?.rows}
        />
      )}
    </>
  );
}
