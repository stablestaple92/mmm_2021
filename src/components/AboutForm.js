import React from "react";
import AboutImage from "./AboutImage";
import AboutInfo from "./AboutInfo";


const AboutForm = ({ userObj }) => {
    
    return (
        <>
            <AboutImage userObj={userObj} />
            <AboutInfo userObj={userObj} />
        </>
    );
}

export default AboutForm;