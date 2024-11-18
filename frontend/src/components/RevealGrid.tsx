import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import girlSample from "../assets/images/girl-sample-2.svg"
import { Bell, Mail, Megaphone, SquarePen, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// EXTRA TODO: Fix theme provider!

const RevealGrid = () => {
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
        <HeaderBlock />
        <SocialsBlock />
      </motion.div>
    </>
  );
};

const Block = ({ className, ...rest }) => {
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
        type: 'spring',
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        'col-span-4 rounded-lg border border-[#701D0B] bg-[#F1E8E7] text-3xl leading-snug p-5 shadow-drop-1',
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug relative mb-6">
    <div className="flex items-center  ">
      <img
        src={girlSample}
        alt="avatar"
        className="absolute left-0 -top-13 bottom-0"
        width={200}
        height={200}
      />
      <div className="ml-52">
        <h1 className="mb-2 text-xl md:text-2xl lg:text-4xl font-medium text-[#701D0B]">
          Welcome, Darren Jason Watkins! 👋{' '}
        </h1>
        <p className="text-[#701D0B] text-[1.2rem] md:text-2xl font-light">
          Have a great day ahead!
        </p>
      </div>
    </div>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block className="col-span-6 row-span-3 md:col-span-3">
      <Link
        to="/notifications"
        className="grid h-full place-content-center text-5xl text-[#701D0B]"
      >
        <Bell size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Notifications</p>
    </Block>

    <Block className="col-span-6 row-span-2 md:col-span-3">
      <Link
        to="/grades"
        className="grid h-full place-content-center text-3xl text-[#701D0B]"
      >
        <Star size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Grades</p>
    </Block>

    <Block className="col-span-6 row-span-2 md:col-span-6">
      <Link
        to="/subjects"
        className="grid h-full place-content-center text-3xl text-[#701D0B]"
      >
        <SquarePen size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Subjects</p>
    </Block>

    <Block className="col-span-6 md:col-span-3">
      <Link
        to="/messages"
        className="grid h-full place-content-center text-3xl text-[#701D0B]"
      >
        <Mail size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Messages</p>
    </Block>
    <Block className="col-span-6 md:col-span-3">
      <Link
        to="/subject-enrolled"
        className="grid h-full place-content-center text-3xl text-[#701D0B]"
      >
        <Megaphone size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Announcements</p>
    </Block>
    <Block className="col-span-6 md:col-span-3">
      <Link
        to="/subject-enrolled"
        className="grid h-full place-content-center text-3xl text-[#701D0B]"
      >
        <Megaphone size={48} />
      </Link>
      <p className="text-xs font-semibold text-[#701D0B]">Announcements</p>
    </Block>
  </>
);

export default RevealGrid;
