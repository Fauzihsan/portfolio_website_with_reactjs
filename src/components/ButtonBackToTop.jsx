import React, { useEffect, useState } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";

function ButtonBackToTop() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => setScroll(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (scroll > 150) {
    return (
      <a href="#" className="fixed z-50 bottom-0 right-0 p-5 text-3xl opacity-50 hover:opacity-100 transition-all">
        <FaArrowAltCircleUp style={{ color: "#24507b" }} />
      </a>
    );
  } else {
    return <></>;
  }
}

export default ButtonBackToTop;
