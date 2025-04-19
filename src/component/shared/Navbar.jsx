"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    const categories = [
        { name: "Sports Item", path: "/sports" },
        { name: "Retro Collection", path: "/retro" },
        { name: "Home Kit Collection", path: "/home-kit" },
        { name: "Player Edition", path: "/player" },
        {name:"FootBall-Boots", path:"/football-boots"}
    ];

    // Create a ref for the dropdown menu
    const categoryDropdownRef = useRef(null);

    // Set active category based on URL
    useEffect(() => {
        const currentPath = pathname;
        const activeCat = categories.find(cat => cat.path === currentPath);
        if (activeCat) {
            setActiveCategory(activeCat.name);
        } else {
            setActiveCategory(null);
        }
    }, [pathname]);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle clicking outside the category dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setIsCategoryOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategoryClick = (categoryPath) => {
        router.push(categoryPath);
        setIsCategoryOpen(false);
        setIsMenuOpen(false);
    };

    const clearCategoryFilter = () => {
        router.push('/products');
        setActiveCategory(null);
    };

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
                    {/* Brand Logo */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/"
                            className="text-2xl font-extrabold text-white dark:text-pink-400 bg-clip-text tracking-wide uppercase hover:brightness-110 transition duration-300"
                            onClick={() => setActiveCategory(null)}
                        >
                            FAM SPORT's
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Categories Dropdown */}
                        <div className="relative" ref={categoryDropdownRef}>
                            <button
                                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                className={`text-sm font-semibold uppercase tracking-wide flex items-center transition duration-300 ${
                                    activeCategory
                                        ? 'text-pink-300 dark:text-pink-400'
                                        : 'text-white dark:text-gray-200 hover:text-pink-300 dark:hover:text-pink-400'
                                }`}
                            >
                                Categories
                                <svg
                                    className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                        isCategoryOpen ? "rotate-180" : ""
                                    }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {isCategoryOpen && (
                                <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.path}
                                            href={category.path}
                                            className={`block px-4 py-2 text-sm ${
                                                activeCategory === category.name
                                                    ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200'
                                                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Other Links */}
                        <Link
                            href="/about"
                            className={`text-sm font-semibold uppercase tracking-wide transition duration-300 ${
                                pathname === '/about'
                                    ? 'text-pink-300 dark:text-pink-400'
                                    : 'text-white dark:text-gray-200 hover:text-pink-300 dark:hover:text-pink-400'
                            }`}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-semibold uppercase tracking-wide transition duration-300 ${
                                pathname === '/contact'
                                    ? 'text-pink-300 dark:text-pink-400'
                                    : 'text-white dark:text-gray-200 hover:text-pink-300 dark:hover:text-pink-400'
                            }`}
                        >
                            Contact Us
                        </Link>
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
                    {/* Categories Section */}
                    <div className="px-3 py-2">
                        <h3 className="text-white font-medium uppercase">Categories</h3>
                        <div className="mt-2 space-y-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.path}
                                    href={category.path}
                                    className={`block px-3 py-2 rounded-md text-sm ${
                                        activeCategory === category.name
                                            ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200'
                                            : 'text-white hover:text-pink-300'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Other Links */}
                    <Link
                        href="/about"
                        className={`block px-3 py-2 rounded-md text-base font-medium uppercase ${
                            pathname === '/about'
                                ? 'text-pink-300 dark:text-pink-400'
                                : 'text-white hover:text-pink-300'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className={`block px-3 py-2 rounded-md text-base font-medium uppercase ${
                            pathname === '/contact'
                                ? 'text-pink-300 dark:text-pink-400'
                                : 'text-white hover:text-pink-300'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
