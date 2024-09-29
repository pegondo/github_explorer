import { MouseEventHandler } from "react";

export type Props = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  "data-testid"?: string;
};

const Button = ({ onClick, children, "data-testid": dataTestId }: Props) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button
      className="bg-primary px-6 py-2 text-white rounded-md"
      onClick={handleClick}
      type="button"
      data-testid={dataTestId}
    >
      {children}
    </button>
  );
};

export default Button;
