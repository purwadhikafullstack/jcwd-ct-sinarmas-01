import { useEffect, useState } from "react";
import { getProducts, getWarehouses } from "@/api/common";
import { Button, Card, Input, Select } from "react-daisyui";
import { useFormik } from "formik";
import requestStock from "@/api/admin/requestStock";

export default function RequestStock () {
  const [products, setProducts] = useState({});
  const [warehouses, setWarehouses] = useState({});
  useEffect(() => {
    (async () => {
      const prod = await getProducts(0);
      setProducts(prod);
      const wh = await getWarehouses(0);
      setWarehouses(wh);
    })();
  }, []);
  const form = useFormik({
    initialValues: {
      sender_id: "",
      product_id: "",
      qty: 1
    },
    onSubmit: (value) => {
      (async () => await requestStock(value))();
    }
  })

  return (
    <form onSubmit={form.handleSubmit} onChange={form.handleChange}>
      <Card className="p-3">
        <Card.Body>
          <Card.Title>
            Request Stock from Other Warehouse
          </Card.Title>
            <div className="mb-3">
              <label htmlFor="product_id">Request Product : </label>
              <Select className="w-full" id="product_id" name="product_id">
                {products.rows?.map((val, key) => (
                  <Select.Option value={val.id} key={key}>{val.product_name}</Select.Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="warehouse_id">From Warehouse : </label>
              <Select className="w-full" id="sender_id" name="sender_id">
                {warehouses.rows?.map((val, key) => (
                  <Select.Option value={val.id} key={key}>{val.warehouse_name}</Select.Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="qty">Quantity : </label>
              <Input required type="number" placeholder="Enter Requested Quantity" name="qty" id="qty" className="w-full" />
            </div>
        </Card.Body>
        <Card.Actions className="p-5">
          <Button color="primary" type="submit" fullWidth>
            Submit Request
          </Button>
        </Card.Actions>
      </Card>
    </form>
  )
}