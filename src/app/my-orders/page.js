// MyOrders.jsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transactionIds, setTransactionIds] = useState({});

  useEffect(() => {
    if (user?.email) {
      const fetchOrders = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/my-orders?email=${user.email}`);
          if (res.data.success) {
            setOrders(res.data.orders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error("Failed to fetch orders", error);
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
    if (!transactionId) return alert("Please enter a transaction ID");

    try {
      await axios.patch(`http://localhost:5000/orders/${orderId}`, {
        transactionId,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, transactionId } : order
        )
      );
      alert("Transaction ID submitted");
    } catch (err) {
      console.error(err);
      alert("Failed to submit transaction ID");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!orders.length) return <p className="text-center mt-10">No orders found.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order._id} className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-bold">{order.productName}</h3>
            <p>Order ID: {order._id}</p>
            <p>Status: {order.status || "Pending"}</p>
            <p>Transaction ID: {order.transactionId || "Not Submitted"}</p>

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionIds[order._id] || ""}
              onChange={(e) =>
                setTransactionIds({ ...transactionIds, [order._id]: e.target.value })
              }
              className="border p-2 mt-2 rounded w-full"
            />
            <button
              onClick={() => handleTransactionSubmit(order._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Submit Transaction ID
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
