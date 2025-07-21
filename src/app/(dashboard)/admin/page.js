"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "@/component/product/AddProduct";
import AllProduct from "@/component/product/AllProduct";
import ComboProduct from "@/component/product/ComboProduct";
import AllComboProduct from "@/component/product/AllComboProduct";
import AddBanner from "@/component/product/AddBanner";
import Banner from "@/component/product/Banner";
import OrderList from "@/component/order/OrderList";

const AdminPage = () => {
  const [auth, setAuth] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAdminAuthenticated");
    if (storedAuth === "true") {
      setAuth(true);
    }

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/admin", form);
      if (res.data.success) {
        setAuth(true);
        localStorage.setItem("isAdminAuthenticated", "true");
      }
    } catch (err) {
      setError("Please check ur user name and password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setAuth(false);
  };


  if (!auth) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-5 border rounded shadow dark:bg-gray-800 dark:text-white dark:border-gray-600">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-2 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-500"
          />
          {error && <p className="text-red-400 mb-2">{error}</p>}
          <button type="submit" className="w-full bg-black dark:bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 dark:bg-gray-900 dark:text-white min-h-screen scroll-smooth">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Welcome Gadgets Admin</h2>  
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-wrap gap-4 mb-8 text-blue-600 dark:text-blue-400 font-medium">
        <a href="#product" className="hover:underline">Add Product</a>
        <a href="#combo" className="hover:underline">Add Combo</a>
        <a href="#banner" className="hover:underline">Add Banner</a>
      </div>
   <div id="orders" className="mb-10 border p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  <h3 className="text-xl font-semibold mb-4">Order Section</h3>
  <OrderList />
</div>
      {/* Product Section */}
      <div id="product" className="mb-10 border p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Product Section</h3>
        <AddProduct />
        <AllProduct />
      </div>

      {/* Combo Product Section */}
      <div id="combo" className="mb-10 border p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Combo Section</h3>
        <ComboProduct />
        <AllComboProduct />
      </div>

      {/* Banner Section */}
      <div id="banner" className="mb-10 border p-5 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Banner Section</h3>
        <AddBanner />
        <Banner />
      </div>
    </div>
  );
};

export default AdminPage;
