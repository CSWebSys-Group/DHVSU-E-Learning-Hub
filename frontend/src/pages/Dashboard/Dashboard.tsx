import RevealGrid from '@/components/RevealGrid';
import { Calendar } from '@/components/ui/calendar';
import { Bell } from 'lucide-react';
import React, { useState } from 'react';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className=" bg-white rounded-3xl p-8 flex flex-col md:flex-row">
      <section className="left-section w-full p-4">
        <div className="flex justify-between mb-12">
          <div>
            <h2 className="text-[#701D0B] font-bold">Dashboard</h2>
            <p className="text-[#701D0B]">Monday, 29 Sept 2024</p>
          </div>
          <div>
            <Bell />
          </div>
        </div>
        <RevealGrid />
      </section>
      <section className="right-section w-[500px] bg-[#F1E8E7] p-4 flex justify-center rounded-lg border border-brand">
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
