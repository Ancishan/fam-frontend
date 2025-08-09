"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { auth } from "@/firebase";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState("/");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    // Set the redirect URL only after the component has mounted on the client
    const redirect = searchParams.get("redirect") || "/";
    setRedirectUrl(redirect);
  }, [searchParams]);

  // ইমেল বৈধ কিনা তা যাচাই করার জন্য একটি ফাংশন
  const emailIsValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // সাধারণ লগইন হ্যান্ডলার
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!emailIsValid(email)) {
      setError("অনুগ্রহ করে একটি বৈধ ইমেল ঠিকানা লিখুন।");
      return;
    }
    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectUrl);
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("এই ইমেল দিয়ে কোনো ব্যবহারকারী পাওয়া যায়নি।");
          break;
        case "auth/wrong-password":
          setError("ভুল পাসওয়ার্ড।");
          break;
        case "auth/too-many-requests":
          setError("অনেকবার চেষ্টা করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।");
          break;
        default:
          setError("লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে আপনার তথ্য যাচাই করুন।");
      }
    }

    setLoading(false);
  };

  // গুগল সাইন-ইন হ্যান্ডলার
  const handleGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push(redirectUrl);
    } catch (err) {
      setError("গুগল দিয়ে সাইন-ইন ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
      console.error("Google Sign-In error:", err);
    }

    setGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            স্বাগতম dk-gadgget-hub
        </h1>
        <form onSubmit={handleLogin} noValidate>
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
          >
            ইমেল ঠিকানা
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 mb-1 font-medium"
          >
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            type="password"
            placeholder="আপনার পাসওয়ার্ড"
            className="w-full mb-6 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            minLength={6}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold ${
              loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            } transition`}
          >
            {loading ? "লগইন করা হচ্ছে..." : "লগইন করুন"}
          </button>
        </form>

        <div className="my-4 flex items-center justify-center space-x-2">
          <span className="text-gray-400 dark:text-gray-500">অথবা</span>
        </div>

        {/* গুগল সাইন-ইন বাটন */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
        >
          <svg
            className="w-6 h-6 mr-2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#4285F4"
              d="M23.64 12.204c0-.804-.072-1.575-.204-2.319H12v4.388h6.367a5.448 5.448 0 01-2.37 3.577v2.973h3.827c2.244-2.064 3.52-5.112 3.52-8.62z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.965-1.068 7.953-2.897l-3.827-2.973c-1.065.714-2.43 1.134-4.126 1.134-3.172 0-5.864-2.144-6.825-5.02H1.187v3.146A11.998 11.998 0 0012 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.175 14.244a7.193 7.193 0 010-4.488V6.61H1.187a11.98 11.98 0 000 10.778l3.988-3.144z"
            />
            <path
              fill="#EA4335"
              d="M12 4.756c1.7 0 3.225.58 4.426 1.72l3.316-3.316C17.96 1.27 15.233 0 12 0 7.04 0 2.73 2.856 1.187 6.61l3.988 3.146C5.936 7.482 8.706 4.756 12 4.756z"
            />
          </svg>
          {googleLoading ? "সাইন-ইন করা হচ্ছে..." : "গুগল দিয়ে সাইন-ইন করুন"}
        </button>

        {error && (
          <p
            className="mt-4 text-center text-red-600 dark:text-red-400 font-medium"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          কোনো অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/registration"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            এখানে রেজিস্ট্রেশন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;