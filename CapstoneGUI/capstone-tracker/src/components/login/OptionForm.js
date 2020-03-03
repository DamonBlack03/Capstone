import React, { useState } from 'react'
import FadeTransition from '../transitions/fadeTransition';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';


const OptionForm = () => {
    const [isLoginOpen, setLoginOpen] = useState(true);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const showLoginBox = () => {
        setLoginOpen(true);
        setRegisterOpen(false);
    }

    const showRegisterBox = () => {
        setRegisterOpen(true);
        setLoginOpen(false);
    }

    return <>
        <div className="root-container">
        
            <div className="box-controller">
                <div className={"controller " + (isLoginOpen ? "selected-controller" : "")}
                    onClick={
                     showLoginBox
                    .bind(this)}>
                        Login
                </div>
                <div className={"controller " + (isRegisterOpen ? "selected-controller" : "")}
                    onClick={
                     showRegisterBox
                    .bind(this)}>
                        Register
                </div>
            </div>

            {
                isLoginOpen ?
                <FadeTransition isOpen={isLoginOpen} duration={500}>
                    <div className="box-container">
                        <LoginBox/>
                    </div>
                </FadeTransition>
                :
                <FadeTransition isOpen={isRegisterOpen} duration={500}>
                    <div className="box-container">
                        <RegisterBox/>
                    </div>
                </FadeTransition>
            }

        </div>
    </>
};

export default OptionForm;