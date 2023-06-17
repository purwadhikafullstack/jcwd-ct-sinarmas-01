import { Card, Button, Input, Form } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import { useFormik } from "formik";
import { register } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export default function RegisterPage() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => await register(data),
    onSuccess: (data) => {
      swal.fire({ title: data.message, icon: "success" }).then((res) => res && navigate("/login"));
    }
  });
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
  return (
    <main className='flex w-full items-center justify-center'>
      <Card className='bg-base-200 shadow-2xl shadow-blue-700'>
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
                <Button type='submit' color='default' className='w-full my-8'>
                  <h1 className='font-semibold text-lg text-pink-50'>
                    SIGN UP
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
