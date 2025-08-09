// AddBanner.js - Refined Version
"use client";
import { useState } from "react";
import axios from "axios";

const AddBanner = () => {
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // New loading state

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImage("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) return; // Prevent multiple submissions

        if (!imageFile || !caption) {
            alert("Please select an image and enter a caption.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            // It's better to put API keys in environment variables for security.
            // For a Next.js project, use NEXT_PUBLIC_IMGDB_API_KEY
            const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "8698cded860fcde3ab21fde4b38c9e94"; 
            const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

            const uploadResponse = await axios.post(imgbbUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const imageUrl = uploadResponse.data.data.url;

            // Use an environment variable for your server URL
            const serverUrl = process.env.NEXT_PUBLIC_SERVER_API || "https://dk-server.vercel.app";

            await axios.post(`${serverUrl}/banner`, {
                image: imageUrl,
                caption,
            });

            alert("Banner added successfully!");
            setImage("");
            setCaption("");
            setImageFile(null);
        } catch (error) {
            console.error("Error uploading image or adding banner:", error);
            alert(`Failed to add banner. Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 rounded-xl shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">
            <h3 className="text-2xl font-bold text-center mb-6">Add New Banner</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="image" className="block text-sm font-semibold mb-1">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="w-full file:bg-indigo-600 file:text-white file:py-1 file:px-3 file:rounded-md file:border-none file:cursor-pointer border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {image && (
                        <img
                            src={image}
                            alt="Preview"
                            className="mt-4 w-full max-h-40 object-cover rounded-md border border-gray-300 dark:border-gray-600"
                        />
                    )}
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="caption"
                        className="block text-sm font-semibold mb-1"
                    >
                        Caption
                    </label>
                    <input
                        type="text"
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter banner caption"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add Banner"}
                </button>
            </form>
        </div>
    );
};

export default AddBanner;