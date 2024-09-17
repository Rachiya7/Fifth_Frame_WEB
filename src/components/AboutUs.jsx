import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 px-6 md:px-12 bg-white min-h-screen flex flex-col items-center">
      <div className="relative max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6 text-center mt-[50px]">About Us</h1>
        <p className="text-lg mb-8 mt-[50px]">
          We are a passionate team dedicated to capturing the beauty of the world through the lens of our cameras.
          Our mission is to provide high-quality photography presets that help you bring your creative vision to life.
          With a focus on detail and a commitment to excellence, we strive to offer products that enhance your
          photography experience and make every moment unforgettable.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-[40px]">
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-2">Our Vision</h2>
            <p className="text-center">
              We envision a world where every photo tells a story and every moment is captured with precision and beauty.
            </p>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 text-center p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              Our mission is to empower photographers with tools that enhance their creativity and bring their unique
              visions to life.
            </p>
          </div>
        </div>

        {/* Additional Information Sections */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-[40px]">
          <div className="w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-2">Our Expertise</h2>
            <p className="text-center">
              Our team consists of seasoned photographers who specialize in various styles, from portrait and landscape to architectural photography.
            </p>
          </div>
          <div className="w-full md:w-1/2 bg-gray-100 text-center p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-2">Our Process</h2>
            <p>
              We meticulously design each preset to ensure it meets the highest standards of quality and enhances the visual appeal of every photograph.
            </p>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default AboutUs;
