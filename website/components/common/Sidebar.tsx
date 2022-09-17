import React from "react";
import { useWidth } from "../hooks/useWidth";

function Sidebar() {
  const width = useWidth();
  return (
    <div
      style={{
        height: "100vh",
        width: "20vw",
        minWidth: "350px",
        borderRight: "0.33px solid black",
        boxShadow: "4px 0 2px -1px #888",
      }}
    >
      hi
    </div>
  );
}

export default Sidebar;
