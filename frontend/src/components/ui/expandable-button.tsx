import { motion } from "framer-motion";
import { useState } from "react";
import { PlusIcon, XIcon } from "lucide-react";

const CONTAINER_SIZE = 200;

type ExpandableButtonProps = {
  children: React.ReactNode;
};

const ExpandableButton = ({ children }: ExpandableButtonProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`rounded-[24px] border shadow-sm bg-gradient-to-b from-maroon-500 to-maroon-400 ${
        isExpanded ? "w-[204px] bg-gradient-to-b" : " bg-gradient-to-b "
      }`}
    >
      <div className="rounded-[23px]">
        <div className="rounded-[22px]">
          <div className="rounded-[21px] flex items-center justify-center">
            <FamilyButtonContainer
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
            >
              {isExpanded ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.3,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                  className="flex flex-col justify-center items-center gap-3"
                >
                  {children}
                </motion.div>
              ) : null}
            </FamilyButtonContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

type FamilyButtonContainerProps = {
  isExpanded: boolean;
  toggleExpand: () => void;
  children: React.ReactNode;
};

const FamilyButtonContainer = ({
  isExpanded,
  toggleExpand,
  children,
}: FamilyButtonContainerProps) => {
  return (
    <motion.div
      className={`relative border-white/10 border shadow-lg flex space-y-1 justify-center items-center text-white z-10
        ${
          !isExpanded
            ? "bg-gradient-to-b from-maroon-500 to-maroon-400 dark:from-stone-700 dark:to-neutral-800/80"
            : ""
        }`}
      layoutRoot
      layout
      initial={{ borderRadius: 21, width: "4rem", height: "4rem" }}
      animate={
        isExpanded
          ? {
              borderRadius: 20,
              width: CONTAINER_SIZE,
              height: CONTAINER_SIZE + 50,

              transition: {
                type: "spring",
                damping: 25,
                stiffness: 400,
                when: "beforeChildren",
              },
            }
          : {
              borderRadius: 21,
              width: "4rem",
              height: "4rem",
            }
      }
    >
      {children}

      <motion.div
        className="absolute"
        initial={{ x: "-50%" }}
        animate={{
          x: isExpanded ? "0%" : "-50%",
          transition: {
            type: "tween",
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        style={{
          left: isExpanded ? "" : "50%",
          bottom: 6,
        }}
      >
        {isExpanded ? (
          <motion.div
            className="p-[10px] group bg-neutral-800/50 dark:bg-black/50 border border-cyan-100/30 hover:border-neutral-200 text-orange-50 rounded-full shadow-2xl transition-colors duration-300 cursor-pointer"
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={false}
            animate={{
              rotate: -360,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <XIcon className="h-7 w-7 text-cyan-100/30 dark:text-neutral-400/80 group-hover:text-neutral-500 transition-colors duration-200 " />
          </motion.div>
        ) : (
          <motion.div
            className="p-[10px] group bg-neutral-200 text-cyan-50 border border-cyan-100/10  shadow-2xl transition-colors duration-200 cursor-pointer"
            style={{ borderRadius: 24 }}
            onClick={toggleExpand}
            layoutId="expand-toggle"
            initial={{ rotate: 180 }}
            animate={{
              rotate: -180,
              transition: {
                duration: 0.4,
              },
            }}
          >
            <PlusIcon className="h-7 w-7 text-black dark:text-neutral-900" />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export { ExpandableButton };
