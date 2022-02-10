const Modal = ({hideModal}) => {
  return (
    <div className={`h-4/6 w-4/6`}>
      <p>Modal</p>
      <button onClick={hideModal} >Cancel</button>
    </div>
  );
};

export default Modal;
