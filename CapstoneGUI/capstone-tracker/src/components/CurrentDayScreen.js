import React, { useState } from "react";
import DayView from "./DayView";
import { Redirect } from "react-router";
import axios from "axios";

const CurrentDayDisplay = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info;
  const [curDay, setCurDay] = useState({});

  const getDays = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/Capstone/${props.capstoneId}/Days`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => console.log(res)) //res.data.days)
      .then(res => (res.length > 1 ? res[res.length - 1] : res[0]))
      .catch(error => console.log(error));
  };

  const getCurDay = () => {
    const curDate = new Date();
    // const temp = days.filter(
    //   d => new Date(d.date).toDateString() !== curDate.todateString()
    // );
    // if (temp.length === 0) {
    //   const lastDay = new Date(temp.pop());
    //loop from that date until current date and add them all to the database
    //for now just add the current day
    setCurDay({
      capstoneId: 5,
      dayId: 1,
      totalMinutesWorked: 0,
      totalMinutesBusy: 0,
      totalMinutesSleep: 0,
      totalMinutesFun: 0,
      date: curDate.toDateString(),
      onTrack: true
    });
    // } else {
    //   //set the curent day to the last day of temp
    //   setCurDay(temp.pop());
    // }
  };

  getDays();

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
  console.log(curDay);
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
