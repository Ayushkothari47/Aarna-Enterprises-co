import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import Team from "../Icons/team.jpg";
import Ayush from "../Icons/ak.jpg";
import Anup from "../Icons/Anup.jpeg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";



const developers = [
  {
    name: "Ayush Kothari",
    role: "Backend Developer",
    img: Ayush,
    github: "https://github.com/ayush",
    linkedin: "https://www.linkedin.com/in/ayush-kothari-522958290/",
    instagram: "https://instagram.com/ayushkotharii47",
  },
  {
    name: "Anup Mondal",
    role: "Frontend Developer",
    img: Anup,
    github: "https://github.com/mondalanup868",
    linkedin: "https://www.linkedin.com/in/anup-mondal-8762b9236/",
    instagram: "https://www.instagram.com/mr_pro_ducer?utm_source=qr&igsh=MTE1ejgydWR2bmt3Mg==",
  },
];


// Dummy data for testimonials
const testimonials = [
  {
    name: "Sachin Prajapati",
    role: "Business Owner",
    profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjXqy3ziyjBFPJd6CeYvsdZ6pPXbD-PoZoBIb34tBQmiqz_maXmXhg=w108-h108-p-rp-mo-br100",
    rating: 5,
    review: "I booked a taxi for my wife and kids from Rishikesh to Kotdwar. It was a safe and comfortable travel experience. Prices are also very genuine.",
  },
  {
    name: "Arjun Singh",
    role: "Freelancer",
    profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjVuifgy8yQIrItX71T-B9amkPQo3wedt73FuPUX-DIBKZ6eubew=w108-h108-p-rp-mo-br100",
    rating: 4,
    review: "They provide very good taxi service with their best drivers. Overall it was a good experience with their travel company , I will highly recommend !!!!",
  },
  {
    name: "Manish Bisht",
    role: "Engineer",
    profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjUABvrQPOlz1tv38jy4WWTCgevKsAllDz9ql2HoHiwYZbYTgw3Y=w108-h108-p-rp-mo-br100",
    rating: 5,
    review: "I love it , super service in uttrakhand,driver are ossam , all are new cars .thanks Ashish ji for giving us a great service. Har har mahadev",
  },
  {
    name: "MRITYUNJAY KUMAR",
    role: "Teacher",
    profilePic: "https://lh3.googleusercontent.com/a-/ALV-UjWOZMFxI3og0PPPVWtCVrYgnHFBrTRzEwUEUayX2cF21qe0TioO=w108-h108-p-rp-mo-br100",
    rating: 3,
    review: "Amazing service! Both driver and cab quality are awesome. They have conducted many tours for our company.",
  },
  {
    name: "David Clark",
    role: "Photographer",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    review: "Absolutely fantastic! Great service, clean vehicles, and extremely courteous drivers. Would recommend it to anyone traveling in India.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Card */}
      <div className="bg-gray-800 p-6 sm:p-10 rounded-2xl shadow-2xl text-center max-w-4xl w-full">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-yellow-400">
          About Us
        </h1>
        <p className="text-base sm:text-lg mb-8 text-gray-300">
          Welcome to Aarna Tour & Travels, your reliable partner for all-India taxi services. We specialize in providing comfortable, efficient, and safe travel solutions for various needs, from spiritual pilgrimages to city transfers. Our Services All-India Taxi Service: Travel anywhere in India with our extensive network and well-maintained fleet, ensuring a smooth journey from bustling cities to serene landscapes. Uttarakhand Char Dham Yatra: Embark on a spiritual journey to the sacred Char Dhams (Yamunotri, Gangotri, Kedarnath, Badrinath) with our dedicated, comfortable, and safe taxi services. City Transfers: Rishikesh to Delhi cab Dehradun to Delhi, Dehradun to Delhi airport
        </p>

        {/* Owner Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-6 space-y-4 sm:space-y-0 mb-10">
          <img
            src={Team}
            alt="Team"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-yellow-400 shadow-lg object-cover"
          />
          <p className="text-lg sm:text-xl font-semibold text-yellow-400">
            Aashish Uniyal - Owner
          </p>
        </div>

        {/* Custom Swiper Styles */}
        <style>{`
  /* Pagination (dots) */
  .swiper-pagination-bullet {
    background: #9ca3af !important; /* gray default */
    opacity: 0.6;
    
  }

  .swiper-pagination-bullet-active {
    background: #facc15 !important; /* yellow-400 */
    opacity: 1;
  }

  /* Navigation arrows */
  .swiper-button-next,
  .swiper-button-prev {
    color: #facc15 !important; /* yellow-400 */
    transition: color 0.3s ease;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: #fde68a !important; /* lighter yellow on hover */
  }

    /* Add top margin to the whole pagination area */
  .swiper-pagination {
    margin-top: 16px !important; /* 👈 Adjust this value as needed */
    position: relative;
  }

  
`}</style>


        {/* 🌟 Testimonial Section */}
        <div className="bg-gray-700 p-6 rounded-xl shadow-lg mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">
            What Our Clients Say
          </h2>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <div className="bg-gray-800 p-5 rounded-xl flex flex-col items-center shadow-md hover:shadow-yellow-400/30 transition-shadow duration-300 h-full">
                  <img
                    src={t.profilePic}
                    alt={t.name}
                    className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-yellow-300 mb-1">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{t.role}</p>

                  {/* Star Rating */}
                  <div className="flex justify-center mb-3">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${i < t.rating ? "text-yellow-400" : "text-gray-600"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Review */}
                  <p className="text-gray-300 text-sm text-center italic">
                    “{t.review}”
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* Developers Section */}
        <h2 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-6">
          Our Developers
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-6 sm:space-y-0">
          {developers.map((dev) => (
            <div
              key={dev.name}
              className="bg-gray-700 rounded-xl p-6 w-64 flex flex-col items-center shadow-lg hover:shadow-yellow-400/40 transition-shadow"
            >
              <img
                src={dev.img}
                alt={dev.name}
                className="w-28 h-28 rounded-full border-4 border-yellow-400 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-yellow-300 mb-1">
                {dev.name}
              </h3>
              <p className="text-gray-300 text-sm mb-3">{dev.role}</p>
              <div className="flex space-x-4 text-xl">
                <a
                  href={dev.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaGithub />
                </a>
                <a
                  href={dev.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href={dev.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-sm sm:text-base text-gray-400 text-center">
        <p>Made By Ayush & Anup</p>
      </footer>
    </div>
  );
};

export default About;
