"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const UpdateBanner = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [banner, setBanner] = useState({ image: "", caption: "" });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        console.log("Banner ID:", id); // Debug
        const res = await axios.get(`https://dk-server.vercel.app/banner/${id}`);
        console.log("Fetched banner:", res.data); // Debug
        setBanner(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch banner:", err);
        setLoading(false);
      }
    };

    if (id) fetchBanner();
  }, [id]);

  // Function to upload the image to imgbb
  const uploadToImgbb = async () => {
    const formData = new FormData();
    formData.append("image", imageFile);
    const res = await axios.post(
      "https://api.imgbb.com/1/upload?key=8698cded860fcde3ab21fde4b38c9e94",
      formData
    );
    return res.data.data.url;
  };

  const handleUpdate = async () => {
    try {
      setUploading(true);
      let imageUrl = banner.image;

      if (imageFile) {
        imageUrl = await uploadToImgbb();
      }

      await axios.put(`https://dk-server.vercel.app/banner/${id}`, {
        image: imageUrl,
        caption: banner.caption,
      });

      alert("Banner updated successfully!");
      router.push("/admin/banner");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update banner.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Banner</h2>

      {/* Display current banner image */}
      {banner.image && (
        <Image
          src={banner.image}
          alt="banner"
          width={800}
          height={160}
          className="w-full h-40 object-cover rounded mb-4"
        />
      )}

      {/* Input for selecting a new image */}
      <label className="block mb-2 text-sm font-medium">New Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
        className="w-full border p-2 mb-4 rounded"
      />

      {/* Input for banner caption */}
      <label className="block mb-2 text-sm font-medium">Caption</label>
      <input
        type="text"
        value={banner.caption}
        onChange={(e) => setBanner({ ...banner, caption: e.target.value })}
        className="w-full border p-2 mb-4 rounded"
        placeholder="Enter caption"
      />

      {/* Button to submit the update */}
      <button
        onClick={handleUpdate}
        disabled={uploading}
        className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? "Updating..." : "Update Banner"}
      </button>
    </div>
  );
};

export default UpdateBanner;
