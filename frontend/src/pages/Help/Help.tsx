import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

interface FAQItem {
  question: string;
  intro?: string;
  steps?: string[];
  note?: string;
}

const faqData: FAQItem[] = [
  {
    question: "1. How to change my password?",
    intro: "To change your password, please follow these step procedures:",
    steps: [
      "Step 1: Go to account settings",
      "Step 2: Click on the 'Change Password' button",
      "Step 3: Enter your current password",
      "Step 4: Enter your new password",
      "Step 5: Re-enter your new password to confirm",
      "Step 6: Save changes",
    ],
    note: "Note: Your password will expire exactly 1 month after being set.",
  },
  {
    question: "2. How to change my user photo?",
    intro: "To change your user photo, please follow these steps:",
    steps: [
      "Step 1: Go to account settings",
      "Step 2: Click on the 'Edit Profile' button",
      "Step 3: Upload a new photo",
      "Step 4: Save changes",
    ],
    note: "Note: The system allows only image file formats with a size no greater than 1MB.",
  },
  {
    question: "3. How to change my personal info?",
    intro: "You may edit your personal info under 'Student Information'.",
    steps: [],
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="help-container  bg-[#F1E8E7] m-5 rounded-md min-h-screen p-6  ">
      <div className="mb-6 text-brand">
        <h1 className="text-xl font-bold pb-1 md:text-2xl md:pb-2 lg:text-3xl xl:text-4xl ">
          Terms and Conditions
        </h1>
        <p className="text-lg font-semibold md:text-xl xl:text-2xl">
          These terms and conditions govern your use of this website; by using
          this website, you accept these terms and conditions in full. If you
          disagree with these terms and conditions or any part of these terms
          and conditions, you must not use this website.
        </p>
      </div>
      <div className="mb-6 text-sm text-gray-700 font-semibold md:text-[16px] lg:text-[17px] xl:text-[18px]">
        <p>
          You must be a student, parent, faculty, or school admin to use this
          website. By using this website and by agreeing to these terms and
          conditions, you warrant and represent that you are a student, parent,
          faculty, or school admin in this school.
        </p>
      </div>

      <div className="mt-8 mx-[10px] md:mt-10 md:mx-[15px] lg:mt-12 lg:mx-[30px] xl:mt-14 xl:mx-[50px]">
        <h1 className="text-xl font-bold mb-4 text-brand md:text-2xl lg:text-3xl xl:text-4xl">
          Frequently Asked Questions
        </h1>
        <div className="help-dropdown-container space-y-4">
          {faqData.map((faq, index) => (
            <div key={index}>
              {/* question container */}
              <div
                className="border rounded-lg px-4 py-2 bg-[#8D4A3C] text-white shadow-sm cursor-pointer md:py-3 lg:pl-6 lg:py-4 xl:py-5 xl:pl-8"
                onClick={() => toggleDropdown(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-sm font-medium md:text-[16px] lg:text-lg">
                    {faq.question}
                  </h2>
                  <span
                    className={`transform transition-transform text-2xl md:text-3xl lg:text-4xl ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    <RiArrowDropDownLine />
                  </span>
                </div>
              </div>

              {/* steps container */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-out transform ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
              >
                <div className="mt-2 bg-[#F3F4F6] p-4 rounded-md text-gray-800 shadow-sm text-sm md:text-[16px] lg:text-lg">
                  {faq.intro && <p className="mb-2">{faq.intro}</p>}
                  {faq.steps && faq.steps.length > 0 && (
                    <ul className="space-y-2">
                      {faq.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ul>
                  )}
                  {faq.note && (
                    <p className="mt-2 text-sm text-brand font-semibold opacity-70 lg:text-[16px]">
                      {faq.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
