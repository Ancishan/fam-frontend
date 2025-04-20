'use client';
import { useState } from 'react';

const Registration = () => {
  const [user, setUser] = useState({
    name: '',
    photo: null,
    phone: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setUser({ ...user, photo: files[0] });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!user.photo) {
      alert('Please select a profile photo');
      return;
    }

    // Upload image to imgbb
    const formData = new FormData();
    formData.append('image', user.photo);

    const res = await fetch('https://api.imgbb.com/1/upload?key=5baab7a9e1cdc65f0721a2b32aef61bb', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    const photoURL = data?.data?.url;

    if (!photoURL) {
      alert('Image upload failed!');
      return;
    }

    const fullUser = {
      name: user.name,
      photo: photoURL,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    console.log('📦 Sending user to backend:', fullUser);

    // Send user data to backend
    const response = await fetch('https://famdk-server.vercel.app/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fullUser),
    });

    const result = await response.json();
    if (response.ok) {
      alert('User registered successfully');
    } else {
      alert('Registration failed: ' + result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 space-y-5">
        <h2 className="text-2xl font-bold text-center text-pink-600">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered w-full"
            required
          />
          <input
            name="phone"
            type="text"
            placeholder="Mobile Number"
            value={user.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <a className="text-pink-500 hover:underline" href="/login">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
