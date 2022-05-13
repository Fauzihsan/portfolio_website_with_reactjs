import React from "react";
import { useEffect } from "react";
import "../assets/css/diaryPage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSubscription } from "@apollo/client";
import { SubscriptionDiary } from "../graphql/subscription";

function ListStory() {
  const { data } = useSubscription(SubscriptionDiary);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="card-story py-10 px-5 mx-auto mt-10 gap-y-5">
      {data?.diary.map((item) => (
        <div className="justify-center gap-x-1 border-b-2 hover:bg-gray-200 transition-all" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
          <div key={item.id} className="lg:p-5 p-2 gap-x-10 flex lg:flex-row flex-col justify-center items-center">
            <img src={item.image} alt="" className="lg:w-1/4 w-3/4 rounded-lg" />
            <div className="flex flex-col lg:w-1/2 w-full gap-y-2">
              <p className="titleStory lg:text-start text-center lg:text-2xl text-lg">{item.title}</p>
              <p className="dateplace lg:text-start text-center text-sm">{item.created_at}</p>
              <p className="dateplace lg:text-start text-center text-sm">{item.place}</p>
              <p className="descriptionStory text-justify">{item.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListStory;
