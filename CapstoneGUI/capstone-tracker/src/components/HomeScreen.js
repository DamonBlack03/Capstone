import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { CRUDCommands } from "./CRUDCommands";

const HomeScreen = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token } = info;
  //const capstoneId = props.capstoneId;
  const userId = props.userId;
  const [capstoneInfo, setCapstoneInfo] = useState({});

  const getCapstone = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/${userId}/Capstones`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.capstones[0])
      .then(res => setCapstoneInfo(res))
      .catch(error => console.log(error));
  };

  getCapstone();

  // console.log(capstoneInfo);

  return localStorage.getItem("info") ? (
    <>
      <div className="root-container center">
        <div
          className={
            capstoneInfo.onTrack ? "good-box-container" : "bad-box-container"
          }
        >
          <div className="box">
            <div className="inner-container">
              <div className="header">Overall Progress</div>
              <div className="display-view">
                <label className="display-label">
                  Name: {capstoneInfo.name}
                </label>
                <label className="display-label">
                  Description: {capstoneInfo.description}
                </label>
                <label className="display-label">
                  Hours Worked: {capstoneInfo.totalMinutesWorked / 60}
                </label>
                <label className="display-label">
                  Hours Busy: {capstoneInfo.totalMinutesBusy / 60}
                </label>
                <label className="display-label">
                  Hours Sleep: {capstoneInfo.totalMinutesSleep / 60}
                </label>
                <label className="display-label">
                  Hours Fun: {capstoneInfo.totalMinutesFun / 60}
                </label>
                <label className="display-label">
                  Meeting day: {capstoneInfo.meetingDay}
                </label>
                <label className="display-label">
                  Hours Per Week: {capstoneInfo.hoursPerWeek}
                </label>
                <label className="display-label">
                  Days Per Week: {capstoneInfo.daysPerWeek}
                </label>
                <label className="display-label">
                  Start Date: {new Date(capstoneInfo.startDate).toDateString()}
                </label>
                <label className="display-label">
                  End Date: {new Date(capstoneInfo.endDate).toDateString()}
                </label>
                <label className="display-label">
                  On Track: {capstoneInfo.onTrack === true ? "yes" : "no"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default HomeScreen;
