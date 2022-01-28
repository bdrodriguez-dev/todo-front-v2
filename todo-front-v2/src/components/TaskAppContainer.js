import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import TaskCard from "./TaskCard";
import CreateTaskForm from "./CreateTaskForm";
import CreateContainer from "./CreateContainer";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  // const [tasks, setTasks] = useState([]);
  // const [listArray, setListArray] = useState(["inbox"]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  // Get tasks from db and update state
  useEffect(() => {
    const getAppData = async () => {
      try {
        const tasks = await axios.get(`http://localhost:8000/todos`);
        const lists = await axios.get(`http://localhost:8000/lists`);
        setAppData({
          tasks: tasks.data,
          lists: lists.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAppData();
  }, [deleteFlag]);

  const toProperCase = (list) => {
    const first = list.slice(0, 1).toUpperCase();
    const rest = list.slice(1);
    return first + rest;
  };

  console.log(appData.lists);

  return (
    <>
      <TaskList
        tasks={appData.tasks}
        deleteFlag={deleteFlag}
        setDeleteFlag={setDeleteFlag}
        toProperCase={toProperCase}
        lists={appData.lists}
      />
      <CreateContainer
        toProperCase={toProperCase}
        lists={appData.lists}
      />
    </>
  );
};

export default TaskAppContainer;
