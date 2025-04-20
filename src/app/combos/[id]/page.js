"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

const ComboDetails = () => {
  const { id } = useParams();
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCombo = async () => {
      try {
        const res = await axios.get(`https://famdk-server.vercel.app/combos/${id}`);
        if (res.data.success) {
          setCombo(res.data.comboProduct); // Access the comboProduct object
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCombo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!combo) return <p>No product found</p>;

  // Calculate discounted price if applicable
  const discountedPrice = combo.discount > 0 ? combo.price - (combo.price * combo.discount) / 100 : combo.price;

  // WhatsApp message and phone number
  const whatsappPhoneNumber = "1234567890"; // Replace with your WhatsApp number
  const message = `Hello, I am interested in the ${combo.name}. Please provide more details.`; // Customize message

  // WhatsApp link
  const whatsappLink = `https://wa.me/${+8801976404704}?text=${encodeURIComponent(message)}`;

  return (
    <div className="max-w-screen-lg mx-auto mt-24 p-6 bg-white dark:bg-gray-900">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        {/* Combo Image */}
        <div className="rounded-lg overflow-hidden mb-6">
          {combo.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={`Combo Image ${i}`}
              width={600}
              height={400}
              className="object-cover w-full h-[400px]"
            />
          ))}
        </div>

        {/* Combo Information */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-violet-900">{combo.name}</h1>

          {combo.model && (
            <p className="text-violet-900 text-lg">Model: {combo.model}</p>
          )}

          {/* Combo Description */}
          {combo.description && (
            <p className="text-violet-900 text-base">{combo.description}</p>
          )}

          {/* Price and Discounted Price */}
          <div className="flex items-center">
            <p className="text-2xl font-semibold text-blue-600">৳ {combo.price}</p>

            {/* If there's a discount, strike-through original price and show discounted price */}
            {combo.discount > 0 && (
              <p className="text-lg font-bold text-red-500 ml-2 line-through">
                ৳ {combo.price}
              </p>
            )}
          </div>

          {/* Show the discounted price if available */}
          {combo.discount > 0 && (
            <p className="text-2xl font-bold text-green-500 mt-1">
              Discounted Price: <span className="font-semibold">৳ {discountedPrice}</span>
            </p>
          )}

          {/* Show discount percentage if available */}
          {combo.discount > 0 && (
            <p className="text-sm text-green-600 font-medium">
              Discount: <span className="font-semibold">{combo.discount}%</span>
            </p>
          )}

          {/* Order Now button linking to WhatsApp */}
          <div className="mt-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <span className="mr-2">Order Now</span>
              <div className="animate-bounce text-xl">🛒</div>
            </a>
          </div>
        </div>
      </div>

      {/* Cart Animation (Optional) */}
      <div className="text-center mt-10">
        <div className="animate-ping inline-block w-12 h-12 rounded-full bg-blue-600 text-white">
          <div className="w-full h-full rounded-full flex justify-center items-center">
            <div className="text-xl">🛒</div>
          </div>
        </div>
        <p className="mt-4 text-gray-600">Item added to cart</p>
      </div>
    </div>
  );
};

export default ComboDetails;
