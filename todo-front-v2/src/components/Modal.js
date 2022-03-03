import { XIcon } from '@heroicons/react/solid';

const Modal = ({hideFunc, children, modalTitle }) => {

  return (
    <div className={`h-4/6 w-4/12 min-w-[450px] bg-white shadow-md rounded-md`}>
      <div className={`w-full flex justify-end bg-blue-200 rounded-tl-md rounded-tr-md`}>
        <div className={`flex items-center w-full py-2 pl-4 `}>
          <h3 className={`text-lg font-semibold`}>{modalTitle}</h3>
        </div>
        <button className={`p-2 h-full `} onClick={hideFunc}>
          <XIcon
            className={`h-10 w-10  text-gray-500`}
          />
        </button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
