import React, { useState } from 'react';

const HomeScreen = props => {
    const capstoneInfo = props.capstoneInfo;

    return (
        <>
            <div className="root-container">
                <div className={capstoneInfo.onTrack ? "good-box-container" : "bad-box-container"}>
                    <div className="box">
                        <div className="inner-container">
                            <div className="header">
                                Overall Progress
                            </div>
                            <div className="display-view">
                                <label className="display-label">Name: {capstoneInfo.name}</label>
                                <label className="display-label">Description: {capstoneInfo.description}</label>
                                <label className="display-label">Hours Worked: {capstoneInfo.totalMinutesWorked/60}</label>
                                <label className="display-label">Hours Busy: {capstoneInfo.totalMinutesBusy/60}</label>
                                <label className="display-label">Hours Sleep: {capstoneInfo.totalMinutesSleep/60}</label>
                                <label className="display-label">Hours Fun: {capstoneInfo.totalMinutesFun/60}</label>
                                <label className="display-label">Meeting day: {capstoneInfo.meetingDay}</label>
                                <label className="display-label">Hours Per Week: {capstoneInfo.hoursPerWeek}</label>
                                <label className="display-label">Days Per Week: {capstoneInfo.daysPerWeek}</label>
                                <label className="display-label">Start Date: {capstoneInfo.startDate.toDateString()}</label>
                                <label className="display-label">End Date: {capstoneInfo.endDate.toDateString()}</label>
                                <label className="display-label">On Track: {capstoneInfo.onTrack === true ? "yes" : "no"}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeScreen;