import React from "react";
import { useHistory } from "react-router";
import AboutForm from "components/AboutForm";


const SampleAbout = ({ isLoggedIn, userObj }) => {
    const history = useHistory();
    
    // 로그인 안하면 내쫒기
    if(!isLoggedIn) {
        history.push("/");
    }

    return (
        <div>
            <AboutForm userObj={userObj} />
        </div>
    );
}

export default SampleAbout;