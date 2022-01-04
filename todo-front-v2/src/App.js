import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";


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
        {tasks.map(task => {
            return <ul
                key={task._id}
                className={`mx-6 my-2 shadow-md p-4`}
            >
                <li className={`text-xl font-bold`}>{task.todo}</li>
                <li>{task.list} - {task.dueDate}</li>
            </ul>;
        })}
        <button className={`text-3xl`} onClick={toggleShowTaskForm}>New task</button>
        {showTaskForm ? <form className={`border-2 border-red-900`}>
            <input type="text" className={``} />
        </form> : null }
    </>;
}

export default App;
