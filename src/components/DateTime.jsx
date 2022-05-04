import React, { useEffect, useState } from "react";

function DateTime() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanUp() {
      clearInterval(timer);
    };
  });
  return (
    <div className="flex justify-end p-3">
      <h1 className="timestamp">
        {date.toLocaleDateString()} -- {date.toLocaleTimeString()}
      </h1>
    </div>
  );
}

export default DateTime;
