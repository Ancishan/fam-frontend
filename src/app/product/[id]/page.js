"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import ProductReceivePolicy from "@/component/ProductReceivePolicy";
import toast from "react-hot-toast"; // Import toast
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderConfirmedCOD, setOrderConfirmedCOD] = useState(false); // For COD confirmation
  const [bkashInitiated, setBkashInitiated] = useState(false); // For bKash initiation

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (!id) return;
    setLoadingProduct(true);

    axios
      .get(`https://dk-server.vercel.app/products/${id}`)
      .then((res) => {
        if (res.data.success) {
          setProduct(res.data.product);
          setError(null);
        } else {
          setError("Product not found");
        }
      })
      .catch(() => setError("Failed to fetch product"))
      .finally(() => setLoadingProduct(false));
  }, [id]);

  if (loading || loadingProduct)
    return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return null;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const deliveryCharge = 99; // Added delivery charge variable
  const totalPrice = discountedPrice * quantity;
  const totalPriceWithDelivery = totalPrice + deliveryCharge; // New variable for total with delivery

  const whatsappNumber = "8801622980679";

  const whatsappMessage = `Hello, I want to order ${
    product.name
  } (Qty: ${quantity}). My name is ${formData.name || ""}, phone: ${
    formData.phone || ""
  }, address: ${formData.address || ""}, Payment method: ${
    paymentMethod === "cod"
      ? "Cash on Delivery (with delivery charge)"
      : paymentMethod === "deliveryBkash"
      ? "Pay delivery charge via bKash"
      : "Full payment via bKash"
  }`;

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const bkashFullPaymentLink =
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink";

  const bkashDeliveryChargeLink =
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink";

  const handleBkashOrderAndRedirect = async () => {
    if (!user) {
      router.push(`/login?redirect=/product/${id}`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("দয়া করে সবগুলো ফর্ম ফিলাপ করুন");
      return;
    }

    // <-- New: Added check for stock before ordering
    if (product.stock < quantity) {
      toast.error(`দুঃখিত, আমাদের কাছে মাত্র ${product.stock}টি পণ্য আছে।`);
      return;
    }

    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        quantity,
        totalPrice: totalPriceWithDelivery, // Use the new total price with delivery
        buyerName: formData.name,
        buyerEmail: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod, // Will be "deliveryBkash"
        orderedBy: "bkash",
        status: "bkash_pending_verification", // New status for bKash orders awaiting verification
      };

      const res = await axios.post("https://dk-server.vercel.app/order", orderData);

      if (res.data.success) {
        if (paymentMethod === "deliveryBkash") {
          window.open(bkashDeliveryChargeLink, "_blank");
        } else {
          window.open(bkashFullPaymentLink, "_blank"); // If 'fullBkash' option is added later
        }
        setBkashInitiated(true); // Set the flag to show bKash specific confirmation
        // Do NOT set orderConfirmedCOD here, as it's for COD only
      } else {
        toast.error("❌ অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ কিছু ভুল হয়েছে!");
    }
  };

  const handleCODOrderSubmit = async () => {
    if (!user) {
      router.push(`/login?redirect=/product/${id}`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("দয়া করে সবগুলো ফর্ম ফিলাপ করুন");
      return;
    }

    // <-- New: Added check for stock before ordering
    if (product.stock < quantity) {
      toast.error(`দুঃখিত, আমাদের কাছে মাত্র ${product.stock}টি পণ্য আছে।`);
      return;
    }

    try {
      const orderData = {
        productId: product._id,
        productName: product.name,
        quantity,
        totalPrice: totalPriceWithDelivery, // Use the new total price with delivery
        buyerName: formData.name,
        buyerEmail: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: "cod",
        orderedBy: "website",
        status: "pending", // Default status for COD
      };

      const res = await axios.post("https://dk-server.vercel.app/order", orderData);

      if (res.data.success) {
        setOrderConfirmedCOD(true); // Set COD specific confirmation
        // Do NOT set bkashInitiated here
      } else {
        toast.error("❌ অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ কিছু ভুল হয়েছে!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      {bkashInitiated ? (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-6 py-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">
            বিকাশ পেমেন্ট এর জন্য ধন্যবাদ!
          </h2>
          <p className="mb-6">
            অনুগ্রহ করে নতুন ট্যাবে খোলা বিকাশ পেমেন্ট সম্পন্ন করুন। পেমেন্ট সফল
            হলে, আপনার **ট্রানজেকশন আইডি** (Transaction ID) সংরক্ষণ করুন।
            <br />
            এরপর, আপনার অর্ডারটি নিশ্চিত করতে{" "}
            <span className="font-bold ">আমার অর্ডারসমূহ</span> সেকশনে গিয়ে
            ট্রানজেকশন আইডিটি জমা দিন।
          </p>
          <button
            onClick={() => router.push("/my-orders")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition mr-2"
          >
            আমার অর্ডারসমূহ
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            হোম পেজ
          </button>
        </div>
      ) : orderConfirmedCOD ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg shadow-md max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold mb-4">
            ধন্যবাদ dk-gadgets-hub এর সাথে থাকার জন্য।
          </h2>
          <p className="mb-6">
            আপনার অর্ডারটি কনফার্ম করার জন্য আমাদের প্রতিনিধি শীঘ্রই যোগাযোগ
            করবে আপনার সাথে। ধন্যবাদ.
          </p>
          <button
            onClick={() => router.push("/my-orders")}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            OK
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image & Info */}
            <div className="bg-white shadow rounded-lg p-6">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={400}
                className="rounded-lg object-cover mb-4"
              />
              <h1 className="text-3xl font-bold text-black">{product.name}</h1>
              <p className="text-sm text-black mt-1">Model: {product.model}</p>

              {/* <-- New: Displaying stock status */}
              {product.stock > 0 ? (
                <p className="text-green-600 font-bold mt-2">
                  In Stock - {product.stock} items
                </p>
              ) : (
                <p className="text-red-600 font-bold mt-2">Sold Out</p>
              )}

              <p className="text-black mt-4">{product.description}</p>
              <p className="text-lg font-semibold text-black mt-2 leading-relaxed">
                পণ্যের মূল্য: {totalPrice} টাকা
                <br />
                ডেলিভারি চার্জ: {deliveryCharge} টাকা
                <br />
                <span className="block border-t-2 border-gray-400 my-2 w-48"></span>
                মোট টাকা: {totalPriceWithDelivery} টাকা
              </p>
            </div>

            {/* Order Form */}
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                আপনার অর্ডারটি কনফার্ম করতে নিচের তথ্যগুলো পূরণ করুন
              </h2>
              <p className="text-sm text-red-500 mb-2">
                🔹 আমাদের পলিসি অনুযায়ী আপনাকে আমাদের পেইজের প্রোডাক্ট অর্ডার
                করতে আগে একাউন্ট ক্রিয়েট করতে
                <Link
                  href="/registration"
                  className="underline text-blue-600 hover:text-blue-800 ml-1"
                >
                   👆 ক্লিক করুন
                </Link>{" "}
                হবে <br />
              </p>

              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-1"
              >
                আপনার নাম
              </label>
              <input
                id="name"
                type="text"
                placeholder="আপনার নাম"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
              />

              <label
                htmlFor="email"
                className="block text-black font-medium mt-4 mb-1"
              >
                ইমেইল (অটো ফিল)
              </label>
              <input
                id="email"
                type="email"
                placeholder="ইমেইল (অটো ফিল)"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border text-black border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
              />

              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mt-4 mb-1"
              >
                আপনার মোবাইল নাম্বার
              </label>
              <input
                id="phone"
                type="text"
                placeholder="আপনার মোবাইল নাম্বার"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              />

              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mt-4 mb-1"
              >
                আপনার সম্পূর্ণ ঠিকানা লিখুন (জেলা এবং উপজেলা/থানা সহ)
              </label>
              <textarea
                id="address"
                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন (জেলা এবং উপজেলা/থানা সহ)"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg resize-none"
                rows={4}
              />

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-black font-medium">পণ্যের পরিমাণ:</span>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="কমান"
                  disabled={product.stock === 0} // <-- New: Disabled if out of stock
                >
                  −
                </button>
                <span className="text-xl text-black">{quantity}</span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock, q + 1))
                  } // <-- New: Added quantity limit
                  className="w-8 h-8 rounded-full text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="বাড়ান"
                  disabled={product.stock === 0 || quantity >= product.stock} // <-- New: Disabled if out of stock or at max quantity
                >
                  +
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="mt-4">
                <p className="font-semibold mb-2 text-black">
                  পেমেন্ট মেথড নির্বাচন করুন:
                </p>
                <div className="space-y-2">
                  <label className="inline-flex items-center font-black space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      disabled={product.stock === 0} // <-- New: Disabled if out of stock
                    />
                    <span className="text-black">
                      Cash on Delivery (ডেলিভারি চার্জ সহ ক্যাশ অন ডেলিভারি)
                    </span>
                  </label>

                  <label className="inline-flex items-center space-x-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="deliveryBkash"
                      checked={paymentMethod === "deliveryBkash"}
                      onChange={() => setPaymentMethod("deliveryBkash")}
                      disabled={product.stock === 0} // <-- New: Disabled if out of stock
                    />
                    <span className="text-black">
                      Full pay with Delivery Charge via bKash (ফুল পেমেন্ট সহ
                      ডেলিভারি চার্জ পেমেন্ট বিকাশে)
                    </span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row mt-6 gap-4">
                {/* WhatsApp button always visible and separate */}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full md:w-1/3 text-white py-3 rounded-lg font-semibold text-center transition ${
                    product.stock === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                  aria-disabled={product.stock === 0}
                >
                  WhatsApp-এ অর্ডার করুন 💬
                </a>

                {/* Payment method buttons side by side */}
                <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4">
                  {paymentMethod === "deliveryBkash" && (
                    <button
                      onClick={handleBkashOrderAndRedirect}
                      className={`w-full md:w-1/2 text-white py-3 rounded-lg font-semibold transition ${
                        product.stock === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-pink-600 hover:bg-pink-700"
                      }`}
                      disabled={product.stock === 0} // <-- New: Disabled if out of stock
                    >
                      bKash দিয়ে পেমেন্ট করুন
                      <span className="text-sm block mt-2 text-center text-amber-200">
                        পেমেন্ট সম্পন্ন হলে, **ট্রানজেকশন আইডিটি** সংরক্ষণ করুন
                        এবং
                        <FaShoppingCart className="inline text-lg mx-1" />
                        **ভেরিফাই** সেকশনে গিয়ে যাচাই করে নিন।
                      </span>
                    </button>
                  )}

                  {paymentMethod === "cod" && (
                    <button
                      onClick={handleCODOrderSubmit} // Use the new handler for COD
                      className={`w-full md:w-1/2 text-white py-3 rounded-lg font-semibold transition ${
                        product.stock === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      disabled={product.stock === 0} // <-- New: Disabled if out of stock
                    >
                      এখানেই অর্ডার করুন
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Policy Section */}
          <div className="mt-12">
            <ProductReceivePolicy />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
