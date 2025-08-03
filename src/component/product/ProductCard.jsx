"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { name, model, price, discount, image, _id } = product;
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
        <h3 className="text-base sm:text-lg font-semibold sm:font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 transition-colors line-clamp-2">
          {name}
        </h3>
        <div className="mt-2 space-y-1 text-sm sm:text-base">
          {model && (
            <p className="text-gray-700 dark:text-gray-300">
              Model: <span className="font-medium">{model}</span>
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
              <p className="font-semibold text-green-600 dark:text-green-400">
                ৳ {discountedPrice}
              </p>
            )}
          </div>
          {discount > 0 && (
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              Discount: <span className="font-semibold">{discount}%</span>
            </p>
          )}
        </div>
      </div>

      {/* Optional: Keep the button for UI, but no need for onClick */}
     <div className="mt-4 w-full px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-base bg-neutral-200 dark:bg-neutral-700 text-gray-800 dark:text-gray-100 rounded-lg transition-colors duration-300 shadow-sm text-center">
  More Details
</div>

    </div>
  );
};

export default ProductCard;
