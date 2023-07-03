import { Button, ButtonGroup } from "react-daisyui";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function CartItem (props) {
	return (
		<div className="flex flex-wrap p-5 gap-3">
			<div className="flex-1">
				
			</div>
			<div className="flex flex-0 justify-center items-center p-4">
				<ButtonGroup>
					<Button color="warning">
						<FaMinus />
					</Button>
					<Button>
						1
					</Button>
					<Button color="warning">
						<FaPlus />
					</Button>
				</ButtonGroup>
			</div>
		</div>
	)
}