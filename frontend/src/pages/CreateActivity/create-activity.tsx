import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createActivitySchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  AlertCircleIcon,
  CalendarIcon,
  LoaderCircle,
  Package,
  Pencil,
  Plus,
  SquareChartGantt,
  Upload,
  X,
} from "lucide-react";
import React, { useState, useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ImageConfig } from "@/config/ImageConfig";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const CreateActivity = () => {
  const form = useForm<z.infer<typeof createActivitySchema>>({
    resolver: zodResolver(createActivitySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const [files, setFiles] = useState([
    { name: "202230567.jpg", type: "JPG", src: ImageConfig.jpg },
    { name: "assignment.pdf", type: "PDF", src: ImageConfig.pdf }, // Example initial files
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSubmit = async () => {};

  const handleFileChange = () => {};

  const removeAttachment = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div className="p-5">
      <Heading title="Create" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex justify-between gap-10 mt-3"
        >
          <div className="w-full">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title here.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <span className="text-sm font-medium">Type</span>
              <Controller
                name="create_type"
                control={form.control}
                render={({ field }) => (
                  <CreateTypeSelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Deadline</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="shadow-drop-1 p-5 rounded-lg w-full md:w-[650px] flex-grow-0">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-semibold">Attachments</h2>
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
                      <img
                        src={file.src}
                        alt={file.name}
                        width={35}
                        height={35}
                      />
                    </div>
                    <div className="p-2">
                      <span className="font-semibold">{file.name}</span>
                      <p className="text-gray-400">{file.type}</p>
                    </div>
                    <X
                      className="ml-auto mr-4 cursor-pointer"
                      size={18}
                      onClick={() => removeAttachment(file.name)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              ""
            )}

            <div className="flex flex-col gap-2 mb-4" onSubmit={handleSubmit}>
              <Button
                type="button"
                className="uploader-button w-full"
                onClick={() => setIsModalOpen(true)}
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
            </div>
          </div>
        </form>
      </Form>
      <ActivityUploadModal open={isModalOpen} setOpen={setIsModalOpen}>
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

const CreateTypeSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="bg-gray-100 p-3 mt-2.5 mb-3 flex items-center justify-center gap-1.5 rounded-md">
      <div className="flex-1">
        <span
          onClick={() => onChange("module")}
          className={`flex items-center justify-center p-2 gap-1  rounded-lg cursor-pointer hover:bg-gray-200 transition-all ${
            value === "module" &&
            "bg-white shadow-md border border-neutral-200 hover:bg-white"
          }`}
        >
          <Package size={18} />
          Module
        </span>
      </div>
      <div className="flex-1">
        <span
          onClick={() => onChange("activity")}
          className={`flex items-center justify-center gap-1 p-2 cursor-pointer rounded-lg hover:bg-gray-200 transition-all  ${
            value === "activity" &&
            "bg-white shadow-md border border-neutral-200 hover:bg-white"
          }`}
        >
          <SquareChartGantt size={18} />
          Activity
        </span>
      </div>
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

export default CreateActivity;
