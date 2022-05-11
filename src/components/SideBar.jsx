import React from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";
import "../assets/css/adminPage.css";
import ListMenu from "./ListMenu";

function SideBar() {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <FaBars id="btn" />
        <FaWindowClose className="w-8" id="cancel" />
      </label>

      <div className="sidebar">
        <header className="titleSideBar header">
          <div className="logo text-center mx-auto">
            <img className="" src={require("../assets/img/me.jpg")} alt="" />
          </div>
          <h2>I's Journey</h2>
        </header>

        <ul className="menuSideBar">
          <div>
            <ListMenu />
          </div>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
