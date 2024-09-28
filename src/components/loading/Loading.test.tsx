import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import Loading, { Props as LoadingProps } from "./Loading";

// Mock useDeviceType
import * as useDeviceType from "@/hooks/useDeviceType";
jest.mock("@/hooks/useDeviceType");
const useDeviceTypeMock = useDeviceType.default as jest.Mock;

describe("<Loading />", () => {
  const defaultLoadingProps: LoadingProps = {
    tooLongToLoadTime: undefined,
  };
  const setup = (props: LoadingProps = defaultLoadingProps) => {
    render(<Loading {...props} />);

    const element = screen.getByTestId("loading-component");
    const spinner = screen.getByTestId("loading-spinner");
    const message = screen.getByTestId("loading-message");
    const considerLaptop = screen.queryByTestId(
      "loading-consider-laptop-message"
    );

    return { element, spinner, message, considerLaptop };
  };

  const mockUseDeviceType = (isMobile: boolean = false) => {
    useDeviceTypeMock.mockReturnValue({
      deviceType: isMobile ? "mobile" : "desktop",
      width: 1920,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    mockUseDeviceType();

    const { element } = setup();

    expect(element).toBeInTheDocument();
  });

  it("should render the loading spinner and the loading message", () => {
    mockUseDeviceType();

    const { spinner, message } = setup();

    expect(spinner).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("should show the consider laptop message when rendered for some time in a mobile device", async () => {
    mockUseDeviceType(true);

    const { considerLaptop } = setup({ tooLongToLoadTime: 10 });

    await waitFor(() => {
      expect(considerLaptop).toBeInTheDocument();
      expect(considerLaptop).toBeVisible();
    });
  });

  it("shouldn't show the consider laptop message when rendered for some time in a not mobile device", async () => {
    mockUseDeviceType();

    const { considerLaptop } = setup({ tooLongToLoadTime: 10 });

    await waitFor(() => {
      expect(considerLaptop).toBeInTheDocument();
      expect(considerLaptop).not.toBeVisible();
    });
  });
});
