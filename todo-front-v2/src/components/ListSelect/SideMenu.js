import { DotsHorizontalIcon } from "@heroicons/react/solid";
import Modal from '../Modal';
import { useEffect, useState } from 'react';

const SideMenu = ({ lists, toProperCase, handleChangeDisplayedList, displayedList }) => {
  const [showListEditModalArr, setShowListEditModalArr] = useState([]);

  useEffect(() => {
    let showListEditModalArrTemp = lists.map(listObj => {
      return {
        id: listObj._id,
        showListEditModal: false,
      };
    });
    setShowListEditModalArr(showListEditModalArrTemp)
  }, [lists]);

  const toggleListModals = (id) => {
    const showListEditModalArrCopy = [...showListEditModalArr];
    showListEditModalArrCopy.forEach(showListModalObj => {
      if (showListModalObj.id === id) {
        showListModalObj.showListEditModal = true;
      } else {
        showListModalObj.showListEditModal = false;
      }
    });
    setShowListEditModalArr(showListEditModalArrCopy);
  }

  const hideListEditModal = (id) => {
    let listEditModalCopy = [...showListEditModalArr];
    let i = listEditModalCopy.findIndex(modal => {
      return modal.id === id;
    });
    listEditModalCopy[i].showListEditModal = false;
    setShowListEditModalArr(listEditModalCopy);
  };

  return (
    <nav className={`w-full`}>
      <div className={`w-full flex flex-col items-center my-4`}>
        <h1 className={`text-2xl`}>[0]</h1>
        <h2 className={`text-xl`}>Array of Zero</h2>
      </div>
      <div className={`flex flex-col mt-28 mx-4`}>
        <div className={`mb-2`}>
          <h3 className={`text-lg font-semibold`}>Projects</h3>
        </div>
        { showListEditModalArr.length === lists.length ?
          <ul className={``}>
            {lists.map((list) => {
              const showListEditModalBool = showListEditModalArr.find(
                (showListModalObj) => {
                  return list._id === showListModalObj.id;
                }
              ).showListEditModal;
              return (
                <li
                  className={`w-full my-2 flex justify-between ${
                    displayedList === list.name ? "bg-slate-400" : null
                  } `}
                  key={list._id}
                >
                  <button
                    className={`text-left whitespace-nowrap overflow-hidden text-ellipsis w-8/12`}
                    onClick={() => handleChangeDisplayedList(list.name)}
                  >
                    {toProperCase(list.name)}
                  </button>

                    {!showListEditModalBool ? (
                      <button onClick={() => toggleListModals(list._id)}><DotsHorizontalIcon className={`h-5 w-5 text-blue-500`} /></button>
                    ) : (
                      <div
                        className={`absolute flex z-10 w-96 h-96 justify-center items-center bg-white shadow-md rounded-md`}
                      >
                        <Modal hideModal={() => hideListEditModal(list._id)} />
                      </div>
                    )}
                </li>
              );
            })}
          </ul> : null
        }
      </div>
    </nav>
  );
};

export default SideMenu;
