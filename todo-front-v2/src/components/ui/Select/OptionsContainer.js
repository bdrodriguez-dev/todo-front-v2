import Option from "./Option/Option";

const OptionsContainer = ({
  colorList,
  handleCircleColorChange,
  selectedColor,
}) => {
  return (
    <div className={`h-full`}>
      <div className={`border-2 rounded-md`}>
        <Option
          colorName={selectedColor.name}
          circleColor={selectedColor.hex}
        />
      </div>

      <ul className={`overflow-auto rounded-md border-2 h-4/5`}>
        {colorList.map((color) => {
          return (
            <li key={color.name} onClick={() => handleCircleColorChange(color)}>
              <Option colorName={color.name} circleColor={color.hex} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OptionsContainer;
