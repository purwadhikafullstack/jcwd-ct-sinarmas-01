import React from "react";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={<Navigate to="/homepage" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
