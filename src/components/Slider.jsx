import React, { useState, useEffect } from "react";
import sec5Img1 from "../assets/images/1.jpg";
import sec5Img2 from "../assets/images/2.jpg";
import sec5Img3 from "../assets/images/3.jpg";
import sec5Img4 from "../assets/images/4.jpg";
import sec5Img5 from "../assets/images/5.jpg";
import sec5Img6 from "../assets/images/6.jpg";
import sec5Img7 from "../assets/images/7.jpg";

const images = [sec5Img1, sec5Img2, sec5Img3, sec5Img4, sec5Img5, sec5Img6, sec5Img7];

const SliderComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto flex justify-center items-center mt-[100px]">
      {/* <button
        className="absolute left-2 text-black bg-white p-2 rounded-full shadow-lg hover:bg-gray-300"
        onClick={prevSlide}
      >
        &#8592;
      </button> */}

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform ease-out duration-500"
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {/* Render images twice to create a seamless loop */}
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className={`w-1/3 flex-shrink-0 transition-all duration-500 ${
                index % images.length === currentIndex ? "scale-110" : "grayscale"
              }`}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <button
        className="absolute right-2 text-black bg-white p-2 rounded-full shadow-lg hover:bg-gray-300"
        onClick={nextSlide}
      >
        &#8594;
      </button> */}
    </div>
  );
};

export default SliderComponent;
