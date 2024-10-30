import { useState } from "react";
import { motion } from "framer-motion";
import { dhvsuBg, dhvsuLogo } from "../utils/Images";
import Input from "../components/Input";
import { User } from "lucide-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentNo, setStudentNo] = useState("");

  //
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");

  const handleSignUpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit est
            reiciendis aspernatur a. Iusto, nisi quos obcaecati quasi similique,
            illo recusandae quae autem vel eveniet officiis dicta vitae nostrum
            dolorem.
          </p>
          <button className="px-8 py-3 rounded-lg bg-transparent border border-white text-white">
            Login
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
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
              />
            </div>
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
