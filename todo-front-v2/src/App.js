import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "./components/TaskItem";
import CreateTask from "./components/CreateTask";
import TaskCard from "./components/TaskCard";
import EditTask from "./components/EditTask";
import TaskList from "./components/TaskList";

const App = () => {
  const [showTaskCreateForm, setShowTaskCreateForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  // const [showEditFormArr, setShowEditFormArr] = useState([]);

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

  const handleDelete = async (id) => {
    const deletedTodo = await axios.delete(`http://localhost:8000/todos/${id}`);
    setDeleteFlag(!deleteFlag);
  };

  const handleSubmit = async (e) => {
    const task = e.target[0].value;
    const dueDate = e.target[1].value;

    try {
      await axios.post(
        `http://localhost:8000/todos?todo=${task}&dueDate=${dueDate}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  // const hideEditForm = (id) => {
  //     showEditFormArr.forEach((showEditFormObj, i) => {
  //         if (showEditFormObj._id === id) {
  //             const showEditFormArrCopy = showEditFormArr;
  //             showEditFormArrCopy[i].showEditForm = false;
  //             setShowEditFormArr(showEditFormArrCopy);
  //         }
  //     })
  // };

  return (
    <>
      <h1 className={`text-3xl`}>Array of Zero [0]</h1>
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        setTasks={setTasks}
        showTaskCreateForm={showTaskCreateForm}
        setShowTaskCreateForm={setShowTaskCreateForm}
        handleSubmit={handleSubmit}
        // showEditFormArr={showEditFormArr}
        // toggleEditableTaskItems={toggleEditableTaskItems}
        // hideEditForm={hideEditForm}
      />

      {/* Button: Create new task */}
      {!showTaskCreateForm ? (
        <div className={`flex flex-col items-center`}>
          <button
            className={`text-3xl bg-blue-300 w-12 h-12`}
            onClick={() => {
              setShowTaskCreateForm(true);
            }}
          >
            +
          </button>
        </div>
      ) : null}
    </>
  );
};

export default App;
