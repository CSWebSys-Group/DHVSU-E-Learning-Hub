import { useState } from "react";
import { motion, useTime } from "framer-motion";
import { dhvsuBg, dhvsuLogo } from "../utils/Images";
import Input from "../components/Input";
import { User, Lock, Mail, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [studentNo, setStudentNo] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");

    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState("0%");

    const [retypePassword, setRetypePassword] = useState("");
    const [matchProgress, setMatchProgress] = useState("0%");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const navigate = useNavigate();

    const handleRetypePassword = (retypeValue: string): void => {
        setRetypePassword(retypeValue);
        if (retypeValue.length === 0) {
            setMatchProgress("0%");
            setPasswordsMatch(false);
        } else {
            const matches = password === retypeValue;
            setPasswordsMatch(matches);
            setMatchProgress(matches ? "100%" : "0%");
        }
    };

    const handlePassword = (passwordValue: string): void => {
        const strengthChecks = {
            length: passwordValue.length >= 8,
            hasUpperCase: /[A-Z]/.test(passwordValue),
            hasLowerCase: /[a-z]/.test(passwordValue),
            hasDigit: /\d/.test(passwordValue),
            hasSpecialChar: /[^A-Za-z0-9]/.test(passwordValue),
        };

        const verifiedList = Object.values(strengthChecks).filter(Boolean);
        const strength =
            verifiedList.length === 5
                ? "Strong"
                : verifiedList.length >= 2
                ? "Medium"
                : "Weak";

        setPassword(passwordValue);
        setProgress(`${(verifiedList.length / 5) * 100}%`);
        setMessage(strength);
    };

    const getActiveColor = (type: string) => {
        if (type === "Strong") return "#3FBB60";
        if (type === "Medium") return "#FE804D";
        if (type === "Weak") return "#FE804D";
        return "#FF0054";
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const res = await fetch(
                "http://127.0.0.1:8000/api/register-student",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: studentNo,
                        fn: firstName,
                        ln: lastname,
                        email,
                        password,
                        password_confirmation: retypePassword,
                    }),
                }
            );

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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-1/2 bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex"
            style={{ height: "600px" }}
        >
            <div className="w-1/2 h-full p-8 bg-maroon rounded-r-[8rem] flex justify-center items-center backdrop-filter backdrop-blur-lg">
                <div className="flex flex-col justify-center items-center gap-6">
                    <img
                        src={dhvsuLogo}
                        alt="DHVSU School Logo"
                        width={128}
                        height={128}
                    />
                    <h2 className="text-2xl text-white font-poppins font-bold">
                        May account kana?
                    </h2>
                    <p className="text-sm font-poppins text-white font-light">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Velit est reiciendis aspernatur a.
                    </p>
                    <button className="px-8 py-3 rounded-lg bg-transparent border border-white text-white relative overflow-hidden group">
                        <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
                        <p className="group-hover:text-black z-10 duration-300 relative uppercase font-bold tracking-wider">
                            Log in
                        </p>
                    </button>
                </div>
            </div>
            <div className="w-1/2">
                <div className="p-8">
                    <h2 className="text-3xl font-bold mt-2 mb-6 text-center text-maroon">
                        Sign Up
                    </h2>
                    <form onSubmit={handleSignUpSubmit}>
                        <Input
                            icon={User}
                            type="text"
                            placeholder="Student Number"
                            value={studentNo}
                            onChange={(e) => setStudentNo(e.target.value)}
                        />
                        <div className="flex gap-4">
                            <Input
                                icon={User}
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <Input
                                icon={User}
                                type="text"
                                placeholder="Second Name"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <Input
                            icon={Mail}
                            type="text"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="relative">
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => handlePassword(e.target.value)}
                                isPassword={true}
                            />
                            <div className="h-1 w-full bg-gray-300 rounded -mt-5">
                                <div
                                    className="h-full rounded"
                                    style={{
                                        width: progress,
                                        backgroundColor:
                                            progress === "0%"
                                                ? "#C0C0C0"
                                                : getActiveColor(message), // Use gray if progress is 0%
                                    }}
                                />
                            </div>
                        </div>
                        {password.length !== 0 && (
                            <p
                                className="mt-2 text-sm"
                                style={{ color: getActiveColor(message) }}
                            >
                                Your password is {message}
                            </p>
                        )}

                        <div className="mt-5">
                            <Input
                                icon={Lock}
                                type="password"
                                placeholder="Re-type Password"
                                value={retypePassword}
                                onChange={(e) =>
                                    handleRetypePassword(e.target.value)
                                }
                                isPassword={true}
                            />
                            <div className="progress-bg relative h-1 bg-gray-200 rounded -mt-5">
                                <div
                                    className="progress h-full rounded-lg"
                                    style={{
                                        width: matchProgress,
                                        backgroundColor:
                                            matchProgress === "0%"
                                                ? "#C0C0C0"
                                                : passwordsMatch
                                                ? "#3FBB60"
                                                : "#FF0054", // Use gray if progress is 0%
                                    }}
                                />
                            </div>
                            {retypePassword.length !== 0 && (
                                <p
                                    className="message"
                                    style={{
                                        color: passwordsMatch
                                            ? "#3FBB60"
                                            : "#FF0054",
                                    }}
                                >
                                    {passwordsMatch
                                        ? "Passwords match"
                                        : "Passwords do not match"}
                                </p>
                            )}
                        </div>

                        <motion.button
                            className="w-full py-3 px-4 bg-gradient-to-r from-maroon-400 to-maroon-300 text-white rounded-lg shadow-lg hover:from-maroon-400 hover:to-maroon-500 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 font-poppins font-bold uppercase tracking-wider mt-5"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin mx-auto" />
                            ) : (
                                "Sign up"
                            )}
                        </motion.button>
                    </form>
                </div>
            </div>

            <img
                className="w-full h-full absolute -z-50 opacity-10 object-cover filter blur-sm"
                src={dhvsuBg}
                alt=""
            />
        </motion.div>
    );
};

export default Signup;
