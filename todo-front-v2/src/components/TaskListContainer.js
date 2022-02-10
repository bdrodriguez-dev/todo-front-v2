import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import SideMenu from "./ListSelect/SideMenu";

const TaskListContainer = ({
  tasks,
  lists,
  toProperCase,
  handleCompletedChange,
  triggerApiFetch,
  displayedList,
}) => {
  const [showEditFormArr, setShowEditFormArr] = useState([]);

  useEffect(() => {
    let showEditFormArrTemp = tasks.map((taskObj) => {
      return {
        id: taskObj._id,
        showEditForm: false,
      };
    });
    setShowEditFormArr(showEditFormArrTemp);
  }, [tasks]);

  const handleDelete = async (id) => {
    try {
      const deletedTodo = await axios.delete(
        `http://localhost:8000/todos/${id}`
      );
      console.log(deletedTodo);
      triggerApiFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async (task, dueDate, list, id) => {
    try {
      const updatedTask = await axios.put(
        `http://localhost:8000/todos/${id}?todo=${task}&dueDate=${dueDate}&list=${list}`
      );
      console.log(updatedTask);
      triggerApiFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const hideEditForm = (id) => {
    const showEditFormArrCopy = [...showEditFormArr];
    const i = showEditFormArrCopy.findIndex((showEditFormObj) => {
      return showEditFormObj.id === id;
    });
    showEditFormArrCopy[i].showEditForm = false;
    setShowEditFormArr(showEditFormArrCopy);
  };

  const toggleEditableTaskItems = (id) => {
    const showEditFormArrCopy = [...showEditFormArr];
    showEditFormArrCopy.forEach((showEditFormObj) => {
      if (showEditFormObj.id === id) {
        showEditFormObj.showEditForm = true;
      } else {
        showEditFormObj.showEditForm = false;
      }
    });
    setShowEditFormArr(showEditFormArrCopy);
  };
  console.log(`showEditFormArr: ${JSON.stringify(showEditFormArr)}`);
  console.log(`tasks: ${JSON.stringify(tasks)}`);
  return (
    <>
      {showEditFormArr.length === tasks.length ? (
        <TaskList
          tasks={tasks}
          showEditFormArr={showEditFormArr}
          handleDelete={handleDelete}
          hideEditForm={hideEditForm}
          toggleEditableTaskItems={toggleEditableTaskItems}
          handleEditSubmit={handleEditSubmit}
          toProperCase={toProperCase}
          lists={lists}
          handleCompletedChange={handleCompletedChange}
          triggerApiFetch={triggerApiFetch}
        />
      ) : null}
    </>
  );
};

export default TaskListContainer;
