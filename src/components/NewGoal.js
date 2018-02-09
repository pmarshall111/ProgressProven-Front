import React, { Component } from "react";

import Banner from "./Banner";
import NewGoalForm from "./forms/NewGoalForm";

export default class NewGoal extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.calcEndDate = this.calcEndDate.bind(this);
  }

  calcEndDate(period) {
    var days = 1;
    if (["Every week", "This week"].includes(period)) days = 7;

    var current = new Date();
    current.setDate(current.getDate() + days);

    return current;
  }

  submit(values) {
    if (!values.period) values.period = "Today";
    if (!values.targetTime) values.targetTime = 1;
    if (values.period.split(" ")[0] !== "Every") values.repeating = false;
    else values.repeating = true;

    values.finishDate = this.calcEndDate(values.period);
    console.log(values);

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
