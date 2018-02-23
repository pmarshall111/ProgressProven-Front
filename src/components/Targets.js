import React, { Component } from "react";
import * as moment from "moment";
moment().format();

export default class Target extends Component {
  render() {
    var { targetTime, startDate, timePeriod, fillAllWeeks } = this.props.data;
    console.log(this.props);
    targetTime = moment(targetTime).date() - 1 + moment(targetTime).hours();
    timePeriod = moment(timePeriod).date();
    startDate = moment(startDate).format("dddd, MMMM Do YYYY");

    // console.log([moment(targetTime), targetTime, timePeriod]);
    return (
      <div className="target-container">
        <div className="target-title">
          <h2>
            Target: {targetTime} hour{targetTime > 1 && "s"} in {timePeriod} day{timePeriod >
              1 && "s"}
          </h2>
          <div className="target-settings">Settings</div>
        </div>
        <div className="target-info grid">
          <p>Started: {startDate}</p>
          <p>Times completed:</p>
          <p>Completion percentage: </p>
          <p>Our recommendation: This is too easy for you! Push yourself!</p>
        </div>
      </div>
    );
  }
}
