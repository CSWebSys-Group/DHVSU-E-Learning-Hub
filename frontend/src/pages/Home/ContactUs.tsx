const ContactUs = () => {
  return (
    <div className="flex flex-col items-center gap-5 w-full m-auto max-w-screen-xl mt-5 md:mt-6">
      <div className="flex flex-col justify-center items-center text-brand">
        <h1 className="font-bold py-2 text-3xl text-center px-14">
          Let&#39;s Connect &ndash; We&#39;re Here to Help!
        </h1>
        <p className="px-4 font-semibold text-sm text-center">
          Have questions or need assistance? Reach out to us – our team is ready
          to support students and faculty alike!
        </p>
      </div>
      <div className="relative bg-white h-[650px] w-[400px] rounded-[20px] max-w-screen-xl md:h-[450px] md:w-[700px] lg:h-[500px] lg:w-[800px] flex justify-center items-center">
        <div className="absolute flex flex-col gap-3 justify-center items-center p-4 text-center text-white top-0 bg-brand h-[250px] w-full rounded-b-[7rem] rounded-t-[20px] md:rounded-l-[20px] md:left-0 md:w-1/2 md:rounded-r-[7rem] md:rounded-b-none md:h-full">
          <h1 className="font-bold text-2xl">
            We&#39;re Always Ready to Listen!
          </h1>
          <p className="font-semibold">
            Our innovation-driven team is here to solve your challenges and
            improve your online experience. Don&#39;t hesitate to get in touch.
          </p>
        </div>

        <div className="mt-[250px] flex flex-col justify-center items-center p-6 md:mt-0 md:w-1/2 md:ml-[350px] lg:ml-[400px] xl:ml-[400px]">
          <h1 className="font-bold text-brand text-2xl text-center">
            Fill out the form below
          </h1>
          <p className="text-sm text-brand font-semibold text-center ">
            We value collaboration and feedback. Please fill out the form below,
            and we&#39;ll get back to you as soon as possible.
          </p>
          <form
            action="#"
            method="POST"
            className="w-full mt-4 flex flex-col gap-3 items-center"
          >
            <input
              type="text"
              placeholder="Enter your name"
              className="border rounded-[5px] text-brand border-brand px-[8px] py-[8px] w-full placeholder:text-[#D7C0BB] shadow-md focus:outline-none focus:border-brand"
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="border rounded-[5px] border-brand px-[8px] py-[8px] w-full placeholder:text-[#D7C0BB] shadow-md focus:outline-none focus:border-brand"
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              className="border rounded-[5px] border-brand px-[8px] py-[8px] w-full placeholder:text-[#D7C0BB] shadow-md focus:outline-none focus:border-brand"
            />
            <textarea
              name=""
              id=""
              placeholder="Enter your message..."
              className="resize-y border rounded-[5px] border-brand px-[8px] py-[8px] w-full placeholder:text-[#D7C0BB] shadow-md focus:outline-none focus:border-brand"
            ></textarea>
            <button className="px-2 py-2 w-[200px] rounded-lg  border-2 border-brand text-white bg-brand font-bold relative overflow-hidden group">
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300" />
              <p className="group-hover:text-brand uppercase z-10 duration-300 relative">
                Submit
              </p>
            </button>
          </form>
        </div>
      </div>
      <div className=" text-center bg-white py-6 px-6 rounded-lg shadow-lg mb-16 border-t-8 border-brand">
        <h2 className="font-semibold text-3xl text-brand mb-4">
          Trust and Support
        </h2>
        <p className="text-sm text-gray-700 max-w-3xl mx-auto">
          We believe in building trust through transparent communication and
          exceptional support. Whether you&#39;re seeking assistance or simply
          have feedback, our team is here for you. Reach out to us anytime.
        </p>
        <div className="mt-6">
          <p className="text-lg text-brand font-semibold">
            Your journey matters to us. Let&#39;s make it a great one together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
