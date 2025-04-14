"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching product with ID:", id); // Debug log

        const res = await axios.get(
          `https://dk-gadget-server-3.onrender.com/products/${id}`
        );

        if (res.data.success) {
          setProduct(res.data.product);
        } else {
          setError(res.data.message || "Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          id: id,
        });

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch product"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md mx-auto">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <p className="text-sm mt-2">Product ID: {id}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12 text-red-500">Product not found</div>
    );
  }

  // Dynamic model-based font size
  const modelFontSize = product.model ? "text-lg" : "text-base";

  // WhatsApp message and phone number
  const whatsappPhoneNumber = "1234567890"; // Replace with your WhatsApp number
  const message = `Hello, I am interested in the ${product.name}. Please provide more details.`; // Customize message

  // WhatsApp link
  const whatsappLink = `https://wa.me/${+8801622980679}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="max-w-xl mx-auto mt-24 p-6">
      <div className="grid md:grid-cols-1 gap-6 items-start">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden mb-6">
          <Image
            src={product.image}
            alt={product.name}
            width={600} // Set a fixed width (or dynamic)
            height={400} // Set a fixed height (or dynamic)
            className="object-cover w-full h-[400px]"
          />
        </div>

        {/* Product Information */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-violet-900">{product.name}</h1>

          {product.model && (
            <p className={`text-violet-900 ${modelFontSize}`}>
              Model: {product.model}
            </p>
          )}

          {/* Product Description (if exists) */}
          {product.description && (
            <p className="text-violet-900 text-base">{product.description}</p>
          )}

          <p className="text-2xl font-semibold text-blue-600">
          ৳ {product.price}
          </p>

          {/* Order Now button linking to WhatsApp */}
          <div className="mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">Order Now</span>
              <div className="animate-bounce text-xl">🛒</div>
            </a>
          </div>
        </div>
      </div>

      {/* Full Cart Animation (Optional) */}
      <div className="text-center mt-10">
        <div className="animate-ping inline-block w-12 h-12 rounded-full bg-blue-600 text-white">
          <div className="w-full h-full rounded-full flex justify-center items-center">
            <div className="text-xl">🛒</div>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Item added to cart</p>
      </div>
    </div>
  );
};

export default ProductDetails;
