import ColoredListCircle from './ColoredListCircle';
import OptionText from './OptionText';

const Option = ({colorName, circleColor}) => {
  return (
    <div className={`bg-white hover:bg-slate-200 flex items-center p-1`}>
      <ColoredListCircle hex={circleColor} />
      <OptionText text={colorName}/>
    </div>
  );
};

export default Option;
