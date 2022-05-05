import React from "react";

function Footer(props) {
  if (props.dark === "true") {
    return (
      <div className="footer text-center lg:p-5 md:p-2 p-3 text-sm text-black bg-black">
        <p>© Copyright 2022 fauzihsan. All rights reserved.</p>
      </div>
    );
  } else {
    return (
      <div className="footer text-center lg:p-5 md:p-2 p-3 text-sm">
        <p>© Copyright 2022 fauzihsan. All rights reserved.</p>
      </div>
    );
  }
}

export default Footer;
