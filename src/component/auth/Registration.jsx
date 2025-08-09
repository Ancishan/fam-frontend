"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });
      setSuccess("✅ রেজিস্ট্রেশন সফল হয়েছে!");
      setForm({ email: "", password: "", name: "" });
      router.push("/login");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          আপনার <span className="text-blue-600">DK-Gadgets</span> অ্যাকাউন্ট তৈরি করুন
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">পুরো নাম</label>
            <input
              type="text"
              placeholder="আপনার পুরো নাম"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">ইমেল ঠিকানা</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full text-black px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">পাসওয়ার্ড</label>
            <input
              type="password"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full text-black px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-1">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
          >
            রেজিস্টার করুন
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 rounded-lg shadow-sm transition"
          >
            <FcGoogle size={22} />
            গুগল দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-gray-500">
          ইতিমধ্যেই একটি অ্যাকাউন্ট আছে?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            লগইন করুন
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;