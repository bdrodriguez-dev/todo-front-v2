import {useState} from "react";
import {TrashIcon} from '@heroicons/react/outline';
import {InformationCircleIcon} from '@heroicons/react/solid';
import axios from 'axios'
import EditTask from './EditTask';

const TaskItem = ({
                      taskObj,
                      deleteFunc,
                      showEditFormTrue,
                      onDescriptionChange,
                      tasks,
                      setTasks,
                      editInputValue,
                      id,
                      toggleEditableTaskItems,
                      showEditForm,
                      hideEditForm
                  }) => {
    const [showTaskDrawer, setShowTaskDrawer] = useState(false);
    // const [showEditForm, setShowEditForm] = useState(false);

    const toggleShowTaskDrawer = () => {
        setShowTaskDrawer(!showTaskDrawer);
    };
    console.log(showEditForm);
    return <div id={id}>
        {showEditForm ?
            <EditTask
                taskObj={taskObj}
                hideEditForm={hideEditForm}
                onDescriptionChange={onDescriptionChange}
                tasks={tasks}
                setTasks={setTasks}
                editInputValue={editInputValue}
            />
            :

            <div className={`flex`} onClick={() => {
                toggleEditableTaskItems(id);
            }}>
                <div className={`w-full p-4 flex-col`}>
                    <p className={`text-xl font-bold`}>
                        {taskObj?.todo}
                    </p>
                    <p>
                        {taskObj?.list} - {taskObj?.dueDate}
                    </p>
                </div>
            </div>
        }
    </div>

};

export default TaskItem;