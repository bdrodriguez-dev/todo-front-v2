import { useState } from "react";
import axios from "axios";

const CompletedCheckbox = ({ taskObj, handleCompletedChange}) => {

  // const handleCompletedChange = async (id, updatedCompleted) => {
  //   //put request
  //   try {
  //     await axios.put(
  //       `http://localhost:8000/todos/${id}?completed=${updatedCompleted}`
  //     );
  //     triggerApiFetch();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form>
      <input
        className={`w-[25px] h-[25px]`}
        type={`checkbox`}
        checked={taskObj.completed}
        onChange={() => {
          handleCompletedChange(taskObj._id, !taskObj.completed);
        }}
      />
    </form>
  );
};

export default CompletedCheckbox;
