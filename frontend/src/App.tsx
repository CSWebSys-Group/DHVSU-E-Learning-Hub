import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomeLayout from "./Layout/HomeLayout";

function App() {
  return (
    // <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#D9CAC5]">
    <div className="">
      <Routes>
        <Route path="/" element={"Home"} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<HomeLayout />} />
      </Routes>
    </div>
  );
}

export default App;
