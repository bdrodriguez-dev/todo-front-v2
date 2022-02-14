import SelectIcon from "./SelectIcon";
import OptionsContainer from './OptionsContainer';
import Option from './Option/Option';

const Select = ({ colorList }) => {
  console.log(colorList);
  return (
    <div className={`h-full`}>
      {/*<div>*/}
      {/*  <SelectIcon />*/}
      {/*</div>*/}

        <OptionsContainer>
          {colorList.map((color) => {
            return <Option colorName={color.name} circleColor={color.hex} />;
          })}
        </OptionsContainer>
    </div>
  );
};

export default Select;
