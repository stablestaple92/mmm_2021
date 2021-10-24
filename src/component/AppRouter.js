import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import About from "../routes/About";
import Admin from "../routes/Admin";
import Main from "../routes/Main";
import Performance from "../routes/Performance";
import Works from "../routes/Works";
import Footer from "./footer";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <BrowserRouter>
        <Switch>
          {isLoggedIn ? (
              <>
              <Navigation />
              <Route exact path='/' component={Main} />
              <Route exact path='/about' component={About} />
              <Route exact path='/works' component={Works} />
              <Route exact path='/performance' component={Performance} />
              <Footer />
            </>
          ) : (
            <Route exact path='/admin' component={Admin}/>
          )}
        </Switch>
      </BrowserRouter>
    );
}

export default AppRouter;