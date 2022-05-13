import React from "react";
import { useEffect } from "react";
import "../assets/css/adminPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

function DashboardListItem({ diary, experience, project }) {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="flex lg:flex-row flex-col lg:gap-x-10 gap-y-10 justify-center items-center">
      <div className="card-dashboard lg:w-1/3 w-1/2 p-5" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center lg:text-6xl text-4xl font-bold">{diary}</p>
            <p className="sumDashboardDescription text-center text-lg ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center lg:text-2xl text-lg">Diarys</p>
        </div>
      </div>
      <div className="card-dashboard lg:w-1/3 w-1/2 p-5" data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center lg:text-6xl text-4xl font-bold">{experience}</p>
            <p className="sumDashboardDescription text-center lg:text-lg text-sm ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center lg:text-2xl text-lg">Experiences</p>
        </div>
      </div>
      <div className="card-dashboard lg:w-1/3 w-1/2 p-5" data-aos="fade-left" data-aos-delay="1000" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center lg:text-6xl text-4xl font-bold">{project}</p>
            <p className="sumDashboardDescription text-center lg:text-lg text-sm ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center lg:text-2xl text-lg">Projects</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardListItem;
