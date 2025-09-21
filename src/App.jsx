
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import UserHome from "./components/user/UserHome";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import About from "./components/About";
import PDP from "./components/PDP";
import UserInfo from "./components/userInfo";
import React, { useState, useRef } from "react";


function App() {
  const [dropLocation, setDropLocation] = useState("");
  const bookingFormRef = useRef(null);

  // Function to scroll to the form
  const scrollToBookingForm = () => {
    if (bookingFormRef.current) {
      bookingFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      <div className="bg-gray-100 text-gray-900 overflow-hidden">
        {/* NavBar gets dropLocation */}
        <NavBar
          dropLocation={dropLocation}
          setDropLocation={setDropLocation}
          bookingFormRef={bookingFormRef}
        />


        <Routes>
          <Route
            path="/"
            element={
              <section id="tours" className="bg-black">
                <UserHome
                  dropLocation={dropLocation}
                  setDropLocation={setDropLocation}
                  scrollToBookingForm={scrollToBookingForm} 
                />
              </section>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome setDropLocation={setDropLocation} scrollToBookingForm={scrollToBookingForm} dropLocation={dropLocation} />} />
          <Route path="/UserInfo" element={<UserInfo />} />
          <Route path="/PDP" element={<PDP />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;