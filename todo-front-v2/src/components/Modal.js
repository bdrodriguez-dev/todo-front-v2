import { XIcon } from '@heroicons/react/solid';

const Modal = ({ className, hideFunc, submitFunc, children, modalTitle }) => {
  return (
    <div className={`h-4/6 w-2/6 bg-white shadow-md rounded-md `}>
      <div className={`w-full flex justify-end bg-blue-50`}>
        <div className={`flex items-center w-full p-2`}>
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
