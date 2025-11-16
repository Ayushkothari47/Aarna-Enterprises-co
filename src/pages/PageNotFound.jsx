import React from "react";

function PageNotFound() {
  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen space-y-8">
      <div className=" flex justify-center items-center  text-9xl font-bold">
        <div className="text-yellow-400">4</div>
        <div className="text-white">0</div> 
        <div className="text-yellow-400">4</div>
      </div>
      <div>
        <p className="text-gray-600 text-2xl">Page Not Found !</p>
      </div>
    </div>
  );
}

export default PageNotFound;
