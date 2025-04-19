"use client"
// Make sure path is correct
import ProductCard from "@/component/product/ProductCard";
import useProducts from "@/hooks/useProducts";

const SportsItems = () => {
 const { products } = useProducts();
 const playerEdition = products.filter((p) => p.category === "sports");

 return (
  <div className="px-4 sm:px-6 lg:px-8 py-12">
  <h2 className="text-3xl font-bold text-center mb-8 text-pink-700">
   Sports Collection
  </h2>

  {playerEdition.length === 0 ? (
    <p className="text-center text-gray-500">No products found.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {playerEdition.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )}
</div>
 );
};

export default SportsItems;
