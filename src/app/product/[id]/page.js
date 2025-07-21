"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";  // Auth context import

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth(); // current logged in user

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // formData এ email ফিল্ড যুক্ত করলাম
  const [formData, setFormData] = useState({
    name: "",
    email: "",   // add email field here
    phone: "",
    address: "",
  });

  // যখন user এর ইমেইল আসে, তখন formData.email সেট করবো
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // product fetch করা
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
          setError(null);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Failed to fetch product"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return null;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const totalPrice = discountedPrice * quantity;

  const whatsappNumber = "8801622980679";
  const whatsappMessage = `Hello, I want to order ${product.name} (Qty: ${quantity}). My name is ${formData.name || ""}, phone: ${
    formData.phone || ""
  }, address: ${formData.address || ""}`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const paymentLink = `https://shop.bkash.com/tansir-telecom01318962340/paymentlink/default-payment`;

const handleBkashPayment = async () => {
  if (!formData.name || !formData.phone || !formData.address) {
    alert("Please fill in all fields before proceeding.");
    return;
  }

  try {
    const orderData = {
      productId: product._id,
      productName: product.name,
      quantity,
      totalPrice,
      buyerName: formData.name,
      buyerEmail: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    console.log("Sending order data:", orderData);  // <=== এখানে চেক করো ডাটা ঠিক আছে কি না

    const res = await axios.post("http://localhost:5000/order", orderData);

    if (res.data.success) {
      window.open(paymentLink, "_blank");
    } else {
      alert("❌ Order failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong!");
  }
};


  return (
    <div className="max-w-xl mx-auto mt-24 p-6">
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-lg ">Model: {product.model}</p>
      <p className="text-base ">{product.description}</p>

      <p className="text-xl mt-2 text-red-600">
        ৳ {discountedPrice} x {quantity} = ৳ {totalPrice}
      </p>

      <div className="flex items-center mt-4 space-x-3">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className=" px-3 py-1 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className=" px-3 py-1 rounded"
        >
          +
        </button>
      </div>

      <div className="mt-6 space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-2 border rounded"
        />
        {/* email input hidden or readonly since it auto-fills from user context */}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          readOnly
          className="w-full px-4 py-2 border rounded cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Delivery Address"
          value={formData.address}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, address: e.target.value }))
          }
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mt-6 flex space-x-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">Order via WhatsApp</span>
          <div className="animate-bounce text-xl">💬</div>
        </a>

        <button
          onClick={handleBkashPayment}
          className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
        >
          <span className="mr-2">Pay with bKash</span>
          <div className="animate-pulse text-xl">💸</div>
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
