const Modal = ({ message, setUserExist }) => {

  const closeModal = () => {
    setUserExist(false);
  }

  return (
    <div className="modal-container">
      <div className="message-container">
        <div className="modal-header">
          <button onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="modal-content">
          <h3>{ message }</h3>
        </div>
      </div>
    </div>
  )
};

export default Modal;