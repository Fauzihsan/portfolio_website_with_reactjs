import React from "react";
import "../assets/css/adminPageStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { RiFileHistoryFill, RiLogoutBoxRLine } from "react-icons/ri";
import { loginStatus } from "../utils/helpers/loginStatus";
import Swal from "sweetalert2";

function ListMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#24507b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        loginStatus.setLogout(navigate);
      }
    });
  };

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
        <Link to="/admin/portfolio" className="aSide ">
          <div className="flex flex-row gap-x-5 px-5 justify-start">
            <RiFileHistoryFill style={{ fontSize: "24px" }} />
            Portfolio
          </div>
        </Link>
      </li>
      <li className="liSide">
        <div onClick={handleLogout} className="aSide cursor-pointer">
          <div className="flex flex-row gap-x-5 px-5 justify-start w-full">
            <RiLogoutBoxRLine style={{ fontSize: "24px" }} />
            Logout
          </div>
        </div>
      </li>
    </ul>
  );
}

export default ListMenu;
