import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CaseSensitivePathsWebpackPlugin from "case-sensitive-paths-webpack-plugin";

const LoginBox = props => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState({});

  const onHandleLogin = e => {
    //console.log(`logging in... email: ${email} Password: ${password}`);
    axios
      .post("https://localhost:44343/api/User/login", {
        email: email,
        password: password
      })
      .then(res => JSON.stringify(res.data))
      .then(res => localStorage.setItem("info", res))
      .catch(error => console.log(error));
  };

  const onEmailChange = e => {
    // console.log(`email: ${e.target.value}`);
    setemail(e.target.value);
  };
  const onPasswordChange = e => {
    //console.log(`Password: ${e.target.value}`);
    setPassword(e.target.value);
  };

  // localStorage.clear();
  console.log(localStorage.getItem(email) || "token not found");
  return (
    <>
      <div className="inner-container">
        <div className="header">Login</div>
        <div className="box">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="login-input"
              placeholder="Email"
              onChange={onEmailChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="login-input"
              placeholder="Password"
              onChange={onPasswordChange}
            />
          </div>

          <button type="button" className="login-btn" onClick={onHandleLogin}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginBox;
