import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      localStorage.setItem('token', response.data.access_token);
      console.log("🟢 Login successful, redirecting to dashboard...");
      navigate('/dashboard', { replace: true }); // ✅ Redirect to Dashboard
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? 'Invalid email or password');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };
  return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-200 to-sky-400">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border rounded" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login</button>

          {/* Link to Sign-Up Page */}
          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
  );
}
