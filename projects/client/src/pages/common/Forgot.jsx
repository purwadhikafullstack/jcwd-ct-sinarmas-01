import { Button, Input, Card } from "react-daisyui";
import { useFormik } from "formik";
import useResetPass from "@/hooks/mutations/common/useResetPass";
import { useState, useEffect } from "react";

export default function Forgot(props) {
	const mutation = useResetPass();
	const [cooldown, setCooldown] = useState(0);
	const formik = useFormik({
		initialValues: {
			email: ""
		},
		onSubmit: (values) => {
			mutation.mutate(values);
			setCooldown(30);
		}
	});

	useEffect(() => {
		props.timer > 0 && setCooldown(Number(props.timer));
	}, [props.timer]);
	
	useEffect(() => {
		let interval;
		if(cooldown) {
			interval = window.setInterval(() => setCooldown(time => time - 1), 1000);
		}
		return () => window.clearInterval(interval);
	}, [cooldown]);
	return (
		<div className="flex justify-center items-center w-full">
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">
						Enter your email to send link
					</Card.Title>
					<form className="mb-4" onSubmit={formik.handleSubmit}>
						<Input 
							onChange={formik.handleChange} 
							className="w-full" 
							placeholder="Your E-mail Here" 
							name="email" 
							disabled={cooldown}
						/>
						<Button disabled={cooldown} color="primary" className="w-full my-4" type="submit" fullWidth>
							{!cooldown ? "Send" : `Please wait after ${cooldown} seconds`}
						</Button>
					</form>
					<div>
						Please check your e-mail inbox and spam box
					</div>
				</Card.Body>
			</Card>
		</div>	
	)
};