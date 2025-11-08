import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrashIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";

import BannerSection from "./CMS/BannersSection";
import PackagesSection from "./CMS/PackagesSection";


const CMSPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-10 font-poppins">
      <h1 className="text-3xl text-yellow-400 text-center font-bold mb-10">
        Content Management
      </h1>

      {/* Banner Section */}
      <BannerSection />

      {/* Package Section */}
      <PackagesSection />
    </div>
  );
};

export default CMSPage;
