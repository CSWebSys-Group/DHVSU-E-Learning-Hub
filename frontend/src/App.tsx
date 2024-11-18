import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Auth/Layout";

// pages
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="auth" element={<Layout />}>
            <Route index element={<SignUp />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route path="/" element={<RootLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar " element={<Calendar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
