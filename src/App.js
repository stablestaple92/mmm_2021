import React from "react";
import "./App.css";
import "./reset.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./component/Navigation";
import Admin from "./routes/Admin";
import Main from "./routes/Main";
import About from "./routes/About";
import Works from "./routes/Works";
import Performance from "./routes/Performance";

const App = () => {
  return (
    <div onContextMenu={
      (e) => {
        e.preventDefault();
      }
    }>
  
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path='/admin' component={Admin}/>
            <>
              <Navigation />
              <Route className="nav-home" exact path='/' component={Main} />
              <Route exact path='/about' component={About} />
              <Route exact path='/works' component={Works} />
              <Route exact path='/performance' component={Performance} />
            </>
          </Switch>
        </BrowserRouter>
      </div>
      <footer className="footer">
        <h4>&copy; {new Date().getFullYear()} MAD MIND MACHINE</h4>
      </footer>
    </div>
  );
}

export default App;
