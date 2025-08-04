'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../product/ProductCard";

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Only fetch data if the search term is not empty
    if (search.trim() === "") {
      setProducts([]); // Clear results if search field is empty
      return;
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/search?q=${search}`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [search]); // This effect now depends on the 'search' state, which is updated on button click.

  const handleSearch = () => {
    setSearch(searchTerm); // Set the search state to trigger the useEffect
  };

  return (
    <div className="p-4">
      {/* Centering the search input and button */}
      <div className="flex justify-center items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="প্রোডাক্টের নাম লিখুন..."
          className="border p-2 w-96 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // Also search on Enter key press
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

<div className="flex justify-center mt-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
</div>

    </div>
  );
};

export default SearchProduct;