import React from "react";
import { useEffect } from "react";
import "../assets/css/portfolioPageStyle.css";
import ButtonBackToTop from "../components/ButtonBackToTop";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function PortfolioPage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="mainPortfolio">
      <div className="heroPortfolio">
        <NavBar />
        <div>
          <div className="grid lg:grid-cols-1 grid-cols-2 py-5 justify-center">
            <h1 className="titlePortfolio lg:mt-20 text-center lg:text-7xl text-3xl mx-auto my-auto" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
              Portfolio
            </h1>
            <p className="descriptionPortfolio lg:p-5 p-1 lg:w-10/12 text-center mx-auto my-auto lg:text-lg text-xs" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
              Below are some examples of recent project or Certification i have completed
            </p>
          </div>
        </div>
      </div>
      <div className="image">
        <img src={require("../assets/img/me2.jpg")} alt="" />
      </div>
      <div className="contentHeader">
        <div className="card-portfolio py-10 top-56 left-28" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div className="justify-center flex flex-row gap-x-1">
            <div className="p-5 gap-y-4 flex flex-col">
              <p className="aboutmeTitle text-center text-3xl">About Me</p>
              <p className="aboutmeDescription text-center">My name is Muhammad Ihsan Fauzi Rahman. I was born in Cianjur, October 15th, 2001 and i’m from West Java, Indonesia. I'm a software engineer</p>
            </div>
          </div>
          <button className="button-primary">Let's Journey</button>
        </div>
      </div>

      <div className="listPortfolio justify-center p-10 gap-20 flex flex-row flex-wrap">
        <div className="card-portfolio py-10" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div className="justify-center gap-x-1">
            <div className="p-5 gap-y-4 flex flex-col">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
              <p className="aboutmeTitle text-center text-2xl">Aplikasi Tournament</p>
              <p className="aboutmeDescription text-center">Teknologi yang digunakan adalah Flutter, PostgreSql, Rest API dengan Laravel,dll</p>
            </div>
          </div>
          <Link to="/portfolio/2">
            <button className="button-primary">Read More</button>
          </Link>
        </div>

        <div className="card-portfolio py-10">
          <div className="justify-center gap-x-1">
            <div className="p-5 gap-y-4 flex flex-col">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
              <p className="aboutmeTitle text-center text-2xl">Aplikasi Tournament</p>
              <p className="aboutmeDescription text-center">Teknologi yang digunakan adalah Flutter, PostgreSql, Rest API dengan Laravel,dll</p>
            </div>
          </div>
          <button className="button-primary">Read More</button>
        </div>

        <div className="card-portfolio py-10">
          <div className="justify-center gap-x-1">
            <div className="p-5 gap-y-4 flex flex-col">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
              <p className="aboutmeTitle text-center text-2xl">Aplikasi Tournament</p>
              <p className="aboutmeDescription text-center">Teknologi yang digunakan adalah Flutter, PostgreSql, Rest API dengan Laravel,dll</p>
            </div>
          </div>
          <button className="button-primary">Read More</button>
        </div>

        <div className="card-portfolio py-10">
          <div className="justify-center gap-x-1">
            <div className="p-5 gap-y-4 flex flex-col">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
              <p className="aboutmeTitle text-center text-2xl">Aplikasi Tournament</p>
              <p className="aboutmeDescription text-center">Teknologi yang digunakan adalah Flutter, PostgreSql, Rest API dengan Laravel,dll</p>
            </div>
          </div>
          <button className="button-primary">Read More</button>
        </div>
      </div>
      <ButtonBackToTop />
      <Footer dark="true" />
    </div>
  );
}

export default PortfolioPage;
