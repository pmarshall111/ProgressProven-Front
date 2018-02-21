import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";

import StartWork from "./StartWork";
import QuoteOfTheDay from "./QuoteOfTheDay";
import YourProfile from "./YourProfile";
import Goals from "./Goals";
import NewGoal from "./NewGoal";
import Stats from "./Stats";

import "../css/Homepage.css";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    //here as if we have a nested route clicked we want to add a class to change the layout
    this.state = { mainClass: "homepage" };
  }
  componentDidUpdate() {
    if (
      this.state.mainClass === "homepage" &&
      this.props.location.pathname.length > 5
    )
      this.setState({ mainClass: "homepage homepage-out-of-the-way" });
    else if (
      this.state.mainClass === "homepage homepage-out-of-the-way" &&
      this.props.location.pathname === "/home"
    )
      this.setState({ mainClass: "homepage" });
  }

  render() {
    return (
      <div className="app">
        <div className="logo-top">Title</div>
        <main className={this.state.mainClass}>
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
              <Route exact path="/home/goals" component={Goals} />
              <Route path="/home/stats" component={Stats} />
              <Route exact path="/home/goals/new" component={NewGoal} />
            </Switch>
          </div>
          <StartWork />
        </main>
      </div>
    );
  }
}
