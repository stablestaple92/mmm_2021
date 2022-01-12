import React from "react"
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
        <h4>&copy; {new Date().getFullYear()} MAD MIND MACHINE</h4>
        </footer>
    );
}

export default Footer;