"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AllComboProduct = () => {
  const [comboProducts, setComboProducts] = useState([]);
  const router = useRouter();

  // Fetch all combo products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/combo");
        setComboProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch combo products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/combo/${id}`);
      setComboProducts((prev) => prev.filter((item) => item._id !== id));
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  };

  // Update handler
  const handleUpdate = (id) => {
    router.push(`/updatecombo/${id}`); // Make sure you have this route set up
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">All Combo Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {comboProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4"
          >
            <div className="flex space-x-2 overflow-x-auto mb-4">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Product ${i + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border dark:border-gray-600"
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{product.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Model: {product.model}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Price: ৳{product.price}</p>
            {product.discount && (
              <p className="text-sm text-pink-500">Discount: {product.discount}%</p>
            )}
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>

            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg text-sm"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-lg text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComboProduct;
