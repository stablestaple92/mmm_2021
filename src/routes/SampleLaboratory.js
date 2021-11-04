import React from "react";
import { authService } from "fbase";
import { useHistory } from "react-router";

const SampleLaboratory = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    console.log(userObj);
    if(!isLoggedIn) {
        history.push("/");
    }
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/samplekaiser");
    }
    return (
        <div>
            <div>Hello!</div>
            <div>Click navigation to config your informations</div>
            <div>Your Email : {userObj.email}</div>

            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
}

export default SampleLaboratory;