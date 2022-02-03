import { useState } from "react";
import axios from "axios";

const CompletedCheckbox = ({ taskObj, handleCompletedChange}) => {

  return (
    <form>
      <input
        className={`w-[25px] h-[25px] `}
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
