import React, { useEffect, useState } from "react";
import "./App.css";
import "./reset.css";
import AppRouter from "components/AppRouter";
import { authService } from "fbase";


const App = () => { 
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <div onContextMenu={
      (e) => {
        e.preventDefault();
      }
    }>
      <div className="container">
       {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />: "initializing..." }
      </div>
    </div>
  );
}

export default App;
