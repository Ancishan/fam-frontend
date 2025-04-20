"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./carousel.css";
import axios from "axios";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await axios.get("https://famdk-server.vercel.app/banner");
        setBanners(res.data);
      } catch (err) {
        console.error("Failed to fetch banners:", err);
      }
    };

    fetchBanners();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  // ✅ Fixed auto slide without resetting interval on index change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full mx-auto max-w-7xl px-4">
      <div className="relative overflow-hidden aspect-[16/7] rounded-lg shadow-md">
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <div key={index} className="min-w-full relative h-full">
              <Image
                src={banner.image}
                alt={`Banner ${index + 1}`}
                fill
                className={`object-cover w-full h-full rounded-lg transition-transform duration-700 ease-in-out ${
                  currentIndex === index ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
              />

              {/* Caption */}
              {currentIndex === index && (
                <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/60 to-black/30 px-6 py-3 rounded-md shadow-md animate-fadeIn">
                  <h2 className="text-green-400 text-center text-base sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
                    {banner.caption}
                  </h2>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-80 transition-all z-10"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-80 transition-all z-10"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index ? "bg-pink-500 scale-110" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
