"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/component/product/ProductCard";

const ShowProductt = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");

  // Step 1: Initial fetch of all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/products");
        setAllProducts(response.data); // Save the original, unsorted list
        setProducts(response.data); // Display the initial list
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Step 2: Apply sorting logic whenever the sortOption changes
  useEffect(() => {
    if (allProducts.length > 0) {
      let sortedProducts = [...allProducts]; // Create a copy to avoid mutating the original
      if (sortOption === "price_asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price_desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      setProducts(sortedProducts);
    }
  }, [sortOption, allProducts]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Retry
        </button>
      </div>
    );

  if (products.length === 0)
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No products available</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Our Products
        </h2>
        {/* Sort dropdown */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="sort-by-price"
            className="text-xl font-medium text-gray-700 dark:text-gray-300"
          >
            Sort by Price:
          </label>
          <select
            id="sort-by-price"
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShowProductt;