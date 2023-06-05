import { useQuery } from "@tanstack/react-query";
import { Table, Button, ButtonGroup } from "react-daisyui";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import getWarehouses from "../../apis/getWarehouses";
import { useState } from "react";

export default function ManageWareHouses () {
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryFn: async () => await getWarehouses(page),
    queryKey: ["warehouses", page],
  });

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-3">
        Warehouses
      </h1>
      <ButtonGroup className="mb-6">
        <Button color="primary">
          New
        </Button>
      </ButtonGroup>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head>
            <span>ID</span>
            <span>Warehouse Name</span>
            <span>Managed By</span>
            <span>Address</span>
            <span>Actions</span>
          </Table.Head>
          <Table.Body className="bg-base-200">
            {query.data?.rows?.map((data, key) => {
              return (
                <Table.Row key={key}>
                  <span>{data?.id}</span>
                  <span>{data?.warehouse_name}</span>
                  <span>{data?.user?.username}</span>
                  <span>{data?.address?.address_name}</span>
                  <span>
                    <ButtonGroup>
                      <Button color="warning">
                        <FaPencilAlt />
                      </Button>
                      <Button color="error">
                        <FaTrash />
                      </Button>
                    </ButtonGroup>
                  </span>
                </Table.Row>
              )
            })}
          </Table.Body>
          <Table.Footer>
            <span /><span /><span /><span /><span />
          </Table.Footer>
        </Table>
      </div>
    </div>
  )
}