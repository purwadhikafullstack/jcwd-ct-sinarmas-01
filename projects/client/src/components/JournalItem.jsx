import { Card } from "react-daisyui";

export default function JournalItem (props) {
  const { warehouse, stock, tipe_jurnal, remark, qty, stock_before, stock_after } = props.journal;
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          {remark.text} @ {warehouse.warehouse_name}
        </Card.Title>
        <div className="p-3 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr><th colSpan={3} /></tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>Remark</td>
                <td>{remark.text}</td>
              </tr>
              <tr>
                <td />
                <td>Product</td>
                <td>{stock.product.product_name}</td>
              </tr>
              <tr>
                <td />
                <td>Quantity</td>
                <td>{qty}</td>
              </tr>
              <tr>
                <td />
                <td>Type</td>
                <td>{tipe_jurnal.name}</td>
              </tr>
              <tr>
                <td />
                <td>Stock Before</td>
                <td>{stock_before}</td>
              </tr>
              <tr>
                <td />
                <td>Stock After</td>
                <td>{stock_after}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  )
}