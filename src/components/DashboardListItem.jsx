import React from "react";
import { useEffect } from "react";
import "../assets/css/adminPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

function DashboardListItem() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="flex flex-row gap-x-10 justify-center">
      <div className="card-dashboard p-5" data-aos="fade-left" data-aos-delay="0" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center text-6xl font-bold">19</p>
            <p className="sumDashboardDescription text-center text-lg ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center text-2xl">Diarys</p>
        </div>
      </div>
      <div className="card-dashboard p-5" data-aos="fade-left" data-aos-delay="500" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center text-6xl font-bold">19</p>
            <p className="sumDashboardDescription text-center text-lg ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center text-2xl">Experiences</p>
        </div>
      </div>
      <div className="card-dashboard p-5" data-aos="fade-left" data-aos-delay="1000" data-aos-duration="2000">
        <div className="justify-center flex flex-col gap-y-5">
          <div className="flex flex-row justify-center items-end ">
            <p className="sumDashboardTitle text-center text-6xl font-bold">19</p>
            <p className="sumDashboardDescription text-center text-lg ">Post</p>
          </div>
          <p className="sumDashboardTitle text-center text-2xl">Projects</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardListItem;
