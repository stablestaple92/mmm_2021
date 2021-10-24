import React, { useState } from "react";
import "./App.css";
import "./reset.css";
import AppRouter from "./AppRouter";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div onContextMenu={
      (e) => {
        e.preventDefault();
      }
    }>
      <div className="container">
       <AppRouter isLoggedIn={isLoggedIn}/>
      </div>
    </div>
  );
}

export default App;
