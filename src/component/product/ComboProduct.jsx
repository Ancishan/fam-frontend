"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ComboProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    model: "",
    price: "",
    discount: "",
    description: "",
    images: [], // Changed to hold multiple images
  });

  const [previews, setPreviews] = useState([]); // To store preview images
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const newPreviews = [];
    const newImages = [];

    setIsLoading(true);

    // Loop over each file and upload it
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      newPreviews.push(URL.createObjectURL(file)); // Preview for each image

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          "https://api.imgbb.com/1/upload?key=5baab7a9e1cdc65f0721a2b32aef61bb",
          formData
        );
        newImages.push(res.data.data.url); // Save image URL
      } catch (err) {
        console.error("Image upload failed", err);
      }
    }

    setProduct((prev) => ({ ...prev, images: newImages }));
    setPreviews(newPreviews);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post("https://famdk-server.vercel.app/combo", product);
      console.log("Product saved:", res.data);
      alert("Product added successfully!");
      router.push("/admin");
    } catch (err) {
      console.error("Failed to save product", err);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-24 max-w-xl mx-auto bg-white dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-700 dark:text-pink-300">
        Add New Combo Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Fields */}
        {[{ label: "Product Name", name: "name", type: "text" },
          { label: "Model/Size", name: "model", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Discount (%)", name: "discount", type: "number" }].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={product[field.name]}
              onChange={handleChange}
              required={field.name !== "discount"} // optional for discount
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-pink-400"
            />
          </div>
        ))}

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-pink-400"
          ></textarea>
        </div>

        {/* Image Upload for Multiple Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Product Images (You can upload multiple)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700 dark:file:bg-pink-600 dark:hover:file:bg-pink-700"
          />
        </div>

        {/* Image Previews */}
        <div className="flex space-x-4 overflow-x-auto mt-4">
          {previews.map((preview, index) => (
            <img
              key={index}
              src={preview}
              alt={`Preview ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg border dark:border-gray-500"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-all duration-300 ${
            isSubmitting || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600"
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : isLoading
            ? "Uploading images..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ComboProduct;
