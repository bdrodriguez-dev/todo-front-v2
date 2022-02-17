import { useEffect, useState } from "react";
import axios from "axios";
import TaskListContainer from "./TaskListContainer";
import CreateContainer from "./CreateContainer";
import SideMenu from "./ListSelect/SideMenu";
import Modal from "./Modal";
import CreateListForm from "./CreateListForm";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  const [fetchFromApiFlag, setFetchFromApiFlag] = useState(false);
  const [displayedList, setDisplayedList] = useState("inbox");
  const [showCreateListModal, setShowCreateListModal] = useState(false);

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
    const listToDelete = appData.lists.find((list) => list._id === id);
    // if (listToDelete.name !== "inbox") {
      try {
        const deletedList = await axios.delete(
          `http://localhost:8000/lists/${id}`
        );
        console.log(deletedList);
        triggerApiFetch();
      } catch (error) {
        console.log(error);
      }
    // } else {
    //   alert(`Cannot delete "Inbox" list`);
    // }
  };

  const handleChangeDisplayedList = (list) => {
    setDisplayedList(list);
    console.log(list);
  };

  const triggerApiFetch = () => {
    setFetchFromApiFlag(!fetchFromApiFlag);
  };

  const getTasksForDisplayedList = (list) => {
    return appData.tasks.filter((task) => {
      return task.list === list;
    });
  };

  const hideCreateListModalHandler = () => {
    setShowCreateListModal(false);
  };

  const showCreateListModalHandler = () => {
    setShowCreateListModal(true);
  };

  const handleListCreateSubmit = async (listName, listColor) => {
    console.log(`submitted input: ${listName}, ${listColor}`)
    const checkForExistingList = (newList) => {
      let appearsInList = false;
      appData.lists.forEach((list) => {
        if (list.name === newList) {
          appearsInList = true;
          return appearsInList;
        }
      });
      return appearsInList;
    };

    const hashRemovedColor = listColor.slice(1);

    if (listName !== "" && !checkForExistingList(listName)) {
      try {
        const urlString = `http://localhost:8000/lists?name=${listName}&color=%23${hashRemovedColor}`;
        console.log(urlString);
        const res = await axios.post(urlString);
        console.log(res);

        hideCreateListModalHandler();
        triggerApiFetch();
      } catch (error) {
        console.log(error);
      }
    } else {
      // toggleButtonsAndForms("list");
      alert(`List "${toProperCase(listName)}" already exists`);
    }
  };

  return (
    <div className={`flex bg-[#FFFFF3] w-screen h-screen`}>
      {/* show/hide create list modal based on state change */}
      {showCreateListModal ? (
        <div
          className={`absolute flex z-10 w-full h-full justify-center items-center`}
        >
          <Modal
            className={`border-dashed border-2 border-yellow-300`}
            hideFunc={hideCreateListModalHandler}
            modalTitle={`New Project`}
          >
            <CreateListForm
              handleListCreateSubmit={handleListCreateSubmit}
              hideFunc={hideCreateListModalHandler}
            />
          </Modal>
        </div>
      ) : null}

      <div
        className={`relative bg-blue-200 z-0 top-0 left-0 border-2 border-blue-300 flex w-full`}
      >
        <div className={`flex flex-col w-2/12 min-w-[250px] h-full bg-white`}>
          <SideMenu
            lists={appData.lists}
            toProperCase={toProperCase}
            displayedList={displayedList}
            handleChangeDisplayedList={handleChangeDisplayedList}
            showCreateListModalHandler={showCreateListModalHandler}
            handleDeleteList={handleDeleteList}
          />
        </div>
        <div className={`w-10/12`}>
          <TaskListContainer
            tasks={getTasksForDisplayedList(displayedList)}
            deleteFlag={fetchFromApiFlag}
            setDeleteFlag={setFetchFromApiFlag}
            toProperCase={toProperCase}
            lists={appData.lists}
            handleCompletedChange={handleCompletedChange}
            triggerApiFetch={triggerApiFetch}
            displayedList={displayedList}
            handleChangeDisplayedList={handleChangeDisplayedList}
          />
        </div>
      </div>
      {/*<CreateContainer*/}
      {/*  toProperCase={toProperCase}*/}
      {/*  lists={appData.lists}*/}
      {/*  triggerApiFetch={triggerApiFetch}*/}
      {/*/>*/}
    </div>
  );
};

export default TaskAppContainer;
