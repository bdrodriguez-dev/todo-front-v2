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

  // useEffect(() => {
  //   let showListEditModalArrTemp = lists.map((listObj) => {
  //     return {
  //       id: listObj._id,
  //       showListEditModal: false,
  //     };
  //   });
  //   setShowListEditModalArr(showListEditModalArrTemp);
  // }, [lists]);

  // const toggleListModals = (id) => {
  //   const showListEditModalArrCopy = [...showListEditModalArr];
  //   showListEditModalArrCopy.forEach((showListModalObj) => {
  //     if (showListModalObj.id === id) {
  //       showListModalObj.showListEditModal = true;
  //     } else {
  //       showListModalObj.showListEditModal = false;
  //     }
  //   });
  //   setShowListEditModalArr(showListEditModalArrCopy);
  // };

  // const hideListEditModal = (id) => {
  //   let listEditModalCopy = [...showListEditModalArr];
  //   let i = listEditModalCopy.findIndex((modal) => {
  //     return modal.id === id;
  //   });
  //   listEditModalCopy[i].showListEditModal = false;
  //   setShowListEditModalArr(listEditModalCopy);
  // };

  return (
    <nav className={`w-full`}>
      <div className={`w-full flex flex-col items-center my-4`}>
        <h1 className={`text-4xl`}>[0]</h1>
        <h2 className={`text-xl`}>Array of Zero</h2>
      </div>
      <div className={`flex flex-col mt-28 mx-4`}>
        <div className={`mb-2 flex justify-between items-center p-2`}>
          <h3 className={`text-lg font-semibold`}>Projects</h3>
          <button onClick={showCreateListModalHandler}>
            <PlusIcon className={`h-5 w-5 text-blue-500`} />
          </button>
        </div>
        {/*{showListEditModalArr.length === lists.length ? (*/}
        <ul className={``}>
          {lists.map((list) => {
            // const showListEditModalBool = showListEditModalArr.find(
            //   (showListModalObj) => {
            //     return list._id === showListModalObj.id;
            //   }
            // ).showListEditModal;
            return (
              <li
                className={`w-full my-2 flex justify-between p-2 rounded-md ${
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
                {/*) : (*/}
                {/*  <div*/}
                {/*    className={`absolute flex z-10 w-96 h-96 justify-center items-center bg-white shadow-md rounded-md border-dashed border-2 border-red-300`}*/}
                {/*  >*/}
                {/*    <Modal*/}
                {/*      hideFunc={() => hideListEditModal(list._id)}*/}
                {/*    >*/}
                {/*      <p>Edit List Modal</p>*/}
                {/*      <button onClick={() => handleDeleteList(list._id)}>Delete</button>*/}
                {/*    </Modal>*/}
                {/*  </div>*/}
                {/*)}*/}
              </li>
            );
          })}
        </ul>
        {/*) : null}*/}
      </div>
    </nav>
  );
};

export default SideMenu;