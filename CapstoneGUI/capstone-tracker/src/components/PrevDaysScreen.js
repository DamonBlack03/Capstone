import React, { useState } from 'react';
import DayView from './DayView';
import { inc } from 'semver';

const PrevDaysScreen = props => {//pass [] of days through props
    const [curIndex, setCurIndex] = useState(0);
    //const [curDay, setCurDay] = useState(props.days[0]);

    const incCurIndexChange = () => {
        let temp = curIndex;
        if(temp === props.days.length -1){
            temp = 0;
        }else{
            temp += 1;
        }
        setCurIndex(temp);
    }

    const decCurIndexChange = () => {
        let temp = curIndex;
        if(temp === 0){
            temp = props.days.length- 1;
        }else{
            temp -= 1;
        }
        setCurIndex(temp);
    }
    
    //console.log(curIndex);

    let taskArr = [
        {
            category: 'Work',
            startTime: new Date(),
            endTime: new Date(),
            minutes: 0,
            inProgress: false
        },
        {
            category: 'Work',
            startTime: new Date(),
            endTime: new Date(),
            minutes: 0,
            inProgress: true
        },
        {
            category: 'Work',
            startTime: new Date(),
            endTime: new Date(),
            minutes: 0,
            inProgress: true
        },
        {
            category: 'Work',
            startTime: new Date(),
            endTime: new Date(),
            minutes: 0,
            inProgress: true
        }
    ]

    console.log(taskArr.length);
    return (
        <>
            <div className="root-display-container">
                <div>
                    <div className="left-arrow" onClick={decCurIndexChange}>
                        <div className="left-arrow-top"></div>
                        <div className="left-arrow-bottom"></div>
                    </div>
                </div>
                <DayView date={props.days[curIndex].date}
                         dayNum={props.days[curIndex].dayNumber} 
                         worked={props.days[curIndex].totalMinutesWorked/60} 
                         busy={props.days[curIndex].totalMinutesBusy/60} 
                         sleep={props.days[curIndex].totalMinutesSleep/60} 
                         fun={props.days[curIndex].totalMinutesFun/60} 
                         successful={props.days[curIndex].successful} 
                         tasks={taskArr}
                         glow={true}/>

                <div >
                    <div className="right-arrow" onClick={incCurIndexChange}>
                        <div className="right-arrow-top"></div>
                        <div className="right-arrow-bottom"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrevDaysScreen;