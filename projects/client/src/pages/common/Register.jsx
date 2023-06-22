import { Card, Button, Input, Form } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { FaReact } from "react-icons/fa";
import { getRole } from "@/api/token";
import { useEffect } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => await register(data)
  });
  const { isLoading, isSuccess } = mutation;
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      fullname: ""
    },
    onSubmit: (data) => {
      mutation.mutate(data);
    }
  });
  useEffect(() => {
    const role = getRole();
    role && navigate(`/${role.toLowerCase()}`);
  }, []);
  return (
    <main className='flex w-full items-center justify-center'>
      <Card>
        <div className='mx-4'>
          <Card.Body className='items-center text-center'>
            <Card.Title tag='h1' className='text-2xl'>
              Create A New Account!
            </Card.Title>
            <Form onSubmit={formik.handleSubmit} className='w-full'>
              <label id='email' className='label'>
                <span className='label-text'>Email</span>
              </label>
              <Input
                name='email'
                onChange={formik.handleChange}
                id='email'
                type='email'
                placeholder='name@gmail.com'
              />
              <label id='username' className='label'>
                <span id='username' className='label-text'>
                  Username
                </span>
              </label>
              <Input
                name='username'
                id='username'
                type='text'
                onChange={formik.handleChange}
              />
              <label id='fullname' className='label'>
                <span className='label-text'>Fullname</span>
              </label>
              <Input
                name='fullname'
                onChange={formik.handleChange}
                id='fullname'
                type='text'
              />
              <Card.Actions className='items-center text-center w-full flex flex-col justify-normal gap-4'>
                <Button disabled={isLoading || isSuccess} type='submit' color='default' className='w-full my-8'>
                  <h1 className='font-semibold text-lg text-pink-50'>
                    {
                      (isLoading) ? <FaReact className="loading-icon" /> : <>Sign Up</>
                    }
                  </h1>
                </Button>
              </Card.Actions>
            </Form>
            <h1 className='font-semibold font-sans'>
              Already Have Account?
              <Link to='/login'>
                <span className='text-blue-700 ml-1'>Sign In!</span>
              </Link>
            </h1>
          </Card.Body>
        </div>
      </Card>
    </main>
  );
}
