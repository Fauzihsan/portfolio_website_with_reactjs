import React, { useState, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
const photoProjects = [
  "https://images.unsplash.com/photo-1519068737630-e5db30e12e42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1521386201167-03ddabe2af97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1490109875367-0dbd3c96fa1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
];

let count = 0;
export default function Slider() {
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
      <div className="aspect-w-16 aspect-h-9">
        <img src={photoProjects[currentIndex]} alt="" className="mx-auto" />
      </div>

      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition" onClick={handleOnPrevClick}>
          <AiOutlineVerticalRight size={30} />
        </button>
        <button className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition" onClick={handleOnNextClick}>
          <AiOutlineVerticalLeft size={30} />
        </button>
      </div>
    </div>
  );
}
