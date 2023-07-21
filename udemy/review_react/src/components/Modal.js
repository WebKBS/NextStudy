const Modal = ({ onCancel, onConfirm }) => {
  const cancelHandler = () => {
    onCancel();
  };

  const confirmHandler = () => {
    onConfirm();
  };
  return (
    <div className="modal">
      <p>Are you sure?</p>
      <button className="btn btn--alt" onClick={cancelHandler}>
        Cancel
      </button>
      <button className="btn" onClick={confirmHandler}>
        Delete
      </button>
    </div>
  );
};

export default Modal;
