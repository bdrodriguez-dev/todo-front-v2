import {XCircleIcon} from "@heroicons/react/solid";
import axios from "axios";
import {useState} from "react";


const EditTask = (
    {
        taskObj,
        submitFunc,
        onDescriptionChange,
        hideEditForm,
        setTasks,
        tasks,
        editInputValue
    }) => {

    const [taskDescription, setTaskDescription] = useState(taskObj.todo);

    return <form
        className={`w-full p-4 flex justify-between bg-green-200`}
        onSubmit={submitFunc}
    >
        {/* Inputs */}
        <div className={'flex flex-col w-4/5'}>
            <input type={`text`}
                   className={`text-xl font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
                   autoFocus
                   onChange={e => {
                       setTaskDescription(e.target.value);
                   }}
                   value={taskDescription}

            />
            <input type={`date`}
                   className={`text-xl font-bold p-2 my-2 rounded-md w-3/12 border-2 border-blue-300 focus:outline-0`}/>
        </div>
        {/* Buttons */}
        <div className={`w-[100px] flex flex-col justify-center items-center `}>
            <button type={`submit`}
                    className={`border-2 border-blue-300 bg-blue-600 text-white my-4 mx-4 p-2 rounded-md`}>
                Save
            </button>
            <button type={`button`} className={`p-2`} onClick={hideEditForm}>
                <XCircleIcon className={`h-10 w-10 my-4 text-red-600`}/>
            </button>
        </div>
    </form>
};

export default EditTask;