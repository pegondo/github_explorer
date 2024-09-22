type Props = {
  children: JSX.Element;
};

const Card = ({ children }: Props) => (
  <div className="w-full p-6 bg-card border border-gray-200 rounded-lg shadow">
    {children}
  </div>
);

export default Card;
