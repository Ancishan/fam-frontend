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

  const discountedPrice = discount > 0 ? price - (price * discount) / 100 : price;

  return (
    <div className="flex flex-col justify-between border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] group bg-white dark:bg-gray-900">
      <div>
        <div className="relative overflow-hidden rounded-lg aspect-square mb-3">
          <Image
            src={imgSrc}
            alt={name}
            width={500}
            height={500}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc("/placeholder-image.jpg")}
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-pink-600 transition-colors">
          {name}
        </h3>
        <div className="mt-2 space-y-1">
          {model && (
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Size: <span className="font-medium">{model}</span>
            </p>
          )}

          {/* Show original price and discounted price */}
          <div className="flex items-center space-x-2">
            <p className={`text-lg font-bold ${discount > 0 ? "text-gray-500 dark:text-gray-400 line-through" : "text-gray-900 dark:text-white"}`}>
              ৳ {price}
            </p>
            {discount > 0 && (
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                ৳ {discountedPrice}
              </p>
            )}
          </div>

          {/* Show discount percentage if available */}
          {discount > 0 && (
            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
              Discount: <span className="font-semibold">{discount}%</span>
            </p>
          )}
        </div>
      </div>
      <button
        onClick={handleViewDetails}
        className="mt-4 w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md active:scale-95 dark:bg-pink-700 dark:hover:bg-pink-800"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
