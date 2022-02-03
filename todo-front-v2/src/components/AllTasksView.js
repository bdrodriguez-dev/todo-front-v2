import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";

const AllTasksView = ({
  showEditFormArr,
  tasks,
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
                  handleCompletedChange={handleCompletedChange}
                  triggerApiFetch={triggerApiFetch}
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

export default AllTasksView;
