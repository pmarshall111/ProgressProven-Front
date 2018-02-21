import React, { Component } from "react";

export default class Target extends Component {
  render() {
    const { targetTime, startDate, timePeriod, fillAllWeeks } = this.props;
    return (
      <div className="target-container">
        <div className="target-title">
          <h2>
            Target: {targetTime} hours in {timePeriod}
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
