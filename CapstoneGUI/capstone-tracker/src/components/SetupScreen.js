import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import axios from "axios";

const SetupScreen = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(0);
  const [checkInDay, setCheckInDay] = useState("");
  const [daysPerWeek, setDaysPerWeek] = useState(7);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const history = useHistory();
  const info = JSON.parse(localStorage.getItem("info"));
  const { token, user } = info ? info : {};
  const { userId } = user ? user : {};

  const showValidationErr = (elm, msg) => {
    console.log({ elm, msg });
    setErrors(prevState => [
      ...prevState,
      {
        elm,
        msg
      }
    ]);
    //console.log(errors);
  };
  const clearValidationErr = elm => {
    console.log(elm);
    setErrors(prevState => {
      const newArr = [];
      for (let err in prevState) {
        console.log(elm, prevState[err]);
        if (elm !== prevState[err].elm) {
          newArr.push(prevState[err]);
        }
      }
      return newArr;
    });
  };

  const onNameChange = e => {
    console.log(e.target.value);
    setName(e.target.value);
    clearValidationErr("name");
  };

  const onDescriptionChange = e => {
    console.log(e.target.value);
    setDescription(e.target.value);
    clearValidationErr("description");
  };

  const onHoursPerWeekChange = e => {
    console.log(e.target.value);
    setHoursPerWeek(e.target.value);
    clearValidationErr("hoursPerWeek");
  };
  const onCheckInDayChange = e => {
    console.log(e.target.value);
    setCheckInDay(e.target.value);
    clearValidationErr("checkInDay");
  };
  const onStartDateChange = e => {
    setStartDate(new Date(e.target.value));
    console.log(new Date(e.target.value).toISOString().split(".")[0]);
    clearValidationErr("startDate");
    clearValidationErr("startDateBack");
    clearValidationErr("endDate");
  };
  const onEndDateChange = e => {
    setEndDate(new Date(e.target.value));
    console.log(new Date(e.target.value).toISOString().split(".")[0]);
    clearValidationErr("startDate");
    clearValidationErr("endDate");
  };

  const handleOnSubmit = e => {
    let day = new Date();
    if (
      hoursPerWeek === 0 ||
      checkInDay === "" ||
      startDate >= endDate ||
      name === "" ||
      description === ""
    ) {
      if (hoursPerWeek === 0) {
        showValidationErr("hoursPerWeek", "Hours per week must not be 0");
      }
      if (checkInDay === "") {
        showValidationErr("checkInDay", "You must pick a check in day");
      }

      if (startDate >= endDate) {
        showValidationErr("startDate", "Start date must be before end date");
        showValidationErr("endDate", "End date must be after start date");
      }
      if (name === "") {
        showValidationErr("name", "You must enter a name for your Capstone");
      }
      if (description === "") {
        showValidationErr("description", "You must describe your Capstone");
      }
    } else {
      let c = {
        userId: userId,
        name: name,
        description: description,
        totalMinutesWorked: 0,
        totalMinutesBusy: 0,
        totalMinutesSleep: 0,
        totalMinutesFun: 0,
        meetingDay: checkInDay,
        hoursPerWeek: parseInt(hoursPerWeek),
        daysPerWeek: daysPerWeek,
        startDate: startDate.toISOString().split(".")[0],
        endDate: endDate.toISOString().split(".")[0],
        onTrack: true
      };
      console.log(c);
      axios({
        method: "post",
        url: `https://localhost:44343/api/User/${userId}/Capstone`,
        headers: {
          ContentType: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: c
      })
        .then(() => history.push("/home"))
        .catch(error => console.log(error));
    }
  };

  // console.log(errors["hoursPerWeek"]);
  let nameErr = null,
    descripErr = null,
    hoursErr = null,
    checkInErr = null,
    startErr = null,
    startBackErr = null,
    endErr = null;
  //console.log("before loop: ", errors);

  for (let err in errors) {
    if (errors[err].elm === "name") {
      nameErr = errors[err].msg;
    }
    if (errors[err].elm === "description") {
      descripErr = errors[err].msg;
    }
    if (errors[err].elm === "hoursPerWeek") {
      hoursErr = errors[err].msg;
    }
    if (errors[err].elm === "checkInDay") {
      checkInErr = errors[err].msg;
    }
    if (errors[err].elm === "startDate") {
      startErr = errors[err].msg;
    }
    if (errors[err].elm === "startDateBack") {
      startBackErr = errors[err].msg;
    }
    if (errors[err].elm === "endDate") {
      endErr = errors[err].msg;
    }
  }

  return localStorage.getItem("info") ? (
    <>
      <div className="root-container">
        <div className="box-container">
          <div className="inner-container">
            <div className="header">Setup</div>
            <div className="box">
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="login-input"
                  placeholder="Name"
                  onChange={onNameChange}
                />
                <small className="danger-error">{nameErr ? nameErr : ""}</small>
              </div>
              <div className="input-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="login-input"
                  placeholder="Description"
                  onChange={onDescriptionChange}
                />
                <small className="danger-error">
                  {descripErr ? descripErr : ""}
                </small>
              </div>
              <div className="input-group">
                <label htmlFor="hoursPerWeek">Hours Per Week</label>
                <select
                  name="hoursPerWeek"
                  className="input-select"
                  onChange={onHoursPerWeekChange}
                >
                  <option hidden disabled selected value>
                    0
                  </option>
                  <option>15</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </select>
                <small className="danger-error">
                  {hoursErr ? hoursErr : ""}
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="checkInDay">Check In Day</label>
                <select
                  name="checkInDay"
                  className="input-select"
                  onChange={onCheckInDayChange}
                >
                  <option hidden disabled selected value>
                    Select a Day
                  </option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                </select>
                <small className="danger-error">
                  {checkInErr ? checkInErr : ""}
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  onChange={onStartDateChange}
                  type="Date"
                  name="startDate"
                  className="login-input"
                  defaultValue={startDate.toISOString().split("T")[0]}
                />
                <small className="danger-error">
                  <div>{startBackErr ? startBackErr : ""}</div>
                  <div>{startErr ? startErr : ""}</div>
                </small>
              </div>

              <div className="input-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  onChange={onEndDateChange}
                  type="Date"
                  name="endDate"
                  className="login-input"
                  defaultValue={endDate.toISOString().split("T")[0]}
                />
                <small className="danger-error">{endErr ? endErr : ""}</small>
              </div>

              <button
                type="button"
                className="login-btn"
                onClick={handleOnSubmit}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/" />
  );
};

export default SetupScreen;
