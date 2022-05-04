import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa";

function PortfolioDetailPage() {
  const params = useParams();
  // return <h1>Portfolio Detail Page {params.portfolioId}</h1>;
  return (
    <>
      <div className="container py-5 mx-auto">
        <Link to="/portfolio">
          <button className="p-3 hover:bg-gray-200">
            <FaArrowLeft style={{ color: "#24507b", fontSize: "24px" }} />
          </button>
        </Link>
        <div className="card-story flex flex-col justify-center items-center py-10 px-5 mx-auto mt-10 gap-y-5">
          <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" className="w-1/4 rounded-lg" />

          <div className="flex flex-col w-1/2 gap-y-2">
            <p className="title-detail-portfolio text-center text-2xl">Aplikasi Tournament with Flutter & Rest API Laravel</p>
            <p className="category-detail-portfolio text-start text-sm">Programming</p>
            <p className="description-detail-portfolio text-justify">
              Menjadi pengisi acara di Acara Latihan Dasar Kepemimpinan Organisasi atau biasa dikenal LDKO, acara ini diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Suryakancana selama 2 Hari, selain menjadi pemateri, saya diberikan amanat juga untuk memperkenalkan
              Laboratorium Teknik Informatika kepada para Mahasiswa Baru
            </p>
          </div>
        </div>
      </div>
      <Footer dark="true" />
    </>
  );
}

export default PortfolioDetailPage;
