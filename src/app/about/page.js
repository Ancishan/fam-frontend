"use client";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="pt-20 px-4 md:px-10 lg:px-20 bg-gradient-to-tr from-blue-50 via-pink-50 to-blue-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 text-center mb-6">
          About FAM
        </h1>

        {/* Introduction */}
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center mb-10">
          Welcome to FAM —your one-stop destination for trendy fashion,
          top-quality products, and a seamless online shopping experience.
        </p>

        {/* 2-column grid section */}
        <div className="grid md:grid-cols-2 gap-10 items-center bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          {/* Responsive Image Section */}
          <div className="space-y-6">
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/ja.jpg"
                alt="About FAMShop 1"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
              <Image
                src="/jb.jpg"
                alt="About FAMShop 2"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Text content */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              At FAM, we believe fashion should be fun, affordable, and
              accessible to everyone. Our dedicated team curates a wide range of
              styles and brands to make sure you find something that fits your
              vibe. Whether you are looking for the latest arrivals or timeless
              classics, we have got you covered.
            </p>
          </div>
        </div>

        {/* Mission section */}
        <div className="mt-16 bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-base md:text-lg">
            We aim to empower people through fashion by providing high quality
            products and exceptional service. Our mission is to create an
            enjoyable, trustworthy, and personalized shopping experience for
            every customer.
          </p>
        </div>

        {/* CTA section */}
        <div className="mt-16 text-center bg-white/70 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
            Want to get in touch?
          </h2>
          <p className="text-gray-600 mb-4 text-base md:text-lg">
            Reach out to us via our{" "}
            <a href="/contact" className="text-blue-500 font-medium underline">
              Contact Us
            </a>{" "}
            page — we had love to hear from you!
          </p>
          <a
            href="/contact"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-950 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
