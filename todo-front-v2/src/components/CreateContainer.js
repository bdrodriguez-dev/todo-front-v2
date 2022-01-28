import TaskCard from "./TaskCard";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import CreateListForm from './CreateListForm';

const CreateContainer = ({ toProperCase, listArray, handleUpdateListArr }) => {
  const [taskCreateFormVisible, setTaskCreateFormVisible] = useState(false);
  const [listCreateFormVisible, setListCreateFormVisible] = useState(false);
  const [taskCreateButtonVisible, setTaskCreateButtonVisible] = useState(true);
  const [listCreateButtonVisible, setListCreateButtonVisible] = useState(true);

  const showTaskCreateButton = () => {
    setTaskCreateButtonVisible(true);
  };

  const hideTaskCreateButton = () => {
    setTaskCreateButtonVisible(false);
  };
  const showListCreateButton = () => {
    setListCreateButtonVisible(true);
  };

  const hideListCreateButton = () => {
    setListCreateButtonVisible(false);
  };

  const showTaskCreateForm = () => {
    setTaskCreateFormVisible(true);
  };

  const hideTaskCreateForm = () => {
    setTaskCreateFormVisible(false);
    showTaskCreateButton();
    showListCreateButton();
  };

  const showListCreateForm = () => {
    setListCreateFormVisible(true);
  };

  const hideListCreateForm = () => {
    setListCreateFormVisible(false);
    showTaskCreateButton();
    showListCreateButton();
  };

  const handleTaskCreateButtonClick = () => {
    hideListCreateButton();
    hideTaskCreateButton();
    hideListCreateForm();
    showTaskCreateForm();
  };

  const handleListCreateButtonClick = () => {
    hideListCreateButton();
    hideTaskCreateButton();
    hideTaskCreateForm();
    showListCreateForm();
  };

  // const handleTaskCreateSubmit = async (e) => {
  //   const task = e.target[0].value;
  //   const dueDate = e.target[1].value;
  //
  //   let dueDateQueryString = `&dueDate=${dueDate}`;
  //   if (!dueDate) {
  //     dueDateQueryString = "";
  //   }
  //
  //   try {
  //     await axios.post(
  //       `http://localhost:8000/todos?todo=${task}${dueDateQueryString}`
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handleTaskCreateSubmit = async (taskDescription, dueDate, selectedList) => {
    let dueDateQueryString = `&dueDate=${dueDate}`;
    if (!dueDate) {
      dueDateQueryString = "";
    }

    try {
      await axios.post(
        `http://localhost:8000/todos?todo=${taskDescription}${dueDateQueryString}&list=${selectedList}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleListCreateSubmit = (newList) => {
    if (newList !== "" && !listArray.includes(newList)) {
      handleUpdateListArr(newList);
    }
    hideListCreateForm();
  };

  return (
    <>
      {taskCreateButtonVisible ? (
        <Button
          type={`button`}
          onClick={handleTaskCreateButtonClick}
          buttonText={`Add new task`}
          variant={`neutral`}
        />
      ) : null}

      {listCreateButtonVisible ? (
        <Button
          type={`button`}
          onClick={handleListCreateButtonClick}
          buttonText={`Add new list`}
          variant={`neutral`}
        />
      ) : null}

      {taskCreateFormVisible ? (
        <TaskCard>
          <CreateTaskForm
            hideTaskCreateForm={hideTaskCreateForm}
            handleTaskCreateSubmit={handleTaskCreateSubmit}
            toProperCase={toProperCase}
            listArray={listArray}
          />
        </TaskCard>
      ) : null}

      {listCreateFormVisible ? (
        <TaskCard>
          <CreateListForm
            hideListCreateForm={hideListCreateForm}
            handleListCreateSubmit={handleListCreateSubmit}
            toProperCase={toProperCase}
            listArray={listArray}
          />
        </TaskCard>
      ) : null}
    </>
  );
};

export default CreateContainer;
