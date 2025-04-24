"use client";
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const UpdateProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUploading, setImageUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    price: '',
    image: '',
    description: '',
    discount: '',
    category: '',
  });

  const categories = [
    { value: "sports", label: "Sports Item" },
    { value: "retro", label: "Retro Collection" },
    { value: "home-kit", label: "Home Kit Collection" },
    { value: "player-edition", label: "Player Edition" },
    { value: "football-boots", label: "Football-Boots" },
    { value: "none", label: "None" },
  ];

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data.product);
        setFormData({
          name: res.data.product.name,
          model: res.data.product.model,
          price: res.data.product.price,
          image: res.data.product.image,
          description: res.data.product.description,
          discount: res.data.product.discount || '',
          category: res.data.product.category || '',
        });
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    const formDataImage = new FormData();
    formDataImage.append('image', imageFile);

    setImageUploading(true);
    try {
      // Replace this with your actual ImgBB API key
      const res = await axios.post('https://api.imgbb.com/1/upload?key=5baab7a9e1cdc65f0721a2b32aef61bb', formDataImage);
      const imageUrl = res.data.data.url;

      setFormData((prevData) => ({
        ...prevData,
        image: imageUrl,
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Image upload failed');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, formData);
      alert('Product updated successfully');
      router.push('/admin');
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='mt-6 max-w-xl mx-auto'>
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
            <label htmlFor='discount' className='block text-sm font-medium'>Discount (%)</label>
            <input
              type='number'
              id='discount'
              name='discount'
              value={formData.discount}
              onChange={handleChange}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>

          <div>
            <label htmlFor='category' className='block text-sm font-medium'>Category</label>
            <select
              id='category'
              name='category'
              value={formData.category}
              onChange={handleChange}
              className='w-full p-2 border text-pink-900 border-gray-300 rounded'
              required
            >
              <option value=''>Select Category</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='image' className='block text-sm font-medium'>Upload Image</label>
            <input
              type='file'
              id='image'
              accept='image/*'
              onChange={handleImageUpload}
              className='w-full p-2 border border-gray-300 rounded'
            />
            {imageUploading && <p className="text-blue-500 text-sm mt-1">Uploading...</p>}
            {formData.image && !imageUploading && (
              <Image
                src={formData.image}
                alt="Uploaded"
                width={128}
                height={128}
                className="rounded object-cover"
              />
            )}
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

          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            disabled={imageUploading}
          >
            {imageUploading ? 'Uploading Image...' : 'Update Product'}
          </button>
        </form>
      ) : (
        <p className='text-red-500'>Product not found</p>
      )}
    </div>
  );
};

export default UpdateProductPage;
