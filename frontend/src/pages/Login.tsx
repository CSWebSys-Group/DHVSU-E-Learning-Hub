import { useState } from "react";
import { motion } from "framer-motion";
import { dhvsuBg, dhvsuLogo } from "../utils/Images";
import Input from "../components/Input";
import { Mail, Lock, Eye, EyeClosed, Loader, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // handling error (if user exists, do not display error) otherwise error should return false.
    const error = false;

    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!res.ok) throw new Error("Error logging in");

            const data = await res.json();

            console.log(data);

            // redirects to home after login success
            navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="w-1/2 bg-white bg-opacity-50 backldrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex"
            style={{
                height: "600px",
            }}
        >
            <div className="w-full">
                <img
                    className="w-full h-full absolute -z-50 opacity-10 object-cover filter blur-md"
                    src={dhvsuBg}
                    alt=""
                />
                <div className="p-8">
                    <div className="flex items-center justify-center flex-col font-poppins">
                        <img
                            src={dhvsuLogo}
                            width={128}
                            height={128}
                            alt="DHVSU school logo"
                        />
                        <h2 className="text-3xl font-bold mt-2 mb-6 text-center text-maroon">
                            Login
                        </h2>
                    </div>

                    <form onSubmit={handleLoginSubmit}>
                        <Input
                            icon={Mail}
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            icon={Lock}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isPassword={true}
                        />

                        <div className="flex items-center mb-6">
                            <Link
                                to={"/forgot-password"}
                                className="text-sm text-maroon hover:underline font-poppins"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        {error && (
                            <div className="w-full bg-[#FAE5E5] py-2 px-2 border border-red-400 flex items-center gap-2 rounded-md mb-4">
                                <span className="bg-red-600 rounded-full">
                                    <X color="white" size={18} />
                                </span>
                                <span className="text-red-600">
                                    Credentials does not exists, please try
                                    again.
                                </span>
                            </div>
                        )}

                        <motion.button
                            className="w-full py-3 px-4 bg-gradient-to-r from-maroon-400 to-maroon-300 text-white  rounded-lg shadow-lg hover:from-maroon-400 hover:to-maroon-500 :outline-none focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 font-poppins"
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin  mx-auto" />
                            ) : (
                                "Log In"
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>
            <div className="w-full rounded-l-[8rem] p-8 bg-maroon flex justify-center items-center backdrop-filter backdrop-blur-lg">
                <div className="flex flex-col justify-center items-center gap-6">
                    <h2 className="text-4xl text-white font-poppins">
                        Welcome, Honorian!
                    </h2>
                    <p className="text-sm font-poppins text-white font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit est reiciendis aspernatur a. Iusto, nisi quos
                        obcaecati quasi similique, illo recusandae quae autem
                        vel eveniet officiis dicta vitae nostrum dolorem.
                    </p>
                    <button className="px-8 py-3 rounded-lg bg-transparent border border-white text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                        <p className="group-hover:text-black z-10 duration-300 relative">
                            Sign Up
                        </p>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
