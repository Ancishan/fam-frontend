"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./carousel.css"; // Import custom animations

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/ci.png", caption: "Luxury Sports Jewelry Collection" },
    { src: "/cii.png", caption: "Elite Athletes' Jewelry Designs" },
    { src: "/ciii.png", caption: "Bold Sports Jewelry Styles" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-full mx-auto h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      <div className="overflow-hidden relative h-full">
        <div
          className="flex ease-in-out duration-700 transition-transform h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative h-full">
              <Image
                src={image.src}
                alt={`Carousel Slide ${index + 1}`}
                fill
                className={`object-cover w-full h-full rounded-lg transition-transform duration-700 ease-in-out ${
                  currentIndex === index ? "scale-105" : "scale-100"
                }`}
                priority={index === 0}
              />

              {/* Caption with fade-in animation */}
              {currentIndex === index && (
                <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black/60 to-black/30 px-6 py-3 rounded-md shadow-md animate-fadeIn">
                  <h2 className="text-white text-center text-base sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-lg">
                    {image.caption}
                  </h2>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === index
                ? "bg-pink-500 w-4 sm:w-5"
                : "bg-white bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
