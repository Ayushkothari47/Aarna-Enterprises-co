import BannerSection from "./CMS/BannersSection";
import PackagesSection from "./CMS/PackagesSection";
import TestimonialSection from "./CMS/TestimonialSection";
import MobileBannerSection from "./CMS/MobileBannerSection";
import { useNavigate } from "react-router-dom";


const CMSPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white p-10 font-poppins">
      <button
        onClick={() => navigate("/admin")}
        className="bg-black border border-yellow-400 text-yellow-400 px-4 py-2 mb-2 rounded font-semibold hover:bg-yellow-400 hover:text-black transition"
      >
        ← Back
      </button>
      <h1 className="text-3xl text-yellow-400 text-center font-bold mb-10">
        Content Management
      </h1>

      {/* Banner Section */}
      <BannerSection />

      {/* Mobile Banner Section */}
      <MobileBannerSection />

      {/* Package Section */}
      <PackagesSection />

      {/* Testimonial Section */}
      <TestimonialSection />
    </div>
  );
};

export default CMSPage;
