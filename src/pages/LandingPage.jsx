import React from "react";
import { useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/css/landingPageStyle.css";
import NavBar from "../components/NavBar";

function LandingPage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="main">
      <div className="hero">
        <NavBar />
        <div className="grid lg:grid-cols-1 grid-cols-2 p-5 justify-center">
          <h1 className="title lg:mt-20 text-center lg:text-7xl text-3xl mx-auto my-auto " data-aos="fade-up" data-aos-delay="1500" data-aos-duration="2000">
            I's
            <br /> Journey
          </h1>
          <p className="description lg:p-5 p-1 lg:mt-10 lg:w-96 text-center mx-auto my-auto lg:text-lg text-xs" data-aos="fade-up" data-aos-duration="2000">
            Here, you will find out about Ihsan Fauzi life journey in achieving his success
          </p>
        </div>
      </div>
      <p className="name lg:-mt-48 mt-5 text-center lg:text-lg text-xs">Muhammad Ihsan Fauzi Rahman - West Java, Indonesia</p>
      <div className="card-dark lg:pt-10 lg:pb-10 ">
        <div className="justify-center flex flex-row gap-x-5">
          <div className="profilePicture lg:basis-1/8 flex-initial">
            <img src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <div className="lg:basis-7/12 py-5 gap-y-4 flex flex-col">
            <p className="profileTitle text-center text-3xl">Hello everyone, i’m a Software Engineering especially Javascript Enthusiast</p>
            <p className="profileDescription text-center">"enthusiasm and consistency are the main keys to achieve success on your every journey",-</p>
          </div>
        </div>
        <div className="profileDescription basis-1/8">
          <ul>
            <li className="flex gap-x-2 p-2">
              <FaGithub style={{ fontSize: "24px" }} />
              <a href="https://github.com/Fauzihsan" target="_blank" rel="noopener noreferrer">
                github.com/fauzihsan/
              </a>
            </li>
            <li className="flex gap-x-2 p-2">
              <FaLinkedin style={{ fontSize: "24px" }} />{" "}
              <a href="https://linkedin.com/in/fauzihsan/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/fauzihsan/
              </a>
            </li>
            <li className="flex gap-x-2 p-2">
              <SiGmail style={{ fontSize: "24px" }} />{" "}
              <a href="mailto:muhammadihsan10.mifr@gmail.com" target="_blank" rel="noopener noreferrer">
                muhammadihsan10.mifr@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="content mt-72 py-64 flex flex-col gap-y-32">
        <div className="card-light p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="justify-center flex flex-row gap-x-5">
            <div className="picture basis-1/8">
              <img src={require("../assets/img/experience.JPG")} alt="" />
            </div>
            <div className="basis-7/12 py-5 gap-y-4 flex flex-col">
              <p className="contentTitle text-center lg:text-3xl">Experience</p>
              <p className="contentQuotes text-center">"All experience is education for the soul.",-</p>
              <p className="contentDescription text-center">Here you will find out the work experience, internship, and organization of Ihsan Fauzi</p>
            </div>
          </div>
          <button className="button-primary">Let's Journey</button>
        </div>

        <div className="card-light p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="justify-center flex flex-row gap-x-5">
            <div className="picture basis-1/8">
              <img src={require("../assets/img/skills.jpg")} alt="" />
            </div>
            <div className="basis-7/12 py-5 gap-y-4 flex flex-col">
              <p className="contentTitle text-center text-3xl">Skills</p>
              <p className="contentQuotes text-center">"improve your skills if you want to see your parents smile",-</p>
              <p className="contentDescription text-center">Here you will find out about Ihsan Fauzi skills, such as networking skills, hardware skills, and of course software & programming skills</p>
            </div>
          </div>
          <button className="button-primary">Let's Journey</button>
        </div>

        <div className="card-light p-10" data-aos="fade-up" data-aos-duration="2000">
          <div className="justify-center flex flex-row gap-x-5">
            <div className="picture basis-1/8">
              <img src={require("../assets/img/thumbnailPortfolio.png")} alt="" />
            </div>
            <div className="basis-7/12 py-5 gap-y-4 flex flex-col">
              <p className="contentTitle text-center text-3xl">Portfolio</p>
              <p className="contentQuotes text-center">"Don't blame distractions, improve your focus",-</p>
              <p className="contentDescription text-center">Here you will find out about what Ihsan Fauzi has created</p>
            </div>
          </div>
          <button className="button-primary">Let's Journey</button>
        </div>
      </div>
      <div className="footer text-center p-5">
        <p>© Copyright 2022 fauzihsan. All rights reserved.</p>
      </div>
    </div>
  );
}

export default LandingPage;
