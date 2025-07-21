"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/orders");
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else if (Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setError("Invalid data format from API");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        status: newStatus,
      });

      // update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Status update failed");
    }
  };

  const statusOptions = ["pending", "processing", "shipped", "delivered"];

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">All Orders</h2>
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="min-w-full border border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Buyer</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Phone</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.productName}</td>
                <td className="border px-4 py-2">{order.buyerName}</td>
                <td className="border px-4 py-2">{order.buyerEmail}</td>
                <td className="border px-4 py-2">{order.phone}</td>
                <td className="border px-4 py-2">{order.address}</td>
                <td className="border px-4 py-2 text-center">{order.quantity}</td>
                <td className="border px-4 py-2">৳ {order.totalPrice}</td>
                <td className="border px-4 py-2">{formatDate(order.createdAt)}</td>
                <td className="border px-4 py-2">{order.transactionId || "Not Provided"}</td>
                <td className="border px-4 py-2 capitalize">{order.status || "pending"}</td>
                <td className="border px-4 py-2">
                  <select
                    value={order.status || "pending"}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderList;
