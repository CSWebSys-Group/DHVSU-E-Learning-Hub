import RevealGrid from "@/components/RevealGrid";
import { formatDate } from "@/lib/utils";

const Dashboard = () => {
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
        {/* Calendar here */}
      </section>
    </div>
  );
};

export default Dashboard;
