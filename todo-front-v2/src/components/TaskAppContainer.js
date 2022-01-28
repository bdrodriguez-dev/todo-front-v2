import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from './TaskList';
import TaskCard from './TaskCard';
import CreateTaskForm from './CreateTaskForm';
import CreateContainer from './CreateContainer';

const TaskAppContainer = () => {

  const [tasks, setTasks] = useState([]);
  const [listArray, setListArray] = useState(["inbox"]);
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
    };
    getTasks();
  }, [deleteFlag]);

  const handleUpdateListArr = (newList) => {
    setListArray([...listArray, newList]);
  }

  const toProperCase = (list) => {
    const first = list.slice(0, 1).toUpperCase();
    const rest = list.slice(1);
    return first + rest;
  };

  return (
    <>
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        // taskCreateFormVisible={taskCreateFormVisible}
        // handleShowTaskCreateForm={handleShowTaskCreateForm}
        deleteFlag={deleteFlag}
        setDeleteFlag={setDeleteFlag}
        toProperCase={toProperCase}
      />
      <CreateContainer
        toProperCase={toProperCase}
        listArray={listArray}
        handleUpdateListArr={handleUpdateListArr}
      />
    </>
  );
};

export default TaskAppContainer;
