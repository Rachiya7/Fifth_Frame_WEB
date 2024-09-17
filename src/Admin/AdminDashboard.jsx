import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("messages");

  const renderContent = () => {
    switch (activeTab) {
      case "messages":
        return <Messages />;
      case "users":
        return <Users />;
      default:
        return <Messages />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md px-8 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition-all duration-200 ${
                activeTab === "messages" ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              Messages
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("users")}
              className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition-all duration-200 ${
                activeTab === "users" ? "bg-blue-600 text-white" : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              Users
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-grow p-8">{renderContent()}</div>
    </div>
  );
};


const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    // Fetch all messages from the API
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/messages'); // Adjust the URL as needed
        setMessages(response.data.messages); // Extract messages from the nested structure
        setFilteredMessages(response.data.messages); // Initialize filteredMessages
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch messages');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchMessages();
    }, []);
  
    useEffect(() => {
      // Filter messages based on search query
      const results = messages.filter(msg => {
        const name = msg.name || '';
        const email = msg.email || '';
        const message = msg.message || '';
        return (
          name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredMessages(results);
    }, [searchQuery, messages]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="mb-4">Here is the list of all messages.</p>
        
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name, email or message"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">ID</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Message</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 px-4 text-center text-gray-600">No messages found</td>
                </tr>
              ) : (
                filteredMessages.map(msg => (
                  <tr key={msg._id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-800">{msg._id}</td>
                    <td className="py-2 px-4 text-gray-800">{msg.name}</td>
                    <td className="py-2 px-4 text-gray-800">{msg.email}</td>
                    <td className="py-2 px-4 text-gray-800">{msg.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  




  const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    // Fetch all users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/getAll');
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filteredUsers
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    useEffect(() => {
      // Filter users based on search query
      const results = users.filter(user => {
        const username = user.username || '';
        const email = user.email || '';
        return (
          username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setFilteredUsers(results);
    }, [searchQuery, users]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <p className="mb-4">Here is the list of all users.</p>
        
        {/* Search input field */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">ID</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Username</th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-4 px-4 text-center text-gray-600">No users found</td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user._id} className="border-b border-gray-200">
                    <td className="py-2 px-4 text-gray-800">{user._id}</td>
                    <td className="py-2 px-4 text-gray-800">{user.username || 'N/A'}</td>
                    <td className="py-2 px-4 text-gray-800">{user.email || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  

export default AdminDashboard;
