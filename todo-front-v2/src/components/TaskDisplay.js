import CompletedCheckbox from "./CompletedCheckbox";

const TaskDisplay = ({
  toggleEditableTaskItems,
  taskObj,
  toProperCase,
  id,
  handleCompletedChange,
}) => {
  return (
    <div className={`flex bg-white`}>
      <div className={`flex justify-center items-center w-1/12 border-r-2`}>
        <CompletedCheckbox
          taskObj={taskObj}
          handleCompletedChange={handleCompletedChange}
        />
      </div>
      <div
        className={`w-11/12 p-4 flex justify-between items-center`}
        onClick={() => {
          toggleEditableTaskItems(id);
        }}
      >
        <div className={`flex-col`}>
          <p className={`text-xl font-bold`}>{taskObj?.todo}</p>
          <p className={`text-sm`}>{taskObj.dueDate !== 'undefined' ? taskObj.dueDate : ''}</p>
        </div>
        <p>{toProperCase(taskObj.list)}</p>
      </div>
    </div>
  );
};

export default TaskDisplay;
