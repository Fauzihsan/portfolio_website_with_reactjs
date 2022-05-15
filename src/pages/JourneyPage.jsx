import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../assets/css/journeyPageStyle.css";
import Footer from "../components/Footer";
import ButtonBackToTop from "../components/ButtonBackToTop";
import { SubscriptionCountExperience, SubscriptionCountSkill } from "../graphql/subscription";
import { useSubscription } from "@apollo/client";
import AOS from "aos";
import "aos/dist/aos.css";

function JourneyPage() {
  const { data: dataPortfolioExperience } = useSubscription(SubscriptionCountExperience);
  const { data: dataPortfolioSkill } = useSubscription(SubscriptionCountSkill);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="mainJourney">
      <div className="heroJourney">
        <NavBar dark="true" />
        <div className="flex lg:flex-row flex-col justify-center lg:pt-56 pt-20 items-center ">
          <div className="profilePictureJourney " data-aos="fade-right" data-aos-delay="0" data-aos-duration="2000">
            <img className="" src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <div className="p-5 lg:gap-y-4 flex flex-col lg:w-1/2 w-full">
            <p className="journeyTitle text-center text-4xl md:text-6xl lg:text-8xl" data-aos="fade-down" data-aos-delay="500" data-aos-duration="2000">
              Journey
            </p>
            <p className="journeyDescription text-center md:text-3xl" data-aos="fade-up" data-aos-delay="1000" data-aos-duration="2000">
              Here, you will find out about Ihsan Fauzi's life journey, including his skills, experiences, and his daily activities
            </p>
          </div>
        </div>
        <div className="introJourney flex lg:flex-row flex-col-reverse justify-center gap-20 lg:p-20 p-5">
          <div className="lg:w-1/2 w-full descriptionJourney p-5 text-justify" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
            <p>
              My name is Muhammad Ihsan Fauzi Rahman, usually called Ihsan. I have graduated from SMKN 1 Cianjur in 2019 as a Hardware and Network Engineer, now I am pursuing education at the Faculty of Informatics, Suryakancana University, I am very happy and like and have a passion in the field of
              Information and Technology (IT) so I continue my formal education in majoring in Informatics Engineering, in addition to complementing my skills as someone who has a passion in the IT field, I already have expertise in Hardware and Networking, so now I am studying in the field of
              Software engineer expertise. I am someone who can work as an individual or as a team, hardworking, honest, responsible, disciplined, enthusiastic, and always wants to learn something new.
            </p>
          </div>
          <div className="flex flex-col gap-y-10 px-20">
            <Link to="/diary" className="btn-journey" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
              <button>Diary</button>
            </Link>
            <a href="#skills" className="btn-journey" data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000">
              <button>Skills</button>
            </a>

            <a href="#experiences" className="btn-journey" data-aos="fade-left" data-aos-delay="1000" data-aos-duration="2000">
              <button>Experience</button>
            </a>
          </div>
        </div>
      </div>
      <div className="pb-20 md:px-20">
        <section id="skills" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div className="lg:w-1/2 lg:mt-0 w-full p-5 justify-center text-center mx-auto text-3xl lg:py-20">
            <h1 className="titleCategoryJourney">Skills</h1>
            <ul className="listCategoryJourney py-10">
              {dataPortfolioSkill?.portfolio.map((item) => (
                <li key={item.portfolio_id}>{item.title}</li>
              ))}
            </ul>
          </div>
        </section>
        <section id="experiences" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div className="lg:w-1/2 w-full p-5 justify-center text-center mx-auto text-3xl lg:py-20">
            <h1 className="titleCategoryJourney">Experience</h1>
            <ul className="listCategoryJourney py-10 text-lg">
              {dataPortfolioExperience?.portfolio.map((item) => (
                <div key={item.portfolio_id}>
                  <li>{item.title}</li>
                  <hr style={{ border: "1px solid #24507b" }} />
                </div>
              ))}
            </ul>
          </div>
        </section>
        <div className="lg:w-1/2  w-full p-5 justify-center text-center mx-auto text-3xl lg:py-20" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <h1 className="titleCategoryJourney">Diary</h1>
          <Link to="/diary">
            <button className="button-to-diary lg:w-1/2 w-2/3 mt-5 lg:text-xl text-xs">Click Here to Show Diary</button>
          </Link>
        </div>
      </div>
      <ButtonBackToTop />
      <Footer dark="true" />
    </div>
  );
}

export default JourneyPage;
