import React from "react";
import { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/css/landingPageStyle.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ButtonBackToTop from "../components/ButtonBackToTop";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="main">
      <div className="hero">
        <NavBar />
        <div className="flex flex-col p-5 justify-center">
          <h1 className="title text-center mt-20 lg:text-7xl text-3xl mx-auto " data-aos="fade-up" data-aos-delay="1500" data-aos-duration="2000">
            I's
            <br /> Journey
          </h1>
          <p className="description lg:p-5 p-1 lg:mt-10 mt-5 lg:w-96 text-center mx-auto lg:text-lg text-xs" data-aos="fade-up" data-aos-duration="2000">
            Here, you will find out about Ihsan Fauzi life journey in achieving his success
          </p>
        </div>
      </div>
      <p className="name lg:-mt-80 md:-mt-80 p-3 text-center lg:text-lg text-xs">Muhammad Ihsan Fauzi Rahman - West Java, Indonesia</p>
      <div className="card-dark lg:pt-10 lg:pb-10 py-5 lg:w-3/4 w-10/12 ">
        <div className="justify-center items-center flex lg:flex-row flex-col lg:gap-x-5 gap-y-5">
          <div className="profilePicture lg:w-1/3 rounded-full">
            <img src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <div className="lg:w-2/3 lg:py-5 px-5 gap-y-4 flex flex-col">
            <p className="profileTitle text-center lg:text-3xl text-xl">Hello everyone, i’m a Software Engineer especially Javascript Enthusiast</p>
            <p className="profileDescription text-center">"enthusiasm, consistency, and dedicated are the main keys to achieve success on your every journey",-</p>
          </div>
        </div>
        <div className="profileDescription w-full lg:text-lg text-xs p-5">
          <ul>
            <li className="flex gap-x-2 lg:p-2 py-2">
              <FaGithub style={{ fontSize: "24px" }} />
              <a href="https://github.com/Fauzihsan" target="_blank" rel="noopener noreferrer">
                github.com/fauzihsan/
              </a>
            </li>
            <li className="flex gap-x-2 lg:p-2 py-2">
              <FaLinkedin style={{ fontSize: "24px" }} />
              <a href="https://linkedin.com/in/fauzihsan/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/fauzihsan/
              </a>
            </li>
            <li className="flex gap-x-2 lg:p-2 py-2">
              <SiGmail style={{ fontSize: "24px" }} />
              <a href="mailto:muhammadihsan10.mifr@gmail.com" target="_blank" rel="noopener noreferrer">
                muhammadihsan10@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="content lg:my-auto mt-44 lg:py-64 py-32 flex flex-col gap-y-32">
        <div className="card-light lg:w-3/4 w-10/12 p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="flex lg:flex-row lg:gap-x-5 justify-center flex-col gap-y-5 items-center">
            <div className="picture w-1/3">
              <img src={require("../assets/img/experience.JPG")} alt="" />
            </div>
            <div className="lg:w-2/3 w-full lg:py-5 lg:gap-y-4 py-3 gap-y-3 flex flex-col">
              <p className="contentTitle text-center lg:text-5xl text-3xl ">Experience</p>
              <p className="contentQuotes text-center">"All experience is education for the soul.",-</p>
              <p className="contentDescription text-center">Here you will find out the work experience, internship, and organization of Ihsan Fauzi</p>
            </div>
          </div>
          <Link to="/journey">
            <button className="button-primary">Let's Journey</button>
          </Link>
        </div>

        <div className="card-light lg:w-3/4 w-10/12 p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="flex lg:flex-row lg:gap-x-5 justify-center flex-col gap-y-5 items-center">
            <div className="picture w-1/3">
              <img src={require("../assets/img/skills.jpg")} alt="" />
            </div>
            <div className="lg:w-2/3 w-full lg:py-5 lg:gap-y-4 py-3 gap-y-3 flex flex-col">
              <p className="contentTitle text-center lg:text-5xl text-3xl">Skills</p>
              <p className="contentQuotes text-center">"improve your skills if you want to see your parents smile",-</p>
              <p className="contentDescription text-center">Here you will find out about Ihsan Fauzi skills, such as networking skills, hardware skills, and of course software & programming skills</p>
            </div>
          </div>
          <Link to="/journey">
            <button className="button-primary">Let's Journey</button>
          </Link>
        </div>

        <div className="card-light lg:w-3/4 w-10/12 p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="flex lg:flex-row lg:gap-x-5 justify-center flex-col gap-y-5 items-center">
            <div className="picture w-1/3">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
            </div>
            <div className="lg:w-2/3 w-full lg:py-5 lg:gap-y-4 py-3 gap-y-3 flex flex-col">
              <p className="contentTitle text-center lg:text-5xl text-3xl">Portfolio</p>
              <p className="contentQuotes text-center">"Don't blame distractions, improve your focus",-</p>
              <p className="contentDescription text-center">Here you will find out about what Ihsan Fauzi has created</p>
            </div>
          </div>
          <Link to="/portfolio">
            <button className="button-primary">Let's Journey</button>
          </Link>
        </div>
      </div>
      <ButtonBackToTop />
      <Footer />
    </div>
  );
}

export default LandingPage;
