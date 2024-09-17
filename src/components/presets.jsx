import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/images/8.jpg';
import checkIcon from '../assets/images/success.png'; // Ensure you have an appropriate tick image

const presets = [
  {
    id: 1,
    image: image1,
    title: "Bright & Airy Preset",
    description: "Enhance your photos with a clean, bright",
    price: "$15.00",
  },
  {
    id: 2,
    image: image1,
    title: "Moody Preset",
    description: "Give your images a deep, dramatic feel.",
    price: "$15.00",
  },
  {
    id: 3,
    image: image1,
    title: "Warm Vintage Preset",
    description: "Capture the essence of vintage warmth.",
    price: "$15.00",
  },
  {
    id: 4,
    image: image1,
    title: "Black & White Preset",
    description: "Create stunning black and white",
    price: "$15.00",
  },
  {
    id: 5,
    image: image1,
    title: "Cool Blue Preset",
    description: "Add a cool, calming tint to your images.",
    price: "$15.00",
  },
];

const PresetsPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBuyNow = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Redirect to login page if no token
      navigate('/login');
    } else {
      // Show success popup
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Hide popup after 3 seconds
    }
  };

  return (
    <div>
      {/* Main Content: Presets Section */}
      <main className="p-10 ml-[20px]">
        <section id="presets">
          <h1 className="text-4xl text-center font-bold mb-6">Photography Presets for Sale</h1>
          <div className="overflow-x-auto mt-[100px]">
            <div className="flex space-x-7">
              {presets.map((preset) => (
                <div
                  key={preset.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden flex-none w-80 transition-transform transform hover:scale-105 hover:shadow-xl"
                >
                  <img src={preset.image} alt={preset.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold text-center mb-2">{preset.title}</h2>
                    <p className="text-gray-700 text-center mb-4">{preset.description}</p>
                    <p className="text-lg font-semibold text-center mb-4">{preset.price}</p>
                    <div className="flex justify-center">
                      <button
                        onClick={handleBuyNow}
                        className="bg-black text-white px-4 py-2 rounded transition-colors hover:bg-gray-800"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-12 rounded-lg shadow-lg text-center w-96 h-60">
            <img src={checkIcon} alt="Success" className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Success</h2>
            <p className="text-lg">Your purchase was successful!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresetsPage;
