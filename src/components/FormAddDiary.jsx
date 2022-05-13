import React, { useRef } from "react";
import { MdTitle, MdImage, MdPlace, MdDescription } from "react-icons/md";

function FormAddDiary(props) {
  const { title, image, place, description } = props.data;
  const imageRef = useRef();
  return (
    <div className="flex lg:flex-row flex-col gap-x-5 justify-center">
      <div className="flex flex-col gap-y-3 justify-start lg:w-1/2 w-full">
        <label htmlFor="" className="text-left">
          Title
        </label>
        <div className="flex flex-row items-center">
          <MdTitle style={{ fontSize: "34px" }} />
          <input
            value={title}
            onChange={() => {}}
            type="text"
            className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="Title"
          />
        </div>
        <label htmlFor="" className="text-left">
          Foto
        </label>
        <div className="flex flex-row items-center">
          <MdImage style={{ fontSize: "34px" }} />
          <input type="file" ref={imageRef} onChange={() => {}} name="" id="" className="border-2 p-1 text-sm w-1/2" />
          <img src={image} alt="" className="w-1/3 mx-auto" />
        </div>
        <label htmlFor="" className="text-left">
          Place
        </label>
        <div className="flex flex-row items-center">
          <MdPlace style={{ fontSize: "34px" }} />
          <input
            value={place}
            onChange={() => {}}
            type="text"
            className="w-full form-control blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="Place"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-5 justify-start lg:w-1/3 w-full">
        <label htmlFor="" className="text-left">
          Description
        </label>
        <div className="flex flex-row items-start">
          <MdDescription style={{ fontSize: "34px" }} />
          <textarea
            value={description}
            onChange={() => {}}
            name=""
            className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id=""
            cols="30"
            rows="12"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default FormAddDiary;
