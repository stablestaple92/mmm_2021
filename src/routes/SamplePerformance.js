import React from "react";
import { useHistory } from "react-router";

const SamplePerf = ( {isLoggedIn} ) => {
    const history = useHistory();

    if(!isLoggedIn) {
        history.push("/");
    }

    return (
        <>
        <span>
            We can change Perf Thingy
        </span>
        </>
    );
}

export default SamplePerf;