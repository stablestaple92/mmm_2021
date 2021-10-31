import React from "react";
import { authService } from "fbase";
import { Router, useHistory } from "react-router";

const SampleLabotary = ({ restricted, isLoggedIn, match }) => {
    console.log(isLoggedIn);
    const history = useHistory();
    if(!isLoggedIn) {
        history.push("/");
    }
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/samplekaiser");
    }
    return (
        <div>
            <div>Configuration</div>
           
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default SampleLabotary;