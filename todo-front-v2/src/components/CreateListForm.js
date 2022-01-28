import ListSelect from "./ListSelect/ListSelect";
import Button from "./ui/Button";
import { useState } from 'react';

const CreateListForm = ({
  hideListCreateForm,
  handleListCreateSubmit,
}) => {
  const [newList, setNewList] = useState('');

  const handleNewListChange = (e) => {
    setNewList(e.target.value);
  };

  return (
    <form
      className={`w-full p-4 flex flex-col justify-between`}
      onSubmit={(e) => {
        e.preventDefault();
        handleListCreateSubmit(newList);
      }}
    >
      {/* Inputs */}
      <div className={`flex flex-col w-4/5 mb-10`}>
        {/* List Name */}
        <input
          type={`text`}
          className={`font-bold py-2 px-4 my-2 mr-2 rounded-md border-2 border-blue-300`}
          value={newList}
          onChange={handleNewListChange}
          autoFocus
        />
        <hr />
        {/* Buttons */}
        <div className={`flex justify-center items-center mt-4`}>
          <Button type={`submit`} buttonText={`Save`} variant={`primary`} />
          <Button
            type={`button`}
            buttonText={`Cancel`}
            variant={`neutral`}
            onClick={hideListCreateForm}
          />
        </div>
      </div>
    </form>
  );
};

export default CreateListForm;
