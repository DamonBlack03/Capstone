import React, { useState } from "react";
import Modal from "react-modal";
import TaskView from "./TaskView";

const DayView = props => {
  const [modalIsOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const openPopup = () => {
    openModal();
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setModalOpen(false);
  };

  var items = [];
  // console.log(`Info: ${props.tasks}`);
  if (props.tasks) {
    console.log("yes");
  }
  props.tasks.forEach(element => {
    items.push(<TaskView taskInfo={element} />);
  });

  return (
    <>
      <div
        className={
          props.current
            ? "current-box-container"
            : props.glow
            ? props.successful
              ? "good-box-container"
              : "bad-box-container"
            : "box-container"
        }
      >
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          //style={customStyles}
          className="modal"
          contentLabel="Example Modal"
        >
          <div className="box">
            <label className="modal-header">Tasks</label>
          </div>
          {items}
        </Modal>

        <div className="box">
          <div className="display-view">Day {props.dayNum}</div>
          <div className="display-view">
            <label className="display-label">
              Date: {new Date(props.date).toDateString()}
            </label>
            <label className="display-label">
              Hours Worked: {props.worked}
            </label>
            <label className="display-label">Hours Busy: {props.busy}</label>
            <label className="display-label">Hours Sleep: {props.sleep}</label>
            <label className="display-label">Hours Fun: {props.fun}</label>
            <label className="display-label">
              Successful: {props.successful ? "yes" : "no"}
            </label>
          </div>
          <button type="button" className="login-btn" onClick={openPopup}>
            Show Tasks
          </button>
        </div>
      </div>
    </>
  );
};

export default DayView;
