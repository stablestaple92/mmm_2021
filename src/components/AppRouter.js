import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import About from "../routes/About";
import Main from "../routes/Main";
import Performance from "../routes/Performance";
import Works from "../routes/Works";

import Navigation from "./Navigation";
import Footer from "./footer";
import SamplerKaiser from "routes/SampleKaiser";
import SampleLabotary from "routes/SampleLabotary";
import SampleAbout from "routes/SampleAbout";
import SampleWorks from "routes/SampleWorks";
import SamplePerf from "routes/SamplePerformance";


const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
      <Router> 
        <Switch>

            {isLoggedIn ? (              
            <>
              <Route restritced={true} exact path='/samplelabotory' render={() => <SampleLabotary isLoggedIn={isLoggedIn}/> }/>
              <Route path='/samplelabotory/about' component={SampleAbout} />
              <Route path='/samplelabotory/works' component={SampleWorks} />
              <Route path='/samplelabotory/performance' component={SamplePerf} />
            </>      
          
          ):(
          <>
            <Navigation />
              <Route exact path='/' component={Main} />
              <Route exact path='/about' component={About} />
              <Route exact path='/works' component={Works} />
              <Route exact path='/performance' component={Performance} />
              <Route exact path='/samplekaiser' component={SamplerKaiser}/>
            <Footer />
          </>                   
            )}
     
       </Switch>
      </Router>
    );
}

export default AppRouter;