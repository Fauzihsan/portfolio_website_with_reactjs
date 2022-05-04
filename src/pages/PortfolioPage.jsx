import React from "react";
import "../assets/css/portfolioPageStyle.css";
import NavBar from "../components/NavBar";

function PortfolioPage() {
  return (
    <div className="mainPortfolio">
      <div className="heroPortfolio">
        <NavBar />
        <div>
          <div className="grid lg:grid-cols-1 grid-cols-2 p-5 justify-center">
            <h1 className="titlePortfolio lg:mt-20 text-center lg:text-7xl text-3xl mx-auto my-auto ">Portfolio</h1>
            <p className="descriptionPortfolio lg:p-5 p-1 lg:mt-10 lg:w-10/12 text-center mx-auto my-auto lg:text-lg text-xs">Below are some examples of recent project or Certification i have completed</p>
          </div>
        </div>
      </div>
      <div className="contentHeader"></div>
    </div>
  );
}

export default PortfolioPage;
