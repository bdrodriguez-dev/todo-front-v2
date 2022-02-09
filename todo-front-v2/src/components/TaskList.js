import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";

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
}) => {
  return (
    <>
      <ul className={`my-16 w-11/12 flex flex-col items-center`}>
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
    </>
  );
};

export default TaskList;
