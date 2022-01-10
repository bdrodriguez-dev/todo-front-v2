import axios from 'axios';
import {XCircleIcon} from '@heroicons/react/solid';

const CreateTask = ({hide}) => {
    const handleSubmit = async (e) => {

        const task = e.target[0].value;
        const dueDate = e.target[1].value;

        try {
            await axios.post(`http://localhost:8000/todos?todo=${task}&dueDate=${dueDate}`);
        } catch (e) {
            console.log(e);
        }
    }

    return <div
        className={`mx-6 my-2 shadow-md hover:translate-y-0.5 rounded-md`}>
            <form
                className={`w-full p-4 flex justify-between`}
                onSubmit={handleSubmit}
            >
                {/* Inputs */}
                <div className={'flex flex-col w-4/5'}>
                    <input type={`text`}
                           className={`text-xl font-bold p-2 my-2 rounded-md border-2 border-blue-300 focus:outline-0`}
                           autoFocus/>
                    <input type={`date`}
                           className={`text-xl font-bold p-2 my-2 rounded-md w-3/12 border-2 border-blue-300 focus:outline-0`}/></div>
                {/* Buttons */}
                <div className={`w-[100px] flex flex-col justify-center items-center `}>
                    <button type={`submit`}
                            className={`border-2 border-blue-300 bg-blue-600 text-white my-4 mx-4 p-2 rounded-md`}>
                        Save
                    </button>
                    <button type={`button`} className={`p-2`} onClick={hide}>
                        <XCircleIcon className={`h-10 w-10 my-4 text-red-600`} />
                    </button>
                </div>
            </form>
    </div>;
};

export default CreateTask;