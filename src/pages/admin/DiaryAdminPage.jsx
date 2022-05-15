import React, { useRef } from "react";
import { useState } from "react";
import { MdTitle, MdImage, MdPlace, MdDescription, MdDelete } from "react-icons/md";

import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import storage from "../../firebase/index";

import { useQuery, useMutation } from "@apollo/client";
import { InsertDiary, DeleteDiary } from "../../graphql/mutation";
import { GetDiary } from "../../graphql/query";

import DateTime from "../../components/DateTime";
import SideBar from "../../components/SideBar";
import LoadingAnimation from "../../components/LoadingAnimation";
import ModalUpdateDiary from "../../components/ModalUpdateDiary";

import Swal from "sweetalert2";

function DiaryAdminPage() {
  const defaultDiary = {
    title: "",
    image: "",
    place: "",
    description: "",
  };

  const diary = {
    title: "",
    image: "",
    place: "",
    description: "",
  };

  const [data, setData] = useState(diary);
  const [idDelete, setIdDelete] = useState("");
  const [imageDelete, setImageDelete] = useState("");
  const [modalDelete, setModalDelete] = useState(false);
  const [image, setImage] = useState(null);

  const refImage = useRef();

  const { data: allDiary, error: errorFetchDiary, loading: loadingFetchDiary } = useQuery(GetDiary);
  const [insertDiary, { loading: loadingInsert }] = useMutation(InsertDiary, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Diary Inserted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetDiary],
  });
  const [deleteDiary, { loading: loadingDelete }] = useMutation(DeleteDiary, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Diary Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetDiary],
  });

  const handleToggleModalDelete = (id, image) => {
    setModalDelete(!modalDelete);
    setIdDelete(id);
    setImageDelete(image);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleUpload = (image) => {
    if (image === null) return;
    const imageName = ref(storage, `diarys/${image.name}`);
    const uploadTask = uploadBytes(imageName, image);

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        insertDiary({
          variables: {
            diary: {
              title: data.title,
              image: downloadURL,
              description: data.description,
              place: data.place,
            },
          },
        });
      });
    });
  };

  const handleDeleteDiary = () => {
    const fileUrl = imageDelete;
    const fileRef = ref(storage, fileUrl);
    deleteObject(fileRef).then(() => {
      deleteDiary({
        variables: {
          id: idDelete,
        },
      });
    });
    setModalDelete(!modalDelete);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload(image);
    setData(diary);
    setImage(null);
    refImage.current.value = "";
  };

  const handleReset = () => {
    setData(defaultDiary);
    setImage(null);
    refImage.current.value = "";
  };

  if (loadingInsert) return <LoadingAnimation />;
  if (errorFetchDiary) {
    return console.log(`error! ${errorFetchDiary.message}`);
  }
  if (loadingFetchDiary) {
    return <LoadingAnimation />;
  }
  if (loadingDelete) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <SideBar />
      <DateTime />
      <div className="mainAdmin lg:p-7 px-5 lg:text-xl text-xs mx-auto">
        <h1 className="titleAdmin text-3xl text-center py-3">Diary</h1>
        <div className="py-5">
          <div className="overflow-x-auto w-full overflow-y-auto h-72">
            <table className="mx-auto w-full whitespace-normal rounded-lg bg-gray-200 divide-y divide-gray-300 overflow-hidden">
              <thead className="thead">
                <tr className="text-white text-left">
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2"> Id </th>
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2"> Title </th>
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2 text-center"> Desciption </th>
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2 text-center"> Image </th>
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2 text-center"> Place & Date </th>
                  <th className="font-semibold text-sm uppercase lg:px-6 lg:py-4 px-4 py-2 text-center"> Action </th>
                </tr>
              </thead>
              <tbody className="tbody divide-y divide-gray-200 align-top">
                {allDiary?.diary.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">{item.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="">{item.title}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <p className="">{item.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <img src={item.image} alt="" className="w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <p className="">{item.place}</p>
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center items-stretch">
                      <ModalUpdateDiary data={item} />
                      <button className="hover:underline" type="button" onClick={() => handleToggleModalDelete(item.id, item.image)}>
                        <MdDelete style={{ fontSize: "28px", color: "red" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="formDiary container py-5">
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
                  required
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="">Foto</label>
              <div className="flex flex-row items-center">
                <MdImage style={{ fontSize: "34px" }} />
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  ref={refImage}
                  name="image"
                  id=""
                  className="border-2 p-1 text-sm w-full"
                  required
                />
              </div>
              <label htmlFor="">Place</label>
              <div className="flex flex-row items-center">
                <MdPlace style={{ fontSize: "34px" }} />
                <input
                  type="text"
                  className="w-full form-control blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInput7"
                  placeholder="Place"
                  name="place"
                  required
                  value={data.place}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-5 justify-start lg:w-1/3 w-full">
              <label htmlFor="">Description</label>
              <div className="flex flex-row items-start">
                <MdDescription style={{ fontSize: "34px" }} />
                <textarea
                  name="description"
                  className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id=""
                  cols="30"
                  rows="12"
                  required
                  value={data.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-5 p-5 justify-center">
            <button onClick={handleReset} className="btn-reset lg:w-1/6 w-1/2 text-center py-2">
              Reset
            </button>
            <button className="btn-submit lg:w-1/6 w-1/2 text-center py-2">Submit</button>
          </div>
        </form>
      </div>

      {modalDelete && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={handleToggleModalDelete}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeleteDiary}>
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={handleToggleModalDelete}
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DiaryAdminPage;
