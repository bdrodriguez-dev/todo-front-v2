import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import { useEffect, useState } from "react";

const TaskList = ({
  tasks,
  handleDelete,
  setTasks,
  showTaskCreateForm,
  setShowTaskCreateForm,
  handleSubmit,
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

  const hideEditForm = (id) => {
    const showEditFormArrCopy = [...showEditFormArr];
    const i = showEditFormArrCopy.findIndex((showEditFormObj) => {
      return showEditFormObj.id === id;
    });
    showEditFormArrCopy[i].showEditForm = false;
    setShowEditFormArr(showEditFormArrCopy);
  }

  const toggleEditableTaskItems = (id) => {
    const showEditFormArrCopy = [...showEditFormArr];
    showEditFormArrCopy.forEach((showEditFormObj) => {
      if (showEditFormObj.id === id) {
        showEditFormObj.showEditForm = true;
      } else {
        const showEditFormArrCopy = showEditFormArr;
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
            handleSubmit={handleSubmit}
          />
        </TaskCard>
      ) : null}
    </ul>
  );
};

export default TaskList;
