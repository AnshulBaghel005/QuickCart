import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 px-8 py-10 mt-10 shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1: Company and Product Details */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4">QUICKCART</h2>
          <p className="text-sm">
            QuickCart is your one-stop online shop for the trendiest fashion, electronics, and more.
          </p>
        </div>

        {/* Section 2: Menu Links */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4">COMPANY</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Section 3: Get in Touch */}
        <div>
          <h2 className="text-xl font-bold text-black mb-4">Get in Touch</h2>
          <p className="text-sm flex items-center gap-2"><FaPhoneAlt /> +91 9876543210</p>
          <p className="text-sm flex items-center gap-2 mt-2"><FaEnvelope /> support@quickcart.com</p>

          {/* <div className="flex gap-4 mt-4 text-gray-700 text-lg">
            <a href="#"><FaFacebook className="hover:text-blue-500" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-500" /></a>
            <a href="#"><FaTwitter className="hover:text-blue-400" /></a>
          </div> */}
        </div>
      </div>
      <div className='mt-6'>
            <hr  />
            <p className='py-5 text-m text-center'>Copyright 2024@ quickcart.com -All Right Reserved</p>
        </div>
    </footer>
  );
};

export default Footer;
