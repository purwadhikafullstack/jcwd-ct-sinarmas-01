import { Card, Button, Input } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import swal from "sweetalert";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    username: "",
    fullname: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  console.log(process.env.REACT_APP_API_BASE_URL);
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, username, fullname } = input;
    Axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
      email,
      username,
      fullname,
    })
      .then((res) => {
        console.log(res);
        swal({ title: "Registration Success", icon: "success" });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          const { data } = err.response;
          swal({ title: data.message, icon: "warning" });
        } else {
          swal({ title: err.message, icon: "warning" });
        }
      });
  };
  return (
    <main className='flex w-full mb-20 items-center justify-center'>
      <Card className='bg-slate-100 shadow-2xl lg:w-5/12 w-8/12'>
        <div className='mx-4'>
          <Card.Body className='items-center text-center'>
            <Card.Title tag='h1' className='text-2xl'>
              Create A New Account!
            </Card.Title>
            <form onSubmit={onSubmit} className='form-control w-full'>
              <label id='email' className='label'>
                <span className='label-text'>Email</span>
              </label>
              <Input
                name='email'
                onChange={inputHandler}
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
                onChange={inputHandler}
              />
              <label id='fullname' className='label'>
                <span className='label-text'>Fullname</span>
              </label>
              <Input
                name='fullname'
                onChange={inputHandler}
                id='fullname'
                type='text'
              />
              <Card.Actions className='items-center text-center w-full flex flex-col justify-normal gap-4'>
                <Button type='submit' color='default' className='w-full my-8'>
                  <h1 className='font-semibold text-lg text-pink-50'>
                    SIGN UP
                  </h1>
                </Button>
                <h1 className='font-semibold text-lg mb-5'>or register with</h1>
                <div className='flex flex-row justify-center'>
                  <Card className='w-6/12'>
                    <Card.Image
                      src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/706px-Google_%22G%22_Logo.svg.png'
                      className='w-2/12'
                    />
                    <Card.Body className='items-center text-center'>
                      <Card.Title tag='h1' className='text-2xl'>
                        Google
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              </Card.Actions>
            </form>
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
