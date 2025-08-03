"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return (
      <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-gray-500 select-none">Loading...</span>
          </div>
        </div>
      </nav>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout successful");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed, try again.");
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/logo.jpg"
              alt="DK Gadget's Hub"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-600 transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white select-none">
              DK Gadget's Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Contact Us
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/my-orders"
                  className="bg-indigo-600 text-white px-4 py-1 rounded-md hover:bg-indigo-700 transition"
                  title="My Orders"
                >
                  💼 My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline ml-4 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle menu"
          >
            {!isMenuOpen ? (
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-inner px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/comboproductr"
            className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Combo Product
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact Us
          </Link>

          {!user ? (
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-700 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href="/my-orders"
                className="block px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                💼 My Orders
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
