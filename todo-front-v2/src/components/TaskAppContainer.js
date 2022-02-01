import { useEffect, useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import CreateContainer from "./CreateContainer";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  const [fetchFromApiFlag, setFetchFromApiFlag] = useState(false);
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
  }, [fetchFromApiFlag]);

  const toProperCase = (list) => {
    const first = list.slice(0, 1).toUpperCase();
    const rest = list.slice(1);
    return first + rest;
  };

  const updateStateForRerenderAfterCreate = (createdTodo) => {
    const appDataTasks = appData.tasks;
    setAppData({ ...appData, tasks: [...appData.tasks, createdTodo] });
  };

  const handleCompletedChange = async (id, updatedCompleted) => {
    //put request
    try {
      await axios.put(
        `http://localhost:8000/todos/${id}?completed=${updatedCompleted}`
      );
      triggerApiFetch();
    } catch (error) {
      console.log(error);
    }
  };

  const triggerApiFetch = () => {
    setFetchFromApiFlag(!fetchFromApiFlag);
  };

  return (
    <>
      <TaskList
        tasks={appData.tasks}
        deleteFlag={fetchFromApiFlag}
        setDeleteFlag={setFetchFromApiFlag}
        toProperCase={toProperCase}
        lists={appData.lists}
        handleCompletedChange={handleCompletedChange}
        triggerApiFetch={triggerApiFetch}
      />
      <CreateContainer
        toProperCase={toProperCase}
        lists={appData.lists}
        triggerApiFetch={triggerApiFetch}
      />
      <ul>
        {appData.lists.map((list) => {
          return (
            <>
              <li>{list.name}</li>;
              <button
                onClick={async () => {
                  try {
                    const deletedList = await axios.delete(
                      `http://localhost:8000/lists/${list._id}`
                    );
                    console.log(deletedList);
                    triggerApiFetch();
                  } catch (error) {
                    console.log(error);
                  }
                }}
                style={{ backgroundColor: "red" }}
              >
                Delete
              </button>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default TaskAppContainer;
