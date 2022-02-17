import ListSelect from "./ListSelect/ListSelect";
import Button from "./ui/Button";
import Select from "./ui/Select/Select";
import { useState } from "react";

const listColors = [
  { name: "Berry Red", hex: "#B8255F" },
  { name: "Red", hex: "#DB4035" },
  { name: "Orange", hex: "#FF9933" },
  { name: "Yellow", hex: "#FAD000" },
  { name: "Olive Green", hex: "#AFB83B" },
  { name: "Lime Green", hex: "#7ECC49" },
  { name: "Green", hex: "#299438" },
  { name: "Mint Green", hex: "#6ACCBC" },
  { name: "Teal", hex: "#158FAD" },
  { name: "Light Blue", hex: "#96C3EB" },
  { name: "Blue", hex: "#4073FF" },
  { name: "Grape", hex: "#884DFF" },
  { name: "Violet", hex: "#AF38EB" },
  { name: "Lavender", hex: "#EB96EB" },
  { name: "Magenta", hex: "#E05194" },
  { name: "Salmon", hex: "#FF8D85" },
  { name: "Charcoal", hex: "#808080" },
  { name: "Grey", hex: "#B8B8B8" },
];

const CreateListForm = ({
  hideListCreateForm,
  handleListCreateSubmit,
  hideFunc,
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
        {/*<select*/}
        {/*  id={`new-list-name`}*/}
        {/*  className={`font-bold py-2 px-4 my-2 mr-2 rounded-md border-2 border-blue-300`}*/}

        {/*  onChange={handleNewListChange}*/}
        {/*>*/}
        {/*  {listColors.map(color => {*/}
        {/*    return <option onMouseEnter={() => handleCircleColorChange(color.hex)}>*/}
        {/*      {color.name}*/}
        {/*    </option>;*/}
        {/*  })}*/}
        {/*</select>*/}
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
