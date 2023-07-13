import { FaReact } from "react-icons/fa";

export default function LoaderText () {
	return (
		<div className="flex gap-3 justify-center items-center">
			<div className="animate-spin">
				<FaReact className="text-2xl" />{" "}
			</div>
			<b>
				Loading...
			</b>
		</div>
	)
}