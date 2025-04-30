"use client";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    const whatsappNumber = "+8801622980679";
    const text = `Hello, I am ${name} (%0AEmail: ${email})%0A%0AMessage:%0A${message}`;
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${text}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="pt-20 px-4 md:px-10 lg:px-20 bg-gradient-to-tr from-blue-500 via-purple-400 to-pink-400 min-h-screen text-white">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-white text-center mb-6 drop-shadow-md">
          Contact Us
        </h1>

        {/* Info Section */}
        <div className="text-center mb-10 space-y-1">
          <p>
            <span className="font-medium text-white">Email:</span>{" "}
            dkg46742@gmail.com
          </p>
          <p>
            <span className="font-medium text-white">Phone:</span> 01622980679
          </p>
          <p>
            <span className="font-medium text-white">Location:</span>{" "}
            Chittagong, Bangladesh
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-white">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-pink-200 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-pink-200 focus:outline-none transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-white">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-white/50 bg-white/10 text-white placeholder-white rounded-lg focus:ring-2 focus:ring-pink-200 focus:outline-none transition duration-200 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-violet-900 hover:bg-pink-700 text-white py-2 rounded-lg transition duration-300 shadow-lg"
          >
            Send Message via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
