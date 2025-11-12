import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";

import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ImageGallery from "./components/ImageGallery";
import About from "./components/About";
import BookPackage from "./components/BookPackage";
import AdminPage from "./pages/AdminPage";
import BookingManagement from "./pages/BookingManagement";
import GalleryManagement from "./pages/GalleryManagement";
import CMS from "./pages/CMS";
import EmailManagement from "./pages/EmailManagement";
import ContactUs from "./components/ContactUs";
import LoginPage from "./pages/LoginPage";

function Layout() {
  const location = useLocation();

  // ✅ Hide navbar & footer on admin or login routes
  const hideLayout =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div className="App">
      {!hideLayout && <Navbar />}

      <Routes>
        {/* User routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<ImageGallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/book-package" element={<BookPackage />} />

        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/booking-management" element={<BookingManagement />} />
        <Route path="/admin/gallery-management" element={<GalleryManagement />} />
        <Route path="/admin/CMS" element={<CMS />} />
        <Route path="/admin/email-management" element={<EmailManagement />} />
      </Routes>

      {/* Hide floating contact on admin/login too */}
      {!hideLayout && <ContactUs />}

      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
