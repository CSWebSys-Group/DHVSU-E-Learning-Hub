import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  icon: React.ElementType;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
};

const Input = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  isPassword,
}: Props) => {
  const [inputType, setInputType] = useState(type);
  const [passwordHidden, setPasswordHidden] = useState(true);

  // Password hidden logic (can improve)
  const togglePasswordHidden = () => {
    setInputType(inputType === "password" ? "text" : "password");
    setPasswordHidden((pass) => !pass);
  };

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-maroon" />
      </div>
      <input
        type={inputType}
        className="w-full pl-10 pr-3 py-2 bg-[#fff] text-maroon bg-opacity-50 rounded-lg focus:border-maroon focus:ring-2 focus:ring-maroon  placeholder-maroon border hover:border-maroon placeholder-opacity-50 transition duration-200 outline-none shadow-sm font-poppins"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {isPassword ? (
        <button
          type="button"
          className="absolute right-0 inset-y-0 flex items-center pr-3 cursor-pointer"
          onClick={togglePasswordHidden}
        >
          {passwordHidden ? (
            <Eye className="text-maroon" />
          ) : (
            <EyeOff className="text-maroon" />
          )}
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
