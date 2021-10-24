import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    return (
    <nav className="navigation">
        <a href="http://madmindmachine.com" target="blank"><img className="sub-logo" src="img/logo_mmm_sd.png" alt="mmm_alt_logo" /></a>
        <div className="navigation-elements">
            <Link to="/">index</Link>
            <Link to="/about">about</Link>
            <Link to="/Works">works</Link>
            <Link to="/performance">performance</Link>
        </div>
    </nav>
    );
}

export default Navigation;