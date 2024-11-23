import { HTMLMotionProps, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import girlSample from "../assets/images/girl-sample-2.svg";
import { Bell, Mail, Megaphone, SquarePen, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { UsersType } from "@/lib/types";

const RevealGrid = ({ user }: { user: UsersType }) => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="grid grid-flow-dense grid-cols-12 grid-rows-4 gap-4"
      >
        <HeaderBlock fn={user.user_creds.fn} ln={user.user_creds.ln} />
        <SocialsBlock />
      </motion.div>
    </>
  );
};

type BlockProps = HTMLMotionProps<"div"> & {
  className?: string;
};

const Block = ({ className, ...rest }: BlockProps) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-3xl bordertext-3xl leading-snug p-5 shadow-drop-1",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = ({ fn, ln }: { fn: string; ln: string }) => (
  <Block className="col-span-12 text-3xl leading-snug relative mb-4 p-10 bg-dhvsu">
    <div className="flex items-center">
      <img
        src={girlSample}
        alt="avatar"
        className="absolute left-0 -top-13 bottom-0 rounded-bl-3xl"
        width={200}
        height={200}
      />
      <div className="ml-52">
        <h1 className="mb-2 text-xl md:text-2xl lg:text-4xl font-medium text-white">
          Welcome, {fn + " " + ln}! 👋{" "}
        </h1>
        <p className="text-white text-[1.2rem] md:text-2xl font-light">
          Have a great day ahead!
        </p>
      </div>
    </div>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block className="col-span-6 row-span-3 md:col-span-3 bg-dhvsu-light">
      <Link
        to="/notifications"
        className="grid h-full place-content-center text-5xl text-white dark:text-dhvsu-lighter"
      >
        <Bell size={48} />
      </Link>
      <p className="text-xs font-semibold text-white">Notifications</p>
    </Block>

    <Block className="col-span-6 row-span-2 md:col-span-3 bg-dhvsu-light">
      <Link
        to="/grades"
        className="grid h-full place-content-center text-3xl  text-white dark:text-dhvsu-lighter"
      >
        <Star size={48} />
      </Link>
      <p className="text-xs font-semibold  text-white dark:text-dhvsu-lighter">
        Grades
      </p>
    </Block>

    <Block className="col-span-6 row-span-2 md:col-span-6 bg-dhvsu-light">
      <Link
        to="/subjects"
        className="grid h-full place-content-center text-3xl  text-white dark:text-dhvsu-lighter"
      >
        <SquarePen size={48} />
      </Link>
      <p className="text-xs font-semibold  text-white dark:text-dhvsu-lighter">
        Subjects
      </p>
    </Block>

    <Block className="col-span-6 md:col-span-3 bg-dhvsu-light">
      <Link
        to="/messages"
        className="grid h-full place-content-center text-3xl  text-white dark:text-dhvsu-lighter"
      >
        <Mail size={48} />
      </Link>
      <p className="text-xs font-semibold  text-white dark:text-dhvsu-lighter">
        Messages
      </p>
    </Block>
    <Block className="col-span-6 md:col-span-3 bg-dhvsu-light">
      <Link
        to="/subject-enrolled"
        className="grid h-full place-content-center text-3xl  text-white dark:text-dhvsu-lighter"
      >
        <Megaphone size={48} />
      </Link>
      <p className="text-xs font-semibold  text-white dark:text-dhvsu-lighter">
        Announcements
      </p>
    </Block>
    <Block className="col-span-6 md:col-span-3 bg-dhvsu-light">
      <Link
        to="/subject-enrolled"
        className="grid h-full place-content-center text-3xl  text-white dark:text-dhvsu-lighter"
      >
        <Megaphone size={48} />
      </Link>
      <p className="text-xs font-semibold  text-white dark:text-dhvsu-lighter">
        Announcements
      </p>
    </Block>
  </>
);

export default RevealGrid;
