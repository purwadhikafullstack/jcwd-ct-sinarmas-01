import React from 'react';

const Navbar = () => {
  return (
    <div className="navbar bg-black">
      <div className="navbar-start flex-grow">
        <a className="btn btn-ghost normal-case text-xl text-white">PhoneStore</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
            <li>
              <a href="#">Handphone</a>
            </li>
            <li>
              <a href="#">Aksesoris</a>
              <ul className="p-2">
                <li>
                  <a href="#">Aksesoris Android</a>
                </li>
                <li>
                  <a href="#">Aksesoris Iphone</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Tablet</a>
            </li>
          </ul>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="#">Handphone</a>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Aksesoris</summary>
                <ul className="p-2">
                  <li>
                    <a href="#">Aksesoris Android</a>
                  </li>
                  <li>
                    <a href="#">Aksesoris Iphone</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a href="#">Tablet</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
