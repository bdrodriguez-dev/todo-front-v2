import { DotsHorizontalIcon } from "@heroicons/react/solid";

const SideMenu = ({ lists, toProperCase, handleChangeDisplayedList, displayedList }) => {
  return (
    <nav className={`w-full`}>
      <div
        className={`w-full flex flex-col items-center my-4`}
      >
        <h1 className={`text-2xl`}>[0]</h1>
        <h2 className={`text-xl`}>Array of Zero</h2>
      </div>
      <div className={`flex flex-col mt-28 mx-4`}>
        <div className={`mb-2`}>
          <h3 className={`text-lg font-semibold`}>Projects</h3>

        </div>
        <ul className={``}>
          {lists.map((list) => {
            return (
              <li className={`w-full my-2 flex justify-between ${displayedList === list.name ? "bg-slate-400" : null} `}>
                <button
                  className={`text-left whitespace-nowrap overflow-hidden text-ellipsis w-8/12`}
                  onClick={() => handleChangeDisplayedList(list.name)}
                >
                  {toProperCase(list.name)}
                </button>
                <button>
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
