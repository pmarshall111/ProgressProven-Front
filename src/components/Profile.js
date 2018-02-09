import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile grid">
        <div className="img-container">
          <img alt="Profile picture" />
        </div>
        <div className="user-details">
          <p className="c2 r1">Name</p>
          <p className="c3 r1" />
          <p className="c2 r2">D.O.B</p>
          <p className="c3 r2" />
          <p className="c2 r3">Current Active Goals</p>
          <p className="c3 r3" />
          <p className="c2 r4">Goals Completed</p>
          <p className="c3 r4" />
        </div>
      </div>
    );
  }
}
