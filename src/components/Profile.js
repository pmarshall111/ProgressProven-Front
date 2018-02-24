import React, { Component } from "react";
import { connect } from "react-redux";

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="profile-container grid">
        <div className="img-container">
          <img alt="Profile picture" />
        </div>
        <div className="user-details grid">
          <p>Name</p>
          <p>{user.name || "?"}</p>
          <p>D.O.B</p>
          <p>{user.DOB || "?"}</p>
          <p>Goals List</p>
          <p>{user.improvementAreas.map(x => x.subject).join(", ")}</p>
          <p>Targets</p>
          <p>{user.improvementAreas.reduce((t, c) => (t += c.targets), 0)}</p>
          <p>Completed Targets</p>
          <p>0</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(Profile);
