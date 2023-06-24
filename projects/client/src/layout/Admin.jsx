import { Outlet } from "react-router-dom";
import Layout from "./Layout";

export default function AdminLayout() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}