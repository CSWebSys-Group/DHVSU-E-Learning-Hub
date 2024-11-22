import RevealGrid from "@/components/RevealGrid";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/utils";
import { Bell } from "lucide-react";
import { useState } from "react";

// TODO: Fix tablet responsive design.

const Dashboard = () => {
  const [date, setDate] = useState(Date.now());
  const today = new Date();
  return (
    <div className="rounded-4xl p-8 flex flex-col md:flex-row">
      <section className="left-section w-full p-4">
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="text-[#701D0B] dark:text-dhvsu-lighter font-bold">
              Dashboard
            </h2>
            <p className="text-[#701D0B] dark:text-dhvsu-lighter">
              {formatDate(today)}
            </p>
          </div>
        </div>
        <RevealGrid />
      </section>
      <section className="right-section w-[500px] bg-[#F1E8E7] p-4 flex justify-center rounded-3xl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border justify-center"
        />
      </section>
    </div>
  );
};

export default Dashboard;
