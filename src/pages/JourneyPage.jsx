import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/journeyPageStyle.css";
import Footer from "../components/Footer";
import ButtonBackToTop from "../components/ButtonBackToTop";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function JourneyPage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="mainJourney">
      <div className="heroJourney">
        <NavBar dark="true" />
        <div className="flex flex-col lg:flex-row justify-center pt-56 items-center ">
          <div className="profilePictureJourney ">
            <img className="" src={require("../assets/img/me.jpg")} alt="" data-aos="fade-right" data-aos-delay="0" data-aos-duration="2000" />
          </div>
          <div className="p-5 gap-y-4 flex flex-col w-1/2">
            <p className="journeyTitle text-center text-4xl lg:text-8xl" data-aos="fade-down" data-aos-delay="500" data-aos-duration="2000">
              Journey
            </p>
            <p className="journeyDescription text-center" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000">
              Here, you will find out about Ihsan Fauzi's life journey, including his skills, experiences, and his daily activities
            </p>
          </div>
        </div>
        {/* <img src={require("../assets/img/bg-journey.png")} alt="" className="bg-journey" /> */}
        <div className="introJourney flex flex-row justify-center gap-20 p-20">
          <div className="w-1/2 descriptionJourney p-5" data-aos="fade-right" data-aos-delay="0" data-aos-duration="2000">
            <p>
              My name is Muhammad Ihsan Fauzi Rahman, usually called Ihsan. I have graduated from SMKN 1 Cianjur in 2019 as a Hardware and Network Engineer, now I am pursuing education at the Faculty of Informatics, Suryakancana University, I am very happy and like and have a passion in the field of
              Information and Technology (IT) so I continue my formal education in majoring in Informatics Engineering, in addition to complementing my skills as someone who has a passion in the IT field, I already have expertise in Hardware and Networking, so now I am studying in the field of
              Software engineer expertise. I am someone who can work as an individual or as a team, hardworking, honest, responsible, disciplined, enthusiastic, and always wants to learn something new.
            </p>
          </div>
          <div className="flex flex-col gap-y-10">
            <Link to="/diary" className="btn-journey" data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000">
              <button>Diary</button>
            </Link>
            <a href="#skills" className="btn-journey" data-aos="fade-left" data-aos-delay="1000" data-aos-duration="2000">
              <button>Skills</button>
            </a>

            <a href="#experiences" className="btn-journey" data-aos="fade-left" data-aos-delay="1500" data-aos-duration="2000">
              <button>Experience</button>
            </a>
          </div>
        </div>
      </div>
      <section id="skills" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
        <div className="w-1/2 justify-center text-center mx-auto text-3xl py-20">
          <h1 className="titleCategoryJourney">Skills</h1>
          <ul className="listCategoryJourney py-10">
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
            <li>React</li>
          </ul>
        </div>
      </section>
      <section id="experiences" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
        <div className="w-1/2 justify-center text-center mx-auto text-3xl py-20">
          <h1 className="titleCategoryJourney">Experience</h1>
          <ul className="listCategoryJourney py-10 text-lg">
            <li>"Divisi Teknis” at Informatics Engineering Laboratory Assistant Suryakancana University (2020 - 2021)"</li>
            <hr style={{ border: "1px solid #24507b" }} />
            <li>"Koordinator Teknis” at Informatics Engineering Laboratory Assistant Suryakancana University (2021 - 2022)"</li>
          </ul>
        </div>
      </section>
      <div className="w-1/2 justify-center text-center mx-auto text-3xl py-20" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
        <h1 className="titleCategoryJourney">Diary</h1>
        <Link to="/diary">
          <button className="button-to-diary w-1/2 mt-5 text-md">Click Here to Show Diary</button>
        </Link>
      </div>
      <ButtonBackToTop />
      <Footer dark="true" />
    </div>
  );
}

export default JourneyPage;
