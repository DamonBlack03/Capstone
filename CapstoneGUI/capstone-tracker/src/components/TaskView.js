import React from 'react';

const TaskView = props => {

    console.log(new Date().toTimeString());
    return (
        <>
            <div className="box-container">
                <div className="box">
                    <div className="display-view">
                        Category: {props.taskInfo.category}
                    </div>
                    <div className="display-view">
                        <label className="display-label">Start Time: {props.taskInfo.startTime.toTimeString().split(' ')[0]}</label>
                        <label className="display-label">End Time: {props.taskInfo.endTime.toTimeString().split(' ')[0]}</label>
                        <label className="display-label">Minutes: {props.taskInfo.minutes}</label>
                        <label className="display-label">In Progress: {props.taskInfo.inProgress ? "yes" : "no"}</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskView;