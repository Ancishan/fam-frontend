"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [editing, setEditing] = useState(null);
  const router = useRouter();

  // Fetch banners
  const fetchBanners = async () => {
    const res = await axios.get("https://famdk-server.vercel.app/banner");
    setBanners(res.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      try {
        await axios.delete(`https://famdk-server.vercel.app/banner/${id}`);
        fetchBanners();
        alert("Banner deleted successfully");
      } catch (err) {
        console.error("Failed to delete banner:", err);
        alert("Failed to delete banner");
      }
    }
  };

  // Handle Update navigation
  const handleUpdate = (id) => {
    router.push(`/banners/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Banners</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner._id} className="border p-4 rounded shadow">
            <img
              src={banner.image || "/default-image.jpg"} // Fallback image URL
              alt={banner.caption || "Banner"}
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-lg">{banner.caption}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleUpdate(banner._id)}
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner._id)}
                className="bg-red-500 text-white px-4 py-1 rounded"
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

export default Banner;
