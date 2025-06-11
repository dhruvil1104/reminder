import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-lg fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-blue-500 to-purple-600">
              reminder
            </span>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <a
              href="#home"
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 group"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#about"
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 group"
            >
              About
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#services"
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 group"
            >
              Services
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="relative text-gray-700 font-medium hover:text-blue-600 transition-colors duration-200 group"
            >
              Contact
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="hidden md:block">
            <a
              href="#get-started"
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Get Started
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-lg shadow-xl border-t border-gray-100 animate-slideDown">
          <div className="px-6 py-4 space-y-3">
            <a
              href="#home"
              className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#services"
              className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-200"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block text-gray-700 font-medium hover:text-blue-600 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-200"
            >
              Contact
            </a>
            <a
              href="#get-started"
              className="block bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-2 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
