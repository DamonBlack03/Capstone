import React, { useState } from 'react';

const RegisterBox = props => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [pwdState, setPwdState] = useState(null);
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
                console.log(errors);
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
  
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
        clearValidationErr("username");
    }
  
    const onEmailChange = (e) => {
        setEmail(e.target.value);
        clearValidationErr("email");
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
        clearValidationErr("password");

        setPwdState("weak");
        if (e.target.value.length > 8) {
            setPwdState("medium");
        } 
        if (e.target.value.length > 12) {
            setPwdState("strong");
        }
    }
  
    const openPopup = (e) => {
      console.log("Hello world!");
      submitRegister(e);
    }
  
    const submitRegister = (e) => {
        console.log({username,email,password, errors, pwdState});
    
        if (username === "") {
            console.log("in Username")
            showValidationErr("username", "Username Cannot be empty!");
        }
        if (email === "") {
            console.log("in Email")
            showValidationErr("email", "Email Cannot be empty!");
        }
        if (password === "") {
            console.log("in Password")
            showValidationErr("password", "Password Cannot be empty!");
        }
  
    }

    let usernameErr = null,
        passwordErr = null,
        emailErr = null;
    console.log("before loop: ", errors);
    
    for (let err in errors) {
        if (errors[err].elm === "username") {
            usernameErr = errors[err].msg;
        }
        if (errors[err].elm === "password") {
            passwordErr = errors[err].msg;
        }
        if (errors[err].elm === "email") {
            emailErr = errors[err].msg;
        }
    }

    let pwdWeak = false,
        pwdMedium = false,
        pwdStrong = false;

    if (pwdState === "weak") {
        pwdWeak = true;
    } 
    else if (pwdState === "medium") {
        pwdWeak = true;
        pwdMedium = true;
    } 
    else if (pwdState === "strong") {
        pwdWeak = true;
        pwdMedium = true;
        pwdStrong = true;
    }

    return <>
        <div className="inner-container">
            <div className="header">
                Register
            </div>
            <div className="box">
                <div className="input-group">   
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="login-input"
                        placeholder="Username"
                        onChange={onUsernameChange}/>
                    <small className="danger-error">{usernameErr ? usernameErr : ""}</small>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        className="login-input"
                        placeholder="Email"
                        onChange={onEmailChange}/>
                    <small className="danger-error">{emailErr ? emailErr : ""}</small>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="login-input"
                        placeholder="Password"
                        onChange={onPasswordChange}/>
                    <small className="danger-error">{passwordErr ? passwordErr : ""}</small>

                    {password && 
                        <div className="password-state">
                            <div className={"pwd pwd-weak " + (pwdWeak ? "show" : "")}>
                            </div>
                            <div className={"pwd pwd-medium " + (pwdMedium ? "show" : "")}>
                            </div>
                            <div className={"pwd pwd-strong " + (pwdStrong ? "show" : "")}>
                            </div>
                        </div>}
                </div>

                <button
                    type="button"
                    className="login-btn"
                    // onMouseEnter={
                    //  openPopup
                    //  .bind(this)}
                    onClick={openPopup}> 
                    Register
                </button>
            </div>
        </div>
    </>
};

export default RegisterBox;