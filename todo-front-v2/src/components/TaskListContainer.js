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
    let showEditFormArrTemp = getTasksForDisplayedList(displayedList).map((taskObj) => {
      return {
        id: taskObj._id,
        showEditForm: false,
      };
    });
    setShowEditFormArr(showEditFormArrTemp);
  }, [displayedList]);

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

  // const handleChangeDisplayedList = (list) => {
  //   setDisplayedList(list);
  // };

  const getTasksForDisplayedList = (list) => {
    return tasks.filter((task) => {
      return task.list === list;
    });
  };

  return (
    <>
      {showEditFormArr.length === getTasksForDisplayedList(displayedList).length ? (
        <TaskList
          tasks={getTasksForDisplayedList(displayedList)}
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
      ) : <p>False</p>}
    </>
  );
};

export default TaskListContainer;
