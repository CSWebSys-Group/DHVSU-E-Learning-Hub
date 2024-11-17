import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Auth/Layout";

// pages
import Home from "./pages/Home";
import SignUp from "./pages/Auth/SignUp/SignUp";
import Login from "./pages/Auth/Login/Login";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

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
                </Routes>
                <RootLayout>
                    <Routes>
                        <Route path="dashboard" element={<Dashboard />}></Route>
                    </Routes>
                </RootLayout>
            </BrowserRouter>
        </>
    );
}

export default App;
