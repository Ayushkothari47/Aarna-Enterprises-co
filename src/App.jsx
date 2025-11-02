import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useRef } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageGallery from "./components/ImageGallery";
import About from "./components/About";
import BookPackage from "./components/BookPackage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/gallery" element={<ImageGallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-package" element={<BookPackage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
