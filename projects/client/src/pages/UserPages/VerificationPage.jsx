import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Card, Input, Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import swal from "sweetalert";

export default function VerificationPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Loading...");
  const [icon1, setIcon1] = useState(eyeOff);
  const [icon2, setIcon2] = useState(eyeOff);
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  const { token } = useParams();
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const inputHandler = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  useEffect(() => {
    Axios.patch(
      `${process.env.REACT_APP_API_BASE_URL}/auth/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        setMessage(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  }, []);
  const iconToggle = (type, setType, setIcon) => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const submitPassword = (e) => {
    e.preventDefault();
    const { password, confirmPassword } = input;
    Axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/auth/setting-password`,
      {
        password,
        confirmPassword,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        navigate("/login");
        swal({
          title: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        if (err.response) {
          swal({ title: err.response.data.message, icon: "success" });
        } else {
          swal({ title: err.message, icon: "warning" });
        }
      });
  };
  if (message === true) {
    return (
      <>
        <main className='flex w-full mb-20 items-center justify-center'>
          <Card className='bg-slate-100 shadow-2xl w-5/12'>
            <div className='mx-4'>
              <Card.Body className='items-center text-center'>
                <Card.Title tag='h1' className='text-2xl'>
                  Setting Your Password
                </Card.Title>
                <form onSubmit={submitPassword} className='form-control w-full'>
                  <label id='password' className='label'>
                    <span className='label-text'>Password</span>
                  </label>
                  <div className='flex flex-row justify-between gap-2 items-center'>
                    <Input
                      className='w-full'
                      onChange={inputHandler}
                      id='password'
                      name='password'
                      type={type1}
                    />
                    <Icon
                      onClick={() => iconToggle(type1, setType1, setIcon1)}
                      icon={icon1}
                    />
                  </div>
                  <label id='confirmPassword' className='label'>
                    <span className='label-text'>Confirm Password</span>
                  </label>
                  <div className='flex flex-row justify-between gap-2 items-center'>
                    <Input
                      id='confirmPassword'
                      name='confirmPassword'
                      onChange={inputHandler}
                      type={type2}
                      className='w-full'
                    />
                    <Icon
                      onClick={() => iconToggle(type2, setType2, setIcon2)}
                      icon={icon2}
                    />
                  </div>

                  <Card.Actions className='mt-4 items-center text-center w-full'>
                    <Button type='submit' color='default' className='w-full'>
                      <h1 className='font-semibold text-lg text-pink-50'>
                        Submit
                      </h1>
                    </Button>
                  </Card.Actions>
                </form>
              </Card.Body>
            </div>
          </Card>
        </main>
      </>
    );
  } else {
    return (
      <div className='text-center mt-36'>
        <h1 className='font-bold'>{message}</h1>
      </div>
    );
  }
}
