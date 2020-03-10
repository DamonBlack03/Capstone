import React, { useState } from "react";
import OptionForm from "./login/OptionForm";
import _loginSty from "../sass/_loginSty.scss";
import { Route } from "react-router-dom";
import SetupScreen from "./SetupScreen";
import DayView from "./DayView";
import PrevDaysScreen from "./PrevDaysScreen";
import HomeScreen from "./HomeScreen";
import CurrentDayDisplay from "./CurrentDayScreen";
import Nav from "./Nav";
import axios from "axios";

export default function App() {
  // const [capstoneId, setCapstoneId] = useState(5);
  const info = JSON.parse(localStorage.getItem("info"));
  const { token, user } = info ? info : {};
  const { userId } = user ? user : {};

  const [capstoneInfo, setCapstoneInfo] = useState({});

  const getCapstone = () => {
    axios({
      method: "get",
      url: `https://localhost:44343/api/User/${userId}/Capstones`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.data.capstone)
      .then(res => setCapstoneInfo(res))
      .catch(error => console.log(error));
  };

  getCapstone();

  return (
    <>
      <Nav />
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <OptionForm info={localStorage.getItem("info") || "none"} />
          )}
        />
        <Route
          path="/setup"
          exact
          render={() => (
            <SetupScreen info={localStorage.getItem("info") || "none"} />
          )}
        />
        <Route
          path="/currentDay"
          exact
          render={() => (
            <CurrentDayDisplay capstone={capstoneInfo.capstoneId} />
          )}
        />
        <Route
          path="/home"
          exact
          render={() => <HomeScreen userId={userId} capstone={capstoneInfo} />}
        />
        <Route
          path="/previousDays"
          exact
          render={() => <PrevDaysScreen capstone={capstoneInfo.capstoneId} />}
        />
      </div>
    </>
  );
}
