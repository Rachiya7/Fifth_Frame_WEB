import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = ({ scrollToContact }) => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem('authToken');

  // Function to get the user's profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get('http://localhost:3000/api/auth/profile', config);
        
        // Set the username from the response data
        setUsername(data.username);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Call the fetchUserProfile function when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to login page after logout
  };



  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Social Media Icons */}
        <a href="#" className="text-gray-600 hover:text-black">
          <i className="fab fa-instagram text-3xl"></i>
        </a>
        <a href="#" className="text-gray-600 hover:text-black">
          <i className="fab fa-twitter text-3xl"></i>
        </a>
      </div>

      {/* Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">FIFTH FRAME PHOTOGRAPHY</h1>
        <nav className="flex space-x-20 mt-5">
          <Link to="/" className="text-gray-600 hover:text-black">Home</Link>
          <Link to="/presets" className="text-gray-600 hover:text-black">Presets</Link>
          <Link to="/aboutUs" className="text-gray-600 hover:text-black">About Us</Link>
          <Link to="/magic" className="text-gray-600 hover:text-black">Magic</Link>
          <Link to="/contact" className="text-gray-600 hover:text-black">Contact Us</Link>
        </nav>
      </div>

      {/* Login/Logout and Welcome */}
      <div>
        {isLoggedIn ? (
          <>
            <span className="text-gray-600 mr-2">Welcome {username} /</span>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-gray-600 hover:text-black">Login</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
