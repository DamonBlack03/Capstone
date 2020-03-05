import React, {useState} from 'react';
import DayView from './DayView';

const CurrentDayDisplay = props => {
    const [tasks, setTasks] = useState(props.taskArr);

    return (
        <>
            <div className="root-container">
                <div className={props.day.successful ? "good-box-container" : "bad-box-container"}>
                    <div className="header">
                        CurrentDay
                    </div>

                    <DayView date={props.day.date}
                             dayNum={props.day.dayNumber} 
                             worked={props.day.totalMinutesWorked/60} 
                             busy={props.day.totalMinutesBusy/60} 
                             sleep={props.day.totalMinutesSleep/60} 
                             fun={props.day.totalMinutesFun/60} 
                             successful={props.day.successful} 
                             tasks={tasks}
                             glow={false}/>
                    
                    <button className="login-btn">
                        Edit
                    </button>
                </div>
            </div>
        </>
    );
};

export default CurrentDayDisplay;