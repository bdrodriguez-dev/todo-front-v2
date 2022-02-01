import CompletedCheckbox from "./CompletedCheckbox";

const TaskDisplay = ({
  toggleEditableTaskItems,
  taskObj,
  toProperCase,
  id,
  handleCompletedChange,
}) => {
  console.log(taskObj);
  return (
    <div className={`flex`}>
      <div className={`flex justify-center items-center w-1/12 border-r-2`}>
        <CompletedCheckbox taskObj={taskObj} handleCompletedChange={handleCompletedChange} />
      </div>
      <div
        className={`w-11/12 p-4 flex-col`}
        onClick={() => {
          toggleEditableTaskItems(id);
        }}
      >
        <p className={`text-xl font-bold`}>{taskObj?.todo}</p>
        <p>
          {toProperCase(taskObj.list)} - {taskObj.dueDate}
        </p>
      </div>
    </div>
  );
};

export default TaskDisplay;
