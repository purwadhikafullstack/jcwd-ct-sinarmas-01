import acceptStockRequest from "@/api/super/acceptStockRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card } from "react-daisyui";
import { FaCheck } from "react-icons/fa";
import Swal from "./Swal";
import { getRole } from "@/api/token";

export default function RequestItem (props) {
  const { id, warehouse, sender, stock, notes, qty, approved } = props.mutation;
  const client = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data) => await acceptStockRequest(data),
    onSuccess: () => client.invalidateQueries({ queryKey: ["stock", "requests"] })
  })
  const confirmAccept = (id) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to approve this mutation?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "No"
    }).then (res => res.isConfirmed && mutate(id))
  }
  const role = getRole();
  return (
    <Card className="mb-5">
      <Card.Body>
        <Card.Title>
          {notes}
        </Card.Title>
        <div className="w-full overflow-x-auto p-4">
          <table className="w-full table">
            <thead>
              <tr>
                <th colSpan={3} />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>From Warehouse</td>
                <td>{sender.warehouse_name}</td>
              </tr>
              <tr>
                <td />
                <td>To Warehouse</td>
                <td>{warehouse.warehouse_name}</td>
              </tr>
              <tr>
                <td />
                <td>Product</td>
                <td>{stock.product?.product_name}</td>
              </tr>
              <tr>
                <td />
                <td>Quantity</td>
                <td>{qty}</td>
              </tr>
              <tr>
                <td />
                <td>Status</td>
                <td>{approved ? "Approved" : "Pending"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
      {role === "super" && !approved && (
        <Card.Actions className="p-5">
          <Button startIcon={<FaCheck />} color="success" fullWidth onClick={() => confirmAccept(id)}>
            Approve
          </Button>
        </Card.Actions>
      )}
    </Card>
  )
}