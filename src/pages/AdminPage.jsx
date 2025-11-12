import React from "react";
import Car from "../Icons/car.png";
import Gallery from "../Icons/gallery.png";
import Account from "../Icons/account.png";
import Email from "../Icons/email.png";
import Content from "../Icons/content.png";
import { Link } from "react-router-dom";

function AdminPage() {
  const cards = [
    { img: Car, title: "Booking Management", link: "/admin/booking-management" },
    { img: Gallery, title: "Gallery Management", link: "/admin/gallery-management" },
    { img: Email, title: "Email Management", link: "/admin/email-management" },
    { img: Account, title: "Account Management" },
    { img: Content, title: "Content Management", link: "/admin/CMS" },
  ];

  return (
    <div className="bg-black min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 py-10">
      <h2 className="text-3xl sm:text-4xl md:text-3xl text-yellow-400 text-center mb-10 font-semibold">
        Admin Dashboard
      </h2>

      {/* ✅ Responsive Grid */}
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-4
        gap-4 sm:gap-6 md:gap-8 
        justify-items-center
      ">
        {cards.map((card, index) => {
          const CardWrapper = card.link ? Link : "div";
          return (
            <CardWrapper
              to={card.link}
              key={index}
              className="
                group
                border border-gray-700 
                rounded-xl 
                p-4 sm:p-5 md:p-6 
                w-36 sm:w-44 md:w-52 lg:w-56 xl:w-60 
                flex flex-col items-center 
                bg-gradient-to-b from-gray-900 to-black
                hover:from-gray-800 hover:to-gray-900
                transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/20
              "
            >
              {/* Image */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center mb-3">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Title */}
              <div className="text-yellow-400 text-sm sm:text-base md:text-lg text-center font-medium tracking-wide leading-tight">
                {card.title.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </div>
            </CardWrapper>
          );
        })}
      </div>
    </div>
  );
}

export default AdminPage;
