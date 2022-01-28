import TaskCard from "./TaskCard";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import CreateListForm from './CreateListForm';

const CreateContainer = ({ toProperCase, lists, handleUpdateListArr }) => {
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

  const handleListCreateSubmit = async (newList) => {
    const checkForExistingList = (newList) => {
      let appearsInList = false;
      lists.forEach(list => {
        if (list.name === newList) {
          appearsInList = true;
          return appearsInList;
        }
      });
      return appearsInList;
    };
    if (newList !== "" && !checkForExistingList(newList)) {
      try {
        await axios.post(`http://localhost:8000/lists?name=${newList}`)
      } catch (error) {
        console.log(error);
      }
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
            lists={lists}
          />
        </TaskCard>
      ) : null}

      {listCreateFormVisible ? (
        <TaskCard>
          <CreateListForm
            hideListCreateForm={hideListCreateForm}
            handleListCreateSubmit={handleListCreateSubmit}
            toProperCase={toProperCase}
            lists={lists}
          />
        </TaskCard>
      ) : null}
    </>
  );
};

export default CreateContainer;
