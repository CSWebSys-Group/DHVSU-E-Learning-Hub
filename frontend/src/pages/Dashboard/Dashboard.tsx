import { useEffect } from "react";
import RevealGrid from "@/components/RevealGrid";
import { formatDate } from "@/lib/utils";
import { UsersType } from "@/lib/types";
import Calendar from "../Calendar/Calendar";

const Dashboard = ({ user, token }: { user: UsersType; token: string }) => {
  const today = new Date();

  useEffect(() => {
    document.title = "Dashboard | DHVSU E-Learning Hub";
  }, []);

  return (
    <div className="rounded-4xl p-8 flex flex-col items-center md:items-start lg:flex-row md:min-w-[720px] lg:min-w-[1280px]">
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
        <RevealGrid user={user} />
      </section>
      <section className="right-section w-full lg:w-[600px] bg-[#F1E8E7] mt-[95px] p-4 flex flex-col justify-center rounded-3xl">
        <Calendar user={user} token={token} />
      </section>
    </div>
  );
};

export default Dashboard;
