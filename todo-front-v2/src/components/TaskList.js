import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";
import CreateTaskForm from "./CreateTaskForm";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({
  tasks,
  deleteFlag,
  setDeleteFlag,
  toProperCase,
  lists,
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
    const deletedTodo = await axios.delete(`http://localhost:8000/todos/${id}`);
    setDeleteFlag(!deleteFlag);
  };

  const handleEditSubmit = async (task, dueDate, list, id) => {
    try {
      const updatedTask = await axios.put(
        `http://localhost:8000/todos/${id}?todo=${task}&dueDate=${dueDate}&list=${list}`
      );
      console.log(updatedTask);
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
    <ul className={`my-16`}>
      {showEditFormArr.length === tasks.length ? (
        tasks.map((taskObj) => {
          const showEditFormBool = showEditFormArr.find((showEditFormObj) => {
            return taskObj._id === showEditFormObj.id;
          }).showEditForm;

          return (
            <li key={taskObj._id}>
              <TaskCard>
                <TaskItem
                  id={taskObj._id}
                  taskObj={taskObj}
                  handleDelete={handleDelete}
                  hideEditForm={hideEditForm}
                  tasks={tasks}
                  editInputValue={() => {
                    return tasks[
                      tasks.findIndex((task) => {
                        return task._id === taskObj._id;
                      })
                    ].todo;
                  }}
                  showEditFormBool={showEditFormBool}
                  toggleEditableTaskItems={toggleEditableTaskItems}
                  handleEditSubmit={handleEditSubmit}
                  toProperCase={toProperCase}
                  lists={lists}
                />
              </TaskCard>
            </li>
          );
        })
      ) : (
        <p>Not loaded</p>
      )}
    </ul>
  );
};

export default TaskList;
