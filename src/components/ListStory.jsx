import React from "react";
import { useEffect } from "react";
import "../assets/css/diaryPage.css";
import AOS from "aos";
import "aos/dist/aos.css";

function ListStory() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="card-story py-10 px-5 mx-auto mt-10 gap-y-5">
      <div className="justify-center gap-x-1 border-b-2 hover:bg-gray-200 transition-all" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
        <div className="p-5 gap-x-10 flex flex-row justify-center">
          <img src={require("../assets/img/experience.JPG")} alt="" className="w-1/4 rounded-lg" />
          <div className="flex flex-col w-1/2 gap-y-2">
            <p className="titleStory text-start text-2xl">Pemateri (LDKO HIMATIF)</p>
            <p className="dateplace text-start text-sm">30 November 2022</p>
            <p className="dateplace text-start text-sm">Cipanas, Jawa Barat, Indonesia</p>
            <p className="descriptionStory text-justify">
              Menjadi pengisi acara di Acara Latihan Dasar Kepemimpinan Organisasi atau biasa dikenal LDKO, acara ini diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Suryakancana selama 2 Hari, selain menjadi pemateri, saya diberikan amanat juga untuk memperkenalkan
              Laboratorium Teknik Informatika kepada para Mahasiswa Baru
            </p>
          </div>
        </div>
      </div>

      <div className="justify-center gap-x-1 border-b-2" data-aos="zoom-in-up" data-aos-delay="0" data-aos-duration="2000">
        <div className="p-5 gap-x-10 flex flex-row justify-center">
          <img src={require("../assets/img/experience.JPG")} alt="" className="w-1/4 rounded-lg" />
          <div className="flex flex-col w-1/2 gap-y-2">
            <p className="titleStory text-start text-2xl">Pemateri (LDKO HIMATIF)</p>
            <p className="dateplace text-start text-sm">30 November 2022</p>
            <p className="dateplace text-start text-sm">Cipanas, Jawa Barat, Indonesia</p>
            <p className="descriptionStory text-justify">
              Menjadi pengisi acara di Acara Latihan Dasar Kepemimpinan Organisasi atau biasa dikenal LDKO, acara ini diselenggarakan oleh Himpunan Mahasiswa Teknik Informatika Universitas Suryakancana selama 2 Hari, selain menjadi pemateri, saya diberikan amanat juga untuk memperkenalkan
              Laboratorium Teknik Informatika kepada para Mahasiswa Baru
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListStory;
