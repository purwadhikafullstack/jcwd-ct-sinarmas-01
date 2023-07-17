import formatRp from "@/libs/formatRp";
import { Button, Card, Table } from "react-daisyui";
import { FaCheck, FaCheckCircle, FaClock, FaTimes } from "react-icons/fa";
import Swal from "./Swal";

function OrderTable ({ username, total, status }) {
  return (
    <div className="overflow-x-auto">
      <Table width="100%">
        <Table.Head>
          <span />
          <span />
          <span />
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <span />
            <span>
              Username
            </span>
            <span>
              {username}
            </span>
          </Table.Row>
          <Table.Row>
            <span />
            <span>
              Total
            </span>
            <span>
              {formatRp(total)}
            </span>
          </Table.Row>
          <Table.Row>
            <span />
            <span>
              Status
            </span>
            <span>
              <b className={`flex items-center gap-3 ${status === "Completed" ? "text-success" : "text-warning"}`}>
                {status === "Completed" ? <FaCheckCircle /> : <FaClock />}{" "}{status}
              </b>
            </span>
          </Table.Row>
        </Table.Body>
      </Table>
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
  const { username, id, total, proof, status } = props;
  return (
    <Card>
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
        <div className="flex gap-3 w-full">
          <Button startIcon={<FaTimes />} className="grow" color="error">
            Reject
          </Button>
          <Button startIcon={<FaCheck />} className="grow" color="success">
            Accept
          </Button>
        </div>
      </Card.Actions>
    </Card>
  )
}