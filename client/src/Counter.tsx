interface IProps {
  count: number;
}

export const Counter: React.FC<IProps> = ({ count, ...rest }) => {
  return (
    <h1 className="counter" {...rest}>
      {count}
    </h1>
  );
};
