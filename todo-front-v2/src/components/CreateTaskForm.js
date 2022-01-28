import Button from "./ui/Button";
import { useState } from "react";
import ListSelect from "./ListSelect/ListSelect";

const CreateTaskForm = ({
  hideTaskCreateForm,
  handleTaskCreateSubmit,
  toProperCase,
  listArray,
  handleNewList,
}) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedList, setSelectedList] = useState('');

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
      className={`w-full p-4 flex flex-col justify-between`}
      onSubmit={() => {
        handleTaskCreateSubmit(taskDescription, dueDate, selectedList);
      }}
    >
      {/* Inputs */}
      <div className={`flex flex-col w-4/5 mb-10`}>
        {/* Task description */}
        <input
          type={`text`}
          className={`font-bold py-2 px-4 my-2 mr-2 rounded-md border-2 border-blue-300`}
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
          autoFocus
        />
        <div className={`flex items-center`}>
          {/* Task dueDate*/}
          <input
            type={`date`}
            className={`font-bold py-2 px-2 my-2 mr-2 rounded-md w-4/12 border-2 border-blue-300`}
            value={dueDate}
            onChange={handleDueDateChange}
          />
          {/*  List */}
          <ListSelect
            selectedList={selectedList}
            handleSelectChange={handleSelectChange}
            listArray={listArray}
            toProperCase={toProperCase}
            handleNewList={handleNewList}
          />
        </div>
      </div>
      <hr />
      {/* Buttons */}
      <div className={`flex justify-center items-center mt-4`}>
        <Button type={`submit`} buttonText={`Save`} variant={`primary`} />
        <Button
          type={`button`}
          buttonText={`Cancel`}
          variant={`neutral`}
          onClick={hideTaskCreateForm}
        />
      </div>
    </form>
  );
};

export default CreateTaskForm;