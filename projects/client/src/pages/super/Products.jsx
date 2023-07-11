import Datas from "@/components/Datas";
import useProductMutations from "@/hooks/mutations/super/useProductMutations";
import useProductQuery from "@/hooks/queries/common/useProductQuery";
import CurrencyInput, { formatValue } from "react-currency-input-field";
import Swal from "@/components/Swal";
import formToObj from "@/libs/formToObj";
import { FileInput } from "react-daisyui";
import Loading from "@/components/Loading";
import Error from "../error/Error";
import { useState } from "react";

const intlConfig = { locale: "id-ID", currency: "IDR" };
const configInput = { suffix: " gr", groupSeparator: ".", decimalSeparator: "," };

const Form = (props) => {
  const onSubmit = (e) => e.preventDefault();
  const { priceChange, weightChange } = props;
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
        onValueChange={(e) => priceChange(e)}
        intlConfig={intlConfig}
      />
      <label htmlFor="weight">Weight : </label>
      <CurrencyInput
        className="swal2-input"
        placeholder="Enter Weight (gram)"
        id="weight"
        onValueChange={(e) => weightChange(e)}
        {...configInput}
      />
			<label htmlFor="desc">Description :</label>
      <textarea
        name="desc"
        className="swal2-textarea"
        placeholder="Enter Description"
				id="desc"
      />
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
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(0);
  const { data, isLoading, isError, error } = useProductQuery();
  const modalConfig = {
    title: "Product",
    html: <Form priceChange={setPrice} weightChange={setWeight} />,
    showCancelButton: true,
  };
  const newFn = () => {
    Swal.fire({
      ...modalConfig,
      didOpen: () => Swal.getPopup().querySelector("form").reset(),
      preConfirm: () => new FormData(Swal.getPopup().querySelector("form")),
    }).then((res) => {
      if (res.isConfirmed) {
        res.value.append("price", price);
        res.value.append("weight", weight);
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
        return form
      },
      didOpen: () => {
        const p = Swal.getPopup();
        const name = document.getElementById(`${id}-product_name`).dataset
          .value;
        const desc = document.getElementById(`${id}-desc`).dataset.value;
        const price = document.getElementById(`${id}-price`).dataset.value;
        const weight = document.getElementById(`${id}-weight`).dataset.value;
        p.querySelector("[name='product_name']").value = name;
        p.querySelector("[name='desc']").value = desc;
        p.querySelector("#priceinput").value = formatValue({ value: price, intlConfig });
        p.querySelector("#weight").value = formatValue({ value: weight, ...configInput });
      },
    }).then((res) => {
      if (res.isConfirmed) {
        res.value.append("price", price);
        res.value.append("weight", weight);
        edit.mutate(formToObj(res.value));
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
            ["weight", "Weight (grams)"]
          ]}
          data={data?.rows}
        />
      )}
    </>
  );
}
