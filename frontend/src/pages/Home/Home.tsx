import { useRef, useState, useEffect } from "react";
import heroBg from "../../assets/images/home-hero-bg.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import news1 from "../../assets/images/news1.png";
import news2 from "../../assets/images/news2.png";
import news3 from "../../assets/images/news3.png";
import news4 from "../../assets/images/news4.png";
import announcementImg from "../../assets/images/announcement-img.png";
import { Link } from "react-router-dom";

type NewsItem = {
  title: string;
  date: string;
  image: string;
};

type Announcement = {
  title: string;
  description: string;
  image: string;
};

const newsItems: NewsItem[] = [
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

const announcements: Announcement[] = [
  {
    title: "Advisory | Suspension of Classes and Work",
    description:
      "Work in government offices and classes at all levels will be suspended on October 31, 2024.",
    image: announcementImg,
  },
  {
    title: "Advisory | Suspension of Classes and Work",
    description:
      "Work in government offices and classes at all levels will be suspended on October 31, 2024.",
    image: announcementImg,
  },
  {
    title: "Advisory | Suspension of Classes and Work",
    description:
      "Work in government offices and classes at all levels will be suspended on October 31, 2024.",
    image: announcementImg,
  },
  {
    title: "Advisory | Suspension of Classes and Work",
    description:
      "Work in government offices and classes at all levels will be suspended on October 31, 2024.",
    image: announcementImg,
  },
  {
    title: "Advisory | Suspension of Classes and Work",
    description:
      "Work in government offices and classes at all levels will be suspended on October 31, 2024.",
    image: announcementImg,
  },
];

const Home = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      setScrollWidth(slider.scrollWidth - slider.offsetWidth);

      const handleScroll = () => {
        setScrollLeft(slider.scrollLeft);
      };

      slider.addEventListener("scroll", handleScroll);

      return () => {
        slider.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleProgressBarDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !sliderRef.current) return;

    const progressBar = progressBarRef.current;
    const slider = sliderRef.current;

    const progressBarWidth = progressBar.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    const scrollRatio = scrollWidth / progressBarWidth;

    slider.scrollLeft = offsetX * scrollRatio;
  };

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
                <Link to="/campuses">
                  <div>
                    <button className="rounded-[10px] bg-brand px-4 py-1 text-white lg:px-8 lg:py-2.5 lg:text-xl transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand">
                      Campuses
                    </button>
                  </div>
                </Link>
                <div>
                  <Link to={"/auth/login"}>
                    <button className="text-brand bg-none border-2 px-6 py-1 rounded-[10px] border-brand lg:px-10 lg:py-2 lg:text-xl transform transition-all duration-300 hover:bg-brand hover:text-white hover:border-none">
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>

              <div className="flex gap-3 mt-2 lg:gap-4 lg:mt-4">
                <Link to="https://www.facebook.com/DHVSU1861">
                  <div className="bg-brand w-7 h-7 rounded-full flex justify-center items-center text-white lg:w-10 lg:h-10 transform transition-all duration-300 hover:scale-110 hover:bg-opacity-80">
                    <FaFacebookF />
                  </div>
                </Link>
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
            <div className="bg-gray-300 w-[25rem] h-[12rem] mx-5 my-5 rounded-lg flex justify-center items-center md:w-[28rem] md:h-[16rem] lg:w-[40rem] lg:h-[317px]">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/4VLxg3b1ZvY?autoplay=1&mute=1&si=dAxfMJwCFpA6wRoj"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="latest-news-container max-w-screen-xl mx-auto h-auto w-full px-4 sm:px-5 -mt-5 py-5">
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
          <Link to="https://www.facebook.com/DHVSU1861">
            <button className="font-bold text-brand text-sm bg-[#FFBA15] rounded-lg px-4 py-1 shadow-inner md:text-lg md:px-5 md:py-2 transform transition-transform duration-300 hover:translate-y-[-5px]">
              See more news...
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto p-4 max-w-screen-xl">
        <h2 className="font-bold text-brand mb-3 text-xl md:text-3xl lg:text-4xl lg:mb-10 ">
          Announcements &gt;
        </h2>
        <div className="relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="custom-scrollbar flex overflow-x-auto space-x-4 pb-4"
          >
            {announcements.map((announcement, index) => (
              <div
                key={index}
                className="flex-shrink-0 py-1 w-[350px] h-[150px] md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[300px] lg:px-2 lg:py-4 bg-[#C8AEA9] rounded-lg shadow-lg border border-gray-200 flex justify-center items-center"
              >
                <div className="announcement-left rounded-md  w-[180px] flex items-center justify-center lg:w-[250px]">
                  <img
                    src={announcement.image}
                    alt={`Announcement ${index + 1}`}
                    className="w-[130px] h-[130px] object-cover rounded-[15px] px-1 py-1 md:w-[160px] md:h-[160px] md:-ml-5 lg:w-[250px] lg:h-[250px]"
                  />
                </div>
                <div className="announcement-right w-[200px]   lg:w-1/2 pr-3 ">
                  <h3 className="text-md font-bold  text-[#7A2B20] mt-1 mb-1 md:text-lg lg:text-3xl">
                    {announcement.title}
                  </h3>
                  <p className="text-[10px] text-black font-bold md:text-[12px] lg:text-[15px]">
                    {announcement.description}
                  </p>
                  <div className="flex justify-end">
                    <Link to="https://www.facebook.com/DHVSU1861">
                      <button className="mt-3 text-[12px] font-bold shadow-inner  px-[10px]  py-[4px] text-brand bg-[#FFBA15] rounded-md hover:bg-[#E0A212] md:text-[15px] md:px-[12px] md:py-[5px] lg:text-[18px] lg:px-[15px] lg:py-[6px]">
                        Read more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div
            ref={progressBarRef}
            // className="absolute bottom-0 left-0 right-0 h-[5px] bg-gray-200 rounded-md cursor-pointer"
            onMouseDown={(e) => handleProgressBarDrag(e)}
            onMouseMove={(e) => {
              if (e.buttons === 1) handleProgressBarDrag(e);
            }}
          >
            <div
              className="h-full bg-[#7A2B20] rounded-md"
              style={{
                width: `${(scrollLeft / scrollWidth) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="vision-mission-container  mx-auto p-4 max-w-screen-xl mt-5">
        <div className="flex justify-center items-center mb-4 ">
          <h1 className="text-xl font-bold text-brand md:text-3xl lg:text-4xl lg:mb-3">
            Vision and Mission
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 md:flex-row lg:gap-10">
          {/* vision */}
          <div className="baste-base-to w-[350px] h-[180px] bg-transparent cursor-pointer group rounded-3xl perspective-1000 md:w-[360px] md:h-[190px] lg:w-[470px] lg:h-[280px]">
            <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180  duration-500">
              <div className="flex justify-center items-center w-full h-full absolute rounded-3xl bg-brand text-white overflow-hidden ">
                {/* <img src="" alt="" /> */}
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Vision
                </h1>
              </div>
              <div className="absolute rotate-y-180  w-full h-full bg-[#F1E2E0] border-2 border-brand z-50 rounded-3xl overflow-hidden p-4 backface-hidden ">
                <div className="flex flex-col text-brand justify-center items-center text-center">
                  <div>
                    <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
                      Vision
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-bold mt-2 md:text-sm md:mt-1 lg:text-lg lg:mt-4">
                      DHVSU envisions of becoming one of the lead universities
                      in the ASEAN Region in producing globally competitive
                      professionals who are capable of creating, applying and
                      transferring knowledge and technology for the sustainable
                      development of the humanity and society.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* mission */}
          <div className="baste-base-to w-[350px] h-[180px] bg-transparent cursor-pointer group rounded-3xl perspective-1000 md:w-[360px] md:h-[190px] lg:w-[470px] lg:h-[280px]">
            <div className="relative w-full h-full preserve-3d group-hover:rotate-y-180  duration-500">
              <div className="flex justify-center items-center w-full h-full absolute rounded-3xl bg-brand text-white overflow-hidden ">
                {/* <img src="" alt="" /> */}
                <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
                  Mission
                </h1>
              </div>
              <div className="absolute rotate-y-180  w-full h-full bg-[#F1E2E0] border-2 border-brand z-50 rounded-3xl overflow-hidden p-4 backface-hidden ">
                <div className="flex flex-col text-brand justify-center items-center text-center">
                  <div>
                    <h1 className="text-xl font-bold md:text-2xl lg:text-4xl">
                      Vision
                    </h1>
                  </div>
                  <div>
                    <p className="text-xs font-bold mt-2 md:text-sm md:mt-1 lg:text-lg lg:mt-4">
                      DHVSU commits itself to provide a conducive environment
                      for the holistic development of students to become
                      globally competitive professionals through quality
                      instruction and services; innovation and research towards
                      the sustainable development of society.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
