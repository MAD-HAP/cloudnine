import { useState, useEffect } from "react";

export const useWidth = () => {
  const [width, setWidth] = useState(4000);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  });

  return width;
};
