import React, { Component } from "react";
import { connect } from "react-redux";

import { createGoalActionCreator } from "../actions";

import Banner from "./Banner";
import NewGoalForm from "./forms/NewGoalForm";

class NewGoal extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push("/home/goals");
  }

  submit(values) {
    console.log(values);
    const { subject } = values;

    var keys = Object.keys(values);
    var values = Object.values(values);
    var targets = [];

    for (var i = 0; i < keys.length; i++) {
      if (keys[i] == "subject") continue;
      var arrayPosition = +keys[i].slice(-1);
      var keyToDb = keys[i].slice(0, -1);
      if (!targets[arrayPosition]) {
        targets.push({ [keyToDb]: values[i] });
      } else {
        targets[arrayPosition][keyToDb] = values[i];
      }
    }

    var sendToDb = {
      subject,
      targets
    };

    console.log(sendToDb);

    // this.props.createGoalActionCreator(sendToDb, () => this.redirect());

    //send off action creator here
  }

  render() {
    return (
      <div>
        <Banner title="New Goal" exit="/goals" />
        <NewGoalForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { createGoalActionCreator })(NewGoal);
