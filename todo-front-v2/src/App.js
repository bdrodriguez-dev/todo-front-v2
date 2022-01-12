import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import TaskItem from './components/TaskItem';
import CreateTask from "./components/CreateTask";
import TaskCard from "./components/TaskCard";
import EditTask from "./components/EditTask";

const App = () => {
    const [showTaskCreateForm, setShowTaskCreateForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

    // Get tasks from db and update state
    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasks = await axios.get(`http://localhost:8000/todos`);
                setTasks(tasks.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, [deleteFlag]);

    const handleDelete = async (id) => {
        const deletedTodo = await axios.delete(`http://localhost:8000/todos/${id}`);
        setDeleteFlag(!deleteFlag);
    }

    const handleSubmit = async (e) => {

        const task = e.target[0].value;
        const dueDate = e.target[1].value;

        try {
            await axios.post(`http://localhost:8000/todos?todo=${task}&dueDate=${dueDate}`);
        } catch (e) {
            console.log(e);
        }
    };

    // const handleTaskDescriptionChange = (e, id, tasks) => {
    //     console.log(e.target)
    //     // const newValue = e.target[0].value;
    //     // console.log(newValue);
    //     // //make copy of tasks
    //     // const tasksCopy = tasks;
    //     // console.log(tasksCopy);
    //     // //get index
    //     // const editIndex = tasksCopy.findIndex(task => id === task._id);
    //     // console.log(editIndex);
    //     // //update tasksCopy
    //     // tasksCopy[editIndex].todo = newValue;
    //     // console.log(tasksCopy);
    //     // //set tasks state to updated copy
    //     // setTasks(tasksCopy);
    //     // if save send to server and refresh (this goes in handleSubmit
    //
    //     // if cancel get tasks from server
    //
    // }

    return <>
        <h1 className={`text-3xl`}>Array of Zero [0]</h1>
        <ul className={`my-16`}>
            {tasks && tasks.map(taskObj => {
                return <li
                    key={taskObj._id}

                >
                    {/*<TaskCard id={taskObj._id}*/}
                    {/*          taskObj={taskObj}*/}
                    {/*          deleteFunc={handleDelete}*/}
                    {/*          submitFunc={handleSubmit}*/}
                    {/*          taskDescriptionChangeFunc={handleTaskDescriptionChange}*/}
                    {/*/>*/}
                    <TaskCard>
                        <TaskItem
                            taskObj={taskObj}
                            deleteFunc={handleDelete}
                            tasks={tasks}
                            setTasks={setTasks}
                            editInputValue={() => {
                                return tasks[tasks.findIndex(task => {
                                    return task._id === taskObj._id
                                })].todo}}
                        />
                    </TaskCard>
                </li>;
            })}
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

        {!showTaskCreateForm ? <div className={`flex flex-col items-center`}>
            <button
                className={`text-3xl bg-blue-300 w-12 h-12`}
                onClick={() => {
                    setShowTaskCreateForm(true);
                    console.log(showTaskCreateForm);
                }
                }>+
            </button>
        </div> : null}

    </>;
}

export default App;
