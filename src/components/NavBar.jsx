import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <ul className="menu flex lg:text-2xl justify-center gap-x-9 mx-auto bg-transparent p-5 text-sm absolute">
      <li className="link">
        <Link to="/">Home</Link>
      </li>
      <li className="link">
        <Link to="/journey">About Journey</Link>
      </li>
      <li className="link">
        <Link to="/portfolio">Portfolio</Link>
      </li>
    </ul>
  );
}

export default NavBar;
