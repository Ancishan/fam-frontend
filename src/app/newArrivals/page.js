"use client";
import Link from "next/link";

const NewArrivalPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Sorry, We Are Not Available
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md">
        This page is currently unavailable. Please check back later.
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NewArrivalPage;
