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
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur shadow-lg"
          : "bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-extrabold text-white dark:text-pink-400 bg-clip-text tracking-wide uppercase hover:brightness-110 transition duration-300"
            >
              FAM SPORT's
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {["/newArrivals", "/about", "/contact"].map((link, i) => (
                <Link
                  key={i}
                  href={link}
                  className="text-white dark:text-gray-200 hover:text-pink-300 dark:hover:text-pink-400 transition duration-300 text-sm font-semibold uppercase tracking-wide"
                >
                  {link === "/newArrivals"
                    ? "New Arrivals"
                    : link === "/about"
                    ? "About Us"
                    : "Contact Us"}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white dark:text-gray-300 hover:text-pink-400 focus:outline-none"
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

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-4 py-4 space-y-3 bg-gradient-to-b from-indigo-900 to-purple-900 dark:from-gray-900 dark:to-gray-800">
          {["/newArrivals", "/about", "/contact"].map((link, i) => (
            <Link
              key={i}
              href={link}
              className="block px-3 py-2 rounded-md text-base font-medium text-white dark:text-gray-200 hover:text-pink-300 dark:hover:text-pink-400 transition duration-300 uppercase"
            >
              {link === "/newArrivals"
                ? "New Arrivals"
                : link === "/about"
                ? "About Us"
                : "Contact Us"}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
