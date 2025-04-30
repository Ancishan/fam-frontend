"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        alert("Product deleted successfully");
      } catch (err) {
        console.error("Failed to delete product:", err);
        alert("Failed to delete product");
      }
    }
  };

  // Handle Update navigation
  const handleUpdate = (id) => {
    router.push(`/updateProduct/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={300}
              className="w-full h-48 object-cover mb-2"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
            <h3 className="text-xl text-violet-900 font-semibold">{product.name}</h3>
            <p className="text-violet-900">Price: ৳{product.price}</p>
            <p className="text-violet-900">Discount: {product.discount}%</p>
            <p className="text-violet-900">Category: {product.category}</p>
            <p className="text-violet-900">Size: {product.model}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleUpdate(product._id)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

export default AllProduct;
