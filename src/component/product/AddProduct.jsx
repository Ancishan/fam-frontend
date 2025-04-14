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
            alert("Product added successfully!");
            
            // Reset form after successful submission
            setProduct({
                name: "",
                model: "",
                price: "",
                description: "",
                image: ""
            });
            setPreview(null);
        } catch (err) {
            console.error("Failed to save product", err);
            alert("Failed to add product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6 mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-black"
                    required
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Size"
                    value={product.model}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-black"
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-black"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-black"
                    required
                />
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-black mb-2"
                        required
                    />
                    {isLoading && <p className="text-sm text-gray-500">Uploading image...</p>}
                </div>
                {preview && (
                    <img src={preview} alt="Preview" className="h-32 rounded-lg object-cover mx-auto" />
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className={`w-full ${isSubmitting || isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-semibold py-2 px-4 rounded-lg transition-all`}
                >
                    {isSubmitting ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
};

export default AddProduct;