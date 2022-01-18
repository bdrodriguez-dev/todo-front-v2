import TaskCard from "./TaskCard";
import TaskItem from "./TaskItem";
import CreateTask from "./CreateTask";
import {useEffect, useState} from "react";

const TaskList = ({
                      tasks,
                      handleDelete,
                      setTasks,
                      showTaskCreateForm,
                      setShowTaskCreateForm,
                      handleSubmit,

                  }) => {
    const [showEditFormArr, setShowEditFormArr] = useState([]);

    useEffect(() => {
        let showEditFormArrTemp = tasks.map((taskObj) => {
            console.log(`editform added`)
            return {
                id: taskObj._id,
                showEditForm: false,
            }
        })
        console.log(showEditFormArrTemp);
        setShowEditFormArr(showEditFormArrTemp);
    }, [tasks]);

    // useEffect(() => {
    //     const fillShowEditFormArr = () => {
    //         setShowEditFormArr([]);
    //         const showEditFormArrCopy = showEditFormArr;
    //         console.log(`tasks: ${tasks}`);
    //         tasks.forEach((taskObj) => {
    //             showEditFormArrCopy.push({
    //                 id: taskObj._id,
    //                 showEditForm: false,
    //             })
    //         })
    //         setShowEditFormArr(showEditFormArrCopy);
    //     }
    //     fillShowEditFormArr();
    //     console.log(`showEditFormArr at end of useEffect: ${JSON.stringify(showEditFormArr)}`);
    // }, [tasks])
    console.log(`tasks from TaskList: ${tasks}`);
    return <ul className={`my-16`}>
        {showEditFormArr.length === tasks.length ? tasks.map((taskObj, i) => {
            const showEditFormBool = showEditFormArr.find((showEditFormObj) => {
                return taskObj._id === showEditFormObj.id;
            }).showEditForm;
            console.log(showEditFormBool);
            return <li
                key={taskObj._id}
            >
                <TaskCard>
                    <TaskItem
                        id={taskObj._id}
                        taskObj={taskObj}
                        deleteFunc={handleDelete}
                        tasks={tasks}
                        setTasks={setTasks}
                        editInputValue={() => {
                            return tasks[tasks.findIndex(task => {
                                return task._id === taskObj._id
                            })].todo
                        }}
                        showEditForm={showEditFormBool}

                    />
                </TaskCard>
            </li>;
        }): <p>Not loaded</p>}
        {showTaskCreateForm ?
            <TaskCard>
                <CreateTask
                    hideCreateForm={() => {
                        setShowTaskCreateForm(false);
                    }}
                    submitFunc={handleSubmit}
                />
            </TaskCard>
            : null}
    </ul>
};

export default TaskList;