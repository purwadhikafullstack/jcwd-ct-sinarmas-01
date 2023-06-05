import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validasi input email dan password
    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    axios
      .post('http://localhost:8000/api/login', { email, password })
      .then((res) => {
        console.log(res);
        if (res.data.message === 'Login success') {
           navigate('/HomePage');
        } else {
          setError('Login failed');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred. Please try again.');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-300">
      <div className="max-w-xs p-8 rounded-md shadow-md bg-white">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
          <div className="mb-4">
            <label className="block mb-2 text-black" htmlFor="email">
              Email
            </label>
            <input
              className="input input-bordered w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-black" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="input input-bordered w-full"
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="btn btn-sm btn-secondary absolute top-2 right-2"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 9V7a5 5 0 019.9-1"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
