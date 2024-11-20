import { PencilIcon } from "lucide-react";
import React from "react";

// TODO: input should have borders (bg-dhvsu)
// TODO: main & second container doesn't have light and dark mode

const Profile = () => {
  return (
    <div className="p-6 flex items-center justify-center">
      <div className="flex gap-3">
        <div className="w-96 ml-0 bg-form rounded-lg shadow-drop-1 min-w-0">
          <div className="bg-form rounded-t-lg p-6 flex flex-col items-center">
            <div className="w-16 h-16 bg-DHVSU-white rounded-full flex items-center justify-center font-semibold border border-dhvsu dark:border-dhvsu-lighter">
              Image
            </div>

            <div className="text-center mt-4 text-brand dark:text-white">
              <p className="text-lg font-bold">
                Reyes, Mark Angelo J. (Student)
              </p>
              <p className="text-sm">Bachelor of Science in Computer Science</p>
              <p className="text-sm">2022308414</p>
            </div>

            <button className="mt-4 px-4 py-2 bg-brown-700 text-white dark:text-brand bg-brand dark:bg-white text-sm font-semibold rounded-full flex items-center gap-2">
              <PencilIcon size={14} /> Edit profile
            </button>
          </div>
        </div>

        <div className="flex-grow p-10 bg-dhvsu-light dark:bg-dhvsu-lighter rounded-xl w-full shadow-md">
          <span className="text-dhvsu-lighter font-semibold mx-3 dark:text-dhvsu-light">
            STUDENT INFORMATION
          </span>

          <div className="bg-dhvsu-lighter dark:bg-dhvsu-light rounded-xl mx-0 my-2 w-full shadow-md p-6 space-y-4 min-w-0">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 dark:text-white text-dhvsu-light">
              <div className="flex flex-col col-span-2">
                <label className="font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className="font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className="font-semibold mb-2">Middle Name</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className="font-semibold mb-2">Ext.</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu dark:text-white">
              <div className="flex flex-col col-span-1">
                <label className=" font-semibold mb-2">Gender</label>
                <select className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black">
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex flex-col col-span-2 dark:text-white">
                <label className=" font-semibold mb-2">
                  Date of Birth / Age
                </label>
                <input
                  type="date"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className=" font-semibold mb-2">Place of Birth</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className=" font-semibold mb-2">Civil Status</label>
                <select className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full">
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu-light dark:text-white">
              <div className="flex flex-col col-span-1">
                <label className=" font-semibold mb-2">Nationality</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className=" font-semibold mb-2">Religion</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className=" font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-1">
                <label className=" font-semibold mb-2">Contact #</label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu-light dark:text-white">
              <div className="flex flex-col col-span-1">
                <label className=" font-semibold mb-2">Heigth (cm)</label>
                <input
                  type="number"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className=" font-semibold mb-2">Weight</label>
                <input
                  type="number"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>

              <div className="flex flex-col col-span-2">
                <label className=" font-semibold mb-2">Blood Type</label>
                <input
                  type="email"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu-light dark:text-white">
              <div className="flex flex-col col-span-6">
                <label className=" font-semibold mb-2">
                  Address (House #/Block/Street/Subdivision/Building)
                </label>
                <input
                  type="text"
                  className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                />
              </div>
            </div>

            <div>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu-light dark:text-white">
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Province</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">
                    Municipality / City
                  </label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Barangay</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">ZIP Code</label>
                  <input
                    type="number"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
