import React, { useState } from 'react'

const SetupScreen = props => {
    const [hoursPerWeek, setHoursPerWeek] = useState(0);
    const [checkInDay, setCheckInDay] = useState('');
    const [daysPerWeek, setDaysPerWeek] = useState(7);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState([]);

    const showValidationErr = (elm, msg) => {
        console.log({elm, msg});
        setErrors((prevState) => [
                ...prevState, 
                {
                    elm,
                    msg
                }
            ]
        );
        //console.log(errors);
    }
    const clearValidationErr = (elm) => {
        console.log(elm);
        setErrors((prevState) => {
            const newArr = [];
            for (let err in prevState) {
                console.log(elm, prevState[err])
                if (elm !== prevState[err].elm) {
                    
                    newArr.push(prevState[err]);
                }
            }
            return newArr;
        });
    }

    const onHoursPerWeekChange = (e) => {
        console.log(e.target.value);
        setHoursPerWeek(e.target.value);
        clearValidationErr("hoursPerWeek");
    };
    const onCheckInDayChange = (e) => {
        console.log(e.target.value);
        setCheckInDay(e.target.value);
        clearValidationErr("checkInDay");
    };
    const onStartDateChange = (e) => {
        setStartDate(new Date(e.target.value));
        clearValidationErr("startDate");
        clearValidationErr("endDate");
    };
    const onEndDateChange = (e) => {
        setEndDate(new Date(e.target.value));
        clearValidationErr("startDate");
        clearValidationErr("endDate");
    };

    const handleOnSubmit = (e) => {
        if(hoursPerWeek === 0 || checkInDay === '' || startDate >= endDate){
            if(hoursPerWeek === 0){
                showValidationErr("hoursPerWeek", "Hours per week must not be 0");
            }
            if(checkInDay === ''){
                showValidationErr("checkInDay", "You must pick a check in day");
            }
            if(startDate >= endDate){
                showValidationErr("startDate", "Start date must be before end date");
                showValidationErr("endDate", "End date must be after start date");
            }
        }
        else{
            console.log("continue");
        }
    };
    
    // console.log(errors["hoursPerWeek"]);
    let hoursErr = null,
        checkInErr = null,
        startErr = null,
        endErr = null;
    //console.log("before loop: ", errors);
    
    for (let err in errors) {
        if (errors[err].elm === "hoursPerWeek") {
            hoursErr = errors[err].msg;
        }
        if (errors[err].elm === "checkInDay") {
            checkInErr = errors[err].msg;
        }
        if (errors[err].elm === "startDate") {
            startErr = errors[err].msg;
        }
        if (errors[err].elm === "endDate") {
            endErr = errors[err].msg;
        }
    }

    return (
        <>
            <div className="root-container">
                <div className="box-container">
                    <div className="inner-container">
                        <div className="header">
                            Setup
                        </div>
                        <div className="box">
                            <div className="input-group">
                                <label htmlFor="hoursPerWeek">Hours Per Week</label>
                                <select name="hoursPerWeek" className="input-select" onChange={onHoursPerWeekChange}>
                                    <option hidden disabled selected value>0</option>
                                    <option>15</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>40</option>
                                </select>
                                <small className="danger-error">{hoursErr ? hoursErr : ""}</small>
                            </div>

                            <div className="input-group">
                                <label htmlFor="checkInDay">Check In Day</label>
                                <select name="checkInDay" className="input-select" onChange={onCheckInDayChange}>
                                    <option hidden disabled selected value>Select a Day</option>
                                    <option>Monday</option>
                                    <option>Tuesday</option>
                                    <option>Wednesday</option>
                                    <option>Thursday</option>
                                    <option>Friday</option>
                                </select>
                                <small className="danger-error">{checkInErr ? checkInErr : ""}</small>
                            </div>

                            <div className="input-group">
                                <label htmlFor="startDate">Start Date</label>
                                <input onChange={onStartDateChange}
                                    type="Date"
                                    name="startDate"
                                    className="login-input"
                                    defaultValue={startDate.toISOString().split('T')[0]}/>
                                    <small className="danger-error">{startErr ? startErr : ""}</small>
                            </div>

                            <div className="input-group">
                                <label htmlFor="endDate">End Date</label>
                                <input onChange={onEndDateChange}
                                    type="Date"
                                    name="endDate"
                                    className="login-input"
                                    defaultValue={endDate.toISOString().split('T')[0]}/>
                                    <small className="danger-error">{endErr ? endErr : ""}</small>
                            </div>

                            <button
                                type="button"
                                className="login-btn"
                                onClick={handleOnSubmit}>Continue</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
 

export default SetupScreen;