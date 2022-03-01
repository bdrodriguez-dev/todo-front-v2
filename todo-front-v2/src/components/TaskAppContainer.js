import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TaskListContainer from "./TaskListContainer";
import SideMenu from "./ListSelect/SideMenu";
import Modal from "./Modal";
import CreateListForm from "./CreateListForm";
import EditListForm from "./EditListForm";
import CreateTaskForm from "./CreateTaskForm";

const TaskAppContainer = () => {
  const [appData, setAppData] = useState({
    tasks: [],
    lists: [],
  });
  const [fetchFromApiFlag, setFetchFromApiFlag] = useState(false);
  const [displayedList, setDisplayedList] = useState("inbox");
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const [showEditListModal, setShowEditListModal] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  const modalRef = useRef(null);

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

  const hideEditListModalHandler = () => {
    setShowEditListModal(false);
  };

  const showEditListModalHandler = () => {
    setShowEditListModal(true);
  };

  const handleListCreateSubmit = async (listName, listColor) => {
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
        const res = await axios.post(urlString);

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

  const autoFocusModal = () => {
    modalRef.current.focus();
  };

  const handleShowCreateTask = () => {
    setShowCreateTaskModal(true);
  };

  const handleHideCreateTask = () => {
    setShowCreateTaskModal(false);
  };

  const handleTaskCreateSubmit = async (
    taskDescription,
    dueDate,
    selectedList
  ) => {
    try {
      await axios.post(
        `http://localhost:8000/todos?todo=${taskDescription}&dueDate=${dueDate}&list=${selectedList}`
      );
      handleHideCreateTask();
      triggerApiFetch();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`flex bg-[#FFFFF3] w-screen h-screen`}>
      {showCreateListModal ? (
        <div
          className={`absolute flex z-10 w-full h-full justify-center items-center`}
        >
          <Modal
            className={`border-dashed border-2 border-yellow-300`}
            hideFunc={hideCreateListModalHandler}
            modalTitle={`New Project`}
            autoFocusModal={autoFocusModal}
            modalRef={modalRef}
          >
            <CreateListForm
              handleListCreateSubmit={handleListCreateSubmit}
              hideFunc={hideCreateListModalHandler}
            />
          </Modal>
        </div>
      ) : null}

      {showEditListModal ? (
        <div
          className={`absolute flex z-10 w-full h-full justify-center items-center`}
        >
          <Modal
            hideFunc={hideEditListModalHandler}
            modalTitle={`Edit Project`}
            autoFocusModal={autoFocusModal}
            modalRef={modalRef}
          >
            <EditListForm />
          </Modal>
        </div>
      ) : null}

      {showCreateTaskModal ? (
        <div
          className={`absolute flex z-10 w-full h-full justify-center items-center`}
        >
          <Modal
            hideFunc={handleHideCreateTask}
            modalTitle={`Create Task`}
            autoFocusModal={autoFocusModal}
            modalRef={modalRef}
          >
            <CreateTaskForm
              handleTaskCreateSubmit={handleTaskCreateSubmit}
              toProperCase={toProperCase}
              lists={appData.lists}
            />
          </Modal>
        </div>
      ) : null}

      <div className={`relative bg-blue-200 z-0 top-0 left-0 flex w-full`}>
        <div className={`flex flex-col w-2/12 min-w-[250px] h-full bg-white`}>
          <SideMenu
            lists={appData.lists}
            toProperCase={toProperCase}
            displayedList={displayedList}
            handleChangeDisplayedList={handleChangeDisplayedList}
            showCreateListModalHandler={showCreateListModalHandler}
            handleDeleteList={handleDeleteList}
            showEditListModal={showEditListModalHandler}
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
            handleShowCreateTask={handleShowCreateTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskAppContainer;
