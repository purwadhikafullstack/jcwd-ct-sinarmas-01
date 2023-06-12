import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/UserPages/RegisterPage";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import VerificationPage from "./pages/UserPages/VerificationPage";
function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <Layout>
              <RegisterPage />
            </Layout>
          }
          path='/register'
        />
        <Route
          element={
            <Layout>
              <VerificationPage />
            </Layout>
          }
          path='/authentication/:token'
        />
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
