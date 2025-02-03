import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/signup', formData);
            alert('Signup successful! You can now login.');
            navigate('/');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message ?? 'Signup failed');
            } else {
                setError('An unexpected error occurred');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-sky-200 to-sky-400">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border rounded mb-4" required />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Sign Up</button>

                {/* Link to Login Page */}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log in here
                    </Link>
                </p>
            </form>
        </div>
    );
}
