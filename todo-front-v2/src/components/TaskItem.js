import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { InformationCircleIcon } from "@heroicons/react/solid";
import axios from "axios";
import EditTask from "./EditTask";

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
        <div
          className={`flex`}
          onClick={() => {
            toggleEditableTaskItems(id);
          }}
        >
          <div className={`w-full p-4 flex-col`}>
            <p className={`text-xl font-bold`}>{taskObj?.todo}</p>
            <p>
              {toProperCase(taskObj.list)} - {taskObj.dueDate}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
