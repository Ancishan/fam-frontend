// ✅ MyOrders.jsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionIds, setTransactionIds] = useState({});

  const bkashDeliveryChargeLink =
    "https://shop.bkash.com/tansir-telecom01318962340/paymentlink";
const deliveryChargeAmount = 99;
 useEffect(() => {
    if (user?.email) {
      const fetchOrders = async () => {
        try {
          const res = await axios.get(
            `https://dk-server.vercel.app/my-orders?email=${user.email}`
          );
          if (res.data.success) {
            setOrders(res.data.orders);
          } else {
            // This block handles cases where the backend returns success:false but not a 404
            setOrders([]);
          }
        } catch (error) {
          console.error("Failed to fetch orders", error);
          if (error.response && error.response.status === 404) {
            // If the error is specifically a 404 from the server
            setOrders([]);
            // You can choose to show a different toast message or none at all
            // toast("You don't have any orders yet.", { icon: '📦' }); 
          } else {
            // For all other server errors (500, etc.)
            toast.error("Failed to load your orders.");
          }
          setOrders([]);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  const handleTransactionSubmit = async (orderId) => {
    const transactionId = transactionIds[orderId];
    if (!transactionId) {
      toast.error("Please enter a transaction ID to submit.");
      return;
    }

    try {
      const res = await axios.patch(`https://dk-server.vercel.app/orders/${orderId}`, {
        transactionId,
      });

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId
              ? { ...order, transactionId, status: res.data.order.status }
              : order
          )
        );
        toast.success("Transaction ID submitted successfully!");
      } else {
        toast.error(res.data.message || "Failed to submit transaction ID.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while submitting transaction ID.");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700">Loading your orders...</p>
    );
  if (!orders.length)
    return <p className="text-center mt-10 text-gray-700">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 ">My Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-600">
              {order.productName}
            </h3>
            <p className="text-gray-700">
              <span className="font-medium">Order ID:</span> {order._id}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Status:</span>{" "}
              <span className="font-semibold capitalize text-purple-700">
                {order.status || "Pending"}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Payment Method:</span>{" "}
              <span className="capitalize">
                {order.paymentMethod?.replace(/_/g, " ") || "N/A"}
              </span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Transaction ID:</span>{" "}
              {order.transactionId || "Not Submitted"}
            </p>

            {/* Show input if transaction ID is not yet submitted */}
            {!order.transactionId && (
              <div className="mt-4">
                <label
                  htmlFor={`transId-${order._id}`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ট্রানজেকশন আইডি জমা দিন:
                </label>
                <input
                  id={`transId-${order._id}`}
                  type="text"
                  placeholder="আপনার ট্রানজেকশন আইডি লিখুন"
                  value={transactionIds[order._id] || ""}
                  onChange={(e) =>
                    setTransactionIds({
                      ...transactionIds,
                      [order._id]: e.target.value,
                    })
                  }
                  className="border border-gray-300 p-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-black"
                />
                <button
                  onClick={() => handleTransactionSubmit(order._id)}
                  className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition-colors duration-200 shadow-md"
                >
                  ট্রানজেকশন আইডি জমা দিন
                </button>
              </div>
            )}

            {order.orderedBy === "website" &&
              order.status === "pending" &&
              !order.transactionId && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-yellow-800 mb-3 font-medium">
                    আপনার অর্ডারের জন্য অগ্রিম{" "}
                    <span className="font-bold">
                      {deliveryChargeAmount} টাকা
                    </span>{" "}
                    ডেলিভারি চার্জ পরিশোধ করতে হবে।
                  </p>

                  <a
                    href={bkashDeliveryChargeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 shadow-md"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 0a2 2 0 00-2 2v4h4a2 2 0 002-2v-4h-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    ডেলিভারি চার্জ বিকাশে পেমেন্ট করুন
                  </a>
                </div>
              )}
            {order.transactionId &&
              order.orderedBy === "website" &&
              order.status === "pending" && (
                <p className="mt-4 text-green-700 font-medium bg-green-50 p-3 rounded-md border border-green-200">
                  আপনার ট্রানজেকশন আইডি জমা দেওয়া হয়েছে। আমাদের প্রতিনিধি
                  শীঘ্রই এটি ভেরিফাই করবে।
                </p>
              )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
