import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import App from './App';
import Admin from "./pages/admin";
import Home from "./pages/Home";
import MainAdmin from './pages/admin/Main';
import ManageUser from './pages/admin/ManageUser';
import ManageWareHouses from './pages/admin/Warehouses';
import AdminLogin from './pages/admin/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Admin />}>
            <Route path="" element={<MainAdmin />} />
            <Route path="users" element={<ManageUser />} />
            <Route path="warehouses" element={<ManageWareHouses />} />
            <Route path="login" element={<AdminLogin />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
