"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { name, model, price, discount, stock, image, _id } = product;
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState(image);

  const handleViewDetails = () => {
    router.push(`/product/${_id}`);
  };

  const discountedPrice =
    discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div
      onClick={handleViewDetails}
      className="flex flex-col justify-between border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] group bg-white dark:bg-gray-900 cursor-pointer"
    >
      <div>
        <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
          <Image
            src={imgSrc}
            alt={name}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/placeholder-image.jpg")}
            loading="lazy"
            quality={75}
          />
        </div>
        <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 transition-colors line-clamp-2">
          {name}
        </h3>
        <div className="mt-2 space-y-1 text-sm sm:text-base">
          {model && (
            // The model and stock information are now displayed in the same line
            <p className="text-black font-black dark:text-white">
              Model: <span className="font-medium pr-3">{model}</span>
              {" | "}
              {stock > 0 ? (
                <span className="font-semibold text-black pl-2 dark:text-white">
                  In Stock - {stock}
                </span>
              ) : (
                <span className="font-bold text-red-600 dark:text-red-400">
                  Sold Out
                </span>
              )}
            </p>
          )}
          <div className="flex items-center flex-wrap gap-2">
            <p
              className={`font-semibold ${
                discount > 0
                  ? "text-gray-500 dark:text-gray-400 line-through"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              ৳ {price}
            </p>
            {discount > 0 && (
              <p className="font-semibold text-black dark:text-white">
                ৳ {discountedPrice}
              </p>
            )}
          </div>
          {discount > 0 && (
            <p className="text-sm text-black dark:text-white font-medium">
              Discount: <span className="font-semibold">{discount}%</span>
            </p>
          )}
          <>
            {discount > 0 && (
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                অনলাইনে অর্ডার করে {discount}% ছাড়ে আপনি{" "}
              {((price * discount) / 100).toFixed(2)} টাকা সাশ্রয় করছেন
              </p>
            )}
          </>
        </div>
      </div>

      <div className="mt-4 w-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-base bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-lg transition-colors duration-300 shadow-sm text-center">
        বিস্তারিত দেখুন
      </div>
    </div>
  );
};

export default ProductCard;