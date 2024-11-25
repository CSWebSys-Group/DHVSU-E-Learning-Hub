import RevealGrid from "@/components/RevealGrid";
import { formatDate } from "@/lib/utils";
import { UsersType } from "@/lib/types";
import Calendar from "../Calendar/Calendar";

const Dashboard = ({ user }: { user: UsersType }) => {
  const today = new Date();
  return (
    <div className="rounded-4xl p-8 flex flex-col items-center md:items-start lg:flex-row">
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
      <section className="right-section w-[500px] bg-[#F1E8E7] p-4 flex justify-center rounded-3xl">
        {/* Calendar here */}
        <Calendar />
      </section>
    </div>
  );
};

export default Dashboard;
