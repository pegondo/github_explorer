"use client";

import { useEffect, useState } from "react";
import SpinnerIcon from "../../../public/icons/spinner";
import useDeviceType from "@/hooks/useDeviceType";

export type Props = {
  tooLongToLoadTime?: number;
};

const Loading = ({ tooLongToLoadTime }: Props) => {
  const [showConsiderLaptop, setShowConsiderLaptop] = useState(false);
  const { deviceType } = useDeviceType();
  const isMobile = deviceType === "mobile";

  useEffect(() => {
    if (!isMobile || !tooLongToLoadTime) return;

    setTimeout(() => {
      setShowConsiderLaptop(true);
    }, tooLongToLoadTime);
  }, [isMobile, tooLongToLoadTime]);

  return (
    <div className="pt-10 px-5 flex flex-col" data-testid="loading-component">
      <div className="flex justify-center" data-testid="loading-spinner">
        <SpinnerIcon width={40} height={40} />
      </div>
      <p className="flex justify-center" data-testid="loading-message">
        Loading
      </p>
      <p
        className="flex justify-center"
        data-testid="loading-consider-laptop-message"
        hidden={!showConsiderLaptop}
      >
        This page displays a lot of data, so switching to a laptop if it slows
        down your device.
      </p>
    </div>
  );
};

export default Loading;
