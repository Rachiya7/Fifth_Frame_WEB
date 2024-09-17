import React, { useState } from 'react';
import axios from 'axios';
import registerImage from '../assets/images/9.jpg'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import Snackbar from './Snackbar'; // Import Snackbar component

const RegisterComponent = () => {
  // State for form inputs and error handling
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState(''); // 'success' or 'error'

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setSnackbarMessage('Passwords do not match.');
      setSnackbarType('error');
      return;
    }

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        username,
        email,
        password,
      });

      // Handle successful registration response
      setSuccess('Registration successful! Please log in.');
      setError('');
      setSnackbarMessage('Registration successful! Please log in.');
      setSnackbarType('success');

      // Reset form fields
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Handle error response
      setError('Registration failed. Please try again.');
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarType('error');
      console.error('Registration error:', err);
    } finally {
      // Hide snackbar after a few seconds
      setTimeout(() => setSnackbarMessage(''), 5000);
    }
  };

  return (
    <div className="flex min-h-screen mt-[100px]">
      {/* Image Section */}
      <div className="hidden md:flex w-[35%] h-[35%] items-center ml-[15%] justify-center bg-gray-100">
        <img src={registerImage} alt="Register" className="object-cover h-full w-full" />
      </div>

      {/* Registration Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm bg-white rounded-lg w-[50%] h-[60%] shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mt-[50px] mb-6">REGISTER</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your username"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm">
              Do you have an account already?{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
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

export default RegisterComponent;
