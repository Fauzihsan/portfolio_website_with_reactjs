import React from "react";
import { MdTitle, MdImage, MdPlace, MdDateRange, MdDescription } from "react-icons/md";

function FormAddDiary() {
  return (
    <form action="" className="formDiary container py-5">
      <div className="flex flex-row gap-x-5 justify-center">
        <div className="flex flex-col gap-y-3 justify-start w-1/2">
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
          <label htmlFor="">Foto</label>
          <div className="flex flex-row items-center">
            <MdImage style={{ fontSize: "34px" }} />
            <input type="file" name="" id="" className="border-2 p-1 text-sm w-full" />
          </div>
          <label htmlFor="">Place</label>
          <div className="flex flex-row items-center">
            <MdPlace style={{ fontSize: "34px" }} />
            <input
              type="text"
              className="w-full form-control blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleInput7"
              placeholder="Place"
            />
          </div>
          <label htmlFor="">Date</label>
          <div className="flex flex-row items-center">
            <MdDateRange style={{ fontSize: "34px" }} />
            <input
              type="date"
              name=""
              id=""
              className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-3 justify-start w-1/3">
          <label htmlFor="">Description</label>
          <div className="flex flex-row items-start">
            <MdDescription style={{ fontSize: "34px" }} />
            <textarea
              name=""
              className="form-control blockw-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id=""
              cols="30"
              rows="12"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-x-5 p-5 justify-center">
        <button className="btn-reset w-1/6 text-center py-2">Reset</button>
        <button className="btn-submit w-1/6 text-center py-2">Submit</button>
      </div>
    </form>
  );
}

export default FormAddDiary;
