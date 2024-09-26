import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { fireEvent, renderHook, waitFor } from "@testing-library/react";
import useDeviceType from "./useDeviceType";

describe("useDeviceType", () => {
  const setup = () => renderHook(() => useDeviceType());

  const defaultWidth = 1920;
  const mockWindowWidth = (width: number | undefined) => {
    window.innerWidth = width as number;
  };

  it("should return the default width and desktop if the window width is the default one", async () => {
    mockWindowWidth(defaultWidth);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.width).toBe(defaultWidth);
      expect(result.current.deviceType).toBe("desktop");
    });
  });

  it("should return undefined and dektop if the window width isn't set", async () => {
    mockWindowWidth(undefined);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.width).toBeUndefined();
      expect(result.current.deviceType).toBe("desktop");
    });
  });

  it("should return 1000 and tablet if the window width is set to 1000", async () => {
    mockWindowWidth(1000);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.width).toBe(1000);
      expect(result.current.deviceType).toBe("tablet");
    });
  });

  it("should return 500 and mobile if the window width is set to 500", async () => {
    mockWindowWidth(500);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.width).toBe(500);
      expect(result.current.deviceType).toBe("mobile");
    });
  });

  it("should modify the width from 1000 to 500 and the device type from tablet to mobile if the resize event triggers from 1000 to 500", async () => {
    mockWindowWidth(1000);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.width).toBe(1000);
      expect(result.current.deviceType).toBe("tablet");
    });

    // Trigger the resize
    mockWindowWidth(500);
    fireEvent(window, new Event("resize"));

    await waitFor(() => {
      expect(result.current.width).toBe(500);
      expect(result.current.deviceType).toBe("mobile");
    });
  });
});
