import { Outlet } from "react-router-dom";

export default function Admin () {
  return (
    <div className="p-3">
      <Outlet />
    </div>
  )
}