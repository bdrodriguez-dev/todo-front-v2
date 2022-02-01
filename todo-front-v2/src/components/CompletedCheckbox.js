import { useState } from "react";
import axios from "axios";

const CompletedCheckbox = ({ taskObj, handleCompletedChange}) => {
  // const [completed, setCompleted] = useState(taskObj.completed);

  return (
    <form>
      <input
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
