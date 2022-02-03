import { useEffect, useState } from "react";
import axios from "axios";
import TaskListContainer from "./TaskListContainer";
import CreateContainer from "./CreateContainer";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  const [fetchFromApiFlag, setFetchFromApiFlag] = useState(false);

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

  const handleDeleteList = async (id) => {
    const listToDelete = appData.lists.find(list => list._id === id);
    if (listToDelete.name !== 'inbox') {
      try {
        const deletedList = await axios.delete(
          `http://localhost:8000/lists/${id}`
        );
        console.log(deletedList);
        triggerApiFetch();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(`Cannot delete "Inbox" list`);
    }
  };

  const triggerApiFetch = () => {
    setFetchFromApiFlag(!fetchFromApiFlag);
  };

  return (
    <>
      <TaskListContainer
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
              <li key={list._id}>{list.name}</li>
              <button
                onClick={async () => {
                  try {
                    await handleDeleteList(list._id)
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
