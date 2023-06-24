import { Menu } from "react-daisyui";
import { Link } from "react-router-dom";

export default function AdminMenu () {
  return (
    <Menu className="w-60 p-2 bg-base-200 gap-1">
      <Menu.Title>
        <h3 className="text-lg font-bold">
          Admin Menu
        </h3>
      </Menu.Title>
      <Menu.Item>
        <Link to="/admin">
          Home
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/users">
          Users
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/admin/warehouses">
          Warehouses
        </Link>
      </Menu.Item>
    </Menu>
  )
}