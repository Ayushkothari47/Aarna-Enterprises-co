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
    { img: Email, title: "Email Management" },
    { img: Account, title: "Account Management" },
    { img: Content, title: "Content Management" },
  ];

  return (
    <div className="bg-black min-h-screen px-6 sm:px-10 lg:px-16 py-10">
      <h2 className="text-4xl md:text-5xl text-yellow-400 text-center mb-12 font-semibold">
        Admin Dashboard
      </h2>

      {/* ✅ Responsive Grid with consistent spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
        {cards.map((card, index) => {
          const CardWrapper = card.link ? Link : "div";
          return (
            <CardWrapper
              to={card.link}
              key={index}
              className=" border border-gray-700 rounded-2xl  p-6 sm:p-7 w-64 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/20"
            >
              {/* Image section */}
              <div className="w-40 h-40 rounded-xl flex justify-center items-center mb-4 ">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Title */}
              <div className="text-yellow-400 text-2xl text-center tracking-wide leading-snug">
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
