import { getProducts, getWarehouses } from "@/api/common";
import useManageStock from "@/hooks/mutations/super/useManageStock";
import formToObj from "@/libs/formToObj";
import { useEffect, useState } from "react";
import { Button, Input, Modal, Select } from "react-daisyui";
import { FaPlus } from "react-icons/fa";
import Stocks from "../common/Stocks";

function Form ({ open, closeFn }) {
  const [options, setOptions] = useState({});
  const [wh, setWh] = useState({});

  useEffect(() => {
    (async () => {
      const opt = await getProducts(0);
      setOptions(opt);
      const w = await getWarehouses(0);
      setWh(w);
    })();
  }, []);
  const { mutate } = useManageStock();
  const onSubmit = (e) => {
    e.preventDefault();
    const frm = formToObj(new FormData(e.target));
    mutate(frm);
    closeFn();
  }
  return (
    <Modal open={open} onClickBackdrop={() => closeFn()}>
      <Modal.Header>
        New Stock
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={onSubmit}>
          <label htmlFor="product_id">Product : </label>
          <Select className="swal2-select w-full" name="product_id" id="product_id">
            {options.rows?.map((val, key) => <Select.Option value={val.id} key={key}>{val.product_name}</Select.Option>)}
          </Select>
          <label htmlFor="warehouse_id">Warehouse : </label>
          <Select className="swal2-select w-full" name="warehouse_id" id="warehouse_id">
            {wh.rows?.map((val, key) => <Select.Option value={val.id} key={key}>{val.warehouse_name}</Select.Option>)}
          </Select>
          <label htmlFor="qty">Quantity : </label>
          <Input type="number" className="swal2-input" name="qty" id="qty" />
          <Button className="swal2-button" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default function StockMan () {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Form open={open} closeFn={() => setOpen(false)} />
      <Button className="mb-6" startIcon={<FaPlus />} fullWidth onClick={() => setOpen(o => !o)}>
        New
      </Button>
      <Stocks />
    </>
  )
}