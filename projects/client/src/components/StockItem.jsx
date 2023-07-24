import { Card } from "react-daisyui";

export default function StockItem (props) {
  const { stock } = props;
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>
          {stock.product?.product_name}
        </Card.Title>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th colSpan={3} />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>Warehouse</td>
                <td>{stock.warehouse?.warehouse_name}</td>
              </tr>
              <tr>
                <td />
                <td>Stock Quantity</td>
                <td>{stock.stock}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
      <Card.Actions className="p-5">
        
      </Card.Actions>
    </Card>
  )
}