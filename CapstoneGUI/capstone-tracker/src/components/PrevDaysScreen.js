import React, { useState } from "react";
import DayView from "./DayView";
import { Redirect } from "react-router";
import axios from "axios";

const PrevDaysScreen = props => {
  const [curIndex, setCurIndex] = useState(0);
  const capstoneInfo = props.capstone;
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info ? info : {};
  const [days, setDays] = useState([]);
  let dayArr = [];

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

  const getDays = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/Capstone/${capstoneInfo}/Days`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.days)
      .then(res => setDays(res))
      .catch(error => console.log(error));
  };

  getDays();

  if (days) {
    dayArr = days.filter(
      d =>
        new Date(d.date).toISOString().split("T")[0] !==
        new Date().toISOString().split("T")[0]
    );
  }
  // console.log(dayArr);
  return localStorage.getItem("info") ? (
    dayArr.length > 0 ? (
      <>
        <div className="root-display-container center">
          <div>
            <div className="left-arrow" onClick={decCurIndexChange}>
              <div className="left-arrow-top"></div>
              <div className="left-arrow-bottom"></div>
            </div>
          </div>
          <div className="current">
            <DayView day={dayArr[curIndex]} glow={true} current={false} />
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
      <>
        <div className="root-container">
          <div className="box-container">
            <div className="inner-container">
              <div className="header">No days Found</div>
              <div className="box"></div>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default PrevDaysScreen;
