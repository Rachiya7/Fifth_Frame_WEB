import React from 'react';

const Snackbar = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-6 p-4 rounded-lg text-white ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} ${message ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      role="alert"
    >
      {message}
      <button
        onClick={onClose}
        className="absolute top-1 right-1 ml-2px text-lg font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default Snackbar;
