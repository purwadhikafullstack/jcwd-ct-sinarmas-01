import { Table } from "react-daisyui";

export default function Prices(props) {
  return (
    <Table width="100%">
      <Table.Head>
        <span />
        <span />
        <span />
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <span />
          <span>Items Price</span>
          <span>
            <b>{props.price}</b>
          </span>
        </Table.Row>
        <Table.Row>
          <span />
          <span>Shipping Fee</span>
          <span>
            <b>{props.shipping}</b>
          </span>
        </Table.Row>
        <Table.Row>
          <span />
          <span />
          <span>
            <b>{props.total}</b>
          </span>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
