import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./Homepage";
import Goals from "./Goals";
import NewGoal from "./NewGoal";
import YourProfile from "./YourProfile";

import "../css/App.css";

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/goals" component={Goals} />
            <Route exact path="/goals/new" component={NewGoal} />
            <Route exact path="/profile" component={YourProfile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// <Route exact path="/signin" component={Welcome} />
