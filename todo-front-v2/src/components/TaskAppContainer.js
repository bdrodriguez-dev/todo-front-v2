import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import CreateContainer from "./CreateContainer";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [completedChangeFlag, setCompletedChangeFlag] = useState(false);

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
  }, [deleteFlag, completedChangeFlag]);

  const toProperCase = (list) => {
    const first = list.slice(0, 1).toUpperCase();
    const rest = list.slice(1);
    return first + rest;
  };

  const handleCompletedChange = async (id, updatedCompleted) => {
    //put request
    try {
      await axios.put(
        `http://localhost:8000/todos/${id}?completed=${updatedCompleted}`
      );
      setCompletedChangeFlag(!completedChangeFlag);
      //state change to rerender
      // const appDataTasksCopy = appData.tasks;
      // const i = appDataTasksCopy.findIndex(
      //   (taskObj) => taskObj._id === id
      // );
      // appDataTasksCopy[i].completed = updatedCompleted;
      // setAppData({ ...appData, tasks: [...appData.tasks, appDataTasksCopy]});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TaskList
        tasks={appData.tasks}
        deleteFlag={deleteFlag}
        setDeleteFlag={setDeleteFlag}
        toProperCase={toProperCase}
        lists={appData.lists}
        handleCompletedChange={handleCompletedChange}
      />
      <CreateContainer toProperCase={toProperCase} lists={appData.lists} />
    </>
  );
};

export default TaskAppContainer;
