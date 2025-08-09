"use client";

const ProductReceivePolicy = () => {
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        প্রডাক্ট রিসিভ পলিসি 📦
      </h2>
      <ul className="space-y-3 text-gray-800 text-[17px] leading-relaxed">
        <li>
          ✅ প্রডাক্ট হাতে পাওয়ার পর অবশ্যই <strong>বাড়িতে এসে Unboxing</strong> করবেন যাতে প্রোডাক্টে কোন দাগ বা স্ক্র্যাচ না পড়ে।
        </li>
        <li>
          ✅ অবশ্যই <strong>Unboxing ভিডিও</strong> করবেন এবং ভিডিও চলাকালেই প্রোডাক্ট চেক করবেন।
        </li>
        <li>
          ✅ যদি প্রডাক্টে কোন সমস্যা বা নষ্ট থাকে, ভিডিও প্রমাণসহ <strong>প্রডাক্ট পরিবর্তন</strong> করে দেয়া হবে।
        </li>
        <li>
          ✅ ২/৩ দিনের মধ্যে হোম ডেলিভারি করা হয়।
        </li>
        <li>
          ✅  অগ্রীম ডেলিভারি চার্জ নেওয়া হয় ।
        </li>
        <li className="text-red-600 font-medium">
          ❌ যদি <strong>Unboxing ভিডিও না</strong> করেন এবং পরবর্তীতে প্রডাক্ট নষ্ট বের হয়, তাহলে <strong>রিপ্লেসমেন্ট গ্রহণযোগ্য হবে না</strong>।
        </li>
      </ul>
      <p className="mt-6 text-right text-indigo-600 font-semibold">
        - DK Gadget's Hub 😊
      </p>
    </div>
  );
};

export default ProductReceivePolicy;
