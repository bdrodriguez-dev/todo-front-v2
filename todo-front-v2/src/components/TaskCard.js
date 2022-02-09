import TaskItem from "./TaskItem";
import EditTask from "./EditTask";
import {useState} from "react";

const TaskCard = (
    {
        id,
        taskObj,
        deleteFunc,
        showEditFormTrue,
        submitFunc,
        taskDescriptionChangeFunc,
        children,
    }) => {
    // const [showEditForm, setShowEditForm] = useState(false);
    return <div
        className={`mx-6 my-1 shadow-md hover:translate-y-0.5 rounded-md flex-col`}>
        {children}
    </div>
};

export default TaskCard;