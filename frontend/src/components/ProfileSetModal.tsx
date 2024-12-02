import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import FileInput from "./ui/file-input";
import { useEffect, useState } from "react";

const ProfileSetModal = ({
  isOpen,
  setIsOpen,
  userId,
  token,
  setErrors,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId: number;
  token: string;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [uploadDone, setUploadDone] = useState(false);

  useEffect(() => {
    if (uploadDone) {
      setIsOpen(false);
      window.location.reload();
    }
  }, [uploadDone]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-dhvsu to-dhvsu-light text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <div className="relative z-10">
              <h1 className="font-bold">Upload your profile.</h1>
              <FileInput
                userId={userId}
                setUploadDone={setUploadDone}
                token={token}
                setIsOpen={setIsOpen}
                setErrors={setErrors}
                className="p-16 mt-5 mb-5 border-2 border-neutral-200 border-dashed"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileSetModal;
