import React, { useState, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
let photoProjects = [];

let count = 0;
export default function Slider({ image }) {
  photoProjects = [];
  image.forEach((item) => {
    photoProjects.push(item.image);
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const handleOnNextClick = () => {
    count = (count + 1) % photoProjects.length;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = photoProjects.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classList.add("fade-anim");
  };
  return (
    <div ref={slideRef} className="w-full select-none relative">
      <div className="aspect-w-16 aspect-h-9 w-96 h-90 p-5 mx-auto">
        <img src={photoProjects[currentIndex]} alt="" className="mx-auto max-w-full max-h-full " />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition" onClick={handleOnPrevClick}>
          <AiOutlineVerticalRight className="w-full" />
        </button>
        <button className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition" onClick={handleOnNextClick}>
          <AiOutlineVerticalLeft className="w-full" />
        </button>
      </div>
    </div>
  );
}
