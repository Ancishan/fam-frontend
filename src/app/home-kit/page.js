"use client";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";

const HomeKit = () => {
  const { products } = useProducts();
  const homeKit = products.filter((p) => p.category === "home-kit");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-700">
        Home Kit Collection
      </h2>

      {homeKit.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {homeKit.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={224}
                className="w-full h-56 object-cover rounded"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{product.model}</p>
                <p className="text-pink-600 font-bold text-lg mb-2">
                  ৳ {product.price}
                </p>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeKit;
