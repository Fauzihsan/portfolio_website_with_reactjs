import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../assets/css/diaryPageStyle.css";
import ListStory from "../components/ListStory";
import ButtonBackToTop from "../components/ButtonBackToTop";
import Footer from "../components/Footer";

function DiaryPage() {
  return (
    <>
      <div className="container py-5 mx-auto">
        <Link to="/">
          <button className="p-3 hover:bg-gray-200">
            <FaArrowLeft style={{ color: "#24507b", fontSize: "24px" }} />
          </button>
        </Link>
        <h1 className="titleDiary text-7xl">Diary</h1>
        <p className="descriptionDiary lg:w-1/2 w-3/4 mx-auto">This is the page where Ihsan Fauzi wants to share his story with you, whether it's his activities or when he gets a certificate or certain award</p>
        <ListStory />
      </div>
      <ButtonBackToTop />
      <Footer dark="true" />
    </>
  );
}

export default DiaryPage;
