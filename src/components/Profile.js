import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div className="profile-container grid">
        <div className="img-container">
          <img alt="Profile picture" />
        </div>
        <div className="user-details grid">
          <p>Name</p>
          <p />
          <p>D.O.B</p>
          <p />
          <p>Current Active Goals</p>
          <p />
          <p>Goals Completed</p>
          <p />
        </div>
      </div>
    );
  }
}
