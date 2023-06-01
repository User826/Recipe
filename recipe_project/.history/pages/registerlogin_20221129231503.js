
import React from 'react';
import ReactDOM from 'react-dom'
import { useState } from "react";
import {LoginButton, LogoutButton, Greeting} from "../components/greetings.js"

const LoginControl = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function handleLoginClick() {
        //this.setState({isLoggedIn: true});
        setIsLoggedIn(true)
      };
    
    function handleLogoutClick() {
        //this.setState({isLoggedIn: false});
        setIsLoggedIn(false)
      }
    
    
    const isLoggedInVariable = isLoggedIn;
    let button;

    if (isLoggedInVariable) {
        button = <LogoutButton onClick={handleLogoutClick} />;
    } else {
        button = <LoginButton onClick={handleLoginClick} />;
    }

    return (
        <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
        </div>
    );
}


export default LoginControl;