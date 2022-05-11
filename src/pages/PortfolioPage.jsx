import React from "react";
import { useEffect } from "react";
import "../assets/css/portfolioPageStyle.css";
import ButtonBackToTop from "../components/ButtonBackToTop";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { GetPortfolio } from "../graphql/query";
import { useQuery } from "@apollo/client";
import PortfolioDetailPage from "./PortfolioDetailPage";

function PortfolioPage() {
  const { data } = useQuery(GetPortfolio);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="mainPortfolio">
      <div className="heroPortfolio lg:h-screen h-max bg-cover">
        <NavBar />
        <div>
          <div className="flex flex-col py-20 justify-center">
            <h1 className="titlePortfolio lg:mt-20 md:mt-15 text-center lg:text-7xl md:text-5xl text-3xl" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
              Portfolio
            </h1>
            <p className="descriptionPortfolio lg:p-5 md:p-5 p-1 lg:w-10/12 md:w-10/12 text-center mx-auto my-auto lg:text-lg md:text-lg text-xs" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
              Below are some examples of recent project or Certification i have completed
            </p>
          </div>
        </div>
      </div>
      <div className="image rounded-full lg:block hidden absolute">
        <img src={require("../assets/img/me2.jpg")} alt="" />
      </div>
      <div className="contentHeader py-5 md:py-20">
        <div className="card-portfolio lg:py-8 md:py-10 py-2 lg:top-52 md:top-32 top-20 lg:left-28 lg:w-2/5 w-3/4 lg:m-0 mx-auto " data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div className="justify-center flex flex-col ">
            <div className="image rounded-full lg:hidden">
              <img src={require("../assets/img/me2.jpg")} alt="" className="" />
            </div>
            <div className="p-10 flex flex-col">
              <p className="aboutmeTitle text-center lg:text-3xl md:text-3xl text-xl">About Me</p>
              <p className="aboutmeDescription text-center lg:text-lg md:text-lg text-xs">My name is Muhammad Ihsan Fauzi Rahman. I was born in Cianjur, October 15th, 2001 and i’m from West Java, Indonesia. I'm a software engineer</p>
            </div>
          </div>
          <Link to="/journey">
            <button className="btn-aboutme lg:w-1/3 md:w-1/3 lg:h-1/3 md:h-1/4 w-1/2 lg:text-xl md:text-xl text-xs">Let's Journey</button>
          </Link>
        </div>
      </div>

      <div className="listPortfolio justify-center lg:py-20 py-48 px-10 gap-20 flex flex-row flex-wrap">
        {data?.portfolio.map((item) => (
          <div key={item.id} className="card-portfolio py-10 lg:w-1/3 md:w-3/4 w-full" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
            <div className="justify-center gap-x-1">
              <div className="p-5 gap-y-4 flex flex-col">
                <img src={item.image} alt="" />
                <p className="aboutmeTitle text-center text-2xl">{item.title}</p>
                <p className="aboutmeDescription text-center">{item.description.slice(0, 50) + (item.description.length > 50 ? " ... " : "")}</p>
              </div>
            </div>
            <Link to={`/portfolio/${item.id}`}>
              <button className="btn-readmore lg:w-1/3 md:w-1/3 lg:h-max lg:py-3 md:py-3 w-1/2 lg:text-xl md:text-xl text-sm top-full">Read More</button>
            </Link>
          </div>
        ))}
      </div>
      <ButtonBackToTop />
      <Footer dark="true" />
    </div>
  );
}

export default PortfolioPage;
