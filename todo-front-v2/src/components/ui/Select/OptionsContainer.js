import Option from "./Option/Option";
import { useState } from "react";

const OptionsContainer = ({
  colorList,
  handleCircleColorChange,
  selectedColor,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const hideOptionsHandler = () => {
    setShowOptions(false);
  };

  const showOptionsHandler = () => {
    setShowOptions(true);
  };

  const toggleOptionsHandler = () => {
    setShowOptions(!showOptions);
  };

  const handleKeyDown = (e) => {
    console.log(`key pressed`);
    if (e.keyCode === 27) {
      setShowOptions(false);
    }
  };

  const handleOnBlur = () => {
    setShowOptions(false);
  }

  return (
    <div className={`h-full outline-none`} onKeyDown={handleKeyDown} tabIndex={`0`} onBlur={handleOnBlur}>
      <div className={`border-2 rounded-md`} onClick={toggleOptionsHandler}>
        <Option
          colorName={selectedColor.name}
          circleColor={selectedColor.hex}
        />
      </div>
      {showOptions ? (
        <ul className={`overflow-auto rounded-md border-2 h-4/5`}>
          {colorList.map((color) => {
            return (
              <li
                key={color.name}
                onClick={() => {
                  handleCircleColorChange(color);
                  hideOptionsHandler();
                }}
              >
                <Option colorName={color.name} circleColor={color.hex} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default OptionsContainer;
