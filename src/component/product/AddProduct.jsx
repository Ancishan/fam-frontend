"use client";
import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        model: "",
        price: "",
        description: "",
        image: ""
    });

    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
        setIsLoading(true);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(
                'https://api.imgbb.com/1/upload?key=5baab7a9e1cdc65f0721a2b32aef61bb',
                formData
            );
            setProduct((prev) => ({ ...prev, image: res.data.data.url }));
        } catch (err) {
            console.error("Image upload failed", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await axios.post("https://fam-backend-49mw.onrender.com/products", product);
            console.log("Product saved:", res.data);
            alert("✅ Product added successfully!");

            // Reset form
            setProduct({
                name: "",
                model: "",
                price: "",
                description: "",
                image: ""
            });
            setPreview(null);
        } catch (err) {
            console.error("❌ Failed to save product", err);
            alert("Failed to add product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-10 max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Add New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Input styles */}
                {[
                    { label: "Product Name", name: "name", type: "text" },
                    { label: "Model", name: "model", type: "text" },
                    { label: "Price", name: "price", type: "number" }
                ].map((field) => (
                    <div key={field.name}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {field.label}
                        </label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={product[field.name]}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        required
                        className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 dark:file:bg-blue-500 dark:hover:file:bg-blue-600"
                    />
                </div>

                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg mx-auto border"
                    />
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`w-full py-2 px-4 text-white font-semibold rounded-lg transition-all duration-300 ${
                        isSubmitting || isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                    }`}
                >
                    {isSubmitting
                        ? "Submitting..."
                        : isLoading
                        ? "Uploading image..."
                        : "Add Product"}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
