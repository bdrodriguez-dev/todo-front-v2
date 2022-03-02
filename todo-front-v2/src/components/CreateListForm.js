import ListSelect from "./ListSelect/ListSelect";
import Button from "./ui/Button";
import Select from "./ui/Select/Select";
import { useState } from "react";

const CreateListForm = ({
  hideListCreateForm,
  handleListCreateSubmit,
  hideFunc,
  listColors,
}) => {
  const [newList, setNewList] = useState({
    name: "",
    color: { name: "Grey", hex: "#B8B8B8" },
  });

  const handleNewListNameChange = (e) => {
    setNewList({ ...newList, name: e.target.value });
  };

  const handleNewListColorChange = (newColor) => {
    setNewList({ ...newList, color: newColor });
  };

  // const handleCircleColorChange = (color) => {
  //   setCircleColor(color);
  // };

  return (
    <form
      className={`w-full p-4 flex flex-col justify-between items-center h-full `}
      onSubmit={(e) => {
        e.preventDefault();
        handleListCreateSubmit(newList.name, newList.color.hex);
        hideFunc();
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
            value={newList.name}
            onChange={handleNewListNameChange}
          />
        </div>
        <div className={`h-3/5`}>
          <label htmlFor={`new-list-name`} className={`text-lg`}>
            Color:
          </label>
          <Select
            colorList={listColors}
            selectedColor={newList.color}
            handleCircleColorChange={handleNewListColorChange}
          />
        </div>

        <hr />
        {/* Buttons */}
        <div className={`flex  items-center mt-4 justify-center`}>
          <Button type={`submit`} buttonText={`Save`} variant={`primary`} />
          {/*<Button*/}
          {/*  type={`button`}*/}
          {/*  buttonText={`Cancel`}*/}
          {/*  variant={`neutral`}*/}
          {/*  onClick={hideListCreateForm}*/}
          {/*/>*/}
        </div>
      </div>
    </form>
  );
};

export default CreateListForm;
