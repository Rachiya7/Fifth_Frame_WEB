import React, { useState } from 'react';
import axios from 'axios';
import loginImage from '../assets/images/9.jpg'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import Snackbar from './Snackbar'; // Ensure Snackbar component is correctly imported

const LoginComponent = () => {
  // State for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState(''); // 'success' or 'error'

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      // Handle successful login response
      console.log('Login successful:', response.data);

      // Store token in local storage
      localStorage.setItem('authToken', response.data.token);

      setSnackbarMessage('Login successful!');
      setSnackbarType('success');
      window.location.href='/'

      // Redirect or handle successful login as needed
    } catch (err) {
      // Handle error response
      setSnackbarMessage('Login failed. Please check your credentials and try again.');
      setSnackbarType('error');
      console.error('Login error:', err);
    } finally {
      // Hide snackbar after a few seconds
      setTimeout(() => setSnackbarMessage(''), 5000);
    }
  };

  return (
    <div className="flex min-h-screen mt-[100px]">
      {/* Image Section */}
      <div className="hidden md:flex w-[35%] h-[35%] items-center ml-[15%] justify-center bg-gray-100">
        <img src={loginImage} alt="Login" className="object-cover h-full w-full" />
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm bg-white rounded-lg w-[50%] h-[45%] shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mt-[50px] mb-6">LOGIN</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Snackbar Component */}
      <Snackbar 
        message={snackbarMessage} 
        type={snackbarType} 
        onClose={() => setSnackbarMessage('')} 
      />
    </div>
  );
};

export default LoginComponent;