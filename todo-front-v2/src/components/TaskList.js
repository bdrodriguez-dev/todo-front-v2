import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";
import Button from "./ui/Button";
import CreateTaskForm from "./CreateTaskForm";

const TaskList = ({
  tasks,
  showEditFormArr,
  handleDelete,
  hideEditForm,
  toggleEditableTaskItems,
  handleEditSubmit,
  toProperCase,
  lists,
  handleCompletedChange,
  triggerApiFetch,
  displayedList,
  handleHideCreate,
  handleShowCreate,
  showCreateForm,
}) => {
  return (
      <ul className={`mt-20 w-11/12 h-[700px] flex flex-col items-center overflow-auto`}>
        {tasks.map((taskObj) => {
          const showEditFormBool = showEditFormArr.find((showEditFormObj) => {
            return taskObj._id === showEditFormObj.id;
          }).showEditForm;
          return (
            <li key={taskObj._id} className={`w-full`}>
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
                  handleCompletedChange={handleCompletedChange}
                  triggerApiFetch={triggerApiFetch}
                />
              </TaskCard>
            </li>
          );
        })}
      </ul>
  );
};

export default TaskList;
