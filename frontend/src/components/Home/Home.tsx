import heroBg from "../../assets/images/home-hero-bg.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import news1 from "../../assets/images/news1.png";
import news2 from "../../assets/images/news2.png";
import news3 from "../../assets/images/news3.png";
import news4 from "../../assets/images/news4.png";

const newsItems = [
  {
    title: "ARTA applauds DHVSU's contribution to 'Ease of Doing Business'",
    date: "07 November 2024",
    image: news1,
  },
  {
    title: "DHVSU hosts 2024 UCLA tournament after 4 year hiatus",
    date: "07 November 2024",
    image: news2,
  },
  {
    title: "3rd RCDG RESCOM PA visits DHVSU for ROTC program",
    date: "0 November 2024",
    image: news3,
  },
  {
    title: "DHVSU, SAP tie up to roll out community mental health initiative",
    date: "07 November 2024",
    image: news4,
  },
];

const Home = () => {
  return (
    <>
      <div
        className="bg-cover bg-no-repeat h-screen bg-fixed mb-5 bg-[url('your-image-url.jpg')] 
        sm:bg-[url('your-image-url.jpg')] sm:bg-center lg:bg-[url('your-image-url.jpg')] 
        lg:bg-center lg:bg-cover"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="container flex flex-col lg:flex-row h-full px-5 pb-10 lg:px-10 lg:py-10 md:px-7 md:py-7 lg:-mt-14">
          {/* Left side */}
          <div className="hero-left w-full lg:w-1/2 h-full flex items-center justify-center flex-col">
            <div>
              <h1 className="text-brand font-bold text-2xl md:text-3xl lg:text-5xl lg:mb-2">
                Hi there!
              </h1>
              <h1 className="text-brand font-bold text-lg md:text-xl lg:text-2xl lg:mb-2">
                Welcome to Don Honorio Ventura <br /> State University
              </h1>
              <p className="text-brand font-bold mb-2 text-xs md:text-sm lg:text-xl lg:mb-8">
                Where passion meets purpose, and knowledge shapes the future.
              </p>

              <p className="font-medium mb-5 text-sm md:text-md lg:text-xl">
                Join a community dedicated to fostering innovation, excellence,
                and growth. Explore programs designed to equip you with the
                skills to succeed in a changing world.
              </p>
              <div className="flex gap-3 font-bold lg:mt-10">
                <div>
                  <button className="rounded-[10px] bg-brand px-4 py-1 text-white lg:px-8 lg:py-2.5 lg:text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand">
                    Campuses
                  </button>
                </div>
                <div>
                  <button className="text-brand bg-none border-2 px-6 py-1 rounded-[10px] border-brand lg:px-10 lg:py-2 lg:text-xl transform transition-all duration-300 hover:bg-brand hover:text-white hover:border-none">
                    Sign In
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-2 lg:gap-4 lg:mt-4">
                <div className="bg-brand w-7 h-7 rounded-full flex justify-center items-center text-white lg:w-10 lg:h-10 transform transition-all duration-300 hover:scale-110 hover:bg-opacity-80">
                  <FaFacebookF />
                </div>
                <div className="bg-brand w-7 h-7 rounded-full flex justify-center items-center text-white lg:w-10 lg:h-10 transform transition-all duration-300 hover:scale-110 hover:bg-opacity-80">
                  <FaInstagram />
                </div>
                <div className="bg-brand w-7 h-7 rounded-full flex justify-center items-center text-white lg:w-10 lg:h-10 transform transition-all duration-300 hover:scale-110 hover:bg-opacity-80">
                  <FaXTwitter />
                </div>
                <div className="bg-brand w-7 h-7 rounded-full flex justify-center items-center text-white lg:w-10 lg:h-10 transform transition-all duration-300 hover:scale-110 hover:bg-opacity-80">
                  <FaYoutube />
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="hero-right w-full lg:w-1/2 h-full flex items-center justify-center">
            <div className="bg-gray-300 w-[20rem] h-[10rem] mx-5 my-5 rounded-lg flex justify-center items-center md:w-[24rem] md:h-[12rem] lg:w-[40rem] lg:h-[20rem]">
              Video
            </div>
          </div>
        </div>
      </div>

      <div className="latest-news-container max-w-screen-lg mx-auto h-auto w-full px-4 sm:px-5 -mt-5 py-5">
        <div>
          <h1 className="font-bold text-brand mb-3 text-xl md:text-3xl lg:text-4xl lg:mb-10">
            Latest News &gt;
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-5 lg:px-20">
          {newsItems.map((item, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${item.image})` }}
              className="shadow-md rounded-[2rem] bg-cover bg-center h-[15rem] sm:h-[20rem] lg:h-[25rem] w-full flex flex-col justify-end transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="p-4 bg-brand rounded-b-[2rem] bg-opacity-50 text-white">
                <h3 className="text-xs font-semibold mb-2 md:text-sm lg:text-lg">
                  {item.title}
                </h3>
                <p className="text-[10px] md:text-[12px] lg:text-sm">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5 md:justify-end px-2 sm:px-5 lg:px-20">
          <button className="font-bold text-brand text-sm bg-[#FFBA15] rounded-lg px-4 py-1 shadow-inner md:text-lg md:px-5 md:py-2 transform transition-transform duration-300 hover:translate-y-[-5px]">
            See more news...
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
