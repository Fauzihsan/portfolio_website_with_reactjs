import React from "react";
import SideBar from "../../components/SideBar";
import DateTime from "../../components/DateTime";
import { MdTitle, MdImage, MdCategory, MdDescription, MdEdit, MdDelete } from "react-icons/md";
function PortfolioAdminPage() {
  return (
    <>
      <SideBar />
      <DateTime />
      <div className="mainAdmin lg:p-7 lg:text-xl text-xs mx-auto">
        <h1 className="titleAdmin">Portfolio</h1>
        <div className="py-5">
          <div className="overflow-x-auto w-full overflow-y-auto h-72">
            <table className="mx-auto w-full whitespace-normal rounded-lg bg-gray-200 divide-y divide-gray-300 overflow-hidden">
              <thead className="thead">
                <tr className="text-white text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4"> No </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Title </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Desciption </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Image </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Category </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Action </th>
                </tr>
              </thead>
              <tbody className="tbody divide-y divide-gray-200 align-top">
                <tr>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">1</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className=""> Rapat Persiapan UPRAK ASLABTIF 2022 </p>
                  </td>
                  <td className="px-6 py-4 text-center text-sm">
                    <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia praesentium ducimus, tempora in quo debitis earum reprehenderit et dicta at placeat? Magni modi perspiciatis cum, atque ipsam fugiat quis doloremque!</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <img src={require("../../assets/img/experience.JPG")} alt="" />{" "}
                  </td>
                  <td className="px-6 py-4">
                    <p className=""> Experience</p>
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center items-stretch">
                    <button className="hover:underline" type="button" data-modal-toggle="modal-update">
                      <MdEdit style={{ fontSize: "28px" }} />
                    </button>
                    <button className="hover:underline" type="button" data-modal-toggle="modal-delete">
                      <MdDelete style={{ fontSize: "28px", color: "red" }} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
              <label htmlFor="">Category</label>
              <div className="flex flex-row items-center">
                <MdCategory style={{ fontSize: "34px" }} />
                <select
                  name=""
                  id=""
                  className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
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
            <div className="flex flex-col gap-y-3 justify-start w-1/3">
              <label htmlFor="">Description</label>
              <div className="flex flex-row items-start">
                <MdDescription style={{ fontSize: "34px" }} />
                <textarea
                  name=""
                  className="form-control blockw-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-5 p-5 justify-center">
            <button className="btn-reset w-1/6 text-center py-2">Reset</button>
            <button className="btn-submit w-1/6 text-center py-2">Submit</button>
          </div>
        </form>
      </div>
      <div id="modal-update" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="headerModal flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
              <h3>Update Diary</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="modal-update">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
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
                    <label htmlFor="">Category</label>
                    <div className="flex flex-row items-center">
                      <MdCategory style={{ fontSize: "34px" }} />
                      <select
                        name=""
                        id=""
                        className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      >
                        <option value="" disabled>
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
                  <div className="flex flex-col gap-y-3 justify-start w-1/3">
                    <label htmlFor="">Description</label>
                    <div className="flex flex-row items-start">
                      <MdDescription style={{ fontSize: "34px" }} />
                      <textarea
                        name=""
                        className="form-control blockw-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id=""
                        cols="30"
                        rows="10"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button data-modal-toggle="modal-update" type="button" className="btn-submit w-1/6 text-center py-2">
                Update
              </button>
              <button data-modal-toggle="modal-update" type="button" className="btn-reset w-1/6 text-center py-2">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="modal-delete" tabindex="-1" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="modal-delete">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
              <button data-modal-toggle="modal-delete" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                Yes, I'm sure
              </button>
              <button
                data-modal-toggle="modal-delete"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PortfolioAdminPage;
