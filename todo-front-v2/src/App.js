import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import TaskItem from './components/TaskItem';
import CreateTask from "./components/CreateTask";

const App = () => {
    const [showTaskCreateForm, setShowTaskCreateForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [deleteFlag, setDeleteFlag] = useState(false);

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

    const toggleShowTaskForm = () => {
        setShowTaskCreateForm(!showTaskCreateForm);
    };

    const deleteTaskItem = async (id) => {
        const deletedTodo = await axios.delete(`http://localhost:8000/todos/${id}`);
        setDeleteFlag(!deleteFlag);
    }

    const toggleEditModal = () => {

    }
    return <>
        <h1 className={`text-3xl`}>Array of Zero [0]</h1>
        <ul className={`my-16`}>
            {tasks && tasks.map(taskObj => {
                return <li
                    key={taskObj._id}

                >
                    <TaskItem
                        id={taskObj._id}
                        taskObj={taskObj}
                        deleteFunc={deleteTaskItem}
                    />
                </li>;
            })}
            {showTaskCreateForm ? <CreateTask hide={() => {
                setShowTaskCreateForm(false);
            }
            }/> : null}
        </ul>

        {!showTaskCreateForm ? <div className={`flex flex-col items-center`}>
            <button className={`text-3xl bg-blue-300 w-12 h-12`} onClick={toggleShowTaskForm}>+</button>
        </div>: null}

    </>;
}

export default App;
