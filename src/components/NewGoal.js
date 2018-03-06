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
    this.props.createGoalActionCreator(values, () => this.redirect());
  }

  render() {
    return (
      <div>
        <Banner title="New Goal" exit="/home/goals" />
        <NewGoalForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(null, { createGoalActionCreator })(NewGoal);
