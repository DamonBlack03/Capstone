import React, { useState } from "react";
import DayView from "./DayView";
import { Redirect } from "react-router";
import axios from "axios";

const CurrentDayDisplay = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info ? info : {};
  let curDay = {
    capstoneId: 5,
    date: "2020-03-09T00:00:00",
    dayNumber: 63,
    totalMinutesWorked: 180,
    totalMinutesBusy: 30,
    totalMinutesSleep: 480,
    totalMinutesFun: 180,
    successul: true
  };
  const [listDays, setListDays] = useState({});

  const getDays = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/Capstone/5/Days`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data)
      .then(res => setListDays(res)) //console.log(res)) //res.data.days)
      .catch(error => console.log(error));
  };
  getDays();
  const { days /*tasks*/ } = listDays;
  // console.log(days);
  if (days) {
    // console.log(curDay);
    curDay = days.filter(
      d => new Date(d.date).toDateString() === new Date().toDateString()
    )[0];
    // console.log(curDay);
  }
  const {
    date,
    dayNumber,
    totalMinutesWorked,
    totalMinutesBusy,
    totalMinutesSleep,
    totalMinutesFun,
    successful
  } = curDay;

  // console.log(days);
  // console.log(curDay);
  let tasks = [];
  return localStorage.getItem("info") ? (
    <>
      <div className="root-container center">
        <div
          className={
            curDay.successful ? "good-box-container" : "bad-box-container"
          }
        >
          <div className="header">CurrentDay</div>

          <DayView
            date={date}
            dayNum={dayNumber}
            worked={totalMinutesWorked / 60}
            busy={totalMinutesBusy / 60}
            sleep={totalMinutesSleep / 60}
            fun={totalMinutesFun / 60}
            successful={successful}
            tasks={tasks}
            glow={false}
            current={true}
          />

          <button className="login-btn">Edit</button>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default CurrentDayDisplay;
