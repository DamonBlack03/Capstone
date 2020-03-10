import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const TaskPopUp = props => {
  const info = JSON.parse(localStorage.getItem("info"));
  const { token, user } = info ? info : {};
  const { userId } = user ? user : {};
  const day = props.day;
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState(
    new Date().toISOString().split(".")[0]
  );
  const [endTime, setEndTime] = useState(
    new Date().toISOString().split(".")[0]
  );
  const [minutes, setMinutes] = useState(0);
  const [inProgress, setInProgress] = useState(true);
  const history = useHistory();
  const [tasks, setTasks] = useState([]);
  let [task, setTask] = useState({});
  useState({});

  const onCategoryChange = e => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  const handleAdd = e => {
    addTask();
    props.click();
  };
  const handleUpdate = e => {
    updateTask();
    // console.log(
    //   Math.floor((new Date(endTime) - new Date(task.startTime)) / 60000)
    // );
    props.click();
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
      //   .then(res => console.log(res))
      .then(res => setTasks(res))
      .then(() =>
        setTask(
          tasks.filter(t => t.inProgress === true).length > 0
            ? tasks.filter(t => t.inProgress === true)[0]
            : undefined
        )
      )
      //   .then(() => console.log(task))
      .catch(error => console.log(error));
  };

  const addTask = () => {
    axios({
      method: "post",
      url: `https://localhost:44343/api/User/Day/${day.dayId}/Task`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: {
        dayId: day.dayId,
        category: category,
        startTime: startTime,
        endTime: endTime,
        minutes: minutes,
        inProgress: inProgress
      }
    })
      .then(() => history.push("/currentDay"))
      .catch(error => console.log(error));
  };

  const updateTask = () => {
    axios({
      method: "put",
      url: `https://localhost:44343/api/User/Day/${day.dayId}/Task/${task.taskId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      data: {
        taskId: task.taskId,
        dayId: day.dayId,
        category: task.category,
        startTime: task.startTime,
        endTime: endTime,
        minutes: Math.floor(
          (new Date(endTime) - new Date(task.startTime)) / 60000
        ),
        inProgress: false
      }
    })
      .then(() => history.push("/currentDay"))
      .catch(error => console.log(error));
  };

  getTasks();

  //   console.log(task);
  return localStorage.getItem("info") ? (
    task ? ( //task in progress
      <>
        <div className="root-container">
          <div className="box-container">
            <div className="inner-container">
              <div className="box">
                <div className="display-view">
                  <label htmlFor="category">Category: {task.category}</label>
                  <label htmlFor="category">
                    Start Time:{" "}
                    {new Date(task.startTime).toTimeString().split(" ")[0]}
                  </label>
                  <button
                    type="button"
                    className="login-btn"
                    onClick={handleUpdate}
                  >
                    End Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      //no task in progress
      <>
        <div className="root-container">
          <div className="box-container">
            <div className="inner-container">
              <div className="box">
                <div className="input-group">
                  <label htmlFor="category">Category</label>
                  <select
                    name="category"
                    className="input-select"
                    onChange={onCategoryChange}
                  >
                    <option hidden disabled selected value>
                      Category
                    </option>
                    <option>Work</option>
                    <option>Busy</option>
                    <option>Sleep</option>
                    <option>Fun</option>
                  </select>
                  {/* <small className="danger-error">
            {hoursErr ? hoursErr : ""}
          </small> */}
                </div>

                <button type="button" className="login-btn" onClick={handleAdd}>
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  ) : (
    <Redirect to="/" />
  );
};

export default TaskPopUp;
