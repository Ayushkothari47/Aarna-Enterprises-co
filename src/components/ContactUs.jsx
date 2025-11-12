import React from 'react';
import whatsappIcon from "../Icons/whatsapp.png";
import CallIcon from "../Icons/call.png";

function ContactUs() {
  const phoneNumber = "+919717598168"; // replace with your number
  const whatsappNumber = "+919717598168"; // replace with your number
  const whatsappMessage = "Hello! I would like to connect with you."; // optional pre-filled message

  return (
    <div className="fixed bottom-6 right-0 sm:bottom-4 sm:right-2 text-white p-4 rounded-xl shadow-lg flex flex-col gap-4 z-50">
      
      {/* Call Button */}
      <a href={`tel:${phoneNumber}`} className='w-14 cursor-pointer bg-black border-2 border-white rounded-full p-2 flex items-center justify-center'>
        <img src={CallIcon} className='rotate-270' alt="Call"/>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className='w-16 cursor-pointer flex items-center justify-center'
      >
        <img src={whatsappIcon} alt="WhatsApp"/>
      </a>
      
    </div>
  );
}

export default ContactUs;
