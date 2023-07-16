import { FaReact } from "react-icons/fa";

export default function Loading () {
	return (
		<div className="flex flex-col justify-center items-center text-4xl font-bold gap-3">
			<FaReact scale={5} className="loading-icon" />
			<div>
				Loading ...
			</div>
		</div>
	);
}