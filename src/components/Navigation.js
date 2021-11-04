import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = ( { isLoggedIn } ) => {
    return (
    <nav className="navigation">
        <a href="http://madmindmachine.com" target="blank"><img className="sub-logo" src="img/logo_mmm_sd.png" alt="mmm_alt_logo" /></a>
        <div className="navigation-elements">
            {isLoggedIn ?
                <>
                    <NavLink to="/sampleLaboratory">index</NavLink>
                    <NavLink to="/sampleLaboratory/about">about</NavLink>
                    <NavLink to="/sampleLaboratory/Works">works</NavLink>
                    <NavLink to="/sampleLaboratory/performance">performance</NavLink>
                </>
            :
                <> 
                    <NavLink to="/">index</NavLink>
                    <NavLink to="/about">about</NavLink>
                    <NavLink to="/Works">works</NavLink>
                    <NavLink to="/performance">performance</NavLink>
                </>
            }    
        </div>
    </nav>
    );
}

export default Navigation;