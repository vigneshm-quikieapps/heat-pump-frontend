import React from "react";

function deviceNotSupported() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundImage: "linear-gradient(to bottom, #f4f2ea 0%, #d9d6c9 100%)",
      }}
    >
      deviceNotSupported
    </div>
  );
}

export default deviceNotSupported;
