import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom"

const SampleLaboratory = ({ isLoggedIn, userObj }) => {
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

export default SampleLaboratory;