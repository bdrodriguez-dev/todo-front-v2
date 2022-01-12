import {useState} from "react";
import {TrashIcon} from '@heroicons/react/outline';
import {InformationCircleIcon} from '@heroicons/react/solid';
import axios from 'axios'
import EditTask from './EditTask';

const TaskItem = ({taskObj, deleteFunc, showEditFormTrue, onDescriptionChange, tasks, setTasks, editInputValue}) => {
    const [showTaskDrawer, setShowTaskDrawer] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleShowTaskDrawer = () => {
        setShowTaskDrawer(!showTaskDrawer);
    };

    return <>
        {showEditForm ?
            <EditTask
                taskObj={taskObj}
                hideEditForm={() => setShowEditForm(false)}
                onDescriptionChange={onDescriptionChange}
                tasks={tasks}
                setTasks={setTasks}
                editInputValue={editInputValue}
            />
            :
            <div>
                <div className={`flex`}>
                    <div className={`w-full p-4 flex-col`}>
                        <p className={`text-xl font-bold`}>
                            {taskObj?.todo}
                        </p>
                        <p>
                            {taskObj?.list} - {taskObj?.dueDate}
                        </p>
                    </div>
                    <div className={`w-[100px] flex justify-center items-center`}>
                        <button onClick={toggleShowTaskDrawer}
                                className={`h-9 w-9 flex justify-center items-center`}>
                            <InformationCircleIcon className={`h-9 w-9 text-blue-500`}/>
                        </button>
                    </div>
                </div>


                {showTaskDrawer ?
                    <div
                        className={`flex justify-center`}>
                        <button
                            onClick={() => deleteFunc(taskObj._id)}
                            className={`bg-red-600 text-white m-4 p-2 rounded-md`}
                        >Delete
                        </button>
                        <button
                            className={`bg-blue-600 text-white m-4 p-2 rounded-md`}
                            onClick={() => setShowEditForm(true)}
                        >
                            Edit
                        </button>
                    </div> : null}
            </div>}

    </>

};

export default TaskItem;