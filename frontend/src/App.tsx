import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Pages
import Home from "./pages/Home";
import HomeContents from "./pages/Home/Home";

import Campuses from "./pages/Home/Campuses/Campuses";
import MainCampus from "./pages/Home/Campuses/MainCampus";
import PoracCampus from "./pages/Home/Campuses/PoracCampus";
import ApalitCampus from "./pages/Home/Campuses/ApalitCampus";
import CandabaCampus from "./pages/Home/Campuses/CandabaCampus";
import LubaoCampus from "./pages/Home/Campuses/LubaoCampus";
import MexicoCampus from "./pages/Home/Campuses/MexicoCampus";
import SanFernandoCampus from "./pages/Home/Campuses/SanFernandoCampus";
import SantoTomaxCampus from "./pages/Home/Campuses/SantoTomasCampus";

import AboutUs from "./pages/Home/AboutUs";
import ContactUs from "./pages/Home/ContactUs";

import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";

// Layouts
import Layout from "./pages/Auth/Layout";
import RootLayout from "./layouts/RootLayout";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";
import Profile from "./pages/Profile/Profile";
import Subjects from "./pages/Subjects/Subjects";
import Grades from "./pages/Grades/Grades";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/404/not-found";
import LoadingSpinner from "./components/LoadingSpinner";
import Help from "./pages/Help/Help";
import ProtectedAuthRoutes from "./layouts/ProtectedAuthRoutes";
import ProtectedNotAuthRoutes from "./layouts/ProtectedNotAuthRoutes";
import Submissions from "./pages/Submissions/Submissions";
import SubjectTask from "./pages/SubjectTask/SubjectTask";

import EnrolledSubject from "./pages/Subjects/EnrolledSubjects/EnrolledSubject";
import Index from "./pages/Subjects/Index";

import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";

function App() {
  const context = useContext(AppContext);
  const [loading, setLoading] = useState(true); // Start with `true`

  useEffect(() => {
    if (context) {
      setLoading(false); // When context is ready, stop loading
    }
  }, [context]);

  const { user, token, setToken, setUser } = context!;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomeContents />} />

            {/* Campuses Route */}
            <Route path="campuses" element={<Campuses />}>
              <Route index element={<MainCampus />} />
              <Route path="main-campus" element={<MainCampus />} />
              <Route path="candaba-campus" element={<CandabaCampus />} />
              <Route path="porac-campus" element={<PoracCampus />} />
              <Route path="apalit-campus" element={<ApalitCampus />} />
              <Route path="lubao-campus" element={<LubaoCampus />} />
              <Route path="mexico-campus" element={<MexicoCampus />} />
              <Route
                path="san-fernando-campus"
                element={<SanFernandoCampus />}
              />
              <Route path="santo-tomas-campus" element={<SantoTomaxCampus />} />
            </Route>

            <Route path="about-us" element={<AboutUs />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>

          {/* Protected routes for unauthenticated users */}
          <Route element={<ProtectedNotAuthRoutes token={token} />}>
            <Route path="/auth" element={<Layout />}>
              <Route index element={<SignUp setToken={setToken} />} />
              <Route path="signup" element={<SignUp setToken={setToken} />} />
              <Route path="login" element={<Login setToken={setToken} />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>
          </Route>

          {/* Protected routes for authenticated users */}
          <Route element={<ProtectedAuthRoutes token={token} />}>
            {loading || !user ? (
              <Route path="*" element={<LoadingSpinner loading={true} />} />
            ) : (
              <>
                <Route
                  path="/user"
                  element={
                    <RootLayout
                      user={user}
                      token={token}
                      setToken={setToken}
                      setUser={setUser}
                    />
                  }
                >
                  <Route
                    index
                    element={<Navigate to="/user/dashboard" replace />}
                  />
                  <Route
                    path="dashboard"
                    element={<Dashboard user={user!} />}
                  />
                  <Route path="calendar" element={<Calendar />} />
                  <Route
                    path="profile"
                    element={
                      <Profile user={user!} token={token!} setUser={setUser} />
                    }
                  />
                  <Route path="subjects" element={<Subjects />}>
                    <Route
                      index
                      element={<Index user={user!} token={token!} />}
                    />
                    <Route
                      path=":id"
                      element={<EnrolledSubject token={token!} user={user} />}
                    />
                  </Route>
                  <Route path="help" element={<Help />} />
                  <Route path="submissions" element={<Submissions />} />

                  {user.user.user_type === "S" && (
                    <>
                      <Route path="grades" element={<Grades user={user!} />} />
                      <Route path="activities/:id" element={<SubjectTask />} />
                    </>
                  )}
                </Route>
              </>
            )}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
