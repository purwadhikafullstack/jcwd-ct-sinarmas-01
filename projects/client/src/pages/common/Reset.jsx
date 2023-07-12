import { Card, Button, Form } from "react-daisyui";
import Password from "@/components/Password";
import { useFormik } from "formik";
import useSetPassword from "@/hooks/mutations/common/useSetPassword";
import { FaReact } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function Reset () {
	const mutation = useSetPassword();
	const { isLoading, isSuccess } = mutation;
	const { mode } = useParams();
	const formik = useFormik({
		initialValues: {
			password: "",
			confirmpass: ""
		},
		onSubmit: (values) => {
			(values.password === values.confirmpass) && mutation.mutate(values);
		}
	});
	return (
		<div className="flex w-full justify-center items-center">
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">{mode === "verify" ? "Create" : "Reset"} password</Card.Title>
					<Form onChange={formik.handleChange} onSubmit={formik.handleSubmit}>
						<Password name="password" label="Password" placeholder="Enter new password" />
						<Password name="confirmpass" label="Confirm Password" placeholder="Re-enter your new password" />
						<Button disabled={isLoading || isSuccess} type="submit" fullWidth color="primary">
							{
								isLoading ? <FaReact className="loading-icon" /> : <>Send</>
							}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	)
}