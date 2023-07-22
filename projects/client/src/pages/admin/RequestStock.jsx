import { useEffect, useRef, useState } from "react";
import { getProducts } from "@/api/common";
import { Button, Card, Input, Select } from "react-daisyui";
import requestStock from "@/api/admin/requestStock";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import formToObj from "@/libs/formToObj";
import StockMutations from "../common/StockMutations";

export default function RequestStock () {
  const [products, setProducts] = useState({});
  const client = useQueryClient();
  const mut = useMutation({
    mutationFn: async (data) => await requestStock(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["stock", "requests"] })
  })
  useEffect(() => {
    (async () => {
      const prod = await getProducts(0);
      setProducts(prod);
    })();
  }, []);
  const ref = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    const frm = formToObj(new FormData(e.target));
    console.log(frm);
    mut.mutate(frm);
  }

  return (
    <form ref={ref} onSubmit={onSubmit}>
      <Card className="p-3 mb-6">
        <Card.Body>
          <Card.Title>
            Request Product Stock
          </Card.Title>
            <div className="mb-3">
              <label htmlFor="product_id">Product : </label>
              <Select className="w-full" id="product_id" name="product_id" >
                {products.rows?.map((val, key) => (
                  <Select.Option value={val.id} key={key}>{val.product_name}</Select.Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="qty">Quantity : </label>
              <Input required type="number" placeholder="Enter Requested Quantity" name="qty" id="qty" className="w-full" />
            </div>
        </Card.Body>
        <Card.Actions className="p-5">
          <Button disabled={mut.isLoading} color="primary" type="submit" fullWidth>
            {mut.isLoading ? "Loading..." : "Submit Request"}
          </Button>
        </Card.Actions>
      </Card>
      <StockMutations />
    </form>
  )
}