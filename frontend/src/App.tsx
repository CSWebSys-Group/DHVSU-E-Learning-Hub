import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";

function App() {
  return (
    <div className="h-screen relative sm:flex sm:items-center sm:justify-center bg-[#D9CAC5]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
