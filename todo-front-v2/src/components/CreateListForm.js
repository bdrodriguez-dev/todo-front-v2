import ListSelect from "./ListSelect/ListSelect";
import Button from "./ui/Button";
import Select from "./ui/Select/Select";
import { useState } from "react";

const listColors = [
  { name: "Berry Red", hex: "bg-[#B8255F]" },
  { name: "Red", hex: "bg-[#DB4035]" },
  { name: "Orange", hex: "bg-[#FF9933]" },
  { name: "Yellow", hex: "bg-[#FAD000]" },
  { name: "Olive Green", hex: "bg-[#AFB83B]" },
  { name: "Lime Green", hex: "bg-[#7ECC49]" },
  { name: "Green", hex: "bg-[#299438]" },
  { name: "Mint Green", hex: "bg-[#6ACCBC]" },
  { name: "Teal", hex: "bg-[#158FAD]" },
  { name: "Light Blue", hex: "bg-[#96C3EB]" },
  { name: "Blue", hex: "bg-[#4073FF]" },
  { name: "Grape", hex: "bg-[#884DFF]" },
  { name: "Violet", hex: "bg-[#AF38EB]" },
  { name: "Lavender", hex: "bg-[#EB96EB]" },
  { name: "Magenta", hex: "bg-[#E05194]" },
  { name: "Salmon", hex: "bg-[#FF8D85]" },
  { name: "Charcoal", hex: "bg-[#808080]" },
  { name: "Grey", hex: "bg-[#B8B8B8]" },
];

const CreateListForm = ({
  hideListCreateForm,
  handleListCreateSubmit,
  hideFunc,
}) => {
  const [newList, setNewList] = useState("");
  const [circleColor, setCircleColor] = useState("bg-[#808080]");

  const handleNewListChange = (e) => {
    setNewList(e.target.value);
  };

  const handleCircleColorChange = (color) => {
    setCircleColor(color);
  };

  return (
    <form
      className={`w-full p-4 flex flex-col justify-between items-center h-full `}
      onSubmit={(e) => {
        e.preventDefault();
        handleListCreateSubmit(newList);
        hideFunc();
      }}
    >
      {/* Inputs */}
      <div className={`flex flex-col w-11/12 mb-10 h-full `}>
        <div className={`h-1/5`}>{/* List Name */}
          <label htmlFor={`new-list-name`} className={`text-lg`}>
            Name:
          </label>
          <input
            id={`new-list-name`}
            type={`text`}
            className={`font-bold py-2 px-4 my-2 mr-2 w-full rounded-sm border-2`}
            value={newList}
            onChange={handleNewListChange}
          /></div>
        {/*<div className={`rounded-full ${circleColor} h-5 w-5`} />*/}
        <div className={`h-3/5`}>
          <label htmlFor={`new-list-name`} className={`text-lg`}>
            Color:
          </label>
          <Select colorList={listColors} />
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
