import { FaTimesCircle } from "react-icons/fa";

export default function Error (props) {
	const { message } = props;

	return (
		<div className="bg-error p-6 text-white">
			<div className="text-3xl font-extrabold flex flex-col">
				<b>
					<FaTimesCircle className="text-3xl" />
					Error
				</b>
			</div>
			<div className="text-xl">
				{message}
			</div>
		</div>
	)
}