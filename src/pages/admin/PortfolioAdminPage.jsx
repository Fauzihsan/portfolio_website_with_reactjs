import React, { useState, useRef } from "react";
import SideBar from "../../components/SideBar";
import DateTime from "../../components/DateTime";
import FormAddPortfolio from "../../components/FormAddPortfolio";
import LoadingAnimation from "../../components/LoadingAnimation";
import { MdEdit, MdDelete } from "react-icons/md";
import { MdTitle, MdImage, MdCategory, MdDescription } from "react-icons/md";
import { GetPortfolioCategory, GetPortfolio } from "../../graphql/query";
import { InsertPortfolio, DeletePortfolio } from "../../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import ModalUpdatePortfolio from "../../components/ModalUpdatePortfolio";
import storage from "../../firebase";
import { deleteObject, getDownloadURL, uploadBytes, ref } from "firebase/storage";
function PortfolioAdminPage() {
  const [modalUpdate, setModalUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleToggleModalUpdate = () => {
    setModalUpdate(!modalUpdate);
  };
  const handleToggleModalDelete = (id, image) => {
    setModalDelete(!modalDelete);
    setIdDelete(id);
    setImageDelete(image);
  };

  const { data: dataPortfolioCategory } = useQuery(GetPortfolioCategory);

  const [imageDelete, setImageDelete] = useState("");
  const [idDelete, setIdDelete] = useState("");
  const [deletePortfolio, { loading: loadingDelete }] = useMutation(DeletePortfolio, { refetchQueries: [GetPortfolio] });

  const portfolio = {
    title: "",
    categories_id: 0,
    description: "",
  };

  const [data, setData] = useState(portfolio);
  const refImage = useRef();

  const { data: allPortfolio, error: errorFetchPortfolio, loading: loadingFetchPortfolio } = useQuery(GetPortfolio);
  const [insertPortfolio, { loading: loadingInsert }] = useMutation(InsertPortfolio, { refetchQueries: [GetPortfolio] });
  const [image, setImage] = useState(null);
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
  const handleUpload = (image) => {
    if (image === null) return;
    const imageName = ref(storage, `portfolio/${image.name}`);
    const uploadTask = uploadBytes(imageName, image);

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        insertPortfolio({
          variables: {
            portfolio: {
              title: data.title,
              image: downloadURL,
              description: data.description,
              categories_id: data.categories_id,
            },
          },
        });
      });
    });
  };
  console.log(data);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpload(image);
    setData(portfolio);
    setImage(null);
    refImage.current.value = "";
  };

  const handleDeletePortfolio = () => {
    const fileUrl = imageDelete;
    const fileRef = ref(storage, fileUrl);
    deleteObject(fileRef).then(() => {
      deletePortfolio({
        variables: {
          id: idDelete,
        },
      });
    });
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
                  <th className="font-semibold text-sm uppercase px-6 py-4"> No </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4"> Title </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Desciption </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Image </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Category </th>
                  <th className="font-semibold text-sm uppercase px-6 py-4 text-center"> Action </th>
                </tr>
              </thead>
              <tbody className="tbody divide-y divide-gray-200 align-top">
                {allPortfolio?.portfolio.map((item) => (
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
                      <img src={item.image} alt="" />
                    </td>
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
              <label htmlFor="">Foto</label>
              <div className="flex flex-row items-center">
                <MdImage style={{ fontSize: "34px" }} />
                <input
                  type="file"
                  name="image"
                  ref={refImage}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                  id=""
                  className="border-2 p-1 text-sm w-full"
                />
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

      {modalUpdate && (
        <div id="modal-update-portfolio" tabindex="-1" className="flex items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
          <div className="relative mx-auto p-4 w-full max-w-4xl h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="headerModal flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                <h3>Update Portfolio</h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleToggleModalUpdate}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <form action="" className="formDiary container py-5">
                  <FormAddPortfolio />
                </form>
              </div>
              <div className="flex justify-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button type="button" className="btn-submit lg:w-1/6 w-1/2 text-center py-2">
                  Update
                </button>
                <button type="button" className="btn-reset lg:w-1/6 w-1/2 text-center py-2" onClick={handleToggleModalUpdate}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <button type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={handleDeletePortfolio}>
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

export default PortfolioAdminPage;
