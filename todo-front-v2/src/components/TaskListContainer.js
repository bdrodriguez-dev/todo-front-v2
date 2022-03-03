import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import SideMenu from "./ListSelect/SideMenu";
import CreateTaskForm from "./CreateTaskForm";
import Button from "./ui/Button";

const TaskListContainer = ({
  tasks,
  lists,
  toProperCase,
  handleCompletedChange,
  triggerApiFetch,
  displayedList,
  handleShowCreateTask,
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

  return (
    <div className={`mt-16 h-4/5`}>
      <h2 className={`ml-6 text-4xl font-bold`}>
        {toProperCase(displayedList)}
      </h2>
      <Button
        buttonText={`Add task`}
        onClick={handleShowCreateTask}
        type={`button`}
        variant={`primary`}
        className={`ml-6 mt-2`}
      />
      {showEditFormArr.length === tasks.length ? (
        <TaskList
          displayedList={displayedList}
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
    </div>
  );
};

export default TaskListContainer;
