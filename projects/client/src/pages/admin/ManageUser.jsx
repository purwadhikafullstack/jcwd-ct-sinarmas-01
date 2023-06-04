import { Table, ButtonGroup, Button } from "react-daisyui";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

export default function ManageUser() {
  return (
    <div className="text-center">
      <ButtonGroup className="mb-6">
        <Button color="primary">
          New
        </Button>
      </ButtonGroup>
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
            <Table.Row>
              <span>1</span>
              <span>example@email.com</span>
              <span>user_123</span>
              <span>Admin</span>
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
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
