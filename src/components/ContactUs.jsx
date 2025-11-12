import React from 'react';
import whatsappIcon from "../Icons/whatsapp.png";
import CallIcon from "../Icons/call.png";


function ContactUs() {
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-4 sm:right-2  text-white p-4 rounded-xl shadow-lg flex flex-col gap-4 z-50">
      <div className='w-14 cursor-pointer bg-black border-2 border- rounded-full p-2'>
        <img src={CallIcon} className='rotate-270 '/>
      </div>
      <div className='w-16 cursor-pointer '>
      <img src={whatsappIcon}/>
      </div>
    </div>
  );
}

export default ContactUs;
