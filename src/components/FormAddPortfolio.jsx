import React, { useRef, useState } from "react";
import { MdTitle, MdImage, MdCategory, MdDescription } from "react-icons/md";
import { GetPortfolioCategory } from "../graphql/query";
import { InsertPortfolio } from "../graphql/mutation";
import { useMutation, useQuery } from "@apollo/client";
import storage from "../firebase";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import LoadingAnimation from "./LoadingAnimation";

function FormAddPortfolio() {
  const portfolio = {
    title: "",
    category_id: "0",
    foto: "",
    description: "",
  };
  const { data: dataPortfolioCategory } = useQuery(GetPortfolioCategory);
  const [insertPortfolio, { loading: loadingInsert, error: errorInsert }] = useMutation(InsertPortfolio);

  const [dataPortfolio, setDataPortfolio] = useState(portfolio);
  const [image, setImage] = useState(null);
  const fotoRef = useRef();
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "foto") {
      setImage(e.target.files[0]);
    } else {
      setDataPortfolio({ ...dataPortfolio, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image === null) return;
    const fotoName = ref(storage, `portfolio/${image.name}`);
    const uploadTask = uploadBytes(fotoName, image);

    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        insertPortfolio({
          variables: {
            portfolio: {
              title: dataPortfolio.title,
              description: dataPortfolio.description,
              categories_id: dataPortfolio.category_id,
              image: downloadUrl,
            },
          },
        });
      });
    });
    setDataPortfolio(portfolio);
    setImage(null);
    fotoRef.current.value = "";
  };
  console.log(dataPortfolio);
  if (loadingInsert) return <LoadingAnimation />;
  if (errorInsert) return console.log(`Error : ${errorInsert.message}`);
  return (
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
              value={dataPortfolio.title}
              onChange={handleOnChange}
            />
          </div>
          <label htmlFor="">Category</label>
          <div className="flex flex-row items-center">
            <MdCategory style={{ fontSize: "34px" }} />
            <select
              name="category"
              defaultValue={dataPortfolio.category}
              onChange={handleOnChange}
              id=""
              className="form-control w-full blockw-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            >
              <option defaultValue="0" disabled>
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
            <input type="file" name="foto" ref={fotoRef} onChange={handleOnChange} id="" className="border-2 p-1 text-sm w-full" />
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
              value={dataPortfolio.description}
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
  );
}

export default FormAddPortfolio;
