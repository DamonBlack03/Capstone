import React, { useState } from 'react';
import OptionForm from './login/OptionForm';
import _loginSty from '../sass/_loginSty.scss';
import SetupScreen from './SetupScreen';
import DayView from './DayView';
import PrevDaysScreen from './PrevDaysScreen';


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
      date: new Date('03-02-2020'),
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
      successful: false
    }
  ]
  return (
    <div>
      {/* <OptionForm /> */}
      {/* <SetupScreen /> */}
      <PrevDaysScreen days={daysArr.filter(d => d.date.toDateString() !== new Date().toDateString())}/>
      {/* <DayView date={new Date()} worked={5} busy={3} sleep={0} fun={0} successful={true} /> */}
    </div>
  );
}