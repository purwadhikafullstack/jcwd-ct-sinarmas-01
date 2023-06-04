import { useFormik } from "formik";
import { Card, Form, Button } from "react-daisyui";
import loginSchema from "../../schemas/login";
import PassInput from "../../components/Password";
import TextInput from "../../components/Text";

export default function AdminLogin() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
  });
  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Form onSubmit={formik.handleSubmit}>
        <Card.Body>
          <Card.Title className="mb-3">Login to Admin Dashboard</Card.Title>
          <div>
            <TextInput
              name="email"
              id="email"
              onChange={formik.handleChange}
              placeholder="Enter E-mail"
              error={formik.errors.email}
            />
            <PassInput
              name="password"
              id="password"
              onChange={formik.handleChange}
              placeholder="Enter password"
              error={formik.errors.password}
            />
          </div>
        </Card.Body>
        <Card.Actions className="p-5">
          <Button type="submit" color="success" fullWidth>
            Submit
          </Button>
        </Card.Actions>
      </Form>
    </Card>
  );
}
