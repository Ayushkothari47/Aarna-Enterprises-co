import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/admin/Login";
import UserHome from "./components/user/UserHome";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";


// Main App Component with Router
function App() {
  return (
    <Router>
      <div className="bg-gray-100 text-gray-900 overflow-hidden">
        {/* Navbar */}
        <NavBar />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                {/* <HeroSection /> */}
                <section id="tours" className="bg-black">
                  <UserHome />
                </section>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<UserHome />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
