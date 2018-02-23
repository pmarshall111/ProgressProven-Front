import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { currentUser } from "../actions";

import HomePage from "./Homepage";
import Welcome from "./Welcome";
import Goals from "./Goals";
import NewGoal from "./NewGoal";
import YourProfile from "./YourProfile";
import Stats from "./Stats";

import Auth from "./Auth";
import NewGoalForm from "./forms/NewGoalForm";

import "../css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push("/welcome");
  }

  componentDidMount() {
    // commented out for testing
    if (!this.props.user) {
      console.log(this.props);
      this.props.currentUser(() => {
        this.redirect();
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/goals" component={Goals} />
          <Route exact path="/goals/new" component={NewGoal} />
          <Route exact path="/profile" component={YourProfile} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/test" component={NewGoalForm} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default withRouter(connect(mapStateToProps, { currentUser })(App));
