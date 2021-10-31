import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    return (
    <nav className="navigation">
        <a href="http://madmindmachine.com" target="blank"><img className="sub-logo" src="img/logo_mmm_sd.png" alt="mmm_alt_logo" /></a>
        <div className="navigation-elements">
            <NavLink to="/">index</NavLink>
            <NavLink to="/about">about</NavLink>
            <NavLink to="/Works">works</NavLink>
            <NavLink to="/performance">performance</NavLink>
        </div>
    </nav>
    );
}

export default Navigation;