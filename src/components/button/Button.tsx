import { MouseEventHandler } from "react";

export type Props = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
  "data-testid"?: string;
};

const Button = ({ onClick, children, "data-testid": dataTestId }: Props) => (
  <button
    className="bg-primary px-6 py-2 text-white rounded-md"
    onClick={onClick}
    type="button"
    data-testid={dataTestId}
  >
    {children}
  </button>
);

export default Button;
