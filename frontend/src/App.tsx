import { Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { ExpandableButton } from "./components/ui/expandable-button";

function App() {
  return (
    <div className="h-screen relative sm:flex sm:items-center sm:justify-center overflow-hidden bg-[#D9CAC5]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="absolute bottom-5 right-5">
        <ExpandableButton>
          <Link to={"/home"} className="rounded-md text-white font-bold">
            Home
          </Link>
          <Link to={"/login"} className="rounded-md text-white font-bold">
            Log In
          </Link>
          <Link to={"/signup"} className="rounded-md text-white font-bold">
            Sign Up
          </Link>
        </ExpandableButton>
      </div>
    </div>
  );
}

export default App;
