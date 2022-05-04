import React from "react";

function Footer(props) {
  if (props.dark === "true") {
    return (
      <div className="footer text-center p-5 text-black bg-black">
        <p>© Copyright 2022 fauzihsan. All rights reserved.</p>
      </div>
    );
  } else {
    return (
      <div className="footer text-center p-5">
        <p>© Copyright 2022 fauzihsan. All rights reserved.</p>
      </div>
    );
  }
}

export default Footer;
