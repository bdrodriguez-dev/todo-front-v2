import TaskCard from "./TaskCard";
import CreateTaskForm from "./CreateTaskForm";
import { useState } from "react";
import axios from "axios";
import Button from "./ui/Button";
import CreateListForm from "./CreateListForm";

const CreateContainer = ({
  toProperCase,
  lists,
  handleUpdateListArr,
  updateStateForRerenderAfterCreate,
  triggerApiFetch,
}) => {
  const [UIVisibility, setUIVisibility] = useState({
    taskCreateFormVisible: false,
    listCreateFormVisible: false,
    buttonsVisible: true,
  });

  const toggleButtonsAndForms = (formType) => {
    const buttonState = UIVisibility.buttonsVisible;
    const taskFormState = UIVisibility.taskCreateFormVisible;
    const listFormState = UIVisibility.listCreateFormVisible;

    let updatedUIState = {};
    if (formType === "task") {
      updatedUIState = {
        ...UIVisibility,
        buttonsVisible: !buttonState,
        taskCreateFormVisible: !taskFormState,
      };
    } else if (formType === "list") {
      updatedUIState = {
        ...UIVisibility,
        buttonsVisible: !buttonState,
        listCreateFormVisible: !listFormState,
      };
    }
    setUIVisibility(updatedUIState);
  };

  const handleTaskCreateSubmit = async (
    taskDescription,
    dueDate,
    selectedList
  ) => {
    let dueDateQueryString = `&dueDate=${dueDate}`;
    if (!dueDate) {
      dueDateQueryString = "";
    }

    try {
      await axios.post(
        `http://localhost:8000/todos?todo=${taskDescription}${dueDateQueryString}&list=${selectedList}`
      );
      toggleButtonsAndForms("task");
      triggerApiFetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleListCreateSubmit = async (newList) => {
    const checkForExistingList = (newList) => {
      let appearsInList = false;
      lists.forEach((list) => {
        if (list.name === newList) {
          appearsInList = true;
          return appearsInList;
        }
      });
      return appearsInList;
    };
    if (newList !== "" && !checkForExistingList(newList)) {
      try {
        await axios.post(`http://localhost:8000/lists?name=${newList}`);
        toggleButtonsAndForms("list");
        triggerApiFetch();
      } catch (error) {
        console.log(error);
      }
    } else {
      toggleButtonsAndForms("list");
      alert(`List "${toProperCase(newList)}" already exists`);
    }
  };

  return (
    <>
      {UIVisibility.buttonsVisible ? (
        <>
          <Button
            type={`button`}
            onClick={() => toggleButtonsAndForms("task")}
            buttonText={`Add new task`}
            variant={`neutral`}
          />

          <Button
            type={`button`}
            onClick={() => toggleButtonsAndForms("list")}
            buttonText={`Add new list`}
            variant={`neutral`}
          />
        </>
      ) : null}

      {UIVisibility.taskCreateFormVisible ? (
        <TaskCard>
          <CreateTaskForm
            hideTaskCreateForm={() => toggleButtonsAndForms("task")}
            handleTaskCreateSubmit={handleTaskCreateSubmit}
            toProperCase={toProperCase}
            lists={lists}
            updateStateForRerenderAfterCreate={
              updateStateForRerenderAfterCreate
            }
          />
        </TaskCard>
      ) : null}

      {UIVisibility.listCreateFormVisible ? (
        <TaskCard>
          <CreateListForm
            hideListCreateForm={() => toggleButtonsAndForms("list")}
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
