import { useState } from "react";
import Button from "./ui/Button";
import ListSelect from "./ListSelect/ListSelect";

const EditTask = ({
  taskObj,
  handleDelete,
  hideEditForm,
  id,
  handleEditSubmit,
  lists,
  toProperCase,
}) => {
  const [taskDescription, setTaskDescription] = useState(taskObj.todo);
  const [dueDate, setDueDate] = useState(taskObj.dueDate);
  const [selectedList, setSelectedList] = useState(taskObj.list);

  const handleTaskDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedList(e.target.value);
  };

  return (
    <form
      className={`w-full p-4 flex-col justify-between bg-green-200 rounded-md`}
      onSubmit={(e) => {
        e.preventDefault();
        handleEditSubmit(taskDescription, dueDate, selectedList, id);

      }
      }
    >
      {/* Inputs */}
      <div className={"flex flex-col"}>
        <input
          type={`text`}
          className={`font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
          autoFocus
          onChange={handleTaskDescriptionChange}
          value={taskDescription}
        />
        <input
          type={`date`}
          className={`font-bold p-2 my-2 rounded-md w-5/12 border-2 border-blue-300 focus:outline-0`}
          value={dueDate}
          onChange={handleDueDateChange}
        />
        <ListSelect
          handleSelectChange={handleSelectChange}
          selectedList={selectedList}
          lists={lists}
          toProperCase={toProperCase}
        />
      </div>
      {/* Buttons */}
      <div className={`flex items-center justify-center`}>
        {/*<button type={`submit`}*/}
        {/*        className={`bg-blue-600 text-white rounded-md px-2 py-1 mx-2`}>*/}
        {/*    Save*/}
        {/*</button>*/}
        {/*<button type={`button`}*/}
        {/*        className={`bg-red-600 text-white rounded-md px-2 py-1 mx-2`}*/}
        {/*        onClick={() => handleDelete(id)}>*/}
        {/*    Delete*/}
        {/*</button>*/}
        {/*<button type={`button`}*/}
        {/*        className={`bg-slate-500 text-white rounded-md px-2 py-1 mx-2`}*/}
        {/*        onClick={() => hideEditForm(id)}>*/}
        {/*    Cancel*/}
        {/*</button>*/}
        <Button buttonText={`Save`} type={`submit`} variant={`primary`} />
        <Button
          buttonText={`Delete`}
          type={`button`}
          variant={`danger`}
          onClick={() => handleDelete(id)}
        />
        <Button
          buttonText={`Cancel`}
          type={`button`}
          variant={`neutral`}
          onClick={() => hideEditForm(id)}
        />
      </div>
    </form>
  );
};

export default EditTask;
