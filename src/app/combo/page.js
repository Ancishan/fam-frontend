"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ShowComboProduct = () => {
  const [comboProducts, setComboProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchComboProducts = async () => {
      try {
        const response = await axios.get("https://dk-server.vercel.app/combo");
        setComboProducts(response.data);
      } catch (err) {
        setError("Failed to fetch combo products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComboProducts();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/combos/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="combo-product-container px-4 md:px-10 py-6 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-pink-800 dark:text-pink-300 mb-10">
        Combo Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {comboProducts.map((comboProduct) => {
          const { _id, name, description, model, price, discount, images } = comboProduct;
          const hasDiscount = discount > 0;
          const discountedPrice = hasDiscount
            ? price - (price * discount) / 100
            : price;

          return (
            <div
              key={_id}
              className="flex flex-col justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 hover:scale-[1.01] duration-300 group"
            >
              <div>
                {/* Top two images side by side */}
                {images && images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {images.slice(0, 2).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`Combo Image ${i}`}
                        width={500}
                        height={300}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    ))}
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {description}
                </p>

                <p className="text-sm text-gray-700 dark:text-gray-400">
                  Size/Model:{" "}
                  <span className="font-medium text-pink-700 dark:text-pink-400">
                    {model}
                  </span>
                </p>

                {/* Price display with discount logic */}
                <div className="mt-2">
                  {hasDiscount ? (
                    <>
                      <p className="text-sm text-red-500 font-medium line-through">
                        ৳ {price}
                      </p>
                      <p className="text-lg font-bold text-green-600">
                        ৳ {discountedPrice}
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-bold text-pink-800 dark:text-pink-300">
                      ৳ {price}
                    </p>
                  )}
                  {hasDiscount && (
                    <p className="text-sm text-green-700 dark:text-green-400">
                      Discount: {discount}%
                    </p>
                  )}
                </div>

                {/* Remaining images if more than 2 */}
                {images.length > 2 && (
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {images.slice(2).map((img, i) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`Extra Image ${i}`}
                        width={200}
                        height={150}
                        className="object-cover w-full h-28 rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* View Details Button */}
              <button
                onClick={() => handleViewDetails(_id)}
                className="mt-4 w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md active:scale-95 dark:bg-pink-700 dark:hover:bg-pink-800"
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowComboProduct;
