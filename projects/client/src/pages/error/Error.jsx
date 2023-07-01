import { FaTimesCircle } from "react-icons/fa";

export default function Error (props) {
	const { message } = props;

	return (
		<div className="bg-error p-6 text-white">
			<span>
				<FaTimesCircle />
			</span>{" "}
			<span className="text-3xl font-extrabold">
				Error
			</span>
			<div className="text-xl">
				{message}
			</div>
		</div>
	)
}