"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import ProductReceivePolicy from "@/component/ProductReceivePolicy";
import toast from "react-hot-toast"; // Import toast

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
  const [orderConfirmed, setOrderConfirmed] = useState(false); // নতুন state

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (!id) return;
    setLoadingProduct(true);

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
      .finally(() => setLoadingProduct(false));
  }, [id]);

  if (loading || loadingProduct)
    return <p className="text-center mt-10">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (!product) return null;

  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const totalPrice = discountedPrice * quantity;

  const deliveryCharge = 50;

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
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink/default-payment";

  const bkashDeliveryChargeLink =
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink/delivery-charge";

  const handleBkashPayment = async () => {
    if (!user) {
      router.push(`/login?redirect=/product/${id}`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("দয়া করে সবগুলো ফর্ম ফিলাফ করুন"); // Toast notification
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
        paymentMethod,
        orderedBy: "bkash",
      };

      const res = await axios.post("http://localhost:5000/order", orderData);

      if (res.data.success) {
        if (paymentMethod === "fullBkash") {
          window.open(bkashFullPaymentLink, "_blank");
        } else if (paymentMethod === "deliveryBkash") {
          window.open(bkashDeliveryChargeLink, "_blank");
        } else {
          toast.success("আপনি ক্যাশ অন ডেলিভারি পেমেন্ট পদ্ধতি বেছে নিয়েছেন।"); // Toast notification
        }
      } else {
        toast.error("❌ Order failed. Try again."); // Toast notification
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Something went wrong!"); // Toast notification
    }
  };

  const handleOrderSubmit = async () => {
    if (!user) {
      router.push(`/login?redirect=/product/${id}`);
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("দয়া করে সবগুলো ফর্ম ফিলাফ করুন"); // Toast notification
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
        paymentMethod,
        orderedBy: "website",
      };

      const res = await axios.post("http://localhost:5000/order", orderData);

      if (res.data.success) {
        setOrderConfirmed(true);
      } else {
        toast.error("❌ অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"); // Toast notification
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ কিছু ভুল হয়েছে!"); // Toast notification
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8">
      {orderConfirmed ? (
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
              <p className="text-black mt-4">{product.description}</p>
              <p className="text-2xl font-semibold text-black mt-6">
                ৳ {discountedPrice} x {quantity} = ৳ {totalPrice}
              </p>
            </div>

            {/* Order Form */}
            <div className="bg-white shadow rounded-lg p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                আপনার অর্ডারটি কনফার্ম করতে নিচের তথ্যগুলো পূরণ করুন
              </h2>
              <p className="text-sm text-red-500 mb-2">
                🔹 আপনার নাম লিখুন <br />
                🔹 আপনার নাম্বার লিখুন <br />
                🔹 ঠিকানা লিখুন (অবশ্যই জেলার নাম এবং উপজেলা বা থানার নাম দিবেন)
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
                  className="w-8 h-8 rounded-full text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  aria-label="কমান"
                >
                  −
                </button>
                <span className="text-xl text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full text-black bg-gray-200 hover:bg-gray-300 text-lg font-bold"
                  aria-label="বাড়ান"
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
                  className="w-full md:w-1/3 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-center transition"
                >
                  WhatsApp-এ অর্ডার করুন 💬
                </a>

                {/* Payment method buttons side by side */}
                <div className="flex flex-col md:flex-row w-full md:w-2/3 gap-4">
                  {(paymentMethod === "deliveryBkash" ||
                    paymentMethod === "fullBkash") && (
                    <button
                      onClick={handleBkashPayment}
                      className="w-full md:w-1/2 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
                    >
                      bKash দিয়ে পেমেন্ট করুন 💸{" "}
                      <span className="text-sm">
                        (ট্রানজেকশন আইডি সংরক্ষণ করে My-Orders সেকশনে ভেরীফাই
                        করে নিন)
                      </span>
                    </button>
                  )}

                  <button
                    onClick={handleOrderSubmit}
                    className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  >
                    এখানেই অর্ডার করুন
                  </button>
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