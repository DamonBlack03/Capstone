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
  const [capstoneId, setCapstoneId] = useState(5);
  const info = JSON.parse(localStorage.getItem("info"));
  const { token, user } = info ? info : {};
  const { userId } = user ? user : {};

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
            <CurrentDayDisplay
            //   capstoneId={capstoneId}
            //   days={days}
            //   tasks={tasks}
            />
          )}
        />
        <Route
          path="/home"
          exact
          render={() => <HomeScreen userId={userId} capstoneId={capstoneId} />}
        />
        <Route path="/previousDays" exact render={() => <PrevDaysScreen />} />
      </div>
    </>
  );
}
