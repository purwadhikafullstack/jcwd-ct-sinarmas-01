import { Card, Button, Input, Form } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import PassInput from "@/components/Password";

export default function Login() {
  const mutation = useMutation({
    mutationFn: async (data) => await login(data)
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (data) => {
      mutation.mutate(data);
    }
  });
  return (
    <main className="flex w-full items-center justify-center">
      <Card className="bg-base-200 shadow-2xl shadow-blue-700">
        <div className="mx-4">
          <Card.Body className="items-center text-center">
            <Card.Title tag="h1" className="text-2xl">
              Login to your account
            </Card.Title>
            <Form onSubmit={formik.handleSubmit} className="w-full">
              <label id="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <Input
                name="email"
                onChange={formik.handleChange}
                id="email"
                type="email"
                placeholder="name@gmail.com"
              />
              <label id="password" className="label">
                <span className="label-text">Password</span>
              </label>
              <PassInput id="password" name="password" onChange={formik.handleChange} />
              <Card.Actions className="items-center text-center w-full flex flex-col justify-normal gap-4">
                <Button type="submit" color="default" className="w-full my-8">
                  <h1 className="font-semibold text-lg text-pink-50">
                    Log Me In !
                  </h1>
                </Button>
              </Card.Actions>
            </Form>
            <h1 className="font-semibold font-sans">
              Don't have account?
              <Link to="/register">
                <span className="text-blue-700 ml-1">Register Now</span>
              </Link>
            </h1>
          </Card.Body>
        </div>
      </Card>
    </main>
  );
}
