import Button from "./ui/Button";
import {useState} from "react";

const CreateTask = ({hideCreateForm, handleCreateSubmit, toProperCase}) => {
    const [selectedList, setSelectedList] = useState();
    const [listArray, setListArray] = useState(["inbox"]);
    const [showListSelect, setShowListSelect] = useState(false);

    const handleSelectChange = (e) => {
        const newSelectedList = e.target.value;
        setSelectedList(newSelectedList);
    };

    return (
        <form
            className={`w-full p-4 flex flex-col justify-between`}
            onSubmit={handleCreateSubmit}
        >
            {/* Inputs */}
            <div className={`flex flex-col w-4/5 mb-10`}>
                {/* Task description */}
                <input
                    type={`text`}
                    className={`font-bold py-2 px-4 my-2 mr-2 rounded-md border-2 border-blue-300`}
                    autoFocus
                />
                <div className={`flex items-center`}>{/* Task dueDate*/}
                    <input
                        type={`date`}
                        className={`font-bold py-2 px-2 my-2 mr-2 rounded-md w-4/12 border-2 border-blue-300`}
                    />
                    {/*  List */}
                    <select
                        value={selectedList}
                        onChange={handleSelectChange}
                        className={`appearance-none font-bold py-2 px-2 my-2 mr-2 rounded-md w-max border-2 border-blue-300`}
                    >
                        {listArray.map((list) => {
                            return <option value={list}>{toProperCase(list)}</option>;
                        })}
                    </select>
                    <Button type={`button`} buttonText={`Add new list`} variant={`neutral`} />
                </div>
            </div>
            <hr />
            {/* Buttons */}
            <div className={`flex justify-center items-center mt-4`}>
                <Button type={`submit`} buttonText={`Save`} variant={`primary`}/>
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
