import React, { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { MdTitle, MdImage, MdCategory, MdDescription } from "react-icons/md";

import SideBar from "../../components/SideBar";
import DateTime from "../../components/DateTime";
import LoadingAnimation from "../../components/LoadingAnimation";
import ModalUpdatePortfolio from "../../components/ModalUpdatePortfolio";

import { GetPortfolioCategory, GetPortfolio, GetPortfolioById } from "../../graphql/query";
import { InsertPortfolio, DeletePortfolio, InsertImage } from "../../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";

import storage from "../../firebase";
import { deleteObject, getDownloadURL, uploadBytes, ref } from "firebase/storage";

import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

function PortfolioAdminPage() {
  const portfolio = {
    title: "",
    categories_id: 0,
    description: "",
  };

  const [modalDelete, setModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState(portfolio);
  const [image, setImage] = useState([]);

  const refImage = useRef();

  const { data: allPortfolio, error: errorFetchPortfolio, loading: loadingFetchPortfolio } = useQuery(GetPortfolio);
  const { data: dataPortfolioCategory } = useQuery(GetPortfolioCategory);
  const { data: dataPortfolioById } = useQuery(GetPortfolioById, { variables: { portfolio_id: idDelete } });

  const [insertPortfolio, { loading: loadingInsert }] = useMutation(InsertPortfolio, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Portfolio Inserted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetPortfolio],
  });
  const [insertImagePortfolio] = useMutation(InsertImage, { refetchQueries: [GetPortfolio] });
  const [deletePortfolio, { loading: loadingDelete }] = useMutation(DeletePortfolio, {
    onCompleted: () => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Portfolio Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    refetchQueries: [GetPortfolio],
  });

  const handleToggleModalDelete = (id, image) => {
    setModalDelete(!modalDelete);
    setIdDelete(id);
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "category") {
      let kategori = e.target.value;
      setData({ ...data, categories_id: parseInt(kategori) });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleFile = (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }
    setImage(images);
  };

  const handleUpload = (image) => {
    let portfolio_id = uuidv4();
    insertPortfolio({
      variables: {
        portfolio: {
          portfolio_id,
          title: data.title,
          description: data.description,
          categories_id: data.categories_id,
        },
      },
    });
    if (image === null) return;
    let uploadTask;
    for (let i = 0; i < image.length; i++) {
      let imageName = ref(storage, `portfolio/${image[i].name}`);
      uploadTask = uploadBytes(imageName, image[i]);
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload(image);
    setData(portfolio);
    setImage([]);
    refImage.current.value = "";
  };

  const handleDeletePortfolio = () => {
    deletePortfolio({
      variables: {
        portfolio_id: idDelete,
      },
    });

    for (let i = 0; i < dataPortfolioById?.portfolio[0].imagePortfolio.length; i++) {
      const fileUrl = dataPortfolioById?.portfolio[0].imagePortfolio[i].image;
      const fileRef = ref(storage, fileUrl);
      deleteObject(fileRef);
    }
    setModalDelete(!modalDelete);
  };

  if (loadingInsert) return <LoadingAnimation />;
  if (errorFetchPortfolio) {
    return console.log(`error! ${errorFetchPortfolio.message}`);
  }
  if (loadingFetchPortfolio || loadingDelete) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <SideBar />
      <DateTime />
      <div className="mainAdmin lg:p-7 px-5 lg:text-xl text-xs mx-auto">
        <h1 className="titleAdmin text-3xl text-center py-3">Portfolio</h1>
        <div className="py-5">
          <div className="overflow-x-auto w-full overflow-y-auto h-72">
            <table className="mx-auto w-full whitespace-normal rounded-lg bg-gray-200 divide-y divide-gray-300 overflow-hidden">
              <thead className="thead">
                <tr className="text-white text-left">
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Id </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Title </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Desciption </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Image </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Category </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Action </th>
                </tr>
              </thead>
              <tbody className="tbody divide-y divide-gray-200 align-top">
                {allPortfolio?.portfolio.map((item) => (
                  <tr key={item.portfolio_id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 text-xs">{item.portfolio_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="">{item.title}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <p className="">{item.description}</p>
                    </td>
                    <td className="px-6 py-4 text-center">{item.imagePortfolio !== [] ? <img src={item.imagePortfolio[0]?.image} alt="" /> : []}</td>
                    <td className="px-6 py-4">
                      {dataPortfolioCategory?.portfolio_category.map((category) =>
                        category.id === item.categories_id ? (
                          <p key={category.id} className="">
                            {category.name_category}
                          </p>
                        ) : (
                          []
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-center items-stretch">
                      <ModalUpdatePortfolio data={item} />
                      <button className="hover:underline" type="button" onClick={() => handleToggleModalDelete(item.portfolio_id, item.image)}>
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
                  name="title"
                  value={data.title}
                  onChange={handleOnChange}
                />
              </div>
              <label htmlFor="">Category</label>
              <div className="flex flex-row items-center">
                <MdCategory style={{ fontSize: "34px" }} />
                <select
                  name="category"
                  defaultValue={data.category}
                  onChange={handleOnChange}
                  id=""
                  className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option defaultValue="0" selected disabled>
                    -- Pilih Kategori Portfolio --
                  </option>
                  {dataPortfolioCategory?.portfolio_category.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name_category}
                    </option>
                  ))}
                </select>
              </div>
              <label htmlFor="">Foto</label>
              <div className="flex flex-row items-center">
                <MdImage style={{ fontSize: "34px" }} />
                <input type="file" name="imagePortfolio" ref={refImage} onChange={handleFile} id="" className="border-2 p-1 text-sm w-full" multiple />
              </div>
            </div>
            <div className="flex flex-col gap-y-3 justify-start lg:w-1/3 w-full">
              <label htmlFor="">Description</label>
              <div className="flex flex-row items-start">
                <MdDescription style={{ fontSize: "34px" }} />
                <textarea
                  name="description"
                  className="form-control block w-full px-3 py-1.5 h-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id=""
                  cols="30"
                  rows="10"
                  value={data.description}
                  onChange={handleOnChange}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-x-5 p-5 justify-center">
            <button type="reset" className="btn-reset lg:w-1/6 w-1/2 text-center py-2">
              Reset
            </button>
            <button type="submit" className="btn-submit lg:w-1/6 w-1/2 text-center py-2">
              Submit
            </button>
          </div>
        </form>
      </div>

      {modalDelete && (
        <div id="modal-delete" tabIndex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={() => setModalDelete(!modalDelete)}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <div className="p-6 text-center">
                <svg className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeletePortfolio}>
                  Yes, I'm sure
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setModalDelete(!modalDelete)}
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

export default PortfolioAdminPage;
