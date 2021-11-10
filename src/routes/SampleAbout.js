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
            <span>변경할 데이터를 입력해주세요</span>
            <AboutForm userObj={userObj} />
        </div>
    );
}

export default SampleAbout;