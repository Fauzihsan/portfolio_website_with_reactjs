import React from "react";
import { useState } from "react";
import { UpdateDiary } from "../graphql/mutation";
import { GetDiary } from "../graphql/query";
import { MdEdit } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import storage from "../firebase";
import { MdTitle, MdImage, MdPlace, MdDescription } from "react-icons/md";
import Swal from "sweetalert2";

import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import LoadingAnimation from "./LoadingAnimation";
import DiaryAdminPage from "../pages/admin/DiaryAdminPage";

function ModalUpdateDiary({ data }) {
  const { id, title, image, place, description } = data;
  const diaryUpdate = {
    id,
    title,
    image,
    place,
    description,
  };
  const [modalUpdate, setModalUpdate] = useState(false);
  const [imageUpdate, setImageUpdate] = useState(null);
  const [dataUpdate, setDataUpdate] = useState(diaryUpdate);
  const imageRef = useRef();
  const [updateDiary, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UpdateDiary, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Diary Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetDiary],
  });

  const handleToggleModalUpdate = () => {
    // setDataUpdate({ id, title, image, place, description });
    setModalUpdate(!modalUpdate);
  };

  const handleUpload = (imageUpdate) => {
    if (!imageUpdate) {
      updateDiary({
        variables: {
          id: id,
          title: dataUpdate.title,
          image,
          place: dataUpdate.place,
          description: dataUpdate.description,
        },
      });
    } else {
      const imageName = ref(storage, `diarys/${imageUpdate.name}`);
      const uploadTask = uploadBytes(imageName, imageUpdate);

      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          const fileUrl = image;
          const fileRef = ref(storage, fileUrl);
          deleteObject(fileRef).then(() => {
            updateDiary({
              variables: {
                id: id,
                title: dataUpdate.title,
                place: dataUpdate.place,
                image: downloadURL,
                description: dataUpdate.description,
              },
            });
          });
        });
      });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "image") {
      setImageUpdate(e.target.files[0]);
    } else {
      setDataUpdate({ ...dataUpdate, [name]: value });
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    handleUpload(imageUpdate);
    setDataUpdate(dataUpdate);
    setModalUpdate(!modalUpdate);
    setImageUpdate(null);
    imageRef.current.value = "";
  };

  if (loadingUpdate) return <DiaryAdminPage />;
  if (errorUpdate) return console.log(`Error! : ${errorUpdate.message}`);

  return (
    <>
      <button className="hover:underline" type="button" onClick={handleToggleModalUpdate}>
        <MdEdit style={{ fontSize: "28px" }} />
      </button>
      {modalUpdate && (
        <div id="modal-update" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="headerModal flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3>Update Diary</h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleToggleModalUpdate}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form onSubmit={handleUpdate} className="formDiary container py-5">
                  <div className="flex lg:flex-row flex-col gap-x-5 justify-center">
                    <div className="flex flex-col gap-y-3 justify-start lg:w-1/2 w-full">
                      <label htmlFor="" className="text-left">
                        Title
                      </label>
                      <div className="flex flex-row items-center">
                        <MdTitle style={{ fontSize: "34px" }} />
                        <input
                          name="title"
                          value={dataUpdate.title}
                          onChange={handleChange}
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
                        <input type="file" ref={imageRef} onChange={handleChange} name="image" id="" className="border-2 p-1 text-sm w-1/2" />
                        <img src={image} alt="" className="w-1/3 mx-auto" />
                      </div>
                      <label htmlFor="" className="text-left">
                        Place
                      </label>
                      <div className="flex flex-row items-center">
                        <MdPlace style={{ fontSize: "34px" }} />
                        <input
                          name="place"
                          value={dataUpdate.place}
                          onChange={handleChange}
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
                          value={dataUpdate.description}
                          onChange={handleChange}
                          name="description"
                          className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id=""
                          cols="30"
                          rows="12"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-5 pt-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                    <button type="submit" className="btn-submit lg:w-1/6 w-1/2 text-center py-2">
                      Update
                    </button>
                    <button onClick={handleToggleModalUpdate} className="btn-reset lg:w-1/6 w-1/2 text-center py-2">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalUpdateDiary;
