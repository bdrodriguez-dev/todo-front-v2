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
        className={`mx-6 my-2 shadow-md hover:translate-y-0.5 rounded-md flex-col`}>
        {/*{!showEditForm ?*/}
        {/*    <TaskItem*/}
        {/*        taskObj={taskObj}*/}
        {/*        id={id}*/}
        {/*        deleteFunc={deleteFunc}*/}
        {/*        showEditFormTrue={() => setShowEditForm(true)}*/}
        {/*    /> :*/}
        {/*    <EditTask*/}
        {/*        submitFunc={submitFunc}*/}
        {/*        taskDescriptionChangeFunc={taskDescriptionChangeFunc}*/}
        {/*        taskObj={taskObj}*/}
        {/*        hideEditForm={() => setShowEditForm(false)}*/}
        {/*    />}*/}
        {children}
    </div>
};

export default TaskCard;