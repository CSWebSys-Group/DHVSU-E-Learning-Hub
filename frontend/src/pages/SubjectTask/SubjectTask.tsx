import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, LoaderCircle, Plus, Upload, X } from "lucide-react";

import { useState, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { ImageConfig } from "@/config/ImageConfig";

const SubjectTask = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState([
    { name: "202230567.jpg", type: "JPG", src: ImageConfig.jpg },
    { name: "assignment.pdf", type: "PDF", src: ImageConfig.pdf }, // Example initial files
  ]);

  const handleSubmit = () => {};

  const handleFileChange = () => {};

  const removeTaskSubmission = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 justify-between relative">
      {/* Display activity */}
      <div className="w-full">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold mb-2">Activity 8 - Omada Cloud</h2>
        </div>
        <p className="flex items-center gap-2 text-md text-gray-400 mb-2">
          Rammonsito Ocampo
          <div className="w-1 h-1 bg-gray-400 rounded-full" /> December 12, 2024
        </p>
        <div className="flex justify-between mb-4">
          <p>
            <span className="font-semibold">50</span>/50
          </p>
          <p className="text-gray-500 font-semibold">Due Sep 24, 5:00 PM</p>
        </div>

        <Separator className="bg-gray-300" />
      </div>

      {/* Submitting activities UI */}
      <div className="shadow-drop-1 p-5 rounded-lg w-full md:w-[450px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold">Your work</h2>
          <p className="bg-green-100 px-2 py-2 rounded-md flex items-center gap-1.5 font-semibold text-sm">
            {" "}
            <CheckCircle2 color="green" size={18} /> Graded
          </p>
        </div>

        {/* File display */}
        {files.length > 0 ? (
          <div className="flex flex-col gap-2 mb-4">
            {files.map((file, index) => (
              <div
                className="border border-gray-200 flex rounded-lg items-center"
                key={index}
              >
                <div className=" p-2 border-r border-gray-200">
                  <img src={file.src} alt={file.name} width={35} height={35} />
                </div>
                <div className="p-2">
                  <span className="font-semibold">{file.name}</span>
                  <p className="text-gray-400">{file.type}</p>
                </div>
                <X
                  className="ml-auto mr-4 cursor-pointer"
                  size={18}
                  onClick={() => removeTaskSubmission(file.name)}
                />
              </div>
            ))}
          </div>
        ) : (
          ""
        )}

        <form className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
          <Button
            type="button"
            className="uploader-button w-full"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Add
          </Button>

          <Button
            type="submit"
            className="outline-btn w-full"
            disabled={isLoading}
          >
            Submit
            {isLoading && (
              <LoaderCircle size={24} className="ml-2 animate-spin" />
            )}
          </Button>
        </form>

        <div>
          <p className="italic text-gray-500 text-sm text-center">
            Work cannot be turned in after the due date
          </p>
        </div>
      </div>
      <ActivityUploadModal open={open} setOpen={setOpen}>
        <div className="mb-5">
          <div className="border-4 border-dashed rounded-lg relative overflow-hidden p-15 flex items-center justify-center mx-5 h-[250px]">
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute w-full h-full top-0 left: 0; opacity-0 cursor-pointer"
            />
            <Upload className="mr-4" />
            <h4 className="font-bold text-xl">Choose a file to submit</h4>
          </div>
        </div>
      </ActivityUploadModal>
    </div>
  );
};

const ActivityUploadModal = ({
  children,
  className,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  className?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, () => setOpen(false));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: "blur(10px)",
          }}
          exit={{
            opacity: 0,
            backdropFilter: "blur(0px)",
          }}
          className="fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full flex items-center justify-center z-50"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              "min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white dark:bg-neutral-950 border border-transparent dark:border-neutral-800 md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden justify-center",
              className
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon setOpen={setOpen} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(10px)",
      }}
      exit={{
        opacity: 0,
        backdropFilter: "blur(0px)",
      }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    ></motion.div>
  );
};

const CloseIcon = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setOpen(false)}
      className="absolute top-4 right-4 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-black dark:text-white h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  );
};

export default SubjectTask;
