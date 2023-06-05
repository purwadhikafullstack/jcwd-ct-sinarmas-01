import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-white shadow py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome to PhoneStore!</h1>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-8 px-6">
        <h2 className="text-2xl font-bold mb-4">Explore our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2">Smartphones</h3>
            <p>Discover our latest collection of smartphones.</p>
            <button className="btn btn-primary mt-4">Shop Now</button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2">Tablets</h3>
            <p>Find the perfect tablet for work or play.</p>
            <button className="btn btn-primary mt-4">Shop Now</button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-2">Accessories</h3>
            <p>Enhance your devices with our range of accessories.</p>
            <button className="btn btn-primary mt-4">Shop Now</button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 py-4 px-6">
        <div className="container mx-auto">
          <p className="text-center">© 2023 PhoneStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
