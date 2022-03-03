import Select from "./ui/Select/Select";
import Button from "./ui/Button";
import { useState } from "react";

const EditListForm = ({ listObj, listColors, listColorObj, submitFunc, deleteFunc, toProperCase }) => {
  const [initialListName, setInitialListName] = useState(listObj.name);
  const [listName, setListName] = useState(listObj.name);
  const [listColor, setListColor] = useState(listColorObj);

console.log(listColorObj)

  const handleListNameChange = (e) => {
    setListName(e.target.value);
  };

  const handleListColorChange = (newColor) => {
    setListColor(newColor);
  };

  // hex = #000000
  const getHexObject = (hex) => {
    return listColors.filter((color) => {
      return color.hex === hex;
    });
  };
  console.log(getHexObject(listColor));
  return (
    <form
      className={`w-full p-4 flex flex-col justify-between items-center h-full `}
      onSubmit={(e) => {
        e.preventDefault();
        submitFunc(initialListName, listName, listColor.hex);
      }}
    >
      {/* Inputs */}
      <div className={`flex flex-col w-11/12 mb-10 h-full `}>
        <div className={`h-1/5`}>
          {/* List Name */}
          <label htmlFor={`new-list-name`} className={`text-lg`}>
            Name:
          </label>
          <input
            id={`new-list-name`}
            type={`text`}
            className={`font-bold py-2 px-4 my-2 mr-2 w-full rounded-sm border-2`}
            value={toProperCase(listName)}
            onChange={handleListNameChange}
          />
        </div>
        <div className={`h-3/5`}>
          <label htmlFor={`new-list-name`} className={`text-lg`}>
            Color:
          </label>
          <Select
            colorList={listColors}
            selectedColor={listColor}
            handleCircleColorChange={handleListColorChange}
          />
        </div>

        <hr />
        {/* Buttons */}
        <div className={`flex  items-center mt-4 justify-center`}>
          <Button type={`submit`} buttonText={`Save`} variant={`primary`} />
          <Button type={'button'} buttonText={`Delete`} variant={`danger`} onClick={() => deleteFunc(listObj._id)} />
        </div>
      </div>
    </form>
  );
};

export default EditListForm;
