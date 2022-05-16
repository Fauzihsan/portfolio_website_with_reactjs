import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { MdTitle, MdImage, MdCategory, MdDescription } from "react-icons/md";

import { useQuery, useMutation } from "@apollo/client";
import { UpdatePortfolio, InsertImage, DeleteImage } from "../graphql/mutation";
import { GetPortfolioCategory, GetPortfolio, GetImagePortfolioById } from "../graphql/query";

import storage from "../firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import Swal from "sweetalert2";
import PortfolioAdminPage from "../pages/admin/PortfolioAdminPage";

function ModalUpdatePortfolio({ data }) {
  const { portfolio_id, title, categories_id, description } = data;

  const portfolioUpdate = {
    portfolio_id,
    title,
    categories_id,
    description,
  };

  const [modalUpdate, setModalUpdate] = useState(false);
  const [image, setImage] = useState([]);
  const [imageUpdate, setImageUpdate] = useState([]);
  const [dataUpdate, setDataUpdate] = useState(portfolioUpdate);
  const imageRef = useRef();

  const { data: dataPortfolioCategory } = useQuery(GetPortfolioCategory);
  const { data: dataImagePortfolio } = useQuery(GetImagePortfolioById, { variables: { portfolio_id } });

  const [insertImagePortfolio] = useMutation(InsertImage, { refetchQueries: [GetPortfolio] });

  const [updatePortfolio, { loading: loadingUpdate, error: errorUpdate }] = useMutation(UpdatePortfolio, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Portfolio Updated Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetPortfolio],
  });

  const [deleteImage] = useMutation(DeleteImage, { refetchQueries: [GetPortfolio] });

  const handleFile = (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }
    setImageUpdate(images);
  };

  const handleToggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };

  const handleUpload = (imageUpdate) => {
    console.log(imageUpdate);
    if (imageUpdate !== []) {
      updatePortfolio({
        variables: {
          portfolio_id,
          title: dataUpdate.title,
          categories_id: dataUpdate.categories_id,
          description: dataUpdate.description,
        },
      });
    } else {
      updatePortfolio({
        variables: {
          portfolio_id,
          title: dataUpdate.title,
          categories_id: dataUpdate.categories_id,
          description: dataUpdate.description,
        },
      });

      deleteImage({
        variables: {
          portfolio_id,
        },
      });
      let uploadTask;

      for (let i = 0; i < image.length; i++) {
        const fileUrl = image[i];
        const fileRef = ref(storage, fileUrl);
        deleteObject(fileRef);
      }

      for (let i = 0; i < imageUpdate.length; i++) {
        let imageName = ref(storage, `portfolio/${imageUpdate[i].name}`);
        uploadTask = uploadBytes(imageName, imageUpdate[i]);
        uploadTask.then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            insertImagePortfolio({
              variables: {
                images: {
                  portfolio_id,
                  image: downloadURL,
                },
              },
            });
          });
        });
      }
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
    setImageUpdate([]);
    imageRef.current.value = "";
  };

  {
    dataImagePortfolio?.image.map((item) => {
      image.push(item.image);
    });
  }

  if (loadingUpdate) return <PortfolioAdminPage />;
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
                <h3>Update Portfolio</h3>
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
                          type="text"
                          className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput7"
                          placeholder="Title"
                          name="title"
                          value={dataUpdate.title}
                          onChange={handleChange}
                        />
                      </div>
                      <label htmlFor="" className="text-left">
                        Category
                      </label>
                      <div className="flex flex-row items-center">
                        <MdCategory style={{ fontSize: "34px" }} />
                        <select
                          name="categories_id"
                          defaultValue={dataUpdate.categories_id}
                          onChange={handleChange}
                          id=""
                          className="form-control w-full block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        >
                          <option value="" disabled>
                            -- Pilih Kategori Portfolio --
                          </option>
                          {dataPortfolioCategory?.portfolio_category.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name_category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label htmlFor="" className="text-left">
                        Foto
                      </label>
                      <div className="flex flex-col items-center gap-y-3">
                        <div className="flex flex-row w-full items-center">
                          <div className="flex flex-row items-center">
                            <MdImage style={{ fontSize: "34px" }} />
                            <input type="file" name="imagePortfolio" ref={imageRef} onChange={handleFile} id="" className="border-2 p-1 text-sm w-full" multiple />
                          </div>
                        </div>
                        <div className="w-full mx-auto flex flex-row flex-wrap gap-x-5">
                          {dataImagePortfolio?.image.map((item) => (
                            <img key={item.id} src={item.image} alt="" className="w-1/5" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-3 justify-start lg:w-1/3 w-full">
                      <label htmlFor="" className="text-left">
                        Description
                      </label>
                      <div className="flex flex-row items-start">
                        <MdDescription style={{ fontSize: "34px" }} />
                        <textarea
                          name="description"
                          className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id=""
                          cols="30"
                          rows="10"
                          value={dataUpdate.description}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-x-5 p-5 justify-center">
                    <button onClick={handleToggleModalUpdate} className="btn-reset lg:w-1/6 w-1/2 text-center py-2">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit lg:w-1/6 w-1/2 text-center py-2">
                      Update
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

export default ModalUpdatePortfolio;
