import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const createTaskForm = <form className={`mx-6 flex flex-col`}>
    {/*Input for task description*/}
    <div className={`flex my-2`}>
        <label
            htmlFor={`task-name-input`}
            className={`pr-16`}
        >Task</label>
        <input type={'text'} id={`task-name-input`} className={`border-2 border-blue-600 w-3/5`}/></div>
    {/* Input for due date */}
    <div className={`flex my-2`}><label htmlFor={'task-dueDate-input'} className={`pr-16`}>Due Date</label>
        <input type={`date`} id={`task-dueDate-input`}/></div>

</form>;

const App = () => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasks = await axios.get(`http://localhost:8000/todos`);
                setTasks(tasks.data);
                console.log(tasks.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, []);

    const toggleShowTaskForm = () => {
        setShowTaskForm(!showTaskForm);
    };

    return <>
        <h1 className={`text-3xl`}>Array of Zero [0]</h1>
        <div className={`my-16`}>
            {tasks.map(task => {
                return <ul
                    key={task._id}
                    className={`mx-6 my-2 shadow-md p-4 hover:translate-y-0.5`}
                >
                    <li className={`text-xl font-bold`}>{task.todo}</li>
                    <li>{task.list} - {task.dueDate}</li>
                </ul>;
            })}
        </div>
        <div className={`flex flex-col items-center`}>
            <button className={`text-3xl bg-blue-300 w-12 h-12`} onClick={toggleShowTaskForm}>+</button>
            {showTaskForm ? createTaskForm : null}
        </div>
    </>;
}

export default App;
