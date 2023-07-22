import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';

const element = document.getElementById("root");
const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);