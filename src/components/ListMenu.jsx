import React from "react";
import "../assets/css/adminPage.css";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { RiFileHistoryFill, RiLogoutBoxRLine } from "react-icons/ri";

function ListMenu() {
  return (
    <ul className="menuSideBar">
      <li className="liSide">
        <Link to="/admin" className="aSide">
          <div className="flex flex-row gap-x-5 px-5 justify-start">
            <FaHome style={{ fontSize: "24px" }} />
            Home
          </div>
        </Link>
      </li>
      <li className="liSide">
        <Link to="/admin/diary" className="aSide">
          <div className="flex flex-row gap-x-5 px-5 justify-start">
            <GiBookCover style={{ fontSize: "24px" }} />
            Diary
          </div>
        </Link>
      </li>
      <li className="liSide">
        <Link to="/admin/portfolio" className="aSide">
          <div className="flex flex-row gap-x-5 px-5 justify-start">
            <RiFileHistoryFill style={{ fontSize: "24px" }} />
            Portfolio
          </div>
        </Link>
      </li>
      <li className="liSide">
        <Link to="/" className="aSide">
          <div className="flex flex-row gap-x-5 px-5 justify-start">
            <RiLogoutBoxRLine style={{ fontSize: "24px" }} />
            Logout
          </div>
        </Link>
      </li>
    </ul>
  );
}

export default ListMenu;
