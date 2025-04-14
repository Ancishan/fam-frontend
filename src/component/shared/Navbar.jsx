"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900 shadow-lg"
          : "bg-gradient-to-r from-indigo-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
            >
              Dk-Gadget's-Hub
            </Link>
          </div>

          {/* Right side - Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/newArrivals"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
              >
                New Arrivals
              </Link>
              <Link
                href="/about"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-indigo-200 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-indigo-900 bg-opacity-95">
          <Link
            href="/newArrivals"
            className="block px-3 py-2 rounded-md text-base font-mediumtext-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
          >
            New Arrivals
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 tracking-wide uppercase hover:brightness-125 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
