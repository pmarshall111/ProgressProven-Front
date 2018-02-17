import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import StartWork from "./StartWork";
import QuoteOfTheDay from "./QuoteOfTheDay";
import YourProfile from "./YourProfile";
import Goals from "./Goals";
import Stats from "./Stats";

import "../css/Homepage.css";

export default class Homepage extends Component {
  render() {
    return (
      <div className="app">
        <div className="logo-top">Title</div>
        <main className="homepage grid">
          <nav>
            <Link to="/home/profile">
              <div className="nav-item nav-profile">Profile</div>
            </Link>
            <Link to="/home/goals">
              <div className="nav-item nav-goals">Goals</div>
            </Link>
            <Link to="/home/stats">
              <div className="nav-item nav-stats">Stats</div>
            </Link>
          </nav>
          <div className="homepage-main-content">
            <Switch>
              <Route path="/home/profile" component={YourProfile} />
              <Route path="/home/goals" component={Goals} />
              <Route path="/home/stats" component={Stats} />
            </Switch>
          </div>
          <StartWork />
        </main>
      </div>
    );
  }
}
