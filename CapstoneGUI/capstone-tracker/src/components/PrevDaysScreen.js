import React, { useState } from "react";
import DayView from "./DayView";
import { Redirect } from "react-router";
import axios from "axios";

const PrevDaysScreen = props => {
  const [curIndex, setCurIndex] = useState(0);
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info ? info : {};
  // const [days, setDays] = useState([]);
  let dayArr = [];
  let allTaskArr = [];
  let taskArr = [];
  // const [curDay, setCurDay] = useState(props.days[0]);

  const incCurIndexChange = () => {
    let temp = curIndex;
    if (temp === dayArr.length - 1) {
      temp = 0;
    } else {
      temp += 1;
    }
    setCurIndex(temp);
  };

  const decCurIndexChange = () => {
    let temp = curIndex;
    if (temp === 0) {
      temp = dayArr.length - 1;
    } else {
      temp -= 1;
    }
    setCurIndex(temp);
  };

  const [listDays, setListDays] = useState({});

  const getDays = () => {
    axios({
      method: "gett",
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
  const { days, tasks } = listDays;
  // console.log(tasks);

  if (days) {
    // console.log(curDay);
    dayArr = days.filter(
      d => new Date(d.date).toDateString() !== new Date().toDateString()
    );
    // console.log(curDay);
  } else {
    dayArr = [
      {
        capstoneId: 5,
        date: "2020-03-09T00:00:00",
        dayNumber: 63,
        totalMinutesWorked: 180,
        totalMinutesBusy: 30,
        totalMinutesSleep: 480,
        totalMinutesFun: 180,
        successul: true
      }
    ];
  }

  // console.log(tasks);
  if (tasks) {
    allTaskArr = tasks;
  } else {
    allTaskArr = [
      [
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: false
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        }
      ],
      [
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: false
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        },
        {
          category: "Work",
          startTime: new Date(),
          endTime: new Date(),
          minutes: 0,
          inProgress: true
        }
      ]
    ];
  }
  if (allTaskArr) {
    taskArr = allTaskArr[curIndex];
  } else {
    taskArr = [
      {
        category: "Work",
        startTime: new Date(),
        endTime: new Date(),
        minutes: 0,
        inProgress: false
      },
      {
        category: "Work",
        startTime: new Date(),
        endTime: new Date(),
        minutes: 0,
        inProgress: true
      },
      {
        category: "Work",
        startTime: new Date(),
        endTime: new Date(),
        minutes: 0,
        inProgress: true
      },
      {
        category: "Work",
        startTime: new Date(),
        endTime: new Date(),
        minutes: 0,
        inProgress: true
      }
    ];
  }

  // getDays();
  console.log(taskArr);
  return localStorage.getItem("info") ? (
    <>
      <div className="root-display-container center">
        <div>
          <div className="left-arrow" onClick={decCurIndexChange}>
            <div className="left-arrow-top"></div>
            <div className="left-arrow-bottom"></div>
          </div>
        </div>
        <div className="current">
          <DayView
            date={dayArr[curIndex].date}
            dayNum={dayArr[curIndex].dayNumber}
            worked={dayArr[curIndex].totalMinutesWorked / 60}
            busy={dayArr[curIndex].totalMinutesBusy / 60}
            sleep={dayArr[curIndex].totalMinutesSleep / 60}
            fun={dayArr[curIndex].totalMinutesFun / 60}
            successful={dayArr[curIndex].successful}
            tasks={taskArr}
            glow={true}
            current={false}
          />
        </div>

        <div>
          <div className="right-arrow" onClick={incCurIndexChange}>
            <div className="right-arrow-top"></div>
            <div className="right-arrow-bottom"></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default PrevDaysScreen;
