import { XCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import { useState } from "react";
import Button from "./ui/Button";

const EditTask = ({
  taskObj,
  handleDelete,
  hideEditForm,
  id,
  handleEditSubmit,
}) => {
  const [taskDescription, setTaskDescription] = useState(taskObj.todo);
  const [taskDueDate, setTaskDueDate] = useState(taskObj.dueDate);

  return (
    <form className={`w-full p-4 flex-col justify-between bg-green-200`}
        onSubmit={(e) => handleEditSubmit(e, id)}>
      {/* Inputs */}
      <div className={"flex flex-col"}>
        <input
          type={`text`}
          className={`font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
          autoFocus
          onChange={(e) => {
            setTaskDescription(e.target.value);
          }}
          value={taskDescription}
        />
        <input
          type={`date`}
          className={`font-bold p-2 my-2 rounded-md w-3/12 border-2 border-blue-300 focus:outline-0`}
          value={taskDueDate}
          onChange={(e) => {
            setTaskDueDate(e.target.value);
          }}
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
        <Button
          buttonText={`Save`}
          type={`submit`}
          variant={`primary`}
        />
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
