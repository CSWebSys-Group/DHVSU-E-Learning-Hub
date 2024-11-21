import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import SantoTomaxCampus from "./pages/Home/Campuses/SantoTomaxCampus";

import OnlineServices from "./pages/Home/OnlineServices";
import Features from "./pages/Home/Features";

import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";

// Layouts
import Layout from "./pages/Auth/Layout";
import RootLayout from "./layouts/RootLayout";

// Dashboard
import Dashboard from "./pages/Dashboard/Dashboard";
import Calendar from "./pages/Calendar/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Route */}
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
            <Route path="san-fernando-campus" element={<SanFernandoCampus />} />
            <Route path="santo-tomas-campus" element={<SantoTomaxCampus />} />
          </Route>

          <Route path="online-services" element={<OnlineServices />} />
          <Route path="features" element={<Features />} />
        </Route>

        {/* Auth Routes */}
        <Route path="auth" element={<Layout />}>
          <Route index element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Root Layout for Dashboard and Calendar */}
        <Route path="dashboard" element={<RootLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
