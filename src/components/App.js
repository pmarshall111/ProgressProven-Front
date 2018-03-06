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
import SendTime from "./SendTime";
import Venn from "./graphs/Venn";
import GithubGraph from "./graphs/GithubGraph";
import DayWeekTargets from "./graphs/DayWeekTargets";
import WordCloud from "./graphs/WordCloud";

import "../css/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push("/welcome");
  }

  componentWillMount() {
    // commented out for testing
    var { badges, user, currentUser } = this.props;
    if (!user) {
      console.log(this.props);
      currentUser(() => {
        this.redirect();
      }, Boolean(badges));
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
          <Route exact path="/test" component={Venn} />
          <Route exact path="/test2" component={GithubGraph} />
          <Route exact path="/test3" component={DayWeekTargets} />
          <Route exact path="/test4" component={WordCloud} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps({ user, areas }) {
  return { user, areas };
}

export default withRouter(connect(mapStateToProps, { currentUser })(App));
