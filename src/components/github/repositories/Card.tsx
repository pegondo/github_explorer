type Props = {
  children: JSX.Element;
  "data-testid"?: string;
};

const Card = ({ children, "data-testid": dataTestId }: Props) => (
  <div
    className="w-full p-6 bg-card border border-gray-200 rounded-lg shadow"
    data-testid={dataTestId}
  >
    {children}
  </div>
);

export default Card;
