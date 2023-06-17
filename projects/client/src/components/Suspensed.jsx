import { Suspense } from "react";
import Loading from "./Loading";

export default function Suspensed (props) {
	return <Suspense fallback={<Loading />}>{props.children}</Suspense>
}