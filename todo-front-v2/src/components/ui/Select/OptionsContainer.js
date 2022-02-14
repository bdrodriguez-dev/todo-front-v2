const OptionsContainer = ({ children }) => {

  return (
    <ul className={`overflow-auto rounded-sm h-4/5 border-2`}>
      <li>{children[0]}</li>
      {children.map((child) => {
        return <li>{child}</li>;
      })}
    </ul>
  );
};

export default OptionsContainer;
