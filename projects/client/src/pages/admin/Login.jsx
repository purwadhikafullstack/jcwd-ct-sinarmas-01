import { useFormik } from "formik";
import { Card } from "react-daisyui";

export default function AdminLogin () {
  return (
    <Card className="bg-base-300 shadow-md shadow-blue-700">
      <Form>
        <Card.Body>
          <Card.Title className="mb-3">
            Login to Admin Dashboard
          </Card.Title>
        </Card.Body>
      </Form>
    </Card>
  )
}