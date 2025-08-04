"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUserAlt } from "react-icons/fa"; // FaUserAlt আইকন ইম্পোর্ট করা হয়েছে

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const router = useRouter();

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

    const handleSearch = () => {
        if (searchTerm.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
            setShowMobileSearch(false);
        }
    };

    return (
        <nav className="fixed w-full z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand Logo - আগের মতো */}
                    <Link href="/" className="flex items-center space-x-3">
                        <img
                            src="/logo.jpg"
                            alt="DK Gadget's Hub"
                            className="h-15 w-35 transition-transform duration-300 hover:scale-105 aspect-square"
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

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!user ? (
                            // Login Link with Icon for desktop
                            <Link
                                href="/login"
                                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-2"
                            >
                                <FaUserAlt className="h-5 w-5" />
                                <span>Login</span>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/my-orders"
                                    className=" text-white text-4xl px-4 py-1 "
                                    title="My Orders"
                                >
                                    <FaShoppingCart />
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-indigo-600 dark:text-indigo-400 hover:underline ml-4 font-medium"
                                >
                                   <FaSignOutAlt className="text-4xl" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu and search buttons */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Mobile Login Icon */}
                        {!user && (
                            <Link
                                href="/login"
                                className="p-2 text-gray-900 dark:text-white"
                                aria-label="Login"
                            >
                                <FaUserAlt className="text-3xl" />
                            </Link>
                        )}
                        <button
                            onClick={() => {
                                setShowMobileSearch((prev) => !prev);
                                setIsMenuOpen(false);
                            }}
                            className="p-2 text-gray-900 dark:text-white"
                            aria-label="Toggle search"
                        >
                            <FaSearch className="h-5 w-5" />
                        </button>
                        <button
                            onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                setShowMobileSearch(false);
                            }}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Search Input Field */}
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

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 space-y-2">
                    {/* এখানে লগইন আইকন ও টেক্সট এর পরিবর্তে My Orders এবং Logout থাকবে যদি ইউজার লগইন করা থাকে */}
                    {user ? (
                        <>
                            <Link
                                href="/my-orders"
                                className="block  text-white px-3 py-1 text-2xl"
                                onClick={() => setIsMenuOpen(false)}
                            >
                               <FaShoppingCart />
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className="block  text-white px-3 py-1 text-2xl"
                            >
                                <FaSignOutAlt  />
                            </button>
                        </>
                    ) : (
                        // Login Link for mobile menu
                        <Link href="/login" className="block px-3 py-2 text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen(false)}>
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;