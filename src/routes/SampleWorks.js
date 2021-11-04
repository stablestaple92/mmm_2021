import React from "react";
import { useHistory } from "react-router";

const SampleWorks = ( {isLoggedIn} ) => {
    const history = useHistory();

    if(!isLoggedIn) {
        history.push("/");
    }
    return (

        <>
        <span>
            We can change Works Thingy
        </span>
        </>
    );
}

export default SampleWorks;