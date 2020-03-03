import React, { useState } from 'react';
import DayView from './DayView';

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
    
    console.log(curIndex);

    return (
        <>
            <div className="root-display-container">
                <div>
                    <button onClick={decCurIndexChange}>
                        {"<"}
                    </button>
                </div>

                <DayView date={props.days[curIndex].date}
                         dayNum={props.days[curIndex].dayNumber} 
                         worked={props.days[curIndex].totalMinutesWorked/60} 
                         busy={props.days[curIndex].totalMinutesBusy/60} 
                         sleep={props.days[curIndex].totalMinutesSleep/60} 
                         fun={props.days[curIndex].totalMinutesFun/60} 
                         successful={props.days[curIndex].successful} />

                <div>
                    <button onClick={incCurIndexChange}>
                        >
                    </button>
                </div>
            </div>
        </>
    );
};

export default PrevDaysScreen;