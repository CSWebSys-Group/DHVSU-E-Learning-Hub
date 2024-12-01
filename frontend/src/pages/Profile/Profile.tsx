import { Button } from "@/components/ui/button";
import { StudentCreds, UsersType } from "@/lib/types";
import { AnimatePresence } from "framer-motion";
import { PencilIcon } from "lucide-react";
import React, { useState } from "react";
import { Notification } from "@/components/SlideInNotifications";
import { Heading } from "@/components/heading";
import ProfileSetModal from "@/components/ProfileSetModal";

const Profile = ({ user }: { user: UsersType }) => {
  const user_creds = user.user_creds as StudentCreds;

  const [editProfile, setEditProfile] = useState(false);

  const [notifications, setNotifications] = useState<
    { id: number; successMessage: string }[]
  >([]);

  const addNotification = (message: string) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, successMessage: message }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  // this saveProfile() function handles form submition and notifications
  const saveProfile = () => {
    setTimeout(() => {
      addNotification("Profile saved successfully!");
    }, 1000);
  };

  const [studentInfo, setStudentInfo] = useState({
    fn: user_creds.fn,
    ln: user_creds.ln,
    middle_name: user_creds.middle_name || "",
    ext_name: user_creds.ext_name || "",
    gender: user_creds.gender || "",
    birthday: user_creds.birthday || "",
    place_of_birth: user_creds.place_of_birth || "",
    civil_status: user_creds.civil_status || "",
    nationality: user_creds.nationality || "",
    religion: user_creds.religion || "",
    contact_number: user_creds.contact_number || "",
    height: user_creds.height || null,
    weight: user_creds.weight || null,
    blood_type: user_creds.blood_type || "",
    address: user_creds.address || "",
    province: user_creds.province || "",
    city: user_creds.city || "",
    barangay: user_creds.barangay || "",
    zip_code: user_creds.zip_code || null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setStudentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="px-6 py-4">
        <Heading title="Profile" />
      </div>
      <div className="p-6 flex items-center justify-center">
        <div className="flex gap-3">
          <div className="w-96 ml-0 bg-form rounded-lg shadow-drop-1 min-w-0">
            <div className="bg-form rounded-t-lg p-6 flex flex-col items-center">
              <div className="w-16 h-16 bg-DHVSU-white rounded-full flex items-center justify-center font-semibold border border-dhvsu dark:border-dhvsu-lighter">
                Image
              </div>

              <div className="text-center mt-4 text-brand dark:text-white">
                <p className="text-lg font-bold">
                  {user_creds.ln}, {user_creds.fn}{" "}
                  {user_creds.middle_name ? user_creds.middle_name + "." : ""}{" "}
                  (Student)
                </p>
                <p className="text-sm">
                  Bachelor of Science in Computer Science
                </p>
                <p className="text-sm">{user.user.id}</p>
              </div>

              <Button
                className="mt-4 px-4 py-2 bg-brown-700 text-white dark:text-brand bg-brand dark:bg-white text-sm font-semibold rounded-full flex items-center gap-2"
                onClick={() => setEditProfile(true)}
              >
                <PencilIcon size={14} /> Edit profile
              </Button>
            </div>
          </div>

          <ProfileSetModal isOpen={editProfile} setIsOpen={setEditProfile} />

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
                    value={studentInfo.ln}
                    onChange={handleChange}
                    name="ln"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className="font-semibold mb-2">First Name</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                    value={studentInfo.fn}
                    onChange={handleChange}
                    name="fn"
                  />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className="font-semibold mb-2">Middle Name</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                    value={studentInfo.middle_name}
                    onChange={handleChange}
                    name="middle_name"
                  />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className="font-semibold mb-2">Ext.</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                    value={studentInfo.ext_name}
                    onChange={handleChange}
                    name="ext_name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu dark:text-white">
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Gender</label>
                  <select
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full text-black"
                    value={studentInfo.gender}
                    onChange={handleChange}
                    name="gender"
                  >
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
                    value={studentInfo.birthday}
                    onChange={handleChange}
                    name="birthday"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className=" font-semibold mb-2">Place of Birth</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.place_of_birth}
                    onChange={handleChange}
                    name="place_of_birth"
                  />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Civil Status</label>
                  <select
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.civil_status}
                    onChange={handleChange}
                    name="civil_status"
                  >
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
                    value={studentInfo.nationality}
                    onChange={handleChange}
                    name="nationality"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className=" font-semibold mb-2">Religion</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.religion}
                    onChange={handleChange}
                    name="religion"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className=" font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={user.user.email}
                    disabled={true}
                    onChange={handleChange}
                    name="email"
                  />
                </div>

                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Contact #</label>
                  <input
                    type="text"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.contact_number}
                    onChange={handleChange}
                    name="contact_number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 text-dhvsu-light dark:text-white">
                <div className="flex flex-col col-span-1">
                  <label className=" font-semibold mb-2">Heigth (cm)</label>
                  <input
                    type="number"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.height || ""}
                    onChange={handleChange}
                    name="height"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className=" font-semibold mb-2">Weight</label>
                  <input
                    type="number"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.weight || ""}
                    onChange={handleChange}
                    name="weight"
                  />
                </div>

                <div className="flex flex-col col-span-2">
                  <label className=" font-semibold mb-2">Blood Type</label>
                  <input
                    type="email"
                    className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                    value={studentInfo.blood_type}
                    onChange={handleChange}
                    name="blood_type"
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
                    value={studentInfo.address}
                    onChange={handleChange}
                    name="address"
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
                      value={studentInfo.province}
                      onChange={handleChange}
                      name="province"
                    />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <label className=" font-semibold mb-2">
                      Municipality / City
                    </label>
                    <input
                      type="text"
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                      value={studentInfo.city}
                      onChange={handleChange}
                      name="city"
                    />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <label className=" font-semibold mb-2">Barangay</label>
                    <input
                      type="text"
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                      value={studentInfo.barangay}
                      onChange={handleChange}
                      name="barangay"
                    />
                  </div>
                  <div className="flex flex-col col-span-1">
                    <label className=" font-semibold mb-2">ZIP Code</label>
                    <input
                      type="number"
                      className="border border-dhvsu rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-DHVSU-hover w-full"
                      value={studentInfo.zip_code || ""}
                      onChange={handleChange}
                      name="zip_code"
                    />
                  </div>{" "}
                </div>
              </div>
              <Button onClick={() => saveProfile()}>Save</Button>
            </div>
          </div>
        </div>
        <div>
          <AnimatePresence>
            {notifications.map((notif) => (
              <Notification
                key={notif.id}
                id={notif.id}
                successMessage={notif.successMessage}
                removeNotif={removeNotification}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Profile;
