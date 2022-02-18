const ColoredListCircle = ({ hex }) => {
  return <div
    className={`w-3 h-3 rounded-full`}
    style={{ backgroundColor: hex }}
  />;
};

export default ColoredListCircle;
