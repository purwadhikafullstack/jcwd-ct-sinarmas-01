import { Card, Button, Input, Form } from "react-daisyui";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import PassInput from "@/components/Password";
import { FaReact } from "react-icons/fa";

export default function Login() {
  const mutation = useMutation({
    mutationFn: async (data) => await login(data)
  });
  const { isLoading, isSuccess } = mutation;
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
    <div className="flex w-full items-center justify-center">
      <Card>
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
              <PassInput placeholder="Enter your password" id="password" name="password" onChange={formik.handleChange} />
              <Card.Actions className="items-center text-center w-full flex flex-col justify-normal gap-4">
                <Button 
                  type="submit" 
                  color="default" 
                  className="w-full my-8 font-semibold text-lg text-pink-50"
                  disabled={isLoading || isSuccess}
                >
                  {
                    isLoading ? <FaReact className="loading-icon" /> : <>Login</>
                  }
                </Button>
              </Card.Actions>
            </Form>
            <h1 className="flex flex-col justify-end items-center gap-2 font-semibold font-sans">
              <Link to="/register" className="link">
                New Account
              </Link>
              <Link to="/forgot" className="link">
                Forgot Password?
              </Link>
              <Link to="/forgot" className="link">
                I'm not verified
              </Link>
            </h1>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}
