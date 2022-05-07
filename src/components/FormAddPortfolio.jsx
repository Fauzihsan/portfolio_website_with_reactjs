import React from "react";
import { MdTitle, MdImage, MdCategory, MdDescription } from "react-icons/md";

function FormAddPortfolio() {
  return (
    <div className="flex lg:flex-row flex-col gap-x-5 justify-center">
      <div className="flex flex-col gap-y-3 justify-start lg:w-1/2 w-full">
        <label htmlFor="">Title</label>
        <div className="flex flex-row items-center">
          <MdTitle style={{ fontSize: "34px" }} />
          <input
            type="text"
            className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="exampleInput7"
            placeholder="Title"
          />
        </div>
        <label htmlFor="">Category</label>
        <div className="flex flex-row items-center">
          <MdCategory style={{ fontSize: "34px" }} />
          <select name="" id="" className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <option value="" selected disabled>
              -- Pilih Kategori Portfolio --
            </option>
            <option value="">Skill</option>
            <option value="">Experience</option>
            <option value="">Programming</option>
            <option value="">Networking</option>
          </select>
        </div>
        <label htmlFor="">Foto</label>
        <div className="flex flex-row items-center">
          <MdImage style={{ fontSize: "34px" }} />
          <input type="file" name="" id="" className="border-2 p-1 text-sm w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-y-3 justify-start lg:w-1/3 w-full">
        <label htmlFor="">Description</label>
        <div className="flex flex-row items-start">
          <MdDescription style={{ fontSize: "34px" }} />
          <textarea
            name=""
            className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default FormAddPortfolio;
