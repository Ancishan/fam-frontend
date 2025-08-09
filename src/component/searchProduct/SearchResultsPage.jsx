// src/app/search/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import ProductCard from "../product/ProductCard";



const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get('q'); 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // যদি কোনো সার্চ কোয়েরি না থাকে, তাহলে লোডিং বন্ধ করে রিটার্ন করবে
    if (!q) {
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`https://dk-server.vercel.app/search`, {
          params: { q },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Search API error:", err);
        setError("Failed to load products. Please check the server connection.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [q]); // q পরিবর্তন হলে এই effect আবার রান করবে

  const renderContent = () => {
    if (loading) {
      return <p className="text-center text-lg">Loading products...</p>;
    }
    if (error) {
      return <p className="text-center text-red-500 text-lg">{error}</p>;
    }
    if (products.length === 0) {
      return <p className="text-center text-lg">No products found for {q}.</p>;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-28 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for: <span className="text-indigo-600">{q}</span>
      </h1>
      {renderContent()}
    </div>
  );
};

export default SearchResultsPage;