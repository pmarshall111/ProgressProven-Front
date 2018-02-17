import React, { Component } from "react";

export default class Target extends Component {
  render() {
    const { start, finish, time } = this.props.data;
    // var start = "1st Dec 17",
    //   finish = "8th Dec 17",
    //   time = "4 hours 13 minutes";

    //Would want to do a grid layout on the start, finish etc so it looks smart
    return (
      <div className="target">
        <div className="target-details">
          <h4>Start: {start}</h4>
          <h4>Finish: {finish}</h4>
          <h4>Total: {time}</h4>
        </div>
      </div>
    );
  }
}
