import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TaskListContainer from "./TaskListContainer";
import SideMenu from "./ListSelect/SideMenu";
import Modal from "./Modal";
import CreateListForm from "./CreateListForm";
import EditListForm from "./EditListForm";
import CreateTaskForm from "./CreateTaskForm";

const listColors = [
  { name: "Berry Red", hex: "#B8255F" },
  { name: "Red", hex: "#DB4035" },
  { name: "Orange", hex: "#FF9933" },
  { name: "Yellow", hex: "#FAD000" },
  { name: "Olive Green", hex: "#AFB83B" },
  { name: "Lime Green", hex: "#7ECC49" },
  { name: "Green", hex: "#299438" },
  { name: "Mint Green", hex: "#6ACCBC" },
  { name: "Teal", hex: "#158FAD" },
  { name: "Light Blue", hex: "#96C3EB" },
  { name: "Blue", hex: "#4073FF" },
  { name: "Grape", hex: "#884DFF" },
  { name: "Violet", hex: "#AF38EB" },
  { name: "Lavender", hex: "#EB96EB" },
  { name: "Magenta", hex: "#E05194" },
  { name: "Salmon", hex: "#FF8D85" },
  { name: "Charcoal", hex: "#808080" },
  { name: "Grey", hex: "#B8B8B8" },
];

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
  const [editListId, setEditListId] = useState("");

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
      hideEditListModalHandler();
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

  const handleListEditSubmit = async (initialListName, listName, listColor) => {
    const checkForExistingList = (newList) => {
      let appearsInList = false;
      appData.lists.forEach((list) => {
        if (list.name === newList && list.name !== initialListName) {
          appearsInList = true;
          return appearsInList;
        }
      });
      return appearsInList;
    };

    const hashRemovedColor = listColor.slice(1);

    if (listName === "") {
      alert("List name cannot be blank");
      return;
    }

    if (checkForExistingList(listName)) {
      alert(`List "${toProperCase(listName)}" already exists`);
      return;
    }

    try {
      const urlString = `http://localhost:8000/lists/${editListId}?name=${listName}&color=%23${hashRemovedColor}`;
      const res = await axios.put(urlString);

      hideEditListModalHandler();
      triggerApiFetch();
    } catch (error) {
      console.log(error);
    }

    // if (listName !== "" && !checkForExistingList(listName)) {
    //   try {
    //     const urlString = `http://localhost:8000/lists/${editListId}?name=${listName}&color=%23${hashRemovedColor}`;
    //     const res = await axios.put(urlString);
    //
    //     hideCreateListModalHandler();
    //     triggerApiFetch();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   // toggleButtonsAndForms("list");
    //   alert(`List "${toProperCase(listName)}" already exists`);
    // }
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

  const handleSetEditListId = (id) => {
    setEditListId(id);
  };

  const getListObjById = (id) => {
    const i = appData.lists.findIndex((list) => {
      return id === list._id;
    });

    return appData.lists[i];
  };

  const getHexObject = (hex) => {
    return listColors.filter((color) => {
      return color.hex === hex;
    });
  };

  const isModal = () => {
    let isModalBool = false;
    if (showCreateTaskModal || showEditListModal || showCreateListModal) {
      isModalBool = true;
    }

    return isModalBool;
  }

  return (
    <div className={`flex bg-[#FFFFF3] w-screen h-screen overflow-hidden`}>
      {showCreateListModal ? (
        <div
          className={`absolute flex z-10 w-full h-full justify-center items-center`}
        >
          <Modal
            className={``}
            hideFunc={hideCreateListModalHandler}
            modalTitle={`New Project`}
            autoFocusModal={autoFocusModal}
            modalRef={modalRef}
          >
            <CreateListForm
              handleListCreateSubmit={handleListCreateSubmit}
              hideFunc={hideCreateListModalHandler}
              listColors={listColors}
              // submitFunc={handleListCreateSubmit}
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
            <EditListForm
              listObj={getListObjById(editListId)}
              listColorObj={getHexObject(getListObjById(editListId).color)[0]}
              listColors={listColors}
              submitFunc={handleListEditSubmit}
              deleteFunc={handleDeleteList}
              toProperCase={toProperCase}
            />
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

      <div className={`${isModal() ? `opacity-50` : null} relative bg-blue-200 z-0 top-0 left-0 flex w-full h-full`}>
        <div className={`flex flex-col w-2/12 min-w-[250px] h-full bg-white`}>
          <SideMenu
            lists={appData.lists}
            toProperCase={toProperCase}
            displayedList={displayedList}
            handleChangeDisplayedList={handleChangeDisplayedList}
            showCreateListModalHandler={showCreateListModalHandler}
            handleDeleteList={handleDeleteList}
            showEditListModal={showEditListModalHandler}
            handleSetEditListId={handleSetEditListId}
          />
        </div>
        <div className={`w-10/12 h-full`}>
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
