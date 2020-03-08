import React, { useState } from "react";
import FadeTransition from "../transitions/fadeTransition";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import { Redirect } from "react-router-dom";

const OptionForm = props => {
  const [isLoginOpen, setLoginOpen] = useState(true);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const showLoginBox = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const showRegisterBox = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  return localStorage.getItem("info") ? (
    <Redirect to="/home" />
  ) : (
    <>
      <div className="root-container">
        <div className="box-controller">
          <div
            className={
              "controller " + (isLoginOpen ? "selected-controller" : "")
            }
            onClick={showLoginBox}
          >
            Login
          </div>
          <div
            className={
              "controller " + (isRegisterOpen ? "selected-controller" : "")
            }
            onClick={showRegisterBox}
          >
            Register
          </div>
        </div>

        {isLoginOpen ? (
          <FadeTransition isOpen={isLoginOpen} duration={500}>
            <div className="box-container">
              <LoginBox />
            </div>
          </FadeTransition>
        ) : (
          <FadeTransition isOpen={isRegisterOpen} duration={500}>
            <div className="box-container">
              <RegisterBox />
            </div>
          </FadeTransition>
        )}
      </div>
    </>
  );
};

export default OptionForm;
