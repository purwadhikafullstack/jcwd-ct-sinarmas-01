import { Outlet } from "react-router-dom";

export default function Admin () {
  return (
    <>
      <h1 className="text-center text-2xl font-semibold mb-8">
        Admin Page
      </h1>
      <div className="p-3">
        <Outlet />
      </div>
    </>
  )
}