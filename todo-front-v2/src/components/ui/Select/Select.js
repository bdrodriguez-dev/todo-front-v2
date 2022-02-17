import SelectIcon from "./SelectIcon";
import OptionsContainer from "./OptionsContainer";
import Option from "./Option/Option";

const Select = ({ colorList, handleCircleColorChange, selectedColor }) => {
  return (
    <div className={`h-full`}>
      <OptionsContainer
        handleCircleColorChange={handleCircleColorChange}
        selectedColor={selectedColor}
        colorList={colorList}
      />
    </div>
  );
};

export default Select;
