import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = ({
  tasks,
  setTasks,
  showTaskCreateForm,
  setShowTaskCreateForm,
  deleteFlag,
  setDeleteFlag,
}) => {
  /*
   * Hooks
   * */
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

  /*
   * Functions
   * */

  const handleDelete = async (id) => {
    const deletedTodo = await axios.delete(`http://localhost:8000/todos/${id}`);
    setDeleteFlag(!deleteFlag);
  };

  const handleCreateSubmit = async (e) => {
    // e.preventDefault();
    const task = e.target[0].value;
    const dueDate = e.target[1].value;

    let dueDateQueryString = `&dueDate=${dueDate}`;
    if (!dueDate) {
      dueDateQueryString = '';
    }

    try {
      await axios.post(
        `http://localhost:8000/todos?todo=${task}${dueDateQueryString}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditSubmit = async (e, id) => {
      const task = e.target[0].value;
      let dueDate = e.target[1].value;
      console.log(task, dueDate);
      try {
        const updatedTask = await axios.put(`http://localhost:8000/todos/${id}?todo=${task}&dueDate=${dueDate}`)
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

  const toProperCase = (list) => {
    const first = list.slice(0, 1).toUpperCase();
    const rest = list.slice(1);
    return first + rest;
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
                  setTasks={setTasks}
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
                />
              </TaskCard>
            </li>
          );
        })
      ) : (
        <p>Not loaded</p>
      )}
      {showTaskCreateForm ? (
        <TaskCard>
          <CreateTask
            hideCreateForm={() => {
              setShowTaskCreateForm(false);
            }}
            handleCreateSubmit={handleCreateSubmit}
            toProperCase={toProperCase}
          />
        </TaskCard>
      ) : null}
    </ul>
  );
};

export default TaskList;
