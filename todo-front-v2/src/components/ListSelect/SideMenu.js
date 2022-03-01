import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { PlusIcon } from "@heroicons/react/solid";
import Modal from "../Modal";
import { useEffect, useState } from "react";
import ColoredListCircle from "../ui/Select/Option/ColoredListCircle";

const SideMenu = ({
  lists,
  toProperCase,
  handleChangeDisplayedList,
  displayedList,
  showCreateListModalHandler,
  handleDeleteList,
  showEditListModal,
}) => {
  const [showListEditModalArr, setShowListEditModalArr] = useState([]);

  return (
    <nav className={`w-full`}>
      <div className={`w-full flex flex-col items-center my-4`}>
        <h1 className={`text-4xl`}>[0]</h1>
        <h2 className={`text-xl`}>Array of Zero</h2>
      </div>
      <div className={`flex flex-col mt-28 mx-4`}>
        <div className={`mb-2 flex justify-between items-center`}>
          <h3 className={`text-lg font-semibold`}>Projects</h3>
          <button
            className={`hover:bg-slate-200 p-2 rounded-md`}
            onClick={showCreateListModalHandler}
          >
            <PlusIcon className={`h-5 w-5 text-blue-500`} />
          </button>
        </div>
        <ul className={``}>
          {lists.map((list) => {
            return (
              <li
                className={`hover:bg-slate-200  w-full my-2 flex justify-between p-2 rounded-md ${
                  displayedList === list.name ? "bg-slate-200" : null
                } `}
                key={list._id}
              >
                <button
                  className={`text-left whitespace-nowrap overflow-hidden text-ellipsis w-8/12 flex items-center`}
                  onClick={() => handleChangeDisplayedList(list.name)}
                >
                  <ColoredListCircle hex={list.color} />
                  <p className={`ml-4`}>{toProperCase(list.name)}</p>
                </button>

                {/*{!showListEditModalBool ? (*/}
                <button onClick={() => showEditListModal(list._id)}>
                  <DotsHorizontalIcon className={`h-5 w-5 text-blue-500`} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;
