import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-[#D9CAC5]">
      <Routes>
        <Route path="/" element={"Home"} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
