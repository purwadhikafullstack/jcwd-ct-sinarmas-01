import { Table, ButtonGroup, Button, Select } from "react-daisyui";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import getUsers from "../../apis/getUsers";
import { useState } from "react";

export default function ManageUser() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const users = useQuery({
    queryFn: async () => await getUsers(page),
    queryKey: ["users", page],
    onSuccess: (data) => {
      const arr = [];
      const count = Math.ceil(data?.count / 5);
      for(let i = 1; i <= count; i++) {
        arr.push(i);
        setPages(arr);
      }
    }
  });

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-3">
        Users
      </h1>
      <div className="mb-6">
        <Button color="primary">
          New
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <Table.Head>
            <span>ID</span>
            <span>E-mail</span>
            <span>Username</span>
            <span>Role</span>
            <span>Actions</span>
          </Table.Head>
          <Table.Body className="bg-base-200">
            {users.data?.rows?.map(data => {
              return (
                <Table.Row key={data?.id}>
                  <span>{data?.id}</span>
                  <span>{data?.email}</span>
                  <span>{data?.username}</span>
                  <span>{data?.role}</span>
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
      <div className="my-5">
        Page : <Select onChange={(e) => setPage(e.currentTarget.value)}>
          {pages.map(data => {
            return <Select.Option value={data} key={data}>{data}</Select.Option>
          })}
        </Select>
      </div>
    </div>
  )
}
