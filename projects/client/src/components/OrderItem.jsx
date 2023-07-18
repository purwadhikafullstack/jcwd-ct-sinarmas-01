import formatRp from "@/libs/formatRp";
import { Button, Card } from "react-daisyui";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "./Swal";
import useOrderMutations from "@/hooks/mutations/admin/useOrderMutations";

function OrderTable ({ username, total, status }) {
  return (
    <div className="overflow-x-auto">
      <table width="100%" className="table">
        <thead>
          <tr><th colSpan={3} /></tr>
        </thead>
        <tbody>
          <tr>
            <td />
            <td>Username</td>
            <td>{username}</td>
          </tr>
          <tr>
            <td />
            <td>Total</td>
            <td>{formatRp(total)}</td>
          </tr>
          <tr>
            <td />
            <td>Status</td>
            <td>
              <b className={`flex items-center gap-3`}>
                {status}
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const showProof = (id, imageUrl) => {
  const title = `Payment Proof for Order #${id}`;
  Swal.fire({
    title,
    imageAlt: title,
    imageUrl
  })
};

export default function OrderItem (props) {
  const { username, id, total, proof, status, isCompleted } = props;
  const { changeStatus } = useOrderMutations();
  const conf = {
    confirmButtonText: "Yes",
    showCancelButton: true,
    icon: "question"
  }
  const reject = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Confirm Reject?",
      ...conf
    })
    if (isConfirmed) changeStatus.mutate({ id, status: "Rejected", rejected: true });
  } 
  const accept = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Approve this Order?",
      ...conf
    });
    if (isConfirmed) changeStatus.mutate({ id, status: "Accepted" });
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>
          Order #{id}
        </Card.Title>
        <OrderTable username={username} status={status} total={total} />
      </Card.Body>
      <Card.Actions className="p-5">
        <div className="mb-3 w-full">
          <Button onClick={() => showProof(id, proof)} color="info" fullWidth>
            Proof Details
          </Button>
        </div>
        <div className={`flex gap-3 w-full ${isCompleted ? "hidden" : ""}`}>
          <Button onClick={reject} startIcon={<FaTimes />} className="grow" color="error">
            Reject
          </Button>
          <Button onClick={accept} startIcon={<FaCheck />} className="grow" color="success">
            Accept
          </Button>
        </div>
      </Card.Actions>
    </Card>
  )
}