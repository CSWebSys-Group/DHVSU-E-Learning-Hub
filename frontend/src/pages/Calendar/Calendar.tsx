import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Heading } from "@/components/heading";

type Activity = {
  title: string;
  description: string;
  date: string;
  time: string; // deadline time
};

type Activities = {
  [key: string]: Activity[];
};

const Calendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const { pathname } = useLocation();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const todayDate = today.toISOString().split("T")[0];

  const activities: Activities = {
    "2024-11-28": [
      {
        title: "Mathematicsss 101",
        description: "Lecture on Calculus",
        date: "2024-11-25",
        time: "10:00 AM",
      },
    ],
    "2024-11-23": [
      {
        title: "Computer Science",
        description: "Data Structures class",
        date: "2024-11-26",
        time: "11:00 AM",
      },
    ],
    "2024-11-27": [
      {
        title: "History 101",
        description: "World War II Discussion",
        date: "2024-11-27",
        time: "2:00 PM",
      },
    ],
  };

  const upcomingTasks: Activities = {
    "2024-11-26": [
      {
        title: "Mathematics 101",
        description: "Lecture on Calculus",
        date: "2024-11-25",
        time: "10:00 AM",
      },
    ],
    "2024-11-27": [
      {
        title: "Computer Science",
        description: "Data Structures class",
        date: "2024-11-26",
        time: "11:00 AM",
      },
    ],
    "2024-11-28": [
      {
        title: "History 101",
        description: "World War II Discussion",
        date: "2024-11-27",
        time: "2:00 PM",
      },
    ],
  };

  const getActivitiesForDay = (date: string): Activity[] => {
    return activities[date] || [];
  };

  const getUpcomingTaskForDay = (date: string): Activity[] => {
    return upcomingTasks[date] || [];
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
      if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
      if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="px-6 py-4">
        <Heading title="Calendar" />
      </div>
      <motion.div
        className="w-full flex flex-col items-center py-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={`bg-[#F1E8E7] rounded-lg shadow-md p-6 flex flex-col ${
            pathname === "/user/calendar" ? "lg:flex-row" : "gap-6 lg:p-2"
          } space-y-6 lg:space-y-0 w-full max-w-screen-xl`}
        >
          {/* calendar */}

          <div className="flex-grow">
            <motion.div
              className="flex justify-around items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => handleMonthChange("prev")}
                className="flex items-center text-[#8D4A3C] font-semibold hover:underline"
                whileTap={{ scale: 0.11 }}
              >
                <MdNavigateBefore
                  className={` ${
                    pathname === "/user/calendar" ? "mr-2" : "mr-1"
                  }`}
                />
                {monthNames[(currentMonth - 1 + 12) % 12]}
              </motion.button>
              <h1
                className={`text-3xl font-bold text-[#8D4A3C] text-center ${
                  pathname === "/user/calendar" ? "" : "text-xl"
                }`}
              >
                {monthNames[currentMonth]} {currentYear}
              </h1>
              <motion.button
                onClick={() => handleMonthChange("next")}
                className="flex items-center text-[#8D4A3C] font-semibold hover:underline"
                whileTap={{ scale: 0.9 }}
              >
                {monthNames[(currentMonth + 1) % 12]}
                <MdNavigateNext
                  className={` ${
                    pathname === "/user/calendar" ? "ml-2" : "ml-1"
                  }`}
                />
              </motion.button>
            </motion.div>
            <motion.div
              className="grid grid-cols-7 gap-4 text-center text-[#8D4A3C] px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="font-semibold">SUN</span>
              <span className="font-semibold">MON</span>
              <span className="font-semibold">TUE</span>
              <span className="font-semibold">WED</span>
              <span className="font-semibold">THUR</span>
              <span className="font-semibold">FRI</span>
              <span className="font-semibold">SAT</span>

              {/* calendar dates */}
              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = index + 1;
                const currentDate = `${currentYear}-${(currentMonth + 1)
                  .toString()
                  .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
                const isToday = currentDate === todayDate;
                const activityForDay =
                  getActivitiesForDay(currentDate).length > 0;

                return (
                  <motion.div
                    key={day}
                    className={`cursor-pointer p-2 rounded-lg relative ${
                      isToday ? "bg-[#f1604d] text-white" : ""
                    } ${activityForDay ? "bg-[#f0b3a4]" : ""}`}
                    whileHover={{ scale: 1.1 }}
                    onMouseEnter={() => setHoveredDate(currentDate)}
                    onMouseLeave={() => setHoveredDate(null)}
                  >
                    <span className="z-0">{day}</span>

                    {hoveredDate === currentDate &&
                      activityForDay && ( //hover tassks calendar
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 text-xs text-center bg-white p-2 rounded shadow z-10"
                          style={{
                            color: isToday ? "#AC766B" : "#8D4A3C",
                            width: "max-content",
                          }}
                        >
                          {getActivitiesForDay(currentDate)[0]?.title}
                        </div>
                      )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* actvities and upacoming tasks */}
          <div className="w-full lg:w-[320px] bg-[#8D4A3C] text-white rounded-lg  p-4 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">Today's Activity</h2>
              {getActivitiesForDay(todayDate).length > 0 ? (
                <motion.div
                  className="bg-[#D98A80] p-3 rounded-lg my-2"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="font-semibold">
                    {getActivitiesForDay(todayDate)[0]?.title}
                  </h3>
                  <p>{getActivitiesForDay(todayDate)[0]?.description}</p>
                  <p>{getActivitiesForDay(todayDate)[0]?.time}</p>
                </motion.div>
              ) : (
                <p>No activity for today</p>
              )}
            </div>

            <motion.div
              className="mt-4 bg-white px-2 py-2 rounded-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-lg font-semibold text-brand mb-2">
                Upcoming Activities
              </h2>
              {Object.keys(upcomingTasks).map((date, index) => {
                const upcomingTask = getUpcomingTaskForDay(date)[0];
                return (
                  <motion.div
                    key={index}
                    className="p-2 bg-[#BC7162] text-white rounded-lg mb-2"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.7 }}
                  >
                    <h3 className="font-semibold">{upcomingTask?.title}</h3>
                    <p className="text-sm">{upcomingTask?.description}</p>
                    <p className="text-xs">
                      {upcomingTask?.date} at {upcomingTask?.time}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Calendar;
