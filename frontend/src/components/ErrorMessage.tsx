import { motion } from "framer-motion";
import { CircleAlert, X } from "lucide-react";

const ErrorMessage = ({
  error,
  setHideErrorMessage,
}: {
  error: string;
  setHideErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      className="bg-red-100 w-full shadow-drop-1 rounded-md h-14 flex items-center px-4 gap-4 mb-4"
      initial={{
        opacity: 0,
        x: "100%",
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <CircleAlert color="red" />
      <div>
        <p className="font-semibold text-red">{error}</p>
      </div>
      <X
        className="ml-auto cursor-pointer"
        size={16}
        onClick={() => setHideErrorMessage(false)}
      />
    </motion.div>
  );
};

export default ErrorMessage;
