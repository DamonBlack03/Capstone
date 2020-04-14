import React, { useState } from "react";
import DayView from "./DayView";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import TaskPopUp from "./TaskPopUp";
import Modal from "react-modal";

const CurrentDayDisplay = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info ? info : {};
  const capstoneInfo = props.capstone;
  const [dayArr, setDayArr] = useState([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  let curDay = {};
  const history = useHistory();

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

  const createDay = () => {
    axios({
      method: "post",
      url: `https://localhost:44343/api/User/Capstone/${capstoneInfo}/Day`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        capstoneId: capstoneInfo,
        date: new Date().toISOString().split("T")[0],
        totalMinutesWorked: 0,
        totalMinutesBusy: 0,
        totalMinutesSleep: 0,
        totalMinutesFun: 0,
        successful: false
      }
    })
      .then(() => history.push("/currentDay"))
      .catch(error => console.log(error));
  };

  const getDay = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/Capstone/${capstoneInfo}/Days`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.days)
      .then(res => setDayArr(res))
      .catch(error => console.log(error));
  };

  getDay();

  if (dayArr) {
    let temp = dayArr.filter(
      d =>
        new Date(d.date).toISOString().split("T")[0] ===
        new Date().toISOString().split("T")[0]
    );
    if (temp.length > 0) {
      curDay = temp[0];
    } else {
      curDay = undefined;
    }
  }

  // console.log(dayArr);
  // console.log(curDay);

  return localStorage.getItem("info") ? (
    curDay ? (
      <>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          className="modal"
          contentLabel="Example Modal"
        >
          <div className="box">
            <label className="modal-header">Task Form</label>
            {<TaskPopUp day={curDay} click={closeModal} />}
          </div>
        </Modal>
        <div className="root-container center">
          <div
            className={
              curDay.successful ? "good-box-container" : "bad-box-container"
            }
          >
            <div className="header">CurrentDay</div>

            <DayView day={curDay} glow={false} current={true} />

            <button className="login-btn" onClick={openPopup}>
              Edit Tasks
            </button>
          </div>
        </div>
      </>
    ) : (
      <div className="root-container center">
        <div className="box-container">
          <div className="inner-container">
            <div className="box">
              <button onClick={createDay} className="login-btn">
                Create Day
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default CurrentDayDisplay;
