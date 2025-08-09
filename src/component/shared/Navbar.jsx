// --- Navbar.jsx (Responsive & Clean) ---
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchOrderCount = async () => {
      if (user?.email) {
        try {
          const response = await fetch(`https://dk-server.vercel.app/my-orders-count?email=${user.email}`);
          if (response.ok) {
            const data = await response.json();
            setOrderCount(data.count);
          }
        } catch (error) {
          console.error("Failed to fetch order count:", error);
        }
      } else {
        setOrderCount(0);
      }
    };
    fetchOrderCount();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      alert("Logout successful");
      setOrderCount(0);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed, try again.");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowMobileSearch(false);
    }
  };

  if (loading) {
    return (
      <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-gray-500">Loading...</span>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="DK Gadget's Hub"
            width={120}
            height={40}
            className="h-10 object-contain md:h-16"
          />
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-center mx-4">
          <input
            type="text"
            placeholder="প্রোডাক্টের নাম লিখুন..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full max-w-lg p-2 border rounded-md"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          >
            খুঁজুন
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          {/* Search toggle for mobile */}
          <button
            onClick={() => setShowMobileSearch((prev) => !prev)}
            className="md:hidden text-gray-900 dark:text-white"
            aria-label="Toggle search"
          >
            <FaSearch className="text-xl" />
          </button>

          {/* Cart */}
          <Link href="/my-orders" className="relative text-gray-900 dark:text-white" title="My Orders">
            <FaShoppingCart className="text-2xl md:text-3xl" />
            {user && orderCount > 0 && (
              <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white px-1.5 py-0.5 rounded-full">
                {orderCount}
              </span>
            )}
          </Link>

          {/* Login/Logout */}
          {!user ? (
            <Link href="/login" className="text-gray-900 dark:text-white" aria-label="Login">
              <FaUserAlt className="text-xl md:text-2xl" />
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-gray-900 dark:text-white" title="Logout">
              <FaSignOutAlt className="text-xl md:text-2xl" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search Field */}
      {showMobileSearch && (
        <div className="md:hidden px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              খুঁজুন
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
