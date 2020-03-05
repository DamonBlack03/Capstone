import React, { useState } from "react";
import OptionForm from "./login/OptionForm";
import _loginSty from "../sass/_loginSty.scss";
import SetupScreen from "./SetupScreen";
import DayView from "./DayView";
import PrevDaysScreen from "./PrevDaysScreen";
import HomeScreen from "./HomeScreen";
import CurrentDayDisplay from "./CurrentDayScreen";
import { readSync } from "fs-extra";

export default function App() {
  const daysArr = [
    {
      dayId: 1,
      capstoneId: 1,
      dayNumber: 1,
      date: new Date("03-01-2020"),
      totalMinutesWorked: 360,
      totalMinutesBusy: 120,
      totalMinutesSleep: 0,
      totalMinutesFun: 240,
      successful: true
    },
    {
      dayId: 2,
      capstoneId: 1,
      dayNumber: 2,
      date: new Date("03-02-2020"),
      totalMinutesWorked: 420,
      totalMinutesBusy: 60,
      totalMinutesSleep: 600,
      totalMinutesFun: 0,
      successful: false
    },
    {
      dayId: 3,
      capstoneId: 1,
      dayNumber: 3,
      date: new Date(),
      totalMinutesWorked: 0,
      totalMinutesBusy: 0,
      totalMinutesSleep: 0,
      totalMinutesFun: 0,
      successful: true
    }
  ];

  const capstoneInfo = {
    capstoneId: 1,
    userId: 1,
    name: "Capstone Tracker",
    description:
      "application that allows the user to track the effort put into their capstone",
    totalMinutesWorked: 0,
    totalMinutesBusy: 0,
    totalMinutesSleep: 0,
    totalMinutesFun: 0,
    meetingDay: "Monday",
    hoursPerWeek: 20,
    daysPerWeek: 7,
    startDate: new Date("03-01-2020"),
    endDate: new Date("03-13-2020"),
    onTrack: false
  };

  let taskArr = [
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
  return (
    <>
      <div>
        {/* <OptionForm /> */}

        {/* <SetupScreen /> */}
        <CurrentDayDisplay
          day={
            daysArr.filter(
              d => d.date.toDateString() === new Date().toDateString()
            )[0]
          }
          taskArr={taskArr}
        />
        {/* <HomeScreen capstoneInfo={capstoneInfo} /> */}
        {/* <PrevDaysScreen days={daysArr.filter(d => d.date.toDateString() !== new Date().toDateString())}/> */}
        {/* <DayView date={new Date()} worked={5} busy={3} sleep={0} fun={0} successful={true} /> */}
      </div>
    </>
  );
}
