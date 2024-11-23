import React, { useState } from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";

type Task = {
  task: string;
  date: string;
};

type Event = {
  title: string;
  description: string;
  date: string;
};

const CalendarApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Store all tasks
  const [newTask, setNewTask] = useState<string>(""); // New task input
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // Selected date
  const [taskForDate, setTaskForDate] = useState<{ [key: string]: string[] }>(
    {}
  ); // Tasks by date
  const [warningMessage, setWarningMessage] = useState<string>(""); // Warning message for unselected date

  const events: Event[] = [
    {
      title: "Mathematics 101",
      description: "Lecture on Calculus",
      date: "2024-11-25",
    },
    {
      title: "Computer Science",
      description: "Data Structures class",
      date: "2024-11-26",
    },
    {
      title: "History 101",
      description: "World War II Discussion",
      date: "2024-11-27",
    },
  ];

  const getDaysInMonth = (year: number, month: number): number => {
    const date = new Date(year, month, 0);
    return date.getDate();
  };

  const handleDateClick = (date: string): void => {
    setSelectedDate(date);
    setWarningMessage(""); // Clear warning when date is selected
  };

  const handleAddTask = (): void => {
    if (!selectedDate) {
      setWarningMessage("Please choose a date first!"); // Show warning if no date is selected
      return;
    }
    if (newTask.trim()) {
      const updatedTasks: Task[] = [
        ...tasks,
        { task: newTask, date: selectedDate },
      ];
      setTasks(updatedTasks);
      setTaskForDate((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newTask],
      }));
      setNewTask("");
      setSelectedDate(null); // Reset selected date after adding a task
    }
  };

  const handleDeleteTask = (taskToDelete: string): void => {
    const updatedTasks: Task[] = tasks.filter(
      (task) => task.task !== taskToDelete
    );
    setTasks(updatedTasks);
    const updatedTaskForDate = { ...taskForDate };
    Object.keys(updatedTaskForDate).forEach((date) => {
      updatedTaskForDate[date] = updatedTaskForDate[date].filter(
        (task) => task !== taskToDelete
      );
    });
    setTaskForDate(updatedTaskForDate);
  };

  const getEventsForDay = (date: string): Event[] => {
    return events.filter((event) => event.date === date);
  };

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const daysInMonth = getDaysInMonth(year, month + 1);

  return (
    <div className="w-full flex flex-col items-center py-10">
      <div className="bg-[#F1E8E7] rounded-lg shadow-md p-6 flex space-x-6 w-full max-w-5xl">
        {/* Calendar Section */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-[#8D4A3C] text-center mb-6">
            November 2024
          </h1>
          <div className="grid grid-cols-7 gap-4 text-center text-[#8D4A3C]">
            {/* Weekday Headers */}
            <span className="font-semibold">SUN</span>
            <span className="font-semibold">MON</span>
            <span className="font-semibold">TUE</span>
            <span className="font-semibold">WED</span>
            <span className="font-semibold">THUR</span>
            <span className="font-semibold">FRI</span>
            <span className="font-semibold">SAT</span>

            {/* Calendar Dates */}
            {Array.from({ length: daysInMonth }, (_, index) => {
              const day = index + 1;
              const currentDate = `${year}-${(month + 1)
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              const isToday = currentDate === today.toISOString().split("T")[0];
              const eventForDay = getEventsForDay(currentDate).length > 0;
              const taskForDay =
                taskForDate[currentDate] && taskForDate[currentDate].length > 0;
              const isSelected = selectedDate === currentDate;

              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(currentDate)}
                  className={`cursor-pointer p-2 rounded-lg relative ${
                    isToday ? "bg-[#f1604d] text-white" : ""
                  } ${taskForDay ? "bg-[#f0b3a4]" : ""} ${
                    isSelected ? "bg-[#8D4A3C] text-white" : ""
                  }`} // Highlight selected date
                >
                  <span>{day}</span>
                  {/* Task outside date */}
                  {taskForDay && (
                    <div
                      className="absolute top-10 text-xs mt-1"
                      style={{ color: isSelected ? "#fff" : "#8D4A3C" }}
                    >
                      {taskForDate[currentDate][0]}{" "}
                      {/* Display the first task for the day */}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar (Tasks and Next Class) */}
        <div className="w-[270px] bg-[#8D4A3C] text-white rounded-lg p-4 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Tasks</h2>
            <div className="flex items-center">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="mt-2 p-2 border border-gray-300 rounded-lg flex-grow"
                placeholder={
                  selectedDate
                    ? `Enter your task for ${selectedDate}`
                    : "Please enter a task"
                }
                style={{
                  backgroundColor: newTask ? "#f5f5f5" : "#fff", // Lighter background when typing
                  color: newTask ? "#a06155" : "#000", // Brand color for text when typing
                }}
              />
              <button
                onClick={handleAddTask}
                className={`ml-2 p-2 ${
                  selectedDate
                    ? "bg-[#a06155]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white rounded-lg`}
                disabled={!selectedDate} // Disable button if no date is selected
              >
                <IoMdAdd size={24} /> {/* Add icon */}
              </button>
            </div>
            {warningMessage && (
              <p className="text-red-500 text-sm mt-2">{warningMessage}</p>
            )}
            <ul className="mt-2 space-y-2">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <li
                    key={index}
                    className="p-2 bg-[#D98A80] bg-opacity-20 rounded-lg flex justify-between items-center"
                  >
                    <span>{task.task}</span>
                    <button
                      onClick={() => handleDeleteTask(task.task)}
                      className="text-red-100"
                    >
                      <IoMdRemove size={20} /> {/* Remove icon */}
                    </button>
                  </li>
                ))
              ) : (
                <p>No tasks added yet.</p>
              )}
            </ul>
          </div>

          <div className="mt-4 bg-white px-2 py-2 rounded-lg">
            <h2 className="text-lg font-semibold text-brand mb-2">
              Next Class
            </h2>
            <div className="p-2 bg-[#BC7162] text-white rounded-lg">
              <h3 className="font-semibold">
                {events[0]?.title || "No class today"}
              </h3>
              <p className="text-sm">{events[0]?.description || ""}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Schedule Section Below Calendar (Week View Style) */}
      <div className="w-full max-w-5xl mt-6 bg-[#F1E8E7] rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-[#8D4A3C] text-center mb-6">
          Weekly Class Schedule
        </h2>
        <div className="grid grid-cols-7 gap-4 text-center">
          <div className="font-semibold">Sun</div>
          <div className="font-semibold">Mon</div>
          <div className="font-semibold">Tue</div>
          <div className="font-semibold">Wed</div>
          <div className="font-semibold">Thu</div>
          <div className="font-semibold">Fri</div>
          <div className="font-semibold">Sat</div>
          {/* Class Schedule for the Week */}
          <div className="bg-[#F4B7B0] p-4 rounded-lg">
            {events
              .filter((event) => event.date.includes("2024-11-25")) // Example filtering
              .map((event, index) => (
                <div
                  key={index}
                  className="bg-[#F1E8E7] p-2 rounded-lg text-[#8D4A3C]"
                >
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm">{event.description}</p>
                </div>
              ))}
          </div>
          {/* Add more sections for other days */}
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
