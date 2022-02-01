import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import EditTask from "./EditTask";
import TaskDisplay from "./TaskDisplay";

const TaskItem = ({
  taskObj,
  handleDelete,
  onDescriptionChange,
  tasks,
  setTasks,
  editInputValue,
  id,
  toggleEditableTaskItems,
  showEditFormBool,
  hideEditForm,
  handleEditSubmit,
  toProperCase,
  lists,
  handleCompletedChange,
  triggerApiFetch,
}) => {
  return (
    <div id={id}>
      {showEditFormBool ? (
        <EditTask
          id={id}
          taskObj={taskObj}
          hideEditForm={hideEditForm}
          onDescriptionChange={onDescriptionChange}
          tasks={tasks}
          setTasks={setTasks}
          editInputValue={editInputValue}
          handleDelete={handleDelete}
          handleEditSubmit={handleEditSubmit}
          lists={lists}
          toProperCase={toProperCase}
        />
      ) : (
        <TaskDisplay
          toggleEditableTaskItems={toggleEditableTaskItems}
          taskObj={taskObj}
          toProperCase={toProperCase}
          id={id}
          handleCompletedChange={handleCompletedChange}
          triggerApiFetch={triggerApiFetch}
        />
      )}
    </div>
  );
};

export default TaskItem;
