import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./pages/Auth/Layout";

// pages
import Home from "./pages/Home";
import HomeContents from "./pages/Home/Home";
import Campuses from "./pages/Home/Campuses";
import OnlineServices from "./pages/Home/OnlineServices";
import Features from "./pages/Home/Features";

import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Profile from "./pages/Profile/Profile";
import Subjects from "./pages/Subjects/Subjects";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/404/not-found";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  if (!context) return <LoadingSpinner loading={!loading} />;

  const { user, token, setToken, setUser } = context;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeContents />} />
            <Route path="campuses" element={<Campuses />} />
            <Route path="online-services" element={<OnlineServices />} />
            <Route path="features" element={<Features />} />
          </Route>
          {/* Routes for unauthenticated users */}
          {!context.token && (
            <Route path="auth" element={<Layout />}>
              <Route index element={<SignUp />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
            </Route>
          )}

          {/* Protected routes for authenticated users */}
          {token && user && (
            <Route
              path="/"
              element={
                <RootLayout
                  user={user}
                  token={token}
                  setToken={setToken}
                  setUser={setUser}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="profile" element={<Profile />} />
              <Route path="subjects" element={<Subjects />} />
            </Route>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
