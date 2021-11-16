import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "../routes/About";
import Main from "../routes/Main";
import Performance from "../routes/Performance";
import Works from "../routes/Works";

import Navigation from "./Navigation";
import Footer from "./footer";
import SamplerKaiser from "routes/SampleKaiser";
import SampleLaboratory from "routes/SampleLaboratory";
import SampleAbout from "routes/SampleAbout";
import SampleWorks from "routes/SampleWorks";
import SamplePerf from "routes/SamplePerformance";


const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router> 
      <Switch>
        <>
          <Navigation isLoggedIn={isLoggedIn} />
          <Route exact path='/samplelaboratory'>
            <SampleLaboratory isLoggedIn={isLoggedIn} userObj={userObj} />
          </Route>
          <Route path='/samplelaboratory/about' component={SampleAbout}>
            <SampleAbout isLoggedIn={isLoggedIn} userObj={userObj} />
          </Route>
          <Route path='/samplelaboratory/works' component={SampleWorks}>
            <SampleWorks isLoggedIn={isLoggedIn} userObj={userObj} />
          </Route>
          <Route path='/samplelaboratory/performance' component={SamplePerf}>
            <SamplePerf isLoggedIn={isLoggedIn} />
          </Route>
          
          <Route exact path='/' component={Main} />
          <Route path='/about' component={About} />
          <Route path='/works' component={Works} />
          <Route path='/performance' component={Performance} />
          <Route path='/samplekaiser' component={SamplerKaiser}/>
          <Footer />
        </>                   
      </Switch>
    </Router>
  );
}

export default AppRouter;