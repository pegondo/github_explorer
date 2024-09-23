import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

type Result = {
  deviceType: DeviceType;
  width: number;
};

const getDeviceType = (width: number): DeviceType => {
  switch (true) {
    case width < 768:
      return "mobile";
    case width < 1024:
      return "tablet";
    default:
      return "desktop";
  }
};

const useDeviceType = (): Result => {
  const [width, setWidth] = useState(window?.innerWidth);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return {
    deviceType: getDeviceType(width),
    width,
  };
};

export default useDeviceType;
