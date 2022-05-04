import React from "react";
import { useEffect } from "react";
import DashboardListItem from "../../components/DashboardListItem";
import DateTime from "../../components/DateTime";
import SideBar from "../../components/SideBar";
import AOS from "aos";
import "aos/dist/aos.css";

function HomePage() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <SideBar />
      <DateTime />
      <div className="mainAdmin lg:p-7 lg:text-xl text-xs">
        <h1 className="titleAdmin">Welcome Admin, Home Page</h1>
        <DashboardListItem />
        <div className="flex flex-col justify-center text-center p-5 ">
          <img className="w-80 mx-auto  " src={require("../../assets/img/bgHomeAdmin.png")} alt="" />

          <p className="sumDashboardTitle text-center text-2xl" data-aos="fade-up" data-aos-delay="1500" data-aos-duration="2000">
            Until Now, you have <span className="font-bold">4</span> skills
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
