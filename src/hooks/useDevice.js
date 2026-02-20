import { useState, useEffect } from "react";

const useDevice = () => {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const thresholds = {
      phone: 750,
      m: 1400,
      l: 1920,
    };

    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= thresholds.phone) {
        setDevice("phone");
      } else if (width <= thresholds.m) {
        setDevice("m");
      } else if (width <= thresholds.l) {
        setDevice("l");
      } else {
        setDevice("xl");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [device]);

  return device;
};

export default useDevice;
