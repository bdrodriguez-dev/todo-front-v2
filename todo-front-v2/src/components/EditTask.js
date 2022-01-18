import {XCircleIcon} from "@heroicons/react/solid";
import axios from "axios";
import {useState} from "react";


const EditTask = (
    {
        taskObj,
        submitFunc,
        hideEditForm,
    }) => {

    const [taskDescription, setTaskDescription] = useState(taskObj.todo);
    const [taskDueDate, setTaskDueDate] = useState(taskObj.dueDate);

    return <form
        className={`w-full p-4 flex-col justify-between bg-green-200`}
        onSubmit={async e => {
            // e.preventDefault();
            const task = e.target[0].value;
            const dueDate = e.target[1].value;
            try {
                const updatedTask = await axios.put(`http://localhost:8000/todos/${taskObj._id}?todo=${task}&dueDate=${dueDate}`)
                console.log(updatedTask);
            } catch (error) {
                console.log(error);
            }
        }}
    >
        {/* Inputs */}
        <div className={'flex flex-col'}>
            <input type={`text`}
                   className={`text-xl font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
                   autoFocus
                   onChange={e => {
                       setTaskDescription(e.target.value);
                   }}
                   value={taskDescription}
            />
            <input type={`date`}
                   className={`text-xl font-bold p-2 my-2 rounded-md w-3/12 border-2 border-blue-300 focus:outline-0`}
                   value={taskDueDate}
                   onChange={e => {
                       setTaskDueDate(e.target.value);
                   }}
            />
        </div>
        {/* Buttons */}
        <div className={`flex items-center justify-center`}>
            <button type={`submit`}
                    className={`bg-blue-600 text-white rounded-md px-2 py-1 mx-2`}>
                Save
            </button>
            <button type={`button`}
                    className={`bg-red-600 text-white rounded-md px-2 py-1 mx-2`}>
                Delete
            </button>
            <button type={`button`}
                    className={`bg-slate-500 text-white rounded-md px-2 py-1 mx-2`}
                    onClick={hideEditForm}>
                Cancel
            </button>
        </div>
    </form>
};

export default EditTask;