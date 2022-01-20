import axios from "axios";
import { XCircleIcon } from "@heroicons/react/solid";
import Button from "./ui/Button";

const CreateTask = ({ hideCreateForm, handleCreateSubmit }) => {
  return (
    <form
      className={`w-full p-4 flex flex-col justify-between`}
      onSubmit={handleCreateSubmit}
    >
      {/* Inputs */}
      <div className={"flex flex-col w-4/5"}>
        <input
          type={`text`}
          className={`text-xl font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
          autoFocus
        />
        <input
          type={`date`}
          className={`text-xl font-bold p-2 my-2 rounded-md w-3/12 border-2 border-blue-300 focus:outline-0`}
        />
      </div>
      {/* Buttons */}
      <div className={`flex justify-center items-center `}>
        <Button type={`submit`} buttonText={`Save`} variant={`primary`} />
        <Button
          type={`button`}
          buttonText={`Cancel`}
          variant={`neutral`}
          onClick={hideCreateForm}
        />
      </div>
    </form>
  );
};

export default CreateTask;
