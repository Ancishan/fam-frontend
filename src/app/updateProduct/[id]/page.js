"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://fam-backend-49mw.onrender.com/products/${id}`);
        setProduct(res.data.product);
        setFormData({
          name: res.data.product.name,
          model: res.data.product.model,
          price: res.data.product.price,
          image: res.data.product.image,
          description: res.data.product.description,
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://fam-backend-49mw.onrender.com/api/products/${id}`, formData);
      alert('Product updated successfully');
      router.push('/admin'); // Redirect to all products page
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='mt-6'>
      <h1 className='text-2xl font-bold mb-4'>Edit Product</h1>
      {product ? (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium'>Product Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='model' className='block text-sm font-medium'>Model</label>
            <input
              type='text'
              id='model'
              name='model'
              value={formData.model}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='price' className='block text-sm font-medium'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={formData.price}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='image' className='block text-sm font-medium'>Image URL</label>
            <input
              type='text'
              id='image'
              name='image'
              value={formData.image}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div>
            <label htmlFor='description' className='block text-sm font-medium'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
              rows='4'
              required
            ></textarea>
          </div>

          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
            Update Product
          </button>
        </form>
      ) : (
        <p className='text-red-500'>Product not found</p>
      )}
    </div>
  );
};

export default UpdateProductPage;
