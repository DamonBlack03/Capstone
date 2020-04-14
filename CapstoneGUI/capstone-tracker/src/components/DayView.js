import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import TaskView from "./TaskView";

const DayView = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token, user } = info ? info : {};
  // const userId = user ? user : {}
  const [modalIsOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const day = props.day;
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
  const getTasks = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/Day/${day.dayId}/Tasks`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.tasks)
      .then(res => setTasks(res))
      .catch(error => console.log(error));
  };

  getTasks();

  var items = [];
  // console.log(`Info: ${props.tasks}`);
  if (tasks) {
    // console.log("yes");
    tasks.forEach(element => {
      items.push(<TaskView taskInfo={element} />);
    });
  }
  // console.log(tasks);
  return (
    <>
      <div
        className={
          props.current
            ? "current-box-container"
            : props.glow
            ? day.successful
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
          <div className="display-view">Day {day.dayNumber}</div>
          <div className="display-view">
            <label className="display-label">
              Date:{new Date(day.date).toDateString()}
            </label>
            <label className="display-label">
              Hours Worked: {(day.totalMinutesWorked / 60).toFixed(2)}
            </label>
            <label className="display-label">
              Hours Busy: {(day.totalMinutesBusy / 60).toFixed(2)}
            </label>
            <label className="display-label">
              Hours Sleep: {(day.totalMinutesSleep / 60).toFixed(2)}
            </label>
            <label className="display-label">
              Hours Fun: {(day.totalMinutesFun / 60).toFixed(2)}
            </label>
            <label className="display-label">
              Successful: {day.successful ? "yes" : "no"}
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
