import React, { useEffect, useState } from "react";
import { FiCheckSquare, FiX, FiAlertCircle } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

const NOTIFICATION_TTL = 5000;

export const Notification = ({
  successMessage,
  id,
  removeNotif,
}: {
  successMessage: string;
  id: number;
  removeNotif: (id: number) => void;
}) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif(id);
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-4 w-80 flex items-start rounded-lg gap-2 text-sm font-medium shadow-lg text-white bg-dhvsu pointer-events-auto fixed z-50 bottom-4 right-4"
    >
      <FiAlertCircle className="text-3xl absolute -top-4 -left-4 p-2 rounded-full bg-white text-dhvsu shadow" />
      <span>{successMessage}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};
