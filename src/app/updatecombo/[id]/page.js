// app/updatecombo/[id]/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const UpdateComboProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    model: "",
    price: "",
    discount: "",
    description: "",
    images: [],
  });

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/combo/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file) => formData.append("image", file));

    try {
      const res = await axios.post("http://localhost:5000/upload", formData);
      setProduct((prev) => ({
        ...prev,
        images: [...prev.images, ...res.data.imageUrls],
      }));
    } catch (err) {
      console.error("Failed to upload image:", err);
    }
  };

  // Submit updated product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/combo/${id}`, product);
      alert("Product updated successfully!");
      router.push("/admin");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading product data...</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Update Combo Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "model", "price", "discount", "description"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
            <input
              type={field === "price" || field === "discount" ? "number" : "text"}
              name={field}
              value={product[field] || ""}
              onChange={handleChange}
              required={field !== "discount"}
              className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-700"
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded bg-white dark:bg-gray-700"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="Combo"
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
        >
          {submitting ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateComboProduct;
